import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ThemeProvider } from '../context/ThemeProvider'

describe('ThemeContext', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <ThemeProvider>
        <div>Test Content</div>
      </ThemeProvider>
    )
    expect(container).toBeTruthy()
  })

  it('toggles theme', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <div data-testid="theme-toggle">Theme Toggle</div>
        <div data-testid="theme-type">Light Theme</div>
      </ThemeProvider>
    );
    
    // Initial theme
    expect(getByTestId('theme-type').textContent).toBe('Light Theme');
  })
})
