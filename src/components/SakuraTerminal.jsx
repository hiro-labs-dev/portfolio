const colors = {
  bg: '#0f0e13',
  border: 'rgba(242,167,188,0.1)',
  borderSubtle: 'rgba(255,255,255,0.05)',
  sakura: '#f2a7bc',
  sakura60: 'rgba(242,167,188,0.6)',
  sakura50: 'rgba(242,167,188,0.5)',
  primary: '#eeecf2',
  secondary: '#888492',
  muted: '#56535e',
  success: '#7dd9a4',
  warn: '#f0b97a',
}

const mono = "'SF Mono', 'Fira Code', 'Fira Mono', Menlo, Monaco, monospace"

export default function SakuraTerminal() {
  return (
    <div style={{
      borderRadius: 12, overflow: 'hidden',
      background: colors.bg,
      border: `1px solid ${colors.border}`,
      boxShadow: '0 32px 80px rgba(0,0,0,0.48), 0 0 0 1px rgba(242,167,188,0.04)',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '12px 16px',
        borderBottom: `1px solid ${colors.borderSubtle}`,
      }}>
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57' }} />
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#febc2e' }} />
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840' }} />
        <span style={{ marginLeft: 'auto', fontFamily: mono, fontSize: 11, color: colors.muted }}>~/projects/myapp</span>
      </div>

      <div style={{ padding: '20px 24px', fontFamily: mono, fontSize: 13, lineHeight: 1.85 }}>
        {/* Login */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <span style={{ color: colors.sakura60 }}>$</span>
          <span style={{ color: colors.primary }}>sakura login --github</span>
        </div>
        <div style={{ paddingLeft: 22, fontSize: 12.5 }}>
          <span style={{ color: colors.success }}>✓</span>
          <span style={{ color: colors.secondary, marginLeft: 8 }}>Logged in as dev@company.com (pro tier)</span>
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.04)', margin: '16px 0' }} />

        {/* Plan */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <span style={{ color: colors.sakura60 }}>$</span>
          <span style={{ color: colors.primary }}>
            sakura plan <span style={{ color: '#a8d8a8' }}>&quot;migrate users table to RDS&quot;</span>
          </span>
        </div>
        <div style={{ marginTop: 12, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ display: 'flex', gap: 8, fontSize: 12.5 }}>
            <span style={{ color: colors.muted, width: 52, display: 'inline-block' }}>Route</span>
            <span style={{ color: colors.muted }}>→</span>
            <span style={{ color: '#a8d8a8', marginLeft: 4 }}>aws</span>
          </div>
          <div style={{ display: 'flex', gap: 8, fontSize: 12.5 }}>
            <span style={{ color: colors.muted, width: 52, display: 'inline-block' }}>Risk</span>
            <span style={{ color: colors.muted }}>→</span>
            <span style={{ color: colors.warn, marginLeft: 4 }}>mutating</span>
          </div>
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.04)', margin: '16px 0' }} />

        {/* Apply */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <span style={{ color: colors.sakura60 }}>$</span>
          <span style={{ color: colors.primary }}>sakura apply</span>
        </div>
        <div style={{ paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 2, fontSize: 12.5 }}>
          <div style={{ color: colors.muted }}>
            Type <span style={{ color: colors.sakura, fontWeight: 500 }}>APPLY</span> to confirm:{' '}
            <span style={{ color: colors.primary }}>APPLY</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: colors.success }}>
            <span>✓</span>
            <span>Plan applied successfully</span>
          </div>
        </div>

        <div style={{ paddingLeft: 22, marginTop: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ color: colors.sakura60 }}>$</span>
          <span className="sakura-cursor" style={{
            width: 7, height: 15, background: colors.sakura50, borderRadius: 1,
          }} />
        </div>
      </div>

      <style>{`
        @keyframes sakuraBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .sakura-cursor {
          animation: sakuraBlink 1.1s step-end infinite;
        }
      `}</style>
    </div>
  )
}
