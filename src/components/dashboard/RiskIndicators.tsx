interface RiskIndicatorsProps {
  overallRisk: number
  glucoseTrend: 'improving' | 'stable' | 'worsening'
  activeAlerts: number
}

const trendConfig = {
  improving: { label: 'Improving', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
  stable: { label: 'Stable', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' },
  worsening: { label: 'Worsening', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
}

function riskColor(score: number) {
  if (score <= 30) return 'text-green-600'
  if (score <= 60) return 'text-yellow-600'
  return 'text-red-600'
}

export function RiskIndicators({ overallRisk, glucoseTrend, activeAlerts }: RiskIndicatorsProps) {
  const trend = trendConfig[glucoseTrend]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <p className="text-sm text-gray-500 mb-1">Overall Risk</p>
        <p className={`text-3xl font-bold ${riskColor(overallRisk)}`}>
          {overallRisk}<span className="text-lg font-normal text-gray-400">/100</span>
        </p>
      </div>

      <div className={`rounded-xl border p-5 ${trend.bg} ${trend.border}`}>
        <p className="text-sm text-gray-500 mb-1">Glucose Trend</p>
        <p className={`text-3xl font-bold ${trend.color}`}>{trend.label}</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <p className="text-sm text-gray-500 mb-1">Active Alerts</p>
        <p className={`text-3xl font-bold ${activeAlerts > 0 ? 'text-red-600' : 'text-green-600'}`}>
          {activeAlerts}
        </p>
      </div>
    </div>
  )
}
