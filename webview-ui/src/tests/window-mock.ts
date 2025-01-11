// 
// Mock implementation for window.matchMedia
// This is crucial for testing components that rely on media queries

class MediaQueryListMock implements MediaQueryList {
  private _media: string;
  private _matches: boolean;
  private _onchangeHandlers: ((this: MediaQueryList, ev: MediaQueryListEvent) => any)[] = [];
  onchange: ((this: MediaQueryList, ev: MediaQueryListEvent) => any) | null = null;

  constructor(media: string) {
    this._media = media;
    // Default implementation - you can customize this based on your specific needs
    this._matches = false;
  }

  get media(): string {
    return this._media;
  }

  get matches(): boolean {
    return this._matches;
  }

  addListener(listener: (this: MediaQueryList, ev: MediaQueryListEvent) => any): void {
    this._onchangeHandlers.push(listener);
  }

  removeListener(listener: (this: MediaQueryList, ev: MediaQueryListEvent) => any): void {
    this._onchangeHandlers = this._onchangeHandlers.filter(handler => handler !== listener);
  }

  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void {
    if (type === 'change') {
      const typedListener = listener as (this: MediaQueryList, ev: MediaQueryListEvent) => any;
      this._onchangeHandlers.push(typedListener);
      // Update onchange if it's a function
      if (typeof typedListener === 'function') {
        this.onchange = typedListener;
      }
    }
  }

  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void {
    if (type === 'change') {
      const typedListener = listener as (this: MediaQueryList, ev: MediaQueryListEvent) => any;
      this._onchangeHandlers = this._onchangeHandlers.filter(handler => handler !== typedListener);
      // Clear onchange if it matches the removed listener
      if (this.onchange === typedListener) {
        this.onchange = null;
      }
    }
  }

  dispatchEvent(event: MediaQueryListEvent): boolean {
    this._onchangeHandlers.forEach(handler => handler.call(this, event));
    if (this.onchange) {
      this.onchange.call(this, event);
    }
    return true;
  }
}

// Extend the global Window interface to include our mock
interface Window {
  matchMedia(query: string): MediaQueryList;
}

// Mock window.matchMedia if it doesn't exist
if (!window.matchMedia) {
  window.matchMedia = (query: string): MediaQueryList => {
    return new MediaQueryListMock(query);
  };
}

export { MediaQueryListMock };
