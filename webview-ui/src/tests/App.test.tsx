import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';
import '../tests/window-mock';

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

// Simulate the VSCode API being available
beforeEach(() => {
  (window as any).acquireVsCodeApi = () => mockVscode;
  
  // Ensure document and body exist
  if (!document.body) {
    const body = document.createElement('body');
    document.appendChild(body);
  }
  
  // Create a root div manually
  const existingRoot = document.getElementById('root');
  if (!existingRoot) {
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
  }
});

describe('App', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
    expect(document.getElementById('root')).toBeTruthy();
  });

  it('renders input and button', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Enter a message');
    const button = screen.getByText('Send');
    
    expect(input).toBeTruthy();
    expect(button).toBeTruthy();
  });

  it('handles window.matchMedia', () => {
    const matchMediaMock = window.matchMedia('(min-width: 600px)');
    expect(matchMediaMock).toBeTruthy();
    expect(typeof matchMediaMock.matches).toBe('boolean');
  });
});