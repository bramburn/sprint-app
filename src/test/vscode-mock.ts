// Mock implementation of vscode module for testing
export const Uri = {
    file: (path: string) => ({
        path,
        scheme: 'file',
        authority: '',
        query: '',
        fragment: '',
        fsPath: path,
        with: () => Uri.file(path),
        toString: () => path,
        toJSON: () => path
    })
};

export const EventEmitter = class {
    private listeners: Array<(e: any) => void> = [];
    
    event = (listener: (e: any) => void) => {
        this.listeners.push(listener);
        return {
            dispose: () => {
                const index = this.listeners.indexOf(listener);
                if (index !== -1) {
                    this.listeners.splice(index, 1);
                }
            }
        };
    }

    fire = (event: any) => {
        this.listeners.forEach(listener => listener(event));
    }
};

export const ExtensionMode = {
    Test: 'test'
};

export const EnvironmentVariableCollection = {
    replace: () => {},
    persistent: true,
    description: 'Mock Environment Variables',
    getScoped: () => ({}),
    append: () => {},
    forEach: () => {},
    get: () => undefined,
    delete: () => {}
};

export const Memento = {
    get: () => undefined,
    update: () => Promise.resolve(),
    keys: () => [],
    setKeysForSync: () => {}
};

export const SecretStorage = {
    get: () => Promise.resolve(undefined),
    store: () => Promise.resolve(),
    delete: () => Promise.resolve(),
    onDidChange: new EventEmitter().event
};

export const LanguageModelAccessInformation = {
    onDidChange: new EventEmitter().event,
    canSendRequest: () => undefined
};

export const ExtensionContext = {
    subscriptions: [],
    extensionUri: Uri.file('/mock/extension/path'),
    storageUri: Uri.file('/mock/storage'),
    globalStorageUri: Uri.file('/mock/global/storage'),
    logUri: Uri.file('/mock/log'),
    extensionMode: ExtensionMode.Test,
    environmentVariableCollection: EnvironmentVariableCollection,
    secrets: SecretStorage,
    workspaceState: Memento,
    globalState: Memento,
    extensionPath: '/mock/extension/path',
    asAbsolutePath: (relativePath: string) => `/mock/extension/path/${relativePath}`,
    storagePath: '/mock/storage/path',
    globalStoragePath: '/mock/global/storage/path',
    logPath: '/mock/log/path',
    extension: {},
    languageModelAccessInformation: LanguageModelAccessInformation
};
