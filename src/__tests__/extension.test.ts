import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as vscode from 'vscode';
import * as extension from '../extension';
import { SidebarProvider } from '../SidebarProvider';

vi.mock('vscode', () => ({
  window: {
    registerWebviewViewProvider: vi.fn(),
    createWebviewPanel: vi.fn(),
    showInformationMessage: vi.fn(),
  },
  commands: {
    registerCommand: vi.fn(),
  },
  Uri: {
    file: vi.fn((path) => ({ fsPath: path })),
  },
  ViewColumn: {
    One: 1,
  },
  WebviewPanel: vi.fn(),
}));

describe('Extension Activation', () => {
  let mockContext: vscode.ExtensionContext;

  beforeEach(() => {
    vi.clearAllMocks();

    mockContext = {
      subscriptions: [],
      extensionUri: vscode.Uri.file('/test/extension'),
      extensionPath: '/test/extension',
      globalState: {
        get: vi.fn(),
        update: vi.fn(),
      },
    } as any;
  });

  it('should register sidebar view provider', () => {
    extension.activate(mockContext);

    expect(vscode.window.registerWebviewViewProvider).toHaveBeenCalledWith(
      'sprint-sidebar-view',
      expect.any(SidebarProvider),
      {
        webviewOptions: {
          retainContextWhenHidden: true,
        },
      }
    );
  });

  it('should register showWebview command', () => {
    extension.activate(mockContext);

    expect(vscode.commands.registerCommand).toHaveBeenCalledWith(
      'sprint-ai.showWebview',
      expect.any(Function)
    );
  });

  it('should add providers to subscriptions', () => {
    extension.activate(mockContext);

    expect(mockContext.subscriptions.length).toBeGreaterThan(0);
  });
}); 