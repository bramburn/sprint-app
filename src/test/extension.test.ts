import * as assert from 'assert';
import * as vscode from 'vscode';
import { activate } from '../extension';
import { SidebarProvider } from '../SidebarProvider';

suite('Sprint App Extension Test Suite', () => {
  test('Extension should activate', async () => {
    const extensionContext = {
      subscriptions: [],
      extensionUri: vscode.Uri.file('/mock/extension/path'),
      // Mock other necessary context properties
      asAbsolutePath: () => '',
      globalState: {} as any,
      workspaceState: {} as any,
      secrets: {} as any,
      storageUri: undefined,
      globalStorageUri: vscode.Uri.file('/mock/global/storage'),
      logUri: vscode.Uri.file('/mock/log'),
      extensionPath: '/mock/extension/path',
      environmentVariableCollection: {} as any,
      // Add a mock method for pushing to subscriptions
      subscriptionCount: 0,
      push: function(disposable: vscode.Disposable) {
        this.subscriptions.push(disposable);
        this.subscriptionCount++;
      }
    } as vscode.ExtensionContext;

    // Activate the extension
    activate(extensionContext);

    // Check that subscriptions were added
    assert.strictEqual(extensionContext.subscriptionCount > 0, true, 'No subscriptions were added during activation');
  });

  test('Sidebar view is registered', async () => {
    // This test checks if the sidebar view is properly registered
    const registeredViews = await vscode.commands.executeCommand('vscode.getRegisteredViews');
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
    try {
      sidebarProvider.resolveWebviewView(
        mockWebviewView, 
        {} as vscode.WebviewViewResolveContext, 
        {} as vscode.CancellationToken
      );
      
      // Check that webview HTML was set
      assert.notStrictEqual(mockWebviewView.webview.html, '', 'Webview HTML was not set');
    } catch (error) {
      assert.fail(`Failed to resolve webview: ${error}`);
    }
  });
});
