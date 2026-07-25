import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Send, CheckCircle, Sparkles, Save, KeyRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import './ClientQuestionnaire.css'

const API_BASE = '/api'

const STEPS = [
  {
    title: 'Business Basics',
    fields: [
      { name: 'businessName', label: 'What\'s the business name?', type: 'text', required: true },
      { name: 'hasLogo', label: 'Do you have a logo and brand colors already?', type: 'pills', options: ['Yes, I have both', 'Logo but no brand colors', 'Brand colors but no logo', 'No, I need both created'], required: true },
      { name: 'existingWebsite', label: 'Do you have an existing website?', type: 'text', placeholder: 'e.g. www.example.com or "No"', required: true },
      { name: 'serviceArea', label: 'What\'s your service area?', type: 'textarea', placeholder: 'Cities, counties, or states you serve', required: true },
      { name: 'inspectionTypes', label: 'What types of RV inspections do you offer?', type: 'textarea', placeholder: 'e.g. pre-purchase, annual, insurance, roof, etc.', required: true },
      { name: 'pricing', label: 'Do you have set pricing, or do you quote per job?', type: 'pills', options: ['Set pricing', 'Quote per job', 'Mix of both'], required: true },
      { name: 'showPricing', label: 'Do you want pricing displayed on the site?', type: 'pills', options: ['Yes', 'No', 'Maybe — let\'s discuss'], required: true },
    ]
  },
  {
    title: 'Website Goals & Features',
    fields: [
      { name: 'primaryGoal', label: 'What\'s the primary goal of the site?', type: 'pills', options: ['Generate leads', 'Book appointments online', 'Establish online presence', 'All of the above'], required: true },
      { name: 'onlineBooking', label: 'Do you need online booking/scheduling? 💲', type: 'pills', options: ['Yes', 'No', 'Maybe later'], note: 'Add-on cost', required: true },
      { name: 'contactForm', label: 'Contact form or phone/email?', type: 'pills', options: ['Contact form', 'Phone/email is fine', 'Both'], required: true },
      { name: 'testimonials', label: 'Customer testimonials on the site?', type: 'pills', options: ['Yes', 'No', 'Maybe later'], required: true },
      { name: 'faq', label: 'FAQ section?', type: 'pills', options: ['Yes', 'No'], required: true },
      { name: 'gallery', label: 'Photo gallery of past inspections?', type: 'pills', options: ['Yes', 'No', 'Maybe later'], required: true },
      { name: 'blog', label: 'Blog or resources section?', type: 'pills', options: ['Yes', 'No', 'Maybe later'], required: true },
      { name: 'liveChat', label: 'Live chat or chatbot? 💲💲', type: 'pills', options: ['Yes', 'No', 'Maybe later'], note: 'Significant add-on — requires third-party service with ongoing monthly fees', required: true },
    ]
  },
  {
    title: 'Design & Styling',
    fields: [
      { name: 'exampleSites', label: 'Any websites you like the look of? (2-3 examples)', type: 'textarea', placeholder: 'Paste URLs or describe the vibe you\'re going for', required: true },
      { name: 'designStyle', label: 'What design style do you prefer?', type: 'pills', options: ['Clean and minimal', 'Bold and image-heavy', 'Somewhere in between', 'Not sure — surprise me'], required: true },
      { name: 'brandColors', label: 'Brand colors?', type: 'text', placeholder: 'e.g. "Navy blue and orange" or "Need help choosing"', required: true },
      { name: 'needLogo', label: 'Do you need a logo designed? 💲', type: 'pills', options: ['Yes', 'No, I have one'], note: 'Add-on cost', required: true },
      { name: 'fontPreference', label: 'Font preference?', type: 'text', placeholder: 'e.g. "Something modern" or "You pick"', required: true },
      { name: 'animations', label: 'Animations or interactive elements? 💲', type: 'pills', options: ['Yes, make it dynamic', 'Keep it simple and fast', 'A few subtle ones'], note: 'Add-on cost for custom animations', required: true },
    ]
  },
  {
    title: 'Pages & Content',
    fields: [
      { name: 'pages', label: 'What pages do you want?', type: 'textarea', placeholder: 'e.g. Home, About, Services, Contact, Gallery, FAQ...', required: true },
      { name: 'contentReady', label: 'Do you have written content ready? 💲', type: 'pills', options: ['I have content ready', 'I need help writing it', 'I have some, need help with the rest'], note: 'Add-on cost for copywriting', required: true },
      { name: 'photos', label: 'Do you have professional photos? 💲', type: 'pills', options: ['Yes', 'No, I\'ll need stock images', 'I have some, need more'], note: 'Possible add-on for stock photo licensing', required: true },
      { name: 'certifications', label: 'Any certifications or credentials to highlight?', type: 'text', placeholder: 'e.g. NRVIA, RVDA, or "None"', required: true },
    ]
  },
  {
    title: 'Technical & Integrations',
    fields: [
      { name: 'googleMaps', label: 'Google Maps for your service area?', type: 'pills', options: ['Yes', 'No'], required: true },
      { name: 'analytics', label: 'Google Analytics?', type: 'pills', options: ['Yes', 'No', 'What is that?'], note: 'Free — shows how many people visit your site and where they come from', required: true },
      { name: 'emailMarketing', label: 'Email marketing integration? 💲', type: 'pills', options: ['Yes', 'No', 'Maybe later'], note: 'Tools like Mailchimp for collecting emails and sending newsletters', required: true },
      { name: 'socialMedia', label: 'Social media on the site?', type: 'pills', options: ['Just links', 'Embedded feeds', 'No'], required: true },
      { name: 'crm', label: 'CRM connected? 💲', type: 'pills', options: ['Yes', 'No', 'What is that?'], note: 'Keeps track of your leads and customers in one place (e.g. HubSpot, Salesforce)', required: true },
      { name: 'payments', label: 'Online payments? 💲', type: 'pills', options: ['Yes, I want online payments', 'No, I invoice separately'], note: 'Add-on cost for payment integration', required: true },
    ]
  },
  {
    title: 'CMS & SEO',
    description: 'These affect the base cost and long-term maintenance of your site.',
    fields: [
      { name: 'cms', label: 'Do you want a CMS so you can edit the site yourself? 💲', type: 'pills', options: ['Yes', 'No, I\'ll have you make changes', 'Not sure'], note: 'A CMS gives you a dashboard to update text, swap photos, and add blog posts without needing a developer.', required: true },
      { name: 'seo', label: 'Do you want SEO work done? 💲', type: 'pills', options: ['Yes, basic SEO', 'Yes, advanced SEO', 'No', 'What is SEO?'], note: 'SEO helps your site show up when someone Googles "RV inspector near me."', required: true },
      { name: 'seoKeywords', label: 'Any specific competitors or keywords you want to rank for?', type: 'textarea', placeholder: 'e.g. "RV inspection Dallas" or competitor website URLs, or "None"', required: true },
      { name: 'googleBusiness', label: 'Google Business Profile setup?', type: 'pills', options: ['Yes', 'No', 'I already have one', 'What is that?'], note: 'The box on Google Maps with your hours, reviews, and phone number', required: true },
    ]
  },
  {
    title: 'Domain, Hosting & Timeline',
    description: 'We handle all hosting on AWS — fast, secure, and reliable. You just need a domain name.',
    fields: [
      { name: 'hasDomain', label: 'Do you already own a domain name?', type: 'pills', options: ['Yes', 'No, I need to buy one', 'Not sure'], required: true },
      { name: 'domainName', label: 'If yes, what is it? If no, type "N/A"', type: 'text', placeholder: 'e.g. www.myrvbusiness.com or N/A', required: true },
      { name: 'domainRegistrar', label: 'Where is your domain registered?', type: 'text', placeholder: 'e.g. GoDaddy, Namecheap, or "Not sure"', required: true },
      { name: 'domainAccess', label: 'Do you have login access to your domain registrar?', type: 'pills', options: ['Yes, I can log in', 'No, I don\'t have access', 'Someone else manages it', 'Not sure'], note: 'We\'ll need DNS access to point your domain to the new site.', required: true },
      { name: 'maintenance', label: 'Who will maintain the site after launch?', type: 'pills', options: ['Me (the business owner)', 'You (ongoing contract)', 'Not sure yet'], required: true },
      { name: 'revisions', label: 'How many rounds of revisions?', type: 'pills', options: ['1-2 rounds', '3-4 rounds', 'As many as it takes'], note: 'Recommended: 2-3 rounds included, additional billed hourly', required: true },
      { name: 'launchDate', label: 'Ideal launch date?', type: 'text', placeholder: 'e.g. "Within 2 months" or "No rush"', required: true },
      { name: 'ongoingSupport', label: 'Ongoing support after launch? 💲', type: 'pills', options: ['Yes', 'No', 'Maybe — let\'s discuss'], note: 'Ongoing retainer cost', required: true },
      { name: 'privacyPolicy', label: 'Privacy policy and terms of service page?', type: 'pills', options: ['Yes', 'No', 'Not sure'], required: true },
      { name: 'additionalNotes', label: 'Anything else you want me to know?', type: 'textarea', placeholder: 'Any other details, ideas, or concerns... or "Nothing else"', required: true },
    ]
  },
]

function ClientQuestionnaire() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [aiApplied, setAiApplied] = useState(false)

  // Save/resume state
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [showResumeModal, setShowResumeModal] = useState(false)
  const [savePassword, setSavePassword] = useState('')
  const [resumeId, setResumeId] = useState('')
  const [resumePassword, setResumePassword] = useState('')
  const [savedId, setSavedId] = useState(null) // tracks if we're editing a saved draft
  const [savedPassword, setSavedPassword] = useState('')
  const [modalError, setModalError] = useState('')
  const [modalLoading, setModalLoading] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  useEffect(() => { document.title = 'Website Questionnaire - hiro labs' }, [])

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
  const pickOption = (name, value) => setFormData({ ...formData, [name]: value })

  const currentStep = STEPS[step]
  const isLastStep = step === STEPS.length - 1

  const canProceed = () => currentStep.fields.filter(f => f.required).every(f => formData[f.name]?.trim())

  const handleAiSuggest = async () => {
    setAiLoading(true)
    try {
      const res = await fetch(`${API_BASE}/questionnaire-ai`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessName: formData.businessName, serviceArea: formData.serviceArea, inspectionTypes: formData.inspectionTypes, pricing: formData.pricing }),
      })
      if (res.ok) {
        const { suggestions } = await res.json()
        setFormData(prev => {
          const merged = { ...prev }
          for (const [key, val] of Object.entries(suggestions)) { if (!merged[key]) merged[key] = val }
          return merged
        })
        setAiApplied(true)
      }
    } catch { /* silent */ }
    setAiLoading(false)
  }

  const handleSave = async () => {
    if (!savePassword || savePassword.length < 4) { setModalError('Password must be at least 4 characters'); return }
    setModalLoading(true)
    setModalError('')
    try {
      const payload = { responses: formData, password: savePassword, status: 'draft' }
      let res
      if (savedId) {
        res = await fetch(`${API_BASE}/questionnaire`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: savedId, password: savedPassword, responses: formData, status: 'draft' }),
        })
      } else {
        res = await fetch(`${API_BASE}/questionnaire`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      }
      if (res.ok) {
        const data = await res.json()
        setSavedId(data.id)
        setSavedPassword(savePassword)
        setSaveSuccess(true)
        setTimeout(() => { setShowSaveModal(false); setSaveSuccess(false) }, 2000)
      } else { setModalError('Failed to save. Try again.') }
    } catch { setModalError('Network error.') }
    setModalLoading(false)
  }

  const handleResume = async () => {
    if (!resumeId || !resumePassword) { setModalError('Enter your submission ID and password'); return }
    setModalLoading(true)
    setModalError('')
    try {
      const res = await fetch(`${API_BASE}/questionnaire/resume`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: resumeId.trim(), password: resumePassword }),
      })
      if (res.ok) {
        const data = await res.json()
        setFormData(data.responses || {})
        setSavedId(data.id)
        setSavedPassword(resumePassword)
        setShowResumeModal(false)
        setResumeId('')
        setResumePassword('')
      } else {
        const err = await res.json().catch(() => ({}))
        setModalError(err.error || 'Not found or wrong password')
      }
    } catch { setModalError('Network error.') }
    setModalLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isLastStep) { setStep(step + 1); return }
    setSubmitting(true)
    setSubmitError('')
    try {
      let res
      if (savedId) {
        res = await fetch(`${API_BASE}/questionnaire`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: savedId, password: savedPassword, responses: formData, status: 'complete' }),
        })
      } else {
        res = await fetch(`${API_BASE}/questionnaire`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ responses: formData, status: 'complete' }),
        })
      }
      if (res.ok) setSubmitted(true)
      else setSubmitError('Something went wrong. Please try again.')
    } catch { setSubmitError('Network error. Please check your connection.') }
    setSubmitting(false)
  }

  if (submitted) {
    return (
      <div className="questionnaire">
        <div className="q-topbar"><Link to="/" className="q-home-link"><img src="/logo.svg" alt="hiro labs" className="q-logo" /></Link></div>
        <div className="questionnaire-success">
          <CheckCircle size={64} />
          <h1>Thank you!</h1>
          <p>Your responses have been submitted. I'll review everything and get back to you with a scope and pricing estimate.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="questionnaire">
      <div className="q-topbar">
        <Link to="/" className="q-home-link"><img src="/logo.svg" alt="hiro labs" className="q-logo" /></Link>
        <div className="q-topbar-actions">
          <button className="q-topbar-btn" onClick={() => { setShowResumeModal(true); setModalError('') }}><KeyRound size={16} /> Resume</button>
          <button className="q-topbar-btn q-save-btn" onClick={() => { setShowSaveModal(true); setModalError(''); setSaveSuccess(false) }}><Save size={16} /> Save</button>
        </div>
      </div>

      <div className="questionnaire-header">
        <div className="container">
          <h1>Website Project Questionnaire</h1>
          <p>Answer these questions so we can define exactly what you need — no surprises.</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
          </div>
          <span className="step-label">Step {step + 1} of {STEPS.length}</span>
        </div>
      </div>

      <div className="questionnaire-content">
        <div className="container">
          {step === 1 && !aiApplied && (
            <button type="button" className="ai-suggest-btn" onClick={handleAiSuggest} disabled={aiLoading}>
              <Sparkles size={18} />
              {aiLoading ? 'Thinking...' : 'Auto-fill suggestions based on your business'}
            </button>
          )}
          {step === 1 && aiApplied && (
            <div className="ai-applied-note"><Sparkles size={16} /> AI suggestions applied — review and adjust anything that doesn't fit.</div>
          )}

          <form onSubmit={handleSubmit}>
            <h2>{currentStep.title}</h2>
            {currentStep.description && <p className="step-description">{currentStep.description}</p>}

            {currentStep.fields.map(field => (
              <div className="form-group" key={field.name}>
                <label htmlFor={field.name}>{field.label}</label>
                {field.note && <span className="field-note">{field.note}</span>}
                {field.type === 'text' && <input type="text" id={field.name} name={field.name} value={formData[field.name] || ''} onChange={handleChange} placeholder={field.placeholder} />}
                {field.type === 'textarea' && <textarea id={field.name} name={field.name} value={formData[field.name] || ''} onChange={handleChange} placeholder={field.placeholder} rows={3} />}
                {field.type === 'pills' && (
                  <div className="pill-group">
                    {field.options.map(opt => (
                      <button type="button" key={opt} className={`pill ${formData[field.name] === opt ? 'pill-active' : ''}`} onClick={() => pickOption(field.name, opt)}>{opt}</button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="form-nav">
              {submitError && <p className="submit-error">{submitError}</p>}
              {step > 0 && <button type="button" className="nav-btn back-btn" onClick={() => setStep(step - 1)}><ChevronLeft size={18} /> Back</button>}
              {isLastStep ? (
                <button type="submit" className="nav-btn submit-btn-full" disabled={!canProceed() || submitting}>
                  {submitting ? 'Submitting...' : <><Send size={18} /> Submit Questionnaire</>}
                </button>
              ) : (
                <button type="submit" className="nav-btn next-btn" disabled={!canProceed()}>Next <ChevronRight size={18} /></button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Save Modal */}
      {showSaveModal && (
        <div className="q-modal-overlay" onClick={() => setShowSaveModal(false)}>
          <div className="q-modal" onClick={e => e.stopPropagation()}>
            {saveSuccess ? (
              <div className="q-modal-success">
                <CheckCircle size={32} />
                <h3>Saved!</h3>
                <p>Your submission ID:</p>
                <code className="q-id-display">{savedId}</code>
                <p className="q-modal-hint">Save this ID — you'll need it along with your password to resume.</p>
              </div>
            ) : (
              <>
                <h3>Save & Come Back Later</h3>
                <p>Set a password so you can resume where you left off.</p>
                <input type="password" placeholder="Create a password (min 4 characters)" value={savePassword} onChange={e => setSavePassword(e.target.value)} />
                {modalError && <p className="q-modal-error">{modalError}</p>}
                <button className="q-modal-btn" onClick={handleSave} disabled={modalLoading}>{modalLoading ? 'Saving...' : 'Save Progress'}</button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Resume Modal */}
      {showResumeModal && (
        <div className="q-modal-overlay" onClick={() => setShowResumeModal(false)}>
          <div className="q-modal" onClick={e => e.stopPropagation()}>
            <h3>Resume Questionnaire</h3>
            <p>Enter your submission ID and password.</p>
            <input type="text" placeholder="Submission ID" value={resumeId} onChange={e => setResumeId(e.target.value)} />
            <input type="password" placeholder="Password" value={resumePassword} onChange={e => setResumePassword(e.target.value)} />
            {modalError && <p className="q-modal-error">{modalError}</p>}
            <button className="q-modal-btn" onClick={handleResume} disabled={modalLoading}>{modalLoading ? 'Loading...' : 'Resume'}</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ClientQuestionnaire
