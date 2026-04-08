import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockRegister = vi.fn()
const mockDestroy = vi.fn()
const mockConnect = vi.fn().mockResolvedValue({})

vi.mock('@twilio/voice-sdk', () => ({
  Device: class MockDevice {
    register = mockRegister
    destroy = mockDestroy
    connect = mockConnect
  },
}))

vi.mock('./api', () => ({
  api: {
    get: vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ token: 'mock-twilio-token' }),
    }),
  },
}))

describe('twilio-device', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.resetModules()
  })

  it('initTwilioDevice fetches token and creates device', async () => {
    const { initTwilioDevice } = await import('./twilio-device')
    await initTwilioDevice('test-user')
    expect(mockRegister).toHaveBeenCalled()
  })

  it('getDevice returns null before init', async () => {
    const { getDevice } = await import('./twilio-device')
    expect(getDevice()).toBeNull()
  })

  it('makeCall throws if device not initialized', async () => {
    const { makeCall } = await import('./twilio-device')
    expect(() => makeCall({ identity: 'test' })).toThrow('Twilio device not initialized')
  })

  it('destroyDevice cleans up', async () => {
    const { initTwilioDevice, destroyDevice, getDevice } = await import('./twilio-device')
    await initTwilioDevice('test-user')
    destroyDevice()
    expect(mockDestroy).toHaveBeenCalled()
    expect(getDevice()).toBeNull()
  })
})
