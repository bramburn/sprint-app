import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SelectField from '../SelectField';

describe('SelectField Component', () => {
  const mockOptions = ['Option 1', 'Option 2', 'Option 3'];

  it('renders label and select input', () => {
    render(<SelectField label="Test Select" options={mockOptions} />);
    
    expect(screen.getByLabelText('Test Select')).toBeInTheDocument();
  });

  it('renders all options', () => {
    render(<SelectField label="Test Select" options={mockOptions} />);
    
    mockOptions.forEach(option => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it('renders required asterisk for required fields', () => {
    render(<SelectField label="Required Select" options={mockOptions} required />);
    
    const requiredAsterisk = screen.getByText('*');
    expect(requiredAsterisk).toBeInTheDocument();
    expect(requiredAsterisk).toHaveClass('required-asterisk');
  });

  it('handles option selection', () => {
    const mockOnChange = vi.fn();
    render(
      <SelectField 
        label="Test Select" 
        options={mockOptions} 
        onChange={mockOnChange} 
      />
    );
    
    const select = screen.getByLabelText('Test Select');
    fireEvent.change(select, { target: { value: 'Option 2' } });
    
    expect(mockOnChange).toHaveBeenCalledWith('Option 2');
  });

  it('shows placeholder when no option is selected', () => {
    render(
      <SelectField 
        label="Test Select" 
        options={mockOptions} 
        placeholder="Choose an option" 
      />
    );
    
    expect(screen.getByText('Choose an option')).toBeInTheDocument();
  });
});
