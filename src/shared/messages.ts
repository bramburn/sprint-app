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

export type MessageHandler = (message: WebviewMessage) => void | Promise<void>;

export interface MessageResponse {
  success: boolean;
  data?: unknown;
  error?: string;
}
