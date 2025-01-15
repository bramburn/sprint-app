import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import InputSection from '../InputSection';
import { ThemeProvider } from '@sprint-app/shared/react/hooks/index';

describe('InputSection', () => {
  const mockProps = {
    onSubmit: vi.fn(),
    onAddContext: vi.fn(),
    onCodebaseClick: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all buttons and input field', () => {
    render(
      <ThemeProvider>
        <InputSection {...mockProps} />
      </ThemeProvider>
    );

    expect(screen.getByText('Add context')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
    expect(screen.getByText('codebase ctrl+#')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Ask anything (Ctrl+L), @ to mention, 1 to select')
    ).toBeInTheDocument();
  });

  it('handles text input correctly', () => {
    render(
      <ThemeProvider>
        <InputSection {...mockProps} />
      </ThemeProvider>
    );

    const input = screen.getByPlaceholderText(
      'Ask anything (Ctrl+L), @ to mention, 1 to select'
    );
    fireEvent.change(input, { target: { value: 'Test message' } });

    expect(input).toHaveValue('Test message');
  });

  it('calls onSubmit when submit button is clicked', () => {
    render(
      <ThemeProvider>
        <InputSection {...mockProps} />
      </ThemeProvider>
    );

    const input = screen.getByPlaceholderText(
      'Ask anything (Ctrl+L), @ to mention, 1 to select'
    );
    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(screen.getByText('Submit'));

    expect(mockProps.onSubmit).toHaveBeenCalledWith('Test message');
    expect(input).toHaveValue('');
  });

  it('calls onSubmit when Enter is pressed (without Shift)', () => {
    render(
      <ThemeProvider>
        <InputSection {...mockProps} />
      </ThemeProvider>
    );

    const input = screen.getByPlaceholderText(
      'Ask anything (Ctrl+L), @ to mention, 1 to select'
    );
    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(mockProps.onSubmit).toHaveBeenCalledWith('Test message');
    expect(input).toHaveValue('');
  });

  it('does not call onSubmit when Shift+Enter is pressed', () => {
    render(
      <ThemeProvider>
        <InputSection {...mockProps} />
      </ThemeProvider>
    );

    const input = screen.getByPlaceholderText(
      'Ask anything (Ctrl+L), @ to mention, 1 to select'
    );
    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.keyDown(input, { key: 'Enter', shiftKey: true });

    expect(mockProps.onSubmit).not.toHaveBeenCalled();
    expect(input).toHaveValue('Test message');
  });

  it('calls onAddContext when Add context button is clicked', () => {
    render(
      <ThemeProvider>
        <InputSection {...mockProps} />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText('Add context'));
    expect(mockProps.onAddContext).toHaveBeenCalled();
  });

  it('calls onCodebaseClick when codebase button is clicked', () => {
    render(
      <ThemeProvider>
        <InputSection {...mockProps} />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText('codebase ctrl+#'));
    expect(mockProps.onCodebaseClick).toHaveBeenCalled();
  });
}); 