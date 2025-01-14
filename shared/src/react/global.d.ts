// Global type definitions for shared React components and utilities

declare module '@sprint-app/shared/react/*' {
  export * from './index';
}

// Extend window object for VS Code webview communication
interface Window {
  acquireVsCodeApi(): {
    postMessage(message: any): void
    setState(state: any): void
    getState(): any
  }
}

// Extend global types as needed for the project
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test'
    }
  }
}

declare function acquireVsCodeApi<StateType = unknown>(): WebviewApi<StateType>;
interface WebviewApi<StateType> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    postMessage(message: any): void;
    getState(): StateType | undefined;
    setState<T extends StateType | undefined>(newState: T): T;
}

export {};  // Ensure this is a module scope
