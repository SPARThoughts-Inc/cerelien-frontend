import { useState } from 'react'
import type { FormEvent } from 'react'
import { loginWithEmail, loginWithGoogle } from '../../services/firebase'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await loginWithEmail(email, password)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setError('')
    setLoading(true)
    try {
      await loginWithGoogle()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google sign in failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #E8F5F1 0%, #F7FAFC 50%, #FDF0E7 100%)' }}>
      <div className="w-full max-w-md animate-fadeIn">
        <div className="card-clinical p-8 sm:p-10">
          {/* Logo & Branding */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4" style={{ backgroundColor: 'var(--color-primary)' }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M16 4C16 4 8 8 8 16C8 20.4183 11.5817 24 16 24C20.4183 24 24 20.4183 24 16C24 8 16 4 16 4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <path d="M10 16H22" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M13 12L16 16L19 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <circle cx="16" cy="27" r="1.5" fill="white"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: 'var(--color-text)' }}>Cerelien AI</h1>
            <p className="text-base font-medium" style={{ color: 'var(--color-primary)' }}>AI-Powered Diabetes Consultation</p>
            <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>Equal access to training, education & consultation</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl text-sm" role="alert" style={{ backgroundColor: '#FFF5F5', border: '1px solid #FED7D7', color: 'var(--color-danger)' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 text-base rounded-xl transition-all duration-200"
                style={{
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text)',
                  backgroundColor: 'var(--color-surface)',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-primary)'
                  e.currentTarget.style.boxShadow = '0 0 0 3px var(--color-primary-light)'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 text-base rounded-xl transition-all duration-200"
                style={{
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text)',
                  backgroundColor: 'var(--color-surface)',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-primary)'
                  e.currentTarget.style.boxShadow = '0 0 0 3px var(--color-primary-light)'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-base font-semibold text-white rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: 'var(--color-primary)',
                minHeight: '48px',
              }}
              onMouseEnter={(e) => { if (!loading) e.currentTarget.style.backgroundColor = 'var(--color-primary-dark)' }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-primary)' }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full" style={{ borderTop: '1px solid var(--color-border)' }} />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4" style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text-secondary)' }}>or</span>
            </div>
          </div>

          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3 text-base font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              color: 'var(--color-text)',
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              minHeight: '48px',
            }}
            onMouseEnter={(e) => { if (!loading) e.currentTarget.style.backgroundColor = 'var(--color-bg)' }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-surface)' }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A9.996 9.996 0 0 0 2 12c0 1.61.39 3.14 1.07 4.49l3.77-2.4z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>
        </div>

        {/* Trust indicators */}
        <div className="flex items-center justify-center gap-3 mt-6 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
          <span className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M8 1L2 4v4c0 3.5 2.6 6.8 6 7.9 3.4-1.1 6-4.4 6-7.9V4L8 1zm0 2.2L12 5.5v2.7c0 2.6-1.9 5-4 5.9-2.1-.9-4-3.3-4-5.9V5.5L8 3.2z"/>
            </svg>
            HIPAA Aware
          </span>
          <span style={{ color: 'var(--color-border)' }}>|</span>
          <span className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M8 1a5 5 0 0 0-5 5v2a2 2 0 0 0-1 1.7V13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9.7A2 2 0 0 0 13 8V6a5 5 0 0 0-5-5zm-3 5a3 3 0 1 1 6 0v2H5V6z"/>
            </svg>
            Secure
          </span>
          <span style={{ color: 'var(--color-border)' }}>|</span>
          <span className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-6 7c0-3.3 2.7-6 6-6s6 2.7 6 6H2z"/>
            </svg>
            Confidential
          </span>
        </div>
      </div>
    </div>
  )
}
