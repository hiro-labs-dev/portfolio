import { useState, useEffect } from 'react'
import { Mail, Github, Linkedin } from 'lucide-react'
import './Contact.css'

function Contact() {
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  useEffect(() => {
    document.title = 'Contact - hiro labs'
  }, [])

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.trim().length < 2 ? 'Name must be at least 2 characters' : ''
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Please enter a valid email' : ''
      case 'project':
        return !value ? 'Please select a project type' : ''
      case 'message':
        return value.trim().length < 10 ? 'Message must be at least 10 characters' : ''
      default:
        return ''
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched({ ...touched, [name]: true })
    setErrors({ ...errors, [name]: validateField(name, value) })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (touched[name]) {
      setErrors({ ...errors, [name]: validateField(name, value) })
    }
  }

  return (
    <div className="contact">
      <div className="contact-header">
        <div className="container">
          <h1>Start a Conversation</h1>
          <p>Let's discuss your infrastructure needs</p>
        </div>
      </div>

      <div className="contact-content">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Let's build something great</h2>
              <p>
                Whether you're a startup looking to ship your MVP fast or an established business 
                needing a custom web application, we'd love to hear about your project.
              </p>
              <p>
                Share your requirements and we'll schedule a time to discuss how hiro labs can help.
              </p>
              
              <div className="contact-methods">
                <a href="mailto:roddy@hiro-labs.dev" className="contact-method">
                  <Mail size={24} />
                  <span>roddy@hiro-labs.dev</span>
                </a>
                <a href="https://github.com/hiro-labs-dev" target="_blank" rel="noopener noreferrer" className="contact-method">
                  <Github size={24} />
                  <span>GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/roddy-hiro" target="_blank" rel="noopener noreferrer" className="contact-method">
                  <Linkedin size={24} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            <form className="contact-form" action="https://formspree.io/f/xlgwoaez" method="POST">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required 
                  placeholder="Your name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.name && errors.name && <span className="error">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required 
                  placeholder="your@email.com"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.email && errors.email && <span className="error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="project">Project Type</label>
                <select 
                  id="project" 
                  name="project" 
                  required
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  <option value="">Select a service</option>
                  <option value="mvp">MVP Development</option>
                  <option value="webapp">Custom Web Application</option>
                  <option value="api">API Development & Integrations</option>
                  <option value="automation">Automation & Slack Bots</option>
                  <option value="devtools">Developer Tools</option>
                  <option value="website">Corporate Website</option>
                  <option value="aws">AWS Infrastructure</option>
                  <option value="other">Other</option>
                </select>
                {touched.project && errors.project && <span className="error">{errors.project}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="6" 
                  required 
                  placeholder="Tell me about your project..."
                  onBlur={handleBlur}
                  onChange={handleChange}
                ></textarea>
                {touched.message && errors.message && <span className="error">{errors.message}</span>}
              </div>

              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
