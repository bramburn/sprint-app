import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Accordion from '../Accordion'

describe('Accordion Component', () => {
  const mockItems = [
    {
      title: 'Section 1',
      content: <div>Content for Section 1</div>
    },
    {
      title: 'Section 2',
      content: <div>Content for Section 2</div>
    },
    {
      title: 'Section 3',
      content: <div>Content for Section 3</div>
    }
  ]

  it('renders all accordion headers', () => {
    render(<Accordion items={mockItems} />)
    
    mockItems.forEach(item => {
      expect(screen.getByText(item.title)).toBeInTheDocument()
    })
  })

  it('expands and collapses accordion sections', () => {
    render(<Accordion items={mockItems} />)
    
    const section1Header = screen.getByText('Section 1')
    fireEvent.click(section1Header)
    
    expect(screen.getByText('Content for Section 1')).toBeInTheDocument()
    
    // Click again to collapse
    fireEvent.click(section1Header)
    expect(screen.queryByText('Content for Section 1')).toBeNull()
  })

  it('allows only one section to be open at a time', () => {
    render(<Accordion items={mockItems} />)
    
    const section1Header = screen.getByText('Section 1')
    const section2Header = screen.getByText('Section 2')
    
    fireEvent.click(section1Header)
    expect(screen.getByText('Content for Section 1')).toBeInTheDocument()
    
    fireEvent.click(section2Header)
    expect(screen.queryByText('Content for Section 1')).toBeNull()
    expect(screen.getByText('Content for Section 2')).toBeInTheDocument()
  })

  it('renders correct accordion icons', () => {
    render(<Accordion items={mockItems} />)
    
    const section1Header = screen.getByText('Section 1')
    fireEvent.click(section1Header)
    
    const expandedIcon = section1Header.querySelector('.accordion-icon')
    expect(expandedIcon?.textContent).toBe('−')
  })
})
