import React from 'react';
import { Volume2, VolumeX, BookOpen, Map, RotateCcw } from 'lucide-react';
import { GameProgress, StageId } from '../../types/game';
import { STAGES_DATA } from '../../data/stagesData';
import { soundEngine } from '../../utils/audioManager';

interface GameHeaderProps {
  progress: GameProgress;
  onToggleSound: () => void;
  onOpenWordbook: () => void;
  onOpenMap: () => void;
  onResetGame: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  progress,
  onToggleSound,
  onOpenWordbook,
  onOpenMap,
  onResetGame,
}) => {
  const currentStageInfo = STAGES_DATA.find((s) => s.id === progress.currentStage) || STAGES_DATA[0];
  const totalMastered = progress.masteredWordIds.length;
  const progressPercent = Math.min(100, Math.round((totalMastered / 100) * 100));

  return (
    <header className="w-full pb-4 mb-4 border-b-2 border-dashed border-[#D0E1FD]">
      {/* Top Controls Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        {/* Stage Badge & Title */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundEngine.playPageFlip();
              onOpenMap();
            }}
            className="doodle-btn px-3 py-1.5 bg-white text-ink-blue font-korean text-lg font-bold flex items-center gap-1.5 hover:bg-blue-50"
            title="학교 지도 열기"
          >
            <Map className="w-5 h-5 text-ink-blue" />
            <span>지도 (Room Map)</span>
          </button>

          <div className="bg-amber-100/80 px-3 py-1 border border-amber-300 rounded shadow-sm transform -rotate-1 hidden sm:block">
            <span className="font-korean text-sm text-amber-900 font-bold">
              현재 위치: {currentStageInfo.name}
            </span>
          </div>
        </div>

        {/* Action Controls: Sound Toggle, Wordbook, Reset */}
        <div className="flex items-center gap-2">
          {/* Wordbook Modal Trigger */}
          <button
            onClick={() => {
              soundEngine.playPageFlip();
              onOpenWordbook();
            }}
            className="doodle-btn px-3 py-1.5 bg-yellow-100 text-yellow-900 font-korean text-base font-bold flex items-center gap-1 hover:bg-yellow-200"
            title="100단어 비밀 공책 열기"
          >
            <BookOpen className="w-5 h-5 text-yellow-800" />
            <span>단어장 ({totalMastered}/100)</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className={`doodle-btn px-2.5 py-1.5 font-hand text-sm flex items-center gap-1 ${
              progress.isMuted ? 'bg-red-50 text-ink-red border-red-500' : 'bg-white text-ink-blue'
            }`}
            title={progress.isMuted ? '사운드 켜기' : '사운드 끄기'}
          >
            {progress.isMuted ? <VolumeX className="w-5 h-5 text-ink-red" /> : <Volume2 className="w-5 h-5 text-ink-blue" />}
            <span className="hidden md:inline">{progress.isMuted ? 'Muted' : 'Sound ON'}</span>
          </button>

          {/* Reset progress */}
          <button
            onClick={() => {
              if (window.confirm('처음부터 다시 시작하시겠습니까? (저장된 단어 진도가 초기화됩니다)')) {
                onResetGame();
              }
            }}
            className="p-1.5 text-stone-400 hover:text-ink-red transition-colors"
            title="처음부터 다시하기"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 100-Word Progress Rail */}
      <div className="bg-white/80 p-2.5 rounded-lg border border-[#D0E1FD] shadow-sm">
        <div className="flex items-center justify-between text-xs md:text-sm font-hand mb-1.5">
          <div className="flex items-center gap-1 text-ink-blue font-bold font-korean">
            <span>✏️ 필수 100단어 탈출 진도율:</span>
            <span className="text-ink-red font-hand text-base">{totalMastered} / 100</span>
            <span className="text-stone-500">({progressPercent}%)</span>
          </div>
          <div className="flex gap-2">
            {STAGES_DATA.map((st) => {
              const isCleared = progress.clearedStages.includes(st.id);
              const isCurrent = progress.currentStage === st.id;
              const isUnlocked = progress.unlockedStages.includes(st.id);
              return (
                <div
                  key={st.id}
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-hand font-bold transition-transform ${
                    isCleared
                      ? 'bg-ink-red text-white shadow-sm'
                      : isCurrent
                      ? 'bg-ink-blue text-white ring-2 ring-yellow-400 scale-110'
                      : isUnlocked
                      ? 'bg-blue-100 text-ink-blue border border-ink-blue'
                      : 'bg-stone-200 text-stone-400'
                  }`}
                  title={`${st.id}구역: ${st.name} ${isCleared ? '(클리어!)' : ''}`}
                >
                  {isCleared ? '★' : st.id}
                </div>
              );
            })}
          </div>
        </div>

        {/* Hand-drawn style progress bar */}
        <div className="w-full h-3 bg-stone-100 rounded-full border border-stone-300 overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-ink-blue transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </header>
  );
};
