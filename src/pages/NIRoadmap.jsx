import { useState, useEffect, useMemo, useCallback } from 'react'
import { FEATURES, PHASES, BUDGET_TIERS, DEPENDENCY_TREE, FUTURE_FEATURES, ACCESS_CODE } from '../data/niRoadmap'
import './NIRoadmap.css'

/* ── Access Gate ── */
function AccessGate({ onAccess }) {
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (code.trim().toUpperCase() === ACCESS_CODE) {
      localStorage.setItem('ni-access', 'granted')
      onAccess()
    } else {
      setError(true)
      setTimeout(() => setError(false), 600)
    }
  }

  return (
    <div className="ni-gate">
      <form className="ni-gate-card" onSubmit={handleSubmit}>
        <img src="/ni-logo.svg" alt="Nomadic Influence" className="ni-gate-logo" />
        <p className="ni-gate-title">Enter access code to view roadmap</p>
        <input
          className={`ni-gate-input${error ? ' shake' : ''}`}
          type="text"
          placeholder="ACCESS CODE"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          autoFocus
        />
        <p className={`ni-gate-error${error ? ' visible' : ''}`}>Invalid access code</p>
      </form>
    </div>
  )
}

/* ── Stat Counter ── */
function AnimatedNumber({ value, prefix = '', suffix = '' }) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    let start = 0
    const duration = 800
    const step = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      setDisplay(Math.floor(progress * value))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [value])
  return <span>{prefix}{display.toLocaleString()}{suffix}</span>
}

/* ── Feature Card ── */
function FeatureCard({ feature, phaseColor, dimmed, expanded, onToggle }) {
  const priorityClass = feature.priority.toLowerCase()
  const statusClass = feature.status.toLowerCase().replace(/ /g, '-')

  return (
    <div
      className={`ni-card${dimmed ? ' dimmed' : ''}`}
      style={{ borderLeftColor: phaseColor }}
      onClick={onToggle}
    >
      <div className="ni-card-header">
        <div className="ni-card-left">
          <span className="ni-card-id">{feature.id}</span>
          <span className="ni-card-name">{feature.name}</span>
        </div>
        <div className="ni-card-right">
          <span className={`ni-badge ni-badge-${priorityClass}`}>{feature.priority}</span>
          <span className="ni-card-cost">${feature.costLow.toLocaleString()}-${feature.costHigh.toLocaleString()}</span>
          <span className={`ni-status-dot ni-status-${statusClass}`} title={feature.status} />
          <span className={`ni-card-expand${expanded ? ' open' : ''}`}>▾</span>
        </div>
      </div>
      <div className={`ni-card-detail${expanded ? ' open' : ''}`}>
        <div className="ni-card-detail-inner">
          <ul className="ni-card-scope">
            {feature.scope.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
          <div className="ni-card-meta">
            <span className="ni-card-meta-item"><span className="ni-card-meta-label">Points</span><span className="ni-card-meta-value">{feature.points}</span></span>
            <span className="ni-card-meta-item"><span className="ni-card-meta-label">Days</span><span className="ni-card-meta-value">{feature.daysLow}-{feature.daysHigh}</span></span>
            <span className="ni-card-meta-item"><span className="ni-card-meta-label">Phase</span><span className="ni-card-meta-value">{feature.phase}</span></span>
            <span className="ni-card-meta-item"><span className="ni-card-meta-label">Tier</span><span className="ni-card-meta-value">{feature.tier}</span></span>
          </div>
          {feature.dependencies.length > 0 && (
            <div className="ni-card-deps">
              <span className="ni-card-meta-label" style={{ fontSize: '0.8rem' }}>Depends on:</span>
              {feature.dependencies.map(d => <span key={d} className="ni-dep-chip">{d}</span>)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Dependency Tree ── */
function DependencyTree() {
  const [hovered, setHovered] = useState(null)

  const trees = useMemo(() => {
    const fromSet = new Set(DEPENDENCY_TREE.map(d => d.from))
    const rootIds = [...fromSet].filter(id => !DEPENDENCY_TREE.some(d => d.to === id))
    return rootIds.map(rootId => ({
      id: rootId,
      feature: FEATURES.find(f => f.id === rootId),
      children: DEPENDENCY_TREE.filter(d => d.from === rootId).map(d => ({
        id: d.to,
        label: d.label,
        feature: FEATURES.find(f => f.id === d.to),
      })),
    }))
  }, [])

  const getPhaseColor = (id) => {
    const f = FEATURES.find(feat => feat.id === id)
    if (!f) return '#30363d'
    const p = PHASES.find(ph => ph.id === f.phase)
    return p ? p.color : '#30363d'
  }

  const isHighlighted = (id) => {
    if (!hovered) return true
    if (id === hovered) return true
    return DEPENDENCY_TREE.some(d =>
      (d.from === hovered && d.to === id) || (d.to === hovered && d.from === id)
    )
  }

  return (
    <div className="ni-dep-trees">
      {trees.map(tree => (
        <div
          key={tree.id}
          className={`ni-dep-tree${!isHighlighted(tree.id) ? ' dimmed' : ''}`}
          onMouseEnter={() => setHovered(tree.id)}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="ni-dep-root" style={{ borderLeftColor: getPhaseColor(tree.id) }}>
            <span className="ni-dep-root-id">{tree.id}</span>
            <span className="ni-dep-root-name">{tree.feature?.name || tree.id}</span>
          </div>
          <div className="ni-dep-children">
            {tree.children.map((child, i) => (
              <div
                key={child.id}
                className={`ni-dep-child${!isHighlighted(child.id) ? ' dimmed' : ''}`}
                onMouseEnter={(e) => { e.stopPropagation(); setHovered(child.id) }}
                onMouseLeave={(e) => { e.stopPropagation(); setHovered(tree.id) }}
              >
                <div className="ni-dep-connector">
                  <div className={`ni-dep-line-v${i === tree.children.length - 1 ? ' last' : ''}`} />
                  <div className="ni-dep-line-h" />
                </div>
                <div className="ni-dep-child-card" style={{ borderLeftColor: getPhaseColor(child.id) }}>
                  <span className="ni-dep-child-id">{child.id}</span>
                  <span className="ni-dep-child-name">{child.feature?.name || child.id}</span>
                  <span className="ni-dep-child-label">{child.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Main Page ── */
export default function NIRoadmap() {
  const [authorized, setAuthorized] = useState(() => localStorage.getItem('ni-access') === 'granted')
  const [budgetTier, setBudgetTier] = useState(5)
  const [activePhase, setActivePhase] = useState(null)
  const [expandedCard, setExpandedCard] = useState(null)
  const [tierFilter, setTierFilter] = useState('All')
  const [sortBy, setSortBy] = useState('cost')
  const [expandedPhases, setExpandedPhases] = useState(new Set())

  const currentBudget = BUDGET_TIERS[budgetTier]

  const handleBudgetChange = useCallback((tier) => {
    setBudgetTier(tier)
    setActivePhase(null)
    const maxPhase = BUDGET_TIERS[tier].maxPhase
    const included = PHASES.filter(p => p.id <= maxPhase).map(p => p.id)
    setExpandedPhases(new Set(included))
  }, [])

  const handlePhaseClick = useCallback((phaseId) => {
    if (activePhase === phaseId) {
      setActivePhase(null)
      const included = PHASES.filter(p => p.id <= currentBudget.maxPhase).map(p => p.id)
      setExpandedPhases(new Set(included))
    } else {
      setActivePhase(phaseId)
      setExpandedPhases(new Set([phaseId]))
    }
  }, [activePhase, currentBudget])

  const isFeatureIncluded = useCallback((feature) => {
    return feature.phase <= currentBudget.maxPhase
  }, [currentBudget])

  const filteredFeatures = useMemo(() => {
    let features = FEATURES
    if (activePhase !== null) features = features.filter(f => f.phase === activePhase)
    if (tierFilter !== 'All') features = features.filter(f => f.tier === tierFilter)
    return features
  }, [activePhase, tierFilter])

  const sortedFeatures = useMemo(() => {
    const priorityOrder = { High: 0, Medium: 1, Low: 2 }
    const sorted = [...filteredFeatures]
    if (sortBy === 'cost') sorted.sort((a, b) => b.costHigh - a.costHigh)
    else if (sortBy === 'priority') sorted.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
    else if (sortBy === 'points') sorted.sort((a, b) => b.points - a.points)
    return sorted
  }, [filteredFeatures, sortBy])

  const groupedPhases = useMemo(() => {
    const phaseIds = [...new Set(sortedFeatures.map(f => f.phase))].sort((a, b) => a - b)
    return phaseIds.map(id => ({
      phase: PHASES.find(p => p.id === id),
      features: sortedFeatures.filter(f => f.phase === id),
    }))
  }, [sortedFeatures])

  const phaseWidths = [15, 15, 20, 20, 20, 10] // percentage widths for timeline segments

  if (!authorized) return <AccessGate onAccess={() => setAuthorized(true)} />

  return (
    <div className="ni-roadmap">
      <div className="ni-roadmap-inner">
        {/* Header */}
        <header className="ni-header">
          <img src="/ni-logo.svg" alt="Nomadic Influence" className="ni-header-logo" />
          <h1>Future Product Roadmap</h1>
          <p className="ni-header-subtitle">Prepared for Lauren, Amanda &amp; Phil &nbsp;·&nbsp; March 2026</p>
        </header>

        {/* Preface */}
        <section className="ni-preface">
          <p>This roadmap outlines the full product vision for Nomadic Influence, broken into phased sprints, scoped against the existing platform codebase, and estimated based on time, effort, and complexity.</p>
          <p>Each feature has been evaluated against what already exists in the platform today. Where existing infrastructure can be reused (Stripe billing, S3 uploads, Celery task scheduling, email templates, HubSpot sync), the scope reflects that. Where entirely new systems are required (messaging, marketplace, contract signing), the scope reflects the full build.</p>
          <p>Costs represent contracted development rates based on the complexity of each feature and are negotiable. <strong>Features in Phases 0 through 4 have not been fully scoped into detailed specifications.</strong> These estimates represent the work as currently understood. Final timelines and costs may adjust once each sprint's requirements are fully defined and approved.</p>
          <p>Future features are outlined for visibility but are not included in the active timeline or cost estimates.</p>
        </section>

        {/* Stats */}
        <div className="ni-stats">
          <div className="ni-stat">
            <div className="ni-stat-value"><AnimatedNumber value={18} /></div>
            <div className="ni-stat-label">Features</div>
          </div>
          <div className="ni-stat">
            <div className="ni-stat-value"><AnimatedNumber value={258} /></div>
            <div className="ni-stat-label">Story Points</div>
          </div>
          <div className="ni-stat">
            <div className="ni-stat-value"><AnimatedNumber value={12} suffix=" wk" /></div>
            <div className="ni-stat-label">Timeline</div>
          </div>
          <div className="ni-stat">
            <div className="ni-stat-value"><AnimatedNumber value={120} prefix="$" suffix="k" /></div>
            <div className="ni-stat-label">Full Scope</div>
          </div>
        </div>

        {/* Glossary */}
        <section className="ni-glossary">
          <h2 className="ni-section-title">How to Read This Roadmap</h2>
          <div className="ni-glossary-list">
            {[
              ['Phases', 'Work is organized into sequential phases. Each phase is a focused sprint where one starts after the previous one finishes. This keeps delivery predictable and lets you see progress in real time.'],
              ['Story Points', 'A measure of effort and complexity, not hours. A 1-point task is trivial (under an hour). A 13-point task takes a week or more. Points help estimate how long a phase will take based on how fast work gets done.'],
              ['Features', 'Each feature is a distinct piece of functionality, like messaging, a blog, or a contract builder. Click any feature to see exactly what it includes, how complex it is, and what it costs.'],
              ['Priority', 'High features drive revenue or unlock other features. Medium features add significant value. Low features are nice-to-haves that round out the platform.'],
              ['Dependencies', 'Some features require other features to be built first. For example, the contract builder needs messaging to exist for the negotiation flow. Dependencies determine the phase order.'],
              ['Budget Explorer', 'Use the slider below to see what ships at each investment level. Features outside your selected budget are dimmed so you can focus on what\'s included.'],
            ].map(([term, desc]) => (
              <details key={term} className="ni-glossary-item">
                <summary className="ni-glossary-term">{term}</summary>
                <p className="ni-glossary-desc">{desc}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Budget Explorer */}
        <section className="ni-budget">
          <h2 className="ni-section-title">Budget Explorer</h2>
          <div className="ni-budget-slider-wrap">
            <div className="ni-budget-display">
              <span className="ni-budget-cost">
                {currentBudget.costLow === 0 ? '$0' : `$${(currentBudget.costLow / 1000).toFixed(0)}k - $${(currentBudget.costHigh / 1000).toFixed(0)}k`}
              </span>
              <span className="ni-budget-desc">{currentBudget.description}</span>
            </div>
            <input
              type="range"
              className="ni-budget-slider"
              min="0"
              max="5"
              step="1"
              value={budgetTier}
              onChange={(e) => handleBudgetChange(Number(e.target.value))}
            />
            <div className="ni-budget-labels">
              {BUDGET_TIERS.map((t, i) => (
                <span
                  key={i}
                  className={`ni-budget-label${i === budgetTier ? ' active' : ''}`}
                  onClick={() => handleBudgetChange(i)}
                >
                  {t.label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Phase Timeline */}
        <section className="ni-timeline">
          <h2 className="ni-section-title">Phase Timeline</h2>
          <div className="ni-waterfall">
            {PHASES.map((phase, i) => {
              const durations = [2, 2, 2, 2, 4, 2]
              const starts = [0, 2, 4, 6, 8, null]
              const totalWeeks = 12
              const dimmed = phase.id > currentBudget.maxPhase
              const isActive = activePhase === phase.id
              const isStash = phase.id === 5
              return (
                <div
                  key={phase.id}
                  className={`ni-waterfall-row${isActive ? ' active' : ''}${dimmed ? ' dimmed' : ''}`}
                  onClick={() => handlePhaseClick(phase.id)}
                >
                  <div className="ni-waterfall-label">
                    <span className="ni-waterfall-phase">{isStash ? 'Parallel' : `Phase ${phase.id}`}</span>
                    <span className="ni-waterfall-name">{phase.name}</span>
                  </div>
                  <div className="ni-waterfall-track">
                    {isStash ? (
                      <div className="ni-waterfall-bar ni-waterfall-bar-tbd" style={{ left: '0%', width: '100%', background: `repeating-linear-gradient(135deg, ${phase.color}22, ${phase.color}22 8px, transparent 8px, transparent 16px)`, border: `1px dashed ${phase.color}` }}>
                        <span className="ni-waterfall-duration" style={{ color: phase.color }}>TBD, can run in parallel</span>
                      </div>
                    ) : (
                      <div className="ni-waterfall-bar" style={{ left: `${(starts[i] / totalWeeks) * 100}%`, width: `${(durations[i] / totalWeeks) * 100}%`, background: phase.color }}>
                        <span className="ni-waterfall-duration">{durations[i]} wks</span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
            <div className="ni-waterfall-weeks">
              {[...Array(13)].map((_, i) => (
                <span key={i} className="ni-waterfall-week">{i % 2 === 0 ? `Wk ${i}` : ''}</span>
              ))}
            </div>
            <div className="ni-waterfall-assumptions">
              <p className="ni-waterfall-assumptions-title">These timelines assume:</p>
              <ul className="ni-waterfall-assumptions-list">
                <li>Fully scoped requirements and complete specifications provided upfront per sprint</li>
                <li>Dedicated development with no competing client work or parallel feature requests</li>
                <li>Future features are not included in this estimate</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="ni-features">
          <div className="ni-features-toolbar">
            <h2 className="ni-section-title">Features</h2>
            <div className="ni-features-controls">
              <div className="ni-tier-toggle">
                {['All', 'Priority', 'Future'].map(t => (
                  <button key={t} className={`ni-tier-btn${tierFilter === t ? ' active' : ''}`} onClick={() => setTierFilter(t)}>{t}</button>
                ))}
              </div>
              <select className="ni-sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="cost">Sort by Cost</option>
                <option value="priority">Sort by Priority</option>
              </select>
            </div>
          </div>
          {groupedPhases.map(({ phase, features: phaseFeatures }) => {
            const phaseCostLow = phaseFeatures.reduce((s, f) => s + f.costLow, 0)
            const phaseCostHigh = phaseFeatures.reduce((s, f) => s + f.costHigh, 0)
            const phasePoints = phaseFeatures.reduce((s, f) => s + f.points, 0)
            const included = currentBudget.maxPhase === 0 || phase.id <= currentBudget.maxPhase
            const isExpanded = expandedPhases.has(phase.id)
            return (
              <div key={phase.id} className="ni-phase-group" style={{ animationDelay: `${phase.id * 0.1}s`, animation: 'fadeUp 0.4s ease both' }}>
                <div
                  className="ni-phase-header"
                  onClick={() => {
                    setExpandedPhases(prev => {
                      const next = new Set(prev)
                      next.has(phase.id) ? next.delete(phase.id) : next.add(phase.id)
                      return next
                    })
                  }}
                >
                  <div className="ni-phase-color" style={{ background: phase.color }} />
                  <div className="ni-phase-info">
                    <span className="ni-phase-name">Phase {phase.id}: {phase.name}</span>
                    <span className="ni-phase-summary">
                      {phaseFeatures.length} features · {phasePoints} pts · ${(phaseCostLow / 1000).toFixed(0)}-${(phaseCostHigh / 1000).toFixed(0)}k · Months {phase.months}
                    </span>
                  </div>
                  <span className={`ni-phase-expand${isExpanded ? ' open' : ''}`}>▾</span>
                </div>
                <div className={`ni-phase-cards${isExpanded ? ' open' : ''}`}>
                  <div className="ni-features-grid">
                    {phaseFeatures.map((feature, i) => (
                      <div key={feature.id} style={{ animationDelay: `${i * 0.04}s`, animation: 'fadeUp 0.4s ease both' }}>
                        <FeatureCard
                          feature={feature}
                          phaseColor={phase.color}
                          dimmed={!included}
                          expanded={expandedCard === feature.id}
                          onToggle={() => setExpandedCard(expandedCard === feature.id ? null : feature.id)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </section>

        {/* Future Outlook */}
        <section className="ni-future">
          <h2 className="ni-section-title">Future Outlook</h2>
          <p className="ni-future-intro">Additional features to build on demand as the platform grows.</p>
          <div className="ni-future-grid">
            {FUTURE_FEATURES.map(f => (
              <div key={f.id} className="ni-future-card">
                <div className="ni-future-card-header">
                  <span className="ni-future-card-id">{f.id}</span>
                  <span className="ni-future-card-name">{f.name}</span>
                  <span className="ni-future-card-pts">{f.points} pts</span>
                </div>
                <ul className="ni-card-scope">
                  {f.scope.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="ni-footer">
          <p>Prepared by Roddy &nbsp;·&nbsp; March 2026 &nbsp;·&nbsp; Confidential</p>
        </footer>
      </div>
    </div>
  )
}
