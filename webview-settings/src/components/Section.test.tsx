import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Section } from './Section'

describe('Section Component', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Section 
        title="Test Section" 
        children={<div>Test Content</div>} 
      />
    )
    expect(container).toBeTruthy()
  })

  it('renders title and description', () => {
    render(
      <Section 
        title="Test Section" 
        description="This is a test description"
      >
        <div>Test Content</div>
      </Section>
    )

    expect(screen.getByText('Test Section')).toBeInTheDocument()
    expect(screen.getByText('This is a test description')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('renders without description', () => {
    render(
      <Section title="Test Section">
        <div>Test Content</div>
      </Section>
    )

    expect(screen.getByText('Test Section')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <Section 
        title="Test Section" 
        className="custom-class"
      >
        <div>Test Content</div>
      </Section>
    )

    const sectionElement = screen.getByText('Test Section').closest('div')
    expect(sectionElement).toHaveClass('section')
    expect(sectionElement).toHaveClass('custom-class')
  })
})
