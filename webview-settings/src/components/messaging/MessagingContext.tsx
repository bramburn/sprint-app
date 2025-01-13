import React, { createContext, useState, useContext, useReducer, Dispatch } from 'react';
import { Message } from '@sprint-app/shared/types/messaging';
import { v4 as uuidv4 } from 'uuid';

// Action Types
export enum MessageActionType {
  SEND_MESSAGE = 'SEND_MESSAGE',
  DELETE_MESSAGE = 'DELETE_MESSAGE',
  LOAD_MESSAGES = 'LOAD_MESSAGES',
  CLEAR_MESSAGES = 'CLEAR_MESSAGES',
}

// Action Interfaces
interface SendMessageAction {
  type: MessageActionType.SEND_MESSAGE;
  payload: Omit<Message, 'id' | 'timestamp'>;
}

interface DeleteMessageAction {
  type: MessageActionType.DELETE_MESSAGE;
  payload: string; // message id
}

interface LoadMessagesAction {
  type: MessageActionType.LOAD_MESSAGES;
  payload: Message[];
}

interface ClearMessagesAction {
  type: MessageActionType.CLEAR_MESSAGES;
}

type MessageAction = 
  | SendMessageAction 
  | DeleteMessageAction 
  | LoadMessagesAction 
  | ClearMessagesAction;

// Reducer
function messageReducer(state: Message[], action: MessageAction): Message[] {
  switch (action.type) {
    case MessageActionType.SEND_MESSAGE:
      return [
        ...state, 
        {
          id: uuidv4(),
          timestamp: Date.now(),
          type: 'sent',
          ...action.payload
        }
      ];
    
    case MessageActionType.DELETE_MESSAGE:
      return state.filter(msg => msg.id !== action.payload);
    
    case MessageActionType.LOAD_MESSAGES:
      return action.payload;
    
    case MessageActionType.CLEAR_MESSAGES:
      return [];
    
    default:
      return state;
  }
}

// Context Interface
interface MessagingContextType {
  messages: Message[];
  dispatch: Dispatch<MessageAction>;
}

// Create Context
const MessagingContext = createContext<MessagingContextType | undefined>(undefined);

// Provider Component
export const MessagingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, dispatch] = useReducer(messageReducer, [
    {
      id: uuidv4(),
      text: 'Welcome to Sprint AI Messaging!',
      sender: 'system',
      timestamp: Date.now(),
      type: 'received'
    }
  ]);

  return (
    <MessagingContext.Provider value={{ messages, dispatch }}>
      {children}
    </MessagingContext.Provider>
  );
};

// Custom Hook for using Messaging Context
export const useMessaging = () => {
  const context = useContext(MessagingContext);
  if (context === undefined) {
    throw new Error('useMessaging must be used within a MessagingProvider');
  }
  return context;
};
