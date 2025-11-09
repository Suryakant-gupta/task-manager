import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useLocalStorage from '../hooks/useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should initialize with default value', () => {
    const { result } = renderHook(() => useLocalStorage('test', 'default'));
    expect(result.current[0]).toBe('default');
  });

  it('should update and persist value', () => {
    const { result } = renderHook(() => useLocalStorage('test', 'initial'));

    act(() => {
      result.current[1]('updated');
    });

    expect(result.current[0]).toBe('updated');
    expect(localStorage.getItem('test')).toBe(JSON.stringify('updated'));
  });

  it('should retrieve persisted value on reload', () => {
    const { result: result1 } = renderHook(() => useLocalStorage('test', 'initial'));

    act(() => {
      result1.current[1]('persisted');
    });

    const { result: result2 } = renderHook(() => useLocalStorage('test', 'default'));
    expect(result2.current[0]).toBe('persisted');
  });

  it('should handle array values', () => {
    const { result } = renderHook(() => useLocalStorage('arr', []));

    act(() => {
      result.current[1]([1, 2, 3]);
    });

    expect(result.current[0]).toEqual([1, 2, 3]);
  });
});