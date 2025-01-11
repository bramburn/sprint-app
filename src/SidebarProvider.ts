import * as vscode from 'vscode';
import { Subject } from 'rxjs';
import { filter, map, catchError } from 'rxjs/operators';

export class SidebarProvider implements vscode.WebviewViewProvider {
  public static readonly viewId = 'sprint-sidebar-view';
  private _view?: vscode.WebviewView;
  private messageSubject = new Subject<any>();
  private errorSubject = new Subject<Error>();

  constructor(
    private readonly _extensionUri: vscode.Uri,
  ) {
    // Setup error handling
    this.errorSubject.subscribe(error => {
      vscode.window.showErrorMessage(`Webview Error: ${error.message}`);
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
        this.errorSubject.next(error as Error);
        return caught;
      })
    ).subscribe(msg => {
      if (this._view) {
        this._view.webview.postMessage(msg).then(
          () => {},
          (error: Error) => {
            this.errorSubject.next(error);
          }
        );
      }
    });
  }

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken,
  ) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [
        this._extensionUri
      ]
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    webviewView.webview.onDidReceiveMessage(message => {
      this.messageSubject.next(message);
    });
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    // Get the local path to main script of the webview
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'webview-ui', 'dist', 'assets', 'index.js')
    );

    // Get the local path to main style of the webview
    const styleUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'webview-ui', 'dist', 'assets', 'index.css')
    );

    // Use a nonce to only allow a specific script to be run
    const nonce = getNonce();

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
        <link href="${styleUri}" rel="stylesheet">
        <title>Sprint App</title>
      </head>
      <body>
        <div id="root"></div>
        <script nonce="${nonce}" src="${scriptUri}"></script>
      </body>
      </html>
    `;
  }
}

function getNonce() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
