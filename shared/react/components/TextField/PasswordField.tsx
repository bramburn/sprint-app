import React, { useState, forwardRef } from 'react';
import { TextField, TextFieldProps } from './TextField';

// Extend the TextField props for password-specific functionality
export interface PasswordFieldProps extends TextFieldProps {
  /**
   * Optional password strength indicator
   */
  showStrengthIndicator?: boolean;
}

/**
 * PasswordField component with visibility toggle and optional strength indicator
 */
export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ showStrengthIndicator = false, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const [strength, setStrength] = useState(0);

    // Simple password strength calculator
    const calculatePasswordStrength = (password: string): number => {
      let strength = 0;
      if (password.length >= 8) strength++;
      if (/[A-Z]/.test(password)) strength++;
      if (/[a-z]/.test(password)) strength++;
      if (/[0-9]/.test(password)) strength++;
      if (/[^A-Za-z0-9]/.test(password)) strength++;
      return strength;
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newPassword = e.target.value;
      
      // Calculate strength if enabled
      if (showStrengthIndicator) {
        setStrength(calculatePasswordStrength(newPassword));
      }

      // Call original onChange if provided
      props.onChange?.(e);
    };

    const toggleVisibility = () => {
      setIsVisible(!isVisible);
    };

    return (
      <div className="password-field-wrapper">
        <TextField
          ref={ref}
          type={isVisible ? 'text' : 'password'}
          {...props}
          onChange={handlePasswordChange}
        />
        <div className="password-field-controls">
          <button 
            type="button" 
            onClick={toggleVisibility}
            aria-label={isVisible ? 'Hide password' : 'Show password'}
          >
            {isVisible ? 'Hide' : 'Show'}
          </button>
          
          {showStrengthIndicator && (
            <div className="password-strength-indicator">
              <div 
                className={`strength-bar strength-${strength}`}
                style={{ width: `${(strength / 5) * 100}%` }}
              />
              <span className="strength-text">
                {strength <= 2 ? 'Weak' : strength <= 4 ? 'Medium' : 'Strong'}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
);

// Set display name for better debugging
PasswordField.displayName = 'PasswordField';

export default PasswordField;
