import { Github, Linkedin, Mail } from 'lucide-react'
import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>Roddy Brown</h3>
            <p>I design the infrastructure modern companies grow on</p>
          </div>

          <div className="footer-links">
            <div className="footer-section">
              <h4>Navigation</h4>
              <a href="/">Home</a>
              <a href="/projects">Projects</a>
              <a href="/products">Products</a>
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
            </div>

            <div className="footer-section">
              <h4>Connect</h4>
              <a href="mailto:roddydevelops@gmail.com">
                <Mail size={16} />
                Email
              </a>
              <a href="https://github.com/hiro-labs-dev" target="_blank" rel="noopener noreferrer">
                <Github size={16} />
                GitHub
              </a>
              <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                <Linkedin size={16} />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Roddy Brown. All rights reserved.</p>
          <p>Built with React + Vite</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
