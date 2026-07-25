// Placeholder API route for invoices
// TODO: Replace DynamoDB with Vercel KV, Supabase, or another free database
// For now, this returns a helpful message so the frontend doesn't break

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-Admin-Key')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  return res.status(503).json({
    error: 'API temporarily unavailable',
    message: 'Invoice system is being migrated. Contact roddydevelops@gmail.com for invoice inquiries.',
  })
}
