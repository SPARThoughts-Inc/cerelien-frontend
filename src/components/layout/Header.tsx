import { useAuth } from '../../hooks/useAuth'
import { logout } from '../../services/firebase'

export function Header() {
  const { user } = useAuth()

  const initial = user?.email ? user.email.charAt(0).toUpperCase() : '?'

  return (
    <header
      className="h-16 flex items-center justify-between px-6"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
      }}
    >
      <h1
        className="text-lg font-bold"
        style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: 'var(--color-text)' }}
      >
        Cerelien AI
      </h1>
      <div className="flex items-center gap-4">
        {user?.email && (
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
              style={{ backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary-dark)' }}
            >
              {initial}
            </div>
            <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{user.email}</span>
          </div>
        )}
        <button
          onClick={() => void logout()}
          className="px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200"
          style={{ color: 'var(--color-text-secondary)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-bg)'
            e.currentTarget.style.color = 'var(--color-text)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
            e.currentTarget.style.color = 'var(--color-text-secondary)'
          }}
        >
          Sign out
        </button>
      </div>
    </header>
  )
}
