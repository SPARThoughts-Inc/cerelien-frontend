import { getIdToken } from './firebase'

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? ''

async function apiFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const token = await getIdToken()
  const headers = new Headers(options.headers)
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }
  if (!headers.has('Content-Type') && options.body) {
    headers.set('Content-Type', 'application/json')
  }
  return fetch(`${API_BASE}${path}`, { ...options, headers })
}

export const api = {
  get: (path: string) => apiFetch(path, { method: 'GET' }),
  post: (path: string, body?: unknown) =>
    apiFetch(path, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    }),
}
