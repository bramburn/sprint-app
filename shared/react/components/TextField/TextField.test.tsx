import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { TextField } from './TextField';
import { PasswordField } from './PasswordField';

describe('TextField', () => {
  it('renders correctly with default props', () => {
    const { getByRole } = render(<TextField />);
    const input = getByRole('textbox');
    expect(input).toBeTruthy();
  });

  it('handles value changes', () => {
    const handleChange = vi.fn();
    const { getByRole } = render(<TextField onChange={handleChange} />);
    const input = getByRole('textbox') as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: 'test input' } });
    
    expect(handleChange).toHaveBeenCalled();
    expect(input.value).toBe('test input');
  });

  it('renders label when provided', () => {
    const { getByText } = render(<TextField label="Test Label" />);
    const label = getByText('Test Label');
    expect(label).toBeTruthy();
  });
});

describe('PasswordField', () => {
  it('toggles password visibility', () => {
    const { getByRole, getByLabelText } = render(<PasswordField />);
    const input = getByRole('textbox') as HTMLInputElement;
    const toggleButton = getByLabelText(/show password/i);

    expect(input.type).toBe('password');
    
    fireEvent.click(toggleButton);
    expect(input.type).toBe('text');
  });

  it('calculates password strength', () => {
    const { getByRole, getByText } = render(<PasswordField showStrengthIndicator />);
    const input = getByRole('textbox');
    
    // Test weak password
    fireEvent.change(input, { target: { value: 'weak' } });
    const weakText = getByText('Weak');
    expect(weakText).toBeTruthy();

    // Test strong password
    fireEvent.change(input, { target: { value: 'StrongP@ssw0rd!' } });
    const strongText = getByText('Strong');
    expect(strongText).toBeTruthy();
  });
});
