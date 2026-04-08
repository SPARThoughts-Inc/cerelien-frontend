import { useEffect, useRef } from 'react'
import { useChat } from '../../hooks/useChat'
import { MessageBubble } from './MessageBubble'
import { AgentIndicator } from './AgentIndicator'
import { ChatInput } from './ChatInput'

interface ChatWindowProps {
  patientId: string
}

export function ChatWindow({ patientId }: ChatWindowProps) {
  const { messages, loading, sendMessage } = useChat(patientId)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-5xl mb-4">💬</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">Welcome to Cerelien AI</h2>
            <p className="text-lg text-gray-500 max-w-md">
              Ask questions about your patient's health data, glucose trends, or care recommendations.
            </p>
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
