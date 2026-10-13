import React, { useState } from 'react';
import { Lock, Unlock, Key, HelpCircle, ChevronUp, ChevronDown, Sparkles } from 'lucide-react';
import { StageItem } from '../../types/game';
import { soundEngine } from '../../utils/audioManager';

interface RoomCipherLockProps {
  stage: StageItem;
  onUnlock: () => void;
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export const RoomCipherLock: React.FC<RoomCipherLockProps> = ({
  stage,
  onUnlock,
}) => {
  const cipherLength = stage.cipherWord.length;
  // Initialize input letters with 'A'
  const [dials, setDials] = useState<string[]>(
    Array.from({ length: cipherLength }, () => 'A')
  );
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorShake, setErrorShake] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Cycle letter up
  const cycleLetter = (index: number, direction: 'up' | 'down') => {
    soundEngine.playPencilScratch();
    setDials((prev) => {
      const next = [...prev];
      const currentIdx = ALPHABET.indexOf(next[index]);
      let newIdx = direction === 'up' ? currentIdx + 1 : currentIdx - 1;
      if (newIdx >= ALPHABET.length) newIdx = 0;
      if (newIdx < 0) newIdx = ALPHABET.length - 1;
      next[index] = ALPHABET[newIdx];
      return next;
    });
  };

  const handleQuickFill = (letter: string, index: number) => {
    soundEngine.playPencilScratch();
    setDials((prev) => {
      const next = [...prev];
      next[index] = letter.toUpperCase();
      return next;
    });
  };

  const handleUnlockAttempt = () => {
    const attempt = dials.join('').toUpperCase();
    if (attempt === stage.cipherWord.toUpperCase()) {
      soundEngine.playStampDing();
      soundEngine.playFanfare();
      setIsUnlocked(true);
      setTimeout(onUnlock, 1200);
    } else {
      soundEngine.playScratchOut();
      setErrorShake(true);
      setTimeout(() => setErrorShake(false), 500);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between max-w-3xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#D0E1FD] pb-3 mb-4">
        <div>
          <span className="bg-red-100 text-ink-red px-2.5 py-1 rounded text-sm font-hand font-bold mr-2">
            FINAL MISSION : CIPHER LOCK
          </span>
          <span className="font-korean text-lg text-ink-blue font-bold">
            {stage.name} 비밀 자물쇠 암호 해제
          </span>
        </div>
        <button
          onClick={() => setShowHint(!showHint)}
          className="text-amber-700 hover:text-amber-900 font-korean text-sm flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded border border-amber-300"
        >
          <HelpCircle className="w-4 h-4" />
          <span>{showHint ? '힌트 닫기' : '암호 힌트'}</span>
        </button>
      </div>

      {/* Hint Note Banner */}
      {showHint && (
        <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-300 doodle-box my-2 text-left font-korean animate-fade-in">
          <p className="text-yellow-900 font-bold text-base flex items-center gap-1.5 mb-1">
            <Sparkles className="w-4 h-4 text-yellow-600" />
            단서 메모: {stage.cipherHint}
          </p>
          <p className="text-stone-600 text-sm">
            앞선 20개의 영단어 퍼즐에서 모은 알파벳 단서들을 아래 다이얼에 맞춰보세요!
          </p>
        </div>
      )}

      {/* Main Lock Mechanism (Hand-drawn safe dial) */}
      <div className="bg-white/95 p-6 md:p-8 doodle-box text-center relative my-4 shadow-lg">
        <div className="flex items-center justify-center gap-2 mb-3">
          {isUnlocked ? (
            <Unlock className="w-10 h-10 text-green-600 animate-bounce" />
          ) : (
            <Lock className="w-10 h-10 text-ink-blue" />
          )}
          <h2 className="text-3xl md:text-4xl font-hand font-bold text-ink-blue">
            {isUnlocked ? 'DOOR UNLOCKED!' : 'DIAL CIPHER LOCK'}
          </h2>
        </div>

        <p className="text-stone-500 font-korean text-base mb-6">
          화살표를 눌러 알파벳을 변경하거나 아래 단서 조각을 탭하세요!
        </p>

        {/* Letter Dials Row */}
        <div
          className={`flex items-center justify-center gap-2 md:gap-4 p-4 bg-paper rounded-xl border-2 border-stone-300 max-w-lg mx-auto ${
            errorShake ? 'animate-shake border-red-500 bg-red-50/50' : ''
          }`}
        >
          {dials.map((char, idx) => (
            <div key={idx} className="flex flex-col items-center">
              {/* Up button */}
              <button
                onClick={() => cycleLetter(idx, 'up')}
                className="p-1 hover:text-blue-700 text-ink-blue"
                title="다음 알파벳"
              >
                <ChevronUp className="w-6 h-6" />
              </button>

              {/* Letter Box */}
              <div
                className={`w-11 h-14 md:w-14 md:h-18 rounded-lg border-2 font-hand text-3xl md:text-4xl font-bold flex items-center justify-center shadow-inner ${
                  isUnlocked
                    ? 'bg-green-100 border-green-600 text-green-800'
                    : 'bg-white border-ink-blue text-ink-blue'
                }`}
              >
                {char}
              </div>

              {/* Down button */}
              <button
                onClick={() => cycleLetter(idx, 'down')}
                className="p-1 hover:text-blue-700 text-ink-blue"
                title="이전 알파벳"
              >
                <ChevronDown className="w-6 h-6" />
              </button>
            </div>
          ))}
        </div>

        {/* Clues Collected Pad */}
        <div className="mt-6 pt-4 border-t border-dashed border-[#D0E1FD] text-left">
          <span className="font-hand font-bold text-stone-700 text-sm block mb-2">
            수집된 단서 쪽지 (Collected Clues):
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {stage.clues.map((clue, idx) => (
              <button
                key={clue.id}
                onClick={() => handleQuickFill(clue.letter, idx)}
                className="p-2 bg-blue-50/80 hover:bg-blue-100 rounded border border-blue-200 text-left font-korean transition-colors text-xs flex items-center gap-2"
                title="다이얼에 적용하기"
              >
                <span className="w-6 h-6 rounded bg-ink-blue text-white font-hand font-bold flex items-center justify-center text-sm flex-shrink-0">
                  {clue.letter}
                </span>
                <span className="truncate text-stone-700">{clue.description}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Unlock Action Button */}
        <div className="mt-6">
          <button
            onClick={handleUnlockAttempt}
            disabled={isUnlocked}
            className={`px-8 py-3.5 font-korean text-xl font-bold rounded-xl doodle-btn flex items-center justify-center gap-2 mx-auto ${
              isUnlocked
                ? 'bg-green-600 text-white cursor-default'
                : 'bg-ink-blue text-white hover:bg-blue-800'
            }`}
          >
            <Key className="w-6 h-6" />
            <span>{isUnlocked ? '자물쇠 해제 완료! 열리는 중...' : '자물쇠 풀기 (UNLOCK)'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
