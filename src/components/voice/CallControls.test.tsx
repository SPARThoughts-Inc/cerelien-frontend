import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { CallControls } from './CallControls'

describe('CallControls', () => {
  const defaultProps = {
    muted: false,
    onStartCall: vi.fn(),
    onEndCall: vi.fn(),
    onToggleMute: vi.fn(),
  }

  it('shows Start Call button when idle', () => {
    render(<CallControls {...defaultProps} status="idle" />)
    expect(screen.getByRole('button', { name: /start call/i })).toBeInTheDocument()
  })

  it('shows Start Call button when disconnected', () => {
    render(<CallControls {...defaultProps} status="disconnected" />)
    expect(screen.getByRole('button', { name: /start call/i })).toBeInTheDocument()
  })

  it('shows End Call and Mute when connected', () => {
    render(<CallControls {...defaultProps} status="connected" />)
    expect(screen.getByRole('button', { name: /end call/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /mute/i })).toBeInTheDocument()
  })

  it('shows Unmute when muted and connected', () => {
    render(<CallControls {...defaultProps} status="connected" muted={true} />)
    expect(screen.getByRole('button', { name: /unmute/i })).toBeInTheDocument()
  })

  it('calls onStartCall when Start Call clicked', async () => {
    const user = userEvent.setup()
    const onStartCall = vi.fn()
    render(<CallControls {...defaultProps} status="idle" onStartCall={onStartCall} />)
    await user.click(screen.getByRole('button', { name: /start call/i }))
    expect(onStartCall).toHaveBeenCalled()
  })

  it('shows End Call when connecting', () => {
    render(<CallControls {...defaultProps} status="connecting" />)
    expect(screen.getByRole('button', { name: /end call/i })).toBeInTheDocument()
  })
})
