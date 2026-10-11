import React, { useRef, useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { PRODUCTS, SHOWROOM_INFO } from '../data/products';
import { sounds } from '../utils/soundEffects';

export default function ShowroomScene({
  scrollProgress,
  activeProductIndex,
  onProductChange,
  catalogProgress = 0,
  scrollY = 0,
  selectedColors = {},
  products = PRODUCTS
}) {
  const containerRef = useRef(null);
  const prevProgressRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  // 360 Degree Interactive Rotation (Mouse Drag & Touch / Finger)
  const [rotationY, setRotationY] = useState(0);
  const [rotationX, setRotationX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [autoSpin, setAutoSpin] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, rotY: 0, rotX: 0 });
  const autoSpinAnimRef = useRef(null);

  // Reset 360 rotation smoothly when active garment changes
  useEffect(() => {
    setRotationY(0);
    setRotationX(0);
    setAutoSpin(false);
  }, [activeProductIndex]);

  // Optional 360 auto-spin loop
  useEffect(() => {
    if (!autoSpin) {
      if (autoSpinAnimRef.current) cancelAnimationFrame(autoSpinAnimRef.current);
      return;
    }
    const spinLoop = () => {
      setRotationY((prev) => (prev + 0.75) % 360);
      autoSpinAnimRef.current = requestAnimationFrame(spinLoop);
    };
    autoSpinAnimRef.current = requestAnimationFrame(spinLoop);
    return () => {
      if (autoSpinAnimRef.current) cancelAnimationFrame(autoSpinAnimRef.current);
    };
  }, [autoSpin]);

  // Pointer/Touch drag handlers for 360 rotation
  const handlePointerDown = (e) => {
    setIsDragging(true);
    setAutoSpin(false);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      rotY: rotationY,
      rotX: rotationX
    };
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) {}
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    // Drag horizontally spins 360 degrees around Y axis
    setRotationY(dragStartRef.current.rotY + dx * 0.9);
    // Drag vertically tilts subtly on X axis
    setRotationX(Math.max(-25, Math.min(25, dragStartRef.current.rotX - dy * 0.2)));
  };

  const handlePointerUp = (e) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch (err) {}
    }
  };

  // Mouse tilt tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseRef.current = { x, y };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Audio cue triggering on scroll progression
  useEffect(() => {
    const progress = Math.min(Math.max(scrollProgress, 0), 1);
    const prev = prevProgressRef.current;

    if (Math.abs(progress - prev) > 0.015) {
      if (progress > 0.16 && prev <= 0.16) {
        sounds.playDoorOpen();
      } else if (progress > 0.54 && prev <= 0.54) {
        sounds.playDoorOpen();
      } else if (progress > 0.65 && prev <= 0.65) {
        sounds.playSwoosh();
      }
      prevProgressRef.current = progress;
    }

    // Determine active product index (0.65 to 0.94)
    const productStart = 0.65;
    const productEnd = 0.94;
    const total = products.length;
    const step = total > 0 ? (productEnd - productStart) / total : 1;

    let currentIdx = -1;
    if (progress >= productStart && progress < productEnd && total > 0) {
      const offset = progress - productStart;
      currentIdx = Math.min(Math.floor(offset / step), total - 1);
    } else if (progress >= productEnd) {
      currentIdx = -1;
    }

    if (currentIdx !== activeProductIndex && onProductChange) {
      onProductChange(currentIdx);
    }
  }, [scrollProgress, activeProductIndex, onProductChange, products]);

  const p = Math.min(Math.max(scrollProgress, 0), 1);

  // --- Calculations for continuous reversible timeline ---

  // Phase 1: Camera glides up to the grand entrance (0.00 -> 0.32)
  const approachT = Math.min(Math.max(p / 0.30, 0), 1);
  const exteriorScale = 1.0 + approachT * 0.55;
  const exteriorOpacity = Math.max(0, 1 - Math.max(0, (p - 0.28) / 0.10));

  // Phase 2: Double Glass Doors physically swing open (0.14 -> 0.32)
  const doorT = Math.min(Math.max((p - 0.14) / 0.16, 0), 1);
  const easeDoor = easeInOutCubic(doorT);
  const leftDoorAngle = easeDoor * 82; // swings inward into showroom
  const rightDoorAngle = -easeDoor * 82;

  // Phase 3 & Whole-Site Parallax: Walk-in Showroom Interior
  const isPastHero = p >= 0.92;
  const catalogParallaxY = catalogProgress * -140;
  const catalogParallaxScale = 1.1 + catalogProgress * 0.15;

  const interiorT = Math.min(Math.max((p - 0.24) / 0.38, 0), 1);
  const heroInteriorScale = 0.85 + interiorT * 0.75;
  const heroInteriorTranslateY = -interiorT * 35;

  const interiorScale = isPastHero ? catalogParallaxScale : heroInteriorScale;
  const interiorTranslateY = isPastHero ? catalogParallaxY : heroInteriorTranslateY;

  const interiorOpacity = p < 0.18
    ? 0
    : p < 0.28
      ? (p - 0.18) / 0.10
      : p > 0.64 && p < 0.94
        ? 0.45
        : isPastHero
          ? 0.85
          : 1;

  // Phase 4: Almira Cabinet & Open Doors (0.54 -> 0.96)
  const almiraT = Math.min(Math.max((p - 0.54) / 0.12, 0), 1);
  const easeAlmira = easeInOutCubic(almiraT);
  const almiraOpacity = p < 0.52
    ? 0
    : p < 0.58
      ? (p - 0.52) / 0.06
      : p > 0.96
        ? 0
        : 1;
  const almiraScale = 0.92 + Math.min(Math.max((p - 0.54) / 0.15, 0), 1) * 0.16;

  // Phase 5: Garment Fly-Out (0.65 -> 0.94)
  const productStart = 0.65;
  const productEnd = 0.94;
  const step = products.length > 0 ? (productEnd - productStart) / products.length : 1;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full overflow-hidden select-none pointer-events-none z-0 bg-[#09090c]"
      style={{ perspective: '1400px' }}
    >
      {/* ======================================================== */}
      {/* 1. REAL SHOWROOM INTERIOR (Crisp Modern White Lighting) */}
      {/* ======================================================== */}
      <div
        className="absolute inset-0 transition-all duration-300 pointer-events-none"
        style={{
          opacity: interiorOpacity,
          transform: `scale(${interiorScale}) translateY(${interiorTranslateY}px) translate3d(${mouseRef.current.x * -12}px, ${mouseRef.current.y * -8}px, 0)`,
          transformOrigin: '50% 50%',
          willChange: 'transform, opacity'
        }}
      >
        <img
          src={SHOWROOM_INFO.interiorImage}
          alt="Raheem Cloths Showroom Interior"
          className="w-full h-full object-cover object-center filter brightness-[1.12] contrast-[1.03] saturate-[0.84]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 pointer-events-none" />
        {/* Luxury overhead gallery-white recessed illumination beam */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_50%_at_50%_0%,rgba(255,255,255,0.24),rgba(255,255,255,0.06)_50%,transparent_80%)] pointer-events-none" />
        {/* Crisp white ambient fill */}
        <div className="absolute inset-0 bg-radial from-white/16 via-slate-100/5 to-black/55 pointer-events-none" />
      </div>

      {/* ======================================================== */}
      {/* 2. REAL GRAND ENTRANCE FACADE & WORKING 3D DOUBLE DOORS */}
      {/* ======================================================== */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: exteriorOpacity,
          transform: `scale(${exteriorScale}) translate3d(${mouseRef.current.x * -8}px, ${mouseRef.current.y * -6}px, 0)`,
          transformOrigin: '50% 55%',
          willChange: 'transform, opacity'
        }}
      >
        {/* Base Grand Entrance Image with centered doorway */}
        <img
          src={SHOWROOM_INFO.entranceDoorsImage || SHOWROOM_INFO.exteriorImage}
          alt="Raheem Cloths Showroom Grand Entrance"
          className="w-full h-full object-cover object-center filter brightness-[1.03] contrast-[1.05]"
        />

        {/* ======================================================== */}
        {/* REAL 3D DOUBLE ENTRANCE DOORS PORTAL (Centered Aperture) */}
        {/* ======================================================== */}
        {p >= 0.05 && p <= 0.38 && (
          <div
            className="absolute"
            style={{
              left: '50%',
              top: '51%',
              width: '29.4%',
              height: '59.2%',
              transform: 'translate(-50%, -50%)',
              perspective: '1300px',
              perspectiveOrigin: '50% 50%'
            }}
          >
            {/* Cutout portal: Reveals the warm interior right behind the doors! */}
            <div className="absolute inset-0 overflow-visible">
              
              {/* --- LEFT DOOR WING --- */}
              <div
                className="absolute top-0 bottom-0 left-0 w-1/2"
                style={{
                  transformOrigin: 'left center',
                  transform: `rotateY(${leftDoorAngle}deg)`,
                  transition: 'transform 0.08s ease-out',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform'
                }}
              >
                {/* Door Glass Panel */}
                <div
                  className="w-full h-full border-y-[5px] border-l-[6px] border-r-[3px] border-[#d4af37] bg-gradient-to-r from-black/50 via-white/10 to-black/40 backdrop-blur-[2px] relative"
                  style={{
                    boxShadow: 'inset 0 0 25px rgba(212,175,55,0.25), -5px 15px 30px rgba(0,0,0,0.7)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 inset-x-0 h-7 bg-gradient-to-t from-[#996515] via-[#d4af37] to-[#f5e0aa] border-t border-[#f5e0aa]/60" />
                  <div
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-2 h-36 bg-gradient-to-r from-[#f5e0aa] via-[#d4af37] to-[#7a4e0c] rounded-full"
                    style={{
                      boxShadow: '2px 4px 10px rgba(0,0,0,0.8), inset 1px 1px 2px rgba(255,255,255,0.6)'
                    }}
                  />
                  <div className="absolute top-4 left-4 font-serif text-[10px] tracking-widest text-[#f5e0aa]/70 font-bold uppercase">
                    PULL
                  </div>
                </div>
              </div>

              {/* --- RIGHT DOOR WING --- */}
              <div
                className="absolute top-0 bottom-0 right-0 w-1/2"
                style={{
                  transformOrigin: 'right center',
                  transform: `rotateY(${rightDoorAngle}deg)`,
                  transition: 'transform 0.08s ease-out',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform'
                }}
              >
                <div
                  className="w-full h-full border-y-[5px] border-r-[6px] border-l-[3px] border-[#d4af37] bg-gradient-to-l from-black/50 via-white/10 to-black/40 backdrop-blur-[2px] relative"
                  style={{
                    boxShadow: 'inset 0 0 25px rgba(212,175,55,0.25), 5px 15px 30px rgba(0,0,0,0.7)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/15 to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 inset-x-0 h-7 bg-gradient-to-t from-[#996515] via-[#d4af37] to-[#f5e0aa] border-t border-[#f5e0aa]/60" />
                  <div
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-2 h-36 bg-gradient-to-r from-[#f5e0aa] via-[#d4af37] to-[#7a4e0c] rounded-full"
                    style={{
                      boxShadow: '-2px 4px 10px rgba(0,0,0,0.8), inset 1px 1px 2px rgba(255,255,255,0.6)'
                    }}
                  />
                  <div className="absolute top-4 right-4 font-serif text-[10px] tracking-widest text-[#f5e0aa]/70 font-bold uppercase">
                    PULL
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />
      </div>

      {/* ======================================================== */}
      {/* 3. REAL OPEN ALMIRA / WARDROBE CENTERPIECE LAYER */}
      {/* ======================================================== */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 flex items-center justify-center"
        style={{
          opacity: almiraOpacity,
          transform: `scale(${almiraScale}) translate3d(${mouseRef.current.x * -10}px, ${mouseRef.current.y * -8}px, 0)`,
          willChange: 'transform, opacity'
        }}
      >
        <div className="relative w-full h-full max-w-7xl max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl">
          <img
            src={SHOWROOM_INFO.almiraImage}
            alt="Real Luxury Dark Walnut Almira Wardrobe"
            className="w-full h-full object-cover object-center filter brightness-[1.08] contrast-[1.05] saturate-[0.88]"
          />

          {/* Clean white internal spotlight radiance from the wardrobe */}
          <div
            className="absolute inset-0 bg-radial from-white/28 via-white/8 to-black/50 pointer-events-none"
            style={{
              opacity: easeAlmira
            }}
          />
          {/* Top white LED lighting bar */}
          <div
            className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-white/22 via-white/5 to-transparent pointer-events-none"
            style={{
              opacity: easeAlmira
            }}
          />
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. REAL CLOTHING FLY-OUT SEQUENCE (EMERGING FROM ALMIRA) */}
      {/* ======================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {products.map((prod, idx) => {
          const gStart = productStart + idx * step;
          const gEnd = gStart + step;

          if (p < gStart - 0.03 || p > gEnd + 0.05) return null;

          const localT = Math.min(Math.max((p - gStart) / step, 0), 1);

          let posX = 0;
          let posY = 0;
          let posZ = 0;
          let scale = 1;
          let rotateY = 0;
          let rotateX = 0;
          let opacity = 1;

          const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
          const heroTargetX = isDesktop ? -24 : 0;

          if (localT < 0.30) {
            const inT = easeOutCubic(localT / 0.30);
            posX = THREE_lerp(0, heroTargetX, inT);
            posY = THREE_lerp(25, 0, inT);
            posZ = THREE_lerp(-350, 40, inT);
            scale = THREE_lerp(0.42, 1.02, inT);
            rotateY = THREE_lerp(20, -4, inT);
            opacity = inT;
          } else if (localT < 0.75) {
            const holdT = (localT - 0.30) / 0.45;
            const sway = Math.sin(holdT * Math.PI * 2) * 8;
            posX = heroTargetX + mouseRef.current.x * -18;
            posY = sway + mouseRef.current.y * -14;
            posZ = 40;
            scale = 1.02;
            rotateY = -4 + mouseRef.current.x * 12;
            rotateX = mouseRef.current.y * -8;
            opacity = 1;
          } else {
            const outT = easeInCubic((localT - 0.75) / 0.25);
            posX = THREE_lerp(heroTargetX, -110, outT);
            posY = THREE_lerp(0, -10, outT);
            posZ = THREE_lerp(40, -100, outT);
            scale = THREE_lerp(1.02, 0.75, outT);
            rotateY = THREE_lerp(-4, -28, outT);
            opacity = 1 - outT;
          }

          const activeColor = selectedColors?.[prod.id] || prod.colors[0];
          const isActive = idx === activeProductIndex;
          const currentRotY = rotateY + (isActive ? rotationY : 0);
          const currentRotX = rotateX + (isActive ? rotationX : 0);

          return (
            <div
              key={prod.id}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{
                perspective: '1400px'
              }}
            >
              <div
                className={`relative max-w-sm sm:max-w-md lg:max-w-lg transition-transform ${isDragging && isActive ? 'duration-0' : 'duration-75 ease-out'}`}
                style={{
                  transform: `translate3d(${posX}vw, ${posY}px, ${posZ}px) rotateY(${currentRotY}deg) rotateX(${currentRotX}deg) scale(${scale})`,
                  opacity,
                  transformStyle: 'preserve-3d',
                  willChange: 'transform, opacity'
                }}
              >
                {/* 360 Interactive Garment Wrapper (Zero Background - Pure Transparent Cutout) */}
                <div
                  className={`relative ${isActive && localT >= 0.20 && localT <= 0.88 ? 'pointer-events-auto cursor-grab active:cursor-grabbing' : 'pointer-events-none'} select-none`}
                  style={{
                    transformStyle: 'preserve-3d',
                    touchAction: 'none'
                  }}
                  onPointerDown={isActive ? handlePointerDown : undefined}
                  onPointerMove={isActive ? handlePointerMove : undefined}
                  onPointerUp={isActive ? handlePointerUp : undefined}
                  onPointerCancel={isActive ? handlePointerUp : undefined}
                >
                  {/* FRONT SIDE (Cutout Garment) */}
                  <div
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden'
                    }}
                    className="relative select-none pointer-events-none"
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      style={{
                        filter: activeColor?.filter || 'none',
                        transition: isDragging ? 'none' : 'filter 0.4s'
                      }}
                      className="w-full h-auto max-h-[72vh] object-contain select-none drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] drop-shadow-[0_0_35px_rgba(255,255,255,0.18)]"
                      draggable={false}
                    />
                  </div>

                  {/* BACK SIDE (Realistic 360 Tailored Back View) */}
                  <div
                    style={{
                      transform: 'rotateY(180deg)',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden'
                    }}
                    className="absolute inset-0 select-none pointer-events-none"
                  >
                    <img
                      src={prod.image}
                      alt={`${prod.name} Back View`}
                      style={{
                        transform: 'scaleX(-1)',
                        filter: `brightness(0.84) contrast(1.1) ${activeColor?.filter || ''}`,
                        transition: isDragging ? 'none' : 'filter 0.4s'
                      }}
                      className="w-full h-auto max-h-[72vh] object-contain select-none drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] drop-shadow-[0_0_35px_rgba(255,255,255,0.18)]"
                      draggable={false}
                    />
                    {/* Tailored Back Seam Line & Shading */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(90deg, transparent 48.5%, rgba(0,0,0,0.45) 50%, transparent 51.5%)',
                        maskImage: `url(${prod.image})`,
                        WebkitMaskImage: `url(${prod.image})`,
                        maskSize: 'contain',
                        WebkitMaskSize: 'contain',
                        maskRepeat: 'no-repeat',
                        WebkitMaskRepeat: 'no-repeat',
                        maskPosition: 'center',
                        WebkitMaskPosition: 'center'
                      }}
                    />
                  </div>

                  {/* Ambient Crisp White Floor Pedestal Glow */}
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-52 h-7 bg-white/20 blur-xl rounded-full pointer-events-none" />
                </div>

                {/* Floating 360 Interactive Drag Badge & Control */}
                {isActive && localT >= 0.22 && localT <= 0.85 && (
                  <div
                    className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-2.5 bg-black/85 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/25 text-white shadow-2xl pointer-events-auto select-none"
                    onPointerDown={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setAutoSpin((prev) => !prev);
                        sounds.playChime(587.33, 'sine', 0.12);
                      }}
                      className={`p-1 rounded-full transition-colors ${autoSpin ? 'bg-cyan-500/25 text-cyan-300' : 'text-neutral-300 hover:text-white'}`}
                      title={autoSpin ? "Pause 360° Auto Spin" : "Auto Spin 360°"}
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${autoSpin ? 'animate-spin' : ''}`} />
                    </button>
                    <div className="flex items-center gap-1.5 text-[10px] font-sans tracking-widest font-bold uppercase text-neutral-200">
                      <span>360° DRAG TO ROTATE</span>
                      <span className="font-mono text-cyan-300 bg-white/10 px-1.5 py-0.5 rounded">
                        {Math.round((((rotationY % 360) + 360) % 360))}°
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setRotationY(0);
                        setRotationX(0);
                        setAutoSpin(false);
                        sounds.playChime(523.25, 'sine', 0.1);
                      }}
                      className="text-[9px] font-mono uppercase text-neutral-400 hover:text-white px-1.5 py-0.5 rounded hover:bg-white/10 transition-colors"
                      title="Reset to Front"
                    >
                      RESET
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Global Cinematic Vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-black/10 to-black/60 pointer-events-none" />
    </div>
  );
}

// Math helpers
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}
function easeInCubic(t) {
  return t * t * t;
}
function THREE_lerp(a, b, t) {
  return a + (b - a) * t;
}
