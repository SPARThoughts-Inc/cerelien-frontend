import type { ReactNode } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { LoginPage } from './LoginPage'

interface AuthGuardProps {
  children: ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #E8F5F1 0%, #F7FAFC 100%)' }}>
        <div className="flex flex-col items-center gap-5">
          <div className="relative">
            <div
              className="w-14 h-14 rounded-full animate-gentlePulse"
              style={{ backgroundColor: 'var(--color-primary-light)', border: '3px solid var(--color-primary)' }}
            />
            <svg
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              width="24"
              height="24"
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden="true"
            >
              <path d="M16 4C16 4 8 8 8 16C8 20.4183 11.5817 24 16 24C20.4183 24 24 20.4183 24 16C24 8 16 4 16 4Z" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <path d="M10 16H22" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <p className="text-base font-medium" style={{ color: 'var(--color-text-secondary)' }}>Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginPage />
  }

  return <>{children}</>
}
