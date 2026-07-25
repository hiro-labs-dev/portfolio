// Placeholder API route for questionnaire
// TODO: Replace DynamoDB with Vercel KV, Supabase, or another free database

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-Admin-Key')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  return res.status(503).json({
    error: 'API temporarily unavailable',
    message: 'Questionnaire system is being migrated.',
  })
}
