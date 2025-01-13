import React from 'react'

export interface FooterProps {
  status: 'saved' | 'saving' | 'error'
  onRetry?: () => void
}

const Footer: React.FC<FooterProps> = ({ status, onRetry }) => {
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
    <footer className="footer">
      <span>{getStatusMessage()}</span>
      {status === 'error' && onRetry && (
        <button 
          className="btn btn-small ml-2" 
          onClick={onRetry}
        >
          Retry
        </button>
      )}
    </footer>
  )
}

export default Footer
