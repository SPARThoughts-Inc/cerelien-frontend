import type { ReactNode } from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

interface AppShellProps {
  children: ReactNode
  activePath: string
  onNavigate: (path: string) => void
}

export function AppShell({ children, activePath, onNavigate }: AppShellProps) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar activePath={activePath} onNavigate={onNavigate} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
