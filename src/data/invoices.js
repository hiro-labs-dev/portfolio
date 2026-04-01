// Invoice statuses: 'draft', 'sent', 'paid', 'overdue'
// Add your Stripe payment links per invoice, or use a single Stripe Checkout integration

const invoices = [
  {
    id: 'INV-2026-001',
    client: 'Acme Corp',
    email: 'billing@acme.example.com',
    status: 'sent',
    issueDate: '2026-04-01',
    dueDate: '2026-04-15',
    milestone: 'Milestone 2 of 4 — API Development',
    notes: 'Payment due within 14 days of invoice date.',
    // Replace with your Stripe Payment Link or Checkout URL
    stripePaymentLink: 'https://buy.stripe.com/YOUR_LINK_HERE',
    items: [
      {
        description: 'API architecture & endpoint design',
        details: 'RESTful API design for user management, billing, and reporting modules',
        quantity: 12,
        unit: 'hrs',
        rate: 150,
      },
      {
        description: 'Stripe payment integration',
        details: 'Checkout sessions, webhooks, subscription management',
        quantity: 8,
        unit: 'hrs',
        rate: 150,
      },
      {
        description: 'Database schema & migrations',
        details: 'PostgreSQL schema design, Django models, data migrations',
        quantity: 6,
        unit: 'hrs',
        rate: 150,
      },
      {
        description: 'Testing & QA',
        details: 'Unit tests, integration tests, API endpoint validation',
        quantity: 4,
        unit: 'hrs',
        rate: 150,
      },
    ],
  },
  {
    id: 'INV-2026-002',
    client: 'StartupXYZ',
    email: 'founder@startupxyz.example.com',
    status: 'paid',
    issueDate: '2026-03-15',
    dueDate: '2026-03-29',
    paidDate: '2026-03-27',
    milestone: 'Milestone 1 of 3 — MVP Frontend',
    notes: '',
    stripePaymentLink: '',
    items: [
      {
        description: 'UI/UX implementation',
        details: 'React components, responsive layouts, design system setup',
        quantity: 16,
        unit: 'hrs',
        rate: 150,
      },
      {
        description: 'Authentication flow',
        details: 'Login, registration, password reset with JWT',
        quantity: 6,
        unit: 'hrs',
        rate: 150,
      },
    ],
  },
]

export function getInvoice(id) {
  return invoices.find((inv) => inv.id.toLowerCase() === id.toLowerCase())
}

export default invoices
