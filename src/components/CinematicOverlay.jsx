import React from 'react';
import { ChevronDown, ArrowDown, Sparkles } from 'lucide-react';

export default function CinematicOverlay({ scrollProgress, onExploreClick }) {
  // Determine cinematic phase
  // Phase 1: 0.00 - 0.16 (Outside Showroom)
  // Phase 2: 0.16 - 0.32 (Entering Through Doors)
  // Phase 3: 0.32 - 0.52 (Inside Galleria Showroom)
  // Phase 4: 0.52 - 0.64 (Approaching & Opening Almira)
  // Phase 5: 0.64 - 0.94 (Active 3D Product Presentation - Handled by ProductPresentation component)
  // Phase 6: 0.94 - 1.00 (Entering Collection)

  return (
    <div className="fixed inset-0 pointer-events-none z-20 flex flex-col justify-between p-6 md:p-12">
      {/* Top right progress pill */}
      <div className="self-end pointer-events-auto flex items-center gap-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 mt-16 md:mt-14 shadow-lg text-xs">
        <span className="text-[10px] tracking-[0.2em] text-[#d4af37] uppercase font-mono">
          SHOWROOM JOURNEY
        </span>
        <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#d4af37] to-[#f5e0aa] transition-all duration-150"
            style={{ width: `${Math.round(scrollProgress * 100)}%` }}
          />
        </div>
        <span className="text-[11px] font-mono text-neutral-300">
          {Math.round(scrollProgress * 100)}%
        </span>
      </div>

      {/* PHASE 1: EXTERIOR ESTABLISHING TITLE (0.00 - 0.18) */}
      {scrollProgress < 0.18 && (
        <div
          className="my-auto max-w-2xl transition-all duration-700 pointer-events-auto"
          style={{
            opacity: Math.max(0, 1 - scrollProgress / 0.15),
            transform: `translateY(${scrollProgress * 120}px)`
          }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4af37]/40 bg-[#121217]/70 backdrop-blur-sm mb-4">
            <Sparkles className="w-3 h-3 text-[#d4af37]" />
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#f5e0aa] uppercase">
              NEW DELHI FLAGSHIP ATELIER
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-4 leading-[1.05]">
            RAHEEM <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f5e0aa] via-[#d4af37] to-[#b38328]">
              CLOTHS SHOWROOM
            </span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed mb-8 max-w-lg">
            Experience the pinnacle of bespoke tailoring and handwoven luxury. Walk through our doors into an interactive 3D realm of timeless sartorial craftsmanship.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreClick}
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b38328] hover:from-[#f5e0aa] hover:to-[#d4af37] text-black font-semibold tracking-wider text-xs uppercase flex items-center gap-2 shadow-xl shadow-[#d4af37]/20 transition-all hover:scale-105 active:scale-95"
            >
              Step Inside Showroom
              <ArrowDown className="w-4 h-4" />
            </button>
            <span className="text-xs text-neutral-400 tracking-widest uppercase hidden sm:inline">
              or scroll down to enter
            </span>
          </div>
        </div>
      )}

      {/* PHASE 2: PASSING THROUGH DOORS (0.18 - 0.32) */}
      {scrollProgress >= 0.18 && scrollProgress < 0.32 && (
        <div
          className="my-auto text-center max-w-lg mx-auto transition-all duration-500"
          style={{
            opacity: Math.min(1, Math.sin(((scrollProgress - 0.18) / 0.14) * Math.PI))
          }}
        >
          <p className="text-xs font-mono tracking-[0.3em] text-[#d4af37] uppercase mb-2">
            ENTRANCE REVEAL
          </p>
          <h3 className="font-serif text-2xl md:text-3xl text-white font-medium">
            Crossing The Threshold
          </h3>
          <p className="text-xs text-neutral-400 mt-2">
            The smoked-glass double doors part as you step into our sanctuary of luxury.
          </p>
        </div>
      )}

      {/* PHASE 3: INTERIOR GALLERIA (0.32 - 0.52) */}
      {scrollProgress >= 0.32 && scrollProgress < 0.52 && (
        <div
          className="my-auto max-w-md transition-all duration-500"
          style={{
            opacity: Math.min(1, Math.sin(((scrollProgress - 0.32) / 0.20) * Math.PI))
          }}
        >
          <div className="p-6 rounded-2xl bg-[#0e0e12]/80 backdrop-blur-md border border-[#d4af37]/20 shadow-2xl">
            <p className="text-[10px] font-mono tracking-[0.25em] text-[#d4af37] uppercase mb-2">
              ITALIAN MARBLE GALLERIA
            </p>
            <h3 className="font-serif text-xl md:text-2xl text-white font-medium mb-2">
              Bespoke Boutique Interior
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Illuminated with warm architectural spotlights, handcrafted racks display pure Belgian linens, raw silks, and cashmere blends.
            </p>
            <div className="mt-4 flex items-center gap-2 text-[11px] text-[#f5e0aa]">
              <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
              Moving toward the Master Almira...
            </div>
          </div>
        </div>
      )}

      {/* PHASE 4: APPROACHING THE ALMIRA CABINET (0.52 - 0.64) */}
      {scrollProgress >= 0.52 && scrollProgress < 0.64 && (
        <div
          className="my-auto text-center max-w-lg mx-auto transition-all duration-500"
          style={{
            opacity: Math.min(1, Math.sin(((scrollProgress - 0.52) / 0.12) * Math.PI))
          }}
        >
          <div className="p-6 rounded-2xl bg-[#0e0e12]/85 backdrop-blur-md border border-[#d4af37]/30 shadow-2xl">
            <p className="text-[10px] font-mono tracking-[0.3em] text-[#d4af37] uppercase mb-2">
              THE CENTERPIECE
            </p>
            <h3 className="font-serif text-2xl md:text-3xl text-white font-medium mb-2">
              The Master Almira Opens
            </h3>
            <p className="text-xs text-neutral-300">
              The walnut cabinet doors swing open. Handcrafted couture pieces emerge into the spotlight.
            </p>
          </div>
        </div>
      )}

      {/* Bottom Scroll Cue Indicator */}
      {scrollProgress < 0.92 && (
        <div className="self-center flex flex-col items-center gap-2 transition-opacity duration-300">
          <span className="text-[10px] tracking-[0.25em] text-neutral-400 uppercase font-sans">
            {scrollProgress > 0.64 ? 'Scroll to change garments • Reversible' : 'Scroll down to advance'}
          </span>
          <div className="w-6 h-10 rounded-full border border-[#d4af37]/40 flex items-start justify-center p-1.5 shadow-lg">
            <div className="w-1.5 h-2.5 rounded-full bg-[#d4af37] animate-bounce" />
          </div>
        </div>
      )}
    </div>
  );
}
