// The module 'vscode' contains the VS Code extensibility API
import * as vscode from 'vscode';
import { SidebarProvider } from './SidebarProvider.mjs';

// This method is called when your extension is activated
export async function activate(context: vscode.ExtensionContext) {
    try {
        console.log('Congratulations, your extension "sprint-ai" is now active!');

        // Check if a workspace folder exists
        if (!vscode.workspace.workspaceFolders || vscode.workspace.workspaceFolders.length === 0) {
            vscode.window.showErrorMessage('No workspace folder found. Please open a folder or workspace to use this extension.');
            return; // Exit early if no workspace is open
        }

        // Create the sidebar provider
        const sidebarProvider = new SidebarProvider(context.extensionUri);
    
        // Register the sidebar view provider with error handling
        try {
            context.subscriptions.push(
                vscode.window.registerWebviewViewProvider(
                    SidebarProvider.viewId, 
                    sidebarProvider,
                    {
                        webviewOptions: {
                            retainContextWhenHidden: true
                        }
                    }
                )
            );

            // Add a command to manually show the sidebar
            context.subscriptions.push(
                vscode.commands.registerCommand('sprint-ai.showSidebar', () => {
                    vscode.commands.executeCommand(`workbench.view.extension.${SidebarProvider.viewId}`);
                })
            );

            // Log successful registration
            console.log(`Sidebar provider registered with view ID: ${SidebarProvider.viewId}`);
        } catch (error) {
            // Log and show error if sidebar registration fails
            console.error('Failed to register sidebar provider:', error);
            vscode.window.showErrorMessage(`Sprint App: Failed to initialize sidebar - ${error instanceof Error ? error.message : 'Unknown error'}`);
            throw error; // Re-throw to ensure proper error handling
        }

        // The command has been defined in the package.json file
        const disposable = vscode.commands.registerCommand('sprint-ai.helloWorld', () => {
            vscode.window.showInformationMessage('Hello World from Sprint App!');
        });

        context.subscriptions.push(disposable);
    } catch (error) {
        console.error('Failed to activate extension:', error);
        vscode.window.showErrorMessage(`Sprint App: Failed to activate - ${error instanceof Error ? error.message : 'Unknown error'}`);
        throw error;
    }
}

// This method is called when your extension is deactivated
export function deactivate() {
    console.log('Sprint App extension is now deactivated');
}

// Export the module
export default {
    activate,
    deactivate
};
