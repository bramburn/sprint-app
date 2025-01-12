// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "sprint-ai" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    const disposable = vscode.commands.registerCommand('sprint-ai.helloWorld', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World from Sprint AI!');
    });

    // Create webview URIs using the proper VS Code API


    context.subscriptions.push(
        vscode.commands.registerCommand('sprint-ai.showWebview', () => {
            const panel = vscode.window.createWebviewPanel(
                'webview',
                'Settings Page',
                vscode.ViewColumn.One,
                { enableScripts: true }
            );
            const webviewDir = vscode.Uri.joinPath(context.extensionUri, 'out', 'webview');
            const uri = panel.webview.asWebviewUri(webviewDir);
            vscode.window.showInformationMessage(uri.toString());
            panel.webview.options = {
                enableScripts: true,
                localResourceRoots: [webviewDir]
            };
            const webviewCss = vscode.Uri.joinPath(context.extensionUri, 'out', 'webview', 'index.css');
            const webviewJs = vscode.Uri.joinPath(context.extensionUri, 'out', 'webview', 'index.js');
            const cssUri = panel.webview.asWebviewUri(webviewCss);
            const jsUri = panel.webview.asWebviewUri(webviewJs);
            panel.webview.html = getWebviewContent(uri.toString(), panel.webview.cspSource, cssUri.toString(), jsUri.toString());

            panel.webview.onDidReceiveMessage((message) => {
                switch (message.command) {
                    case 'ready':
                        console.log('Webview is ready, sending initial configuration');
                        // Send initial configuration
                        panel.webview.postMessage({
                            command: 'config',
                            payload: {
                                theme: 'default',
                                language: 'en',
                                featureFlags: {
                                    experimental: false
                                }
                            }
                        });
                        break;
                    case 'updateConfig':
                        console.log('Configuration update received:', message.payload);
                        // Optional: Persist configuration or perform additional actions
                        break;
                    case 'close':
                        panel.dispose();
                        break;
                    default:
                        console.error('Unknown command:', message.command);
                }
            });
        })
    );

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }



function getNonce(): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function getWebviewContent(baseUri: string, cspSource: string, styleUri: string, scriptUri: string): string {

    const nonce = getNonce();

    return `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${cspSource}; script-src 'nonce-${nonce}';">
            <link rel="stylesheet" type="text/css" href="${styleUri}">
            <title>Sprint AI</title>
            <script>
            window.baseUri = "${baseUri}";
            </script>
        </head>
        <body>
            <div id="root"></div>
            <script nonce="${nonce}" src="${scriptUri}"></script>
        </body>
    </html>`;

}