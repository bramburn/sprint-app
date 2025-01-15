import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as vscode from 'vscode';
import { SidebarProvider } from '../SidebarProvider';
import { MessageCommand } from '@sprint-app/shared/messages/types';
import * as path from 'path';

vi.mock('vscode', () => ({
  Uri: {
    file: vi.fn((path) => ({ fsPath: path })),
  },
  WebviewView: vi.fn(),
  Webview: vi.fn(),
}));

describe('SidebarProvider', () => {
  let sidebarProvider: SidebarProvider;
  let mockWebviewView: vscode.WebviewView;
  let mockContext: vscode.ExtensionContext;
  let mockToken: vscode.CancellationToken;

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();

    // Create mock extension URI
    const mockExtensionUri = vscode.Uri.file('/test/extension');
    
    // Initialize the provider
    sidebarProvider = new SidebarProvider(mockExtensionUri);

    // Create mock webview
    mockWebviewView = {
      viewType: 'mockViewType',
      onDidDispose: vi.fn(),
      visible: true,
      onDidChangeVisibility: vi.fn(),
      show: vi.fn(),
      webview: {
        options: {},
        html: '',
        asWebviewUri: vi.fn((uri) => uri),
        onDidReceiveMessage: vi.fn(),
        postMessage: vi.fn(),
        cspSource: 'mock-csp-source'
      }
    };

    // Create mock context and token
    mockContext = {
      subscriptions: [],
      workspaceState: {
        get: vi.fn((key: string, defaultValue?: unknown) => defaultValue),
        update: vi.fn(),
        keys: vi.fn(() => []),
      },
      globalState: {
        get: vi.fn((key: string, defaultValue?: unknown) => defaultValue),
        update: vi.fn(),
        keys: vi.fn(() => []),
      },
      extensionPath: '/test/extension',
      globalStoragePath: '/test/globalStorage',
      logPath: '/test/logs',
      secrets: {},
      extensionUri: vscode.Uri.file('/test/extension'),
      storagePath: '/test/storage',
      asAbsolutePath: (relativePath: string) => path.join('/test/extension', relativePath),
    };
    mockToken = {};
  });

  it('should initialize with correct options', () => {
    sidebarProvider.resolveWebviewView(mockWebviewView, mockContext, mockToken);

    expect(mockWebviewView.webview.options).toEqual({
      enableScripts: true,
      localResourceRoots: [
        expect.objectContaining({
          fsPath: path.join('/test/extension', 'out', 'webview-sidebar')
        })
      ]
    });
  });

  it('should set HTML content with correct resources', () => {
    sidebarProvider.resolveWebviewView(mockWebviewView, mockContext, mockToken);

    expect(mockWebviewView.webview.html).toContain('<div id="root"></div>');
    expect(mockWebviewView.webview.html).toContain('index.js');
    expect(mockWebviewView.webview.html).toContain('index.css');
    expect(mockWebviewView.webview.html).toContain('Content-Security-Policy');
  });

  it('should handle READY message', () => {
    sidebarProvider.resolveWebviewView(mockWebviewView, mockContext, mockToken);

    // Get the message handler
    const messageHandler = mockWebviewView.webview.onDidReceiveMessage.mock.calls[0][0];

    // Create a mock ready message
    const readyMessage = {
      command: MessageCommand.READY
    };

    // Call the handler with the ready message
    messageHandler(readyMessage);

    // Verify console.log was called
    expect(console.log).toHaveBeenCalledWith('Webview is ready');
  });

  it('should handle unknown message command', () => {
    sidebarProvider.resolveWebviewView(mockWebviewView, mockContext, mockToken);

    // Get the message handler
    const messageHandler = mockWebviewView.webview.onDidReceiveMessage.mock.calls[0][0];

    // Create a mock unknown message
    const unknownMessage = {
      command: 'UNKNOWN_COMMAND'
    };

    // Call the handler with the unknown message
    messageHandler(unknownMessage);

    // Verify console.warn was called
    expect(console.warn).toHaveBeenCalledWith('Unknown message command:', 'UNKNOWN_COMMAND');
  });
}); 