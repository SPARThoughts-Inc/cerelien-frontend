import { useState, useEffect } from 'react'
import { api } from '../../services/api'
import { RiskIndicators } from './RiskIndicators'
import { GlucoseChart } from './GlucoseChart'

interface PatientSummary {
  patient: {
    id: number
    first_name: string
    last_name: string
    diabetes_type: string
  }
  latest_a1c: string | null
  avg_glucose_30d: string | null
  active_alerts: string[]
}

interface GlucoseReading {
  reading_timestamp: string
  value: string
  reading_type: string
}

interface Analytics {
  risk_score: { overall: number; cardiovascular: number; nephropathy: number; retinopathy: number } | null
  trend: { direction: string; avg_glucose: number; time_in_range: number } | null
  complication_flags: string[] | null
}

interface PatientDashboardProps {
  patientId: string
}

function a1cColor(val: number): string {
  if (val < 7) return 'var(--color-success)'
  if (val <= 8) return 'var(--color-warning)'
  return 'var(--color-danger)'
}

function glucoseColor(val: number): string {
  if (val >= 70 && val <= 180) return 'var(--color-success)'
  if ((val >= 60 && val < 70) || (val > 180 && val <= 200)) return 'var(--color-warning)'
  return 'var(--color-danger)'
}

export function PatientDashboard({ patientId }: PatientDashboardProps) {
  const [summary, setSummary] = useState<PatientSummary | null>(null)
  const [glucose, setGlucose] = useState<GlucoseReading[]>([])
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      setError(null)
      try {
        const [summaryRes, glucoseRes, analyticsRes] = await Promise.all([
          api.get(`/api/patients/${patientId}/summary`),
          api.get(`/api/patients/${patientId}/glucose?days=1`),
          api.get(`/api/patients/${patientId}/analytics`),
        ])

        if (!summaryRes.ok || !glucoseRes.ok || !analyticsRes.ok) {
          throw new Error('Failed to load patient data')
        }

        const [summaryData, glucoseData, analyticsData] = await Promise.all([
          summaryRes.json(),
          glucoseRes.json(),
          analyticsRes.json(),
        ])

        setSummary(summaryData)
        setGlucose(glucoseData.readings ?? glucoseData)
        setAnalytics(analyticsData)
      } catch (err) {
        console.error('Dashboard load error:', err)
        setError('Failed to load patient data. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [patientId])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64" role="status">
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-10 h-10 rounded-full animate-gentlePulse"
            style={{ border: '3px solid var(--color-primary)', borderTopColor: 'transparent' }}
          />
          <div className="text-base" style={{ color: 'var(--color-text-secondary)' }}>Loading patient data...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-base" style={{ color: 'var(--color-danger)' }}>{error}</div>
      </div>
    )
  }

  if (!summary || !analytics) return null

  const a1cVal = summary.latest_a1c ? parseFloat(summary.latest_a1c) : null
  const a1c = a1cVal !== null ? a1cVal.toFixed(1) : '\u2014'
  const avgGlucoseVal = summary.avg_glucose_30d ? parseFloat(summary.avg_glucose_30d) : null
  const avgGlucose = avgGlucoseVal !== null ? avgGlucoseVal.toFixed(0) : '\u2014'

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Patient Header Card */}
      <div className="card-clinical card-accent-left p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1
              className="text-2xl font-bold mb-1"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: 'var(--color-text)' }}
            >
              {summary.patient.first_name} {summary.patient.last_name}
            </h1>
            <span
              className="inline-block px-3 py-1 text-xs font-medium rounded-full capitalize"
              style={{
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary-dark)',
              }}
            >
              {summary.patient.diabetes_type?.replace('_', ' ')}
            </span>
          </div>

          <div className="flex gap-6">
            {/* A1C Card */}
            <div className="text-center px-5 py-3 rounded-xl" style={{ backgroundColor: 'var(--color-bg)' }}>
              <p className="text-xs font-medium uppercase tracking-wide mb-1" style={{ color: 'var(--color-text-secondary)' }}>Latest A1C</p>
              <p className="text-3xl font-bold" style={{ color: a1cVal !== null ? a1cColor(a1cVal) : 'var(--color-text-secondary)' }}>
                {a1c}<span className="text-sm font-normal" style={{ color: 'var(--color-text-secondary)' }}>%</span>
              </p>
            </div>

            {/* Avg Glucose Card */}
            <div className="text-center px-5 py-3 rounded-xl" style={{ backgroundColor: 'var(--color-bg)' }}>
              <p className="text-xs font-medium uppercase tracking-wide mb-1" style={{ color: 'var(--color-text-secondary)' }}>Avg Glucose 30d</p>
              <p className="text-3xl font-bold" style={{ color: avgGlucoseVal !== null ? glucoseColor(avgGlucoseVal) : 'var(--color-text-secondary)' }}>
                {avgGlucose} <span className="text-sm font-normal" style={{ color: 'var(--color-text-secondary)' }}>mg/dL</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section header */}
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-semibold" style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: 'var(--color-text)' }}>Risk Assessment</h2>
        <div className="flex-1 h-px" style={{ backgroundColor: 'var(--color-border)' }} />
      </div>

      <RiskIndicators
        overallRisk={analytics.risk_score?.overall ?? 0}
        glucoseTrend={(analytics.trend?.direction as 'improving' | 'stable' | 'worsening') ?? 'stable'}
        activeAlerts={analytics.complication_flags?.length ?? 0}
      />

      {/* Section header */}
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-semibold" style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: 'var(--color-text)' }}>Glucose Profile</h2>
        <div className="flex-1 h-px" style={{ backgroundColor: 'var(--color-border)' }} />
      </div>

      <GlucoseChart readings={glucose} />
    </div>
  )
}
