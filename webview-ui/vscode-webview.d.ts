// Type declaration for VS Code Webview API

interface VSCodeWebviewApi {
    /**
     * Post a message to the extension context.
     * @param message The message to post
     */
    postMessage(message: any): void;

    /**
     * Receive messages from the extension context.
     * @param callback A callback function to handle incoming messages
     */
    onmessage: ((event: MessageEvent) => void) | null;
}

/**
 * Acquires the VS Code Webview API for communication between webview and extension
 * @returns An instance of VSCodeWebviewApi
 */
declare function acquireVsCodeApi(): VSCodeWebviewApi;
