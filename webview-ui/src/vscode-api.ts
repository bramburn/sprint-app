import type { WebviewApi } from 'vscode-webview';

let vscodeApi: WebviewApi<unknown> | undefined;

/**
 * Singleton function to get VSCode API instance.
 * This ensures acquireVsCodeApi() is only called once.
 */
export function getVSCodeApi(): WebviewApi<unknown> {
  if (!vscodeApi) {
    try {
      vscodeApi = acquireVsCodeApi();
    } catch (error) {
      console.error('Failed to acquire VSCode API:', error);
      throw new Error('This extension must be run within VSCode webview context');
    }
  }
  return vscodeApi;
}
