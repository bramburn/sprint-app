/**
 * Enum for message commands to ensure type safety and consistency
 */
export enum MessageCommand {
  // Initialization and lifecycle messages
  READY = 'ready',
  PING = 'ping',
  PONG = 'pong',
  
  // Settings-related messages
  SETTINGS_UPDATE = 'settings-update',
  SETTINGS_REQUEST = 'settings-request',
  
  // Theme-related messages
  THEME_UPDATE = 'theme-update',
  
  // Error handling
  ERROR = 'error'
}

/**
 * Base interface for all messages to ensure consistent structure
 */
export interface BaseMessage {
  command: MessageCommand;
  timestamp: number;
  id: string;
}

/**
 * Client capabilities for feature detection and graceful degradation
 */
export interface ClientCapabilities {
  supportsDarkMode: boolean;
  supportsAnimation: boolean;
  browserInfo: {
    userAgent: string;
    language: string;
  };
}

/**
 * Ready message payload for webview initialization
 */
export interface ReadyMessagePayload {
  webviewId: string;
  clientCapabilities: ClientCapabilities;
}

/**
 * Ready message interface
 */
export interface ReadyMessage extends BaseMessage {
  command: MessageCommand.READY;
  payload: ReadyMessagePayload;
}

/**
 * Settings update message interface
 */
export interface SettingsUpdatePayload {
  settings: Record<string, unknown>;
  version: number;
}

export interface SettingsUpdateMessage extends BaseMessage {
  command: MessageCommand.SETTINGS_UPDATE;
  payload: SettingsUpdatePayload;
}

/**
 * Error message interface for communication errors
 */
export interface ErrorMessagePayload {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface ErrorMessage extends BaseMessage {
  command: MessageCommand.ERROR;
  payload: ErrorMessagePayload;
}

/**
 * Union type for all possible messages
 */
export type WebviewMessage = 
  | ReadyMessage 
  | SettingsUpdateMessage 
  | ErrorMessage;

/**
 * Type guard to validate message types
 * @param message - Message to validate
 */
export function isValidMessage(message: unknown): message is WebviewMessage {
  if (!message || typeof message !== 'object') return false;
  
  const msg = message as BaseMessage;
  
  // Check for required base message properties
  if (!msg.command || !msg.timestamp || !msg.id) return false;
  
  // Validate message based on its command
  switch (msg.command) {
    case MessageCommand.READY:
      const readyMsg = message as ReadyMessage;
      return !!readyMsg.payload?.webviewId && 
             !!readyMsg.payload?.clientCapabilities;
    
    case MessageCommand.SETTINGS_UPDATE:
      const settingsMsg = message as SettingsUpdateMessage;
      return !!settingsMsg.payload?.settings && 
             typeof settingsMsg.payload.version === 'number';
    
    case MessageCommand.ERROR:
      const errorMsg = message as ErrorMessage;
      return !!errorMsg.payload?.code && 
             !!errorMsg.payload?.message;
    
    default:
      return false;
  }
}

/**
 * Utility to generate unique message ID
 */
export function generateMessageId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Utility to create a ready message
 */
export function createReadyMessage(
  webviewId: string, 
  clientCapabilities: ClientCapabilities
): ReadyMessage {
  return {
    command: MessageCommand.READY,
    timestamp: Date.now(),
    id: generateMessageId(),
    payload: {
      webviewId,
      clientCapabilities
    }
  };
}
