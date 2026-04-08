import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ChatWindow } from './ChatWindow'

vi.mock('../../hooks/useChat', () => ({
  useChat: () => ({
    messages: [],
    loading: false,
    sendMessage: vi.fn(),
  }),
}))

describe('ChatWindow', () => {
  it('renders welcome message when no messages', () => {
    render(<ChatWindow patientId="test-patient" />)
    expect(screen.getByText('Welcome to Cerelien AI')).toBeInTheDocument()
  })

  it('renders the chat input field', () => {
    render(<ChatWindow patientId="test-patient" />)
    expect(screen.getByLabelText('Chat message input')).toBeInTheDocument()
  })

  it('renders the send button', () => {
    render(<ChatWindow patientId="test-patient" />)
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument()
  })
})
