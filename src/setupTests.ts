// src/setupTests.ts
import { vi } from 'vitest';

// Comprehensive mock of VS Code API
vi.mock('vscode', () => ({
    // Workspace mocks
    workspace: {
        getConfiguration: vi.fn().mockReturnValue({
            get: vi.fn(),
            update: vi.fn(),
        }),
        onDidChangeConfiguration: vi.fn(),
        workspaceFolders: [],
    },
    
    // Window mocks
    window: {
        showInformationMessage: vi.fn(),
        showErrorMessage: vi.fn(),
        createOutputChannel: vi.fn().mockReturnValue({
            append: vi.fn(),
            clear: vi.fn(),
            show: vi.fn(),
        }),
    },
    
    // Commands mocks
    commands: {
        registerCommand: vi.fn(),
        executeCommand: vi.fn(),
    },
    
    // Additional common VS Code API mocks
    Uri: {
        file: vi.fn(),
        parse: vi.fn(),
    },
    
    // Disposable mock
    Disposable: vi.fn().mockReturnValue({
        dispose: vi.fn(),
    }),
}));

// Optional: Global test setup
beforeEach(() => {
    // Reset all mocks before each test
    vi.resetAllMocks();
});