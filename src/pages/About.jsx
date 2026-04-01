import { useEffect } from 'react'
import './About.css'

function About() {
  useEffect(() => {
    document.title = 'About - hiro labs'
  }, [])

  return (
    <div className="about">
      <div className="about-header">
        <div className="container">
          <h1>About hiro labs</h1>
          <p>Founder-led. Architecture-driven.</p>
        </div>
      </div>

      <div className="about-content">
        <div className="container">
          <section className="about-section">
            <h2>The Studio</h2>
            <p>
              hiro labs is a software development studio focused on building production-grade infrastructure 
              and full-stack applications. We work with startups shipping MVPs and established businesses 
              building custom systems that need to scale.
            </p>
            <p>
              Our work spans SaaS platforms with payment integrations, corporate websites with CMS capabilities, 
              data pipelines processing millions of records, and automation tools that reduce operational overhead. 
              We've built systems for insurance companies, government agencies, broadcasting networks, and RV manufacturers.
            </p>
          </section>

          <section className="about-section founder-section">
            <div className="founder-content">
              <div className="founder-image">
                <img src="/roddy.webp" alt="Roddy Brown" />
              </div>
              <div className="founder-text">
                <h2>The Founder</h2>
                <p>
                  hiro labs is led by Roddy Brown, a senior software engineer with 8+ years building production systems 
                  across insurance, government, healthcare, and media industries. Roddy started his career building internal 
                  tools and data pipelines, then moved into full-stack development, eventually leading engineering teams and 
                  architecting systems from the ground up.
                </p>
                <p>
                  His technical foundation spans backend architecture with Django and Python, frontend development with React 
                  and TypeScript, database design and optimization with PostgreSQL, and cloud infrastructure on AWS. He's 
                  built ETL pipelines processing millions of records daily, RESTful APIs serving real-time data to mobile 
                  and web clients, and responsive interfaces that significantly improve user workflows.
                </p>
                <p>
                  Beyond writing code, Roddy has led cross-functional teams through full development lifecycles, mentored 
                  junior engineers, transitioned legacy systems to modern architectures, and established CI/CD practices 
                  that reduced deployment friction. His work includes help desk platforms, claims processing systems, 
                  predictive analytics tools, real-time search implementations, secure field operation APIs, and statistical 
                  visualization dashboards.
                </p>
                <p>
                  Roddy founded hiro labs to work directly with founders and business leaders who need production-grade 
                  systems built right the first time. Every project is approached with architectural discipline, clear 
                  documentation, and a focus on long-term maintainability over quick hacks.
                </p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>How We Work</h2>
            <p>
              We focus on pragmatic, production-grade solutions with clean architecture and proper documentation. 
              Every project includes real deployment pipelines, monitoring, and integration with the business tools 
              you already use.
            </p>
            <p>
              Our approach: understand the problem, build the right solution, ship it fast, and make it maintainable. 
              We optimize database queries, implement CI/CD pipelines, and orchestrate cloud infrastructure on AWS 
              to ensure high availability and cost efficiency.
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}

export default About
