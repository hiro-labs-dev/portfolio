import json
import os
import csv
import io
import uuid
from datetime import datetime
from decimal import Decimal

import boto3
import stripe

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ.get('TABLE_NAME', 'hiro-invoices'))

ADMIN_KEY = os.environ.get('ADMIN_KEY', '')
STRIPE_SECRET_KEY = os.environ.get('STRIPE_SECRET_KEY', '')
STRIPE_WEBHOOK_SECRET = os.environ.get('STRIPE_WEBHOOK_SECRET', '')
SITE_URL = os.environ.get('SITE_URL', 'https://hiro-labs.dev')

stripe.api_key = STRIPE_SECRET_KEY

CORS_HEADERS = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': os.environ.get('ALLOWED_ORIGIN', '*'),
    'Access-Control-Allow-Headers': 'Content-Type,X-Admin-Key',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
}


def respond(status, body):
    return {'statusCode': status, 'headers': CORS_HEADERS, 'body': json.dumps(body, default=str)}


def check_admin(event):
    headers = {k.lower(): v for k, v in (event.get('headers') or {}).items()}
    return headers.get('x-admin-key') == ADMIN_KEY


def generate_id():
    now = datetime.utcnow()
    seq = str(uuid.uuid4())[:4].upper()
    return f"INV-{now.year}-{seq}"


def decimal_to_num(obj):
    if isinstance(obj, list):
        return [decimal_to_num(i) for i in obj]
    if isinstance(obj, dict):
        return {k: decimal_to_num(v) for k, v in obj.items()}
    if isinstance(obj, Decimal):
        return int(obj) if obj == int(obj) else float(obj)
    return obj


def get_invoice(invoice_id):
    resp = table.get_item(Key={'id': invoice_id})
    item = resp.get('Item')
    if not item:
        return respond(404, {'error': 'Invoice not found'})
    return respond(200, decimal_to_num(item))


def list_invoices():
    resp = table.scan()
    items = sorted(resp.get('Items', []), key=lambda x: x.get('createdAt', ''), reverse=True)
    return respond(200, decimal_to_num(items))


def create_invoice(body):
    invoice_id = body.get('id') or generate_id()
    now = datetime.utcnow().isoformat() + 'Z'

    items = body.get('items', [])
    for item in items:
        item['quantity'] = Decimal(str(item.get('quantity', 0)))
        item['rate'] = Decimal(str(item.get('rate', 0)))

    subtotal = sum(float(i['quantity']) * float(i['rate']) for i in items)

    record = {
        'id': invoice_id,
        'client': body.get('client', ''),
        'email': body.get('email', ''),
        'status': body.get('status', 'draft'),
        'issueDate': body.get('issueDate', now[:10]),
        'dueDate': body.get('dueDate', ''),
        'milestone': body.get('milestone', ''),
        'notes': body.get('notes', ''),
        'stripePaymentLink': body.get('stripePaymentLink', ''),
        'items': items,
        'subtotal': Decimal(str(round(subtotal, 2))),
        'createdAt': now,
        'updatedAt': now,
    }

    table.put_item(Item=record)
    return respond(201, decimal_to_num(record))


def update_invoice(invoice_id, body):
    resp = table.get_item(Key={'id': invoice_id})
    if not resp.get('Item'):
        return respond(404, {'error': 'Invoice not found'})

    existing = resp['Item']
    now = datetime.utcnow().isoformat() + 'Z'

    items = body.get('items', existing.get('items', []))
    for item in items:
        item['quantity'] = Decimal(str(item.get('quantity', 0)))
        item['rate'] = Decimal(str(item.get('rate', 0)))

    subtotal = sum(float(i['quantity']) * float(i['rate']) for i in items)

    record = {
        'id': invoice_id,
        'client': body.get('client', existing.get('client', '')),
        'email': body.get('email', existing.get('email', '')),
        'status': body.get('status', existing.get('status', 'draft')),
        'issueDate': body.get('issueDate', existing.get('issueDate', '')),
        'dueDate': body.get('dueDate', existing.get('dueDate', '')),
        'milestone': body.get('milestone', existing.get('milestone', '')),
        'notes': body.get('notes', existing.get('notes', '')),
        'stripePaymentLink': body.get('stripePaymentLink', existing.get('stripePaymentLink', '')),
        'items': items,
        'subtotal': Decimal(str(round(subtotal, 2))),
        'createdAt': existing.get('createdAt', now),
        'updatedAt': now,
    }

    table.put_item(Item=record)
    return respond(200, decimal_to_num(record))


def import_csv(csv_text):
    reader = csv.DictReader(io.StringIO(csv_text))
    invoices = {}

    for row in reader:
        inv_id = row.get('invoice_id', '').strip() or generate_id()
        if inv_id not in invoices:
            invoices[inv_id] = {
                'id': inv_id,
                'client': row.get('client', '').strip(),
                'email': row.get('email', '').strip(),
                'status': row.get('status', 'draft').strip(),
                'issueDate': row.get('issue_date', '').strip(),
                'dueDate': row.get('due_date', '').strip(),
                'milestone': row.get('milestone', '').strip(),
                'notes': row.get('notes', '').strip(),
                'stripePaymentLink': row.get('stripe_link', '').strip(),
                'items': [],
            }

        invoices[inv_id]['items'].append({
            'description': row.get('description', '').strip(),
            'details': row.get('details', '').strip(),
            'quantity': Decimal(row.get('quantity', '0').strip() or '0'),
            'unit': row.get('unit', 'hrs').strip(),
            'rate': Decimal(row.get('rate', '0').strip() or '0'),
        })

    now = datetime.utcnow().isoformat() + 'Z'
    created = []

    with table.batch_writer() as batch:
        for inv_id, inv in invoices.items():
            subtotal = sum(float(i['quantity']) * float(i['rate']) for i in inv['items'])
            inv['subtotal'] = Decimal(str(round(subtotal, 2)))
            inv['createdAt'] = now
            inv['updatedAt'] = now
            batch.put_item(Item=inv)
            created.append(inv_id)

    return respond(201, {'imported': len(created), 'ids': created})


def delete_invoice(invoice_id):
    resp = table.get_item(Key={'id': invoice_id})
    if not resp.get('Item'):
        return respond(404, {'error': 'Invoice not found'})
    table.delete_item(Key={'id': invoice_id})
    return respond(200, {'deleted': invoice_id})


def mark_paid(invoice_id):
    resp = table.get_item(Key={'id': invoice_id})
    if not resp.get('Item'):
        return respond(404, {'error': 'Invoice not found'})
    now = datetime.utcnow().isoformat() + 'Z'
    table.update_item(
        Key={'id': invoice_id},
        UpdateExpression='SET #s = :s, paidDate = :d, updatedAt = :u',
        ExpressionAttributeNames={'#s': 'status'},
        ExpressionAttributeValues={':s': 'paid', ':d': now[:10], ':u': now},
    )
    return respond(200, {'id': invoice_id, 'status': 'paid'})


def create_checkout(invoice_id):
    """Create a Stripe Checkout session for an invoice."""
    resp = table.get_item(Key={'id': invoice_id})
    item = resp.get('Item')
    if not item:
        return respond(404, {'error': 'Invoice not found'})

    if item.get('status') == 'paid':
        return respond(400, {'error': 'Invoice already paid'})

    line_items = []
    for li in item.get('items', []):
        amount_cents = int(float(li['quantity']) * float(li['rate']) * 100)
        name = li.get('description', 'Service')
        details = li.get('details', '')
        line_items.append({
            'price_data': {
                'currency': 'usd',
                'product_data': {
                    'name': name,
                    'description': details or None,
                },
                'unit_amount': amount_cents,
            },
            'quantity': 1,
        })

    session = stripe.checkout.Session.create(
        mode='payment',
        payment_method_types=['card'],
        line_items=line_items,
        success_url=f'{SITE_URL}/invoice/{invoice_id}?paid=true',
        cancel_url=f'{SITE_URL}/invoice/{invoice_id}',
        metadata={'invoice_id': invoice_id},
        customer_email=item.get('email') or None,
    )

    return respond(200, {'url': session.url})


def handle_webhook(event):
    """Handle Stripe webhook — marks invoice as paid on successful checkout."""
    body = event.get('body', '')
    headers = {k.lower(): v for k, v in (event.get('headers') or {}).items()}
    sig = headers.get('stripe-signature', '')

    try:
        evt = stripe.Webhook.construct_event(body, sig, STRIPE_WEBHOOK_SECRET)
    except (ValueError, stripe.error.SignatureVerificationError):
        return respond(400, {'error': 'Invalid signature'})

    if evt['type'] == 'checkout.session.completed':
        session = evt['data']['object']
        invoice_id = session.get('metadata', {}).get('invoice_id')
        if invoice_id:
            now = datetime.utcnow().isoformat() + 'Z'
            table.update_item(
                Key={'id': invoice_id},
                UpdateExpression='SET #s = :s, paidDate = :d, updatedAt = :u, stripeSessionId = :sid',
                ExpressionAttributeNames={'#s': 'status'},
                ExpressionAttributeValues={
                    ':s': 'paid',
                    ':d': now[:10],
                    ':u': now,
                    ':sid': session.get('id', ''),
                },
            )

    return respond(200, {'received': True})


def lambda_handler(event, context):
    method = event.get('requestContext', {}).get('http', {}).get('method', 'GET')
    path = event.get('rawPath', '')

    if method == 'OPTIONS':
        return respond(200, {})

    # Stripe webhook
    if method == 'POST' and path == '/stripe/webhook':
        return handle_webhook(event)

    # Public: GET /invoices/{id}
    if method == 'GET' and path.startswith('/invoices/') and '/checkout' not in path:
        invoice_id = path.split('/invoices/')[-1]
        return get_invoice(invoice_id)

    # Public: POST /invoices/{id}/checkout
    if method == 'POST' and path.endswith('/checkout'):
        invoice_id = path.replace('/invoices/', '').replace('/checkout', '')
        return create_checkout(invoice_id)

    # Admin endpoints
    if not check_admin(event):
        return respond(401, {'error': 'Unauthorized'})

    if method == 'GET' and path == '/invoices':
        return list_invoices()

    if method == 'POST' and path == '/invoices':
        body = json.loads(event.get('body', '{}'))
        return create_invoice(body)

    if method == 'PUT' and path.startswith('/invoices/'):
        invoice_id = path.split('/invoices/')[-1]
        body = json.loads(event.get('body', '{}'))
        return update_invoice(invoice_id, body)

    if method == 'DELETE' and path.startswith('/invoices/'):
        invoice_id = path.split('/invoices/')[-1]
        return delete_invoice(invoice_id)

    if method == 'POST' and path.endswith('/mark-paid'):
        invoice_id = path.replace('/invoices/', '').replace('/mark-paid', '')
        return mark_paid(invoice_id)

    if method == 'POST' and path == '/invoices/import-csv':
        body = json.loads(event.get('body', '{}'))
        csv_text = body.get('csv', '')
        if not csv_text:
            return respond(400, {'error': 'Missing csv field'})
        return import_csv(csv_text)

    return respond(404, {'error': 'Not found'})
