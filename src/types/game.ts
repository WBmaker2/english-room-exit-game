export type StageId = 1 | 2 | 3 | 4 | 5;

export type QuizPhase = 'speed-choice' | 'scramble' | 'card-match' | 'boss-cipher' | 'stage-clear';

export interface WordItem {
  id: number;
  word: string;
  meaning: string;
  stage: StageId;
  phonetic?: string;
  exampleSentence?: string;
  exampleTranslation?: string;
  hint?: string;
}

export interface StageClue {
  id: string;
  letter: string;
  wordSource: string;
  description: string;
}

export interface StageItem {
  id: StageId;
  name: string;
  roomTitle: string;
  subtitle: string;
  description: string;
  themeColor: string;
  cipherWord: string;
  cipherHint: string;
  clues: StageClue[];
  doodleType: 'pencil' | 'book' | 'flask' | 'palette' | 'key';
}

export interface GameProgress {
  currentStage: StageId;
  unlockedStages: StageId[];
  clearedStages: StageId[];
  masteredWordIds: number[];
  stageStars: Record<StageId, number>; // 1~3 stars
  isMuted: boolean;
  isGameFinished: boolean;
}
