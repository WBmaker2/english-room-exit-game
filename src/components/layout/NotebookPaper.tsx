import React from 'react';
import { CoffeeRingStain, DoodleStar, StickFigureThinking } from './DoodleElements';

interface NotebookPaperProps {
  children: React.ReactNode;
  showMarginalia?: boolean;
}

export const NotebookPaper: React.FC<NotebookPaperProps> = ({
  children,
  showMarginalia = true,
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto my-3 md:my-6 relative">
      {/* Wooden Desk / Notebook shadow layer */}
      <div className="absolute inset-0 bg-stone-300 rounded-xl transform rotate-[0.3deg] translate-y-1.5 translate-x-1.5 shadow-2xl opacity-70 pointer-events-none" />

      {/* Main Notebook Surface */}
      <div className="relative bg-[#FDFBF7] rounded-lg border-2 border-[#D0E1FD] shadow-xl overflow-hidden min-h-[620px] flex flex-col">
        {/* Binder Spiral Holes along the top/left edge */}
        <div className="w-full h-8 bg-amber-50/50 border-b border-amber-200/60 flex items-center justify-between px-6 select-none">
          <div className="flex gap-4">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="w-3.5 h-3.5 rounded-full bg-stone-200 border-2 border-stone-400 shadow-inner flex items-center justify-center"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-stone-600/60" />
              </div>
            ))}
          </div>
          <div className="text-xs font-hand text-ink-pencil tracking-widest uppercase opacity-60">
            ★ SECRET ESCAPE NOTEBOOK - 6TH GRADE ★
          </div>
        </div>

        {/* Notebook Body: Ruled lines & Red margin line */}
        <div className="relative flex-1 notebook-paper p-4 md:p-8 flex flex-col">
          {/* Subtle Corner Coffee Stain (Marginalia) */}
          {showMarginalia && (
            <>
              <div className="absolute -bottom-6 -right-6 pointer-events-none opacity-40 z-0">
                <CoffeeRingStain className="w-36 h-36" />
              </div>
              <div className="absolute top-12 right-6 pointer-events-none opacity-30 hidden lg:block">
                <DoodleStar className="w-8 h-8" color="#FF0000" />
              </div>
              <div className="absolute bottom-8 left-3 pointer-events-none opacity-35 hidden xl:block">
                <StickFigureThinking className="w-14 h-16" />
              </div>
            </>
          )}

          {/* Main Interactive Content */}
          <div className="relative z-10 flex-1 flex flex-col">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
