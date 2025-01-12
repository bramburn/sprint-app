import '@testing-library/jest-dom';
import { vi } from 'vitest';
// Mock acquireVsCodeApi globally for testing
global.acquireVsCodeApi = () => ({
  postMessage: vi.fn(),
  getState: vi.fn(),
  setState: vi.fn(),
});
