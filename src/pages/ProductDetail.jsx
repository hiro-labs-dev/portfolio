import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { productsData } from '../data/products'
import SakuraTerminal from '../components/SakuraTerminal'
import KiteDashboard from '../components/KiteDashboard'
import './ProductDetail.css'

function ProductDetail() {
  const { id } = useParams()
  const product = productsData.find(p => p.id === id)

  useEffect(() => {
    document.title = product ? `${product.name} - hiro labs` : 'Product Not Found - hiro labs'
  }, [product])

  if (!product) {
    return (
      <div className="product-detail not-found">
        <div className="container">
          <h1>Product not found</h1>
          <Link to="/products">Back to Products</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="product-detail">
      <div className="product-detail-hero">
        <div className="container">
          <Link to="/products" className="back-link"><ArrowLeft size={18} /> All Products</Link>
          {product.comingSoon && <span className="coming-soon-badge">Coming Soon</span>}
          <div className="product-detail-title">
            {product.logo && <img src={product.logo} alt={product.name} className="product-detail-logo" />}
            {product.showNameWithLogo ? <h1>{product.name}</h1> : !product.logo && <h1>{product.name}</h1>}
          </div>
          <p className="product-detail-tagline">{product.tagline}</p>
          <p className="product-detail-description">{product.description}</p>
        </div>
      </div>

      {product.demo && (
        <div className="product-detail-image">
          <div className="container">
            {product.demo === 'sakura-terminal' ? (
              <SakuraTerminal />
            ) : product.demo === 'kite-dashboard' ? (
              <KiteDashboard />
            ) : null}
          </div>
        </div>
      )}

      <div className="product-detail-content">
        <div className="container">
          {product.problem && (
            <section className="product-section product-problem">
              <h2>The Problem</h2>
              <p>{product.problem}</p>
            </section>
          )}

          <section className="product-section">
            <h2>What You Get</h2>
            <div className="product-features-grid">
              {product.features.map((f, i) => (
                <div key={i} className="product-feature-card">
                  <h3>{f.title}</h3>
                  <p>{f.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="product-section product-bottom-cta">
            {product.comingSoon ? (
              <>
                <h2>Stay tuned</h2>
                <p className="coming-soon-text">We're actively building this. Check back soon or <Link to="/contact">get in touch</Link> to be notified when it launches.</p>
              </>
            ) : (
              <>
                <h2>Ready to get started?</h2>
                <div className="product-cta">
                  <a href={product.ctaUrl} className="btn btn-primary">{product.ctaText}</a>
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
