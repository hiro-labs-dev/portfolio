import json
import os
import urllib.request

OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY', '')

CORS_HEADERS = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': os.environ.get('ALLOWED_ORIGIN', 'https://hiro-labs.com'),
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST,OPTIONS',
}


def respond(status, body):
    return {'statusCode': status, 'headers': CORS_HEADERS, 'body': json.dumps(body)}


def handler(event, context):
    if event.get('httpMethod') == 'OPTIONS':
        return respond(200, {})

    try:
        body = json.loads(event.get('body', '{}'))
    except Exception:
        return respond(400, {'error': 'Invalid JSON'})

    business_name = body.get('businessName', '')
    service_area = body.get('serviceArea', '')
    inspection_types = body.get('inspectionTypes', '')
    pricing = body.get('pricing', '')

    prompt = f"""You are helping pre-fill a website project questionnaire for a small business client.

Business: {business_name}
Industry: RV Inspection
Service area: {service_area}
Inspection types: {inspection_types}
Pricing model: {pricing}

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
        # Strip markdown fences if present
        if content.startswith('```'):
            content = content.split('\n', 1)[1].rsplit('```', 1)[0].strip()
        suggestions = json.loads(content)
        return respond(200, {'suggestions': suggestions})
    except Exception as e:
        return respond(500, {'error': str(e)})
