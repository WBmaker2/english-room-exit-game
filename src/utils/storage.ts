import { GameProgress, StageId } from '../types/game';

const STORAGE_KEY = 'english_room_escape_progress_v1';

export const DEFAULT_PROGRESS: GameProgress = {
  currentStage: 1,
  unlockedStages: [1],
  clearedStages: [],
  masteredWordIds: [],
  stageStars: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  isMuted: false,
  isGameFinished: false,
};

export function loadGameProgress(): GameProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;

    const parsed = JSON.parse(raw) as Partial<GameProgress>;
    return {
      currentStage: (parsed.currentStage || 1) as StageId,
      unlockedStages: (parsed.unlockedStages && parsed.unlockedStages.length > 0 ? parsed.unlockedStages : [1]) as StageId[],
      clearedStages: (parsed.clearedStages || []) as StageId[],
      masteredWordIds: parsed.masteredWordIds || [],
      stageStars: parsed.stageStars || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      isMuted: !!parsed.isMuted,
      isGameFinished: !!parsed.isGameFinished,
    };
  } catch (err) {
    console.error('Failed to load game progress from localStorage:', err);
    return DEFAULT_PROGRESS;
  }
}

export function saveGameProgress(progress: GameProgress): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error('Failed to save game progress to localStorage:', err);
  }
}

export function resetGameProgress(): GameProgress {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }
  return { ...DEFAULT_PROGRESS };
}
