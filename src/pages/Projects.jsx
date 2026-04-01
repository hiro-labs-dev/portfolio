import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Projects.css'

export const projectsData = {
  'Full-Stack Platforms': [
    {
      id: 'common-ground-tampa',
      name: 'Common Ground Tampa',
      tagline: 'Community activism platform',
      description: 'Bilingual community platform with Wagtail CMS, interactive Mapbox resource maps, event calendar, organization directory, and multilingual support via i18next.',
      image: '/projects/common-ground.webp',
      tech: 'Django, Wagtail, React, PostgreSQL, Mapbox, AWS',
      challenge: 'Tampa community needed a centralized, bilingual platform to connect residents with local organizations, events, and activism resources across the city.',
      solution: 'Built a full-stack platform with Wagtail CMS for easy content management, interactive maps for resource discovery, i18n support for English/Spanish, and automated CI/CD via GitHub Actions with AWS OIDC.',
      results: ['Bilingual content with i18next', 'Interactive resource maps with Mapbox', 'Automated deployments via GitHub Actions'],
      techStack: [
        { name: 'Django + Wagtail', purpose: 'CMS backend with admin interface' },
        { name: 'React', purpose: 'Dynamic frontend with i18n support' },
        { name: 'PostgreSQL', purpose: 'Content and organization data' },
        { name: 'Mapbox', purpose: 'Interactive resource and event maps' },
        { name: 'AWS (EC2, S3, CloudFront)', purpose: 'Production infrastructure' },
        { name: 'GitHub Actions + OIDC', purpose: 'Automated deployments' },
      ],
    },
    {
      id: 'nomadic-influence',
      name: 'Nomadic Influence',
      tagline: 'Creator-business platform',
      description: 'SaaS platform with Stripe subscriptions, Google Calendar integration, and real-time features. Built to handle creator profiles, opportunity management, and business workflows.',
      image: '/projects/nomadic.webp',
      tech: 'Django, React, PostgreSQL, AWS',
      challenge: 'Creators needed a centralized platform to manage brand partnerships, track opportunities, and handle business operations without juggling multiple tools.',
      solution: 'Built a full-featured SaaS platform with subscription tiers, real-time notifications, calendar integration for scheduling, and a comprehensive opportunity pipeline.',
      results: ['Streamlined creator-brand workflows', 'Integrated payment processing with Stripe', 'Real-time collaboration features'],
      techStack: [
        { name: 'Django REST Framework', purpose: 'API backend with custom authentication' },
        { name: 'React', purpose: 'Dynamic frontend with real-time updates' },
        { name: 'PostgreSQL', purpose: 'Relational data with complex queries' },
        { name: 'AWS (EC2, S3, RDS)', purpose: 'Scalable infrastructure' },
      ],
      images: [
        { url: '/projects/nomadic-dashboard.webp', caption: 'Creator Dashboard', type: 'desktop' },
        { url: '/projects/nomadic-mobile.webp', caption: 'Mobile Experience', type: 'mobile' },
        { url: '/projects/nomadic-opportunities.webp', caption: 'Opportunity Pipeline', type: 'desktop' },
      ],
    },
    {
      id: 'nexus-rv',
      name: 'Nexus RV',
      tagline: 'Corporate website with CMS',
      description: 'Corporate website featuring 10 motorhome models, 40 floor plans with zoom functionality, dealer locator with Mapbox integration, and comprehensive content management.',
      image: '/projects/nexus.webp',
      tech: 'Django, React, Mapbox',
      challenge: 'RV manufacturer needed a modern website to showcase their product line with interactive floor plans and help customers find dealers.',
      solution: 'Developed a content-managed site with custom CMS for product updates, interactive floor plan viewer with zoom/pan, and location-based dealer search.',
      results: ['40+ interactive floor plans', 'Dealer locator with map integration', 'Easy content updates for marketing team'],
      techStack: [
        { name: 'Django CMS', purpose: 'Content management system' },
        { name: 'React', purpose: 'Interactive floor plan viewer' },
        { name: 'Mapbox', purpose: 'Dealer location mapping' },
        { name: 'PostgreSQL', purpose: 'Product and dealer data' },
      ],
    },
    {
      id: 'wecare-broadcasting',
      name: 'We Care Broadcasting',
      tagline: 'Content platform',
      description: 'Content-managed website for broadcasting network with program listings, broadcaster profiles, events, and donation management.',
      image: '/projects/wecare.webp',
      tech: 'Django, React, PostgreSQL',
      challenge: 'Broadcasting network needed a platform to manage program schedules, broadcaster profiles, and accept donations.',
      solution: 'Built a content platform with scheduling system, profile management, event calendar, and integrated donation processing.',
      results: ['Centralized content management', 'Automated program scheduling', 'Donation tracking system'],
      techStack: [
        { name: 'Django', purpose: 'Backend and admin interface' },
        { name: 'React', purpose: 'Frontend with dynamic content' },
        { name: 'PostgreSQL', purpose: 'Content and user data' },
      ],
    },
  ],
  'Automation Systems': [
    {
      id: 'jason-statham',
      name: 'Jason Statham',
      tagline: 'Task management bot',
      description: 'Bidirectional Shortcut ↔ Asana sync with Slack interface. Create tasks, sync comments, manage workflow states.',
      image: '/projects/jason.webp',
      tech: 'Python, AWS Lambda, DynamoDB, Slack API',
      challenge: 'Team used both Shortcut and Asana, leading to duplicate work and sync issues across project management tools.',
      solution: 'Built a Slack bot that syncs tasks bidirectionally between Shortcut and Asana, with comment threading and state management.',
      results: ['Eliminated manual task duplication', 'Real-time sync across platforms', 'Slack-native task creation'],
      techStack: [
        { name: 'AWS Lambda', purpose: 'Serverless execution' },
        { name: 'DynamoDB', purpose: 'Task mapping and state' },
        { name: 'Slack API', purpose: 'Bot interface' },
        { name: 'Python', purpose: 'Integration logic' },
      ],
    },
    {
      id: 'gloria',
      name: 'Gloria',
      tagline: 'Deployment automation',
      description: 'Slack bot for deploying to production and staging environments via AWS SSM.',
      image: '/projects/gloria.webp',
      tech: 'Python, AWS Lambda, SSM, Slack API',
      challenge: 'Deployments required SSH access and manual command execution, creating bottlenecks and security concerns.',
      solution: 'Created a Slack bot that triggers deployments via AWS Systems Manager, with approval workflows and deployment logs.',
      results: ['One-click deployments from Slack', 'Audit trail of all deployments', 'Removed need for SSH access'],
      techStack: [
        { name: 'AWS Lambda', purpose: 'Bot execution' },
        { name: 'AWS SSM', purpose: 'Remote command execution' },
        { name: 'Slack API', purpose: 'User interface' },
        { name: 'Python', purpose: 'Orchestration logic' },
      ],
    },
    {
      id: 'cream',
      name: 'CREAM',
      tagline: 'Cost monitoring',
      description: 'Daily AWS cost reports posted to Slack with week-over-week comparison, top services breakdown, and threshold alerts.',
      image: '/projects/cream.webp',
      tech: 'Python, AWS Lambda, Cost Explorer, Slack API',
      challenge: 'AWS costs were opaque and teams only discovered overruns during monthly billing cycles.',
      solution: 'Built an automated daily cost reporting system that posts to Slack with trends, service breakdowns, and alerts.',
      results: ['Daily cost visibility', 'Early detection of cost spikes', 'Service-level cost attribution'],
      techStack: [
        { name: 'AWS Lambda', purpose: 'Scheduled execution' },
        { name: 'Cost Explorer API', purpose: 'Cost data retrieval' },
        { name: 'Slack API', purpose: 'Report delivery' },
        { name: 'Python', purpose: 'Data processing and formatting' },
      ],
    },
    {
      id: 'jinkies',
      name: 'Jinkies',
      tagline: 'Webhook integration',
      description: 'Lambda-based Slack webhook handler for Django applications, enabling real-time notifications and integrations.',
      image: '/projects/velma.webp',
      tech: 'Python, AWS Lambda, Slack API',
      challenge: 'Django applications needed to send Slack notifications without blocking request threads or managing webhook infrastructure.',
      solution: 'Created a Lambda-based webhook handler that Django apps can call asynchronously for reliable Slack notifications.',
      results: ['Non-blocking notifications', 'Centralized webhook management', 'Retry logic and error handling'],
      techStack: [
        { name: 'AWS Lambda', purpose: 'Webhook processing' },
        { name: 'Slack API', purpose: 'Message delivery' },
        { name: 'Python', purpose: 'Handler logic' },
      ],
    },
  ],
}

function Projects() {
  useEffect(() => {
    document.title = 'Work - hiro labs'
  }, [])

  return (
    <div className="projects">
      <div className="projects-header">
        <div className="container">
          <h1>Work</h1>
          <p>Production systems built for durability and scale</p>
        </div>
      </div>

      <div className="projects-content">
        <div className="container">
          {Object.entries(projectsData).map(([category, projects]) => (
            <section key={category} className="project-category">
              <h2 className="category-title">{category}</h2>
              <div className="projects-grid">
                {projects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project }) {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <Link to={`/projects/${project.id}`} className="project-card">
      <div className="project-image">
        {project.image ? (
          <img src={project.image} alt={project.name} />
        ) : (
          <div className="project-placeholder">{getInitials(project.name)}</div>
        )}
      </div>
      <div className="project-info">
        <div className="project-tagline">{project.tagline}</div>
        <h3>{project.name}</h3>
        <p className="project-description">{project.description}</p>
        <div className="project-tech">{project.tech}</div>
      </div>
    </Link>
  )
}

export default Projects
