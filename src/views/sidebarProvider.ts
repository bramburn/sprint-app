import * as vscode from 'vscode';

export class SprintAppSidebarProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = 'sprint-app-sidebar';

    constructor(
        private readonly _extensionUri: vscode.Uri,
    ) {}

    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _context: vscode.WebviewViewResolveContext,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _token: vscode.CancellationToken,
    ) {
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [
                this._extensionUri
            ]
        };

        webviewView.webview.html = this._getHtmlForWebview();
    }

    private _getHtmlForWebview() {
        return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Sprint App</title>
            </head>
            <body>
                <h2>Sprint App</h2>
                <div id="app">
                    <!-- Your sidebar content will go here -->
                </div>
            </body>
            </html>`;
    }
}
