import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useChat } from './useChat'

vi.mock('../services/firebase', () => ({
  getIdToken: vi.fn().mockResolvedValue('mock-token'),
}))

function createMockReadableStream(chunks: string[]) {
  let index = 0
  return {
    getReader() {
      return {
        async read() {
          if (index >= chunks.length) {
            return { done: true, value: undefined }
          }
          const value = new TextEncoder().encode(chunks[index++])
          return { done: false, value }
        },
      }
    },
  }
}

describe('useChat', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('starts with empty messages and not loading', () => {
    const { result } = renderHook(() => useChat('patient-1'))
    expect(result.current.messages).toEqual([])
    expect(result.current.loading).toBe(false)
  })

  it('adds user message and streams assistant response', async () => {
    const mockStream = createMockReadableStream([
      'data: Hello\n',
      'data:  world\n',
      'data: [DONE]\n',
    ])

    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      body: mockStream,
    } as unknown as Response)

    const { result } = renderHook(() => useChat('patient-1'))

    await act(async () => {
      await result.current.sendMessage('Hi')
    })

    expect(result.current.messages.length).toBe(2)
    expect(result.current.messages[0].role).toBe('user')
    expect(result.current.messages[0].content).toBe('Hi')
    expect(result.current.messages[1].role).toBe('assistant')
    expect(result.current.messages[1].content).toBe('Hello world')
    expect(result.current.loading).toBe(false)
  })

  it('handles fetch error gracefully', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'))

    const { result } = renderHook(() => useChat('patient-1'))

    await act(async () => {
      await result.current.sendMessage('Hi')
    })

    expect(result.current.messages.length).toBe(2)
    expect(result.current.messages[1].content).toContain('something went wrong')
    expect(result.current.loading).toBe(false)
  })

  it('handles non-ok response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      body: null,
    } as unknown as Response)

    const { result } = renderHook(() => useChat('patient-1'))

    await act(async () => {
      await result.current.sendMessage('Hi')
    })

    expect(result.current.messages[1].content).toContain('something went wrong')
  })
})
