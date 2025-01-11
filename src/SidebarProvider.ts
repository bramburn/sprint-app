import * as vscode from 'vscode';
import { Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export class SidebarProvider implements vscode.WebviewViewProvider {
  public static readonly viewId = 'sprint-sidebar-view';
  private _view?: vscode.WebviewView;
  private messageSubject = new Subject<any>();

  constructor(
    private readonly _extensionUri: vscode.Uri,
  ) {
    // Setup message handling
    this.messageSubject.pipe(
      filter(msg => msg.command === 'alert'),
      map(msg => ({
        ...msg,
        text: `Processed: ${msg.text}`
      }))
    ).subscribe(msg => {
      if (this._view) {
        this._view.webview.postMessage({
          command: 'response',
          text: msg.text
        });
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
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'webview-ui', 'dist', 'assets', 'main.js')
    );
    const styleUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'webview-ui', 'dist', 'assets', 'main.css')
    );

    const nonce = this._getNonce();

    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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

  private _getNonce() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}
