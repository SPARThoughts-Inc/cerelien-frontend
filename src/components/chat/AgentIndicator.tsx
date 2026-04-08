interface AgentIndicatorProps {
  visible: boolean
}

export function AgentIndicator({ visible }: AgentIndicatorProps) {
  if (!visible) return null

  return (
    <div className="flex items-center gap-3 px-5 py-3">
      <div className="flex gap-1.5">
        <span
          className="w-2 h-2 rounded-full animate-dotBounce"
          style={{ backgroundColor: 'var(--color-primary)', animationDelay: '0ms' }}
        />
        <span
          className="w-2 h-2 rounded-full animate-dotBounce"
          style={{ backgroundColor: 'var(--color-primary)', animationDelay: '150ms' }}
        />
        <span
          className="w-2 h-2 rounded-full animate-dotBounce"
          style={{ backgroundColor: 'var(--color-primary)', animationDelay: '300ms' }}
        />
      </div>
      <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>AI is thinking...</span>
    </div>
  )
}
