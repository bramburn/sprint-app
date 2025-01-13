import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import TextField from '../TextField'

describe('TextField Component', () => {
  it('renders label and input', () => {
    render(<TextField label="Test Label" />)
    
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument()
  })

  it('renders required asterisk for required fields', () => {
    render(<TextField label="Required Field" required />)
    
    const requiredAsterisk = screen.getByText('*')
    expect(requiredAsterisk).toBeInTheDocument()
    expect(requiredAsterisk).toHaveClass('required-asterisk')
  })

  it('handles input changes', () => {
    render(<TextField label="Email" type="email" />)
    
    const input = screen.getByLabelText('Email')
    fireEvent.change(input, { target: { value: 'test@example.com' } })
    
    expect(input).toHaveValue('test@example.com')
  })

  it('shows validation error for invalid email', () => {
    const emailValidation = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email) ? null : 'Invalid email format'
    }

    render(<TextField 
      label="Email" 
      type="email" 
      validation={emailValidation} 
    />)
    
    const input = screen.getByLabelText('Email')
    fireEvent.change(input, { target: { value: 'invalid-email' } })
    
    expect(screen.getByText('Invalid email format')).toBeInTheDocument()
  })

  it('does not show error for valid email', () => {
    const emailValidation = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email) ? null : 'Invalid email format'
    }

    render(<TextField 
      label="Email" 
      type="email" 
      validation={emailValidation} 
    />)
    
    const input = screen.getByLabelText('Email')
    fireEvent.change(input, { target: { value: 'valid@example.com' } })
    
    expect(screen.queryByText('Invalid email format')).toBeNull()
  })
})
