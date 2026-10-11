import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function LoadingScreen({ onLoaded }) {
  const [progress, setProgress] = useState(12);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onLoaded(), 400);
          return 100;
        }
        const step = Math.floor(Math.random() * 18) + 12;
        return Math.min(prev + step, 100);
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onLoaded]);

  return (
    <div className="fixed inset-0 z-50 bg-[#09090c] flex flex-col items-center justify-center p-6 text-center select-none">
      {/* Subtle background golden ambient glow */}
      <div className="absolute w-96 h-96 rounded-full bg-[#d4af37]/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-sm flex flex-col items-center">
        {/* Monogram emblem */}
        <div className="w-16 h-16 rounded-full border border-[#d4af37]/60 flex items-center justify-center bg-[#13131a] mb-6 shadow-2xl shadow-[#d4af37]/20 animate-pulse">
          <span className="font-serif text-[#d4af37] font-bold text-2xl tracking-widest">R</span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#d4af37] uppercase">
            FLAGSHIP 3D EXPERIENCE
          </span>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-white mb-2 uppercase">
          RAHEEM CLOTHS SHOWROOM
        </h2>
        <p className="text-xs text-neutral-400 font-light mb-8">
          Preparing the architectural 3D showroom &amp; bespoke garments...
        </p>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-gradient-to-r from-[#d4af37] to-[#f5e0aa] transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between w-64 text-[10px] font-mono text-neutral-500">
          <span>INITIALIZING SHADERS</span>
          <span className="text-[#f5e0aa] font-semibold">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
