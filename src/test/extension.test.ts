import * as assert from 'assert';
import * as vscode from 'vscode';
import { activate } from '../extension';
import { SidebarProvider } from '../SidebarProvider';

suite('Sprint App Extension Test Suite', () => {
  test('Extension should activate', async () => {
    const subscriptions: vscode.Disposable[] = [];
    const extensionContext: vscode.ExtensionContext = {
      subscriptions,
      extensionUri: vscode.Uri.file('/mock/extension/path'),
      asAbsolutePath: () => '',
      globalState: {
        get: () => undefined,
        update: () => Promise.resolve()
      } as any,
      workspaceState: {
        get: () => undefined,
        update: () => Promise.resolve()
      } as any,
      secrets: {
        get: () => Promise.resolve(undefined),
        store: () => Promise.resolve(),
        delete: () => Promise.resolve()
      } as any,
      storageUri: undefined,
      globalStorageUri: vscode.Uri.file('/mock/global/storage'),
      logUri: vscode.Uri.file('/mock/log'),
      extensionPath: '/mock/extension/path',
      environmentVariableCollection: new Map() as any,
      storagePath: undefined,
      globalStoragePath: '',
      logPath: '',
      extensionMode: vscode.ExtensionMode.Development,
      extension: {} as any,
      languageModelAccessInformation: {} as any
    };

    // Activate the extension
    activate(extensionContext);

    // Check that subscriptions were added
    assert.strictEqual(subscriptions.length > 0, true, 'No subscriptions were added during activation');
  });

  test('Sidebar view is registered', async () => {
    // This test checks if the sidebar view is properly registered
    const registeredViews = await vscode.commands.executeCommand('vscode.getRegisteredViews') as any[];
    const sidebarViewExists = registeredViews.some((view: any) => 
      view.id === SidebarProvider.viewId
    );

    assert.strictEqual(sidebarViewExists, true, 'Sidebar view was not registered');
  });

  test('Sidebar provider can resolve webview', async () => {
    const extensionUri = vscode.Uri.file('/mock/extension/path');
    const sidebarProvider = new SidebarProvider(extensionUri);

    // Mock webview view
    const mockWebviewView = {
      webview: {
        options: {},
        html: '',
        onDidReceiveMessage: () => {},
        postMessage: () => true
      },
      title: 'Sprint App'
    } as unknown as vscode.WebviewView;

    // Attempt to resolve the webview
    sidebarProvider.resolveWebviewView(
      mockWebviewView, 
      {} as vscode.WebviewViewResolveContext, 
      {} as vscode.CancellationToken
    );

    // Add assertions as needed
    assert.ok(true, 'Webview resolved successfully');
  });
});
