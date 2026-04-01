import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Upload, Trash2, ExternalLink, CheckCircle } from 'lucide-react'
import { listInvoices, createInvoice, importCsv, deleteInvoice, markPaid } from '../api/invoices'
import './InvoiceAdmin.css'

function InvoiceAdmin() {
  const [adminKey, setAdminKey] = useState(() => sessionStorage.getItem('hiro-admin-key') || '')
  const [authed, setAuthed] = useState(false)
  const [invoices, setInvoices] = useState([])
  const [view, setView] = useState('list') // list | create | csv
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Create form state
  const [form, setForm] = useState({ client: '', email: '', dueDate: '', milestone: '', notes: '', stripePaymentLink: '', items: [{ description: '', details: '', quantity: '', unit: 'hrs', rate: '' }] })
  const [csvText, setCsvText] = useState('')

  useEffect(() => { document.title = 'Invoice Admin - hiro labs' }, [])

  const loadInvoices = useCallback(async (key) => {
    try {
      const data = await listInvoices(key || adminKey)
      setInvoices(data)
      setAuthed(true)
      setError('')
    } catch { setError('Invalid admin key') }
  }, [adminKey])

  const handleLogin = (e) => {
    e.preventDefault()
    sessionStorage.setItem('hiro-admin-key', adminKey)
    loadInvoices(adminKey)
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const items = form.items.filter(i => i.description).map(i => ({ ...i, quantity: Number(i.quantity), rate: Number(i.rate) }))
      await createInvoice({ ...form, items }, adminKey)
      setSuccess('Invoice created')
      setForm({ client: '', email: '', dueDate: '', milestone: '', notes: '', stripePaymentLink: '', items: [{ description: '', details: '', quantity: '', unit: 'hrs', rate: '' }] })
      setView('list')
      loadInvoices()
    } catch { setError('Failed to create invoice') }
  }

  const handleCsvImport = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const result = await importCsv(csvText, adminKey)
      setSuccess(`Imported ${result.imported} invoice(s): ${result.ids.join(', ')}`)
      setCsvText('')
      setView('list')
      loadInvoices()
    } catch { setError('Failed to import CSV') }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setCsvText(ev.target.result)
    reader.readAsText(file)
  }

  const addItem = () => setForm(f => ({ ...f, items: [...f.items, { description: '', details: '', quantity: '', unit: 'hrs', rate: '' }] }))
  const removeItem = (i) => setForm(f => ({ ...f, items: f.items.filter((_, idx) => idx !== i) }))
  const updateItem = (i, field, val) => setForm(f => ({ ...f, items: f.items.map((item, idx) => idx === i ? { ...item, [field]: val } : item) }))

  const handleDelete = async (id) => {
    if (!confirm(`Delete invoice ${id}?`)) return
    try {
      await deleteInvoice(id, adminKey)
      setSuccess(`Deleted ${id}`)
      loadInvoices()
    } catch { setError('Failed to delete') }
  }

  const handleMarkPaid = async (id) => {
    if (!confirm(`Mark ${id} as paid?`)) return
    try {
      await markPaid(id, adminKey)
      setSuccess(`${id} marked as paid`)
      loadInvoices()
    } catch { setError('Failed to mark as paid') }
  }

  if (!authed) {
    return (
      <div className="admin-page">
        <div className="admin-login">
          <h1>Invoice Admin</h1>
          <form onSubmit={handleLogin}>
            <input type="password" placeholder="Admin key" value={adminKey} onChange={e => setAdminKey(e.target.value)} autoFocus />
            <button type="submit">Login</button>
          </form>
          {error && <p className="admin-error">{error}</p>}
        </div>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <div className="admin-container">
        <div className="admin-header">
          <h1>Invoices</h1>
          <div className="admin-actions">
            <button onClick={() => setView('create')} className={view === 'create' ? 'active' : ''}><Plus size={16} /> Create</button>
            <button onClick={() => setView('csv')} className={view === 'csv' ? 'active' : ''}><Upload size={16} /> Import CSV</button>
          </div>
        </div>

        {error && <p className="admin-error">{error}</p>}
        {success && <p className="admin-success">{success}</p>}

        {view === 'list' && (
          <div className="admin-table">
            <div className="admin-table-header">
              <span>Invoice</span><span>Client</span><span>Status</span><span>Total</span><span>Due</span><span></span>
            </div>
            {invoices.map(inv => (
              <div key={inv.id} className="admin-table-row">
                <span className="mono">{inv.id}</span>
                <span>{inv.client}</span>
                <span className={`admin-status status-${inv.status}`}>{inv.status}</span>
                <span>${Number(inv.subtotal).toFixed(2)}</span>
                <span>{inv.dueDate}</span>
                <div className="admin-row-actions">
                  {inv.status !== 'paid' && <button onClick={() => handleMarkPaid(inv.id)} title="Mark as paid"><CheckCircle size={14} /></button>}
                  <Link to={`/invoice/${inv.id}`} target="_blank" title="View"><ExternalLink size={14} /></Link>
                  <button onClick={() => handleDelete(inv.id)} title="Delete" className="delete-btn"><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
            {invoices.length === 0 && <p className="admin-empty">No invoices yet</p>}
          </div>
        )}

        {view === 'create' && (
          <form onSubmit={handleCreate} className="admin-form">
            <div className="form-row">
              <input placeholder="Client name" value={form.client} onChange={e => setForm(f => ({ ...f, client: e.target.value }))} required />
              <input placeholder="Client email" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            </div>
            <div className="form-row">
              <input placeholder="Due date (YYYY-MM-DD)" value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))} />
              <input placeholder="Milestone (e.g. Milestone 2 of 4)" value={form.milestone} onChange={e => setForm(f => ({ ...f, milestone: e.target.value }))} />
            </div>
            <input placeholder="Stripe Payment Link" value={form.stripePaymentLink} onChange={e => setForm(f => ({ ...f, stripePaymentLink: e.target.value }))} />
            <textarea placeholder="Notes" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={2} />

            <h3>Line Items</h3>
            {form.items.map((item, i) => (
              <div key={i} className="item-row">
                <input placeholder="Description" value={item.description} onChange={e => updateItem(i, 'description', e.target.value)} required />
                <input placeholder="Details" value={item.details} onChange={e => updateItem(i, 'details', e.target.value)} />
                <input placeholder="Qty" type="number" value={item.quantity} onChange={e => updateItem(i, 'quantity', e.target.value)} required className="small" />
                <input placeholder="Unit" value={item.unit} onChange={e => updateItem(i, 'unit', e.target.value)} className="small" />
                <input placeholder="Rate" type="number" value={item.rate} onChange={e => updateItem(i, 'rate', e.target.value)} required className="small" />
                {form.items.length > 1 && <button type="button" onClick={() => removeItem(i)} className="remove-btn"><Trash2 size={14} /></button>}
              </div>
            ))}
            <button type="button" onClick={addItem} className="add-item-btn"><Plus size={14} /> Add Item</button>
            <button type="submit" className="submit-btn">Create Invoice</button>
          </form>
        )}

        {view === 'csv' && (
          <form onSubmit={handleCsvImport} className="admin-form">
            <p className="csv-help">CSV columns: invoice_id, client, email, status, issue_date, due_date, milestone, notes, stripe_link, description, details, quantity, unit, rate</p>
            <p className="csv-help">Rows with the same invoice_id are grouped as line items on one invoice.</p>
            <input type="file" accept=".csv" onChange={handleFileUpload} />
            <textarea placeholder="Or paste CSV here..." value={csvText} onChange={e => setCsvText(e.target.value)} rows={10} className="mono" />
            <button type="submit" className="submit-btn" disabled={!csvText}>Import</button>
          </form>
        )}
      </div>
    </div>
  )
}

export default InvoiceAdmin
