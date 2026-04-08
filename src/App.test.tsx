import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import App from './App'

// Mock firebase to simulate an authenticated user
vi.mock('./services/firebase', () => ({
  loginWithEmail: vi.fn(),
  loginWithGoogle: vi.fn(),
  logout: vi.fn(),
  getIdToken: vi.fn().mockResolvedValue('mock-token'),
  onAuthStateChanged: vi.fn((callback: (user: unknown) => void) => {
    callback({ email: 'test@example.com' })
    return () => {}
  }),
}))

describe('App', () => {
  it('renders the Cerelien AI heading when authenticated', () => {
    render(<App />)
    expect(screen.getByText('Cerelien AI')).toBeInTheDocument()
  })
})
