import { vi } from 'vitest';
import type * as vscode from 'vscode';

// Mock EventEmitter
export class EventEmitter<T> {
  private listeners: Array<(e: T) => void> = [];

  event = (listener: (e: T) => void): vscode.Disposable => {
    this.listeners.push(listener);
    return {
      dispose: () => {
        const index = this.listeners.indexOf(listener);
        if (index !== -1) {
          this.listeners.splice(index, 1);
        }
      }
    };
  }

  fire = (event: T): void => {
    this.listeners.forEach(listener => listener(event));
  }
}

// Mock Disposable
export class Disposable implements vscode.Disposable {
  private _callOnDispose: () => void;

  constructor(callOnDispose: () => void) {
    this._callOnDispose = callOnDispose;
  }

  dispose(): void {
    this._callOnDispose();
  }
}

// Mock Uri
export class Uri implements vscode.Uri {
  scheme: string;
  authority: string;
  path: string;
  query: string;
  fragment: string;
  fsPath: string;

  constructor(scheme: string, authority: string, path: string, query: string, fragment: string) {
    this.scheme = scheme;
    this.authority = authority;
    this.path = path;
    this.query = query;
    this.fragment = fragment;
    this.fsPath = path;
  }

  with(change: { scheme?: string; authority?: string; path?: string; query?: string; fragment?: string }): vscode.Uri {
    return new Uri(
      change.scheme ?? this.scheme,
      change.authority ?? this.authority,
      change.path ?? this.path,
      change.query ?? this.query,
      change.fragment ?? this.fragment
    );
  }

  toString(skipEncoding?: boolean): string {
    return this.path;
  }

  toJSON(): string {
    return this.path;
  }

  static file(path: string): vscode.Uri {
    return new Uri('file', '', path, '', '');
  }

  static joinPath(base: vscode.Uri, ...pathSegments: string[]): vscode.Uri {
    return new Uri(base.scheme, base.authority, `${base.path}/${pathSegments.join('/')}`, base.query, base.fragment);
  }
}

// Mock Webview
export class Webview implements vscode.Webview {
  options: vscode.WebviewOptions = {};
  html = '';
  cspSource = '';
  private _messageListeners: Array<(message: any) => void> = [];

  asWebviewUri(uri: vscode.Uri): vscode.Uri {
    return uri;
  }

  onDidReceiveMessage(listener: (message: any) => void): vscode.Disposable {
    this._messageListeners.push(listener);
    return new Disposable(() => {
      const index = this._messageListeners.indexOf(listener);
      if (index !== -1) this._messageListeners.splice(index, 1);
    });
  }

  postMessage(message: any): Thenable<boolean> {
    return Promise.resolve(true);
  }
}

// Mock WebviewView
export class WebviewView implements vscode.WebviewView {
  webview: vscode.Webview = new Webview();
  visible = true;
  private _visibilityChangeListeners: Array<() => void> = [];

  onDidChangeVisibility(listener: () => void): vscode.Disposable {
    this._visibilityChangeListeners.push(listener);
    return new Disposable(() => {
      const index = this._visibilityChangeListeners.indexOf(listener);
      if (index !== -1) this._visibilityChangeListeners.splice(index, 1);
    });
  }

  show(): void {
    // Simulate showing the view
  }
}

// Mock WebviewViewProvider
export class WebviewViewProvider implements vscode.WebviewViewProvider {
  resolveWebviewView(webviewView: vscode.WebviewView, context: vscode.WebviewViewResolveContext<unknown>, token: vscode.CancellationToken): void | Thenable<void> {
    // Mock implementation
  }
}

// Mock ExtensionContext
export class ExtensionContext implements vscode.ExtensionContext {
  subscriptions: { dispose(): void }[] = [];
  extensionUri: vscode.Uri = new Uri('file', '', '/mock/extension', '', '');
  storageUri?: vscode.Uri = new Uri('file', '', '/mock/storage', '', '');
  globalStorageUri: vscode.Uri = new Uri('file', '', '/mock/global-storage', '', '');
  logUri: vscode.Uri = new Uri('file', '', '/mock/log', '', '');
  extensionMode: vscode.ExtensionMode = 'development';
  globalState = {
    get: vi.fn(),
    update: vi.fn(),
    keys: vi.fn()
  };
  workspaceState = {
    get: vi.fn(),
    update: vi.fn(),
    keys: vi.fn()
  };
  secrets = {
    get: vi.fn(),
    store: vi.fn(),
    delete: vi.fn(),
    onDidChange: vi.fn()
  };
  environmentVariableCollection = {
    replace: vi.fn(),
    append: vi.fn(),
    prepend: vi.fn(),
    get: vi.fn(),
    forEach: vi.fn(),
    delete: vi.fn(),
    clear: vi.fn(),
    persistent: true
  };
}

// Mock Workspace
export const workspace = {
  workspaceFolders: [{
    uri: new Uri('file', '', '/mock/workspace', '', ''),
    name: 'MockWorkspace',
    index: 0
  }]
};

// Mock Window
export const window = {
  showErrorMessage: vi.fn(),
  showInformationMessage: vi.fn(),
  registerWebviewViewProvider: vi.fn()
};

// Mock Commands
export const commands = {
  registerCommand: vi.fn(),
  executeCommand: vi.fn()
};

export default {
  EventEmitter,
  Disposable,
  Uri,
  Webview,
  WebviewView,
  WebviewViewProvider,
  ExtensionContext,
  workspace,
  window,
  commands,
  ExtensionMode: {
    Development: 'development',
    Production: 'production',
    Test: 'test'
  }
};
