interface NavItem {
  label: string
  icon: string
  path: string
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: '\u{1F4CA}', path: '/dashboard' },
  { label: 'Chat', icon: '\u{1F4AC}', path: '/chat' },
  { label: 'Voice', icon: '\u{1F4DE}', path: '/voice' },
]

interface SidebarProps {
  activePath: string
  onNavigate: (path: string) => void
}

export function Sidebar({ activePath, onNavigate }: SidebarProps) {
  return (
    <nav className="w-64 min-h-screen bg-blue-900 text-white p-4 flex flex-col gap-2">
      <div className="text-2xl font-bold px-4 py-4 mb-4">Menu</div>
      {navItems.map((item) => {
        const isActive = activePath === item.path
        return (
          <button
            key={item.path}
            onClick={() => onNavigate(item.path)}
            className={`flex items-center gap-3 w-full px-4 py-3 text-lg rounded-xl transition text-left ${
              isActive
                ? 'bg-blue-700 text-white font-semibold'
                : 'text-blue-100 hover:bg-blue-800'
            }`}
          >
            <span className="text-xl" aria-hidden="true">{item.icon}</span>
            {item.label}
          </button>
        )
      })}
    </nav>
  )
}
