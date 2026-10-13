import { describe, it, expect, beforeEach } from 'vitest';
import { loadGameProgress, saveGameProgress, resetGameProgress, DEFAULT_PROGRESS } from '../src/utils/storage';

// In-memory mock for localStorage in node environment
const createLocalStorageMock = () => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
};

describe('Storage Manager Tests', () => {
  beforeEach(() => {
    const mock = createLocalStorageMock();
    Object.defineProperty(globalThis, 'window', {
      value: { localStorage: mock },
      writable: true,
      configurable: true,
    });
    Object.defineProperty(globalThis, 'localStorage', {
      value: mock,
      writable: true,
      configurable: true,
    });
  });

  it('should return default progress when storage is empty', () => {
    const progress = loadGameProgress();
    expect(progress).toEqual(DEFAULT_PROGRESS);
  });

  it('should save and load progress correctly', () => {
    const customProgress = {
      ...DEFAULT_PROGRESS,
      currentStage: 2 as const,
      unlockedStages: [1 as const, 2 as const],
      clearedStages: [1 as const],
      masteredWordIds: [1, 2, 3],
    };
    saveGameProgress(customProgress);

    const loaded = loadGameProgress();
    expect(loaded.currentStage).toBe(2);
    expect(loaded.unlockedStages).toEqual([1, 2]);
    expect(loaded.clearedStages).toEqual([1]);
    expect(loaded.masteredWordIds).toEqual([1, 2, 3]);
  });

  it('should reset progress back to defaults', () => {
    saveGameProgress({
      ...DEFAULT_PROGRESS,
      currentStage: 3 as const,
    });
    const reset = resetGameProgress();
    expect(reset.currentStage).toBe(1);
    expect(loadGameProgress().currentStage).toBe(1);
  });
});
