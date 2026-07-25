import jsPDF from 'jspdf'

async function loadInter(doc) {
  const { default: interFont } = await import('./interFont.js')
  const raw = atob(interFont)
  const arr = new Uint8Array(raw.length)
  for (let i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i)
  doc.addFileToVFS('Inter.ttf', interFont)
  doc.addFont('Inter.ttf', 'Inter', 'normal')
  doc.addFileToVFS('Inter-Bold.ttf', interFont)
  doc.addFont('Inter-Bold.ttf', 'Inter', 'bold')
}

const MARGIN = 40
const PAGE_W = 612
const PAGE_H = 792
const CONTENT_W = PAGE_W - MARGIN * 2
const COLORS = { text: [35, 35, 35], muted: [100, 100, 100], accent: [20, 184, 166], line: [210, 210, 210] }

function addPage(doc, y) {
  if (y > PAGE_H - 60) {
    doc.addPage()
    return MARGIN + 10
  }
  return y
}

function drawLine(doc, y) {
  doc.setDrawColor(...COLORS.line)
  doc.setLineWidth(0.5)
  doc.line(MARGIN, y, PAGE_W - MARGIN, y)
  return y + 10
}

function wrapText(doc, text, maxWidth) {
  return doc.splitTextToSize(text, maxWidth)
}

export async function generateTraditionalPDF() {
  const doc = new jsPDF({ unit: 'pt', format: 'letter' })
  await loadInter(doc)
  let y = MARGIN

  // Name
  doc.setFont('Inter', 'bold')
  doc.setFontSize(22)
  doc.setTextColor(...COLORS.text)
  doc.text('Roddy Brown', PAGE_W / 2, y, { align: 'center' })
  y += 18

  // Contact
  doc.setFont('Inter', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(...COLORS.muted)
  doc.text('Zephyrhills, FL  |  roddydevelops@gmail.com  |  813-981-2002', PAGE_W / 2, y, { align: 'center' })
  y += 14

  y = drawLine(doc, y)

  // Summary
  doc.setFont('Inter', 'bold')
  doc.setFontSize(10)
  doc.setTextColor(...COLORS.text)
  doc.text('PROFESSIONAL SUMMARY', MARGIN, y)
  y += 14
  doc.setFont('Inter', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(...COLORS.muted)
  const summary = 'Founder and Senior Software Engineer with 9+ years of experience building full-stack web applications from concept to production. Currently running Hiro Labs, a software studio where I single-handedly architect, design, develop, deploy, and maintain SaaS products, enterprise platforms, and client systems. My work spans AI-powered traffic management systems, offline-first field tools, real-time geospatial platforms, and multi-tenant marketplaces, owning every layer from UI/UX to cloud infrastructure.'
  const summaryLines = wrapText(doc, summary, CONTENT_W)
  doc.text(summaryLines, MARGIN, y)
  y += summaryLines.length * 12 + 10

  y = drawLine(doc, y)

  // Skills
  doc.setFont('Inter', 'bold')
  doc.setFontSize(10)
  doc.setTextColor(...COLORS.text)
  doc.text('TECHNICAL SKILLS', MARGIN, y)
  y += 14

  const skillGroups = [
    ['Frontend', 'React, TypeScript, JavaScript (ES6+), Next.js, Vite, Electron, Tauri, Tailwind CSS, Redux Toolkit, Mapbox GL'],
    ['Backend', 'Python, Django, DRF, Node.js, Express, Flask, PostgreSQL, DynamoDB, Redis, Celery, Elasticsearch, ClickHouse'],
    ['Cloud', 'AWS (Lambda, S3, CloudFront, EC2, ECR, RDS, API Gateway, SSM, SAM), Docker, GitHub Actions'],
    ['AI / ML', 'OpenAI API, Anthropic API, Computer Vision, ML Predictions, ONNX Runtime'],
    ['Specialties', 'ITS/ATMS Systems, Real-time Geospatial, ArcGIS REST, NWS/FL 511 APIs, WebSockets, Offline-first, Stripe'],
  ]

  doc.setFontSize(9)
  skillGroups.forEach(([label, items]) => {
    doc.setFont('Inter', 'bold')
    doc.setTextColor(...COLORS.text)
    doc.text(label + ':', MARGIN, y)
    const labelW = doc.getTextWidth(label + ': ')
    doc.setFont('Inter', 'normal')
    doc.setTextColor(...COLORS.muted)
    const lines = wrapText(doc, items, CONTENT_W - labelW)
    doc.text(lines[0], MARGIN + labelW, y)
    if (lines.length > 1) {
      for (let i = 1; i < lines.length; i++) {
        y += 12
        doc.text(lines[i], MARGIN, y)
      }
    }
    y += 14
  })

  y += 2
  y = drawLine(doc, y)

  // Experience
  doc.setFont('Inter', 'bold')
  doc.setFontSize(10)
  doc.setTextColor(...COLORS.text)
  doc.text('PROFESSIONAL EXPERIENCE', MARGIN, y)
  y += 16

  const jobs = [
    {
      title: 'Founder & Solo Developer',
      company: 'Hiro Labs',
      location: 'Remote',
      period: 'Jul 2024 - Present',
      bullets: [
        'Building and shipping SaaS products, enterprise platforms, and client systems solo, owning UI/UX, frontend, backend, infrastructure, DevOps, AI/ML integrations, and government data systems.',
        'Signal: AI-powered ATMS for state DOTs. Real-time map workspace with live government data (NWS, FL 511, FDOT ArcGIS), ML-scored incident predictions, Camera Vision AI, queue detection, and FHWA compliance reporting.',
        'Kite: Offline-first RV inspection SaaS. pnpm/Turbo monorepo with 8 packages, Dexie sync queue, Lambda/DynamoDB API, Stripe Connect, Electron desktop app.',
        'Nexus RV (Client): Full-stack platform for RV manufacturer. Django API with 15+ apps, two React frontends, Stripe checkout, CI/CD with GitHub OIDC.',
        'Nomadic Influence (Client): Creator-business marketplace. Django backend with 22 apps, JWT auth, Celery/Redis, Stripe subscriptions, role-separated React dashboards.',
        'Common Ground Tampa (Client): Bilingual community activism platform. Django/Wagtail CMS, Mapbox resource maps, i18next, GitHub Actions CI/CD.',
        'Layla: AI collaboration desktop app. Electron + React + Django with WebSocket orchestration, multi-agent streaming, workspace encryption.',
        'Sakura: Deterministic AI CLI with plan/apply safety gates, intent classification, tool registry, provider abstraction, Stripe billing.',
        'HoodyHoo: macOS audio DSP app in Tauri 2.0/Rust. Multi-stage DSP chain, GPT-4o parameter tuning, RVC voice conversion, OBS integration.',
      ],
    },
    {
      title: 'Senior Software Engineer',
      company: 'Real Geeks',
      location: 'Remote',
      period: 'Jun 2022 - Jul 2024',
      bullets: [
        'Designed ETL pipelines for MLS data ingestion across all U.S. states, processing three years of historical listings and two years of public record data nationwide.',
        'Built RESTful APIs with Django REST Framework powering property search, filtering, and lead management for thousands of real estate agents.',
        'Integrated Elasticsearch and ClickHouse for real-time property search and analytics across datasets exceeding 100M records.',
        'Managed AWS infrastructure (EC2, RDS, S3, CloudWatch) supporting high-availability production deployments.',
      ],
    },
    {
      title: 'Software Engineer II',
      company: 'AspirEDU LLC',
      location: 'Tampa, FL (Concurrent)',
      period: 'Jan 2022 - Sept 2022',
      bullets: [
        'Optimized PostgreSQL queries and indexing strategies, reducing backend response times on key reporting endpoints.',
        'Built React reporting dashboards with exportable endpoints supporting CSV, PDF, and JSON formats.',
        'Refactored legacy Django and React codebases to modern patterns, improving maintainability.',
      ],
    },
    {
      title: 'Lead Software Engineer',
      company: 'Lucent Group',
      location: 'Tampa, FL',
      period: 'Jan 2021 - Jan 2022',
      bullets: [
        'Designed and built a Django/React help desk ticketing platform for the Florida Department of Transportation, supporting statewide ITS field operations.',
        'Orchestrated ETL processes for ITS data synchronization across multiple FDOT data sources.',
        'Led a team of developers through the full SDLC: requirements, architecture, implementation, and deployment.',
      ],
    },
    {
      title: 'Lead Software Engineer',
      company: 'Acceptance Insurance',
      location: 'Tampa, FL',
      period: 'Jun 2017 - Jan 2021',
      bullets: [
        'Built Django/React web applications that streamlined claims processing workflows.',
        'Developed predictive analytics tools with dynamic visualizations using Python statistical models.',
        'Led migration of legacy systems to SPAs with modular Django services, containerized with Docker.',
        'Integrated CI/CD pipelines and CloudWatch monitoring for high service availability.',
      ],
    },
  ]

  jobs.forEach((job) => {
    y = addPage(doc, y)

    // Title line
    doc.setFont('Inter', 'bold')
    doc.setFontSize(9.5)
    doc.setTextColor(...COLORS.text)
    doc.text(job.title, MARGIN, y)

    doc.setFont('Inter', 'normal')
    doc.setTextColor(...COLORS.muted)
    doc.text(job.period, PAGE_W - MARGIN, y, { align: 'right' })
    y += 12

    doc.setFont('Inter', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(...COLORS.accent)
    doc.text(job.company, MARGIN, y)
    doc.setTextColor(...COLORS.muted)
    doc.text('  |  ' + job.location, MARGIN + doc.getTextWidth(job.company), y)
    y += 14

    // Bullets
    doc.setFontSize(8.5)
    doc.setTextColor(...COLORS.muted)
    job.bullets.forEach((bullet) => {
      y = addPage(doc, y)
      const lines = wrapText(doc, bullet, CONTENT_W - 12)
      doc.text('•', MARGIN, y)
      doc.text(lines, MARGIN + 12, y)
      y += lines.length * 11 + 3
    })

    y += 8
  })

  doc.save('Roddy_Brown_Resume.pdf')
}

export async function generatePortfolioPDF() {
  const html2canvas = (await import('html2canvas')).default
  const content = document.querySelector('.resume')
  if (!content) return

  const downloadWrap = content.querySelector('.download-wrap')
  if (downloadWrap) downloadWrap.style.display = 'none'

  const canvas = await html2canvas(content, {
    scale: 2,
    backgroundColor: '#0d1117',
    useCORS: true,
    logging: false,
  })

  if (downloadWrap) downloadWrap.style.display = ''

  const imgData = canvas.toDataURL('image/jpeg', 0.92)

  // Letter size in pt
  const pageW = 612
  const pageH = 792

  // Scale canvas to fit page width
  const scaledH = (canvas.height * pageW) / canvas.width
  const totalPages = Math.ceil(scaledH / pageH)

  const doc = new jsPDF({ unit: 'pt', format: 'letter' })

  for (let i = 0; i < totalPages; i++) {
    if (i > 0) doc.addPage()
    // Offset the image upward by the page number to show the right slice
    doc.addImage(imgData, 'JPEG', 0, -(i * pageH), pageW, scaledH)
  }

  doc.save('Roddy_Brown_Portfolio_Resume.pdf')
}
