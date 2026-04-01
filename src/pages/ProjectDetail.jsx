import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import { projectsData } from './Projects'
import './ProjectDetail.css'

function ProjectDetail() {
  const { id } = useParams()
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const project = Object.values(projectsData)
    .flat()
    .find(p => p.id === id)

  const allImages = project ? [
    ...(project.image ? [{ url: project.image, caption: project.name }] : []),
    ...(project.images || [])
  ] : []

  useEffect(() => {
    if (project) document.title = `${project.name} - hiro labs`
  }, [project])

  useEffect(() => { setCurrentSlide(0) }, [id])

  if (!project) {
    return (
      <div className="project-detail">
        <div className="container">
          <h1>Project not found</h1>
          <Link to="/projects">← Back to projects</Link>
        </div>
      </div>
    )
  }

  const prevSlide = () => setCurrentSlide(i => (i - 1 + allImages.length) % allImages.length)
  const nextSlide = () => setCurrentSlide(i => (i + 1) % allImages.length)

  return (
    <div className="project-detail">
      <div className="project-detail-header">
        <div className="container">
          <Link to="/projects" className="back-link">
            <ArrowLeft size={20} />
            Back to projects
          </Link>
          <h1>{project.name}</h1>
          <p className="project-detail-tagline">{project.tagline}</p>
          <div className="project-detail-tech">{project.tech}</div>
        </div>
      </div>

      {allImages.length > 0 && (
        <div className="project-detail-image">
          <div className="container">
            <div className="carousel">
              <div className={`carousel-slide ${allImages[currentSlide]?.type === 'mobile' ? 'mobile' : ''}`}>
                <img src={allImages[currentSlide].url} alt={allImages[currentSlide].caption} />
              </div>
              {allImages.length > 1 && (
                <>
                  <button className="carousel-btn prev" onClick={prevSlide} aria-label="Previous slide"><ChevronLeft size={24} /></button>
                  <button className="carousel-btn next" onClick={nextSlide} aria-label="Next slide"><ChevronRight size={24} /></button>
                  <div className="carousel-caption">{allImages[currentSlide].caption}</div>
                  <div className="carousel-dots">
                    {allImages.map((_, i) => (
                      <button key={i} className={`carousel-dot${i === currentSlide ? ' active' : ''}`} onClick={() => setCurrentSlide(i)} aria-label={`Go to slide ${i + 1}`} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="project-detail-content">
        <div className="container">
          <section className="detail-section">
            <h2>Challenge</h2>
            <p>{project.challenge}</p>
          </section>

          <section className="detail-section">
            <h2>Solution</h2>
            <p>{project.solution}</p>
          </section>

          <section className="detail-section">
            <h2>Results</h2>
            <ul className="results-list">
              {project.results.map((result, index) => (
                <li key={index}>{result}</li>
              ))}
            </ul>
          </section>

          <section className="detail-section">
            <h2>Tech Stack</h2>
            <div className="tech-stack-grid">
              {project.techStack.map((tech, index) => (
                <div key={index} className="tech-stack-item">
                  <h3>{tech.name}</h3>
                  <p>{tech.purpose}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail
