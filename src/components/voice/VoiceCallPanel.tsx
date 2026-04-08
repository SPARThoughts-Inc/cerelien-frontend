import { useVoice } from '../../hooks/useVoice'
import { CallControls } from './CallControls'
import type { CallStatus } from '../../hooks/useVoice'

interface VoiceCallPanelProps {
  identity: string
}

const statusConfig: Record<CallStatus, { label: string; color: string }> = {
  idle: { label: 'Ready', color: 'text-gray-500' },
  connecting: { label: 'Connecting...', color: 'text-yellow-600' },
  connected: { label: 'Connected', color: 'text-green-600' },
  disconnected: { label: 'Disconnected', color: 'text-gray-500' },
}

export function VoiceCallPanel({ identity }: VoiceCallPanelProps) {
  const { status, muted, startCall, endCall, toggleMute } = useVoice(identity)
  const { label, color } = statusConfig[status]

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)] bg-gray-50 rounded-xl border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-700 mb-8">Voice Consultation</h2>

      <div
        className={`w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-6 ${
          status === 'connected' ? 'animate-pulse' : ''
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      </div>

      <p className={`text-xl font-semibold mb-8 ${color}`}>{label}</p>

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
