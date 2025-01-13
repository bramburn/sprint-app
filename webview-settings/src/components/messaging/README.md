# Sprint AI Messaging System

## Overview
The Sprint AI Messaging System is a robust, scalable messaging interface designed for seamless communication within the Sprint AI application.

## Features
- Real-time messaging
- Message state management
- Error handling
- Accessibility support
- Responsive design

## Installation
```bash
npm install @sprint-app/messaging
```

## Usage

### Basic Example
```typescript
import { MessagingProvider, useMessaging } from './MessagingContext';

function MessagingComponent() {
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
}

function App() {
  return (
    <MessagingProvider>
      <MessagingComponent />
    </MessagingProvider>
  );
}
```

## Components

### `MessagingContext`
State management for messages using React Context and Reducer.

#### Action Types
- `SEND_MESSAGE`: Add a new message
- `DELETE_MESSAGE`: Remove a specific message
- `LOAD_MESSAGES`: Load existing messages
- `CLEAR_MESSAGES`: Clear all messages

### `MessageInput`
Handles message composition and submission.

#### Props
- `onSendMessage`: Callback for sending messages
- Supports character limit (500 characters)
- Validates message before sending

### `MessageList`
Displays messages with auto-scrolling.

### `ErrorBoundary`
Catches and handles errors in the messaging system.

## Testing
Run tests using Vitest:
```bash
npm run test:messaging
```

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
MIT License
