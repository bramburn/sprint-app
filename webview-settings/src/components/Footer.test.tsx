import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Footer from './Footer'

describe('Footer Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Footer status="saved" />)
    expect(container).toBeTruthy()
  })

  it('renders saved status', () => {
    render(<Footer status="saved" />)
    expect(screen.getByText('Saved ✓')).toBeInTheDocument()
  })

  it('renders saving status', () => {
    render(<Footer status="saving" />)
    expect(screen.getByText('Saving...')).toBeInTheDocument()
  })

  it('renders error status', () => {
    render(<Footer status="error" />)
    expect(screen.getByText('Error saving settings')).toBeInTheDocument()
  })

  it('calls onRetry when retry button is clicked', () => {
    const mockRetry = vi.fn()
    render(<Footer status="error" onRetry={mockRetry} />)

    const retryButton = screen.getByText('Retry')
    fireEvent.click(retryButton)

    expect(mockRetry).toHaveBeenCalled()
  })

  it('does not show retry button for non-error status', () => {
    const { container } = render(<Footer status="saved" />)
    const retryButton = container.querySelector('button')
    expect(retryButton).toBeNull()
  })
})
