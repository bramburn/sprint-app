import React from 'react';
import { useTheme } from '../hooks/useTheme';

export interface ThemedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'outlined' | 'underlined';
  error?: boolean;
  validation?: (value: string) => string | null;
  maxSize?: number;
}

export const ThemedInput: React.FC<ThemedInputProps> = ({
  className = '',
  variant = 'default',
  error = false,
  ...props
}) => {
  const { theme } = useTheme();

  const variantClasses = {
    default: 'border rounded-md',
    outlined: 'border-2 outline-none',
    underlined: 'border-b-2 border-x-0 border-t-0 bg-transparent'
  };

  const errorClasses = error 
    ? 'border-red-500 text-red-700' 
    : '';

  return (
    <input
      className={`
        theme-input 
        ${variantClasses[variant]} 
        ${errorClasses}
        ${className}
        transition-all duration-200 ease-in-out
        focus:ring-2 focus:ring-offset-2
      `}
      style={{
        backgroundColor: theme.colors.inputBackground,
        color: theme.colors.inputForeground,
        borderColor: error ? 'red' : theme.colors.inputBorder,
        outlineColor: theme.colors.focusBorder
      }}
      {...props}
    />
  );
};
