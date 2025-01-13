import React from 'react';
import { useTheme } from '../theme/hooks/useTheme';
import { ThemedWrapper } from '../theme/components/ThemedWrapper';
import { ThemedButton } from '../theme/components/ThemedButton';

export interface FooterProps {
  status: 'saved' | 'saving' | 'error'
  onRetry?: () => void
}

const Footer: React.FC<FooterProps> = ({ status, onRetry }) => {
  const { theme } = useTheme();

  const getStatusMessage = () => {
    switch (status) {
      case 'saved':
        return 'Saved ✓'
      case 'saving':
        return 'Saving...'
      case 'error':
        return 'Error saving settings'
    }
  }

  return (
    <ThemedWrapper 
      tagName="footer"
      className="app-footer"
      style={{
        backgroundColor: theme.colors.listHoverBackground,
        borderTop: `1px solid ${theme.colors.border}`
      }}
    >
      <div className="footer-content">
        <span>{getStatusMessage()}</span>
        {status === 'error' && onRetry && (
          <ThemedButton 
            variant="secondary"
            className="ml-2"
            onClick={onRetry}
          >
            Retry
          </ThemedButton>
        )}
        <p>© {new Date().getFullYear()} Sprint App</p>
        <ThemedButton 
          variant="secondary"
          onClick={() => window.open('https://github.com/your-repo', '_blank')}
        >
          GitHub
        </ThemedButton>
      </div>
    </ThemedWrapper>
  )
}

export default Footer
