import React from 'react'
import { BookOpen, Sparkles, Award } from 'lucide-react'

export const App: React.FC = () => {
  return (
    <div className="min-h-screen notebook-paper p-4 md:p-8 flex flex-col items-center justify-center font-hand">
      <div className="max-w-xl w-full bg-white/90 p-6 md:p-8 doodle-box text-center shadow-lg relative">
        {/* Decorative stamp */}
        <div className="absolute -top-3 -right-3 stamp-clear text-lg">
          MISSION START!
        </div>

        <div className="flex items-center justify-center gap-2 mb-2 text-ink-blue">
          <BookOpen className="w-8 h-8" />
          <h1 className="text-3xl md:text-4xl font-bold font-korean tracking-wide">
            초등 6학년 영단어 100 방탈출
          </h1>
          <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
        </div>

        <p className="text-xl md:text-2xl text-ink-dark font-hand mb-6">
          Elementary School 6th Grade Escape Adventure
        </p>

        <div className="bg-paper p-4 rounded-lg notebook-lines mb-6 text-left border border-paper-line">
          <p className="text-lg text-ink-blue leading-7">
            ✏️ <strong className="font-korean">미션:</strong> 5개의 교실을 탈출하여 최종 금고 비밀번호를 풀어라!
          </p>
          <p className="text-lg text-ink-red font-korean leading-7">
            ★ 필수 영단어 100개 완벽 마스터 챌린지!
          </p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <button className="px-6 py-2 bg-ink-blue text-white font-korean text-xl doodle-btn flex items-center gap-2">
            <Award className="w-5 h-5" />
            게임 시작하기
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
