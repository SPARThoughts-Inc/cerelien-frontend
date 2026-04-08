import { useAuth } from '../../hooks/useAuth'
import { logout } from '../../services/firebase'

export function Header() {
  const { user } = useAuth()

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-gray-200">
      <h1 className="text-xl font-bold text-gray-900">Cerelien AI</h1>
      <div className="flex items-center gap-4">
        {user?.email && (
          <span className="text-base text-gray-600">{user.email}</span>
        )}
        <button
          onClick={() => void logout()}
          className="px-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
        >
          Sign out
        </button>
      </div>
    </header>
  )
}
