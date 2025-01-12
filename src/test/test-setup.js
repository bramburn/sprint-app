"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setup = void 0;
const vitest_1 = require("vitest");
// Mock the vscode module
vitest_1.vi.mock('vscode', () => Promise.resolve().then(() => require('./__mocks__/vscode')));
// Global setup for tests
vitest_1.expect.extend({
// Add custom matchers if needed
});
// Optional: Add any global test setup you might need
const setup = () => {
    // Reset all mocks before each test
    vitest_1.vi.resetAllMocks();
};
exports.setup = setup;
//# sourceMappingURL=test-setup.js.map