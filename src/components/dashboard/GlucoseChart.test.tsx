import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { GlucoseChart } from './GlucoseChart'

describe('GlucoseChart', () => {
  it('renders heading', () => {
    render(<GlucoseChart readings={[]} />)
    expect(screen.getByText('Glucose Readings (Last 24)')).toBeInTheDocument()
  })

  it('shows no data message when empty', () => {
    render(<GlucoseChart readings={[]} />)
    expect(screen.getByText('No glucose data available')).toBeInTheDocument()
  })

  it('renders bars for readings', () => {
    const readings = [
      { timestamp: '2026-01-01T12:00:00', value: 120 },
      { timestamp: '2026-01-01T13:00:00', value: 200 },
    ]
    const { container } = render(<GlucoseChart readings={readings} />)
    const bars = container.querySelectorAll('.bg-green-500, .bg-red-500')
    // 2 bars + 2 legend dots = 4
    expect(bars.length).toBe(4)
  })

  it('renders legend', () => {
    render(<GlucoseChart readings={[]} />)
    expect(screen.getByText(/In range/)).toBeInTheDocument()
    expect(screen.getByText(/Out of range/)).toBeInTheDocument()
  })
})
