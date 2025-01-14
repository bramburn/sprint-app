import React from 'react';
import { useTheme } from '../hooks/useTheme';

export interface ThemedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
}

export const ThemedButton: React.FC<ThemedButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const { theme } = useTheme();

  const variantClasses = {
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    tertiary: 'bg-tertiary text-tertiary-foreground'
  };

  return (
    <button
      className={`
        theme-button 
        ${variantClasses[variant]} 
        ${className}
        transition-all duration-200 ease-in-out
        hover:opacity-80
        focus:outline-none 
        focus:ring-2 
        focus:ring-offset-2
      `}
      style={{
        backgroundColor: theme.colors.buttonBackground,
        color: theme.colors.buttonForeground,
        borderColor: theme.colors.border
      }}
      {...props}
    >
      {children}
    </button>
  );
};
