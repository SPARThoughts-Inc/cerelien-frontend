import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useVoice } from './useVoice'

const mockOn = vi.fn()
const mockDisconnect = vi.fn()
const mockMute = vi.fn()

vi.mock('../services/twilio-device', () => ({
  initTwilioDevice: vi.fn().mockResolvedValue(undefined),
  destroyDevice: vi.fn(),
  getDevice: vi.fn().mockReturnValue({}),
  makeCall: vi.fn().mockResolvedValue({
    on: (...args: unknown[]) => mockOn(...args),
    disconnect: () => mockDisconnect(),
    mute: (val: boolean) => mockMute(val),
  }),
}))

describe('useVoice', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockOn.mockReset()
  })

  it('starts with idle status', () => {
    const { result } = renderHook(() => useVoice('test-user'))
    expect(result.current.status).toBe('idle')
    expect(result.current.muted).toBe(false)
  })

  it('sets connecting status when startCall is invoked', async () => {
    const { result } = renderHook(() => useVoice('test-user'))

    await act(async () => {
      await result.current.startCall()
    })

    expect(mockOn).toHaveBeenCalledWith('accept', expect.any(Function))
    expect(mockOn).toHaveBeenCalledWith('disconnect', expect.any(Function))
    expect(mockOn).toHaveBeenCalledWith('error', expect.any(Function))
  })

  it('transitions to connected when accept event fires', async () => {
    const { result } = renderHook(() => useVoice('test-user'))

    await act(async () => {
      await result.current.startCall()
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const acceptHandler = mockOn.mock.calls.find(
      (c: any) => c[0] === 'accept'
    )?.[1]

    await act(async () => {
      acceptHandler?.()
    })

    expect(result.current.status).toBe('connected')
  })

  it('endCall disconnects the call', async () => {
    const { result } = renderHook(() => useVoice('test-user'))

    await act(async () => {
      await result.current.startCall()
    })

    act(() => {
      result.current.endCall()
    })

    expect(result.current.status).toBe('disconnected')
  })
})
