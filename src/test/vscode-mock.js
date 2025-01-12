"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtensionContext = exports.LanguageModelAccessInformation = exports.SecretStorage = exports.Memento = exports.EnvironmentVariableCollection = exports.ExtensionMode = exports.EventEmitter = exports.Uri = void 0;
// Mock implementation of vscode module for testing
exports.Uri = {
    file: (path) => ({
        path,
        scheme: 'file',
        authority: '',
        query: '',
        fragment: '',
        fsPath: path,
        with: () => exports.Uri.file(path),
        toString: () => path,
        toJSON: () => path
    })
};
const EventEmitter = class {
    listeners = [];
    event = (listener) => {
        this.listeners.push(listener);
        return {
            dispose: () => {
                const index = this.listeners.indexOf(listener);
                if (index !== -1) {
                    this.listeners.splice(index, 1);
                }
            }
        };
    };
    fire = (event) => {
        this.listeners.forEach(listener => listener(event));
    };
};
exports.EventEmitter = EventEmitter;
exports.ExtensionMode = {
    Test: 'test'
};
exports.EnvironmentVariableCollection = {
    replace: () => { },
    persistent: true,
    description: 'Mock Environment Variables',
    getScoped: () => ({}),
    append: () => { },
    forEach: () => { },
    get: () => undefined,
    delete: () => { }
};
exports.Memento = {
    get: () => undefined,
    update: () => Promise.resolve(),
    keys: () => [],
    setKeysForSync: () => { }
};
exports.SecretStorage = {
    get: () => Promise.resolve(undefined),
    store: () => Promise.resolve(),
    delete: () => Promise.resolve(),
    onDidChange: new exports.EventEmitter().event
};
exports.LanguageModelAccessInformation = {
    onDidChange: new exports.EventEmitter().event,
    canSendRequest: () => undefined
};
exports.ExtensionContext = {
    subscriptions: [],
    extensionUri: exports.Uri.file('/mock/extension/path'),
    storageUri: exports.Uri.file('/mock/storage'),
    globalStorageUri: exports.Uri.file('/mock/global/storage'),
    logUri: exports.Uri.file('/mock/log'),
    extensionMode: exports.ExtensionMode.Test,
    environmentVariableCollection: exports.EnvironmentVariableCollection,
    secrets: exports.SecretStorage,
    workspaceState: exports.Memento,
    globalState: exports.Memento,
    extensionPath: '/mock/extension/path',
    asAbsolutePath: (relativePath) => `/mock/extension/path/${relativePath}`,
    storagePath: '/mock/storage/path',
    globalStoragePath: '/mock/global/storage/path',
    logPath: '/mock/log/path',
    extension: {},
    languageModelAccessInformation: exports.LanguageModelAccessInformation
};
//# sourceMappingURL=vscode-mock.js.map