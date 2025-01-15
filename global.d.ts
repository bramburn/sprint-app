import * as vscode from 'vscode';

declare module 'vscode' {
  export namespace Uri {
    function joinPath(uri: vscode.Uri, ...pathSegments: string[]): vscode.Uri;
  }
}