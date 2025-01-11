// @ts-nocheck
import type * as vscode from 'vscode';
import * as path from 'path';

// Stub for ExtensionContext
export const extensionContext: Partial<vscode.ExtensionContext> = {
  subscriptions: [],
  extensionPath: '/stub/extension/path',
  workspaceState: {
    get: () => undefined,
    update: () => Promise.resolve()
  },
  globalState: {
    get: () => undefined,
    update: () => Promise.resolve()
  },
  asAbsolutePath: (relativePath: string) => 
    path.join('/stub/extension/path', relativePath)
};

// Stub for Commands
export const commands = {
  registerCommand: (command: string, callback: (...args: any[]) => any) => ({
    dispose: () => {}
  }),
  executeCommand: () => Promise.resolve(),
  getCommands: () => Promise.resolve([
    'sprint-app.helloWorld', 
    'sprint-app.openWebview'
  ])
};

// Stub for Window
export const window = {
  showInformationMessage: (message: string) => Promise.resolve(message),
  createWebviewPanel: (
    viewType: string, 
    title: string, 
    showOptions: vscode.ViewColumn | { viewColumn: vscode.ViewColumn, preserveFocus?: boolean }, 
    options?: vscode.WebviewPanelOptions
  ) => ({
    webview: {
      html: '',
      options: {},
      asWebviewUri: (localResource: vscode.Uri) => localResource,
      onDidReceiveMessage: () => {},
      postMessage: () => {},
      cspSource: 'stub-csp-source'
    },
    onDidDispose: () => {},
    dispose: () => {},
    reveal: () => {},
    title: title,
    viewType: viewType
  })
};

// Stub for Uri
export const Uri = {
  file: (path: string) => ({
    fsPath: path,
    scheme: 'file',
    authority: '',
    path: path,
    query: '',
    fragment: '',
    toString: () => path
  }),
  parse: (path: string) => ({
    fsPath: path,
    scheme: 'file',
    authority: '',
    path: path,
    query: '',
    fragment: '',
    toString: () => path
  })
};

// Stub for Disposable
export const Disposable = {
  from: () => ({
    dispose: () => {}
  })
};

// ViewColumn Enum Stub
export const ViewColumn = {
  One: 1,
  Two: 2,
  Three: 3
};
