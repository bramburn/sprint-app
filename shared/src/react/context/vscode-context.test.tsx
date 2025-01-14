// @ts-nocheck
import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react-hooks';
import { VSCodeProvider } from './vscode-context';
import { useVSCode, usePersistentState } from '../hooks/vscode-hooks';
import { getVSCodeApi } from '../api/vscode-api';

// Mock the getVSCodeApi function
vi.mock('../api/vscode-api', () => ({
  getVSCodeApi: vi.fn()
}));

describe('VSCode Hooks', () => {
  const mockVSCodeApi = {
    postMessage: vi.fn(),
    getState: vi.fn(),
    setState: vi.fn()
  };

  beforeEach(() => {
    (getVSCodeApi as vi.Mock).mockReturnValue(mockVSCodeApi);
  });

  it('useVSCode returns VSCode API', () => {
    const { result } = renderHook(() => useVSCode(), {
      wrapper: VSCodeProvider
    });

    expect(result.current).toBe(mockVSCodeApi);
  });

  it('usePersistentState works correctly', () => {
    const defaultValue = { key: 'value' };
    
    (mockVSCodeApi.getState as vi.Mock).mockReturnValue(null);

    const { result } = renderHook(() => usePersistentState(defaultValue), {
      wrapper: VSCodeProvider
    });

    const [state, setState] = result.current;

    expect(state).toEqual(defaultValue);

    const newState = { key: 'new value' };
    act(() => {
      setState(newState);
    });

    expect(mockVSCodeApi.setState).toHaveBeenCalledWith(newState);
  });
});
