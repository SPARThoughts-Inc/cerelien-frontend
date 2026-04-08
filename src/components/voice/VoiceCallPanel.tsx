import { useVoice } from '../../hooks/useVoice'
import { CallControls } from './CallControls'
import type { CallStatus } from '../../hooks/useVoice'

interface VoiceCallPanelProps {
  identity: string
}

const statusConfig: Record<CallStatus, { label: string; color: string }> = {
  idle: { label: 'Ready', color: 'var(--color-text-secondary)' },
  connecting: { label: 'Connecting...', color: 'var(--color-warning)' },
  connected: { label: 'Connected', color: 'var(--color-success)' },
  disconnected: { label: 'Disconnected', color: 'var(--color-text-secondary)' },
}

export function VoiceCallPanel({ identity }: VoiceCallPanelProps) {
  const { status, muted, startCall, endCall, toggleMute } = useVoice(identity)
  const { label, color } = statusConfig[status]

  return (
    <div
      className="flex flex-col items-center justify-center h-[calc(100vh-8rem)] rounded-2xl animate-fadeIn"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      <h2
        className="text-2xl font-bold mb-10"
        style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: 'var(--color-text)' }}
      >
        Voice Consultation
      </h2>

      {/* Pulse rings + icon */}
      <div className="relative mb-8">
        {status === 'connected' && (
          <>
            <div
              className="absolute inset-0 rounded-full animate-pulseRing"
              style={{ backgroundColor: 'var(--color-primary)', opacity: 0.15 }}
            />
            <div
              className="absolute -inset-3 rounded-full animate-pulseRing"
              style={{ backgroundColor: 'var(--color-primary)', opacity: 0.08, animationDelay: '0.5s' }}
            />
          </>
        )}
        <div
          className="relative w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            backgroundColor: status === 'connected' ? 'var(--color-primary-light)' : 'var(--color-bg)',
            border: `3px solid ${status === 'connected' ? 'var(--color-primary)' : 'var(--color-border)'}`,
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke={status === 'connected' ? 'var(--color-primary)' : 'var(--color-text-secondary)'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
        </div>
      </div>

      <p className="text-xl font-semibold mb-8" style={{ color }}>{label}</p>

      {/* Call quality indicator when connected */}
      {status === 'connected' && (
        <div className="flex items-center gap-2 mb-6">
          <div className="flex gap-0.5">
            <div className="w-1 h-2 rounded-full" style={{ backgroundColor: 'var(--color-success)' }} />
            <div className="w-1 h-3 rounded-full" style={{ backgroundColor: 'var(--color-success)' }} />
            <div className="w-1 h-4 rounded-full" style={{ backgroundColor: 'var(--color-success)' }} />
            <div className="w-1 h-5 rounded-full" style={{ backgroundColor: 'var(--color-success)' }} />
          </div>
          <span className="text-xs font-medium" style={{ color: 'var(--color-success)' }}>Excellent</span>
        </div>
      )}

      <CallControls
        status={status}
        muted={muted}
        onStartCall={startCall}
        onEndCall={endCall}
        onToggleMute={toggleMute}
      />
    </div>
  )
}
