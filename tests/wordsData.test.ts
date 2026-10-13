import { describe, it, expect } from 'vitest';
import { WORDS_DATA } from '../src/data/wordsData';
import { STAGES_DATA } from '../src/data/stagesData';

describe('Vocabulary and Stage Data Verification', () => {
  it('should have exactly 100 words in total', () => {
    expect(WORDS_DATA.length).toBe(100);
  });

  it('should have unique IDs from 1 to 100', () => {
    const ids = WORDS_DATA.map((w) => w.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(100);
    expect(Math.min(...ids)).toBe(1);
    expect(Math.max(...ids)).toBe(100);
  });

  it('should have exactly 20 words per each of the 5 stages', () => {
    for (let stageId = 1; stageId <= 5; stageId++) {
      const stageWords = WORDS_DATA.filter((w) => w.stage === stageId);
      expect(stageWords.length).toBe(20);
    }
  });

  it('should have valid non-empty fields for every word', () => {
    WORDS_DATA.forEach((w) => {
      expect(w.word.trim().length).toBeGreaterThan(0);
      expect(w.meaning.trim().length).toBeGreaterThan(0);
      expect(w.exampleSentence?.trim().length).toBeGreaterThan(0);
      expect(w.exampleTranslation?.trim().length).toBeGreaterThan(0);
    });
  });

  it('should have 5 stages with valid cipher words', () => {
    expect(STAGES_DATA.length).toBe(5);
    const expectedCiphers = ['CLEVER', 'SECRET', 'ENERGY', 'BRIGHT', 'VICTORY'];
    STAGES_DATA.forEach((stage, idx) => {
      expect(stage.id).toBe(idx + 1);
      expect(stage.cipherWord).toBe(expectedCiphers[idx]);
      expect(stage.clues.length).toBeGreaterThanOrEqual(stage.cipherWord.length);
    });
  });
});
