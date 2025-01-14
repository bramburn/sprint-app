import React, { createContext, useContext, useReducer, Dispatch } from 'react';
import { Message } from '@sprint-app/shared/types/messaging';
import { v4 as uuidv4 } from 'uuid';
import { 
  MessageAction, 
  messageReducer 
} from './messageTypes';

// Context Interface
interface MessagingContextType {
  messages: Message[];
  dispatch: Dispatch<MessageAction>;
}

// Create Context
const MessagingContext = createContext<MessagingContextType | undefined>(undefined);

// Provider Component
export function MessagingProvider({ children }: { children: React.ReactNode }) {
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
}

// Custom Hook for using Messaging Context
// eslint-disable-next-line react-refresh/only-export-components
export function useMessaging() {
  const context = useContext(MessagingContext);
  if (context === undefined) {
    throw new Error('useMessaging must be used within a MessagingProvider');
  }
  return context;
}

export { MessageActionType } from './messageTypes';
