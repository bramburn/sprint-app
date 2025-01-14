import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FieldFormsTab from '../FieldFormsTab';

describe('FieldFormsTab Component', () => {
  it('renders all form fields', () => {
    render(<FieldFormsTab />);
    
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Department')).toBeInTheDocument();
    expect(screen.getByText('Upload Documents')).toBeInTheDocument();
  });

  it('validates email input', () => {
    render(<FieldFormsTab />);
    
    const emailInput = screen.getByLabelText('Email');
    
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    expect(screen.getByText('Invalid email format')).toBeInTheDocument();
    
    fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
    expect(screen.queryByText('Invalid email format')).toBeNull();
  });

  it('submits form with valid data', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    
    render(<FieldFormsTab />);
    
    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email');
    const departmentSelect = screen.getByLabelText('Department');
    const submitButton = screen.getByText('Submit Form');
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(departmentSelect, { target: { value: 'Engineering' } });
    
    fireEvent.click(submitButton);
    
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Form submitted')
    );
    
    consoleSpy.mockRestore();
  });
});
