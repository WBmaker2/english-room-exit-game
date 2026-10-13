import React from 'react';
import { Award, BookOpen, RotateCcw } from 'lucide-react';
import { StickFigureCheer, DoodleStar } from '../layout/DoodleElements';
import { soundEngine } from '../../utils/audioManager';

interface GrandEscapeModalProps {
  masteredCount: number;
  onRestart: () => void;
  onReviewWords: () => void;
}

export const GrandEscapeModal: React.FC<GrandEscapeModalProps> = ({
  masteredCount,
  onRestart,
  onReviewWords,
}) => {
  return (
    <div className="fixed inset-0 bg-stone-900/75 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-[#FDFBF7] w-full max-w-2xl rounded-2xl border-4 border-[#0000CD] shadow-2xl p-6 md:p-10 notebook-paper relative text-center max-h-[92vh] overflow-y-auto">
        {/* Top Floating Doodles */}
        <div className="flex items-center justify-center gap-6 mb-3">
          <DoodleStar className="w-10 h-10 text-yellow-500 animate-spin" />
          <StickFigureCheer className="w-20 h-24" />
          <DoodleStar className="w-10 h-10 text-ink-red animate-pulse" />
        </div>

        {/* Certificate Border Card */}
        <div className="bg-white/95 p-6 md:p-8 rounded-xl border-4 border-double border-ink-blue shadow-lg relative my-2">
          {/* Official Red Ink Seal */}
          <div className="absolute top-4 right-4 stamp-clear text-xl md:text-2xl transform rotate-12 bg-white/90">
            ★ OFFICIAL SEAL ★
            <br />
            ESCAPE MASTER
          </div>

          <div className="flex items-center justify-center gap-2 mb-2 text-ink-blue">
            <Award className="w-8 h-8 text-yellow-600" />
            <h1 className="text-3xl md:text-4xl font-korean font-bold tracking-wide">
              방탈출 명예 졸업 인증서
            </h1>
          </div>

          <p className="font-hand text-lg text-stone-500 mb-6">
            Certificate of Room Escape Mastery
          </p>

          <div className="space-y-4 font-korean text-stone-800 text-lg leading-relaxed text-left max-w-lg mx-auto bg-paper p-4 rounded-lg border border-paper-line">
            <p>
              🎓 <strong>인증 대상:</strong> 초등학교 6학년 방탈출 영웅
            </p>
            <p>
              🌟 <strong>성취 내역:</strong> 교실, 도서관, 과학실, 미술실, 비밀금고의 모든 수수께끼를 돌파하고, 필수 영단어 100개를 완벽히 마스터함.
            </p>
            <p>
              🔑 <strong>최종 결과:</strong> 학교 정문 개방 및 자유 획득 완료! (마스터 단어: {masteredCount} / 100개)
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-dashed border-[#D0E1FD]">
            <p className="font-hand text-2xl font-bold text-ink-blue">
              "You are the ultimate English room escape master!"
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
          <button
            onClick={() => {
              soundEngine.playPageFlip();
              onReviewWords();
            }}
            className="px-6 py-3 bg-yellow-100 hover:bg-yellow-200 text-yellow-900 font-korean text-lg font-bold rounded-xl doodle-btn flex items-center gap-2"
          >
            <BookOpen className="w-5 h-5" />
            <span>100단어 수첩 복습하기</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('새로운 모험을 다시 시작하시겠습니까?')) {
                onRestart();
              }
            }}
            className="px-6 py-3 bg-ink-blue hover:bg-blue-800 text-white font-korean text-lg font-bold rounded-xl doodle-btn flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            <span>다시 처음부터 도전하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};
