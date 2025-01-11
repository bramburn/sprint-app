// @ts-nocheck
import { describe, it, expect, vi } from 'vitest';
import * as vscode from 'vscode';

// Import the actual extension functions
import { activate, deactivate } from './extension';

describe('VSCode Extension', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  it('should register commands during activation', () => {
    // Create a mock extension context
    const mockContext = {
      subscriptions: [],
      extensionPath: '/mock/path',
      workspaceState: {
        get: vi.fn(),
        update: vi.fn()
      },
      globalState: {
        get: vi.fn(),
        update: vi.fn()
      }
    } as vscode.ExtensionContext;

    // Spy on vscode.window.createWebviewPanel
    const createWebviewPanelSpy = vi.spyOn(vscode.window, 'createWebviewPanel')
      .mockImplementation(() => ({
        webview: {
          html: '',
          onDidReceiveMessage: vi.fn(),
          postMessage: vi.fn(),
          asWebviewUri: vi.fn(),
          cspSource: ''
        },
        onDidDispose: vi.fn(),
        dispose: vi.fn()
      } as any));

    // Activate the extension
    activate(mockContext);

    // Verify commands were registered
    expect(mockContext.subscriptions.length).toBe(1);
    
    // Verify specific commands were registered
    const registeredCommands = mockContext.subscriptions
      .filter(sub => typeof sub === 'object' && 'dispose' in sub);
    expect(registeredCommands.length).toBe(1);

    // Cleanup
    createWebviewPanelSpy.mockRestore();
  });

  it('should have open webview command', async () => {
    const commands = await vscode.commands.getCommands();
    expect(commands).toContain('sprint-app.openWebview');
  });

  it('deactivate function should not throw', () => {
    expect(() => deactivate()).not.toThrow();
  });
});
