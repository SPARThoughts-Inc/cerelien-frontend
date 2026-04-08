import { Device } from '@twilio/voice-sdk'
import { api } from './api'

let device: Device | null = null

export async function initTwilioDevice(identity: string): Promise<Device> {
  const response = await api.get(`/api/voice/token?identity=${encodeURIComponent(identity)}`)
  const data = await response.json()
  const token = data.token as string

  device = new Device(token)

  await device.register()
  return device
}

export function getDevice(): Device | null {
  return device
}

export function makeCall(params: Record<string, string>) {
  if (!device) throw new Error('Twilio device not initialized')
  return device.connect({ params })
}

export function destroyDevice() {
  if (device) {
    device.destroy()
    device = null
  }
}
