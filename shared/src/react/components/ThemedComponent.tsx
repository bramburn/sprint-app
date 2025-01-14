import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { ThemeConfiguration } from '@sprint-app/shared/src/theme/types';

interface ThemedComponentProps {
  children: React.ReactNode;
  className?: string;
}

export const ThemedComponent: React.FC<ThemedComponentProps> = ({ 
  children, 
  className = '' 
}) => {
  const { theme }: { theme: ThemeConfiguration } = useTheme();

  return (
    <div 
      className={`themed-component ${className}`}
      style={{
        backgroundColor: theme.background,
        color: theme.foreground,
        borderColor: theme.accent
      }}
    >
      {children}
    </div>
  );
};
