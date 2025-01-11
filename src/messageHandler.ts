import { Subject, Observable } from 'rxjs';
import { filter, map, catchError } from 'rxjs/operators';
import { WebviewMessage, ExtensionMessage, MessageResponse } from '@shared/messages';

export class MessageHandler {
  private messageSubject = new Subject<WebviewMessage>();
  private responseSubject = new Subject<ExtensionMessage>();

  constructor() {
    this.setupMessagePipeline();
  }

  private setupMessagePipeline() {
    this.messageSubject.pipe(
      filter((message): message is WebviewMessage => {
        return !!message && typeof message.type === 'string';
      }),
      map((message) => {
        return {
          type: message.type,
          id: message.id,
          timestamp: Date.now(),
          payload: message.payload,
        };
      }),
      catchError((error) => {
        console.error('Error in message pipeline:', error);
        return [];
      })
    ).subscribe((message) => {
      this.handleMessage(message);
    });
  }

  private async handleMessage(message: WebviewMessage) {
    try {
      // Process message and send response
      const response: MessageResponse = {
        success: true,
        data: `Processed message: ${message.type}`
      };
      
      this.responseSubject.next({
        type: 'response',
        id: message.id,
        timestamp: Date.now(),
        payload: response
      });
    } catch (error) {
      this.responseSubject.next({
        type: 'error',
        id: message.id,
        timestamp: Date.now(),
        payload: null,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  public sendMessage(message: WebviewMessage) {
    this.messageSubject.next(message);
  }

  public getResponseObservable(): Observable<ExtensionMessage> {
    return this.responseSubject.asObservable();
  }

  public dispose() {
    this.messageSubject.complete();
    this.responseSubject.complete();
  }
}
