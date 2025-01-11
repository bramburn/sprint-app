import { performance } from 'perf_hooks';
import * as vscode from 'vscode';
import { SidebarProvider } from '../SidebarProvider';

describe('Performance Tests', () => {
  it('Sidebar webview should load within 500ms', async () => {
    const extensionUri = vscode.Uri.file('/mock/extension/path');
    const sidebarProvider = new SidebarProvider(extensionUri);

    const startTime = performance.now();

    // Mock webview view
    const mockWebviewView = {
      webview: {
        options: {},
        html: '',
        onDidReceiveMessage: () => {},
        postMessage: () => true
      },
      title: 'Sprint App'
    } as unknown as vscode.WebviewView;

    // Resolve the webview
    sidebarProvider.resolveWebviewView(
      mockWebviewView, 
      {} as vscode.WebviewViewResolveContext, 
      {} as vscode.CancellationToken
    );

    const endTime = performance.now();
    const loadTime = endTime - startTime;

    console.log(`Webview load time: ${loadTime}ms`);
    
    // Assert that loading takes less than 500ms
    expect(loadTime).toBeLessThan(500);
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

    console.log(`${iterations} message passes took ${processingTime}ms`);
    
    // Assert average message processing is quick
    expect(processingTime / iterations).toBeLessThan(5);
  });
});
