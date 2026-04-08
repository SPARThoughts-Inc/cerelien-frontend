interface RiskIndicatorsProps {
  overallRisk: number
  glucoseTrend: 'improving' | 'stable' | 'worsening'
  activeAlerts: number
}

const trendConfig = {
  improving: { label: 'Improving', color: 'var(--color-success)', bg: '#F0FFF4', border: '#C6F6D5' },
  stable: { label: 'Stable', color: 'var(--color-warning)', bg: '#FFFFF0', border: '#FEFCBF' },
  worsening: { label: 'Worsening', color: 'var(--color-danger)', bg: '#FFF5F5', border: '#FED7D7' },
}

function riskColor(score: number): string {
  if (score <= 30) return 'var(--color-success)'
  if (score <= 60) return 'var(--color-warning)'
  return 'var(--color-danger)'
}

function riskBarBg(score: number): string {
  if (score <= 30) return '#C6F6D5'
  if (score <= 60) return '#FEFCBF'
  return '#FED7D7'
}

function HeartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

function TrendIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  )
}

function AlertIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
}

export function RiskIndicators({ overallRisk, glucoseTrend, activeAlerts }: RiskIndicatorsProps) {
  const trend = trendConfig[glucoseTrend]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Overall Risk */}
      <div className="card-clinical card-accent-left p-5">
        <div className="flex items-start justify-between mb-3">
          <p className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>Overall Risk</p>
          <span style={{ color: riskColor(overallRisk) }}><HeartIcon /></span>
        </div>
        <p className="text-3xl font-bold" style={{ color: riskColor(overallRisk) }}>
          {overallRisk}<span className="text-lg font-normal" style={{ color: 'var(--color-text-secondary)' }}>/100</span>
        </p>
        <div className="mt-3 h-2 rounded-full overflow-hidden" style={{ backgroundColor: riskBarBg(overallRisk) }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${overallRisk}%`, backgroundColor: riskColor(overallRisk) }}
          />
        </div>
      </div>

      {/* Glucose Trend */}
      <div
        className="rounded-2xl p-5"
        style={{
          backgroundColor: trend.bg,
          border: `1px solid ${trend.border}`,
          borderLeft: `4px solid ${trend.color}`,
        }}
      >
        <div className="flex items-start justify-between mb-3">
          <p className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>Glucose Trend</p>
          <span style={{ color: trend.color }}><TrendIcon /></span>
        </div>
        <p className="text-3xl font-bold" style={{ color: trend.color }}>{trend.label}</p>
      </div>

      {/* Active Alerts */}
      <div className="card-clinical p-5" style={{ borderLeft: `4px solid ${activeAlerts > 0 ? 'var(--color-danger)' : 'var(--color-success)'}` }}>
        <div className="flex items-start justify-between mb-3">
          <p className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>Active Alerts</p>
          <span style={{ color: activeAlerts > 0 ? 'var(--color-danger)' : 'var(--color-success)' }}><AlertIcon /></span>
        </div>
        <p className="text-3xl font-bold" style={{ color: activeAlerts > 0 ? 'var(--color-danger)' : 'var(--color-success)' }}>
          {activeAlerts}
        </p>
      </div>
    </div>
  )
}
