import type { CallStatus } from '../../hooks/useVoice'

interface CallControlsProps {
  status: CallStatus
  muted: boolean
  onStartCall: () => void
  onEndCall: () => void
  onToggleMute: () => void
}

export function CallControls({ status, muted, onStartCall, onEndCall, onToggleMute }: CallControlsProps) {
  if (status === 'idle' || status === 'disconnected') {
    return (
      <div className="flex justify-center">
        <button
          onClick={onStartCall}
          className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200"
          style={{
            backgroundColor: 'var(--color-success)',
            color: 'white',
            boxShadow: '0 4px 12px rgba(47, 133, 90, 0.3)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
          aria-label="Start Call"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </button>
      </div>
    )
  }

  return (
    <div className="flex justify-center gap-5">
      {status === 'connected' && (
        <button
          onClick={onToggleMute}
          className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200"
          style={{
            backgroundColor: muted ? 'var(--color-warning)' : 'var(--color-border)',
            color: muted ? 'white' : 'var(--color-text-secondary)',
            boxShadow: muted ? '0 4px 12px rgba(214, 158, 46, 0.3)' : 'none',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
          aria-label={muted ? 'Unmute' : 'Mute'}
        >
          {muted ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="1" y1="1" x2="23" y2="23" />
              <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
              <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2c0 .87-.16 1.71-.46 2.49" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          )}
        </button>
      )}
      <button
        onClick={onEndCall}
        className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200"
        style={{
          backgroundColor: 'var(--color-danger)',
          color: 'white',
          boxShadow: '0 4px 12px rgba(197, 48, 48, 0.3)',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)' }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
        aria-label="End Call"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
      </button>
    </div>
  )
}
