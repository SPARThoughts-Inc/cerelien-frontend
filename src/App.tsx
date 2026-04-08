import { useState } from 'react'
import { AuthGuard } from './components/auth/AuthGuard'
import { AppShell } from './components/layout/AppShell'

function AppContent() {
  const [activePath, setActivePath] = useState('/dashboard')
  return (
    <AppShell activePath={activePath} onNavigate={setActivePath}>
      <div className="text-gray-600">
        {activePath === '/dashboard' && <p>Dashboard coming soon...</p>}
        {activePath === '/chat' && <p>Chat coming soon...</p>}
        {activePath === '/voice' && <p>Voice coming soon...</p>}
      </div>
    </AppShell>
  )
}

function App() {
  return (
    <AuthGuard>
      <AppContent />
    </AuthGuard>
  )
}

export default App
