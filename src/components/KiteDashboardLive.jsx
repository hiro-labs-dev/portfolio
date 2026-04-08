import { useState, useEffect } from 'react'

const c = {
  bg: '#071013',
  surface: 'rgba(255,255,255,0.04)',
  border: '#1B2A31',
  primary: '#23B5D3',
  secondary: '#75ABBC',
  text: '#DFE0E2',
  muted: '#A2AEBB',
  green: '#4ade80',
  accent: '#f0b97a',
  destructive: '#FF4D4F',
}
const heading = "'Space Grotesk', system-ui, sans-serif"
const sans = "'Inter', system-ui, sans-serif"

const KITE_LOGO = '/products/kite-logo.svg'

const navItems = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'inspections', label: 'Inspections', group: 'Workspace' },
  { id: 'clients', label: 'Clients' },
  { id: 'calendar', label: 'Calendar' },
  { id: 'templates', label: 'Templates', group: 'Content' },
  { id: 'media', label: 'Media' },
  { id: 'reports', label: 'Reports' },
  { id: 'ai', label: 'AI Assess', group: 'Manage' },
  { id: 'settings', label: 'Settings' },
]

function Badge({ label, color }) {
  return (
    <span style={{
      padding: '2px 8px', borderRadius: 9999, fontSize: 10, fontWeight: 500,
      background: `${color}15`, color,
    }}>{label}</span>
  )
}

function StatCard({ label, value, color, borderColor, delay, mounted }) {
  return (
    <div style={{
      padding: '10px 12px', borderRadius: 8,
      background: `${color}10`, border: `1px solid ${borderColor}`,
      opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(8px)',
      transition: `opacity 0.3s ${delay}s, transform 0.3s ${delay}s`,
    }}>
      <div style={{ fontSize: 10, color: c.muted }}>{label}</div>
      <div style={{ fontFamily: heading, fontSize: 20, fontWeight: 600, color, marginTop: 2 }}>{value}</div>
    </div>
  )
}

function DashboardView({ mounted }) {
  const inspections = [
    { name: '2024 Airstream Flying Cloud', id: '...a4f821', status: 'In Progress', color: c.primary },
    { name: '2023 Winnebago View 24D', id: '...c7e903', status: 'Published', color: c.green },
    { name: '2022 Thor Palazzo 33.5', id: '...b2d445', status: 'Draft', color: c.muted },
    { name: '2024 Tiffin Allegro RED', id: '...f1a267', status: 'Paid', color: c.green },
    { name: '2023 Newmar Bay Star 3226', id: '...d9c118', status: 'In Progress', color: c.primary },
  ]
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontFamily: heading, fontSize: 17, fontWeight: 600, color: c.text }}>Good Afternoon, Roddy</div>
          <div style={{ fontSize: 11, color: c.muted, marginTop: 2 }}>Wednesday, April 8</div>
        </div>
        <Btn label="+ New Inspection" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        <StatCard label="Total Inspections" value={24} color={c.primary} borderColor="rgba(35,181,211,0.2)" delay={0} mounted={mounted} />
        <StatCard label="In Progress" value={3} color={c.secondary} borderColor="rgba(117,171,188,0.2)" delay={0.08} mounted={mounted} />
        <StatCard label="Published" value={18} color={c.green} borderColor="rgba(74,222,128,0.2)" delay={0.16} mounted={mounted} />
        <StatCard label="Clients" value={12} color={c.accent} borderColor="rgba(240,185,122,0.2)" delay={0.24} mounted={mounted} />
      </div>
      <ListPanel title="Recent Inspections" trailing="View all →">
        {inspections.map((insp, i) => (
          <Row key={i} left={insp.name} sub={insp.id} right={<Badge label={insp.status} color={insp.color} />} mounted={mounted} delay={0.15 + i * 0.06} />
        ))}
      </ListPanel>
    </>
  )
}

function InspectionsView({ mounted }) {
  const rows = [
    { loc: 'Austin, TX - Flying Cloud', id: '...a4f821', date: 'Apr 5, 2026', status: 'In Progress', color: c.primary },
    { loc: 'Tampa, FL - Winnebago View', id: '...c7e903', date: 'Apr 3, 2026', status: 'Published', color: c.green },
    { loc: 'Denver, CO - Thor Palazzo', id: '...b2d445', date: 'Apr 1, 2026', status: 'Draft', color: c.muted },
    { loc: 'Miami, FL - Allegro RED', id: '...f1a267', date: 'Mar 28, 2026', status: 'Paid', color: c.green },
    { loc: 'Orlando, FL - Bay Star', id: '...d9c118', date: 'Mar 25, 2026', status: 'In Progress', color: c.primary },
    { loc: 'Nashville, TN - Entegra', id: '...e3b990', date: 'Mar 22, 2026', status: 'Published', color: c.green },
  ]
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontFamily: heading, fontSize: 17, fontWeight: 600, color: c.text }}>Inspections</div>
          <div style={{ fontSize: 11, color: c.muted, marginTop: 2 }}>Create jobs, capture findings, and publish reports.</div>
        </div>
        <Btn label="New Inspection" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        <StatCard label="Total" value={24} color={c.primary} borderColor="rgba(35,181,211,0.2)" delay={0} mounted={mounted} />
        <StatCard label="In Progress" value={3} color={c.secondary} borderColor="rgba(117,171,188,0.2)" delay={0.06} mounted={mounted} />
        <StatCard label="Ready" value={3} color={c.accent} borderColor="rgba(240,185,122,0.2)" delay={0.12} mounted={mounted} />
        <StatCard label="Published" value={18} color={c.green} borderColor="rgba(74,222,128,0.2)" delay={0.18} mounted={mounted} />
      </div>
      <ListPanel title="" trailing={<FilterBar />}>
        {rows.map((r, i) => (
          <Row key={i} left={r.loc} sub={`${r.id} · ${r.date}`} right={<Badge label={r.status} color={r.color} />} mounted={mounted} delay={0.1 + i * 0.05} />
        ))}
      </ListPanel>
    </>
  )
}

function ClientsView({ mounted }) {
  const clients = [
    { name: 'Marcus Johnson', email: 'marcus@email.com', rvs: 2, inspections: 5 },
    { name: 'Sarah Chen', email: 'sarah.chen@email.com', rvs: 1, inspections: 3 },
    { name: 'David Park', email: 'dpark@email.com', rvs: 3, inspections: 8 },
    { name: 'Lisa Rodriguez', email: 'lisa.r@email.com', rvs: 1, inspections: 2 },
    { name: 'James Wilson', email: 'jwilson@email.com', rvs: 2, inspections: 6 },
  ]
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontFamily: heading, fontSize: 17, fontWeight: 600, color: c.text }}>Client Directory</div>
          <div style={{ fontSize: 11, color: c.muted, marginTop: 2 }}>Manage clients, RVs, and inspection history.</div>
        </div>
        <Btn label="New Client" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        <StatCard label="Total Clients" value={12} color={c.primary} borderColor="rgba(35,181,211,0.2)" delay={0} mounted={mounted} />
        <StatCard label="With RVs" value={9} color={c.secondary} borderColor="rgba(117,171,188,0.2)" delay={0.06} mounted={mounted} />
        <StatCard label="With Inspections" value={8} color={c.green} borderColor="rgba(74,222,128,0.2)" delay={0.12} mounted={mounted} />
      </div>
      <ListPanel title="" trailing={<SearchBar placeholder="Search by name, email..." />}>
        {clients.map((cl, i) => (
          <Row key={i} left={cl.name} sub={cl.email} right={<span style={{ fontSize: 10, color: c.muted }}>{cl.rvs} RVs · {cl.inspections} inspections</span>} mounted={mounted} delay={0.1 + i * 0.05} />
        ))}
      </ListPanel>
    </>
  )
}

function CalendarView({ mounted }) {
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
  const cells = [null,null,null, ...Array.from({length:30},(_,i)=>i+1)]
  const booked = [5,8,12,15,22,28]
  return (
    <>
      <div><div style={{ fontFamily: heading, fontSize: 17, fontWeight: 600, color: c.text }}>Schedule</div>
        <div style={{ fontSize: 11, color: c.muted, marginTop: 2 }}>Upcoming inspections</div></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px', gap: 12 }}>
        <ListPanel title="Upcoming">
          {[{ cl: 'Marcus Johnson', loc: 'Austin, TX', date: 'Apr 12' },{ cl: 'Sarah Chen', loc: 'Tampa, FL', date: 'Apr 15' },{ cl: 'David Park', loc: 'Denver, CO', date: 'Apr 22' }].map((b,i) => (
            <Row key={i} left={b.cl} sub={`${b.loc} · ${b.date}`} right={<Badge label="Confirmed" color={c.primary} />} mounted={mounted} delay={0.1+i*0.05} />
          ))}
        </ListPanel>
        <div style={{ borderRadius: 8, border: `1px solid ${c.border}`, background: c.surface, padding: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: c.text, textAlign: 'center', marginBottom: 8, fontFamily: heading }}>April 2026</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 2, textAlign: 'center' }}>
            {days.map(d => <div key={d} style={{ fontSize: 8, color: c.muted }}>{d}</div>)}
            {cells.map((day,i) => (
              <div key={i} style={{ fontSize: 9, color: day === 8 ? c.primary : c.text, padding: 2, borderRadius: 4, background: day === 8 ? 'rgba(35,181,211,0.1)' : 'transparent', position: 'relative' }}>
                {day}
                {day && booked.includes(day) && <div style={{ position:'absolute',bottom:0,left:'50%',transform:'translateX(-50%)',width:3,height:3,borderRadius:'50%',background:c.primary }} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

function TemplatesView({ mounted }) {
  const templates = [
    { name: 'Full RV Inspection', sections: 18, items: 142, default: true },
    { name: 'Pre-Purchase Quick Check', sections: 8, items: 64, default: false },
    { name: 'Roof & Exterior Only', sections: 4, items: 38, default: false },
  ]
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div><div style={{ fontFamily: heading, fontSize: 17, fontWeight: 600, color: c.text }}>Templates</div>
          <div style={{ fontSize: 11, color: c.muted, marginTop: 2 }}>Inspection checklists and section layouts.</div></div>
        <Btn label="New Template" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {templates.map((t,i) => (
          <div key={i} style={{ borderRadius: 8, border: `1px solid ${c.border}`, background: c.surface, padding: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(6px)', transition: `opacity 0.3s ${i*0.08}s, transform 0.3s ${i*0.08}s` }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: c.text, display: 'flex', alignItems: 'center', gap: 8 }}>{t.name} {t.default && <Badge label="Default" color={c.primary} />}</div>
              <div style={{ fontSize: 10, color: c.muted, marginTop: 4 }}>{t.sections} sections · {t.items} items</div>
            </div>
            <span style={{ fontSize: 10, color: c.muted }}>Edit →</span>
          </div>
        ))}
      </div>
    </>
  )
}

function MediaView({ mounted }) {
  const files = Array.from({length:8},(_,i) => ({ name: `IMG_${1000+i}.jpg`, size: `${(1.2+i*0.3).toFixed(1)} MB` }))
  return (
    <>
      <div><div style={{ fontFamily: heading, fontSize: 17, fontWeight: 600, color: c.text }}>Media Library</div>
        <div style={{ fontSize: 11, color: c.muted, marginTop: 2 }}>{files.length} files</div></div>
      <SearchBar placeholder="Search by filename..." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
        {files.map((f,i) => (
          <div key={i} style={{ borderRadius: 6, border: `1px solid ${c.border}`, overflow: 'hidden',
            opacity: mounted ? 1 : 0, transition: `opacity 0.3s ${i*0.04}s` }}>
            <div style={{ height: 50, background: `hsl(${190+i*8},30%,${12+i}%)` }} />
            <div style={{ padding: '6px 8px' }}>
              <div style={{ fontSize: 10, color: c.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.name}</div>
              <div style={{ fontSize: 9, color: c.muted }}>{f.size}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

function ReportsView({ mounted }) {
  const reports = [
    { client: 'Marcus Johnson', loc: 'Austin, TX', status: 'Published', color: c.green },
    { client: 'Sarah Chen', loc: 'Tampa, FL', status: 'Paid', color: c.green },
    { client: 'David Park', loc: 'Denver, CO', status: 'Published', color: c.green },
  ]
  return (
    <>
      <div><div style={{ fontFamily: heading, fontSize: 17, fontWeight: 600, color: c.text }}>Reports</div>
        <div style={{ fontSize: 11, color: c.muted, marginTop: 2 }}>Published inspection reports and share links.</div></div>
      <ListPanel title="" trailing={<FilterBar />}>
        {reports.map((r,i) => (
          <Row key={i} left={r.client} sub={r.loc} right={<div style={{ display: 'flex', gap: 6, alignItems: 'center' }}><Badge label={r.status} color={r.color} /><span style={{ fontSize: 10, color: c.primary, cursor: 'default' }}>Copy link</span></div>} mounted={mounted} delay={0.1+i*0.05} />
        ))}
      </ListPanel>
    </>
  )
}

function AIView({ mounted }) {
  return (
    <>
      <div><div style={{ fontFamily: heading, fontSize: 17, fontWeight: 600, color: c.text }}>AI Damage Assessment</div>
        <div style={{ fontSize: 11, color: c.muted, marginTop: 2 }}>Upload photos for AI-powered damage analysis.</div></div>
      <div style={{ borderRadius: 8, border: `1px dashed ${c.border}`, background: c.surface, padding: 24, textAlign: 'center',
        opacity: mounted ? 1 : 0, transition: 'opacity 0.3s 0.1s' }}>
        <div style={{ fontSize: 28, color: c.muted, marginBottom: 8 }}>📷</div>
        <div style={{ fontSize: 13, fontWeight: 500, color: c.text }}>Drop photos here</div>
        <div style={{ fontSize: 11, color: c.muted, marginTop: 4 }}>Up to 5 photos. JPG, PNG, or WebP.</div>
        <div style={{ marginTop: 12 }}><Btn label="Select Photos" /></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div style={{ borderRadius: 8, border: `1px solid ${c.border}`, background: c.surface, padding: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: c.text, marginBottom: 8 }}>RV Details</div>
          {['Year','Make','Model'].map(f => (
            <div key={f} style={{ marginBottom: 6 }}>
              <div style={{ fontSize: 9, color: c.muted, marginBottom: 2 }}>{f}</div>
              <div style={{ height: 28, borderRadius: 6, border: `1px solid ${c.border}`, background: 'rgba(255,255,255,0.02)' }} />
            </div>
          ))}
        </div>
        <div style={{ borderRadius: 8, border: `1px solid ${c.border}`, background: c.surface, padding: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: c.text, marginBottom: 8 }}>Client Notes</div>
          <div style={{ height: 100, borderRadius: 6, border: `1px solid ${c.border}`, background: 'rgba(255,255,255,0.02)' }} />
        </div>
      </div>
    </>
  )
}

function SettingsView({ mounted }) {
  const items = [
    { label: 'Account', desc: 'Name, email, password' },
    { label: 'Availability', desc: 'Working hours, blocked dates' },
    { label: 'Branding', desc: 'Logo, colors, report footer' },
    { label: 'Team', desc: 'Invite members, manage roles' },
    { label: 'Billing', desc: 'Plan, payments, Stripe' },
  ]
  return (
    <>
      <div><div style={{ fontFamily: heading, fontSize: 17, fontWeight: 600, color: c.text }}>Settings</div>
        <div style={{ fontSize: 11, color: c.muted, marginTop: 2 }}>Manage your account and organization</div></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 360 }}>
        {items.map((item,i) => (
          <div key={i} style={{ borderRadius: 8, border: `1px solid ${c.border}`, background: c.surface, padding: 14, cursor: 'default',
            opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(6px)', transition: `opacity 0.3s ${i*0.06}s, transform 0.3s ${i*0.06}s` }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: c.text }}>{item.label}</div>
            <div style={{ fontSize: 10, color: c.muted, marginTop: 2 }}>{item.desc}</div>
          </div>
        ))}
      </div>
    </>
  )
}

// Shared components
function Btn({ label }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '6px 12px', borderRadius: 8,
      background: `linear-gradient(180deg, ${c.primary}, rgba(35,181,211,0.86))`,
      color: c.bg, fontSize: 11, fontWeight: 600,
      boxShadow: '0 0 0 1px rgba(35,181,211,0.35), 0 4px 10px rgba(0,0,0,0.3)',
      cursor: 'default',
    }}>{label}</div>
  )
}

function ListPanel({ title, trailing, children }) {
  return (
    <div style={{ borderRadius: 8, border: `1px solid ${c.border}`, background: c.surface, overflow: 'hidden', flex: 1 }}>
      {(title || trailing) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', borderBottom: `1px solid ${c.border}` }}>
          <span style={{ fontFamily: heading, fontSize: 11, fontWeight: 600, color: c.text }}>{title}</span>
          {typeof trailing === 'string' ? <span style={{ fontSize: 10, color: c.muted }}>{trailing}</span> : trailing}
        </div>
      )}
      <div>{children}</div>
    </div>
  )
}

function Row({ left, sub, right, mounted, delay }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '8px 12px', borderBottom: `1px solid ${c.border}`,
      opacity: mounted ? 1 : 0, transform: mounted ? 'translateX(0)' : 'translateX(-8px)',
      transition: `opacity 0.3s ${delay}s, transform 0.3s ${delay}s`,
    }}>
      <div>
        <div style={{ fontSize: 12, fontWeight: 500, color: c.text }}>{left}</div>
        <div style={{ fontSize: 10, color: c.muted }}>{sub}</div>
      </div>
      {right}
    </div>
  )
}

function SearchBar({ placeholder }) {
  return (
    <div style={{ height: 28, borderRadius: 6, border: `1px solid ${c.border}`, background: 'rgba(255,255,255,0.02)', padding: '0 10px', display: 'flex', alignItems: 'center' }}>
      <span style={{ fontSize: 11, color: c.muted }}>{placeholder}</span>
    </div>
  )
}

function FilterBar() {
  return (
    <div style={{ display: 'flex', gap: 2, background: 'rgba(255,255,255,0.02)', border: `1px solid ${c.border}`, borderRadius: 6, padding: 2 }}>
      {['All','Draft','In Progress','Published'].map((f,i) => (
        <div key={f} style={{ padding: '3px 8px', borderRadius: 4, fontSize: 9, fontWeight: 600, color: i === 0 ? c.bg : c.muted, background: i === 0 ? c.primary : 'transparent', cursor: 'default' }}>{f}</div>
      ))}
    </div>
  )
}

const views = { dashboard: DashboardView, inspections: InspectionsView, clients: ClientsView, calendar: CalendarView, templates: TemplatesView, media: MediaView, reports: ReportsView, ai: AIView, settings: SettingsView }

export default function KiteDashboardLive() {
  const [page, setPage] = useState('dashboard')
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => { setMounted(false); const t = setTimeout(() => setMounted(true), 50); return () => clearTimeout(t) }, [page])

  const View = views[page]
  let currentGroup = null

  return (
    <div style={{
      borderRadius: 12, overflow: 'hidden', background: c.bg,
      border: `1px solid ${c.border}`, boxShadow: '0 32px 80px rgba(0,0,0,0.48)',
      fontFamily: sans, display: 'flex', height: 440,
    }}>
      {/* Sidebar */}
      <div style={{ width: 170, borderRight: `1px solid ${c.border}`, display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ height: 48, display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px', borderBottom: `1px solid ${c.border}`, background: 'rgba(255,255,255,0.02)' }}>
          <img src={KITE_LOGO} alt="Kite" style={{ height: 22 }} />
        </div>
        <nav style={{ flex: 1, padding: '8px 6px', display: 'flex', flexDirection: 'column', gap: 1, overflowY: 'auto' }}>
          {navItems.map(item => {
            const showGroup = item.group && item.group !== currentGroup
            if (item.group) currentGroup = item.group
            return (
              <div key={item.id}>
                {showGroup && <div style={{ fontSize: 9, fontWeight: 600, color: 'rgba(162,174,187,0.5)', textTransform: 'uppercase', letterSpacing: 1, padding: '8px 10px 3px', marginTop: 4 }}>{item.group}</div>}
                <div
                  onClick={() => setPage(item.id)}
                  style={{
                    padding: '6px 10px', borderRadius: 6, fontSize: 12, fontWeight: 500,
                    color: page === item.id ? c.primary : c.muted,
                    background: page === item.id ? 'rgba(35,181,211,0.1)' : 'transparent',
                    cursor: 'pointer', transition: 'background 0.15s, color 0.15s',
                  }}
                >{item.label}</div>
              </div>
            )
          })}
        </nav>
        <div style={{ borderTop: `1px solid ${c.border}`, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(35,181,211,0.2)', border: '1px solid rgba(35,181,211,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 600, color: c.primary }}>RB</div>
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontSize: 11, fontWeight: 500, color: c.text }}>Roddy B.</div>
            <div style={{ fontSize: 9, color: c.muted }}>Inspector</div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, overflow: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <View mounted={mounted} />
      </div>
    </div>
  )
}
