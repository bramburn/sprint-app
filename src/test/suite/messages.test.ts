import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { MessageHandler } from '../../messageHandler';
import { WebviewMessage } from '../../types/messages';

describe('MessageHandler', () => {
  let messageHandler: MessageHandler;

  beforeEach(() => {
    messageHandler = new MessageHandler();
  });

  afterEach(() => {
    messageHandler.dispose();
  });

  it('should process messages correctly', (done) => {
    const testMessage: WebviewMessage = {
      type: 'test',
      id: '123',
      timestamp: Date.now(),
      payload: { data: 'test' }
    };

    messageHandler.getResponseObservable().subscribe((response) => {
      expect(response.type).toBe('response');
      expect(response.id).toBe(testMessage.id);
      expect(response.payload).toBeDefined();
      done();
    });

    messageHandler.sendMessage(testMessage);
  });

  it('should handle errors gracefully', (done) => {
    const invalidMessage = {} as WebviewMessage;

    messageHandler.getResponseObservable().subscribe((response) => {
      expect(response.type).toBe('error');
      expect(response.error).toBeDefined();
      done();
    });

    messageHandler.sendMessage(invalidMessage);
  });
});
