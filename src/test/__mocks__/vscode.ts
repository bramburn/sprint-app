import { vi } from 'vitest';

// Mock EventEmitter
export class EventEmitter {
  private listeners: Array<(e: any) => void> = [];

  event = (listener: (e: any) => void) => {
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

  fire = (event: any) => {
    this.listeners.forEach(listener => listener(event));
  }
}

// Mock Uri
const mockUri = {
  path: '/mock/path',
  scheme: 'file',
  authority: '',
  query: '',
  fragment: '',
  fsPath: '/mock/fsPath',
  with: vi.fn(() => mockUri),
  toString: vi.fn(() => '/mock/path'),
  toJSON: vi.fn(() => '/mock/path'),
  joinPath: vi.fn((base, ...pathSegments) => mockUri)
};

// Mock Webview
const mockWebview = {
  options: {},
  html: '',
  cspSource: '',
  asWebviewUri: vi.fn(() => mockUri),
  onDidReceiveMessage: vi.fn((listener) => ({
    dispose: vi.fn()
  })),
  postMessage: vi.fn(() => Promise.resolve(true))
};

// Mock WebviewView
const mockWebviewView = {
  webview: mockWebview,
  title: undefined,
  description: undefined,
  badge: undefined,
  show: vi.fn()
};

// Mock WebviewViewResolveContext
const mockWebviewViewResolveContext = {};

// Mock CancellationToken
const mockCancellationToken = {
  isCancellationRequested: false,
  onCancellationRequested: vi.fn()
};

// Mock ExtensionContext
const mockExtensionContext = {
  subscriptions: [],
  extensionUri: mockUri,
  storageUri: mockUri,
  globalStorageUri: mockUri,
  logUri: mockUri,
  extensionMode: 'test',
  environmentVariableCollection: {
    replace: vi.fn(),
    persistent: true,
    description: 'Mock Environment Variables',
    getScoped: vi.fn(),
    append: vi.fn()
  },
  secrets: {
    get: vi.fn(),
    store: vi.fn(),
    delete: vi.fn(),
    onDidChange: new EventEmitter()
  },
  workspaceState: {
    get: vi.fn(),
    update: vi.fn(),
    keys: vi.fn(),
    setKeysForSync: vi.fn()
  },
  globalState: {
    get: vi.fn(),
    update: vi.fn(),
    keys: vi.fn(),
    setKeysForSync: vi.fn()
  },
  extensionPath: '/mock/extension/path',
  asAbsolutePath: vi.fn(),
  storagePath: '/mock/storage/path',
  globalStoragePath: '/mock/global/storage/path',
  logPath: '/mock/log/path',
  extension: {},
  languageModelAccessInformation: {
    onDidChange: new EventEmitter(),
    canSendRequest: vi.fn()
  }
};

// Mock window methods
const mockWindow = {
  showErrorMessage: vi.fn(),
  showInformationMessage: vi.fn(),
  registerWebviewViewProvider: vi.fn()
};

// Mock commands methods
const mockCommands = {
  registerCommand: vi.fn()
};

export const Uri = {
  file: vi.fn(() => mockUri),
  joinPath: vi.fn(() => mockUri)
};

export const window = mockWindow;
export const commands = mockCommands;
export const ExtensionMode = {
  Test: 'test'
};

export const ExtensionContext = mockExtensionContext;

export default {
  Uri,
  window,
  commands,
  ExtensionMode,
  ExtensionContext,
  EventEmitter
};
