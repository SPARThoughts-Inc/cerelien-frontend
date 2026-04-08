import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MessageBubble } from './MessageBubble'
import type { ChatMessage } from '../../hooks/useChat'

describe('MessageBubble', () => {
  const userMessage: ChatMessage = {
    id: '1',
    role: 'user',
    content: 'Hello doctor',
    timestamp: new Date('2026-01-01T12:00:00'),
  }

  const assistantMessage: ChatMessage = {
    id: '2',
    role: 'assistant',
    content: 'Hello! How can I help?',
    agentName: 'Triage Agent',
    timestamp: new Date('2026-01-01T12:01:00'),
  }

  it('renders user message content', () => {
    render(<MessageBubble message={userMessage} />)
    expect(screen.getByText('Hello doctor')).toBeInTheDocument()
  })

  it('renders assistant message content', () => {
    render(<MessageBubble message={assistantMessage} />)
    expect(screen.getByText('Hello! How can I help?')).toBeInTheDocument()
  })

  it('shows agent name badge for assistant messages', () => {
    render(<MessageBubble message={assistantMessage} />)
    expect(screen.getByText('Triage Agent')).toBeInTheDocument()
  })

  it('does not show agent name for user messages', () => {
    render(<MessageBubble message={userMessage} />)
    expect(screen.queryByText('Triage Agent')).not.toBeInTheDocument()
  })

  it('renders timestamp', () => {
    render(<MessageBubble message={userMessage} />)
    expect(screen.getByText(/12:00/)).toBeInTheDocument()
  })
})
