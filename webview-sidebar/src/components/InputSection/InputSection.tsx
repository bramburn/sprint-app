import React, { useState } from 'react';
import { useTheme } from '@sprint-app/shared/react/hooks/index';

interface InputSectionProps {
  onSubmit: (message: string) => void;
  onAddContext: () => void;
  onCodebaseClick: () => void;
}

export const InputSection: React.FC<InputSectionProps> = ({
  onSubmit,
  onAddContext,
  onCodebaseClick,
}) => {
  const { theme } = useTheme();
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (message.trim()) {
      onSubmit(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const styles = {
    container: {
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.5rem',
      background: theme.background,
    },
    contextButton: {
      width: '100%',
      background: theme.secondary,
      color: theme.foreground,
      padding: '0.375rem 0.75rem',
      borderRadius: '0.25rem',
      fontSize: '0.875rem',
      fontWeight: 500,
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      ':hover': {
        background: theme.primary,
      },
    },
    inputContainer: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.5rem',
    },
    textarea: {
      width: '100%',
      background: theme.secondary,
      color: theme.foreground,
      padding: '0.5rem',
      borderRadius: '0.25rem',
      minHeight: '80px',
      resize: 'none' as const,
      border: 'none',
      outline: 'none',
      '::placeholder': {
        color: theme.secondary,
      },
      ':focus': {
        outline: `1px solid ${theme.accent}`,
      },
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    submitButton: {
      background: theme.accent,
      color: theme.foreground,
      padding: '0.375rem 1rem',
      borderRadius: '0.25rem',
      fontSize: '0.875rem',
      fontWeight: 500,
      border: 'none',
      cursor: 'pointer',
      transition: 'background 150ms',
      ':hover': {
        background: theme.primary,
      },
    },
    codebaseButton: {
      background: 'none',
      border: 'none',
      color: theme.secondary,
      fontSize: '0.875rem',
      fontWeight: 500,
      cursor: 'pointer',
      ':hover': {
        color: theme.foreground,
      },
    },
  };

  return (
    <div style={styles.container}>
      <button
        onClick={onAddContext}
        style={styles.contextButton}
      >
        <span className="codicon codicon-add" />
        Add context
      </button>
      <div style={styles.inputContainer}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything (Ctrl+L), @ to mention, 1 to select"
          style={styles.textarea}
        />
        <div style={styles.buttonContainer}>
          <button
            onClick={handleSubmit}
            style={styles.submitButton}
          >
            Submit
          </button>
          <button
            onClick={onCodebaseClick}
            style={styles.codebaseButton}
          >
            codebase ctrl+#
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputSection; 