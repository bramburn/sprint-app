"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const extension = require("../extension.mjs");
const vitest_1 = require("vitest");
// Create a mock implementation of vscode
const mockVscode = {
    EventEmitter: class EventEmitter {
        listeners = [];
        event = (listener) => {
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
        fire = (event) => {
            this.listeners.forEach(listener => listener(event));
        };
    },
    workspace: {
        workspaceFolders: [{ uri: 'file:///test/workspace' }]
    },
    window: {
        showErrorMessage: vitest_1.vi.fn(),
        showInformationMessage: vitest_1.vi.fn(),
        createTreeView: vitest_1.vi.fn(),
        registerWebviewViewProvider: vitest_1.vi.fn()
    },
    commands: {
        registerCommand: vitest_1.vi.fn(),
        executeCommand: vitest_1.vi.fn()
    },
    Uri: {
        file: (path) => ({ path }),
        parse: (uri) => ({ path: uri })
    },
    ExtensionMode: {
        Development: 'development',
        Production: 'production',
        Test: 'test'
    }
};
// Mock the vscode module
vitest_1.vi.mock('vscode', () => {
    return {
        __esModule: true,
        default: mockVscode,
        ...mockVscode
    };
});
(0, vitest_1.describe)('Sprint App Extension Test Suite', () => {
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.resetAllMocks();
    });
    (0, vitest_1.it)('Extension should activate with valid workspace', async () => {
        const context = {
            subscriptions: [],
            extensionUri: vscode.Uri.file('/test/extension')
        };
        extension.activate(context);
        (0, vitest_1.expect)(context.subscriptions.length).toBeGreaterThan(0);
        (0, vitest_1.expect)(vscode.window.showErrorMessage).not.toHaveBeenCalled();
    });
    (0, vitest_1.it)('Extension should show error and not activate without workspace', async () => {
        // Temporarily remove workspace folders
        vscode.workspace.workspaceFolders = [];
        const context = {
            subscriptions: [],
            extensionUri: vscode.Uri.file('/test/extension')
        };
        extension.activate(context);
        (0, vitest_1.expect)(context.subscriptions.length).toBe(0);
        (0, vitest_1.expect)(vscode.window.showErrorMessage).toHaveBeenCalledWith('No workspace folder found. Please open a folder or workspace to use this extension.');
        // Restore workspace folders
        vscode.workspace.workspaceFolders = [{ uri: 'file:///test/workspace' }];
    });
});
(0, vitest_1.describe)('Sprint App Extension', () => {
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.resetAllMocks();
    });
    (0, vitest_1.it)('should register sidebar view provider', async () => {
        const context = {
            subscriptions: [],
            extensionUri: vscode.Uri.file('/test/extension')
        };
        extension.activate(context);
        (0, vitest_1.expect)(vscode.window.registerWebviewViewProvider).toHaveBeenCalledWith('sprint-sidebar-view', vitest_1.expect.anything(), vitest_1.expect.objectContaining({
            webviewOptions: {
                retainContextWhenHidden: true
            }
        }));
    });
    (0, vitest_1.it)('should have correct sidebar configuration', () => {
        const packageJson = require('../../package.json');
        (0, vitest_1.expect)(packageJson.contributes.viewsContainers.activitybar[0].id).toBe('sprint-sidebar');
        (0, vitest_1.expect)(packageJson.contributes.views['sprint-sidebar'][0].id).toBe('sprint-sidebar-view');
    });
});
//# sourceMappingURL=extension.test.js.map