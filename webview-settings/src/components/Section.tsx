import React from 'react';
import { useTheme } from '../theme/hooks/useTheme';
import { ThemedWrapper } from '../theme/components/ThemedWrapper';

export interface SectionProps {
  children: React.ReactNode;
  title: string;
  className?: string;
  description?: string;  // Optional description
}

export const Section: React.FC<SectionProps> = ({ 
  title, 
  children,
  className,
  description
}) => {
  const { theme } = useTheme();

  return (
    <ThemedWrapper 
      className={`section-container ${className}`}
      style={{
        backgroundColor: theme.colors.editorBackground,
        borderBottom: `1px solid ${theme.colors.border}`
      }}
    >
      <div className="section-header">
        <h2 
          style={{ 
            color: theme.colors.editorForeground 
          }}
        >
          {title}
        </h2>
        {description && (
          <p 
            style={{ 
              color: theme.colors.editorForeground 
            }}
          >
            {description}
          </p>
        )}
      </div>
      <div className="section-content">
        {children}
      </div>
    </ThemedWrapper>
  );
};
