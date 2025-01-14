import React, { useState } from 'react';
import './TextField.css';

export interface TextFieldProps {
  label: string
  type?: 'text' | 'email' | 'password'
  placeholder?: string
  required?: boolean
  validation?: (value: string) => string | null
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  type = 'text',
  placeholder = '',
  required = false,
  validation
}) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (validation) {
      const validationError = validation(newValue);
      setError(validationError);
    }
  };

  return (
    <div className="text-field-container">
      <label htmlFor={label.toLowerCase().replace(/\s+/g, '-')}>
        {label}
        {required && <span className="required-asterisk">*</span>}
      </label>
      <input
        type={type}
        id={label.toLowerCase().replace(/\s+/g, '-')}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        className={`text-field ${error ? 'error' : ''}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${label}-error` : undefined}
      />
      {error && (
        <span id={`${label}-error`} className="error-message">
          {error}
        </span>
      )}
    </div>
  );
};

export default TextField;
