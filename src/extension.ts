// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { MessageCommand } from '@sprint-app/shared/messages/types';
import { 
  ThemeConfiguration, 
  createDefaultTheme 
} from '@sprint-app/shared/theme/types';
import * as crypto from 'crypto';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    console.log('Congratulations, your extension "sprint-ai" is now active!');

    // Webview panel management
    let currentPanel: vscode.WebviewPanel | undefined = undefined;

    // Command to show settings webview
    const showWebviewCommand = vscode.commands.registerCommand('sprint-ai.showWebview', () => {
        const columnToShowIn = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : vscode.ViewColumn.One;

        if (currentPanel) {
            // If we already have a panel, show it in the target column
            currentPanel.reveal(columnToShowIn ?? vscode.ViewColumn.One);
        } else {
            // Create a new panel
            currentPanel = vscode.window.createWebviewPanel(
                'sprintAISettings',
                'Sprint AI Settings',
                columnToShowIn ?? vscode.ViewColumn.One,
                {
                    enableScripts: true,
                    retainContextWhenHidden: true
                }
            );

            // Set webview HTML
            currentPanel.webview.html = getWebviewContent(currentPanel.webview, context);

            // Handle messages from the webview
            currentPanel.webview.onDidReceiveMessage(
                (message) => {
                    switch (message.command) {
                        case MessageCommand.READY:
                            handleReadyMessage(message, currentPanel!);
                            break;
                        case MessageCommand.SETTINGS_UPDATE:
                            handleSettingsUpdate(message, context);
                            break;
                        default:
                            console.warn('Unknown message command:', message.command);
                    }
                },
                undefined,
                context.subscriptions
            );

            // Handle panel closure
            currentPanel.onDidDispose(
                () => {
                    currentPanel = undefined;
                },
                null,
                context.subscriptions
            );
        }
    });

    context.subscriptions.push(showWebviewCommand);

    // Listen for theme changes
    
}

function handleReadyMessage(message: any, panel: vscode.WebviewPanel) {
    // Get the current VS Code color theme
    const currentColorTheme = vscode.window.activeColorTheme;
    
    
    

    // Send initial settings
    panel.webview.postMessage({
        command: MessageCommand.SETTINGS_UPDATE,
        timestamp: Date.now(),
        id: `initial-settings-${Date.now()}`,
        payload: {
            settings: {
                account: {
                    email: 'user@example.com',
                    accountType: 'free'
                },
                aiRules: {
                    rules: [
                        'Always be helpful',
                        'Provide clear explanations'
                    ],
                    includeCursorRules: true
                }
            },
            version: 1
        }
    });

    // Send current theme
   
}

function handleSettingsUpdate(message: any, context: vscode.ExtensionContext) {
    console.log('Settings update received:', message.payload);
    
    // Persist settings using extension context
    context.globalState.update('sprintAISettings', message.payload.settings);
}

function getWebviewContent(webview: vscode.Webview, context: vscode.ExtensionContext): string {
    // Get the local resource root path for our webview
    const webviewDir = vscode.Uri.joinPath(
        vscode.Uri.file(context.extensionPath), 
        'out', 
        'webview-settings'
    );

    // Generate a nonce to allow specific script execution
    const nonce = generateNonce();

    // Convert to webview URI
    const baseUri = webview.asWebviewUri(webviewDir);
    const scriptUri = webview.asWebviewUri(
        vscode.Uri.joinPath(webviewDir, 'index.js')
    );
    const styleUri = webview.asWebviewUri(
        vscode.Uri.joinPath(webviewDir, 'index.css')
    );

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Sprint AI Settings</title>
            <meta http-equiv="Content-Security-Policy" content="default-src 'none'; 
                style-src ${baseUri} 'unsafe-inline'; 
                script-src 'nonce-${nonce}';
                img-src ${baseUri} data:;
                connect-src vscode-webview:">
            <link href="${styleUri}" rel="stylesheet">
        </head>
        <body>
            <div id="root"></div>
            <script nonce="${nonce}" src="${scriptUri}"></script>
        </body>
        </html>
    `;
}

// Utility function to generate a cryptographically secure nonce
function generateNonce(): string {
    return Array.from(crypto.getRandomValues(new Uint8Array(16)))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

export function deactivate() {
    // Cleanup logic if needed
}