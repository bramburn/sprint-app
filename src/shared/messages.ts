export interface BaseMessage {
  type: string;
  id: string;
  timestamp: number;
}

export interface WebviewMessage extends BaseMessage {
  payload: unknown;
}

export interface ExtensionMessage extends BaseMessage {
  payload: unknown;
  error?: string;
}

// Export Message type to match the usage in useMessages.ts
export type Message = WebviewMessage | ExtensionMessage;

export type MessageHandler = (message: WebviewMessage) => void | Promise<void>;

export interface MessageResponse {
  success: boolean;
  data?: unknown;
  error?: string;
}
