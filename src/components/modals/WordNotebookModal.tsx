import React, { useState, useMemo } from 'react';
import { X, Search, Volume2, CheckCircle2, BookOpen } from 'lucide-react';
import { WORDS_DATA } from '../../data/wordsData';
import { STAGES_DATA } from '../../data/stagesData';
import { soundEngine } from '../../utils/audioManager';

interface WordNotebookModalProps {
  masteredWordIds: number[];
  onClose: () => void;
}

export const WordNotebookModal: React.FC<WordNotebookModalProps> = ({
  masteredWordIds,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'mastered' | number>('all');

  const filteredWords = useMemo(() => {
    return WORDS_DATA.filter((w) => {
      // Filter by stage or mastered
      if (selectedFilter === 'mastered') {
        if (!masteredWordIds.includes(w.id)) return false;
      } else if (typeof selectedFilter === 'number') {
        if (w.stage !== selectedFilter) return false;
      }

      // Search term
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        return (
          w.word.toLowerCase().includes(q) ||
          w.meaning.includes(q) ||
          (w.exampleSentence && w.exampleSentence.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [searchTerm, selectedFilter, masteredWordIds]);

  return (
    <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 md:p-6 animate-fade-in">
      <div className="bg-[#FDFBF7] w-full max-w-4xl rounded-2xl border-4 border-[#0000CD] shadow-2xl p-4 md:p-6 notebook-lines relative max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-dashed border-[#D0E1FD]">
          <div className="flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-ink-blue" />
            <h2 className="text-2xl md:text-3xl font-korean font-bold text-ink-blue">
              초등 6학년 필수 영단어 100 비밀 수첩
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-ink-blue hover:text-ink-red hover:scale-110 transition-transform"
            title="수첩 닫기"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="my-3 space-y-2">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-2.5 text-stone-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="단어(word) 또는 우리말 뜻으로 검색..."
              className="w-full pl-10 pr-4 py-2 bg-white rounded-lg border-2 border-stone-300 font-korean text-base focus:border-ink-blue focus:outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600 font-hand"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 text-xs md:text-sm font-korean">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1 rounded-full border transition-colors ${
                selectedFilter === 'all'
                  ? 'bg-ink-blue text-white border-ink-blue font-bold'
                  : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
              }`}
            >
              전체 100단어
            </button>
            <button
              onClick={() => setSelectedFilter('mastered')}
              className={`px-3 py-1 rounded-full border transition-colors ${
                selectedFilter === 'mastered'
                  ? 'bg-ink-red text-white border-ink-red font-bold'
                  : 'bg-white text-ink-red border-red-300 hover:bg-red-50'
              }`}
            >
              마스터한 단어 ({masteredWordIds.length})
            </button>
            {STAGES_DATA.map((st) => (
              <button
                key={st.id}
                onClick={() => setSelectedFilter(st.id)}
                className={`px-3 py-1 rounded-full border transition-colors ${
                  selectedFilter === st.id
                    ? 'bg-blue-600 text-white border-blue-600 font-bold'
                    : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                }`}
              >
                {st.id}구역 ({st.name})
              </button>
            ))}
          </div>
        </div>

        {/* Word Cards Grid */}
        <div className="flex-1 overflow-y-auto pr-1 my-2 grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredWords.length === 0 ? (
            <div className="col-span-full py-12 text-center text-stone-400 font-korean text-lg">
              일치하는 단어가 없습니다.
            </div>
          ) : (
            filteredWords.map((word) => {
              const isMastered = masteredWordIds.includes(word.id);

              return (
                <div
                  key={word.id}
                  className={`p-3.5 rounded-xl border-2 transition-all relative ${
                    isMastered
                      ? 'bg-white border-ink-blue shadow-sm'
                      : 'bg-stone-50/70 border-stone-300 opacity-80'
                  }`}
                >
                  {/* Top: Word, Phonetic, Audio, Mastered Stamp */}
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-hand text-2xl font-bold text-ink-blue">
                        {word.id}. {word.word}
                      </span>
                      <button
                        onClick={() => soundEngine.speakWord(word.word)}
                        className="p-1 text-ink-blue hover:text-blue-700 hover:scale-110 rounded-full bg-blue-50"
                        title="원어민 발음 듣기"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    {isMastered && (
                      <span className="flex items-center gap-1 text-ink-red font-hand text-xs font-bold border border-red-400 bg-red-50 px-1.5 py-0.5 rounded">
                        <CheckCircle2 className="w-3.5 h-3.5" /> MASTERED
                      </span>
                    )}
                  </div>

                  {/* Phonetic & Meaning */}
                  <div className="flex items-baseline gap-2 mb-1.5">
                    <span className="font-korean text-xl font-bold text-ink-dark">
                      {word.meaning}
                    </span>
                    <span className="font-hand text-stone-500 text-sm">
                      {word.phonetic}
                    </span>
                  </div>

                  {/* Example sentence & translation */}
                  {word.exampleSentence && (
                    <div className="bg-paper p-2 rounded border border-paper-line text-xs">
                      <p className="font-hand italic text-stone-700 mb-0.5">
                        "{word.exampleSentence}"
                      </p>
                      <p className="font-korean text-stone-500">
                        {word.exampleTranslation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-dashed border-[#D0E1FD] flex items-center justify-between text-xs font-hand text-stone-500">
          <span>총 {filteredWords.length}개의 단어 표시 중</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-ink-blue text-white rounded doodle-btn font-korean font-bold"
          >
            수첩 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
