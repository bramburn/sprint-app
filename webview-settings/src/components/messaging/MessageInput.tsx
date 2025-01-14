import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '@sprint-app/shared/types/messaging';
import './MessageInput.css';

interface MessageInputProps {
  onSendMessage: (message: Message) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [messageText, setMessageText] = useState('');
  const MAX_MESSAGE_LENGTH = 500;

  const handleSendMessage = () => {
    const trimmedMessage = messageText.trim();
    if (trimmedMessage) {
      const newMessage: Message = {
        id: uuidv4(),
        text: trimmedMessage,
        sender: 'current_user', // Replace with actual user identification
        timestamp: Date.now(),
        type: 'sent'
      };

      onSendMessage(newMessage);
      setMessageText('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="message-input-container">
      <textarea
        className="message-input"
        value={messageText}
        onChange={(e) => {
          if (e.target.value.length <= MAX_MESSAGE_LENGTH) {
            setMessageText(e.target.value);
          }
        }}
        onKeyPress={handleKeyPress}
        placeholder="Type a message..."
        rows={3}
        aria-label="Message input"
      />
      <div className="message-input-actions">
        <span className="character-count">
          {messageText.length} / {MAX_MESSAGE_LENGTH}
        </span>
        <button 
          className="send-button" 
          onClick={handleSendMessage}
          disabled={!messageText.trim()}
          aria-label="Send message"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
