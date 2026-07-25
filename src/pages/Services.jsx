import { useEffect } from 'react'
import { Code, Zap, Boxes, Cloud, Bot, Globe, Database } from 'lucide-react'
import './Services.css'

const servicesData = [
  {
    icon: Zap,
    title: 'MVP Development',
    description: 'Ship your startup idea fast with a production-ready minimum viable product. Full-stack development from database to deployment.',
    features: ['React + Django', 'PostgreSQL database', 'AWS deployment', 'CI/CD pipeline'],
  },
  {
    icon: Globe,
    title: 'Custom Web Applications',
    description: 'Full-stack web applications for established businesses. Scalable, maintainable, and built to integrate with your existing systems.',
    features: ['Custom features', 'Third-party integrations', 'Admin dashboards', 'Performance optimization'],
  },
  {
    icon: Code,
    title: 'API Development & Integrations',
    description: 'Connect your systems with robust APIs and integrations. Stripe, Firebase, HubSpot, Google Calendar, and more.',
    features: ['RESTful APIs', 'Webhook handling', 'OAuth flows', 'Payment processing'],
  },
  {
    icon: Bot,
    title: 'Automation & Slack Bots',
    description: 'Automate workflows with custom Slack bots. Deployment automation, monitoring, task sync, and custom integrations.',
    features: ['AWS Lambda', 'Slack commands', 'Event-driven', 'Real-time notifications'],
  },
  {
    icon: Boxes,
    title: 'Developer Tools & MCP Servers',
    description: 'AI-powered development tools and Model Context Protocol servers that give AI assistants deep project knowledge.',
    features: ['MCP servers', 'CLI tools', 'Code analysis', 'Project context'],
  },
  {
    icon: Globe,
    title: 'Corporate Websites',
    description: 'Professional websites with CMS capabilities. Your team can manage content while maintaining a polished, modern design.',
    features: ['Django CMS', 'SEO optimized', 'Responsive design', 'Content management'],
  },
  {
    icon: Cloud,
    title: 'AWS Infrastructure',
    description: 'Set up and manage AWS infrastructure. EC2, Lambda, S3, RDS, CloudFront, and more. Scalable and cost-effective.',
    features: ['Infrastructure setup', 'Cost optimization', 'Monitoring', 'Security best practices'],
  },
]

const colorOptions = [
  { name: 'Cyan', value: '#06b6d4' },
  { name: 'Teal', value: '#14b8a6' },
  { name: 'Aqua', value: '#00d4aa' },
  { name: 'Turquoise', value: '#2dd4bf' },
  { name: 'Sky', value: '#0ea5e9' },
  { name: 'Ocean', value: '#0891b2' },
  { name: 'Mint', value: '#5eead4' },
  { name: 'Seafoam', value: '#2dd4bf' },
]

function Services() {
  useEffect(() => {
    document.title = 'Services - Roddy Brown'
  }, [])

  return (
    <div className="services" style={{ '--service-accent': '#14b8a6' }}>
      <div className="services-header">
        <div className="container">
          <h1>What I Build</h1>
          <p>Infrastructure and systems designed for durability</p>
        </div>
      </div>

      <div className="services-content">
        <div className="container">
          <div className="services-grid">
            {servicesData.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ServiceCard({ service }) {
  const Icon = service.icon
  
  return (
    <div className="service-card">
      <div className="service-icon">
        <Icon size={32} />
      </div>
      <h3>{service.title}</h3>
      <p className="service-description">{service.description}</p>
      <ul className="service-features">
        {service.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  )
}

export default Services
