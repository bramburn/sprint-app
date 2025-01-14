import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MessagingProvider, useMessaging } from '../MessagingContext';
import { MessageActionType } from '../messageTypes';
import MessagingTab from '../MessagingTab';
import MessageInput from '../MessageInput';
import MessageList from '../MessageList';

// Wrapper component for testing context
const TestMessagingComponent = () => {
  const { messages, dispatch } = useMessaging();
  
  return (
    <div>
      <MessageList messages={messages} />
      <MessageInput 
        onSendMessage={(msg) => 
          dispatch({ 
            type: MessageActionType.SEND_MESSAGE, 
            payload: msg 
          })
        } 
      />
    </div>
  );
};

describe('Messaging System', () => {
  it('renders initial system message', () => {
    render(
      <MessagingProvider>
        <MessagingTab />
      </MessagingProvider>
    );
    
    expect(screen.getByText('Welcome to Sprint AI Messaging!')).toBeInTheDocument();
  });

  it('sends a new message', async () => {
    render(
      <MessagingProvider>
        <TestMessagingComponent />
      </MessagingProvider>
    );
    
    const input = screen.getByPlaceholderText('Type a message...');
    const sendButton = screen.getByText('Send');
    
    fireEvent.change(input, { target: { value: 'Hello, world!' } });
    fireEvent.click(sendButton);
    
    await waitFor(() => {
      expect(screen.getByText('Hello, world!')).toBeInTheDocument();
    });
  });

  it('prevents sending empty messages', () => {
    const mockSendMessage = vi.fn();
    
    render(
      <MessageInput onSendMessage={mockSendMessage} />
    );
    
    const sendButton = screen.getByText('Send');
    fireEvent.click(sendButton);
    
    expect(mockSendMessage).not.toHaveBeenCalled();
  });

  it('limits message length', () => {
    render(
      <MessagingProvider>
        <TestMessagingComponent />
      </MessagingProvider>
    );
    
    const input = screen.getByPlaceholderText('Type a message...');
    const longMessage = 'a'.repeat(600);
    
    fireEvent.change(input, { target: { value: longMessage } });
    
    const characterCount = screen.getByText(/500/);
    expect(characterCount).toBeInTheDocument();
  });
});
