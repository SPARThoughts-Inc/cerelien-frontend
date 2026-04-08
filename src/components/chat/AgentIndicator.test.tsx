import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { AgentIndicator } from './AgentIndicator'

describe('AgentIndicator', () => {
  it('shows thinking text when visible', () => {
    render(<AgentIndicator visible={true} />)
    expect(screen.getByText('AI is thinking...')).toBeInTheDocument()
  })

  it('renders nothing when not visible', () => {
    const { container } = render(<AgentIndicator visible={false} />)
    expect(container.firstChild).toBeNull()
  })
})
