import { useEffect, useRef } from 'react'
import { useChat } from '../../hooks/useChat'
import { MessageBubble } from './MessageBubble'
import { AgentIndicator } from './AgentIndicator'
import { ChatInput } from './ChatInput'

interface ChatWindowProps {
  patientId: string
}

const PROMPT_SUGGESTIONS = [
  'Review latest glucose trends',
  'What are the current risk factors?',
  'Recommend medication adjustments',
]

export function ChatWindow({ patientId }: ChatWindowProps) {
  const { messages, loading, sendMessage } = useChat(patientId)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  return (
    <div
      className="flex flex-col h-[calc(100vh-8rem)] rounded-2xl overflow-hidden animate-fadeIn"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4"
        style={{
          borderBottom: '1px solid var(--color-border)',
          background: 'linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-surface) 100%)',
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 4h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H7l-4 3V5a1 1 0 0 1 1-1z" />
            </svg>
          </div>
          <div>
            <h2 className="text-base font-semibold" style={{ color: 'var(--color-text)' }}>AI Consultation</h2>
            <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Multi-agent care team</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5" style={{ backgroundColor: 'var(--color-bg)' }}>
        {messages.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center h-full text-center animate-fadeIn">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
              style={{ backgroundColor: 'var(--color-primary-light)' }}
            >
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path d="M16 4C16 4 8 8 8 16C8 20.4183 11.5817 24 16 24C20.4183 24 24 20.4183 24 16C24 8 16 4 16 4Z" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <path d="M10 16H22" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h2
              className="text-2xl font-bold mb-2"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: 'var(--color-text)' }}
            >
              Welcome to Cerelien AI
            </h2>
            <p className="text-base mb-6 max-w-md" style={{ color: 'var(--color-text-secondary)' }}>
              Ask questions about your patient's health data, glucose trends, or care recommendations.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {PROMPT_SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="px-4 py-2 text-sm rounded-full transition-all duration-200"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-primary)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-primary-light)'
                    e.currentTarget.style.borderColor = 'var(--color-primary)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-surface)'
                    e.currentTarget.style.borderColor = 'var(--color-border)'
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <AgentIndicator visible={loading} />
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSend={sendMessage} disabled={loading} />
    </div>
  )
}
