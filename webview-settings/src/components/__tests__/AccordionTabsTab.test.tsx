import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import AccordionTabsTab from '../AccordionTabsTab'

describe('AccordionTabsTab Component', () => {
  it('renders accordion sections', () => {
    render(<AccordionTabsTab />)
    
    const accordionSections = [
      'Getting Started',
      'Advanced Configuration',
      'Troubleshooting'
    ]
    
    accordionSections.forEach(section => {
      expect(screen.getByText(section)).toBeInTheDocument()
    })
  })

  it('renders tab sections', () => {
    render(<AccordionTabsTab />)
    
    const tabSections = [
      'Product Overview',
      'Support'
    ]
    
    tabSections.forEach(section => {
      expect(screen.getByText(section)).toBeInTheDocument()
    })
  })

  it('expands accordion sections', () => {
    render(<AccordionTabsTab />)
    
    const gettingStartedHeader = screen.getByText('Getting Started')
    fireEvent.click(gettingStartedHeader)
    
    expect(screen.getByText('Create an account')).toBeInTheDocument()
  })

  it('switches between tabs', () => {
    render(<AccordionTabsTab />)
    
    const productOverviewTab = screen.getByText('Product Overview')
    const supportTab = screen.getByText('Support')
    
    fireEvent.click(supportTab)
    expect(screen.getByText('Customer Support')).toBeInTheDocument()
    
    fireEvent.click(productOverviewTab)
    expect(screen.getByText('Our Product')).toBeInTheDocument()
  })

  it('renders subtabs for Product Overview', () => {
    render(<AccordionTabsTab />)
    
    const productOverviewTab = screen.getByText('Product Overview')
    fireEvent.click(productOverviewTab)
    
    const featuresSubtab = screen.getByText('Features')
    const pricingSubtab = screen.getByText('Pricing')
    
    fireEvent.click(featuresSubtab)
    expect(screen.getByText('Real-time collaboration')).toBeInTheDocument()
    
    fireEvent.click(pricingSubtab)
    expect(screen.getByText('Basic: Free')).toBeInTheDocument()
  })
})
