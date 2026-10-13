import React from 'react';
import { ArrowRight, Key } from 'lucide-react';
import { StageItem } from '../../types/game';
import { StickFigureCheer, DoodleStar } from '../layout/DoodleElements';
import { soundEngine } from '../../utils/audioManager';

interface StageClearStampProps {
  stage: StageItem;
  onNextStage: () => void;
  isFinalStage: boolean;
}

export const StageClearStamp: React.FC<StageClearStampProps> = ({
  stage,
  onNextStage,
  isFinalStage,
}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full text-center py-6">
      {/* Decorative Doodles */}
      <div className="flex items-center justify-center gap-6 mb-4">
        <DoodleStar className="w-10 h-10 text-yellow-500 animate-spin" />
        <StickFigureCheer className="w-20 h-24" />
        <DoodleStar className="w-10 h-10 text-ink-red animate-pulse" />
      </div>

      {/* Main Clear Card */}
      <div className="bg-white/95 p-6 md:p-8 doodle-box w-full relative shadow-xl">
        {/* Big Red Ink Stamp */}
        <div className="stamp-clear text-4xl md:text-5xl transform -rotate-6 inline-block mb-4 px-6 py-2 bg-white/90">
          ★ STAGE {stage.id} CLEARED! ★
        </div>

        <h2 className="text-3xl md:text-4xl font-korean font-bold text-ink-blue mb-2">
          {stage.name} 탈출에 성공했습니다!
        </h2>

        <p className="font-hand text-xl text-stone-600 mb-6">
          Congratulations! You unlocked the secret door with code "
          <strong className="text-ink-red font-bold tracking-widest">{stage.cipherWord}</strong>"!
        </p>

        {/* Reward Box */}
        <div className="bg-amber-50 p-4 rounded-xl border border-amber-300 max-w-md mx-auto mb-6 flex items-center justify-center gap-3">
          <Key className="w-8 h-8 text-yellow-600 animate-bounce" />
          <div className="text-left font-korean">
            <span className="text-amber-900 font-bold block">
              {isFinalStage ? '최종 학교 정문 열쇠 획득!' : `제${stage.id + 1}구역 마스터 열쇠 획득!`}
            </span>
            <span className="text-xs text-stone-600">
              {isFinalStage ? '축하합니다! 대탈출 성공식으로 이동합니다.' : '다음 구역의 문이 활짝 열렸습니다.'}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => {
            soundEngine.playPageFlip();
            onNextStage();
          }}
          className="px-8 py-3.5 bg-ink-blue text-white font-korean text-xl font-bold rounded-xl doodle-btn flex items-center justify-center gap-2 mx-auto hover:bg-blue-800"
        >
          <span>{isFinalStage ? '최종 탈출식 입장하기! 🏆' : '다음 구역으로 이동하기 ➔'}</span>
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
