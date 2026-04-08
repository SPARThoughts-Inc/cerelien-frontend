import Markdown from 'react-markdown'
import type { ChatMessage } from '../../hooks/useChat'

interface MessageBubbleProps {
  message: ChatMessage
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className="max-w-[80%] rounded-2xl px-5 py-3 transition-all duration-200"
        style={
          isUser
            ? {
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                borderBottomRightRadius: '4px',
              }
            : {
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderLeft: '3px solid var(--color-primary)',
                color: 'var(--color-text)',
                borderBottomLeftRadius: '4px',
              }
        }
      >
        {message.agentName && !isUser && (
          <span
            className="inline-block text-xs font-medium rounded-full px-2.5 py-0.5 mb-2"
            style={{
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary-dark)',
            }}
          >
            {message.agentName}
          </span>
        )}
        <div className={`prose prose-lg ${isUser ? 'prose-invert' : ''}`}>
          {isUser ? (
            <p className="m-0">{message.content}</p>
          ) : (
            <Markdown>{message.content}</Markdown>
          )}
        </div>
        <p
          className="text-xs mt-2"
          style={{ color: isUser ? 'rgba(255,255,255,0.6)' : 'var(--color-text-secondary)', opacity: 0.7 }}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  )
}
