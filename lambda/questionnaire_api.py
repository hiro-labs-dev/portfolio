import json
import os
import uuid
import hashlib
import urllib.request
from datetime import datetime

import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ.get('TABLE_NAME', 'hiro-questionnaire-submissions'))

OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY', '')
ADMIN_KEY = os.environ.get('ADMIN_KEY', '')
CORS_HEADERS = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': os.environ.get('ALLOWED_ORIGIN', 'https://hiro-labs.dev'),
    'Access-Control-Allow-Headers': 'Content-Type,X-Admin-Key',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,OPTIONS',
}


def respond(status, body):
    return {'statusCode': status, 'headers': CORS_HEADERS, 'body': json.dumps(body, default=str)}


def hash_password(pw):
    return hashlib.sha256(pw.encode()).hexdigest()


def handler(event, context):
    rc = event.get('requestContext', {}).get('http', {})
    method = rc.get('method', '')
    path = rc.get('path', '')

    if method == 'OPTIONS':
        return respond(200, {})

    if method == 'POST' and path == '/questionnaire':
        return save_submission(event)
    if method == 'PUT' and path == '/questionnaire':
        return update_submission(event)
    if method == 'POST' and path == '/questionnaire/resume':
        return resume_submission(event)
    if method == 'GET' and path == '/questionnaire':
        return list_submissions(event)
    if method == 'POST' and path == '/questionnaire-ai':
        return ai_suggest(event)

    return respond(404, {'error': 'Not found'})


def save_submission(event):
    try:
        body = json.loads(event.get('body', '{}'))
    except Exception:
        return respond(400, {'error': 'Invalid JSON'})

    responses = body.get('responses', {})
    password = body.get('password', '')
    status = body.get('status', 'complete')

    item = {
        'id': str(uuid.uuid4()),
        'submittedAt': datetime.utcnow().isoformat() + 'Z',
        'updatedAt': datetime.utcnow().isoformat() + 'Z',
        'businessName': responses.get('businessName', 'Unknown'),
        'status': status,
        'responses': responses,
    }
    if password:
        item['passwordHash'] = hash_password(password)

    table.put_item(Item=item)
    return respond(200, {'id': item['id'], 'status': status, 'message': 'Submission saved'})


def update_submission(event):
    try:
        body = json.loads(event.get('body', '{}'))
    except Exception:
        return respond(400, {'error': 'Invalid JSON'})

    sub_id = body.get('id', '')
    password = body.get('password', '')
    responses = body.get('responses', {})
    status = body.get('status', 'complete')

    if not sub_id or not password:
        return respond(400, {'error': 'Missing id or password'})

    result = table.get_item(Key={'id': sub_id})
    item = result.get('Item')
    if not item:
        return respond(404, {'error': 'Not found'})
    if item.get('passwordHash') != hash_password(password):
        return respond(401, {'error': 'Wrong password'})

    table.update_item(
        Key={'id': sub_id},
        UpdateExpression='SET responses = :r, #s = :st, businessName = :bn, updatedAt = :u',
        ExpressionAttributeNames={'#s': 'status'},
        ExpressionAttributeValues={
            ':r': responses,
            ':st': status,
            ':bn': responses.get('businessName', item.get('businessName', 'Unknown')),
            ':u': datetime.utcnow().isoformat() + 'Z',
        },
    )
    return respond(200, {'id': sub_id, 'status': status, 'message': 'Submission updated'})


def resume_submission(event):
    try:
        body = json.loads(event.get('body', '{}'))
    except Exception:
        return respond(400, {'error': 'Invalid JSON'})

    sub_id = body.get('id', '')
    password = body.get('password', '')

    if not sub_id or not password:
        return respond(400, {'error': 'Missing id or password'})

    result = table.get_item(Key={'id': sub_id})
    item = result.get('Item')
    if not item:
        return respond(404, {'error': 'Not found'})
    if item.get('passwordHash') != hash_password(password):
        return respond(401, {'error': 'Wrong password'})

    return respond(200, {
        'id': item['id'],
        'status': item.get('status', 'complete'),
        'responses': item.get('responses', {}),
        'step': item.get('step', 0),
    })


def list_submissions(event):
    headers = {k.lower(): v for k, v in (event.get('headers') or {}).items()}
    if headers.get('x-admin-key') != ADMIN_KEY:
        return respond(401, {'error': 'Unauthorized'})

    result = table.scan()
    items = sorted(result.get('Items', []), key=lambda x: x.get('submittedAt', ''), reverse=True)
    # Strip password hashes from response
    for item in items:
        item.pop('passwordHash', None)
    return respond(200, items)


def ai_suggest(event):
    try:
        body = json.loads(event.get('body', '{}'))
    except Exception:
        return respond(400, {'error': 'Invalid JSON'})

    prompt = f"""You are helping pre-fill a website project questionnaire for a small business client.

Business: {body.get('businessName', '')}
Industry: RV Inspection
Service area: {body.get('serviceArea', '')}
Inspection types: {body.get('inspectionTypes', '')}
Pricing model: {body.get('pricing', '')}

Based on this business profile, suggest the most likely answers for these website questionnaire fields. Return a JSON object with these exact keys and short string values matching the option text exactly:

- primaryGoal (options: "Generate leads", "Book appointments online", "Establish online presence", "All of the above")
- onlineBooking (options: "Yes", "No", "Maybe later")
- contactForm (options: "Contact form", "Phone/email is fine", "Both")
- testimonials (options: "Yes", "No", "Maybe later")
- faq (options: "Yes", "No")
- gallery (options: "Yes", "No", "Maybe later")
- blog (options: "Yes", "No", "Maybe later")
- liveChat (options: "Yes", "No", "Maybe later")
- designStyle (options: "Clean and minimal", "Bold and image-heavy", "Somewhere in between", "Not sure — surprise me")
- animations (options: "Yes, make it dynamic", "Keep it simple and fast", "A few subtle ones")
- pages (free text - suggest a comma-separated list of pages)
- contentReady (options: "I have content ready", "I need help writing it", "I have some, need help with the rest")
- photos (options: "Yes", "No, I'll need stock images", "I have some, need more")
- googleMaps (options: "Yes", "No")
- analytics (options: "Yes", "No")
- emailMarketing (options: "Yes", "No", "Maybe later")
- socialMedia (options: "Just links", "Embedded feeds", "No")
- crm (options: "Yes", "No")
- payments (options: "Yes, I want online payments", "No, I invoice separately")
- cms (options: "Yes", "No, I'll have you make changes", "Not sure")
- seo (options: "Yes, basic SEO", "Yes, advanced SEO", "No")
- googleBusiness (options: "Yes", "No", "I already have one")

Return ONLY valid JSON, no markdown, no explanation."""

    req = urllib.request.Request(
        'https://api.openai.com/v1/chat/completions',
        data=json.dumps({
            'model': 'gpt-4o-mini',
            'messages': [{'role': 'user', 'content': prompt}],
            'temperature': 0.3,
        }).encode(),
        headers={
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {OPENAI_API_KEY}',
        },
    )

    try:
        with urllib.request.urlopen(req, timeout=15) as res:
            data = json.loads(res.read())
        content = data['choices'][0]['message']['content'].strip()
        if content.startswith('```'):
            content = content.split('\n', 1)[1].rsplit('```', 1)[0].strip()
        suggestions = json.loads(content)
        return respond(200, {'suggestions': suggestions})
    except Exception as e:
        return respond(500, {'error': str(e)})
