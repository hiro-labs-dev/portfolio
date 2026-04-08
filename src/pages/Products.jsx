import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { productsData } from '../data/products'
import './Products.css'

function Products() {
  useEffect(() => {
    document.title = 'Products - hiro labs'
  }, [])

  return (
    <div className="products">
      <div className="products-header">
        <div className="container">
          <h1>Products</h1>
          <p>Tools and platforms we've built, owned, and ready to use</p>
        </div>
      </div>

      <div className="products-content">
        <div className="container">
          <div className="products-grid">
            {productsData.map(product => (
              <Link to={`/products/${product.id}`} key={product.id} className="product-card">
                <div className="product-image">
                  {product.comingSoon && <span className="coming-soon-card-badge">Coming Soon</span>}
                  {product.logo ? (
                    <img src={product.logo} alt={product.name} className="product-logo" />
                  ) : product.image ? (
                    <img src={product.image} alt={product.name} />
                  ) : (
                    <div className="product-placeholder">{product.name[0]}</div>
                  )}
                </div>
                <div className="product-info">
                  <div className="product-tagline">{product.tagline}</div>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products
