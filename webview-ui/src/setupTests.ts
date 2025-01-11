import { expect, afterEach, vi } from 'vitest';
import '@testing-library/jest-dom';

// Global setup for React Testing Library
import { cleanup } from '@testing-library/react';

// Runs a cleanup after each test case (e.g., clearing jsdom)
afterEach(() => {
  cleanup();
});

// Optional: Add global mocks or configurations here
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    // Add any necessary mocks or overrides
  };
});
