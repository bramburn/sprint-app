// @ts-nocheck
import * as assert from 'assert';
import * as vscode from 'vscode';
import * as extension from '../extension.mjs';
import { SidebarProvider } from '../SidebarProvider.mjs';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Create a mock implementation of vscode
const mockVscode = {
  EventEmitter: class EventEmitter {
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
    };

    fire = (event: any) => {
      this.listeners.forEach(listener => listener(event));
    };
  },
  workspace: {
    workspaceFolders: [{ uri: 'file:///test/workspace' }]
  },
  window: {
    showErrorMessage: vi.fn(),
    showInformationMessage: vi.fn(),
    createTreeView: vi.fn(),
    registerWebviewViewProvider: vi.fn()
  },
  commands: {
    registerCommand: vi.fn(),
    executeCommand: vi.fn()
  },
  Uri: {
    file: (path: string) => ({ path }),
    parse: (uri: string) => ({ path: uri })
  },
  ExtensionMode: {
    Development: 'development',
    Production: 'production',
    Test: 'test'
  }
};

// Mock the vscode module
vi.mock('vscode', () => {
  return {
    __esModule: true,
    default: mockVscode,
    ...mockVscode
  };
});

describe('Sprint App Extension Test Suite', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('Extension should activate with valid workspace', async () => {
    const context = {
      subscriptions: [],
      extensionUri: vscode.Uri.file('/test/extension')
    };

    extension.activate(context as any);

    expect(context.subscriptions.length).toBeGreaterThan(0);
    expect(vscode.window.showErrorMessage).not.toHaveBeenCalled();
  });

  it('Extension should show error and not activate without workspace', async () => {
    // Temporarily remove workspace folders
    (vscode.workspace as any).workspaceFolders = [];

    const context = {
      subscriptions: [],
      extensionUri: vscode.Uri.file('/test/extension')
    };

    extension.activate(context as any);

    expect(context.subscriptions.length).toBe(0);
    expect(vscode.window.showErrorMessage).toHaveBeenCalledWith(
      'No workspace folder found. Please open a folder or workspace to use this extension.'
    );

    // Restore workspace folders
    (vscode.workspace as any).workspaceFolders = [{ uri: 'file:///test/workspace' }];
  });
});

describe('Sprint App Extension', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should register sidebar view provider', async () => {
    const context = {
      subscriptions: [],
      extensionUri: vscode.Uri.file('/test/extension')
    };

    extension.activate(context as any);

    expect(vscode.window.registerWebviewViewProvider).toHaveBeenCalledWith(
      'sprint-sidebar-view', 
      expect.anything(),
      expect.objectContaining({
        webviewOptions: {
          retainContextWhenHidden: true
        }
      })
    );
  });

  it('should have correct sidebar configuration', () => {
    const packageJson = require('../../package.json');
    
    expect(packageJson.contributes.viewsContainers.activitybar[0].id).toBe('sprint-sidebar');
    expect(packageJson.contributes.views['sprint-sidebar'][0].id).toBe('sprint-sidebar-view');
  });
});
