import React, { useState, useEffect, useMemo } from 'react';
import { Volume2, Sparkles, CheckCircle2, XCircle } from 'lucide-react';
import { WordItem } from '../../types/game';
import { soundEngine } from '../../utils/audioManager';

interface SpeedQuiz4ChoiceProps {
  words: WordItem[]; // 8 words for Phase 1
  allWords: WordItem[]; // Full pool for distractors
  onComplete: () => void;
  onWordMastered: (wordId: number) => void;
}

export const SpeedQuiz4Choice: React.FC<SpeedQuiz4ChoiceProps> = ({
  words,
  allWords,
  onComplete,
  onWordMastered,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [combo, setCombo] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentWord = words[currentIndex];

  // Auto pronounce English word when question changes
  useEffect(() => {
    if (currentWord) {
      soundEngine.speakWord(currentWord.word);
    }
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
    setShowExplanation(false);
  }, [currentIndex, currentWord]);

  // Generate 4 randomized options (1 correct + 3 distinct distractors)
  const options = useMemo(() => {
    if (!currentWord) return [];

    const correctAnswer = currentWord.meaning;
    const distractors = allWords
      .filter((w) => w.meaning !== correctAnswer)
      .map((w) => w.meaning);

    // Shuffle and pick 3
    const shuffledDistractors = [...distractors].sort(() => Math.random() - 0.5).slice(0, 3);
    const combined = [correctAnswer, ...shuffledDistractors].sort(() => Math.random() - 0.5);

    return combined;
  }, [currentWord, allWords]);

  const handleSelect = (option: string) => {
    if (selectedAnswer !== null) return; // Prevent double click

    setSelectedAnswer(option);
    const correct = option === currentWord.meaning;
    setIsAnswerCorrect(correct);

    if (correct) {
      soundEngine.playStampDing();
      setCombo((prev) => prev + 1);
      onWordMastered(currentWord.id);

      // Auto advance on correct after short celebration
      setTimeout(() => {
        if (currentIndex + 1 < words.length) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          onComplete();
        }
      }, 800);
    } else {
      soundEngine.playScratchOut();
      setCombo(0);
      setShowExplanation(true);
    }
  };

  const handleRetryOrNext = () => {
    // If answered incorrectly, let student try again or move to next
    if (currentIndex + 1 < words.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  if (!currentWord) return null;

  return (
    <div className="flex-1 flex flex-col justify-between max-w-3xl mx-auto w-full">
      {/* Quiz Phase Title & Subtitle */}
      <div className="flex items-center justify-between border-b border-[#D0E1FD] pb-3 mb-4">
        <div>
          <span className="bg-blue-100 text-ink-blue px-2.5 py-1 rounded text-sm font-hand font-bold mr-2">
            PHASE 1 : 4-CHOICE BLITZ
          </span>
          <span className="font-korean text-lg text-ink-blue font-bold">
            스피드 4지선다 퀴즈
          </span>
        </div>
        <div className="flex items-center gap-2">
          {combo >= 2 && (
            <span className="text-ink-red font-hand text-lg font-bold animate-bounce flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              Combo x{combo}!
            </span>
          )}
          <span className="text-ink-dark font-hand text-base font-bold">
            [{currentIndex + 1} / {words.length}]
          </span>
        </div>
      </div>

      {/* Main Question Card (Notebook Scrap with Blue Ink) */}
      <div className="bg-white/95 p-6 md:p-8 doodle-box text-center relative my-2 shadow-md">
        {/* Correct Stamp Animation Overlay */}
        {isAnswerCorrect === true && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <div className="stamp-clear text-4xl md:text-5xl transform -rotate-12 bg-white/80 px-6 py-2 animate-scale-in">
              ⭕ CORRECT!
            </div>
          </div>
        )}

        {/* English Word in Bold Blue Ink */}
        <div className="flex items-center justify-center gap-3 mb-2">
          <h2 className="text-4xl md:text-5xl font-hand font-bold text-ink-blue tracking-wide select-none">
            {currentWord.word}
          </h2>
          <button
            onClick={() => soundEngine.speakWord(currentWord.word)}
            className="p-2 text-ink-blue hover:text-blue-700 hover:scale-110 transition-transform rounded-full bg-blue-50 border border-blue-200"
            title="원어민 발음 듣기"
          >
            <Volume2 className="w-6 h-6" />
          </button>
        </div>

        {/* Phonetic & Example hint */}
        <p className="text-stone-500 font-hand text-lg mb-2">
          {currentWord.phonetic}
        </p>
        <p className="text-stone-600 font-hand italic text-base bg-paper-line/30 py-1 px-3 rounded inline-block">
          "{currentWord.exampleSentence}"
        </p>
      </div>

      {/* 4 Choices Grid (Notebook Paper Post-it scraps) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
        {options.map((option, idx) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = option === currentWord.meaning;

          let btnClass = 'bg-white hover:bg-blue-50 text-ink-blue border-ink-blue';
          if (selectedAnswer !== null) {
            if (isCorrect) {
              btnClass = 'bg-green-100 text-green-900 border-green-600 font-bold';
            } else if (isSelected && !isCorrect) {
              btnClass = 'bg-red-100 text-ink-red border-red-500 line-through';
            } else {
              btnClass = 'bg-stone-50 text-stone-400 border-stone-300 opacity-60';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(option)}
              disabled={selectedAnswer !== null}
              className={`p-4 text-left font-korean text-xl doodle-btn flex items-center justify-between transition-all ${btnClass}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full border border-current flex items-center justify-center font-hand text-base">
                  {idx + 1}
                </span>
                <span>{option}</span>
              </div>
              {selectedAnswer !== null && isCorrect && (
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              )}
              {selectedAnswer !== null && isSelected && !isCorrect && (
                <XCircle className="w-6 h-6 text-ink-red" />
              )}
            </button>
          );
        })}
      </div>

      {/* Incorrect Explanation & Retry Prompt */}
      {showExplanation && (
        <div className="bg-red-50 p-4 rounded-lg border-2 border-red-300 doodle-box-red my-2 flex items-center justify-between animate-fade-in">
          <div className="text-left font-korean">
            <span className="text-ink-red font-bold text-lg">💡 정답 확인: </span>
            <span className="text-ink-blue text-lg font-bold">
              {currentWord.word} = {currentWord.meaning}
            </span>
            <p className="text-stone-600 text-sm mt-0.5">{currentWord.exampleTranslation}</p>
          </div>
          <button
            onClick={handleRetryOrNext}
            className="px-4 py-2 bg-ink-red text-white font-korean text-base rounded doodle-btn shadow"
          >
            다음 문제로 ➔
          </button>
        </div>
      )}
    </div>
  );
};
