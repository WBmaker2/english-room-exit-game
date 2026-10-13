import React, { useState, useEffect } from 'react';
import { Volume2, RotateCcw, Sparkles } from 'lucide-react';
import { WordItem } from '../../types/game';
import { soundEngine } from '../../utils/audioManager';

interface AlphabetScrambleProps {
  words: WordItem[]; // 6 words for Phase 2
  onComplete: () => void;
  onWordMastered: (wordId: number) => void;
}

export const AlphabetScramble: React.FC<AlphabetScrambleProps> = ({
  words,
  onComplete,
  onWordMastered,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [placedLetters, setPlacedLetters] = useState<string[]>([]);
  const [availableTiles, setAvailableTiles] = useState<{ id: string; letter: string; used: boolean }[]>([]);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [shake, setShake] = useState(false);

  const currentWord = words[currentIndex];

  // Initialize current word tiles
  useEffect(() => {
    if (!currentWord) return;

    const letters = currentWord.word.toLowerCase().split('');
    // Scramble letters
    const shuffled = [...letters].sort(() => Math.random() - 0.5);
    // Make sure scrambled is not already identical to the original word
    if (shuffled.join('') === currentWord.word.toLowerCase() && letters.length > 2) {
      shuffled.reverse();
    }

    setAvailableTiles(
      shuffled.map((letter, idx) => ({
        id: `${letter}-${idx}-${Math.random()}`,
        letter,
        used: false,
      }))
    );
    setPlacedLetters([]);
    setIsSuccess(null);
    setShake(false);

    soundEngine.speakWord(currentWord.word);
  }, [currentIndex, currentWord]);

  // Click available letter tile to place it
  const handleSelectTile = (tileId: string, letter: string) => {
    if (isSuccess === true) return;

    soundEngine.playPencilScratch();
    setAvailableTiles((prev) =>
      prev.map((t) => (t.id === tileId ? { ...t, used: true } : t))
    );
    const newPlaced = [...placedLetters, letter];
    setPlacedLetters(newPlaced);

    // Auto verify when word length is reached
    if (newPlaced.length === currentWord.word.length) {
      verifyAnswer(newPlaced.join(''));
    }
  };

  // Click placed letter to remove it
  const handleRemovePlaced = (index: number) => {
    if (isSuccess === true) return;

    soundEngine.playPencilScratch();
    const removedLetter = placedLetters[index];
    const newPlaced = placedLetters.filter((_, idx) => idx !== index);
    setPlacedLetters(newPlaced);

    // Free the first matching used tile
    setAvailableTiles((prev) => {
      let freed = false;
      return prev.map((t) => {
        if (!freed && t.used && t.letter === removedLetter) {
          freed = true;
          return { ...t, used: false };
        }
        return t;
      });
    });
    setIsSuccess(null);
  };

  // Reset all tiles for current question
  const handleReset = () => {
    soundEngine.playPencilScratch();
    setPlacedLetters([]);
    setAvailableTiles((prev) => prev.map((t) => ({ ...t, used: false })));
    setIsSuccess(null);
    setShake(false);
  };

  // Verify answer
  const verifyAnswer = (wordAttempt: string) => {
    if (wordAttempt.toLowerCase() === currentWord.word.toLowerCase()) {
      soundEngine.playStampDing();
      setIsSuccess(true);
      onWordMastered(currentWord.id);

      setTimeout(() => {
        if (currentIndex + 1 < words.length) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          onComplete();
        }
      }, 900);
    } else {
      soundEngine.playScratchOut();
      setIsSuccess(false);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  if (!currentWord) return null;

  return (
    <div className="flex-1 flex flex-col justify-between max-w-3xl mx-auto w-full">
      {/* Quiz Header */}
      <div className="flex items-center justify-between border-b border-[#D0E1FD] pb-3 mb-4">
        <div>
          <span className="bg-purple-100 text-purple-900 px-2.5 py-1 rounded text-sm font-hand font-bold mr-2">
            PHASE 2 : WORD SCRAMBLE
          </span>
          <span className="font-korean text-lg text-ink-blue font-bold">
            철자 재배열 스크램블
          </span>
        </div>
        <span className="text-ink-dark font-hand text-base font-bold">
          [{currentIndex + 1} / {words.length}]
        </span>
      </div>

      {/* Meaning & Hint Header */}
      <div className="bg-white/95 p-6 doodle-box text-center relative my-2 shadow-md">
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-3xl font-korean font-bold text-ink-blue">
            {currentWord.meaning}
          </span>
          <button
            onClick={() => soundEngine.speakWord(currentWord.word)}
            className="p-1.5 text-ink-blue hover:text-blue-700 hover:scale-110 rounded-full bg-blue-50 border border-blue-200"
            title="발음 듣기"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>
        <p className="text-stone-500 font-hand text-base">
          💡 힌트: {currentWord.hint || currentWord.exampleSentence}
        </p>
      </div>

      {/* Target Letter Slots (Ruled notebook line with letter boxes) */}
      <div className="my-6">
        <div className="text-center font-hand text-stone-500 text-sm mb-2">
          (클릭하여 글자를 순서대로 입력하세요)
        </div>
        <div
          className={`flex flex-wrap items-center justify-center gap-2 md:gap-3 p-4 bg-white/60 rounded-xl border-2 border-dashed border-[#D0E1FD] min-h-[76px] ${
            shake ? 'animate-shake border-red-400' : ''
          }`}
        >
          {Array.from({ length: currentWord.word.length }).map((_, idx) => {
            const letter = placedLetters[idx];
            return (
              <button
                key={idx}
                onClick={() => letter && handleRemovePlaced(idx)}
                className={`w-12 h-14 md:w-14 md:h-16 rounded-lg font-hand text-3xl font-bold flex items-center justify-center border-2 transition-all ${
                  letter
                    ? isSuccess === true
                      ? 'bg-green-100 text-green-800 border-green-500 shadow-sm'
                      : isSuccess === false
                      ? 'bg-red-50 text-ink-red border-red-400 shadow-sm'
                      : 'bg-blue-50 text-ink-blue border-ink-blue shadow-md hover:scale-105'
                    : 'bg-white border-stone-300 text-transparent'
                }`}
              >
                {letter || '_'}
              </button>
            );
          })}
        </div>

        {/* Success or Retry feedback */}
        {isSuccess === true && (
          <div className="text-center font-korean text-green-700 font-bold text-xl mt-3 flex items-center justify-center gap-1.5 animate-bounce">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            <span>정답입니다! 완벽해요! ⭕</span>
          </div>
        )}
        {isSuccess === false && (
          <div className="text-center font-korean text-ink-red font-bold text-lg mt-3 flex items-center justify-center gap-2">
            <span>아쉬워요! 다시 시도해보세요. ❌</span>
            <button
              onClick={handleReset}
              className="text-sm underline text-blue-700 font-hand hover:text-blue-900"
            >
              (지우개로 리셋)
            </button>
          </div>
        )}
      </div>

      {/* Available Letter Tiles Pool */}
      <div className="bg-amber-50/70 p-4 md:p-6 rounded-xl border border-amber-200">
        <div className="flex items-center justify-between mb-3">
          <span className="font-hand text-stone-600 text-sm font-bold">
            SCRAMBLED TILES:
          </span>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-1 bg-white text-stone-600 rounded border border-stone-300 text-sm font-korean hover:bg-stone-100"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>지우개 (Reset)</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
          {availableTiles.map((tile) => (
            <button
              key={tile.id}
              onClick={() => !tile.used && handleSelectTile(tile.id, tile.letter)}
              disabled={tile.used}
              className={`w-12 h-12 md:w-14 md:h-14 rounded-lg font-hand text-2xl md:text-3xl font-bold doodle-btn flex items-center justify-center transition-all ${
                tile.used
                  ? 'opacity-25 bg-stone-200 border-stone-300 text-stone-400 cursor-not-allowed transform scale-95'
                  : 'bg-white text-ink-blue border-ink-blue hover:bg-blue-50 hover:scale-110 active:scale-95'
              }`}
            >
              {tile.letter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
