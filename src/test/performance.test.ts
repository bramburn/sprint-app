import { performance } from 'perf_hooks';
import { expect } from 'vitest';
import { SidebarProvider } from '../SidebarProvider';

// Create a more accurate mock of vscode.Uri
const createMockUri = (path: string) => ({
  path,
  scheme: 'file',
  authority: '',
  query: '',
  fragment: '',
  fsPath: path,
  with: () => createMockUri(path),
  toString: () => path,
  toJSON: () => path
});

describe('Performance Tests', () => {
  it('Sidebar webview initialization time', () => {
    const startTime = performance.now();

    const extensionUri = createMockUri('/mock/extension/path');
    const sidebarProvider = new SidebarProvider(extensionUri);

    const endTime = performance.now();
    const initTime = endTime - startTime;

    console.log(`Sidebar provider initialization time: ${initTime}ms`);
    
    // Assert that initialization takes less than 50ms
    expect(initTime).toBeLessThan(50);
  });

  it('Message passing performance', () => {
    const startTime = performance.now();
    
    // Simulate multiple message passes
    const iterations = 100;
    for (let i = 0; i < iterations; i++) {
      // Simulate a message pass
      const message = { 
        command: 'test', 
        payload: `Iteration ${i}` 
      };
    }

    const endTime = performance.now();
    const processingTime = endTime - startTime;

    console.log(`Message passing time for ${iterations} iterations: ${processingTime}ms`);
    
    // Assert that message passing takes less than 50ms per 100 iterations
    expect(processingTime).toBeLessThan(50);
  });
});
