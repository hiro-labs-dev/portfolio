import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useEffect } from 'react'
import { productsData } from '../data/products'
import './Home.css'

function Home() {
  useEffect(() => {
    document.title = 'Roddy Brown - Full-Stack Software Engineer'
  }, [])

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-container">
          <div className="hero-label">Roddy Brown</div>
          <h1 className="hero-title">
            I design the infrastructure<br />
            modern companies grow on.
          </h1>
          <p className="hero-subtitle">
            I architect and deploy production-grade systems — from data infrastructure to full-stack 
            applications — built to perform under real-world load and scale without fragility.
          </p>
          <div className="hero-principles">
            <span>architecture-first</span>
            <span>cloud-native</span>
            <span>built for durability</span>
          </div>
          <div className="hero-actions">
            <Link to="/projects" className="btn btn-primary">
              view work
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              get in touch
            </Link>
          </div>
        </div>
      </section>

      <section className="philosophy">
        <div className="container">
          <h2>Most software breaks under growth.</h2>
          <p>
            It isn't a performance problem — it's an architecture problem.
          </p>
          <p>
            I design systems intentionally: starting with data models, defining API boundaries, 
            planning deployment strategies, and building infrastructure that remains clear and 
            maintainable over time.
          </p>
        </div>
      </section>

      <section className="credibility">
        <div className="container">
          <div className="credibility-grid">
            <div className="credibility-item">
              <span>10+ production systems delivered</span>
            </div>
            <div className="credibility-item">
              <span>Nationwide data ingestion pipelines</span>
            </div>
            <div className="credibility-item">
              <span>AWS-native deployment environments</span>
            </div>
            <div className="credibility-item">
              <span>Full SDLC ownership</span>
            </div>
          </div>
        </div>
      </section>

      <section className="selected-work">
        <div className="container">
          <div className="section-header">
            <h2>Selected Work</h2>
            <Link to="/projects" className="view-all">
              View All <ArrowRight size={18} />
            </Link>
          </div>
          <div className="work-grid">
            <WorkCard
              image="/projects/nomadic.webp"
              category="Full-Stack Platform"
              title="Nomadic Influence"
              description="SaaS platform connecting creators with business opportunities. Stripe subscriptions, Firebase auth, Google Calendar integration."
              tech="Django, React, PostgreSQL, AWS"
            />
            <WorkCard
              image="/projects/nexus.webp"
              category="Corporate Website"
              title="Nexus RV"
              description="Corporate website for premium RV manufacturer. 40+ floor plans, dealer locator with Mapbox, comprehensive CMS."
              tech="Django, React, Mapbox"
            />
            <WorkCard
              image="/projects/wecare.webp"
              category="Content Platform"
              title="We Care Broadcasting"
              description="Content-managed website for broadcasting network with program listings, broadcaster profiles, and event management."
              tech="Django, React, PostgreSQL"
            />
          </div>
        </div>
      </section>

      <section className="what-we-build">
        <div className="container">
          <div className="section-header">
            <h2>My Products</h2>
            <Link to="/products" className="view-all">
              View All <ArrowRight size={18} />
            </Link>
          </div>
          <div className="work-grid">
            {productsData.slice(0, 3).map(product => (
              <Link to={`/products/${product.id}`} key={product.id} className="work-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="work-image" style={product.logo ? { display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0f1a' } : {}}>
                  {product.logo ? <img src={product.logo} alt={product.name} style={{ width: '80px', height: '80px', objectFit: 'contain' }} /> : product.image ? <img src={product.image} alt={product.name} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, fontWeight: 600, color: 'var(--text-tertiary)' }}>{product.name[0]}</div>}
                </div>
                <div className="work-info">
                  <div className="work-category">{product.tagline}</div>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="what-we-build">
        <div className="container">
          <h2>What I Build</h2>
          <div className="build-grid">
            <div className="build-item">
              <h3>Data Infrastructure</h3>
              <p>ETL pipelines, real-time data processing, and analytics systems designed for scale and reliability.</p>
            </div>
            <div className="build-item">
              <h3>Full-Stack Platforms</h3>
              <p>Complete web applications with robust backends, responsive interfaces, and integrated payment systems.</p>
            </div>
            <div className="build-item">
              <h3>Automation Systems</h3>
              <p>Deployment automation, monitoring tools, and workflow integrations that reduce operational overhead.</p>
            </div>
            <div className="build-item">
              <h3>Cloud Architecture</h3>
              <p>AWS infrastructure design and implementation with focus on availability, security, and cost efficiency.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="founder">
        <div className="container">
          <h2>9+ years building production systems.</h2>
          <p>
            From insurance companies to government agencies, I've built full-stack platforms, 
            data pipelines, and cloud infrastructure at scale. Every project is approached 
            with architectural discipline and long-term maintainability in mind.
          </p>
          <Link to="/about" className="founder-link">
            more about me
          </Link>
        </div>
      </section>
    </div>
  )
}

function WorkCard({ image, category, title, description, tech }) {
  return (
    <div className="work-card">
      <div className="work-image">
        <img src={image} alt={title} />
      </div>
      <div className="work-info">
        <div className="work-category">{category}</div>
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="work-tech">{tech}</div>
      </div>
    </div>
  )
}

export default Home
