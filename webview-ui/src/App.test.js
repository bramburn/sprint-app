import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
// Mock VSCode API
const mockVscode = {
    postMessage: vi.fn()
};
describe('App Component', () => {
    beforeEach(() => {
        // Reset mock before each test
        vi.resetAllMocks();
        // Setup mock window and VSCode API
        window.acquireVsCodeApi = () => mockVscode;
        // Setup message event listener mock
        window.addEventListener = vi.fn();
        window.removeEventListener = vi.fn();
    });
    it('renders button', () => {
        render(<App />);
        const button = screen.getByRole('button');
        expect(button).toBeTruthy();
    });
    it('sends message on button click', () => {
        render(<App />);
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(mockVscode.postMessage).toHaveBeenCalledWith({
            command: 'alert',
            text: 'Button clicked in Sprint App!'
        });
    });
    it('displays response message', () => {
        // Simulate message event
        const messageEvent = new MessageEvent('message', {
            data: {
                command: 'response',
                text: 'Test response'
            }
        });
        render(<App />);
        // Dispatch the mock message event
        window.dispatchEvent(messageEvent);
        // Check if response is displayed
        const responseElement = screen.getByText('Test response');
        expect(responseElement).toBeTruthy();
    });
});
//# sourceMappingURL=App.test.js.map