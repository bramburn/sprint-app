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
export interface SendMessageAction {
  type: MessageActionType.SEND_MESSAGE;
  payload: Omit<Message, 'id' | 'timestamp'>;
}

export interface DeleteMessageAction {
  type: MessageActionType.DELETE_MESSAGE;
  payload: string; // message id
}

export interface LoadMessagesAction {
  type: MessageActionType.LOAD_MESSAGES;
  payload: Message[];
}

export interface ClearMessagesAction {
  type: MessageActionType.CLEAR_MESSAGES;
}

export type MessageAction = 
  | SendMessageAction 
  | DeleteMessageAction 
  | LoadMessagesAction 
  | ClearMessagesAction;

// Reducer
export function messageReducer(state: Message[], action: MessageAction): Message[] {
  switch (action.type) {
    case MessageActionType.SEND_MESSAGE:
      return [
        ...state, 
        {
          id: uuidv4(),
          timestamp: Date.now(),
          ...action.payload,
        }
      ];
    case MessageActionType.DELETE_MESSAGE:
      return state.filter(message => message.id !== action.payload);
    case MessageActionType.LOAD_MESSAGES:
      return action.payload;
    case MessageActionType.CLEAR_MESSAGES:
      return [];
    default:
      return state;
  }
}
