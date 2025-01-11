import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { MessageHandler } from '../../messageHandler';
import { WebviewMessage } from '@shared/messages';

describe('MessageHandler', () => {
  let messageHandler: MessageHandler;

  beforeEach(() => {
    messageHandler = new MessageHandler();
  });

  afterEach(() => {
    messageHandler.dispose();
  });

  it('should process messages correctly', () => {
    const testMessage: WebviewMessage = {
      type: 'test',
      id: '123',
      timestamp: Date.now(),
      payload: { text: 'Test' }
    };

    messageHandler.getResponseObservable().subscribe((response) => {
      expect(response.type).toBe('response');
      expect(response.id).toBe(testMessage.id);
      expect(response.payload).toBeDefined();
    });

    messageHandler.sendMessage(testMessage);
  });

  it('should handle errors gracefully', () => {
    const invalidMessage = {} as WebviewMessage;

    messageHandler.getResponseObservable().subscribe((response) => {
      expect(response.type).toBe('error');
      expect(response.error).toBeDefined();
    });

    messageHandler.sendMessage(invalidMessage);
  });
});
