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
          className="px-8 py-4 text-lg font-semibold text-white bg-green-600 rounded-full hover:bg-green-700 transition-colors shadow-lg"
          aria-label="Start Call"
        >
          Start Call
        </button>
      </div>
    )
  }

  return (
    <div className="flex justify-center gap-4">
      {status === 'connected' && (
        <button
          onClick={onToggleMute}
          className={`px-6 py-4 text-lg font-semibold rounded-full transition-colors shadow-lg ${
            muted
              ? 'bg-yellow-500 text-white hover:bg-yellow-600'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          aria-label={muted ? 'Unmute' : 'Mute'}
        >
          {muted ? 'Unmute' : 'Mute'}
        </button>
      )}
      <button
        onClick={onEndCall}
        className="px-8 py-4 text-lg font-semibold text-white bg-red-600 rounded-full hover:bg-red-700 transition-colors shadow-lg"
        aria-label="End Call"
      >
        End Call
      </button>
    </div>
  )
}
