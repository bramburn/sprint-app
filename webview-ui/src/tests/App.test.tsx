import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';
import '../tests/window-mock';

// Mock the VSCode API
const mockVscode = {
  postMessage: vi.fn(),
  setState: vi.fn(),
  getState: vi.fn()
};

// Simulate the VSCode API being available
beforeEach(() => {
  (window as any).acquireVsCodeApi = () => mockVscode;
});

describe('App', () => {
  it('renders without crashing', () => {
    // Create a root div manually since jsdom doesn't do this automatically
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);

    const { container } = render(<App />);
    expect(container).toBeTruthy();
    expect(document.getElementById('root')).toBeTruthy();
  });

  it('renders VSCode button', () => {
    render(<App />);
    const button = screen.getByText('Click me');
    expect(button).toBeTruthy();
    expect(button).toBeInstanceOf(HTMLElement);
  });

  it('handles window.matchMedia', () => {
    const matchMediaMock = window.matchMedia('(min-width: 600px)');
    expect(matchMediaMock).toBeTruthy();
    expect(typeof matchMediaMock.matches).toBe('boolean');
  });
});