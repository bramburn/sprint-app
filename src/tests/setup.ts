// @ts-nocheck
import { expect, afterEach, vi } from 'vitest';

// Declare global types for Vitest
declare global {
  const expect: typeof import('vitest').expect;
  const afterEach: typeof import('vitest').afterEach;
}

// Mock the vscode module globally
vi.mock('vscode', () => {
  const createMockVscode = () => ({
    window: {
      showInformationMessage: vi.fn((message: string) => Promise.resolve(message))
    },
    commands: {
      registerCommand: vi.fn((command: string, callback: (...args: any[]) => any) => ({
        dispose: vi.fn()
      })),
      getCommands: vi.fn().mockResolvedValue([
        'sprint-app.helloWorld', 
        'sprint-app.openWebview'
      ])
    },
    ExtensionContext: vi.fn(() => ({
      subscriptions: [],
      workspaceState: {
        get: vi.fn(),
        update: vi.fn()
      },
      globalState: {
        get: vi.fn(),
        update: vi.fn()
      },
      asAbsolutePath: vi.fn((relativePath: string) => relativePath)
    })),
    Uri: {
      file: vi.fn((path: string) => ({
        fsPath: path,
        toString: vi.fn(() => path)
      }))
    },
    ViewColumn: {
      One: 1,
      Two: 2,
      Three: 3
    }
  });

  return {
    default: createMockVscode(),
    ...createMockVscode()
  };
});

// Clean up after each test
afterEach(() => {
  // Add any global cleanup logic here if needed
});
