"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePersistentState = exports.useVSCode = void 0;
const react_1 = require("react");
const vscode_context_1 = require("../../../webview-settings/src/vscode-context");
const vscode_api_1 = require("../../../webview-settings/src/vscode-api");
// Hook to use the VS Code API
const useVSCode = () => {
    const context = (0, react_1.useContext)(vscode_context_1.VSCodeContext);
    if (!context) {
        // If no context is found, we're likely in a test environment or outside the provider
        // Return the singleton instance directly
        return (0, vscode_api_1.getVSCodeApi)();
    }
    return context.vscode;
};
exports.useVSCode = useVSCode;
// Persistent State Hook
const usePersistentState = (defaultValue) => {
    const vscode = (0, exports.useVSCode)();
    const state = vscode.getState() || defaultValue;
    const setState = (newState) => {
        vscode.setState(newState);
        return newState;
    };
    return [state, setState];
};
exports.usePersistentState = usePersistentState;
//# sourceMappingURL=vscode-hooks.js.map