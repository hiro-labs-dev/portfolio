import { useState, useEffect, useCallback } from 'react'
import { ChevronDown, ChevronUp, LogIn } from 'lucide-react'
import './QuestionnaireSubmissions.css'

const API_BASE = '/api'

const FIELD_LABELS = {
  businessName: 'Business Name', hasLogo: 'Logo & Brand Colors', existingWebsite: 'Existing Website',
  serviceArea: 'Service Area', inspectionTypes: 'Inspection Types', pricing: 'Pricing Model',
  showPricing: 'Show Pricing on Site', primaryGoal: 'Primary Goal', onlineBooking: 'Online Booking',
  contactForm: 'Contact Form', testimonials: 'Testimonials', faq: 'FAQ Section', gallery: 'Photo Gallery',
  blog: 'Blog', liveChat: 'Live Chat/Chatbot', exampleSites: 'Example Sites', designStyle: 'Design Style',
  brandColors: 'Brand Colors', needLogo: 'Need Logo', fontPreference: 'Font Preference',
  animations: 'Animations', pages: 'Pages', contentReady: 'Content Ready', photos: 'Photos',
  certifications: 'Certifications', googleMaps: 'Google Maps', analytics: 'Analytics',
  emailMarketing: 'Email Marketing', socialMedia: 'Social Media', crm: 'CRM', payments: 'Payments',
  cms: 'CMS', seo: 'SEO', seoKeywords: 'SEO Keywords', googleBusiness: 'Google Business Profile',
  hasDomain: 'Has Domain', domainName: 'Domain Name', domainRegistrar: 'Domain Registrar',
  domainAccess: 'Domain Access', maintenance: 'Maintenance', revisions: 'Revisions',
  launchDate: 'Launch Date', budget: 'Budget', ongoingSupport: 'Ongoing Support',
  privacyPolicy: 'Privacy Policy', additionalNotes: 'Additional Notes',
}

function QuestionnaireSubmissions() {
  const [adminKey, setAdminKey] = useState(() => sessionStorage.getItem('hiro-admin-key') || '')
  const [authed, setAuthed] = useState(false)
  const [submissions, setSubmissions] = useState([])
  const [expanded, setExpanded] = useState({})
  const [error, setError] = useState('')

  useEffect(() => { document.title = 'Questionnaire Submissions - hiro labs' }, [])

  const load = useCallback(async (key) => {
    try {
      const res = await fetch(`${API_BASE}/questionnaire`, { headers: { 'X-Admin-Key': key || adminKey } })
      if (!res.ok) throw new Error()
      setSubmissions(await res.json())
      setAuthed(true)
      setError('')
    } catch { setError('Invalid admin key') }
  }, [adminKey])

  const handleLogin = (e) => {
    e.preventDefault()
    sessionStorage.setItem('hiro-admin-key', adminKey)
    load(adminKey)
  }

  const toggle = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }))

  if (!authed) {
    return (
      <div className="qs-page">
        <div className="qs-login">
          <h1>Questionnaire Submissions</h1>
          <form onSubmit={handleLogin}>
            <input type="password" value={adminKey} onChange={e => setAdminKey(e.target.value)} placeholder="Admin key" />
            <button type="submit"><LogIn size={16} /> Sign In</button>
          </form>
          {error && <p className="qs-error">{error}</p>}
        </div>
      </div>
    )
  }

  return (
    <div className="qs-page">
      <div className="qs-header">
        <h1>Questionnaire Submissions</h1>
        <p>{submissions.length} submission{submissions.length !== 1 ? 's' : ''}</p>
      </div>
      <div className="qs-list">
        {submissions.length === 0 && <p className="qs-empty">No submissions yet.</p>}
        {submissions.map(sub => (
          <div className="qs-card" key={sub.id}>
            <button className="qs-card-header" onClick={() => toggle(sub.id)}>
              <div>
                <h3>{sub.businessName || 'Unknown Business'} <span className={`qs-status ${sub.status === 'complete' ? 'qs-complete' : 'qs-draft'}`}>{sub.status === 'complete' ? 'Complete' : 'Incomplete'}</span></h3>
                <span className="qs-date">{new Date(sub.submittedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })}</span>
              </div>
              {expanded[sub.id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {expanded[sub.id] && (
              <div className="qs-card-body">
                {Object.entries(sub.responses || {}).map(([key, val]) => (
                  val && <div className="qs-field" key={key}>
                    <span className="qs-field-label">{FIELD_LABELS[key] || key}</span>
                    <span className="qs-field-value">{val}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuestionnaireSubmissions
