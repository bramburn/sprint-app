import * as vscode from 'vscode';

declare module 'vscode' {
  export interface Uri {
    joinPath(uri: vscode.Uri, ...pathSegments: string[]): vscode.Uri;
  }
}