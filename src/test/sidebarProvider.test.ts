import { describe, it, expect, vi } from 'vitest';
import { SprintAppSidebarProvider } from '../views/sidebarProvider';
import * as vscode from 'vscode';

vi.mock('vscode');

describe('SprintAppSidebarProvider', () => {
    it('should initialize with correct viewType', () => {
        expect(SprintAppSidebarProvider.viewType).toBe('sprint-app-sidebar');
    });

    it('should resolve webview view with correct options', () => {
        const mockExtensionUri = {} as vscode.Uri;
        const provider = new SprintAppSidebarProvider(mockExtensionUri);
        
        const mockWebviewView = {
            webview: {
                options: {},
                html: '',
            }
        } as unknown as vscode.WebviewView;

        provider.resolveWebviewView(
            mockWebviewView,
            {} as vscode.WebviewViewResolveContext,
            {} as vscode.CancellationToken
        );

        expect(mockWebviewView.webview.options).toEqual({
            enableScripts: true,
            localResourceRoots: [mockExtensionUri]
        });
        expect(mockWebviewView.webview.html).toContain('Sprint App');
    });
});
