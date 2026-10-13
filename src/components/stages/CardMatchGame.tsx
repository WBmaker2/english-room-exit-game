import React, { useState, useEffect } from 'react';
import { Sparkles, Check, HelpCircle } from 'lucide-react';
import { WordItem } from '../../types/game';
import { soundEngine } from '../../utils/audioManager';

interface CardItem {
  uid: string;
  wordId: number;
  type: 'english' | 'korean';
  text: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface CardMatchGameProps {
  words: WordItem[]; // 6 words for Phase 3
  onComplete: () => void;
  onWordMastered: (wordId: number) => void;
}

export const CardMatchGame: React.FC<CardMatchGameProps> = ({
  words,
  onComplete,
  onWordMastered,
}) => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [selectedCards, setSelectedCards] = useState<CardItem[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [matchedPairsCount, setMatchedPairsCount] = useState(0);

  // Initialize 12 cards (6 pairs) shuffled
  useEffect(() => {
    const cardPool: CardItem[] = [];

    words.forEach((w) => {
      // English card
      cardPool.push({
        uid: `en-${w.id}`,
        wordId: w.id,
        type: 'english',
        text: w.word,
        isFlipped: false,
        isMatched: false,
      });
      // Korean meaning card
      cardPool.push({
        uid: `ko-${w.id}`,
        wordId: w.id,
        type: 'korean',
        text: w.meaning,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle cards
    const shuffled = [...cardPool].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setSelectedCards([]);
    setIsLocked(false);
    setMatchedPairsCount(0);
  }, [words]);

  const handleCardClick = (card: CardItem) => {
    if (isLocked || card.isFlipped || card.isMatched) return;

    soundEngine.playPencilScratch();
    if (card.type === 'english') {
      soundEngine.speakWord(card.text);
    }

    // Flip card
    const updatedCards = cards.map((c) =>
      c.uid === card.uid ? { ...c, isFlipped: true } : c
    );
    setCards(updatedCards);

    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setIsLocked(true);
      const [first, second] = newSelected;

      // Check match
      if (first.wordId === second.wordId) {
        // Matched!
        soundEngine.playStampDing();
        onWordMastered(first.wordId);

        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.wordId === first.wordId
                ? { ...c, isMatched: true, isFlipped: true }
                : c
            )
          );
          setSelectedCards([]);
          setIsLocked(false);
          setMatchedPairsCount((prev) => {
            const nextCount = prev + 1;
            if (nextCount === words.length) {
              soundEngine.playFanfare();
              setTimeout(onComplete, 1200);
            }
            return nextCount;
          });
        }, 500);
      } else {
        // Mismatch!
        soundEngine.playScratchOut();
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.uid === first.uid || c.uid === second.uid
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setSelectedCards([]);
          setIsLocked(false);
        }, 900);
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between max-w-4xl mx-auto w-full">
      {/* Phase Header */}
      <div className="flex items-center justify-between border-b border-[#D0E1FD] pb-3 mb-4">
        <div>
          <span className="bg-amber-100 text-amber-900 px-2.5 py-1 rounded text-sm font-hand font-bold mr-2">
            PHASE 3 : CARD MATCH
          </span>
          <span className="font-korean text-lg text-ink-blue font-bold">
            영단어-뜻 짝 맞추기 메모리 게임
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-ink-red font-hand text-base font-bold flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            짝 맞춤: {matchedPairsCount} / {words.length} 쌍
          </span>
        </div>
      </div>

      {/* Guide text */}
      <div className="text-center font-korean text-stone-600 text-base mb-3">
        뒤집힌 쪽지를 클릭해 영어 단어와 알맞은 우리말 뜻 짝을 찾아주세요! 🔎
      </div>

      {/* 3x4 / 4x3 Cards Grid (Notebook torn scraps) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 my-2">
        {cards.map((card) => {
          const showFace = card.isFlipped || card.isMatched;

          return (
            <button
              key={card.uid}
              onClick={() => handleCardClick(card)}
              disabled={card.isMatched || isLocked}
              className={`h-24 md:h-28 rounded-xl font-hand p-2.5 flex items-center justify-center text-center transition-all duration-300 relative select-none ${
                card.isMatched
                  ? 'bg-green-50 border-2 border-green-500 text-green-900 opacity-90 shadow-sm'
                  : showFace
                  ? 'bg-white border-2 border-ink-blue text-ink-blue shadow-md transform scale-[1.02]'
                  : 'bg-amber-100/90 border-2 border-amber-300 text-amber-800 hover:bg-amber-200 hover:-translate-y-0.5 shadow'
              }`}
            >
              {showFace ? (
                <div className="flex flex-col items-center justify-center w-full">
                  <span
                    className={`font-bold leading-tight ${
                      card.type === 'english'
                        ? 'font-hand text-2xl md:text-3xl text-ink-blue'
                        : 'font-korean text-lg md:text-xl text-ink-dark'
                    }`}
                  >
                    {card.text}
                  </span>
                  {card.isMatched && (
                    <span className="absolute top-1 right-1 text-green-600">
                      <Check className="w-4 h-4" />
                    </span>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center opacity-60">
                  <HelpCircle className="w-6 h-6 mb-1 text-amber-700" />
                  <span className="text-xs font-hand tracking-wider uppercase text-amber-800">
                    TAP CARD
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Completion Banner */}
      {matchedPairsCount === words.length && (
        <div className="p-4 bg-green-100 text-green-900 rounded-xl doodle-box text-center font-korean font-bold text-xl animate-bounce my-4">
          🎉 모든 카드의 짝을 찾았습니다! 최종 방탈출 암호 해독으로 이동합니다!
        </div>
      )}
    </div>
  );
};
