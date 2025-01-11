// @ts-nocheck
import { vi } from 'vitest';
import type * as vscode from 'vscode';
import * as path from 'path';

// Mock ExtensionContext
export const mockExtensionContext: Partial<vscode.ExtensionContext> = {
  subscriptions: [],
  extensionPath: '/mock/extension/path',
  workspaceState: {
    get: vi.fn(),
    update: vi.fn()
  },
  globalState: {
    get: vi.fn(),
    update: vi.fn()
  },
  asAbsolutePath: vi.fn((relativePath: string) => 
    path.join('/mock/extension/path', relativePath)
  )
};

// Mock Commands
export const mockCommands = {
  registerCommand: vi.fn((command: string, callback: (...args: any[]) => any) => ({
    dispose: vi.fn()
  })),
  executeCommand: vi.fn(),
  getCommands: vi.fn().mockResolvedValue([
    'sprint-app.helloWorld', 
    'sprint-app.openWebview'
  ])
};

// Mock Window
export const mockWindow = {
  showInformationMessage: vi.fn((message: string) => Promise.resolve(message)),
  createWebviewPanel: vi.fn((
    viewType: string, 
    title: string, 
    showOptions: vscode.ViewColumn | { viewColumn: vscode.ViewColumn, preserveFocus?: boolean }, 
    options?: vscode.WebviewPanelOptions
  ) => ({
    webview: {
      html: '',
      options: {},
      asWebviewUri: vi.fn((localResource: vscode.Uri) => localResource),
      onDidReceiveMessage: vi.fn(),
      postMessage: vi.fn(),
      cspSource: 'mock-csp-source'
    },
    onDidDispose: vi.fn(),
    dispose: vi.fn(),
    reveal: vi.fn(),
    title: title,
    viewType: viewType
  }))
};

// Mock Uri
export const mockUri = {
  file: vi.fn((path: string) => ({
    fsPath: path,
    scheme: 'file',
    authority: '',
    path: path,
    query: '',
    fragment: '',
    toString: vi.fn(() => path)
  })),
  parse: vi.fn((path: string) => ({
    fsPath: path,
    scheme: 'file',
    authority: '',
    path: path,
    query: '',
    fragment: '',
    toString: vi.fn(() => path)
  }))
};

// Mock Disposable
export const mockDisposable = {
  from: vi.fn(() => ({
    dispose: vi.fn()
  }))
};

// Full mock object
export const vscodeFullMock = {
  ExtensionContext: vi.fn(() => mockExtensionContext),
  commands: mockCommands,
  window: mockWindow,
  Uri: mockUri,
  Disposable: mockDisposable,
  ViewColumn: {
    One: 1,
    Two: 2,
    Three: 3
  }
};
