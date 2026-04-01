import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import './InvoiceLookup.css'

function InvoiceLookup() {
  const [invoiceId, setInvoiceId] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Pay Invoice - hiro labs'
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (invoiceId.trim()) navigate(`/invoice/${invoiceId.trim()}`)
  }

  return (
    <div className="lookup-page">
      <div className="lookup-container">
        <h1>Pay an Invoice</h1>
        <p>Enter your invoice number to view and pay.</p>
        <form onSubmit={handleSubmit} className="lookup-form">
          <div className="lookup-input-wrap">
            <Search size={20} />
            <input
              type="text"
              placeholder="INV-2026-XXXX"
              value={invoiceId}
              onChange={(e) => setInvoiceId(e.target.value)}
              autoFocus
            />
          </div>
          <button type="submit">View Invoice</button>
        </form>
      </div>
    </div>
  )
}

export default InvoiceLookup
