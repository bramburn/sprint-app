// @ts-nocheck
import * as assert from 'assert';
import * as vscode from 'vscode';
import { activate } from '../extension';
import { SidebarProvider } from '../SidebarProvider';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock vscode module
vi.mock('vscode', () => {
  const mockExtensions = {
    getExtension: vi.fn()
  };

  const mockWorkspace = {
    workspaceFolders: [{ uri: 'file:///test/workspace' }]
  };

  const mockWindow = {
    showErrorMessage: vi.fn(),
    createTreeView: vi.fn()
  };

  return {
    extensions: mockExtensions,
    workspace: mockWorkspace,
    window: mockWindow,
    commands: {
      registerCommand: vi.fn(),
      executeCommand: vi.fn()
    },
    WebviewView: class {},
    WebviewViewProvider: class {},
    CancellationToken: class {}
  };
});

const mockExtensionContext: vscode.ExtensionContext = {
    subscriptions: [],
    extensionUri: {
        path: "/mock/extension/path",
        scheme: "file",
        authority: "",
        query: "",
        fragment: "",
        fsPath: "/mock/extension/path",
        with: () => mockExtensionContext.extensionUri,
        toString: () => "/mock/extension/path",
        toJSON: () => "/mock/extension/path"
    } as vscode.Uri,
    storageUri: {
        path: "/mock/storage/path",
        scheme: "file",
        authority: "",
        query: "",
        fragment: "",
        fsPath: "/mock/storage/path",
        with: () => mockExtensionContext.storageUri!,
        toString: () => "/mock/storage/path",
        toJSON: () => "/mock/storage/path"
    } as vscode.Uri,
    globalStorageUri: {
        path: "/mock/global/storage/path",
        scheme: "file",
        authority: "",
        query: "",
        fragment: "",
        fsPath: "/mock/global/storage/path",
        with: () => mockExtensionContext.globalStorageUri!,
        toString: () => "/mock/global/storage/path",
        toJSON: () => "/mock/global/storage/path"
    } as vscode.Uri,
    logUri: {
        path: "/mock/log/path",
        scheme: "file",
        authority: "",
        query: "",
        fragment: "",
        fsPath: "/mock/log/path",
        with: () => mockExtensionContext.logUri!,
        toString: () => "/mock/log/path",
        toJSON: () => "/mock/log/path"
    } as vscode.Uri,
    extensionMode: vscode.ExtensionMode.Test,
    environmentVariableCollection: {
        replace: () => {},
        persistent: true,
        description: "Mock Environment Variables",
        getScoped: (scope: vscode.EnvironmentVariableScope) => ({}),
        append: () => {},
        forEach: () => {},
        get: () => undefined,
        delete: () => {}
    } as vscode.GlobalEnvironmentVariableCollection,
    secrets: {
        get: () => Promise.resolve(undefined),
        store: () => Promise.resolve(),
        delete: () => Promise.resolve(),
        onDidChange: new vscode.EventEmitter<vscode.SecretStorageChangeEvent>().event
    },
    workspaceState: {
        get: () => undefined,
        update: () => Promise.resolve(),
        keys: () => [],
        setKeysForSync: (keys: readonly string[]) => {}
    } as vscode.Memento & { setKeysForSync(keys: readonly string[]): void },
    globalState: {
        get: () => undefined,
        update: () => Promise.resolve(),
        keys: () => [],
        setKeysForSync: (keys: readonly string[]) => {}
    } as vscode.Memento & { setKeysForSync(keys: readonly string[]): void },
    extensionPath: "/mock/extension/path",
    asAbsolutePath: (relativePath: string) => `/mock/extension/path/${relativePath}`,
    storagePath: "/mock/storage/path",
    globalStoragePath: "/mock/global/storage/path",
    logPath: "/mock/log/path",
    extension: {} as vscode.Extension<any>,
    languageModelAccessInformation: {
        onDidChange: new vscode.EventEmitter<any>().event,
        canSendRequest: (chat: vscode.LanguageModelChat) => undefined
    }
};

describe('Sprint App Extension Test Suite', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('Extension should activate with valid workspace', async () => {
    const context = {
      subscriptions: [],
      extensionUri: vscode.Uri.parse('file:///test/extension')
    };

    activate(context as any);

    expect(context.subscriptions.length).toBeGreaterThan(0);
    expect(vscode.window.showErrorMessage).not.toHaveBeenCalled();
  });

  it('Extension should show error and not activate without workspace', async () => {
    // Temporarily remove workspace folders
    (vscode.workspace as any).workspaceFolders = [];

    const context = {
      subscriptions: [],
      extensionUri: vscode.Uri.parse('file:///test/extension')
    };

    activate(context as any);

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
      extensionUri: vscode.Uri.parse('file:///test/extension')
    };

    activate(context as any);

    expect(vscode.window.createTreeView).toHaveBeenCalledWith(
      'sprint-sidebar-view', 
      expect.anything()
    );
  });

  it('should have correct sidebar configuration', () => {
    const packageJson = require('../../package.json');
    
    expect(packageJson.contributes.viewsContainers.activitybar[0].id).toBe('sprint-sidebar');
    expect(packageJson.contributes.views.activitybar[0].id).toBe('sprint-sidebar-view');
  });
});
