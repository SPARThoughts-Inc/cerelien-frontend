import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { RiskIndicators } from './RiskIndicators'

describe('RiskIndicators', () => {
  it('renders overall risk score', () => {
    render(<RiskIndicators overallRisk={42} glucoseTrend="stable" activeAlerts={1} />)
    expect(screen.getByText('42')).toBeInTheDocument()
    expect(screen.getByText('/100')).toBeInTheDocument()
  })

  it('renders glucose trend', () => {
    render(<RiskIndicators overallRisk={42} glucoseTrend="improving" activeAlerts={0} />)
    expect(screen.getByText('Improving')).toBeInTheDocument()
  })

  it('renders active alerts count', () => {
    render(<RiskIndicators overallRisk={42} glucoseTrend="stable" activeAlerts={3} />)
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('renders worsening trend in red', () => {
    render(<RiskIndicators overallRisk={80} glucoseTrend="worsening" activeAlerts={2} />)
    expect(screen.getByText('Worsening')).toBeInTheDocument()
  })

  it('renders all labels', () => {
    render(<RiskIndicators overallRisk={25} glucoseTrend="stable" activeAlerts={0} />)
    expect(screen.getByText('Overall Risk')).toBeInTheDocument()
    expect(screen.getByText('Glucose Trend')).toBeInTheDocument()
    expect(screen.getByText('Active Alerts')).toBeInTheDocument()
  })
})
