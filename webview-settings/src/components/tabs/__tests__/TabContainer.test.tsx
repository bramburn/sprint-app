import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import TabContainer from '../TabContainer'

describe('TabContainer Component', () => {
  const mockTabs = [
    {
      label: 'Tab 1',
      content: <div>Content for Tab 1</div>,
      subTabs: [
        {
          label: 'Subtab 1.1',
          content: <div>Content for Subtab 1.1</div>
        },
        {
          label: 'Subtab 1.2',
          content: <div>Content for Subtab 1.2</div>
        }
      ]
    },
    {
      label: 'Tab 2',
      content: <div>Content for Tab 2</div>
    }
  ]

  it('renders all tab headers', () => {
    render(<TabContainer tabs={mockTabs} />)
    
    mockTabs.forEach(tab => {
      expect(screen.getByText(tab.label)).toBeInTheDocument()
    })
  })

  it('switches between main tabs', () => {
    render(<TabContainer tabs={mockTabs} />)
    
    const tab1 = screen.getByText('Tab 1')
    const tab2 = screen.getByText('Tab 2')
    
    fireEvent.click(tab2)
    expect(screen.getByText('Content for Tab 2')).toBeInTheDocument()
    
    fireEvent.click(tab1)
    expect(screen.getByText('Content for Tab 1')).toBeInTheDocument()
  })

  it('renders subtabs when available', () => {
    render(<TabContainer tabs={mockTabs} />)
    
    const tab1 = screen.getByText('Tab 1')
    fireEvent.click(tab1)
    
    expect(screen.getByText('Subtab 1.1')).toBeInTheDocument()
    expect(screen.getByText('Subtab 1.2')).toBeInTheDocument()
  })

  it('switches between subtabs', () => {
    render(<TabContainer tabs={mockTabs} />)
    
    const tab1 = screen.getByText('Tab 1')
    fireEvent.click(tab1)
    
    const subtab1 = screen.getByText('Subtab 1.1')
    const subtab2 = screen.getByText('Subtab 1.2')
    
    fireEvent.click(subtab2)
    expect(screen.getByText('Content for Subtab 1.2')).toBeInTheDocument()
    
    fireEvent.click(subtab1)
    expect(screen.getByText('Content for Subtab 1.1')).toBeInTheDocument()
  })

  it('resets subtab when main tab changes', () => {
    render(<TabContainer tabs={mockTabs} />)
    
    const tab1 = screen.getByText('Tab 1')
    const tab2 = screen.getByText('Tab 2')
    
    fireEvent.click(tab1)
    const subtab2 = screen.getByText('Subtab 1.2')
    fireEvent.click(subtab2)
    
    fireEvent.click(tab2)
    fireEvent.click(tab1)
    
    expect(screen.getByText('Content for Subtab 1.1')).toBeInTheDocument()
  })
})
