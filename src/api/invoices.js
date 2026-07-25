const API_BASE = '/api'

export async function getInvoice(id) {
  const res = await fetch(`${API_BASE}/invoices/${id}`)
  if (!res.ok) throw new Error('Invoice not found')
  return res.json()
}

export async function listInvoices(adminKey) {
  const res = await fetch(`${API_BASE}/invoices`, {
    headers: { 'X-Admin-Key': adminKey },
  })
  if (!res.ok) throw new Error('Unauthorized')
  return res.json()
}

export async function createInvoice(data, adminKey) {
  const res = await fetch(`${API_BASE}/invoices`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Admin-Key': adminKey },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to create invoice')
  return res.json()
}

export async function updateInvoice(id, data, adminKey) {
  const res = await fetch(`${API_BASE}/invoices/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'X-Admin-Key': adminKey },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to update invoice')
  return res.json()
}

export async function createCheckout(invoiceId) {
  const res = await fetch(`${API_BASE}/invoices/${invoiceId}/checkout`, {
    method: 'POST',
  })
  if (!res.ok) throw new Error('Failed to create checkout session')
  return res.json()
}

export async function importCsv(csvText, adminKey) {
  const res = await fetch(`${API_BASE}/invoices/import-csv`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Admin-Key': adminKey },
    body: JSON.stringify({ csv: csvText }),
  })
  if (!res.ok) throw new Error('Failed to import CSV')
  return res.json()
}

export async function deleteInvoice(id, adminKey) {
  const res = await fetch(`${API_BASE}/invoices/${id}`, {
    method: 'DELETE',
    headers: { 'X-Admin-Key': adminKey },
  })
  if (!res.ok) throw new Error('Failed to delete invoice')
  return res.json()
}

export async function markPaid(id, adminKey) {
  const res = await fetch(`${API_BASE}/invoices/${id}/mark-paid`, {
    method: 'POST',
    headers: { 'X-Admin-Key': adminKey },
  })
  if (!res.ok) throw new Error('Failed to mark as paid')
  return res.json()
}
