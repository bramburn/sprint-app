import React from 'react';
import { Message as MessageType } from '@sprint-app/shared/types/messaging';
import './Message.css';

interface MessageProps {
  message: MessageType;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`message ${message.type}`}>
      <div className="message-content">
        <span className="message-text">{message.text}</span>
        <span className="message-timestamp">{formatTimestamp(message.timestamp)}</span>
      </div>
    </div>
  );
};

export default Message;
