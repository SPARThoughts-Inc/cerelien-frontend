import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { AppShell } from './AppShell'

vi.mock('../../services/firebase', () => ({
  logout: vi.fn(),
  onAuthStateChanged: vi.fn((callback: (user: unknown) => void) => {
    callback({ email: 'user@test.com' })
    return () => {}
  }),
}))

describe('AppShell', () => {
  it('renders sidebar nav items and children', () => {
    const onNavigate = vi.fn()
    render(
      <AppShell activePath="/dashboard" onNavigate={onNavigate}>
        <p>Test content</p>
      </AppShell>
    )

    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Chat')).toBeInTheDocument()
    expect(screen.getByText('Voice')).toBeInTheDocument()
    expect(screen.getByText('Test content')).toBeInTheDocument()
    expect(screen.getByText('Cerelien AI')).toBeInTheDocument()
  })

  it('calls onNavigate when a nav item is clicked', async () => {
    const user = userEvent.setup()
    const onNavigate = vi.fn()
    render(
      <AppShell activePath="/dashboard" onNavigate={onNavigate}>
        <p>Content</p>
      </AppShell>
    )

    await user.click(screen.getByText('Chat'))
    expect(onNavigate).toHaveBeenCalledWith('/chat')
  })

  it('shows user email in header', () => {
    render(
      <AppShell activePath="/dashboard" onNavigate={vi.fn()}>
        <p>Content</p>
      </AppShell>
    )
    expect(screen.getByText('user@test.com')).toBeInTheDocument()
  })

  it('renders sign out button', () => {
    render(
      <AppShell activePath="/dashboard" onNavigate={vi.fn()}>
        <p>Content</p>
      </AppShell>
    )
    expect(screen.getByText('Sign out')).toBeInTheDocument()
  })
})
