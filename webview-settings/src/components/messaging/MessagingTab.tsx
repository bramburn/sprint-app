import React from 'react';
import { MessagingProvider } from './MessagingContext';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { Message } from '@sprint-app/shared/types/messaging';
import ErrorBoundary from './ErrorBoundary';
import { useMessaging } from './MessagingContext';
import { MessageActionType } from './MessagingContext';
import { useTheme } from '../../theme/hooks/useTheme';
import { ThemedWrapper } from '../../theme/components/ThemedWrapper';
import './MessagingTab.css';

const MessagingContent: React.FC = () => {
  const { messages, dispatch } = useMessaging();
  const { theme } = useTheme();

  const handleSendMessage = (newMessage: Message) => {
    dispatch({
      type: MessageActionType.SEND_MESSAGE,
      payload: {
        text: newMessage.text,
        sender: newMessage.sender,
        type: 'sent'
      }
    });
  };

  return (
    <ThemedWrapper 
      className="messaging-tab"
      style={{
        backgroundColor: theme.colors.editorBackground,
        color: theme.colors.editorForeground,
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <div className="messaging-header" style={{
        borderBottom: `1px solid ${theme.colors.border}`,
        padding: '10px'
      }}>
        <h2>Messaging</h2>
      </div>
      
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </ThemedWrapper>
  );
};

const MessagingTab: React.FC = () => {
  return (
    <ErrorBoundary>
      <MessagingProvider>
        <MessagingContent />
      </MessagingProvider>
    </ErrorBoundary>
  );
};

export default MessagingTab;
