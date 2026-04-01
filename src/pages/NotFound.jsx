import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
  useEffect(() => {
    document.title = '404 - Page Not Found'
  }, [])

  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn-home">
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
