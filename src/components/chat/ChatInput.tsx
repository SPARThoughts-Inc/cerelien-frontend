import { useState } from 'react'
import type { FormEvent } from 'react'

interface ChatInputProps {
  onSend: (content: string) => void
  disabled?: boolean
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [text, setText] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setText('')
  }

  const canSend = !disabled && text.trim().length > 0

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 px-5 py-4"
      style={{
        borderTop: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-surface)',
      }}
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
        disabled={disabled}
        className="flex-1 text-base px-5 py-3 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          border: '1px solid var(--color-border)',
          color: 'var(--color-text)',
          backgroundColor: 'var(--color-bg)',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-primary)'
          e.currentTarget.style.boxShadow = '0 0 0 3px var(--color-primary-light)'
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-border)'
          e.currentTarget.style.boxShadow = 'none'
        }}
        aria-label="Chat message input"
      />
      <button
        type="submit"
        disabled={disabled || !text.trim()}
        className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          backgroundColor: canSend ? 'var(--color-primary)' : 'var(--color-border)',
          color: 'white',
          minWidth: '48px',
          minHeight: '48px',
        }}
        aria-label="Send"
      >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="5" y1="10" x2="15" y2="10" />
          <polyline points="11 6 15 10 11 14" />
        </svg>
      </button>
    </form>
  )
}
