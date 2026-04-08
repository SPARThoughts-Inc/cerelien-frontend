import { useState, useEffect, useRef, useCallback } from 'react'
import type { Call } from '@twilio/voice-sdk'
import { initTwilioDevice, destroyDevice, makeCall, getDevice } from '../services/twilio-device'

export type CallStatus = 'idle' | 'connecting' | 'connected' | 'disconnected'

export function useVoice(identity: string) {
  const [status, setStatus] = useState<CallStatus>('idle')
  const [muted, setMuted] = useState(false)
  const callRef = useRef<Call | null>(null)

  useEffect(() => {
    if (!identity) return

    initTwilioDevice(identity).catch((err) => {
      console.error('Failed to initialize Twilio device:', err)
    })

    return () => {
      destroyDevice()
    }
  }, [identity])

  const startCall = useCallback(async () => {
    try {
      setStatus('connecting')
      const device = getDevice()
      if (!device) {
        await initTwilioDevice(identity)
      }
      const call = await makeCall({ identity })
      callRef.current = call

      call.on('accept', () => {
        setStatus('connected')
      })

      call.on('disconnect', () => {
        setStatus('disconnected')
        callRef.current = null
        setMuted(false)
      })

      call.on('error', (error: Error) => {
        console.error('Call error:', error)
        setStatus('disconnected')
        callRef.current = null
        setMuted(false)
      })
    } catch (error) {
      console.error('Failed to start call:', error)
      setStatus('disconnected')
    }
  }, [identity])

  const endCall = useCallback(() => {
    if (callRef.current) {
      callRef.current.disconnect()
      callRef.current = null
    }
    setStatus('disconnected')
    setMuted(false)
  }, [])

  const toggleMute = useCallback(() => {
    if (callRef.current) {
      const newMuted = !muted
      callRef.current.mute(newMuted)
      setMuted(newMuted)
    }
  }, [muted])

  return { status, muted, startCall, endCall, toggleMute }
}
