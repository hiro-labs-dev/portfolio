const c = {
  bg: '#071013',
  surface: 'rgba(255,255,255,0.03)',
  border: '#1B2A31',
  primary: '#23B5D3',
  secondary: '#75ABBC',
  text: '#DFE0E2',
  muted: '#A2AEBB',
  destructive: '#FF4D4F',
}

const heading = "'Space Grotesk', system-ui, sans-serif"

const card = {
  borderRadius: 8,
  border: `1px solid ${c.border}`,
  background: c.surface,
  padding: 12,
}

export default function KiteDashboard() {
  return (
    <div style={{
      borderRadius: 12, overflow: 'hidden',
      background: c.bg,
      border: `1px solid ${c.border}`,
      boxShadow: '0 32px 80px rgba(0,0,0,0.48)',
    }}>
      {/* Title bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px',
        borderBottom: `1px solid ${c.border}`,
        background: c.surface,
      }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
        </div>
        <span style={{ fontSize: 12, color: c.muted }}>Inspection dashboard preview</span>
        <span style={{ fontSize: 12, color: c.muted }}>v0.1</span>
      </div>

      {/* Content */}
      <div style={{ padding: 16 }}>
        {/* Active inspection header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <div>
            <div style={{ fontSize: 12, color: c.muted }}>Active inspection</div>
            <div style={{ marginTop: 4, fontFamily: heading, fontSize: 18, color: c.text }}>2021 Airstream Flying Cloud</div>
            <div style={{ marginTop: 4, fontSize: 12, color: c.muted }}>VIN •••• 4821 • Austin, TX</div>
          </div>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            borderRadius: 9999, border: `1px solid rgba(35,181,211,0.3)`, background: 'rgba(35,181,211,0.1)',
            padding: '4px 12px', fontSize: 12, color: c.text, whiteSpace: 'nowrap',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.primary }} />
            In progress
          </span>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16 }}>
          {/* Systems checked */}
          <div style={card}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, color: c.muted }}>Systems checked</span>
              <span style={{ fontSize: 12, color: c.muted }}>12/18</span>
            </div>
            <div style={{ marginTop: 8, height: 8, borderRadius: 9999, background: 'rgba(27,42,49,0.7)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '66.6%', borderRadius: 9999, background: c.primary }} />
            </div>
            <div style={{ marginTop: 8, fontSize: 12, color: c.muted }}>Next: Electrical</div>
          </div>

          {/* Findings */}
          <div style={card}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, color: c.muted }}>Findings</span>
              <span style={{ fontSize: 12, color: c.muted }}>6</span>
            </div>
            <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center',
                borderRadius: 9999, background: 'rgba(255,77,79,0.15)', border: '1px solid rgba(255,77,79,0.3)',
                padding: '4px 10px', fontSize: 12, color: c.text,
              }}>2 critical</span>
              <span style={{
                display: 'inline-flex', alignItems: 'center',
                borderRadius: 9999, background: 'rgba(117,171,188,0.15)', border: '1px solid rgba(117,171,188,0.3)',
                padding: '4px 10px', fontSize: 12, color: c.text,
              }}>4 notes</span>
            </div>
            <div style={{ marginTop: 8, fontSize: 12, color: c.muted }}>Auto-sorted by severity</div>
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ ...card, marginTop: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: c.text }}>Quick actions</span>
            <span style={{ fontSize: 12, color: c.muted }}>Tap-friendly</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 12 }}>
            {['Add photo', 'Add finding', 'Checklist', 'Generate PDF'].map(label => (
              <div key={label} style={{
                textAlign: 'center', padding: '8px 12px',
                borderRadius: 6, border: `1px solid ${c.border}`,
                background: 'rgba(255,255,255,0.02)',
                fontSize: 13, color: c.muted,
              }}>{label}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
