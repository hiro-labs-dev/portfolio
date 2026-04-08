import { useEffect, useState } from 'react'
import { ExternalLink, X, Download } from 'lucide-react'
import KiteDashboardLive from '../components/KiteDashboardLive'
import SakuraTerminal from '../components/SakuraTerminal'
import './Resume.css'

const projects = [
  {
    name: 'Kite',
    url: 'https://kite.hiro-labs.dev',
    tagline: 'RV Inspection SaaS',
    description: 'Offline-first inspection platform. Inspectors capture findings in the field, generate PDF reports, collect payment, and deliver reports to clients via share links.',
    preview: 'kite',
    logo: '/products/kite-logo.svg',
    logoBg: '#071013',
    tech: ['React', 'Next.js', 'Vite', 'Electron', 'Express', 'AWS Lambda', 'DynamoDB', 'Stripe Connect', 'Dexie/IndexedDB', 'S3', 'SAM', 'pnpm/Turbo'],
    bullets: [
      'Architected a pnpm/Turbo monorepo with 8 packages: Next.js marketing site, Vite SPA dashboard, Express REST API, Electron desktop app, and shared libraries for types, UI, payments, storage, and offline DB.',
      'Built an offline-first data layer using Dexie (IndexedDB) with a sync queue that processes changes when connectivity returns. Critical for inspectors working without cell signal.',
      'Deployed the API as AWS Lambda via SAM with 12 DynamoDB tables, JWT auth, and presigned S3 uploads for media.',
      'Integrated Stripe Connect for inspector onboarding and Stripe Checkout for client payment on published reports.',
      'Built AI-assisted inspection features with route handlers for damage assessment analysis.',
    ],
  },
  {
    name: 'Nexus RV',
    url: 'https://nexusrv.com',
    tagline: 'Full-Stack Platform for RV Manufacturer',
    label: 'Client',
    description: 'Complete web platform with a marketing/catalog site, admin CMS, and e-commerce parts store.',
    preview: '/projects/nexus.webp',
    tech: ['Django', 'DRF', 'React', 'Vite', 'PostgreSQL', 'Stripe', 'Mapbox', 'Postmark', 'EasyPost', 'S3/CloudFront', 'GitHub Actions', 'Docker'],
    bullets: [
      'Built a Django REST API backend with 15+ apps covering product catalog, parts inventory, dealer directory, CMS content, contact forms, events, and manufacturing data.',
      'Developed two separate React/Vite frontends: a marketing/catalog site with Mapbox dealer maps and SEO meta tags, and a parts store with cart/checkout.',
      'Integrated Stripe for parts store checkout with idempotent order processing, webhook handling, and catalog seeding.',
      'Set up CI/CD with GitHub Actions using OIDC auth. Frontend deploys to S3 with CloudFront invalidation. Backend builds Docker images, pushes to ECR, and deploys to EC2 via SSM.',
    ],
  },
  {
    name: 'Nomadic Influence',
    url: 'https://nomadicinfluence.com',
    tagline: 'Creator-Business Networking Platform',
    label: 'Client',
    description: 'Marketplace connecting content creators with brand partnership opportunities. Role-separated dashboards, subscription billing, and async task processing.',
    preview: '/projects/nomadic-preview.webp',
    modalImage: '/projects/nomadic-preview.webp',
    tech: ['Django', 'DRF', 'React', 'TypeScript', 'Celery', 'Redis', 'PostgreSQL', 'Stripe', 'Mapbox GL', 'HubSpot', 'Postmark', 'Docker'],
    bullets: [
      'Built a Django backend with 22 apps, JWT auth, role-based permissions, Celery/Redis async workers, and Stripe subscription billing.',
      'Developed a React/TypeScript dashboard with enforced role separation at the routing level. Creators and businesses have entirely separate dashboard trees.',
      'Integrated Mapbox GL for interactive maps, S3 presigned URL uploads, HubSpot CRM, and Postmark transactional email.',
      'Deployed via Docker to EC2 (staging + production) with shared RDS PostgreSQL and Redis, plus GitHub Actions CI/CD.',
    ],
  },
  {
    name: 'Layla',
    url: 'https://layla-ai.app',
    tagline: 'AI Collaboration Desktop App',
    description: 'Desktop application where teams define goals, select AI agents, and launch real-time collaborative sessions that produce structured deliverables.',
    preview: 'layla',
    logo: '/products/layla-logo.svg',
    logoBg: '#0a0a0f',
    tech: ['Electron', 'React', 'Redux Toolkit', 'Django', 'DRF', 'Channels/Daphne', 'WebSocket', 'PostgreSQL', 'Redis', 'OpenAI', 'WeasyPrint', 'S3/CloudFront'],
    bullets: [
      'Built the full stack: Electron + React frontend with Redux Toolkit, Django backend with DRF and Channels/Daphne for WebSocket support, PostgreSQL, and Redis.',
      'Engineered a real-time AI orchestration system with round-robin turn management between multiple AI agents streaming tokens over WebSocket.',
      'Implemented workspace-scoped encryption (Fernet) for user-provided OpenAI API keys, with server-level fallback.',
      'Built GitHub OAuth integration with repository browsing and Markdown/PDF export (WeasyPrint).',
    ],
  },
  {
    name: 'Sakura',
    url: 'https://sakura-ai.dev',
    tagline: 'Deterministic AI CLI Tool',
    description: 'CLI that routes user intent through plan/apply safety gates before executing, with Claude as a tool loop for complex tasks.',
    preview: 'sakura',
    logo: '/products/sakura-logo.svg',
    logoBg: '#0f0e13',
    tech: ['TypeScript', 'Node.js', 'Commander.js', 'Anthropic SDK', 'OpenAI SDK', 'Express', 'AWS Lambda', 'DynamoDB', 'Stripe', 'Next.js', 'Vitest', 'SAM'],
    bullets: [
      'Designed the intent classification pipeline: keyword matching with LLM fallback, routing across AWS, code, shell, Git, Docker, and general intents.',
      'Built a plan/apply architecture with risk classification. Users confirm before any mutation executes.',
      'Implemented a tool registry exposing read, write, shell, fetch, glob, grep, AWS, and code tools to Claude via a REPL-based tool loop.',
      'Built provider abstraction supporting OpenAI, Anthropic, and a custom API proxy with DynamoDB-backed user management and Stripe billing.',
    ],
  },
  {
    name: 'HoodyHoo',
    tagline: 'Real-Time Audio DSP Desktop App',
    description: 'macOS desktop app for streamers. Real-time microphone processing with AI-driven parameter tuning and voice conversion.',
    preview: 'hooty',
    logo: '/products/hooty-logo.svg',
    logoBg: '#0c0c0c',
    modalImage: '/projects/hoody-preview.webp',
    tech: ['Tauri 2.0', 'Rust', 'React', 'cpal', 'OpenAI GPT-4o', 'ONNX Runtime', 'Python', 'OBS WebSocket v5'],
    bullets: [
      'Built the full stack in Tauri 2.0 (Rust backend + React frontend) with a multi-stage DSP chain: noise gate, HPF, parametric EQ, compressor, de-esser, limiter, reverb, delay, and chorus.',
      'Integrated OpenAI GPT-4o for AI-driven DSP parameter tuning. Records audio samples, sends metrics to the model, and parses responses into DSP settings.',
      'Built YIN pitch detection, autotune, key/scale detection, and formant shifting.',
      'Developed a Python sidecar for RVC voice conversion via ONNX Runtime, managed as a Tauri subprocess over TCP.',
    ],
  },
  {
    name: 'Offering',
    url: 'https://offering.hiro-labs.dev',
    tagline: 'AI Prompt Optimization Tool',
    description: 'Web app that rewrites user prompts following prompt-engineering best practices.',
    preview: 'offering',
    logo: '/products/offering-logo.svg',
    logoBg: '#0a0a0a',
    modalImage: '/projects/offering-preview.webp',
    tech: ['React 19', 'Node.js', 'AWS Lambda', 'DynamoDB', 'SSM', 'SAM'],
    bullets: [
      'Built a React 19 frontend with custom CSS and a Node.js Lambda backend deployed via SAM.',
      'Backend fetches service tokens from SSM, calls the Sakura AI API with a meta-prompt, stores history to DynamoDB, and returns optimized prompts with change analysis.',
    ],
  },
]

const priorRoles = [
  {
    role: 'Senior Software Engineer',
    company: 'Real Geeks',
    location: 'Remote',
    period: 'Jun 2022 – Jul 2024',
    bullets: [
      'Designed and implemented ETL pipelines for MLS data ingestion across all U.S. states, processing three years of historical MLS listings and two years of public record data nationwide.',
      'Built RESTful APIs with Django REST Framework powering frontend search, filtering, and lead management features.',
      'Integrated Elasticsearch and ClickHouse to enable real-time property search and analytics across large datasets.',
      'Managed AWS infrastructure (EC2, RDS, S3, CloudWatch) supporting high-availability production deployments.',
      'Developed responsive React UIs for both internal tools and client-facing real estate applications.',
      'Implemented CI/CD pipelines with GitHub Actions, reducing deployment cycle times and eliminating manual release steps.',
    ],
  },
  {
    role: 'Software Engineer II',
    company: 'AspirEDU LLC',
    location: 'Tampa, FL',
    period: 'Jan 2022 – Sept 2022',
    bullets: [
      'Optimized PostgreSQL queries and indexing strategies, reducing backend response times on key reporting endpoints.',
      'Built React features for data reporting dashboards and improved user navigation flows.',
      'Created exportable reporting endpoints supporting CSV, PDF, and JSON formats with reusable UI components.',
      'Refactored legacy Django and React codebases to modern patterns, improving maintainability and developer velocity.',
    ],
  },
  {
    role: 'Lead Software Engineer',
    company: 'Lucent Group',
    location: 'Tampa, FL',
    period: 'Jan 2021 – Jan 2022',
    bullets: [
      'Designed and built a Django/React help desk ticketing platform for the Florida Department of Transportation.',
      'Automated backend diagnostics and real-time issue tracking, reducing manual triage time for field operations.',
      'Developed secure REST APIs and integrated frontend interfaces supporting statewide field operations teams.',
      'Led a team of developers through the full SDLC: requirements gathering, architecture, implementation, and deployment.',
    ],
  },
  {
    role: 'Lead Software Engineer',
    company: 'Acceptance Insurance',
    location: 'Tampa, FL',
    period: 'Jun 2017 – Jan 2021',
    bullets: [
      'Built web applications with Django and React that streamlined claims processing workflows and improved adjuster productivity.',
      'Developed predictive analytics tools with dynamic visualizations using Python statistical models.',
      'Led migration of legacy monolithic systems to single-page applications with modular Django backend services, containerized with Docker.',
      'Integrated CI/CD pipelines and CloudWatch monitoring, maintaining high service availability across production environments.',
      'Conducted code reviews and mentored junior developers on Django, React, and testing best practices.',
    ],
  },
]

const skills = [
  {
    label: 'Languages & Frameworks',
    items: [
      { name: 'React', level: 'primary' },
      { name: 'TypeScript', level: 'primary' },
      { name: 'Python', level: 'primary' },
      { name: 'Django', level: 'primary' },
      { name: 'Node.js', level: 'primary' },
      { name: 'JavaScript (ES6+)', level: 'primary' },
      { name: 'Rust', level: 'secondary' },
      { name: 'Express', level: 'secondary' },
      { name: 'Flask', level: 'secondary' },
      { name: 'Next.js', level: 'secondary' },
    ],
  },
  {
    label: 'Frontend',
    items: [
      { name: 'Vite', level: 'primary' },
      { name: 'Tailwind CSS', level: 'primary' },
      { name: 'Redux Toolkit', level: 'primary' },
      { name: 'React Router', level: 'primary' },
      { name: 'Electron', level: 'secondary' },
      { name: 'Tauri', level: 'secondary' },
    ],
  },
  {
    label: 'Backend & Data',
    items: [
      { name: 'Django REST Framework', level: 'primary' },
      { name: 'PostgreSQL', level: 'primary' },
      { name: 'DynamoDB', level: 'primary' },
      { name: 'Redis', level: 'secondary' },
      { name: 'Celery', level: 'secondary' },
      { name: 'Elasticsearch', level: 'secondary' },
    ],
  },
  {
    label: 'Cloud & DevOps',
    items: [
      { name: 'AWS Lambda', level: 'primary' },
      { name: 'S3 / CloudFront', level: 'primary' },
      { name: 'EC2 / ECR', level: 'primary' },
      { name: 'Docker', level: 'primary' },
      { name: 'GitHub Actions', level: 'primary' },
      { name: 'RDS', level: 'secondary' },
      { name: 'API Gateway', level: 'secondary' },
      { name: 'SSM / SAM', level: 'secondary' },
      { name: 'CloudWatch', level: 'secondary' },
    ],
  },
  {
    label: 'Integrations',
    items: [
      { name: 'Stripe', level: 'primary' },
      { name: 'OpenAI / Anthropic', level: 'primary' },
      { name: 'Mapbox GL', level: 'secondary' },
      { name: 'Postmark / Resend', level: 'secondary' },
      { name: 'HubSpot', level: 'secondary' },
      { name: 'OBS WebSocket', level: 'secondary' },
    ],
  },
  {
    label: 'Specialties',
    items: [
      { name: 'WebSockets / Real-time', level: 'primary' },
      { name: 'Offline-first (Dexie)', level: 'primary' },
      { name: 'CI/CD Pipelines', level: 'primary' },
      { name: 'PDF Generation', level: 'secondary' },
      { name: 'Audio DSP', level: 'secondary' },
      { name: 'MCP', level: 'secondary' },
    ],
  },
]

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const renderPreview = () => {
    if (project.modalImage) {
      return <img src={project.modalImage} alt={project.name} className="modal-image-full" />
    }
    if (project.preview === 'kite') return <KiteDashboardLive />
    if (project.preview === 'sakura') return <SakuraTerminal />
    if (project.preview && project.preview.startsWith('/')) {
      return (
        <div className="modal-image-wrap">
          <img src={project.preview} alt={project.name} />
        </div>
      )
    }
    return null
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={20} /></button>

        <div className="modal-preview">
          {renderPreview()}
        </div>

        <div className="modal-details">
          <div className="modal-title-row">
            <h3>{project.name}</h3>
            {project.label && <span className="project-label">{project.label}</span>}
          </div>
          <p className="modal-tagline">{project.tagline}</p>
          <p className="modal-description">{project.description}</p>

          <div className="modal-tech">
            {project.tech.map(t => <span key={t} className="modal-tech-tag">{t}</span>)}
          </div>

          <ul className="modal-bullets">
            {project.bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>

          {project.url && (
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="modal-link">
              Visit {project.name} <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

function DownloadMenu() {
  const handleDownload = async () => {
    const { generateTraditionalPDF } = await import('./resumePdf.js')
    generateTraditionalPDF()
  }

  return (
    <button className="download-btn" onClick={handleDownload}>
      <Download size={16} /> Download PDF
    </button>
  )
}

function Resume() {
  const [activeProject, setActiveProject] = useState(null)

  useEffect(() => {
    document.title = 'Resume - Roddy Brown'
  }, [])

  return (
    <div className="resume">
      <div className="resume-header">
        <div className="container">
          <div className="resume-header-row">
            <div>
              <h1>Roddy Brown</h1>
              <p>Founder & Senior Software Engineer</p>
            </div>
            <DownloadMenu />
          </div>
        </div>
      </div>

      <div className="resume-content">
        <div className="container">

          <section className="resume-section">
            <h2>Technical Skills</h2>
            <div className="skills-grid">
              {skills.map(group => (
                <div key={group.label} className="skill-group">
                  <h3>{group.label}</h3>
                  <div className="skill-tags">
                    {group.items.map(s => (
                      <span key={s.name} className={`skill-tag ${s.level}`}>{s.name}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="skill-legend">
              <span><span className="legend-dot primary" /> Daily driver</span>
              <span><span className="legend-dot secondary" /> Proficient</span>
            </div>
          </section>

          <section className="resume-section">
            <div className="section-header-row">
              <h2>Hiro Labs</h2>
              <div className="hiro-meta">
                <span>Founder & Solo Developer</span>
                <span>Jul 2024 – Present</span>
              </div>
            </div>
            <p className="hiro-description">
              Building and shipping multiple SaaS products and client platforms solo. I own every layer: UI/UX design, frontend, backend, infrastructure, DevOps, and third-party integrations.
            </p>
            <div className="project-grid">
              {projects.map(project => (
                <button
                  key={project.name}
                  className="project-card"
                  onClick={() => setActiveProject(project)}
                >
                  <div className="project-card-preview">
                    {project.logo && (
                      <div className="project-card-logo-preview" style={{ background: project.logoBg || '#071013' }}>
                        <img src={project.logo} alt={project.name} className="project-card-logo" />
                        {project.preview === 'offering' && (
                          <img src="/products/flamingo.webp" alt="" style={{
                            height: 60, width: 'auto', position: 'relative',
                            marginRight: -10, order: -1,
                          }} />
                        )}
                      </div>
                    )}
                    {!project.logo && typeof project.preview === 'string' && project.preview.startsWith('/') && (
                      <img src={project.preview} alt={project.name} />
                    )}
                    {!project.logo && !project.preview && (
                      <div className="project-card-placeholder">{project.name[0]}</div>
                    )}
                  </div>
                  <div className="project-card-info">
                    <div className="project-card-name">
                      {project.name}
                      {project.label && <span className="project-label">{project.label}</span>}
                    </div>
                    <span className="project-card-tagline">{project.tagline}</span>
                    {project.logo && <span className="project-card-cta">Click to learn more ›</span>}
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className="resume-section">
            <h2>Prior Experience</h2>
            <div className="experience-list">
              {priorRoles.map((job, i) => (
                <div key={i} className="experience-item">
                  <div className="experience-header">
                    <div>
                      <h3>{job.role}</h3>
                      <span className="company">{job.company}</span>
                    </div>
                    <div className="experience-meta">
                      <span>{job.period}</span>
                      <span>{job.location}</span>
                    </div>
                  </div>
                  <ul>
                    {job.bullets.map((bullet, j) => (
                      <li key={j}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>

      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </div>
  )
}

export default Resume
