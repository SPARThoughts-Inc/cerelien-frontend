import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { VoiceCallPanel } from './VoiceCallPanel'

vi.mock('../../hooks/useVoice', () => ({
  useVoice: () => ({
    status: 'idle',
    muted: false,
    startCall: vi.fn(),
    endCall: vi.fn(),
    toggleMute: vi.fn(),
  }),
}))

describe('VoiceCallPanel', () => {
  it('renders the voice consultation heading', () => {
    render(<VoiceCallPanel identity="test-user" />)
    expect(screen.getByText('Voice Consultation')).toBeInTheDocument()
  })

  it('renders Start Call button in idle state', () => {
    render(<VoiceCallPanel identity="test-user" />)
    expect(screen.getByRole('button', { name: /start call/i })).toBeInTheDocument()
  })

  it('shows Ready status text', () => {
    render(<VoiceCallPanel identity="test-user" />)
    expect(screen.getByText('Ready')).toBeInTheDocument()
  })
})
