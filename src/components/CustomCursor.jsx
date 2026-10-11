import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);

      const target = e.target;
      const isInteractive = target && (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button'
      );
      setHovered(Boolean(isInteractive));
    };

    const onMouseLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-50">
      {/* Central gold dot */}
      <div
        className="fixed w-2 h-2 rounded-full bg-[#d4af37] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      />
      {/* Outer follower ring */}
      <div
        className={`fixed rounded-full border border-[#d4af37]/60 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out ${
          hovered ? 'w-10 h-10 bg-[#d4af37]/10 border-[#f5e0aa]' : 'w-7 h-7'
        }`}
        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      />
    </div>
  );
}
