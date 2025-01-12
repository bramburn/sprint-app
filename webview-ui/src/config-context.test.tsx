import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, renderHook, act } from '@testing-library/react';
import { ConfigProvider, useConfig, Config } from './config-context';
import { useVSCode } from './vscode-hooks';

// Mock the vscode hooks
vi.mock('./vscode-hooks', () => ({
  useVSCode: vi.fn()
}));

// Mock postMessage
const mockPostMessage = vi.fn();
const mockVSCode = {
  postMessage: mockPostMessage
};

describe('ConfigContext', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    (useVSCode as vi.Mock).mockReturnValue(mockVSCode);
  });

  it('provides default configuration', () => {
    const { result } = renderHook(() => useConfig(), {
      wrapper: ({ children }) => (
        <ConfigProvider>{children}</ConfigProvider>
      )
    });

    expect(result.current.config).toEqual({
      theme: 'default',
      language: 'en',
      featureFlags: {
        experimental: false
      }
    });
  });

  it('updates configuration', () => {
    const { result } = renderHook(() => useConfig(), {
      wrapper: ({ children }) => (
        <ConfigProvider>{children}</ConfigProvider>
      )
    });

    const newConfig: Config = {
      theme: 'dark',
      language: 'es',
      featureFlags: {
        experimental: true
      }
    };

    act(() => {
      result.current.setConfig(newConfig);
    });

    expect(result.current.config).toEqual(newConfig);
    expect(mockPostMessage).toHaveBeenCalledWith({
      command: 'updateConfig',
      payload: newConfig
    });
  });

  it('merges new configuration with existing', () => {
    const { result } = renderHook(() => useConfig(), {
      wrapper: ({ children }) => (
        <ConfigProvider>{children}</ConfigProvider>
      )
    });

    const partialConfig = {
      theme: 'dark'
    };

    act(() => {
      result.current.setConfig(partialConfig);
    });

    expect(result.current.config).toEqual({
      theme: 'dark',
      language: 'en',
      featureFlags: {
        experimental: false
      }
    });
  });

  it('throws error when used outside provider', () => {
    const { result } = renderHook(() => {
      expect(() => useConfig()).toThrow('useConfig must be used within a ConfigProvider');
    });
  });
});
