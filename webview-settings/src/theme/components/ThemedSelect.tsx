import React from 'react';
import { useTheme } from '../hooks/useTheme';

export interface ThemedSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children?: React.ReactNode;
  options: string[];
  required: boolean;
  placeholder?: string;
  name: string;
  error?: boolean;
}

export const ThemedSelect: React.FC<ThemedSelectProps> = ({
  children,
  className = '',
  ...props
}) => {
  const { theme } = useTheme();

  const variantClasses = {
    default: 'border rounded-md',
    outlined: 'border-2 outline-none'
  };

  const errorClasses = props.error 
    ? 'border-red-500 text-red-700' 
    : '';

  return (
    <select
      className={`
        theme-select 
        ${variantClasses.default} 
        ${errorClasses}
        ${className}
        transition-all duration-200 ease-in-out
        focus:ring-2 focus:ring-offset-2
      `}
      style={{
        backgroundColor: theme.colors.inputBackground,
        color: theme.colors.inputForeground,
        borderColor: props.error ? 'red' : theme.colors.inputBorder,
        outlineColor: theme.colors.focusBorder
      }}
      {...props}
    >
      {children}
    </select>
  );
};
