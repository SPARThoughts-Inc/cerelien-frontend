import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { LoginPage } from './LoginPage'

const mockLoginWithEmail = vi.fn()
const mockLoginWithGoogle = vi.fn()

vi.mock('../../services/firebase', () => ({
  loginWithEmail: (...args: unknown[]) => mockLoginWithEmail(...args),
  loginWithGoogle: (...args: unknown[]) => mockLoginWithGoogle(...args),
}))

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockLoginWithEmail.mockResolvedValue({})
    mockLoginWithGoogle.mockResolvedValue({})
  })

  it('renders the email label', () => {
    render(<LoginPage />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('renders the password label', () => {
    render(<LoginPage />)
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
  })

  it('renders the Sign In button', () => {
    render(<LoginPage />)
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('renders the Continue with Google button', () => {
    render(<LoginPage />)
    expect(screen.getByRole('button', { name: /continue with google/i })).toBeInTheDocument()
  })

  it('calls loginWithEmail on form submit', async () => {
    const user = userEvent.setup()
    render(<LoginPage />)

    await user.type(screen.getByLabelText('Email'), 'test@example.com')
    await user.type(screen.getByLabelText('Password'), 'password123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(mockLoginWithEmail).toHaveBeenCalledWith('test@example.com', 'password123')
    })
  })

  it('displays error on failed email login', async () => {
    mockLoginWithEmail.mockRejectedValue(new Error('Invalid credentials'))
    const user = userEvent.setup()
    render(<LoginPage />)

    await user.type(screen.getByLabelText('Email'), 'bad@example.com')
    await user.type(screen.getByLabelText('Password'), 'wrong')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Invalid credentials')
    })
  })

  it('calls loginWithGoogle on Google button click', async () => {
    const user = userEvent.setup()
    render(<LoginPage />)

    await user.click(screen.getByRole('button', { name: /continue with google/i }))

    await waitFor(() => {
      expect(mockLoginWithGoogle).toHaveBeenCalled()
    })
  })

  it('displays error on failed Google login', async () => {
    mockLoginWithGoogle.mockRejectedValue(new Error('Google auth failed'))
    const user = userEvent.setup()
    render(<LoginPage />)

    await user.click(screen.getByRole('button', { name: /continue with google/i }))

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Google auth failed')
    })
  })
})
