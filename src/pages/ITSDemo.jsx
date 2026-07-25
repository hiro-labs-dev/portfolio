import { useState } from 'react'
import './ITSDemo.css'

const PASSCODE = 'omelette-du-frommage'
const JULY3_VIDEO = 'vINrc0A9lXA'

const SCREENSHOTS = [
  { src: '/signal-screenshots/cameras.webp', label: 'Cameras & Video Wall' },
  { src: '/signal-screenshots/vision-ai.webp', label: 'Vision AI' },
  { src: '/signal-screenshots/incidents.webp', label: 'Incidents' },
  { src: '/signal-screenshots/alerts.webp', label: 'Alerts' },
  { src: '/signal-screenshots/traffic.webp', label: 'Traffic' },
  { src: '/signal-screenshots/probe-data.webp', label: 'Probe Data' },
  { src: '/signal-screenshots/work-zones.webp', label: 'Work Zones' },
  { src: '/signal-screenshots/speed-limits.webp', label: 'Speed Limits' },
  { src: '/signal-screenshots/queue.webp', label: 'Queue Detection' },
  { src: '/signal-screenshots/ai-predictions.webp', label: 'AI Predictions' },
  { src: '/signal-screenshots/devices.webp', label: 'Devices' },
  { src: '/signal-screenshots/performance.webp', label: 'Performance' },
]

function ScreenshotCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const goNext = () => setCurrentIndex((i) => (i + 1) % SCREENSHOTS.length)
  const goPrev = () => setCurrentIndex((i) => (i - 1 + SCREENSHOTS.length) % SCREENSHOTS.length)

  return (
    <>
      {/* Carousel */}
      <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid #1e2d3d' }}>
        <div
          onClick={() => setLightboxOpen(true)}
          style={{ cursor: 'pointer', position: 'relative' }}
        >
          <img
            src={SCREENSHOTS[currentIndex].src}
            alt={SCREENSHOTS[currentIndex].label}
            style={{ width: '100%', display: 'block', borderRadius: '12px' }}
          />
          {/* Fullscreen button overlay */}
          <button
            style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.7)', border: '1px solid #1e2d3d', borderRadius: '8px', padding: '8px 12px', color: '#14b8a6', fontSize: '0.8rem', cursor: 'pointer', backdropFilter: 'blur(4px)' }}
          >
            ⛶ Fullscreen
          </button>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.7)', border: '1px solid #1e2d3d', borderRadius: '50%', width: '40px', height: '40px', color: '#e8edf3', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          ‹
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.7)', border: '1px solid #1e2d3d', borderRadius: '50%', width: '40px', height: '40px', color: '#e8edf3', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          ›
        </button>

        {/* Label */}
        <div style={{ position: 'absolute', bottom: '12px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', borderRadius: '8px', padding: '6px 16px', color: '#e8edf3', fontSize: '0.85rem', fontWeight: '500' }}>
          {SCREENSHOTS[currentIndex].label} — {currentIndex + 1}/{SCREENSHOTS.length}
        </div>
      </div>

      {/* Thumbnail strip */}
      <div style={{ display: 'flex', gap: '8px', marginTop: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
        {SCREENSHOTS.map((shot, i) => (
          <img
            key={shot.src}
            src={shot.src}
            alt={shot.label}
            onClick={() => setCurrentIndex(i)}
            style={{ width: '80px', height: '50px', objectFit: 'cover', borderRadius: '6px', cursor: 'pointer', border: i === currentIndex ? '2px solid #14b8a6' : '2px solid transparent', opacity: i === currentIndex ? 1 : 0.6, transition: 'all 0.2s', flexShrink: 0 }}
          />
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          onClick={() => setLightboxOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
        >
          <img
            src={SCREENSHOTS[currentIndex].src}
            alt={SCREENSHOTS[currentIndex].label}
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '8px' }}
            onClick={(e) => e.stopPropagation()}
          />
          {/* Close button */}
          <button
            onClick={() => setLightboxOpen(false)}
            style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: '44px', height: '44px', color: '#fff', fontSize: '1.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            ×
          </button>
          {/* Nav in lightbox */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: '50px', height: '50px', color: '#fff', fontSize: '1.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            ‹
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: '50px', height: '50px', color: '#fff', fontSize: '1.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            ›
          </button>
          {/* Label in lightbox */}
          <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.7)', borderRadius: '8px', padding: '8px 20px', color: '#e8edf3', fontSize: '0.9rem' }}>
            {SCREENSHOTS[currentIndex].label} — {currentIndex + 1}/{SCREENSHOTS.length}
          </div>
        </div>
      )}
    </>
  )
}

const MODULE_DATA = [
  { id: 'core', name: 'Core Platform', price_low: 30000, price_high: 60000 },
  { id: 'ai', name: 'AI Operations Assistant', price_low: 18000, price_high: 36000 },
  { id: 'mempalace', name: 'Mem Palace (AI Memory)', price_low: 9600, price_high: 18000 },
  { id: 'map', name: 'Device Network Map', price_low: 14400, price_high: 30000 },
  { id: 'devices', name: 'Device Management & Categorization', price_low: 9600, price_high: 18000 },
  { id: 'access', name: 'Role-Based Access Control', price_low: 6000, price_high: 12000 },
  { id: 'video', name: 'Video Wall & Camera Management', price_low: 18000, price_high: 36000 },
  { id: 'incidents', name: 'Incident Management', price_low: 14400, price_high: 30000 },
  { id: 'alerts', name: 'Alert Automation', price_low: 9600, price_high: 18000 },
  { id: 'dms', name: 'DMS / Sign Control', price_low: 12000, price_high: 24000 },
  { id: 'dispatch', name: 'Dispatch & Fleet Tracking', price_low: 12000, price_high: 24000 },
  { id: 'ticketing', name: 'Ticketing & Maintenance', price_low: 7200, price_high: 14400 },
  { id: 'vision', name: 'Computer Vision (Camera AI)', price_low: 24000, price_high: 48000 },
  { id: 'predictive', name: 'Predictive Analytics', price_low: 18000, price_high: 36000 },
  { id: 'queue', name: 'Queue Detection Engine', price_low: 12000, price_high: 24000 },
  { id: 'probe', name: 'Probe Data Integration', price_low: 12000, price_high: 24000 },
  { id: 'mcp', name: 'External Data Sources (MCP)', price_low: 9600, price_high: 18000 },
  { id: 'performance', name: 'Performance Reporting (FHWA)', price_low: 9600, price_high: 18000 },
  { id: 'assets', name: 'Asset Lifecycle Management', price_low: 9600, price_high: 18000 },
  { id: 'workzones', name: 'Work Zone Management', price_low: 7200, price_high: 14400 },
  { id: 'vsl', name: 'Variable Speed Limit Control', price_low: 9600, price_high: 18000 },
]

const BUNDLES = [
  { name: 'Small Police / Security Ops', modules: ['core', 'video', 'incidents', 'ai', 'map', 'ticketing'] },
  { name: 'Building / Facility Management', modules: ['core', 'map', 'alerts', 'ticketing', 'assets', 'access'] },
  { name: 'Full ATMS (State DOT)', modules: MODULE_DATA.map(m => m.id) },
]

export default function ITSDemo() {
  const [activeTab, setActiveTab] = useState('july4')
  const [openSections, setOpenSections] = useState({ screenshots: true, stats: true, phases: false, liveData: false, comparison: false, nonAiFeatures: false, market: false, strategy: false, install: false, pricing: false, tech: false })
  const [selectedModules, setSelectedModules] = useState(['core'])

  return (
    <div className="its-demo">
      <div className="its-demo-header">
        <img src="/signal-logo.svg" alt="Signal" style={{ height: '48px', marginBottom: '8px' }} />
        <p className="its-demo-subtitle">AI-Powered Traffic Management Platform</p>
      </div>

      {/* Session Tabs */}
      <div style={{ display: 'flex', gap: '0', marginBottom: '2rem', borderBottom: '1px solid #1e2d3d' }}>
        <button
          onClick={() => setActiveTab('july2')}
          style={{ padding: '10px 20px', fontSize: '13px', fontWeight: activeTab === 'july2' ? '600' : '400', color: activeTab === 'july2' ? '#14b8a6' : '#7a8a9e', background: 'transparent', border: 'none', borderBottom: activeTab === 'july2' ? '2px solid #14b8a6' : '2px solid transparent', cursor: 'pointer' }}
        >
          July 2 — ITS Troubleshooter
        </button>
        <button
          onClick={() => setActiveTab('july3')}
          style={{ padding: '10px 20px', fontSize: '13px', fontWeight: activeTab === 'july3' ? '600' : '400', color: activeTab === 'july3' ? '#14b8a6' : '#7a8a9e', background: 'transparent', border: 'none', borderBottom: activeTab === 'july3' ? '2px solid #14b8a6' : '2px solid transparent', cursor: 'pointer' }}
        >
          July 3 — Signal Platform
        </button>
        <button
          onClick={() => setActiveTab('july4')}
          style={{ padding: '10px 20px', fontSize: '13px', fontWeight: activeTab === 'july4' ? '600' : '400', color: activeTab === 'july4' ? '#14b8a6' : '#7a8a9e', background: 'transparent', border: 'none', borderBottom: activeTab === 'july4' ? '2px solid #14b8a6' : '2px solid transparent', cursor: 'pointer' }}
        >
          July 4 — Full Build + Live Data
        </button>
      </div>

      {/* July 3 Content */}
      {activeTab === 'july3' && (
        <div>
          <section className="its-demo-section">
            <h2>Demo — Signal Platform</h2>
            <div className="its-demo-video">
              <div className="its-video-placeholder">
                <iframe
                  src={`https://www.youtube.com/embed/${JULY3_VIDEO}`}
                  title="Signal Platform Demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </section>

          <section className="its-demo-section">
            <h2>What Changed</h2>
            <p>
              The day started with polishing the ITS Troubleshooter, then evolved it into <strong>Signal</strong> — a full SunGuide replacement.
              No longer just a troubleshooting tool, it's now a complete traffic management platform
              with a map-centric workspace, incident management, DMS control, and real-time traffic data.
            </p>
          </section>

          <section className="its-demo-section">
            <h2>ITS Troubleshooter Improvements (Before Signal Pivot)</h2>
            <div className="its-features-grid">
              <div className="its-feature-card">
                <h3>Design System Overhaul</h3>
                <p>Full visual polish pass — teal accent, proper dark theme, consistent card elevation, hover states, typography normalization across all pages.</p>
              </div>
              <div className="its-feature-card">
                <h3>Area-Based Filtering</h3>
                <p>Geocoded 457 sites with FDOT milepost data. Cameras now filterable by neighborhood (St. Petersburg, Downtown Tampa, USF/Bearss, etc.).</p>
              </div>
              <div className="its-feature-card">
                <h3>Direction Filtering</h3>
                <p>Filter devices by NB/SB/EB/WB across all device tables. Combined with highway + area for precise narrowing.</p>
              </div>
              <div className="its-feature-card">
                <h3>Pagination</h3>
                <p>Configurable rows per page (10/25/50/100) with prev/next navigation. Resets on filter change.</p>
              </div>
              <div className="its-feature-card">
                <h3>Video Presets</h3>
                <p>Save camera groups as named presets. One-click to load a preset into the video grid. Persisted to localStorage.</p>
              </div>
              <div className="its-feature-card">
                <h3>Camera List Redesign</h3>
                <p>Persistent sidebar with cameras grouped by highway → area. Expand/collapse all. Double-click or drag to add to grid.</p>
              </div>
              <div className="its-feature-card">
                <h3>10+ New AI Actions</h3>
                <p>PTZ by camera name, bulk ping, failure history, remove/replace video grid, navigate pages, resolved today — all via conversational AI.</p>
              </div>
              <div className="its-feature-card">
                <h3>AI Conversation Memory</h3>
                <p>Multi-turn conversations with full context. "Show me cameras on I-275" → "Open those in the grid" works because AI remembers the previous results.</p>
              </div>
              <div className="its-feature-card">
                <h3>Keyboard Shortcuts + Stream Deck</h3>
                <p>Full keyboard shortcut mapping for PTZ (Ctrl+arrows, Ctrl+Shift for zoom). Stream Deck setup guide for physical button control.</p>
              </div>
            </div>
          </section>

          <section className="its-demo-section">
            <h2>What's New (July 3)</h2>
            <div className="its-features-grid">
              <div className="its-feature-card">
                <h3>Map-Centric Workspace</h3>
                <p>MapLibre GL dark basemap with precise FDOT highway geometry. Devices, incidents, Road Rangers, and traffic flow all on one interactive map.</p>
              </div>
              <div className="its-feature-card">
                <h3>Incident Management</h3>
                <p>Create, dispatch, and close incidents. Road Rangers animate toward incidents on the map. DMS auto-posting from incident response.</p>
              </div>
              <div className="its-feature-card">
                <h3>DMS Sign Control</h3>
                <p>View and post messages to Dynamic Message Signs. Mini-sign previews with amber monospace text. Message composer with character limits.</p>
              </div>
              <div className="its-feature-card">
                <h3>Real-Time Traffic Data</h3>
                <p>Live detector data updating every 5 seconds. Speed/volume/occupancy per station. Color-coded congestion on map matching table data.</p>
              </div>
              <div className="its-feature-card">
                <h3>AI Traffic Alerts</h3>
                <p>Automatic congestion detection. AI-generated alerts appear in the incidents bar when speeds drop below threshold. Purple "AI" badge.</p>
              </div>
              <div className="its-feature-card">
                <h3>FDOT GIS Precision</h3>
                <p>Real highway geometry from FDOT ArcGIS. Devices snapped to actual road centerlines. Traffic lines follow real curves. No more approximations.</p>
              </div>
              <div className="its-feature-card">
                <h3>Tabbed Workspace</h3>
                <p>Open multiple panels as tabs. Map always visible for operational views. Full-width for management views. Smooth transitions between modes.</p>
              </div>
              <div className="its-feature-card">
                <h3>Device Clustering</h3>
                <p>At low zoom, devices cluster into count bubbles. Click to expand. Cluster counts update when layer filters change. Only shows CCTV/MVDS/DMS.</p>
              </div>
              <div className="its-feature-card">
                <h3>Click Camera → Stream</h3>
                <p>Click a camera on the map → popup with live video stream + "View in Video Wall" button. Disabled state if already on the wall.</p>
              </div>
            </div>
          </section>

          <section className="its-demo-section">
            <h2>The Vision: SunGuide Replacement</h2>
            <p>
              Signal is being built to replace Florida's legacy SunGuide ATMS. Everything SunGuide does,
              but on 2026 technology with AI built in from day one. Predictive incident detection,
              autonomous response, voice-first operations, computer vision on camera feeds — all planned.
            </p>
          </section>

          <section className="its-demo-section">
            <h2>Technical Summary</h2>
            <div className="its-tech-stats">
              <div className="its-stat">
                <span className="its-stat-number">110+</span>
                <span className="its-stat-label">Source Files</span>
              </div>
              <div className="its-stat">
                <span className="its-stat-number">16,000+</span>
                <span className="its-stat-label">Lines of Code</span>
              </div>
              <div className="its-stat">
                <span className="its-stat-number">2 days</span>
                <span className="its-stat-label">Build Time</span>
              </div>
              <div className="its-stat">
                <span className="its-stat-number">0</span>
                <span className="its-stat-label">TypeScript Errors</span>
              </div>
            </div>
            <p className="its-tech-stack">TypeScript • Electron • React • MapLibre GL • Fastify • PostgreSQL • GPT-5.4 mini • WebSocket • Tailwind CSS • FDOT GIS</p>
          </section>
        </div>
      )}

      {/* July 2 Content (original) */}
      {activeTab === 'july2' && (
        <div>

      {/* Video Demo */}
      <section className="its-demo-section">
        <h2>Demo</h2>
        <div className="its-demo-video">
          <div className="its-video-placeholder">
            {/* Replace YOUTUBE_VIDEO_ID with the actual video ID once uploaded */}
            <iframe
              src="https://www.youtube.com/embed/NAGB_mhw4B8"
              title="ITS Troubleshooter Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="its-demo-section">
        <h2>What It Is</h2>
        <p>
          An AI-powered operations tool that lets DOT operators monitor, troubleshoot, and manage
          highway infrastructure — CCTV cameras, vehicle detection systems, digital message signs,
          power units, routers, all of it. It's a desktop app that runs on Windows and Mac, and it
          also works on tablets.
        </p>
      </section>

      {/* Features */}
      <section className="its-demo-section">
        <h2>What's Built</h2>
        <div className="its-features-grid">
          <div className="its-feature-card">
            <h3><svg className="feature-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>Device Dashboard</h3>
            <p>1,500+ real devices loaded from FDOT District 7 data. Search and filter by highway, category, milepost range, and direction.</p>
          </div>
          <div className="its-feature-card">
            <h3><svg className="feature-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>Auto-Troubleshoot</h3>
            <p>One-click diagnostic sequence — ping, reboot, power cycle, clear network cache, create ticket. Tracks what actually resolved the issue.</p>
          </div>
          <div className="its-feature-card">
            <h3><svg className="feature-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z"/><path d="M20 12a8 8 0 0 0-8-8v8h8z"/></svg>AI Assistant</h3>
            <p>Conversational interface — "Show me cameras on I-275 between mile marker 40 and 53 going southbound." Searches, executes actions, and navigates the app automatically.</p>
          </div>
          <div className="its-feature-card">
            <h3><svg className="feature-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 10l4.553-2.276A1 1 0 0 1 21 8.618v6.764a1 1 0 0 1-1.447.894L15 14M5 18h8a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2z"/></svg>Live Video Grid</h3>
            <p>Up to 9 simultaneous camera feeds with full PTZ (pan/tilt/zoom) controls. Ask the AI to pull up cameras and it opens them for you.</p>
          </div>
          <div className="its-feature-card">
            <h3><svg className="feature-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M12 12h.01"/><path d="M17 12h.01"/><path d="M7 12h.01"/></svg>Hardware Control</h3>
            <p>Xbox controller support for PTZ (joystick to pan, zoom, cycle cameras). Elgato Stream Deck integration for one-touch operations.</p>
          </div>
          <div className="its-feature-card">
            <h3><svg className="feature-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5v2"/><path d="M15 11v2"/><path d="M15 17v2"/><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/></svg>Ticket Management</h3>
            <p>SolarWinds integration — create tickets, forward to vendor, close with resolution. Kanban and table views.</p>
          </div>
          <div className="its-feature-card">
            <h3><svg className="feature-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1"/></svg>Offline Mode</h3>
            <p>If internet drops, actions queue up and sync when connectivity returns. All device operations work on the local ITS network regardless.</p>
          </div>
          <div className="its-feature-card">
            <h3><svg className="feature-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>Shift Briefing</h3>
            <p>AI generates a summary when you log in — what failed overnight, what auto-resolved, what needs attention right now.</p>
          </div>
          <div className="its-feature-card">
            <h3><svg className="feature-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>Admin &amp; Audit</h3>
            <p>Role-based access (admin, operator, viewer). Full audit log of every action. Device, credential, and user management.</p>
          </div>
        </div>
      </section>

      {/* What's Next */}
      <section className="its-demo-section">
        <h2>What's Next</h2>
        <ul className="its-next-list">
          <li>Design polish — premium visual pass for demos</li>
          <li>Name and branding</li>
          <li>Connect to real devices on a live network</li>
          <li>Real SolarWinds ticket system integration</li>
          <li>Map view showing devices on the actual highway</li>
          <li>Predictive failure detection (AI predicts issues before they happen)</li>
          <li>Vendor performance tracking</li>
          <li>Automated maintenance scheduling</li>
          <li>Mobile app for field technicians</li>
        </ul>
      </section>

      {/* What We Need */}
      <section className="its-demo-section">
        <h2>What We Need to Move Forward</h2>
        <ul className="its-next-list">
          <li>Access to 2-3 IP cameras (Cohu, GovComm, or any PTZ camera) on a reachable network. Doesn't have to be on the ITS network — a bench setup in an office works. Just need to verify reboot commands and PTZ controls against real hardware.</li>
          <li>A SolarWinds Service Desk sandbox to validate ticket integration.</li>
          <li>That's it. Everything else is built and working against simulated data.</li>
        </ul>
      </section>

      {/* Pricing */}
      <section className="its-demo-section">
        <h2>Pricing Model</h2>
        <div className="its-pricing">
          <p>Annual contract, licensed per district/network. Unlimited users within that district — no per-seat charges.</p>
          <p>Each district pays for their own license. One district buying in doesn't cover the others.</p>
          <p>The AI module (conversational commands, predictive diagnostics, smart troubleshooting) is an additional add-on on top of the base license.</p>
          <p><strong>We need to sit down and talk through actual numbers, but the structure is set.</strong></p>
        </div>
      </section>

      {/* Tech */}
      <section className="its-demo-section">
        <h2>Technical Summary</h2>
        <div className="its-tech-stats">
          <div className="its-stat">
            <span className="its-stat-number">100</span>
            <span className="its-stat-label">Source Files</span>
          </div>
          <div className="its-stat">
            <span className="its-stat-number">13,500+</span>
            <span className="its-stat-label">Lines of Code</span>
          </div>
          <div className="its-stat">
            <span className="its-stat-number">5 hrs</span>
            <span className="its-stat-label">Build Time</span>
          </div>
          <div className="its-stat">
            <span className="its-stat-number">0</span>
            <span className="its-stat-label">TypeScript Errors</span>
          </div>
        </div>
        <p className="its-tech-stack">TypeScript • Electron • React • Fastify • PostgreSQL • GPT-5.4 mini • WebSocket • Tailwind CSS</p>
      </section>
        </div>
      )}

      {/* July 4 Content */}
      {activeTab === 'july4' && (
        <div>
          {/* Screenshot Carousel */}
          <section className="its-demo-section">
            <h2
              onClick={() => setOpenSections(s => ({ ...s, screenshots: !s.screenshots }))}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              Platform Screenshots
              <span style={{ fontSize: '0.8rem', color: '#7a8a9e' }}>{openSections.screenshots ? '▼' : '▶'}</span>
            </h2>
            {openSections.screenshots && (
              <div>
                <ScreenshotCarousel />
              </div>
            )}
          </section>

          {/* Section 1: Overview Stats */}
          <section className="its-demo-section">
            <h2
              onClick={() => setOpenSections(s => ({ ...s, stats: !s.stats }))}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              July 4 — Full Build Summary
              <span style={{ fontSize: '0.8rem', color: '#7a8a9e' }}>{openSections.stats ? '▼' : '▶'}</span>
            </h2>
            {openSections.stats && (
              <div>
                <div className="its-tech-stats">
                  <div className="its-stat">
                    <span className="its-stat-number">21</span>
                    <span className="its-stat-label">Server Modules</span>
                  </div>
                  <div className="its-stat">
                    <span className="its-stat-number">3</span>
                    <span className="its-stat-label">Live APIs Connected</span>
                  </div>
                  <div className="its-stat">
                    <span className="its-stat-number">73</span>
                    <span className="its-stat-label">Detector Stations (Live Sim)</span>
                  </div>
                  <div className="its-stat">
                    <span className="its-stat-number">2,025</span>
                    <span className="its-stat-label">Real FDOT Devices</span>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Section 2: Phases Completed */}
          <section className="its-demo-section">
            <h2
              onClick={() => setOpenSections(s => ({ ...s, phases: !s.phases }))}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              Three Full Phases Built in One Session
              <span style={{ fontSize: '0.8rem', color: '#7a8a9e' }}>{openSections.phases ? '▼' : '▶'}</span>
            </h2>
            {openSections.phases && (
            <div>

            <h3 style={{ color: '#14b8a6', marginTop: '1.5rem', marginBottom: '1rem' }}>Phase 2 — Compliance & Safety</h3>
            <div className="its-features-grid">
              <div className="its-feature-card">
                <h3>FHWA Performance Reporting</h3>
                <p>LOTTR, TTRI, PHED metrics computed live. PDF export in submission format. Ready for federal compliance reporting.</p>
                <ul style={{ color: '#7a8a9e', fontSize: '0.8rem', marginTop: '0.75rem', paddingLeft: '1rem', listStyle: 'disc', lineHeight: '1.8' }}>
                  <li>Travel Time Reliability Index (LOTTR)</li>
                  <li>Freight Reliability (TTRI)</li>
                  <li>Peak Hour Excessive Delay (PHED)</li>
                  <li>Corridor-level breakdown per highway</li>
                  <li>Month-over-month benchmarking</li>
                  <li>One-click PDF export and FHWA JSON submission</li>
                </ul>
              </div>
              <div className="its-feature-card">
                <h3>AMBER/SILVER/LEO Alert Automation</h3>
                <p>One-click alert activation. Auto-posts to DMS signs within configurable radius. Full alert lifecycle management.</p>
                <ul style={{ color: '#7a8a9e', fontSize: '0.8rem', marginTop: '0.75rem', paddingLeft: '1rem', listStyle: 'disc', lineHeight: '1.8' }}>
                  <li>5 alert types: AMBER, SILVER, LEO, Weather, Evacuation</li>
                  <li>Type-specific input fields (vehicle info, description, etc.)</li>
                  <li>Highway, direction, and radius selection</li>
                  <li>Auto-clear timer (30min, 1hr, 2hr, 4hr)</li>
                  <li>Live DMS sign count within radius</li>
                  <li>Active alerts with countdown timer and deactivate</li>
                </ul>
              </div>
              <div className="its-feature-card">
                <h3>Queue Detection & End-of-Queue Warning</h3>
                <p>Live algorithm detecting queue formation. Automatically posts warnings to upstream DMS signs. Prevents secondary crashes.</p>
                <ul style={{ color: '#7a8a9e', fontSize: '0.8rem', marginTop: '0.75rem', paddingLeft: '1rem', listStyle: 'disc', lineHeight: '1.8' }}>
                  <li>73 detector stations across I-275, I-4, I-75</li>
                  <li>Speed computed every 15 seconds</li>
                  <li>Queues detected via speed differentials between stations</li>
                  <li>Tracks growth rate: growing, stable, shrinking</li>
                  <li>Auto-selects upstream DMS for warnings</li>
                  <li>Configurable thresholds and DMS distance</li>
                </ul>
              </div>
            </div>

            <h3 style={{ color: '#14b8a6', marginTop: '2rem', marginBottom: '1rem' }}>Phase 3 — Operations & Maintenance</h3>
            <div className="its-features-grid">
              <div className="its-feature-card">
                <h3>Work Zone Management</h3>
                <p>Calendar view, conflict detection between overlapping zones, auto-DMS posting, and predicted vs actual impact analysis.</p>
                <ul style={{ color: '#7a8a9e', fontSize: '0.8rem', marginTop: '0.75rem', paddingLeft: '1rem', listStyle: 'disc', lineHeight: '1.8' }}>
                  <li>List, Calendar, and Conflicts views</li>
                  <li>Auto-DMS message posting when zone activates</li>
                  <li>FL 511 publish toggle for traveler info</li>
                  <li>Conflict check warns of overlapping closures</li>
                  <li>Impact panel: predicted delay, queue length, detour</li>
                  <li>Contractor, schedule, and lane config tracking</li>
                </ul>
              </div>
              <div className="its-feature-card">
                <h3>Variable Speed Limit</h3>
                <p>Algorithm-driven speed recommendations. Compliance monitoring dashboard. Weather triggers for automatic adjustments.</p>
                <ul style={{ color: '#7a8a9e', fontSize: '0.8rem', marginTop: '0.75rem', paddingLeft: '1rem', listStyle: 'disc', lineHeight: '1.8' }}>
                  <li>Auto/Manual mode toggle</li>
                  <li>Congestion, weather, and queue approach triggers</li>
                  <li>Progressive reduction (smooth speed ramp-down)</li>
                  <li>Compliance table: posted vs actual driver speeds</li>
                  <li>Per-corridor weather conditions panel</li>
                  <li>Manual override with operator attribution</li>
                </ul>
              </div>
              <div className="its-feature-card">
                <h3>Asset Lifecycle Management</h3>
                <p>Health scores for every device. Warranty tracking. Capital planning with replacement forecasting.</p>
                <ul style={{ color: '#7a8a9e', fontSize: '0.8rem', marginTop: '0.75rem', paddingLeft: '1rem', listStyle: 'disc', lineHeight: '1.8' }}>
                  <li>Health score 0-100 per device (age, failures, warranty)</li>
                  <li>Warranty expiration alerts (90 day window)</li>
                  <li>Maintenance scheduling and history log</li>
                  <li>Capital planning: replacement cost next 1/3/5 years</li>
                  <li>Lifecycle timeline visualization</li>
                  <li>Covers cameras, DMS, detectors, controllers, cabinets</li>
                </ul>
              </div>
            </div>

            <h3 style={{ color: '#14b8a6', marginTop: '2rem', marginBottom: '1rem' }}>Phase 4 — Intelligence & Coverage</h3>
            <div className="its-features-grid">
              <div className="its-feature-card">
                <h3>Probe Data Integration</h3>
                <p>Travel time computation, anomaly detection, and coverage gap analysis from probe vehicle data.</p>
                <ul style={{ color: '#7a8a9e', fontSize: '0.8rem', marginTop: '0.75rem', paddingLeft: '1rem', listStyle: 'disc', lineHeight: '1.8' }}>
                  <li>Corridor travel time cards (current vs freeflow)</li>
                  <li>Speed anomaly alerts (unexpected slowdowns)</li>
                  <li>TMC segment table with confidence scores</li>
                  <li>Data coverage map (which roads have data)</li>
                  <li>Historical comparison charts</li>
                </ul>
              </div>
              <div className="its-feature-card">
                <h3>Predictive Incident Detection</h3>
                <p>ML-based risk scoring. Pre-positions resources before incidents occur. Learns from historical patterns.</p>
                <ul style={{ color: '#7a8a9e', fontSize: '0.8rem', marginTop: '0.75rem', paddingLeft: '1rem', listStyle: 'disc', lineHeight: '1.8' }}>
                  <li>Probability gauge per prediction (0-100%)</li>
                  <li>Contributing factors breakdown</li>
                  <li>Pre-positioning recommendations for Road Rangers</li>
                  <li>Model accuracy tracking (precision, recall, F1)</li>
                  <li>Live weather feeds into risk scoring</li>
                </ul>
              </div>
              <div className="its-feature-card">
                <h3>Computer Vision</h3>
                <p>7 detection types on camera feeds. Escalation rules for automatic operator notification. Works on existing CCTV infrastructure.</p>
                <ul style={{ color: '#7a8a9e', fontSize: '0.8rem', marginTop: '0.75rem', paddingLeft: '1rem', listStyle: 'disc', lineHeight: '1.8' }}>
                  <li>Wrong-way drivers, stopped vehicles, debris</li>
                  <li>Smoke/fire, queue end, pedestrians, congestion</li>
                  <li>Confidence scoring per detection</li>
                  <li>Auto-escalation rules (high confidence → create incident)</li>
                  <li>View Camera links to nearest CCTV feed</li>
                </ul>
              </div>
              <div className="its-feature-card">
                <h3>Voice-First Operations</h3>
                <p>Web Speech API integration. Microphone in the command bar. Operators speak commands instead of typing.</p>
                <ul style={{ color: '#7a8a9e', fontSize: '0.8rem', marginTop: '0.75rem', paddingLeft: '1rem', listStyle: 'disc', lineHeight: '1.8' }}>
                  <li>Click mic or use hotkey to start listening</li>
                  <li>Real-time transcript as you speak</li>
                  <li>Auto-submits to AI when speech ends</li>
                  <li>Voice confirmation for destructive actions</li>
                </ul>
              </div>
              <div className="its-feature-card">
                <h3>MCP Server (External Data)</h3>
                <p>16 external data tools connected. Unified interface for querying weather, traffic, incidents, and infrastructure data.</p>
                <ul style={{ color: '#7a8a9e', fontSize: '0.8rem', marginTop: '0.75rem', paddingLeft: '1rem', listStyle: 'disc', lineHeight: '1.8' }}>
                  <li>FDOT ArcGIS: intersections, crashes, speed limits, AADT, bridges (6 tools)</li>
                  <li>FL 511: incidents, construction, travel times, cameras (4 tools)</li>
                  <li>NWS: current weather, alerts, forecast, radar (4 tools)</li>
                  <li>WAZE: reports, jams (2 tools, mock — requires partnership)</li>
                  <li>Caching with TTL, rate limiting, source status monitoring</li>
                </ul>
              </div>
              <div className="its-feature-card">
                <h3>Mem Palace (AI Memory)</h3>
                <p>AI memory system with auto-learning. Remembers operator patterns, past incidents, and resolution strategies.</p>
                <ul style={{ color: '#7a8a9e', fontSize: '0.8rem', marginTop: '0.75rem', paddingLeft: '1rem', listStyle: 'disc', lineHeight: '1.8' }}>
                  <li>8 auto-learning action hooks (incidents, DMS, alerts, dispatches, etc.)</li>
                  <li>Semantic search for relevant memories</li>
                  <li>Decay/reinforcement system (unused memories fade)</li>
                  <li>AI consults memories before every response</li>
                  <li>Manual memory creation for institutional knowledge</li>
                </ul>
              </div>
            </div>
            </div>
            )}
          </section>

          {/* Section 3: Live Government Data */}
          <section className="its-demo-section">
            <h2
              onClick={() => setOpenSections(s => ({ ...s, liveData: !s.liveData }))}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              Connected to Real Florida DOT Data
              <span style={{ fontSize: '0.8rem', color: '#7a8a9e' }}>{openSections.liveData ? '▼' : '▶'}</span>
            </h2>
            {openSections.liveData && (
            <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
              <div style={{ background: '#0d1b2a', border: '1px solid #1e2d3d', borderRadius: '12px', padding: '1.5rem' }}>
                <h3 style={{ color: '#14b8a6', marginBottom: '0.5rem', fontSize: '1rem' }}>NWS Weather API</h3>
                <p style={{ color: '#7a8a9e', fontSize: '0.9rem', lineHeight: '1.5' }}>Real Tampa conditions displayed on the map. Feeds DMS message suggestions and predictive incident models.</p>
              </div>
              <div style={{ background: '#0d1b2a', border: '1px solid #1e2d3d', borderRadius: '12px', padding: '1.5rem' }}>
                <h3 style={{ color: '#14b8a6', marginBottom: '0.5rem', fontSize: '1rem' }}>FL 511</h3>
                <p style={{ color: '#7a8a9e', fontSize: '0.9rem', lineHeight: '1.5' }}>Auto-ingesting live incidents every 60 seconds into the database. Real-time situational awareness.</p>
              </div>
              <div style={{ background: '#0d1b2a', border: '1px solid #1e2d3d', borderRadius: '12px', padding: '1.5rem' }}>
                <h3 style={{ color: '#14b8a6', marginBottom: '0.5rem', fontSize: '1rem' }}>FDOT ArcGIS</h3>
                <p style={{ color: '#7a8a9e', fontSize: '0.9rem', lineHeight: '1.5' }}>Real crash data (5,309 crashes on I-275), speed limits, AADT volumes, bridges, and intersections queried by ROADWAY_ID.</p>
              </div>
            </div>
            <p style={{ color: '#7a8a9e', fontSize: '0.85rem', marginTop: '1rem', fontStyle: 'italic' }}>WAZE requires a data exchange partnership agreement — left as mock.</p>
            </div>
            )}
          </section>

          {/* Section 4: Signal vs SunGuide */}
          <section className="its-demo-section">
            <h2
              onClick={() => setOpenSections(s => ({ ...s, comparison: !s.comparison }))}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              Why Signal Replaces a $36M Government System
              <span style={{ fontSize: '0.8rem', color: '#7a8a9e' }}>{openSections.comparison ? '▼' : '▶'}</span>
            </h2>
            {openSections.comparison && (
            <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
              {[
                { label: 'Architecture', sunguide: 'WPF desktop (2003)', signal: 'Electron (modern)' },
                { label: 'AI', sunguide: 'None', signal: 'GPT + 20 tools + voice + predictive' },
                { label: 'Learning', sunguide: 'Static rules', signal: 'Mem Palace (learns from every action)' },
                { label: 'Map', sunguide: 'Bolted on in 2017', signal: 'Map-centric from day one' },
                { label: 'Updates', sunguide: 'Every 3-5 years via SwRI', signal: 'Continuous deployment' },
                { label: 'Queue Detection', sunguide: 'Threshold only', signal: 'Live algorithm + auto-DMS' },
                { label: 'Weather', sunguide: 'Manual', signal: 'Live NWS integrated everywhere' },
                { label: 'Deployment', sunguide: 'Months of install', signal: 'Docker, runs in hours' },
                { label: 'Annual Cost/District', sunguide: '~$6.3M', signal: '$250K–400K' },
              ].map((row) => (
                <div key={row.label} style={{ background: '#0d1b2a', border: '1px solid #1e2d3d', borderRadius: '12px', padding: '1.5rem' }}>
                  <h3 style={{ color: '#e8edf3', marginBottom: '0.75rem', fontSize: '0.95rem' }}>{row.label}</h3>
                  <p style={{ color: '#7a8a9e', fontSize: '0.85rem', marginBottom: '0.25rem' }}><span style={{ color: '#ef4444' }}>SunGuide:</span> {row.sunguide}</p>
                  <p style={{ color: '#7a8a9e', fontSize: '0.85rem' }}><span style={{ color: '#14b8a6' }}>Signal:</span> {row.signal}</p>
                </div>
              ))}
            </div>
            </div>
            )}
          </section>

          {/* Section 5: Non-AI Value */}
          <section className="its-demo-section">
            <h2
              onClick={() => setOpenSections(s => ({ ...s, nonAiFeatures: !s.nonAiFeatures }))}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              12 Features SunGuide Doesn&apos;t Have — None Require AI
              <span style={{ fontSize: '0.8rem', color: '#7a8a9e' }}>{openSections.nonAiFeatures ? '▼' : '▶'}</span>
            </h2>
            {openSections.nonAiFeatures && (
            <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
              {[
                'Asset Lifecycle Management',
                'Work Zone Conflict Detection',
                'Impact Analysis (predicted vs actual delay)',
                'Calendar View for Work Zones',
                'Integrated Ticketing',
                'FHWA Performance Reporting (live computation)',
                'Queue End Warning Automation',
                'Multi-Source Incident Awareness',
                'Corridor-Level Performance Dashboards',
                'Shift Briefing (auto-generated)',
                'Contextual Audit Trail',
                'Exportable Everything (CSV, PDF, JSON)',
              ].map((feature, i) => (
                <div key={feature} style={{ background: '#0d1b2a', border: '1px solid #1e2d3d', borderRadius: '12px', padding: '1.25rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <span style={{ color: '#14b8a6', fontWeight: '700', fontSize: '1.1rem', minWidth: '24px' }}>{i + 1}.</span>
                  <span style={{ color: '#e8edf3', fontSize: '0.9rem' }}>{feature}</span>
                </div>
              ))}
            </div>
            </div>
            )}
          </section>

          {/* Section 6: Valuation & Market */}
          <section className="its-demo-section">
            <h2
              onClick={() => setOpenSections(s => ({ ...s, market: !s.market }))}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              Market Opportunity
              <span style={{ fontSize: '0.8rem', color: '#7a8a9e' }}>{openSections.market ? '▼' : '▶'}</span>
            </h2>
            {openSections.market && (
            <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
              <div style={{ background: '#0d1b2a', border: '1px solid #1e2d3d', borderRadius: '12px', padding: '1.5rem' }}>
                <p style={{ fontSize: '2rem', fontWeight: '700', color: '#14b8a6', marginBottom: '0.25rem' }}>$2–5M</p>
                <p style={{ color: '#e8edf3', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Current Valuation</p>
                <p style={{ color: '#7a8a9e', fontSize: '0.8rem' }}>Pre-revenue, working product</p>
              </div>
              <div style={{ background: '#0d1b2a', border: '1px solid #1e2d3d', borderRadius: '12px', padding: '1.5rem' }}>
                <p style={{ fontSize: '2rem', fontWeight: '700', color: '#14b8a6', marginBottom: '0.25rem' }}>$5–10M</p>
                <p style={{ color: '#e8edf3', fontSize: '0.9rem', marginBottom: '0.25rem' }}>After First Contract</p>
                <p style={{ color: '#7a8a9e', fontSize: '0.8rem' }}>Single district deployment</p>
              </div>
              <div style={{ background: '#0d1b2a', border: '1px solid #1e2d3d', borderRadius: '12px', padding: '1.5rem' }}>
                <p style={{ fontSize: '2rem', fontWeight: '700', color: '#14b8a6', marginBottom: '0.25rem' }}>$20–40M</p>
                <p style={{ color: '#e8edf3', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Multi-State Scale</p>
                <p style={{ color: '#7a8a9e', fontSize: '0.8rem' }}>3–5 state deployments</p>
              </div>
              <div style={{ background: '#0d1b2a', border: '1px solid #1e2d3d', borderRadius: '12px', padding: '1.5rem' }}>
                <p style={{ fontSize: '2rem', fontWeight: '700', color: '#14b8a6', marginBottom: '0.25rem' }}>$100M+</p>
                <p style={{ color: '#e8edf3', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Acquisition Territory</p>
                <p style={{ color: '#7a8a9e', fontSize: '0.8rem' }}>10+ state deployments</p>
              </div>
            </div>
            <p style={{ color: '#7a8a9e', fontSize: '0.85rem', marginTop: '1.25rem' }}>Target buyers at scale: <span style={{ color: '#e8edf3' }}>Parsons, AECOM, Jacobs, Iteris, Kapsch</span></p>
            <p style={{ color: '#7a8a9e', fontSize: '0.85rem', marginTop: '0.5rem', fontStyle: 'italic' }}>Every state DOT has aging ATMS software. Florida is the entry point.</p>
            </div>
            )}
          </section>

          {/* Section 7: Go-To-Market */}
          <section className="its-demo-section">
            <h2
              onClick={() => setOpenSections(s => ({ ...s, strategy: !s.strategy }))}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              Three-Phase Entry Strategy
              <span style={{ fontSize: '0.8rem', color: '#7a8a9e' }}>{openSections.strategy ? '▼' : '▶'}</span>
            </h2>
            {openSections.strategy && (
            <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
              <div style={{ background: '#0d1b2a', border: '1px solid #1e2d3d', borderRadius: '12px', padding: '1.5rem' }}>
                <p style={{ color: '#14b8a6', fontWeight: '700', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Phase 1</p>
                <h3 style={{ color: '#e8edf3', marginBottom: '0.5rem', fontSize: '1rem' }}>AI Operations Assistant</h3>
                <p style={{ color: '#14b8a6', fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.75rem' }}>$250–400K/yr per district</p>
                <ul style={{ color: '#7a8a9e', fontSize: '0.85rem', lineHeight: '1.7', paddingLeft: '1rem', listStyle: 'disc' }}>
                  <li>Sits alongside SunGuide, read-only</li>
                  <li>Predicts, answers questions, learns patterns</li>
                  <li>Non-threatening to existing vendor relationship</li>
                </ul>
              </div>
              <div style={{ background: '#0d1b2a', border: '1px solid #1e2d3d', borderRadius: '12px', padding: '1.5rem' }}>
                <p style={{ color: '#14b8a6', fontWeight: '700', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Phase 2</p>
                <h3 style={{ color: '#e8edf3', marginBottom: '0.5rem', fontSize: '1rem' }}>Expand Control</h3>
                <p style={{ color: '#14b8a6', fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.75rem' }}>$500–800K/yr per district</p>
                <ul style={{ color: '#7a8a9e', fontSize: '0.85rem', lineHeight: '1.7', paddingLeft: '1rem', listStyle: 'disc' }}>
                  <li>Operators pull for write access</li>
                  <li>Signal absorbs DMS posting, dispatch, alerts</li>
                  <li>SunGuide becomes protocol layer only</li>
                </ul>
              </div>
              <div style={{ background: '#0d1b2a', border: '1px solid #1e2d3d', borderRadius: '12px', padding: '1.5rem' }}>
                <p style={{ color: '#14b8a6', fontWeight: '700', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Phase 3</p>
                <h3 style={{ color: '#e8edf3', marginBottom: '0.5rem', fontSize: '1rem' }}>Full Replacement</h3>
                <p style={{ color: '#14b8a6', fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.75rem' }}>$750K–1.2M/yr per district</p>
                <ul style={{ color: '#7a8a9e', fontSize: '0.85rem', lineHeight: '1.7', paddingLeft: '1rem', listStyle: 'disc' }}>
                  <li>NTCIP drivers built, fully certified</li>
                  <li>Multi-district deployment</li>
                  <li>7 districts × $1M = $7M ARR Florida alone</li>
                </ul>
              </div>
            </div>
            </div>
            )}
          </section>

          {/* Section 8: Install & Run */}
          {/* Section 9: Modular Pricing (Hypothetical) */}
          <section className="its-demo-section">
            <h2
              onClick={() => setOpenSections(s => ({ ...s, pricing: !s.pricing }))}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              Modular Pricing Structure
              <span style={{ fontSize: '0.8rem', color: '#7a8a9e' }}>{openSections.pricing ? '▼' : '▶'}</span>
            </h2>
            {openSections.pricing && (
            <div>
            <p style={{ color: '#7a8a9e', fontSize: '0.9rem', marginBottom: '0.5rem', fontStyle: 'italic' }}>Hypothetical — for internal discussion only. Not a published price list.</p>
            <p style={{ color: '#7a8a9e', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Signal is modular. Customers pick the capabilities they need. Each module is a line item on a proposal. Pricing scales by deployment size (device count, operator seats, integrations required).</p>

            {/* Interactive Total Calculator */}
            <div style={{ background: '#0d1b2a', border: '2px solid #14b8a6', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#e8edf3', fontSize: '0.9rem', margin: 0 }}>{selectedModules.length} modules selected</p>
                <p style={{ color: '#7a8a9e', fontSize: '0.8rem', margin: 0 }}>Click modules below to add/remove</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ color: '#14b8a6', fontSize: '1.5rem', fontWeight: '700', margin: 0 }}>${MODULE_DATA.filter(m => selectedModules.includes(m.id)).reduce((sum, m) => sum + m.price_low, 0).toLocaleString()}–${MODULE_DATA.filter(m => selectedModules.includes(m.id)).reduce((sum, m) => sum + m.price_high, 0).toLocaleString()}/yr</p>
                <p style={{ color: '#7a8a9e', fontSize: '0.8rem', margin: 0 }}>estimated range</p>
              </div>
            </div>

            <h3 style={{ color: '#14b8a6', marginBottom: '1rem', fontSize: '1rem' }}>Core Modules</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { id: 'core', name: 'Core Platform', price: '$30,000–60,000/yr', desc: 'Auth, audit logging, workspace layout, database, Docker deployment. The foundation everything else plugs into.' },
                { id: 'ai', name: 'AI Operations Assistant', price: '$18,000–36,000/yr', desc: 'GPT-powered command bar, voice input, 20+ function-calling tools, natural language operations.' },
                { id: 'mempalace', name: 'Mem Palace (AI Memory)', price: '$9,600–18,000/yr', desc: 'Auto-learning from operator actions. Remembers patterns, resolutions, preferences. Gets smarter over time.' },
                { id: 'map', name: 'Device Network Map', price: '$14,400–30,000/yr', desc: 'GIS or floor plan with device pins, clustering, layer toggles, fly-to navigation, real-time status overlay.' },
                { id: 'devices', name: 'Device Management & Categorization', price: '$9,600–18,000/yr', desc: 'Device inventory, filtering, search, area labels, metadata, bulk operations.' },
                { id: 'access', name: 'Role-Based Access Control', price: '$6,000–12,000/yr', desc: 'User roles, permissions per device type, operator vs supervisor vs admin access levels.' },
              ].map((mod) => (
                <div
                  key={mod.name}
                  onClick={() => { if (mod.id === 'core') return; setSelectedModules(s => s.includes(mod.id) ? s.filter(x => x !== mod.id) : [...s, mod.id]) }}
                  style={{ background: '#0d1b2a', border: selectedModules.includes(mod.id) ? '2px solid #14b8a6' : '1px solid #1e2d3d', borderRadius: '12px', padding: '1.25rem', cursor: mod.id === 'core' ? 'default' : 'pointer', transition: 'border 0.2s' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <h4 style={{ color: '#e8edf3', fontSize: '0.95rem', margin: 0 }}>
                      {mod.name}
                      {mod.id === 'core' && <span style={{ marginLeft: '0.5rem', fontSize: '0.7rem', background: '#14b8a6', color: '#0a0f1a', padding: '2px 6px', borderRadius: '4px', fontWeight: '600' }}>Required</span>}
                    </h4>
                    <span style={{ color: '#14b8a6', fontSize: '0.8rem', fontWeight: '600', whiteSpace: 'nowrap', marginLeft: '1rem' }}>{mod.price}</span>
                  </div>
                  <p style={{ color: '#7a8a9e', fontSize: '0.8rem', lineHeight: '1.5', margin: 0 }}>{mod.desc}</p>
                </div>
              ))}
            </div>

            <h3 style={{ color: '#14b8a6', marginBottom: '1rem', fontSize: '1rem' }}>Operations Modules</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { id: 'video', name: 'Video Wall & Camera Management', price: '$18,000–36,000/yr', desc: 'HLS playback, PTZ controls, multi-grid layouts, gamepad/Stream Deck support, camera grouping by area.' },
                { id: 'incidents', name: 'Incident Management', price: '$14,400–30,000/yr', desc: 'Create, verify, dispatch, close. Status workflow, timeline, associated devices, DMS suggestions.' },
                { id: 'alerts', name: 'Alert Automation', price: '$9,600–18,000/yr', desc: 'AMBER/SILVER/LEO or custom alert types. One-click activation, auto-device selection by radius, auto-clear timers.' },
                { id: 'dms', name: 'DMS / Sign Control', price: '$12,000–24,000/yr', desc: 'Message composer, character limits, preview, scheduling, message library, weather-aware suggestions.' },
                { id: 'dispatch', name: 'Dispatch & Fleet Tracking', price: '$12,000–24,000/yr', desc: 'Vehicle positions on map, dispatch workflow, response time tracking, service reports.' },
                { id: 'ticketing', name: 'Ticketing & Maintenance', price: '$7,200–14,400/yr', desc: 'Issue creation, assignment, vendor forwarding, resolution tracking. Table and Kanban views.' },
              ].map((mod) => (
                <div
                  key={mod.name}
                  onClick={() => setSelectedModules(s => s.includes(mod.id) ? s.filter(x => x !== mod.id) : [...s, mod.id])}
                  style={{ background: '#0d1b2a', border: selectedModules.includes(mod.id) ? '2px solid #14b8a6' : '1px solid #1e2d3d', borderRadius: '12px', padding: '1.25rem', cursor: 'pointer', transition: 'border 0.2s' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <h4 style={{ color: '#e8edf3', fontSize: '0.95rem', margin: 0 }}>{mod.name}</h4>
                    <span style={{ color: '#14b8a6', fontSize: '0.8rem', fontWeight: '600', whiteSpace: 'nowrap', marginLeft: '1rem' }}>{mod.price}</span>
                  </div>
                  <p style={{ color: '#7a8a9e', fontSize: '0.8rem', lineHeight: '1.5', margin: 0 }}>{mod.desc}</p>
                </div>
              ))}
            </div>

            <h3 style={{ color: '#14b8a6', marginBottom: '1rem', fontSize: '1rem' }}>Intelligence Modules</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { id: 'vision', name: 'Computer Vision (Camera AI)', price: '$24,000–48,000/yr', desc: '7 detection types: wrong-way, stopped vehicle, debris, smoke/fire, queue, pedestrian, congestion. Confidence scoring, escalation rules.' },
                { id: 'predictive', name: 'Predictive Analytics', price: '$18,000–36,000/yr', desc: 'ML-scored risk predictions. Feature importance, pre-positioning recommendations, accuracy tracking.' },
                { id: 'queue', name: 'Queue Detection Engine', price: '$12,000–24,000/yr', desc: 'Real-time speed differential analysis across detector stations. Auto-DMS upstream warnings. Growth tracking.' },
                { id: 'probe', name: 'Probe Data Integration', price: '$12,000–24,000/yr', desc: 'INRIX/HERE speed feeds. Travel time computation, anomaly detection, coverage mapping.' },
                { id: 'mcp', name: 'External Data Sources (MCP)', price: '$9,600–18,000/yr', desc: 'Connectors to government APIs (weather, DOT GIS, 511, WAZE). Caching, rate limiting, AI-queryable.' },
              ].map((mod) => (
                <div
                  key={mod.name}
                  onClick={() => setSelectedModules(s => s.includes(mod.id) ? s.filter(x => x !== mod.id) : [...s, mod.id])}
                  style={{ background: '#0d1b2a', border: selectedModules.includes(mod.id) ? '2px solid #14b8a6' : '1px solid #1e2d3d', borderRadius: '12px', padding: '1.25rem', cursor: 'pointer', transition: 'border 0.2s' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <h4 style={{ color: '#e8edf3', fontSize: '0.95rem', margin: 0 }}>{mod.name}</h4>
                    <span style={{ color: '#14b8a6', fontSize: '0.8rem', fontWeight: '600', whiteSpace: 'nowrap', marginLeft: '1rem' }}>{mod.price}</span>
                  </div>
                  <p style={{ color: '#7a8a9e', fontSize: '0.8rem', lineHeight: '1.5', margin: 0 }}>{mod.desc}</p>
                </div>
              ))}
            </div>

            <h3 style={{ color: '#14b8a6', marginBottom: '1rem', fontSize: '1rem' }}>Compliance & Reporting Modules</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { id: 'performance', name: 'Performance Reporting (FHWA)', price: '$9,600–18,000/yr', desc: 'LOTTR, TTRI, PHED metrics. Corridor breakdown, benchmarking, PDF export, federal submission format.' },
                { id: 'assets', name: 'Asset Lifecycle Management', price: '$9,600–18,000/yr', desc: 'Health scores, warranty tracking, maintenance scheduling, capital planning, cost-per-device.' },
                { id: 'workzones', name: 'Work Zone Management', price: '$7,200–14,400/yr', desc: 'Calendar view, conflict detection, auto-DMS, impact analysis (predicted vs actual delay).' },
                { id: 'vsl', name: 'Variable Speed Limit Control', price: '$9,600–18,000/yr', desc: 'Algorithm-driven reductions, compliance monitoring, weather triggers, progressive reduction logic.' },
              ].map((mod) => (
                <div
                  key={mod.name}
                  onClick={() => setSelectedModules(s => s.includes(mod.id) ? s.filter(x => x !== mod.id) : [...s, mod.id])}
                  style={{ background: '#0d1b2a', border: selectedModules.includes(mod.id) ? '2px solid #14b8a6' : '1px solid #1e2d3d', borderRadius: '12px', padding: '1.25rem', cursor: 'pointer', transition: 'border 0.2s' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <h4 style={{ color: '#e8edf3', fontSize: '0.95rem', margin: 0 }}>{mod.name}</h4>
                    <span style={{ color: '#14b8a6', fontSize: '0.8rem', fontWeight: '600', whiteSpace: 'nowrap', marginLeft: '1rem' }}>{mod.price}</span>
                  </div>
                  <p style={{ color: '#7a8a9e', fontSize: '0.8rem', lineHeight: '1.5', margin: 0 }}>{mod.desc}</p>
                </div>
              ))}
            </div>

            <h3 style={{ color: '#14b8a6', marginBottom: '1rem', fontSize: '1rem' }}>Example Bundles</h3>
            <p style={{ color: '#7a8a9e', fontSize: '0.8rem', marginBottom: '1rem' }}>Click a bundle to auto-select its modules above.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div
                onClick={() => setSelectedModules(['core', 'video', 'incidents', 'ai', 'map', 'ticketing'])}
                style={{ background: '#0d1b2a', border: '1px solid #1e2d3d', borderRadius: '12px', padding: '1.5rem', cursor: 'pointer', transition: 'border 0.2s' }}
              >
                <h4 style={{ color: '#14b8a6', marginBottom: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Small Police / Security Ops</h4>
                <p style={{ color: '#e8edf3', fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.75rem' }}>~$96,000–144,000/yr</p>
                <ul style={{ color: '#7a8a9e', fontSize: '0.8rem', lineHeight: '1.8', paddingLeft: '1rem', listStyle: 'disc' }}>
                  <li>Core Platform</li>
                  <li>Video Wall & Cameras</li>
                  <li>Incident Management</li>
                  <li>AI Assistant</li>
                  <li>Device Map</li>
                  <li>Ticketing</li>
                </ul>
              </div>
              <div
                onClick={() => setSelectedModules(['core', 'map', 'alerts', 'ticketing', 'assets', 'access'])}
                style={{ background: '#0d1b2a', border: '1px solid #1e2d3d', borderRadius: '12px', padding: '1.5rem', cursor: 'pointer', transition: 'border 0.2s' }}
              >
                <h4 style={{ color: '#14b8a6', marginBottom: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Building / Facility Management</h4>
                <p style={{ color: '#e8edf3', fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.75rem' }}>~$72,000–120,000/yr</p>
                <ul style={{ color: '#7a8a9e', fontSize: '0.8rem', lineHeight: '1.8', paddingLeft: '1rem', listStyle: 'disc' }}>
                  <li>Core Platform</li>
                  <li>Device Map (floor plans)</li>
                  <li>Alert Automation</li>
                  <li>Ticketing & Maintenance</li>
                  <li>Asset Lifecycle</li>
                  <li>Access Control</li>
                </ul>
              </div>
              <div
                onClick={() => setSelectedModules(MODULE_DATA.map(m => m.id))}
                style={{ background: '#0d1b2a', border: '1px solid #1e2d3d', borderRadius: '12px', padding: '1.5rem', cursor: 'pointer', transition: 'border 0.2s' }}
              >
                <h4 style={{ color: '#14b8a6', marginBottom: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Full ATMS (State DOT)</h4>
                <p style={{ color: '#e8edf3', fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.75rem' }}>~$240,000–420,000/yr</p>
                <ul style={{ color: '#7a8a9e', fontSize: '0.8rem', lineHeight: '1.8', paddingLeft: '1rem', listStyle: 'disc' }}>
                  <li>All modules included</li>
                  <li>Custom integrations (NTCIP, CAD, C2C)</li>
                  <li>On-prem deployment option</li>
                  <li>Dedicated support</li>
                  <li>Training & certification</li>
                </ul>
              </div>
            </div>

            <p style={{ color: '#7a8a9e', fontSize: '0.8rem', marginTop: '1rem' }}>
              <strong style={{ color: '#e8edf3' }}>Adjacent markets:</strong> The same architecture serves local police ops, campus security, warehouse logistics, building management (HVAC/fire/access), and any operation with a network of physical devices that needs unified monitoring, AI assistance, and incident response workflows.
            </p>
            </div>
            )}
          </section>


          <section className="its-demo-section">
            <h2
              onClick={() => setOpenSections(s => ({ ...s, install: !s.install }))}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              Try It
              <span style={{ fontSize: '0.8rem', color: '#7a8a9e' }}>{openSections.install ? '▼' : '▶'}</span>
            </h2>
            {openSections.install && (
            <div>
            <p style={{ color: '#7a8a9e', marginBottom: '1.5rem' }}>Signal runs as a desktop app with Docker handling the database and backend services. Here&apos;s how to get it running on your machine.</p>
            
            <div style={{ background: '#0d1b2a', border: '1px solid #1e2d3d', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
              <h3 style={{ color: '#e8edf3', marginBottom: '1rem', fontSize: '1rem' }}>Prerequisites</h3>
              <ul style={{ color: '#7a8a9e', fontSize: '0.9rem', lineHeight: '2', paddingLeft: '1.25rem', listStyle: 'disc' }}>
                <li><a href="https://www.docker.com/products/docker-desktop/" style={{ color: '#14b8a6' }}>Docker Desktop</a> — handles PostgreSQL, Redis, and the server</li>
                <li><a href="https://git-scm.com/" style={{ color: '#14b8a6' }}>Git</a> — to clone the repo</li>
                <li><a href="https://nodejs.org/" style={{ color: '#14b8a6' }}>Node.js 18+</a> — only needed if running the client outside Docker</li>
              </ul>
            </div>

            <div style={{ background: '#0d1b2a', border: '1px solid #1e2d3d', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
              <h3 style={{ color: '#e8edf3', marginBottom: '1rem', fontSize: '1rem' }}>Step 1: Clone & Start</h3>
              <pre style={{ background: '#060d16', borderRadius: '8px', padding: '1rem', overflowX: 'auto', fontSize: '0.85rem', color: '#14b8a6', lineHeight: '1.8' }}>{`git clone https://github.com/hiro-labs-dev/signal.git
cd signal
docker compose up -d`}</pre>
              <p style={{ color: '#7a8a9e', fontSize: '0.8rem', marginTop: '0.75rem' }}>This starts PostgreSQL (with 2,025 seeded devices), Redis, the API server, and the web client. Takes about 60 seconds on first run.</p>
            </div>

            <div style={{ background: '#0d1b2a', border: '1px solid #1e2d3d', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
              <h3 style={{ color: '#e8edf3', marginBottom: '1rem', fontSize: '1rem' }}>Step 2: Open Signal</h3>
              <pre style={{ background: '#060d16', borderRadius: '8px', padding: '1rem', overflowX: 'auto', fontSize: '0.85rem', color: '#14b8a6', lineHeight: '1.8' }}>{`Open http://localhost:5173 in your browser

Login: admin / password123`}</pre>
              <p style={{ color: '#7a8a9e', fontSize: '0.8rem', marginTop: '0.75rem' }}>You'll see the map with live weather, highway traffic, and incident markers. Use the sidebar to navigate between modules.</p>
            </div>

            <div style={{ background: '#0d1b2a', border: '1px solid #1e2d3d', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
              <h3 style={{ color: '#e8edf3', marginBottom: '1rem', fontSize: '1rem' }}>Step 3: Try the AI</h3>
              <pre style={{ background: '#060d16', borderRadius: '8px', padding: '1rem', overflowX: 'auto', fontSize: '0.85rem', color: '#14b8a6', lineHeight: '1.8' }}>{`Press Cmd+K (Mac) or Ctrl+K (Windows)

Try: "What's the weather in Tampa?"
Try: "How many crashes on I-275?"
Try: "Show me traffic on I-4"`}</pre>
              <p style={{ color: '#7a8a9e', fontSize: '0.8rem', marginTop: '0.75rem' }}>The AI queries live NWS and FDOT data. Requires an OpenAI API key in apps/server/.env (OPENAI_API_KEY).</p>
            </div>

            <div style={{ background: '#0d1b2a', border: '1px solid #1e2d3d', borderRadius: '12px', padding: '1.5rem' }}>
              <h3 style={{ color: '#e8edf3', marginBottom: '1rem', fontSize: '1rem' }}>What's Running</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.5rem 1.5rem', fontSize: '0.85rem' }}>
                <span style={{ color: '#14b8a6', fontFamily: 'monospace' }}>:5173</span><span style={{ color: '#7a8a9e' }}>Client (web interface)</span>
                <span style={{ color: '#14b8a6', fontFamily: 'monospace' }}>:3001</span><span style={{ color: '#7a8a9e' }}>API Server (Fastify, 21 modules)</span>
                <span style={{ color: '#14b8a6', fontFamily: 'monospace' }}>:5433</span><span style={{ color: '#7a8a9e' }}>PostgreSQL (2,025 devices, incidents, DMS)</span>
                <span style={{ color: '#14b8a6', fontFamily: 'monospace' }}>:6379</span><span style={{ color: '#7a8a9e' }}>Redis (caching, queue)</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
              <a href="https://hiro-labs.dev/downloads/Signal-0.1.0-mac.dmg" style={{ display: 'inline-block', padding: '12px 24px', background: '#14b8a6', color: '#0a0f1a', borderRadius: '8px', fontWeight: '600', fontSize: '0.9rem', textDecoration: 'none' }}>Download for macOS (117 MB)</a>
              <a href="https://hiro-labs.dev/downloads/Signal-0.1.0-Setup.exe" style={{ display: 'inline-block', padding: '12px 24px', background: '#14b8a6', color: '#0a0f1a', borderRadius: '8px', fontWeight: '600', fontSize: '0.9rem', textDecoration: 'none' }}>Download for Windows (88 MB)</a>
              <a href="https://github.com/hiro-labs-dev/signal" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '12px 24px', background: 'transparent', color: '#14b8a6', border: '1px solid #14b8a6', borderRadius: '8px', fontWeight: '600', fontSize: '0.9rem', textDecoration: 'none' }}>View on GitHub</a>
            </div>
            </div>
            )}
          </section>
          {/* Section 10: Tech Stack */}
          <section className="its-demo-section">
            <h2
              onClick={() => setOpenSections(s => ({ ...s, tech: !s.tech }))}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              Technical Summary
              <span style={{ fontSize: '0.8rem', color: '#7a8a9e' }}>{openSections.tech ? '▼' : '▶'}</span>
            </h2>
            {openSections.tech && (
              <div>
                <p className="its-tech-stack">TypeScript • Electron • React • Fastify • PostgreSQL • Redis • MapLibre GL • GPT-5.4 mini • Docker • FDOT ArcGIS • NWS API • FL 511</p>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  )
}
