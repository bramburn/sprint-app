import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import '../tests/window-mock';

// Mock the VSCode webview UI toolkit components
vi.mock('@vscode/webview-ui-toolkit/react', () => {
  const actual = vi.importActual('../tests/vscode-toolkit-mock');
  return actual;
});

// Mock the useMessages hook
vi.mock('../hooks/useMessages', () => ({
  useMessages: () => ({
    sendMessage: vi.fn(),
    response: null,
    error: null,
    isLoading: false
  })
}));

// Mock the VSCode API
const mockVscode = {
  postMessage: vi.fn(),
  setState: vi.fn(),
  getState: vi.fn()
};

(global as any).acquireVsCodeApi = () => mockVscode;

describe('App Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText('Sprint App Communication Test')).toBeInTheDocument();
  });

  it('handles input changes', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Enter a message');
    fireEvent.change(input, { target: { value: 'test message' } });
    expect(input).toHaveValue('test message');
  });

  it('disables send button when loading', () => {
    vi.mock('../hooks/useMessages', () => ({
      useMessages: () => ({
        sendMessage: vi.fn(),
        response: null,
        error: null,
        isLoading: true
      })
    }));
    
    render(<App />);
    const button = screen.getByText('Send');
    expect(button).toBeDisabled();
  });
});