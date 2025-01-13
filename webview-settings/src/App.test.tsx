import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import App from './App'

// Mock the VSCode hook
vi.mock('@sprint-app/shared/react/hooks/vscode-hooks', () => ({
  useVSCode: () => ({
    postMessage: vi.fn()
  })
}))

describe('App Component', () => {
  it('renders sidebar with correct tabs', () => {
    render(<App />)

    const expectedTabs = ['General', 'Models', 'Features', 'Beta', 'Debug']
    expectedTabs.forEach(tab => {
      expect(screen.getByText(tab)).toBeInTheDocument()
    })
  })

  it('renders general settings by default', () => {
    render(<App />)

    expect(screen.getByText('Account')).toBeInTheDocument()
    expect(screen.getByText('VS Code Import')).toBeInTheDocument()
    expect(screen.getByText('Rules for AI')).toBeInTheDocument()
  })

  it('switches tabs when sidebar item is clicked', () => {
    render(<App />)

    const modelsTab = screen.getByText('Models')
    fireEvent.click(modelsTab)

    expect(screen.getByText('Models settings coming soon...')).toBeInTheDocument()
  })

  it('renders footer with saved status', () => {
    render(<App />)
    expect(screen.getByText('Saved ✓')).toBeInTheDocument()
  })
})
