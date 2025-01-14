import { 
  WebviewMessage, 
  MessageCommand, 
  isValidMessage,
  BaseMessage
} from './types';

/**
 * Message handler interface for type-safe message processing
 */
export interface MessageHandler {
  handle(message: WebviewMessage): void | Promise<void>;
}

/**
 * Message dispatcher to route messages to appropriate handlers
 */
export class MessageDispatcher {
  private handlers: Map<MessageCommand, MessageHandler[]> = new Map();
  private errorHandlers: ((error: Error) => void)[] = [];

  /**
   * Register a handler for a specific message command
   * @param command - Message command to handle
   * @param handler - Handler for the message
   */
  public register(command: MessageCommand, handler: MessageHandler): void {
    const existingHandlers = this.handlers.get(command) || [];
    this.handlers.set(command, [...existingHandlers, handler]);
  }

  /**
   * Unregister a specific handler for a command
   * @param command - Message command
   * @param handler - Handler to remove
   */
  public unregister(command: MessageCommand, handler: MessageHandler): void {
    const handlers = this.handlers.get(command);
    if (handlers) {
      this.handlers.set(
        command, 
        handlers.filter(h => h !== handler)
      );
    }
  }

  /**
   * Register a global error handler
   * @param handler - Error handling function
   */
  public onError(handler: (error: Error) => void): void {
    this.errorHandlers.push(handler);
  }

  /**
   * Dispatch incoming message to registered handlers
   * @param message - Message to dispatch
   */
  public async dispatch(message: unknown): Promise<void> {
    try {
      // Validate message
      if (!isValidMessage(message)) {
        throw new Error('Invalid message format');
      }

      const handlers = this.handlers.get(message.command);
      
      if (!handlers || handlers.length === 0) {
        console.warn(`No handlers registered for command: ${message.command}`);
        return;
      }

      // Process message with all registered handlers
      for (const handler of handlers) {
        await handler.handle(message);
      }
    } catch (error) {
      // Invoke error handlers
      this.errorHandlers.forEach(errorHandler => 
        errorHandler(error instanceof Error ? error : new Error(String(error)))
      );
    }
  }

  /**
   * Clear all registered handlers
   */
  public clear(): void {
    this.handlers.clear();
    this.errorHandlers = [];
  }

  // Add a method that uses BaseMessage to ensure it's read
  private validateBaseMessage(message: BaseMessage): boolean {
    return message.command !== undefined && 
           message.timestamp !== undefined && 
           message.id !== undefined;
  }
}

/**
 * Logging middleware for message tracking
 */
export class MessageLogger implements MessageHandler {
  private logLevel: 'debug' | 'info' | 'warn' | 'error';

  constructor(logLevel: 'debug' | 'info' | 'warn' | 'error' = 'info') {
    this.logLevel = logLevel;
  }

  handle(message: WebviewMessage): void {
    const logMessage = `[${message.command}] ${message.id} - ${new Date(message.timestamp).toISOString()}`;
    
    switch (this.logLevel) {
      case 'debug':
        console.debug(logMessage, message);
        break;
      case 'info':
        console.info(logMessage);
        break;
      case 'warn':
        console.warn(logMessage);
        break;
      case 'error':
        console.error(logMessage);
        break;
    }
  }
}

/**
 * Create a default message dispatcher with logging
 */
export function createDefaultDispatcher(): MessageDispatcher {
  const dispatcher = new MessageDispatcher();
  
  // Add default logging
  const logger = new MessageLogger('debug');
  dispatcher.register(MessageCommand.READY, logger);
  dispatcher.register(MessageCommand.SETTINGS_UPDATE, logger);
  dispatcher.register(MessageCommand.ERROR, logger);

  return dispatcher;
}
