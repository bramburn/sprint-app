import React, { useState } from 'react';
import './SelectField.css';

export interface SelectFieldProps {
  label: string
  options: string[]
  required?: boolean
  placeholder?: string
  onChange?: (value: string) => void
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  required = false,
  placeholder = 'Select an option',
  onChange
}) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="select-field-container">
      <label htmlFor={label.toLowerCase().replace(/\s+/g, '-')}>
        {label}
        {required && <span className="required-asterisk">*</span>}
      </label>
      <select
        id={label.toLowerCase().replace(/\s+/g, '-')}
        value={selectedValue}
        onChange={handleChange}
        required={required}
        className="select-field"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
