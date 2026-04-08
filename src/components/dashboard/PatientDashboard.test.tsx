import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { PatientDashboard } from './PatientDashboard'

vi.mock('../../services/api', () => ({
  api: {
    get: vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    ),
  },
}))

vi.mock('../../services/firebase', () => ({
  getIdToken: vi.fn().mockResolvedValue('mock-token'),
}))

describe('PatientDashboard', () => {
  it('renders loading state initially', () => {
    render(<PatientDashboard patientId="test-patient" />)
    expect(screen.getByText('Loading patient data...')).toBeInTheDocument()
  })

  it('has a status role element for loading', () => {
    render(<PatientDashboard patientId="test-patient" />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })
})
