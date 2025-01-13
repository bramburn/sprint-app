import React from 'react';
import { MessagingProvider } from './MessagingContext';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ErrorBoundary from './ErrorBoundary';
import { useMessaging, MessageActionType } from './MessagingContext';
import './MessagingTab.css';

const MessagingContent: React.FC = () => {
  const { messages, dispatch } = useMessaging();

  const handleSendMessage = (newMessage: Message) => {
    dispatch({
      type: MessageActionType.SEND_MESSAGE,
      payload: {
        text: newMessage.text,
        sender: newMessage.sender
      }
    });
  };

  return (
    <div className="messaging-tab">
      <div className="messaging-header">
        <h2>AI Messaging</h2>
      </div>
      <ErrorBoundary>
        <MessageList messages={messages} />
        <MessageInput onSendMessage={handleSendMessage} />
      </ErrorBoundary>
    </div>
  );
};

const MessagingTab: React.FC = () => {
  return (
    <MessagingProvider>
      <MessagingContent />
    </MessagingProvider>
  );
};

export default MessagingTab;
