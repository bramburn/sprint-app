import { expect, vi } from 'vitest';

// Mock the vscode module
vi.mock('vscode', () => import('./__mocks__/vscode'));

// Global setup for tests
expect.extend({
  // Add custom matchers if needed
});

// Optional: Add any global test setup you might need
export const setup = () => {
  // Reset all mocks before each test
  vi.resetAllMocks();
};
