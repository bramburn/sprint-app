import * as vscode from 'vscode';
import { Subject } from 'rxjs';
import { filter, map, catchError } from 'rxjs/operators';

export class SidebarProvider implements vscode.WebviewViewProvider {
  public static readonly viewId = 'sprint-sidebar-view';
  private _view?: vscode.WebviewView;
  private messageSubject = new Subject<any>();
  private errorSubject = new Subject<any>();

  constructor(
    private readonly _extensionUri: vscode.Uri,
  ) {
    // Setup error handling
    this.errorSubject.subscribe(error => {
      console.error('Webview Error:', error);
      vscode.window.showErrorMessage(`Sprint App Sidebar Error: ${error.message}`);
    });

    // Setup message handling with error handling
    this.messageSubject.pipe(
      filter(msg => msg && typeof msg === 'object' && 'command' in msg),
      map(msg => {
        switch (msg.command) {
          case 'alert':
            return {
              command: 'response',
              text: `Processed: ${msg.text}`
            };
          case 'error':
            throw new Error(msg.text);
          default:
            console.log('Unknown command:', msg.command);
            return msg;
        }
      }),
      catchError((error, caught) => {
        this.errorSubject.next(error as any);
        return caught;
      })
    ).subscribe(msg => {
      if (this._view) {
        this._view.webview.postMessage(msg).then(
          () => {},
          (error: any) => {
            this.errorSubject.next(error);
          }
        );
      }
    });
  }

  resolveWebviewView(
    webviewView: vscode.WebviewView, 
    context: vscode.WebviewViewResolveContext, 
    token: vscode.CancellationToken
  ): void {
    try {
      this._view = webviewView;

      // Configure webview options
      webviewView.webview.options = {
        enableScripts: true,
        localResourceRoots: [this._extensionUri]
      };

      // Set webview HTML content
      webviewView.webview.html = this.getHtmlForWebview(webviewView.webview);

      // Setup message listener
      const messageDisposable = webviewView.webview.onDidReceiveMessage(
        message => {
          console.log('Received message from webview:', message);
          this.messageSubject.next(message);
        }
      );

      // Optional: Handle view state changes
      const visibilityDisposable = webviewView.onDidChangeVisibility(
        () => {
          console.log(`Sidebar visibility changed: ${webviewView.visible}`);
        }
      );

      // Manually manage disposables
      token.onCancellationRequested(() => {
        messageDisposable.dispose();
        visibilityDisposable.dispose();
      });
    } catch (error) {
      console.error('Error resolving webview view:', error);
      vscode.window.showErrorMessage(`Failed to initialize Sprint App Sidebar: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private getHtmlForWebview(webview: vscode.Webview): string {
    try {
      const nonce = this.getNonce();

      return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Sprint App Sidebar</title>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
              padding: 10px;
              background-color: var(--vscode-editor-background);
              color: var(--vscode-editor-foreground);
            }
          </style>
        </head>
        <body>
          <h2>Sprint App</h2>
          <p>Welcome to your Sprint App Sidebar!</p>
          <script nonce="${nonce}">
            const vscode = acquireVsCodeApi();
            console.log('Sidebar script initialized');
          </script>
        </body>
        </html>`;
    } catch (error) {
      console.error('Error generating webview HTML:', error);
      return `
        <!DOCTYPE html>
        <html>
        <body>
          <h1>Error Loading Sprint App Sidebar</h1>
          <p>${error instanceof Error ? error.message : 'Unknown error'}</p>
        </body>
        </html>`;
    }
  }

  // Utility method to generate a cryptographically secure nonce
  private getNonce(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let nonce = '';
    for (let i = 0; i < 32; i++) {
      nonce += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return nonce;
  }
}
