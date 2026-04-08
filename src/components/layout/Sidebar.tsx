interface NavItem {
  label: string
  icon: React.ReactNode
  path: string
}

function ChartBarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="10" width="4" height="8" rx="1" />
      <rect x="8" y="6" width="4" height="12" rx="1" />
      <rect x="14" y="2" width="4" height="16" rx="1" />
    </svg>
  )
}

function MessageIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 4h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H7l-4 3V5a1 1 0 0 1 1-1z" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 3.5A1.5 1.5 0 0 1 3.5 2h2.7a1 1 0 0 1 .95.68l1.2 3.6a1 1 0 0 1-.5 1.2L6.2 8.6a10 10 0 0 0 5.2 5.2l1.12-1.65a1 1 0 0 1 1.2-.5l3.6 1.2a1 1 0 0 1 .68.95v2.7A1.5 1.5 0 0 1 16.5 18 14.5 14.5 0 0 1 2 3.5z" />
    </svg>
  )
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: <ChartBarIcon />, path: '/dashboard' },
  { label: 'Chat', icon: <MessageIcon />, path: '/chat' },
  { label: 'Voice', icon: <PhoneIcon />, path: '/voice' },
]

interface SidebarProps {
  activePath: string
  onNavigate: (path: string) => void
}

export function Sidebar({ activePath, onNavigate }: SidebarProps) {
  return (
    <nav
      className="w-64 min-h-screen flex flex-col p-4"
      style={{ background: 'linear-gradient(180deg, #0A4D44 0%, #0F6B5E 100%)' }}
    >
      {/* Brand */}
      <div className="px-4 pt-4 pb-6 mb-2">
        <div className="flex items-center gap-3 mb-1">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
          >
            <svg width="20" height="20" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path d="M16 4C16 4 8 8 8 16C8 20.4183 11.5817 24 16 24C20.4183 24 24 20.4183 24 16C24 8 16 4 16 4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <path d="M10 16H22" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="text-xl font-bold text-white" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>Cerelien</span>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.9)' }}>AI</span>
        </div>
        <p className="text-xs pl-12" style={{ color: 'rgba(255,255,255,0.5)' }}>Diabetes Consultation</p>
      </div>

      {/* Nav Items */}
      <div className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => {
          const isActive = activePath === item.path
          return (
            <button
              key={item.path}
              onClick={() => onNavigate(item.path)}
              className="flex items-center gap-3 w-full px-4 py-3 text-[15px] rounded-xl transition-all duration-200 text-left"
              style={{
                backgroundColor: isActive ? 'rgba(255,255,255,0.95)' : 'transparent',
                color: isActive ? 'var(--color-primary-dark)' : 'rgba(255,255,255,0.8)',
                fontWeight: isActive ? 600 : 400,
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {item.label}
            </button>
          )
        })}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 mt-auto">
        <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.35)' }}>Powered by Cerelien AI</p>
      </div>
    </nav>
  )
}
