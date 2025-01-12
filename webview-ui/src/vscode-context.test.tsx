import { describe, it, expect, vi } from 'vitest';
import { render, renderHook, act } from '@testing-library/react';
import { VSCodeProvider, useVSCode, usePersistentState } from './vscode-context';
import React from 'react';

// Mock acquireVsCodeApi
const mockVsCodeApi = {
  postMessage: vi.fn(),
  getState: vi.fn(),
  setState: vi.fn(),
};

beforeEach(() => {
  vi.stubGlobal('acquireVsCodeApi', () => mockVsCodeApi);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('VSCode Context', () => {
  it('should provide vscode api through context', () => {
    const { result } = renderHook(() => useVSCode(), {
      wrapper: ({ children }) => (
        <VSCodeProvider>{children}</VSCodeProvider>
      ),
    });

    expect(result.current).toBe(mockVsCodeApi);
  });

  it('should throw error when used outside provider', () => {
    const { result } = renderHook(() => useVSCode);

    expect(result.error).toBeDefined();
  });

  it('should handle persistent state', () => {
    mockVsCodeApi.getState.mockReturnValue(null);

    const { result } = renderHook(() => usePersistentState('initial'), {
      wrapper: ({ children }) => (
        <VSCodeProvider>{children}</VSCodeProvider>
      ),
    });

    const [state, setState] = result.current;

    expect(state).toBe('initial');

    act(() => {
      setState('updated');
    });

    expect(mockVsCodeApi.setState).toHaveBeenCalledWith('updated');
  });
});
