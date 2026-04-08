import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the Cerelien AI heading', () => {
    render(<App />)
    expect(screen.getByText('Cerelien AI')).toBeInTheDocument()
  })
})
