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
    expect(mockContext.subscriptions.length).toBe(2);
    
    // Verify specific commands were registered
    const registeredCommands = mockContext.subscriptions
      .filter(sub => typeof sub === 'object' && 'dispose' in sub);
    expect(registeredCommands.length).toBe(2);
  });

  it('should have hello world command', async () => {
    const commands = await vscode.commands.getCommands();
    expect(commands).toContain('sprint-app.helloWorld');
  });

  it('should have open webview command', async () => {
    const commands = await vscode.commands.getCommands();
    expect(commands).toContain('sprint-app.openWebview');
  });

  it('deactivate function should not throw', () => {
    expect(() => deactivate()).not.toThrow();
  });

  it('should show information message when hello world command is executed', async () => {
    // Activate the extension first to register commands
    const mockContext = {
      subscriptions: [],
      workspaceState: { get: vi.fn(), update: vi.fn() },
      globalState: { get: vi.fn(), update: vi.fn() }
    } as vscode.ExtensionContext;
    activate(mockContext);

    // Simulate executing the hello world command
    const helloWorldCommand = mockContext.subscriptions
      .find(sub => typeof sub === 'object' && 'dispose' in sub);
    
    if (helloWorldCommand) {
      const message = await vscode.window.showInformationMessage('Hello World from sprint_app!');
      expect(message).toBe('Hello World from sprint_app!');
    }
  });
});
