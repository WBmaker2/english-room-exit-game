import React, { useState, useEffect, useMemo } from 'react';
import { GameProgress, StageId, QuizPhase } from './types/game';
import { WORDS_DATA } from './data/wordsData';
import { STAGES_DATA } from './data/stagesData';
import { soundEngine } from './utils/audioManager';
import { loadGameProgress, saveGameProgress, resetGameProgress } from './utils/storage';

import { NotebookPaper } from './components/layout/NotebookPaper';
import { GameHeader } from './components/header/GameHeader';
import { SpeedQuiz4Choice } from './components/stages/SpeedQuiz4Choice';
import { AlphabetScramble } from './components/stages/AlphabetScramble';
import { CardMatchGame } from './components/stages/CardMatchGame';
import { RoomCipherLock } from './components/stages/RoomCipherLock';
import { StageClearStamp } from './components/stages/StageClearStamp';
import { StageMap } from './components/stages/StageMap';
import { WordNotebookModal } from './components/modals/WordNotebookModal';
import { GrandEscapeModal } from './components/ending/GrandEscapeModal';

export const App: React.FC = () => {
  const [progress, setProgress] = useState<GameProgress>(loadGameProgress);
  const [currentPhase, setCurrentPhase] = useState<QuizPhase>('speed-choice');

  // Modals state
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isWordbookOpen, setIsWordbookOpen] = useState(false);
  const [isGrandEscapeOpen, setIsGrandEscapeOpen] = useState(false);

  // Sync state to localStorage
  useEffect(() => {
    saveGameProgress(progress);
  }, [progress]);

  // Current stage metadata
  const currentStageInfo = useMemo(() => {
    return STAGES_DATA.find((s) => s.id === progress.currentStage) || STAGES_DATA[0];
  }, [progress.currentStage]);

  // Current stage 20 words
  const stageWords = useMemo(() => {
    return WORDS_DATA.filter((w) => w.stage === progress.currentStage);
  }, [progress.currentStage]);

  // Divide 20 words into the 3 phases: 8 (choice) + 6 (scramble) + 6 (card match) = 20 words
  const phase1Words = useMemo(() => stageWords.slice(0, 8), [stageWords]);
  const phase2Words = useMemo(() => stageWords.slice(8, 14), [stageWords]);
  const phase3Words = useMemo(() => stageWords.slice(14, 20), [stageWords]);

  // Handler: word mastered
  const handleWordMastered = (wordId: number) => {
    setProgress((prev) => {
      if (prev.masteredWordIds.includes(wordId)) return prev;
      return {
        ...prev,
        masteredWordIds: [...prev.masteredWordIds, wordId],
      };
    });
  };

  // Phase transitions
  const handlePhase1Complete = () => {
    soundEngine.playPageFlip();
    setCurrentPhase('scramble');
  };

  const handlePhase2Complete = () => {
    soundEngine.playPageFlip();
    setCurrentPhase('card-match');
  };

  const handlePhase3Complete = () => {
    soundEngine.playPageFlip();
    setCurrentPhase('boss-cipher');
  };

  const handleCipherUnlock = () => {
    soundEngine.playPageFlip();
    // Mark stage cleared
    setProgress((prev) => {
      const isAlreadyCleared = prev.clearedStages.includes(progress.currentStage);
      const nextCleared = isAlreadyCleared
        ? prev.clearedStages
        : [...prev.clearedStages, progress.currentStage];

      const nextStageId = (progress.currentStage + 1) as StageId;
      const nextUnlocked =
        nextStageId <= 5 && !prev.unlockedStages.includes(nextStageId)
          ? [...prev.unlockedStages, nextStageId]
          : prev.unlockedStages;

      return {
        ...prev,
        clearedStages: nextCleared,
        unlockedStages: nextUnlocked,
      };
    });
    setCurrentPhase('stage-clear');
  };

  const handleNextStage = () => {
    if (progress.currentStage === 5) {
      // Completed all 5 stages!
      setProgress((prev) => ({ ...prev, isGameFinished: true }));
      setIsGrandEscapeOpen(true);
    } else {
      const nextStageId = (progress.currentStage + 1) as StageId;
      setProgress((prev) => ({ ...prev, currentStage: nextStageId }));
      setCurrentPhase('speed-choice');
    }
  };

  // Navigation from map
  const handleSelectStage = (stageId: StageId) => {
    setProgress((prev) => ({ ...prev, currentStage: stageId }));
    setCurrentPhase('speed-choice');
  };

  // Sound toggle
  const handleToggleSound = () => {
    const isMuted = soundEngine.toggleMute();
    setProgress((prev) => ({ ...prev, isMuted }));
  };

  // Reset progress
  const handleResetGame = () => {
    const fresh = resetGameProgress();
    setProgress(fresh);
    setCurrentPhase('speed-choice');
    setIsGrandEscapeOpen(false);
  };

  return (
    <div className="min-h-screen bg-stone-200 py-3 md:py-6 px-2 md:px-4 flex flex-col justify-center select-none">
      <NotebookPaper>
        {/* Game Header */}
        <GameHeader
          progress={progress}
          onToggleSound={handleToggleSound}
          onOpenWordbook={() => setIsWordbookOpen(true)}
          onOpenMap={() => setIsMapOpen(true)}
          onResetGame={handleResetGame}
        />

        {/* Phase Navigation Tabs on the Notebook Margin */}
        <div className="flex items-center gap-1.5 md:gap-3 mb-4 overflow-x-auto pb-1 text-xs md:text-sm font-hand border-b border-paper-line">
          <button
            onClick={() => setCurrentPhase('speed-choice')}
            className={`px-3 py-1 rounded-t-lg transition-all ${
              currentPhase === 'speed-choice'
                ? 'bg-blue-600 text-white font-bold shadow-sm'
                : 'bg-white/80 text-ink-blue hover:bg-white'
            }`}
          >
            1. 4지선다 (8단어)
          </button>
          <button
            onClick={() => setCurrentPhase('scramble')}
            className={`px-3 py-1 rounded-t-lg transition-all ${
              currentPhase === 'scramble'
                ? 'bg-purple-600 text-white font-bold shadow-sm'
                : 'bg-white/80 text-purple-900 hover:bg-white'
            }`}
          >
            2. 스크램블 (6단어)
          </button>
          <button
            onClick={() => setCurrentPhase('card-match')}
            className={`px-3 py-1 rounded-t-lg transition-all ${
              currentPhase === 'card-match'
                ? 'bg-amber-600 text-white font-bold shadow-sm'
                : 'bg-white/80 text-amber-900 hover:bg-white'
            }`}
          >
            3. 카드 매칭 (6단어)
          </button>
          <button
            onClick={() => setCurrentPhase('boss-cipher')}
            className={`px-3 py-1 rounded-t-lg transition-all ${
              currentPhase === 'boss-cipher'
                ? 'bg-ink-red text-white font-bold shadow-sm'
                : 'bg-white/80 text-ink-red hover:bg-white'
            }`}
          >
            4. 자물쇠 암호 (Boss)
          </button>
        </div>

        {/* Dynamic Quiz Engine Content */}
        <main className="flex-1 flex flex-col">
          {currentPhase === 'speed-choice' && (
            <SpeedQuiz4Choice
              words={phase1Words}
              allWords={stageWords}
              onComplete={handlePhase1Complete}
              onWordMastered={handleWordMastered}
            />
          )}

          {currentPhase === 'scramble' && (
            <AlphabetScramble
              words={phase2Words}
              onComplete={handlePhase2Complete}
              onWordMastered={handleWordMastered}
            />
          )}

          {currentPhase === 'card-match' && (
            <CardMatchGame
              words={phase3Words}
              onComplete={handlePhase3Complete}
              onWordMastered={handleWordMastered}
            />
          )}

          {currentPhase === 'boss-cipher' && (
            <RoomCipherLock
              stage={currentStageInfo}
              onUnlock={handleCipherUnlock}
            />
          )}

          {currentPhase === 'stage-clear' && (
            <StageClearStamp
              stage={currentStageInfo}
              onNextStage={handleNextStage}
              isFinalStage={progress.currentStage === 5}
            />
          )}
        </main>
      </NotebookPaper>

      {/* Map Modal */}
      {isMapOpen && (
        <StageMap
          currentStage={progress.currentStage}
          unlockedStages={progress.unlockedStages}
          clearedStages={progress.clearedStages}
          onSelectStage={handleSelectStage}
          onClose={() => setIsMapOpen(false)}
        />
      )}

      {/* Wordbook Review Modal */}
      {isWordbookOpen && (
        <WordNotebookModal
          masteredWordIds={progress.masteredWordIds}
          onClose={() => setIsWordbookOpen(false)}
        />
      )}

      {/* Grand Escape Ending Modal */}
      {isGrandEscapeOpen && (
        <GrandEscapeModal
          masteredCount={progress.masteredWordIds.length}
          onRestart={handleResetGame}
          onReviewWords={() => {
            setIsGrandEscapeOpen(false);
            setIsWordbookOpen(true);
          }}
        />
      )}
    </div>
  );
};

export default App;
