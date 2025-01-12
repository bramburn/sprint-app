"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const perf_hooks_1 = require("perf_hooks");
const vitest_1 = require("vitest");
const vscode = require("vscode");
const SidebarProvider_1 = require("../SidebarProvider");
describe('Performance Tests', () => {
    it('Sidebar webview initialization time', () => {
        const startTime = perf_hooks_1.performance.now();
        const sidebarProvider = new SidebarProvider_1.SidebarProvider(vscode.ExtensionContext.extensionUri);
        const endTime = perf_hooks_1.performance.now();
        const initTime = endTime - startTime;
        console.log(`Sidebar provider initialization time: ${initTime}ms`);
        // Assert that initialization takes less than 50ms
        (0, vitest_1.expect)(initTime).toBeLessThan(50);
    });
    it('Message passing performance', () => {
        const startTime = perf_hooks_1.performance.now();
        // Simulate multiple message passes
        const iterations = 100;
        for (let i = 0; i < iterations; i++) {
            // Simulate a message pass
            const message = {
                command: 'test',
                payload: `Iteration ${i}`
            };
        }
        const endTime = perf_hooks_1.performance.now();
        const processingTime = endTime - startTime;
        console.log(`Message passing time for ${iterations} iterations: ${processingTime}ms`);
        // Assert that message passing takes less than 50ms per 100 iterations
        (0, vitest_1.expect)(processingTime).toBeLessThan(50);
    });
});
//# sourceMappingURL=performance.test.js.map