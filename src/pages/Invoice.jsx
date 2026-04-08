import { useEffect, useState, useRef } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { CheckCircle, CreditCard, ChevronDown, ChevronRight } from 'lucide-react'
import { getInvoice, createCheckout } from '../api/invoices'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import './Invoice.css'

function Invoice() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const [invoice, setInvoice] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [paying, setPaying] = useState(false)
  const [expanded, setExpanded] = useState({})
  const wrapRef = useRef(null)

  const handleDownloadPDF = async () => {
    setExpanded(Object.fromEntries(invoice.items.map((_, i) => [i, true])))
    await new Promise(r => setTimeout(r, 100))
    const el = wrapRef.current
    const canvas = await html2canvas(el, { backgroundColor: '#0d1117', scale: 1.5, useCORS: true })
    const imgData = canvas.toDataURL('image/jpeg', 0.8)
    const pxW = canvas.width
    const pxH = canvas.height
    const pdfW = 210
    const pdfH = (pxH * pdfW) / pxW
    const pdf = new jsPDF({ unit: 'mm', format: [pdfW, pdfH], compress: true })
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfW, pdfH)
    pdf.save(`invoice-${invoice.id}.pdf`)
  }

  useEffect(() => {
    document.title = `Invoice ${id} - hiro labs`
    getInvoice(id)
      .then(setInvoice)
      .catch(() => setError('Invoice not found'))
      .finally(() => setLoading(false))
  }, [id])

  const handlePay = async () => {
    setPaying(true)
    try {
      const { url } = await createCheckout(id)
      window.location.href = url
    } catch {
      setError('Failed to start payment. Please try again.')
      setPaying(false)
    }
  }

  if (loading) return <div className="inv"><div className="inv-loading">Loading invoice...</div></div>
  if (error && !invoice) return <div className="inv"><div className="inv-loading">{error}</div></div>

  const isPaid = invoice.status === 'paid' || searchParams.get('paid') === 'true'

  return (
    <div className="inv">
      <div className="inv-wrap" ref={wrapRef}>

        {/* Header */}
        <div className="inv-header">
          <div>
            <h1>hiro labs</h1>
            <div className="inv-tagline">Software Engineering & Infrastructure</div>
          </div>
          <div className="inv-header-right">
            {invoice.issueDate}<br />
            <a href="https://hiro-labs.dev">hiro-labs.dev</a><br />
            Tampa, FL<br />
            <a href="mailto:roddy@hiro-labs.dev">roddy@hiro-labs.dev</a>
          </div>
        </div>

        {/* Meta bar */}
        <div className="inv-meta-bar">
          <div className="inv-meta-block">
            <h3>Billed To</h3>
            <p><strong>{invoice.client}</strong></p>
          </div>
          <div className="inv-meta-block">
            <h3>Invoice</h3>
            <p>{invoice.id}</p>
          </div>
          <div className="inv-meta-block">
            <h3>Date</h3>
            <p>{invoice.issueDate}</p>
          </div>
          <div className="inv-meta-block">
            <h3>Due</h3>
            <p>{invoice.dueDate}</p>
          </div>
          <div className="inv-meta-actions">
            <div className={`inv-amount-box ${isPaid ? 'paid' : ''}`}>
              <div className="inv-amount-label">{isPaid ? 'Paid' : 'Amount Due'}</div>
              <div className="inv-amount">${Number(invoice.subtotal).toFixed(2)}</div>
            </div>
            <button onClick={handleDownloadPDF} className="inv-pdf-btn">Save as PDF</button>
          </div>
        </div>

        {/* Content */}
        <div className="inv-content">

          {invoice.milestone && (
            <>
              <h2 className="inv-section-title">Overview</h2>
              <p className="inv-overview">{invoice.milestone}</p>
            </>
          )}

          {invoice.notes && <p className="inv-overview">{invoice.notes}</p>}

          {/* Line items */}
          <h2 className="inv-section-title">Breakdown</h2>

          {invoice.items?.map((item, i) => {
            const amount = (Number(item.quantity) * Number(item.rate)).toFixed(2)
            // Parse details: split on commas, each entry like "Name ($X.XX)"
            // Trailing sentence after last ")" is a note
            const raw = item.details || ''
            const lineItems = []
            let note = ''
            
            // Match all "something ($number)" patterns
            const entryRegex = /([^,]+?\(\$[\d.]+\))/g
            let match
            while ((match = entryRegex.exec(raw)) !== null) {
              const entry = match[1].trim()
              const inner = entry.match(/^(.+?)\s*\(\$([\d.]+)\)$/)
              if (inner) lineItems.push({ name: inner[1].trim(), cost: inner[2] })
            }
            
            // Anything after the last ($X.XX) pattern is a note
            const lastParen = raw.lastIndexOf(')')
            if (lastParen !== -1 && lastParen < raw.length - 1) {
              note = raw.slice(lastParen + 1).replace(/^[\s.,]+/, '').trim()
            }

            return (
              <div key={i} className="inv-month-section">
                <div className="inv-month-header" onClick={() => setExpanded(e => ({ ...e, [i]: !e[i] }))} role="button">
                  <span className="inv-month-toggle">
                    {expanded[i] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    {item.description}
                  </span>
                  <span className="inv-month-total">${amount}</span>
                </div>
                {expanded[i] && (
                  <>
                    {note && <div className="inv-month-note">{note}</div>}
                    {lineItems.length > 0 && (
                      <ul className="inv-item-list">
                        {lineItems.map((li, j) => (
                          <li key={j}><span>{li.name}</span><span>${Number(li.cost).toFixed(2)}</span></li>
                        ))}
                      </ul>
                    )}
                    {lineItems.length === 0 && item.details && (
                      <p className="inv-overview" style={{ marginTop: 8 }}>{item.details}</p>
                    )}
                  </>
                )}
              </div>
            )
          })}

          {/* Total */}
          <div className="inv-total-row">
            <span>Total</span>
            <strong>${Number(invoice.subtotal).toFixed(2)}</strong>
          </div>

          {/* Pay / Paid */}
          {isPaid ? (
            <div className="inv-paid-banner">
              <CheckCircle size={20} />
              This invoice has been paid{invoice.paidDate ? ` on ${invoice.paidDate}` : ''}
            </div>
          ) : (
            <button onClick={handlePay} disabled={paying} className="inv-pay-btn">
              <CreditCard size={20} />
              {paying ? 'Redirecting to payment...' : `Pay Now — $${Number(invoice.subtotal).toFixed(2)}`}
            </button>
          )}

          {error && <p className="inv-error">{error}</p>}
        </div>

        {/* Footer */}
        <div className="inv-footer">
          Questions about any line item can be directed to Hiro Labs — <a href="https://hiro-labs.dev">hiro-labs.dev</a>
        </div>

      </div>
    </div>
  )
}

export default Invoice
