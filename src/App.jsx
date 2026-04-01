import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import NIRoadmap from './pages/NIRoadmap'
import Invoice from './pages/Invoice'
import InvoiceLookup from './pages/InvoiceLookup'
import InvoiceAdmin from './pages/InvoiceAdmin'
import './App.css'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function AppLayout() {
  const { pathname } = useLocation()
  const isStandalone = pathname === '/ni-roadmap' || pathname.startsWith('/invoice/') || pathname === '/pay' || pathname === '/admin/invoices'

  if (isStandalone && pathname === '/ni-roadmap') {
    return <NIRoadmap />
  }

  if (isStandalone) {
    return (
      <>
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/invoice/:id" element={<Invoice />} />
            <Route path="/pay" element={<InvoiceLookup />} />
            <Route path="/admin/invoices" element={<InvoiceAdmin />} />
          </Routes>
        </main>
      </>
    )
  }

  return (
    <>
      <Navigation />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <Router>
      <div className="app">
        <ScrollToTop />
        <AppLayout />
      </div>
    </Router>
  )
}

export default App
