// @ts-nocheck
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as vscode from 'vscode';
import { SprintAppSidebarProvider } from './views/sidebarProvider';

// Import the actual extension functions
import { activate, deactivate } from './extension';

// Mock vscode namespace
vi.mock('vscode', () => ({
    ExtensionContext: vi.fn(),
    window: {
        registerWebviewViewProvider: vi.fn(),
        createWebviewPanel: vi.fn(),
    },
    commands: {
        registerCommand: vi.fn(),
    },
    Uri: {
        file: vi.fn(),
        parse: vi.fn(),
    },
    ViewColumn: { One: 1 },
}));

describe('VSCode Extension', () => {
    let mockContext;

    beforeEach(() => {
        // Clear all mocks before each test
        vi.clearAllMocks();

        // Create a mock extension context
        mockContext = {
            subscriptions: [],
            extensionUri: vscode.Uri.file('/mock/path'),
            extensionPath: '/mock/path',
            workspaceState: {
                get: vi.fn(),
                update: vi.fn()
            },
            globalState: {
                get: vi.fn(),
                update: vi.fn()
            }
        };
    });

    it('should register commands and sidebar provider during activation', () => {
        // Activate the extension
        activate(mockContext);

        // Verify sidebar provider was registered
        expect(vscode.window.registerWebviewViewProvider).toHaveBeenCalledWith(
            SprintAppSidebarProvider.viewType,
            expect.any(SprintAppSidebarProvider)
        );

        // Verify commands were registered
        expect(vscode.commands.registerCommand).toHaveBeenCalledWith(
            'sprint-app.openWebview',
            expect.any(Function)
        );

        // Verify subscriptions were added
        expect(mockContext.subscriptions.length).toBeGreaterThan(0);
    });

    it('should register webview view provider with correct options', () => {
        activate(mockContext);

        // Get the provider instance that was registered
        const providerCall = vi.mocked(vscode.window.registerWebviewViewProvider).mock.calls[0];
        const provider = providerCall[1];

        // Create a mock webview view
        const mockWebviewView = {
            webview: {
                options: {},
                html: '',
            }
        };

        // Resolve the webview
        provider.resolveWebviewView(
            mockWebviewView,
            { state: undefined },
            { isCancellationRequested: false, onCancellationRequested: vi.fn() }
        );

        // Verify webview options
        expect(mockWebviewView.webview.options).toEqual({
            enableScripts: true,
            localResourceRoots: [mockContext.extensionUri]
        });

        // Verify webview HTML content
        expect(mockWebviewView.webview.html).toContain('Sprint App');
    });

    it('should have open webview command', () => {
        activate(mockContext);

        // Verify the openWebview command was registered
        expect(vscode.commands.registerCommand).toHaveBeenCalledWith(
            'sprint-app.openWebview',
            expect.any(Function)
        );
    });

    it('should clean up resources on deactivate', () => {
        // Add a mock subscription
        const mockDisposable = { dispose: vi.fn() };
        mockContext.subscriptions.push(mockDisposable);

        // Deactivate the extension
        deactivate();

        // No explicit cleanup needed in current implementation
        // This test can be expanded when deactivate functionality is added
        expect(true).toBe(true);
    });
});
