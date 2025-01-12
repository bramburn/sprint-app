import { vi } from 'vitest';

// Add any global test setup here
// For example, mocking browser APIs or setting up global test utilities
vi.stubGlobal('console', {
  log: vi.fn(),
  error: vi.fn(),
  warn: vi.fn()
});

// Add any additional global setup or mocks
export {};
