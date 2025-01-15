import React from 'react';
import { useTheme } from '@sprint-app/shared/react/hooks/index';

interface ChatItem {
  id: string;
  title: string;
  timestamp: string;
  icon?: string;
}

interface PreviousChatsProps {
  chats: ChatItem[];
  onChatSelect: (chatId: string) => void;
  onViewAll: () => void;
}

export const PreviousChats: React.FC<PreviousChatsProps> = ({
  chats,
  onChatSelect,
  onViewAll,
}) => {
  const { theme } = useTheme();

  const styles = {
    container: {
      padding: '1rem',
      background: theme.background,
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '0.5rem',
    },
    title: {
      color: theme.secondary,
      fontSize: '0.875rem',
      fontWeight: 500,
    },
    viewAllButton: {
      background: 'none',
      border: 'none',
      color: theme.accent,
      fontSize: '0.875rem',
      cursor: 'pointer',
      ':hover': {
        color: theme.primary,
      },
    },
    chatList: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.25rem',
    },
    chatItem: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.5rem',
      borderRadius: '0.25rem',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      textAlign: 'left' as const,
      transition: 'background 150ms',
      ':hover': {
        background: theme.secondary,
      },
    },
    chatIcon: {
      color: theme.secondary,
      ':hover': {
        color: theme.foreground,
      },
    },
    chatContent: {
      flexGrow: 1,
      minWidth: 0,
    },
    chatTitle: {
      fontSize: '0.875rem',
      color: theme.foreground,
      whiteSpace: 'nowrap' as const,
      overflow: 'hidden',
      textOverflow: 'ellipsis' as const,
    },
    chatTimestamp: {
      fontSize: '0.75rem',
      color: theme.secondary,
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Previous chats</h2>
        <button
          onClick={onViewAll}
          style={styles.viewAllButton}
        >
          View all
        </button>
      </div>
      <div style={styles.chatList}>
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onChatSelect(chat.id)}
            style={styles.chatItem}
          >
            <span
              className={`codicon codicon-${chat.icon || 'comment-discussion'}`}
              style={styles.chatIcon}
            />
            <div style={styles.chatContent}>
              <p style={styles.chatTitle}>{chat.title}</p>
              <p style={styles.chatTimestamp}>{chat.timestamp}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PreviousChats; 