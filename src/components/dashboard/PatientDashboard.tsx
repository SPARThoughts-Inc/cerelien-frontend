import { useState, useEffect } from 'react'
import { api } from '../../services/api'
import { RiskIndicators } from './RiskIndicators'
import { GlucoseChart } from './GlucoseChart'

interface PatientSummary {
  name: string
  diabetes_type: string
  latest_a1c: number
  avg_glucose_30d: number
}

interface GlucoseReading {
  timestamp: string
  value: number
}

interface Analytics {
  overall_risk: number
  glucose_trend: 'improving' | 'stable' | 'worsening'
  active_alerts: number
}

interface PatientDashboardProps {
  patientId: string
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
        <div className="text-lg text-gray-500">Loading patient data...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    )
  }

  if (!summary || !analytics) return null

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{summary.name}</h1>
            <p className="text-gray-500">{summary.diabetes_type}</p>
          </div>
          <div className="flex gap-8">
            <div className="text-center">
              <p className="text-sm text-gray-500">Latest A1C</p>
              <p className="text-3xl font-bold text-blue-700">{summary.latest_a1c}%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Avg Glucose 30d</p>
              <p className="text-3xl font-bold text-blue-700">{summary.avg_glucose_30d} <span className="text-sm font-normal">mg/dL</span></p>
            </div>
          </div>
        </div>
      </div>

      <RiskIndicators
        overallRisk={analytics.overall_risk}
        glucoseTrend={analytics.glucose_trend}
        activeAlerts={analytics.active_alerts}
      />

      <GlucoseChart readings={glucose} />
    </div>
  )
}
