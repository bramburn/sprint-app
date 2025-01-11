// @ts-nocheck
import * as assert from 'assert';
import * as vscode from 'vscode';
import { activate } from '../extension';
import { SidebarProvider } from '../SidebarProvider';

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
    it('Extension should activate', () => {
        // Activate the extension
        activate(mockExtensionContext);

        // Check that subscriptions were added
        assert.strictEqual(mockExtensionContext.subscriptions.length > 0, true, 'No subscriptions were added during activation');
    });

    it('Sidebar view registration', () => {
        const sidebarProvider = new SidebarProvider(mockExtensionContext.extensionUri);
        
        // Verify static properties
        assert.strictEqual(SidebarProvider.viewId, 'sprint-sidebar-view', 'Incorrect sidebar view ID');
    });
});
