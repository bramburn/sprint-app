import * as assert from 'assert';
import { activate } from '../extension';
import { SidebarProvider } from '../SidebarProvider';

// Create a more accurate mock of vscode.Uri
const createMockUri = (path: string) => ({
  path,
  scheme: 'file',
  authority: '',
  query: '',
  fragment: '',
  fsPath: path,
  with: () => createMockUri(path),
  toString: () => path,
  toJSON: () => path
});

// Create a more accurate mock of vscode.ExtensionContext
const createMockExtensionContext = () => ({
  subscriptions: [],
  extensionUri: createMockUri('/mock/extension/path'),
  storageUri: createMockUri('/mock/storage'),
  globalStorageUri: createMockUri('/mock/global/storage'),
  logUri: createMockUri('/mock/log'),
  extensionPath: '/mock/extension/path',
  asAbsolutePath: (relativePath: string) => `/mock/extension/path/${relativePath}`,
  globalState: {
    get: () => undefined,
    update: () => Promise.resolve(),
    keys: () => [],
  },
  workspaceState: {
    get: () => undefined,
    update: () => Promise.resolve(),
    keys: () => [],
  },
  secrets: {
    get: () => Promise.resolve(undefined),
    store: () => Promise.resolve(),
    delete: () => Promise.resolve(),
    onDidChange: {
      event: () => ({ dispose: () => {} })
    }
  },
  environmentVariableCollection: {
    replace: () => {},
    persistent: true,
    description: 'Mock Environment Variables',
    getScoped: () => ({}),
    append: () => {}
  },
  storagePath: undefined,
  globalStoragePath: '',
  logPath: '',
  extensionMode: 'development',
  extension: {},
  languageModelAccessInformation: {
    onDidChange: {
      event: () => ({ dispose: () => {} })
    },
    canSendRequest: false
  }
});

describe('Sprint App Extension Test Suite', () => {
  it('Extension should activate', () => {
    const extensionContext = createMockExtensionContext();

    // Activate the extension
    activate(extensionContext);

    // Check that subscriptions were added
    assert.strictEqual(extensionContext.subscriptions.length > 0, true, 'No subscriptions were added during activation');
  });

  it('Sidebar view registration', () => {
    const sidebarProvider = new SidebarProvider(createMockUri('/mock/extension/path'));
    
    // Verify static properties
    assert.strictEqual(SidebarProvider.viewId, 'sprint-sidebar-view', 'Incorrect sidebar view ID');
  });
});
