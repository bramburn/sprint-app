import '@testing-library/jest-dom';
import { expect, afterEach, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// Setup test environment
beforeAll(() => {
  // Create a root div for React Testing Library
  const root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);
});

// Cleanup after each test case
afterEach(() => {
  cleanup();
});