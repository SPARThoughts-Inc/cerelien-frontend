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
        className={`max-w-[80%] rounded-2xl px-5 py-3 ${
          isUser
            ? 'bg-blue-600 text-white'
            : 'bg-white border border-gray-200 text-gray-800'
        }`}
      >
        {message.agentName && !isUser && (
          <span className="inline-block text-xs font-medium bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 mb-2">
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
          className={`text-xs mt-2 ${
            isUser ? 'text-blue-200' : 'text-gray-400'
          }`}
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
