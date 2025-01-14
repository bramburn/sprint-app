import '@testing-library/jest-dom';
import { vi } from 'vitest';

declare global {
    interface Window {
        acquireVsCodeApi: () => {
            postMessage: (message: unknown) => void;
            getState: () => unknown;
            setState: (state: unknown) => void;
        }
    }
}

global.window.acquireVsCodeApi = () => ({
    postMessage: vi.fn(),
    getState: vi.fn(),
    setState: vi.fn(),
});
