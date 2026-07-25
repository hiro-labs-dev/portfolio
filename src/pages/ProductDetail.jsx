import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { productsData } from '../data/products'
import SakuraTerminal from '../components/SakuraTerminal'
import KiteDashboard from '../components/KiteDashboard'
import './ProductDetail.css'

function ProductScreenshots({ screenshots }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const goNext = () => setCurrentIndex((i) => (i + 1) % screenshots.length)
  const goPrev = () => setCurrentIndex((i) => (i - 1 + screenshots.length) % screenshots.length)

  return (
    <>
      <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid #1e2d3d' }}>
        <div onClick={() => setLightboxOpen(true)} style={{ cursor: 'pointer', position: 'relative' }}>
          <img src={screenshots[currentIndex].src} alt={screenshots[currentIndex].label} style={{ width: '100%', display: 'block', borderRadius: '12px' }} />
          <button style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.7)', border: '1px solid #1e2d3d', borderRadius: '8px', padding: '8px 12px', color: '#14b8a6', fontSize: '0.8rem', cursor: 'pointer', backdropFilter: 'blur(4px)' }}>
            ⛶ Fullscreen
          </button>
        </div>
        <button onClick={(e) => { e.stopPropagation(); goPrev(); }} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.7)', border: '1px solid #1e2d3d', borderRadius: '50%', width: '40px', height: '40px', color: '#e8edf3', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
        <button onClick={(e) => { e.stopPropagation(); goNext(); }} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.7)', border: '1px solid #1e2d3d', borderRadius: '50%', width: '40px', height: '40px', color: '#e8edf3', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</button>
        <div style={{ position: 'absolute', bottom: '12px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', borderRadius: '8px', padding: '6px 16px', color: '#e8edf3', fontSize: '0.85rem', fontWeight: '500' }}>
          {screenshots[currentIndex].label} — {currentIndex + 1}/{screenshots.length}
        </div>
      </div>
      <div style={{ display: 'flex', gap: '8px', marginTop: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
        {screenshots.map((shot, i) => (
          <img key={shot.src} src={shot.src} alt={shot.label} onClick={() => setCurrentIndex(i)} style={{ width: '80px', height: '50px', objectFit: 'cover', borderRadius: '6px', cursor: 'pointer', border: i === currentIndex ? '2px solid #14b8a6' : '2px solid transparent', opacity: i === currentIndex ? 1 : 0.6, transition: 'all 0.2s', flexShrink: 0 }} />
        ))}
      </div>
      {lightboxOpen && (
        <div onClick={() => setLightboxOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <img src={screenshots[currentIndex].src} alt={screenshots[currentIndex].label} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '8px' }} onClick={(e) => e.stopPropagation()} />
          <button onClick={() => setLightboxOpen(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: '44px', height: '44px', color: '#fff', fontSize: '1.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
          <button onClick={(e) => { e.stopPropagation(); goPrev(); }} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: '50px', height: '50px', color: '#fff', fontSize: '1.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
          <button onClick={(e) => { e.stopPropagation(); goNext(); }} style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: '50px', height: '50px', color: '#fff', fontSize: '1.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</button>
          <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.7)', borderRadius: '8px', padding: '8px 20px', color: '#e8edf3', fontSize: '0.9rem' }}>
            {screenshots[currentIndex].label} — {currentIndex + 1}/{screenshots.length}
          </div>
        </div>
      )}
    </>
  )
}

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

      {product.screenshots && product.screenshots.length > 0 && (
        <div className="product-detail-image">
          <div className="container">
            <ProductScreenshots screenshots={product.screenshots} />
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
