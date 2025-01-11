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

    // Activate the extension
    activate(mockContext);

    // Verify commands were registered
    expect(mockContext.subscriptions.length).toBe(1);
    
    // Verify specific commands were registered
    const registeredCommands = mockContext.subscriptions
      .filter(sub => sub.hasOwnProperty('dispose'))
      .map(sub => sub.dispose);
    
    expect(registeredCommands.length).toBeGreaterThan(0);
    expect(vscode.commands.registerCommand).toHaveBeenCalled();
  });

  it('should have open webview command', () => {
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

    // Activate the extension
    activate(mockContext);

    // Verify the openWebview command was registered
    expect(vscode.commands.registerCommand).toHaveBeenCalledWith(
      'sprint-app.openWebview',
      expect.any(Function)
    );
  });

  it('deactivate function should not throw', () => {
    expect(() => deactivate()).not.toThrow();
  });
});
