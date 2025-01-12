"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commands = exports.window = exports.workspace = exports.ExtensionContext = exports.WebviewViewProvider = exports.WebviewView = exports.Webview = exports.Uri = exports.Disposable = exports.EventEmitter = void 0;
const vitest_1 = require("vitest");
// Mock EventEmitter
class EventEmitter {
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
}
exports.EventEmitter = EventEmitter;
// Mock Disposable
class Disposable {
    _callOnDispose;
    constructor(callOnDispose) {
        this._callOnDispose = callOnDispose;
    }
    dispose() {
        this._callOnDispose();
    }
}
exports.Disposable = Disposable;
// Mock Uri
class Uri {
    scheme;
    authority;
    path;
    query;
    fragment;
    fsPath;
    constructor(scheme, authority, path, query, fragment) {
        this.scheme = scheme;
        this.authority = authority;
        this.path = path;
        this.query = query;
        this.fragment = fragment;
        this.fsPath = path;
    }
    with(change) {
        return new Uri(change.scheme ?? this.scheme, change.authority ?? this.authority, change.path ?? this.path, change.query ?? this.query, change.fragment ?? this.fragment);
    }
    toString(skipEncoding) {
        return this.path;
    }
    toJSON() {
        return this.path;
    }
    static file(path) {
        return new Uri('file', '', path, '', '');
    }
    static joinPath(base, ...pathSegments) {
        return new Uri(base.scheme, base.authority, `${base.path}/${pathSegments.join('/')}`, base.query, base.fragment);
    }
}
exports.Uri = Uri;
// Mock Webview
class Webview {
    options = {};
    html = '';
    cspSource = '';
    _messageListeners = [];
    asWebviewUri(uri) {
        return uri;
    }
    onDidReceiveMessage(listener) {
        this._messageListeners.push(listener);
        return new Disposable(() => {
            const index = this._messageListeners.indexOf(listener);
            if (index !== -1)
                this._messageListeners.splice(index, 1);
        });
    }
    postMessage(message) {
        return Promise.resolve(true);
    }
}
exports.Webview = Webview;
// Mock WebviewView
class WebviewView {
    webview = new Webview();
    visible = true;
    _visibilityChangeListeners = [];
    onDidChangeVisibility(listener) {
        this._visibilityChangeListeners.push(listener);
        return new Disposable(() => {
            const index = this._visibilityChangeListeners.indexOf(listener);
            if (index !== -1)
                this._visibilityChangeListeners.splice(index, 1);
        });
    }
    show() {
        // Simulate showing the view
    }
}
exports.WebviewView = WebviewView;
// Mock WebviewViewProvider
class WebviewViewProvider {
    resolveWebviewView(webviewView, context, token) {
        // Mock implementation
    }
}
exports.WebviewViewProvider = WebviewViewProvider;
// Mock ExtensionContext
class ExtensionContext {
    subscriptions = [];
    extensionUri = new Uri('file', '', '/mock/extension', '', '');
    storageUri = new Uri('file', '', '/mock/storage', '', '');
    globalStorageUri = new Uri('file', '', '/mock/global-storage', '', '');
    logUri = new Uri('file', '', '/mock/log', '', '');
    extensionMode = 'development';
    globalState = {
        get: vitest_1.vi.fn(),
        update: vitest_1.vi.fn(),
        keys: vitest_1.vi.fn()
    };
    workspaceState = {
        get: vitest_1.vi.fn(),
        update: vitest_1.vi.fn(),
        keys: vitest_1.vi.fn()
    };
    secrets = {
        get: vitest_1.vi.fn(),
        store: vitest_1.vi.fn(),
        delete: vitest_1.vi.fn(),
        onDidChange: vitest_1.vi.fn()
    };
    environmentVariableCollection = {
        replace: vitest_1.vi.fn(),
        append: vitest_1.vi.fn(),
        prepend: vitest_1.vi.fn(),
        get: vitest_1.vi.fn(),
        forEach: vitest_1.vi.fn(),
        delete: vitest_1.vi.fn(),
        clear: vitest_1.vi.fn(),
        persistent: true
    };
}
exports.ExtensionContext = ExtensionContext;
// Mock Workspace
exports.workspace = {
    workspaceFolders: [{
            uri: new Uri('file', '', '/mock/workspace', '', ''),
            name: 'MockWorkspace',
            index: 0
        }]
};
// Mock Window
exports.window = {
    showErrorMessage: vitest_1.vi.fn(),
    showInformationMessage: vitest_1.vi.fn(),
    registerWebviewViewProvider: vitest_1.vi.fn()
};
// Mock Commands
exports.commands = {
    registerCommand: vitest_1.vi.fn(),
    executeCommand: vitest_1.vi.fn()
};
exports.default = {
    EventEmitter,
    Disposable,
    Uri,
    Webview,
    WebviewView,
    WebviewViewProvider,
    ExtensionContext,
    workspace: exports.workspace,
    window: exports.window,
    commands: exports.commands,
    ExtensionMode: {
        Development: 'development',
        Production: 'production',
        Test: 'test'
    }
};
//# sourceMappingURL=vscode.js.map