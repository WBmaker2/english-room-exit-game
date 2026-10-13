import React from 'react';
import { X, Lock, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { StageId } from '../../types/game';
import { STAGES_DATA } from '../../data/stagesData';
import { soundEngine } from '../../utils/audioManager';

interface StageMapProps {
  currentStage: StageId;
  unlockedStages: StageId[];
  clearedStages: StageId[];
  onSelectStage: (id: StageId) => void;
  onClose: () => void;
}

export const StageMap: React.FC<StageMapProps> = ({
  currentStage,
  unlockedStages,
  clearedStages,
  onSelectStage,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-[#FDFBF7] w-full max-w-3xl rounded-2xl border-4 border-[#0000CD] shadow-2xl p-6 md:p-8 notebook-lines relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-ink-blue hover:text-ink-red hover:scale-110 transition-transform"
          title="지도 닫기"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Title */}
        <div className="text-center mb-6">
          <div className="inline-block bg-yellow-200 px-4 py-1 rounded text-ink-blue font-hand text-sm font-bold transform -rotate-1 mb-2">
            SCHOOL ESCAPE BLUEPRINT
          </div>
          <h2 className="text-3xl md:text-4xl font-korean font-bold text-ink-blue">
            🗺️ 학교 방탈출 탐험 지도
          </h2>
          <p className="font-hand text-stone-600 text-base">
            클리어했거나 해금된 구역을 선택하여 탐험할 수 있습니다.
          </p>
        </div>

        {/* 5 Rooms Blueprint Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          {STAGES_DATA.map((st) => {
            const isUnlocked = unlockedStages.includes(st.id);
            const isCleared = clearedStages.includes(st.id);
            const isCurrent = currentStage === st.id;

            return (
              <div
                key={st.id}
                className={`p-5 rounded-xl border-2 transition-all relative ${
                  isCurrent
                    ? 'bg-blue-50/90 border-ink-blue ring-4 ring-blue-300 shadow-lg'
                    : isCleared
                    ? 'bg-green-50/80 border-green-500 shadow'
                    : isUnlocked
                    ? 'bg-white border-stone-400 hover:border-ink-blue hover:shadow'
                    : 'bg-stone-100 border-stone-300 opacity-60 cursor-not-allowed'
                }`}
              >
                {/* Status Badges */}
                <div className="flex items-center justify-between mb-2">
                  <span className="font-hand font-bold text-sm text-stone-500">
                    ROOM {st.id}
                  </span>
                  {isCleared ? (
                    <span className="flex items-center gap-1 text-green-700 font-korean text-xs font-bold bg-green-100 px-2 py-0.5 rounded">
                      <CheckCircle className="w-3.5 h-3.5" /> 클리어 완료
                    </span>
                  ) : isCurrent ? (
                    <span className="flex items-center gap-1 text-ink-blue font-korean text-xs font-bold bg-blue-100 px-2 py-0.5 rounded animate-pulse">
                      <Sparkles className="w-3.5 h-3.5" /> 현재 도전 중
                    </span>
                  ) : !isUnlocked ? (
                    <span className="flex items-center gap-1 text-stone-500 font-korean text-xs font-bold bg-stone-200 px-2 py-0.5 rounded">
                      <Lock className="w-3.5 h-3.5" /> 잠김
                    </span>
                  ) : (
                    <span className="text-blue-600 font-korean text-xs font-bold">
                      입장 가능
                    </span>
                  )}
                </div>

                {/* Room Title */}
                <h3 className="font-korean text-xl font-bold text-ink-blue mb-1">
                  {st.name} ({st.roomTitle.split(':')[1]?.trim() || st.name})
                </h3>
                <p className="font-hand text-stone-600 text-sm mb-3">
                  {st.subtitle}
                </p>

                {/* Enter Button */}
                {isUnlocked ? (
                  <button
                    onClick={() => {
                      soundEngine.playPageFlip();
                      onSelectStage(st.id);
                      onClose();
                    }}
                    className="w-full py-2 bg-ink-blue hover:bg-blue-800 text-white font-korean text-base font-bold rounded-lg doodle-btn flex items-center justify-center gap-2"
                  >
                    <span>이 구역으로 이동</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="w-full py-2 bg-stone-200 text-stone-400 font-korean text-sm font-bold rounded-lg text-center">
                    이전 구역을 먼저 클리어하세요
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Close Action */}
        <div className="text-center mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white text-stone-700 font-korean text-base border-2 border-stone-400 rounded-lg doodle-btn hover:bg-stone-50"
          >
            지도 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
