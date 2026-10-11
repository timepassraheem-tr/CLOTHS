import React, { useState } from 'react';
import { ShoppingBag, Volume2, VolumeX, Menu, X, Sparkles, MapPin, Calendar, Play, Pause, Zap, ShieldCheck } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function Navigation({
  cartCount,
  onOpenCart,
  onOpenBooking,
  scrollProgress,
  onNavigateSection,
  isAutoScrolling,
  onToggleAutoScroll,
  scrollSpeedMultiplier = 2,
  onCycleSpeed,
  isAdmin = false,
  onOpenAdminLogin,
  onOpenAdminDashboard
}) {
  const [audioActive, setAudioActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const active = sounds.toggle();
    setAudioActive(active);
  };

  const isPastEntrance = scrollProgress > 0.3;

  const getSpeedLabel = (mult) => {
    if (mult === 1) return '1X Normal';
    if (mult === 2) return '2X Fast';
    if (mult === 3) return '3X Turbo';
    return '4X Ultra';
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-6 lg:px-12 py-4 flex items-center justify-between ${
          isPastEntrance
            ? 'bg-[#0a0a0c]/85 backdrop-blur-md border-b border-[#d4af37]/20 shadow-2xl'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent'
        }`}
      >
        {/* Brand Logo */}
        <div
          onClick={() => onNavigateSection(0)}
          className="cursor-pointer group flex items-center gap-3"
        >
          <div className="w-9 h-9 rounded-full border border-[#d4af37]/60 flex items-center justify-center bg-[#15151b] group-hover:border-[#d4af37] transition-colors shadow-lg shadow-[#d4af37]/10">
            <span className="font-serif text-[#d4af37] font-bold text-sm tracking-widest">R</span>
          </div>
          <div>
            <h1 className="font-serif tracking-[0.22em] text-sm md:text-base font-bold text-[#f5e0aa] group-hover:text-white transition-colors uppercase">
              RAHEEM CLOTHS SHOWROOM
            </h1>
            <p className="text-[9px] tracking-[0.25em] text-[#d4af37]/80 uppercase font-sans">
              Haute Couture • New Delhi Flagship
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-medium tracking-[0.18em] text-[#cfcbd5]">
          <button
            onClick={() => onNavigateSection(0)}
            className="hover:text-[#f5e0aa] transition-colors uppercase py-1"
          >
            Entrance
          </button>
          <button
            onClick={() => onNavigateSection(0.58)}
            className="hover:text-[#f5e0aa] transition-colors uppercase py-1 flex items-center gap-1.5"
          >
            <Sparkles className="w-3 h-3 text-[#d4af37]" />
            The Almira
          </button>
          <button
            onClick={() => onNavigateSection(0.66)}
            className="hover:text-[#f5e0aa] transition-colors uppercase py-1"
          >
            3D Garments
          </button>
          <button
            onClick={() => onNavigateSection(1.0)}
            className="hover:text-[#f5e0aa] transition-colors uppercase py-1"
          >
            Full Collection
          </button>
          <button
            onClick={onOpenBooking}
            className="hover:text-[#f5e0aa] transition-colors uppercase py-1 flex items-center gap-1"
          >
            <Calendar className="w-3 h-3 text-[#d4af37]" />
            VIP Fitting
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* CINEMATIC AUTO-SCROLL TOUR WITH INTEGRATED SPEED CHIP */}
          <div className="flex items-center rounded-full border border-[#d4af37]/45 bg-black/60 overflow-hidden shadow-lg shadow-black/50">
            <button
              onClick={onToggleAutoScroll}
              className={`px-3 py-1.5 text-xs font-medium tracking-wider flex items-center gap-1.5 transition-all ${
                isAutoScrolling
                  ? 'bg-gradient-to-r from-[#f5e0aa] to-[#d4af37] text-black font-bold'
                  : 'hover:bg-[#181822] text-[#f5e0aa]'
              }`}
              title={isAutoScrolling ? "Pause Cinematic Auto Tour" : "Start Fast Cinematic Auto Tour"}
            >
              {isAutoScrolling ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-black text-black" />
                  <span className="hidden sm:inline text-[10px] font-bold tracking-widest uppercase">PAUSE</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-[#d4af37] text-[#d4af37]" />
                  <span className="hidden sm:inline text-[10px] font-bold tracking-widest uppercase">AUTO TOUR</span>
                </>
              )}
            </button>

            {/* Speed Multiplier Pill */}
            <button
              onClick={onCycleSpeed}
              className={`px-2.5 py-1.5 border-l border-[#d4af37]/35 text-[10px] font-mono font-bold tracking-wider transition-colors flex items-center gap-1 ${
                isAutoScrolling
                  ? 'bg-black/40 text-[#f5e0aa] hover:bg-black/60'
                  : 'text-[#d4af37] hover:bg-white/10'
              }`}
              title={`Auto-scroll speed: ${getSpeedLabel(scrollSpeedMultiplier)}. Click to switch speed!`}
            >
              <Zap className="w-2.5 h-2.5 text-[#d4af37]" />
              <span>{scrollSpeedMultiplier}X</span>
            </button>
          </div>

          {/* Audio Ambience Toggle */}
          <button
            onClick={toggleSound}
            title={audioActive ? "Mute showroom audio" : "Turn on showroom audio"}
            className="w-9 h-9 rounded-full border border-white/10 hover:border-[#d4af37]/60 flex items-center justify-center text-neutral-300 hover:text-[#d4af37] transition-all bg-black/40 hover:bg-[#181820]"
          >
            {audioActive ? <Volume2 className="w-4 h-4 text-[#d4af37]" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Admin Login / Dashboard Trigger Button */}
          {isAdmin ? (
            <button
              onClick={onOpenAdminDashboard}
              className="px-2.5 sm:px-3 py-1.5 rounded-full border border-[#d4af37] bg-gradient-to-r from-[#d4af37]/25 to-[#f5e0aa]/20 hover:from-[#d4af37]/40 hover:to-[#f5e0aa]/30 text-[#f5e0aa] text-xs font-mono font-bold tracking-wider transition-all shadow-lg shadow-[#d4af37]/20 flex items-center gap-1.5"
              title="Open Admin Dashboard & Inventory CRUD"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="hidden sm:inline">Admin Portal</span>
            </button>
          ) : (
            <button
              onClick={onOpenAdminLogin}
              className="px-2.5 sm:px-3 py-1.5 rounded-full border border-[#d4af37]/40 hover:border-[#d4af37] bg-black/50 hover:bg-[#1a1a24] text-[#f5e0aa] hover:text-white text-xs font-mono tracking-wider transition-all shadow-md flex items-center gap-1.5 group"
              title="Login as Administrator (CRUD Operations)"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37] group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-[11px] hidden sm:inline">Login as Admin</span>
              <span className="font-semibold text-[11px] sm:hidden">Admin</span>
            </button>
          )}

          {/* Cart Icon */}
          <button
            onClick={onOpenCart}
            className="relative px-3.5 py-1.5 rounded-full border border-[#d4af37]/40 hover:border-[#d4af37] flex items-center gap-2 bg-[#121217] hover:bg-[#1c1c24] text-[#f5e0aa] transition-all shadow-md group"
          >
            <ShoppingBag className="w-4 h-4 text-[#d4af37] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold tracking-wider hidden sm:inline">BAG</span>
            <span className="w-5 h-5 rounded-full bg-[#d4af37] text-black text-[11px] font-bold flex items-center justify-center">
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-neutral-300"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-[#0c0c10]/95 backdrop-blur-xl pt-24 px-8 flex flex-col gap-5 text-sm tracking-widest uppercase">
          {/* Mobile Auto Tour Trigger & Speed Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onToggleAutoScroll();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-3 px-4 rounded-xl border border-[#d4af37] bg-[#d4af37]/15 text-[#f5e0aa] font-semibold flex items-center justify-center gap-2"
            >
              {isAutoScrolling ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-[#d4af37]" />}
              {isAutoScrolling ? 'Pause Auto Tour' : 'Start Auto Tour'}
            </button>
            <button
              onClick={onCycleSpeed}
              className="py-3 px-4 rounded-xl border border-[#d4af37]/50 bg-black/60 text-[#f5e0aa] font-mono text-xs font-bold"
            >
              {scrollSpeedMultiplier}X
            </button>
          </div>

          <button
            onClick={() => { onNavigateSection(0); setMobileMenuOpen(false); }}
            className="text-left py-3 border-b border-white/10 text-[#f5e0aa]"
          >
            Showroom Entrance
          </button>
          <button
            onClick={() => { onNavigateSection(0.58); setMobileMenuOpen(false); }}
            className="text-left py-3 border-b border-white/10 text-neutral-200"
          >
            The Almira Cabinet
          </button>
          <button
            onClick={() => { onNavigateSection(0.66); setMobileMenuOpen(false); }}
            className="text-left py-3 border-b border-white/10 text-neutral-200"
          >
            3D Garment Reveal
          </button>
          <button
            onClick={() => { onNavigateSection(1.0); setMobileMenuOpen(false); }}
            className="text-left py-3 border-b border-white/10 text-neutral-200"
          >
            Full Boutique Catalog
          </button>
          <button
            onClick={() => { onOpenBooking(); setMobileMenuOpen(false); }}
            className="text-left py-3 border-b border-white/10 text-[#d4af37] font-semibold"
          >
            Book VIP Showroom Trial
          </button>
          <button
            onClick={() => {
              if (isAdmin) onOpenAdminDashboard();
              else onOpenAdminLogin();
              setMobileMenuOpen(false);
            }}
            className="text-left py-3 border-b border-white/10 text-[#f5e0aa] flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
              {isAdmin ? 'Admin Portal & Inventory CRUD' : 'Login as Admin'}
            </span>
            {isAdmin && <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/40">ONLINE</span>}
          </button>
          <div className="pt-6 text-xs normal-case text-neutral-400">
            <p className="flex items-center gap-2 mb-1">
              <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
              Civil Lines, New Delhi
            </p>
            <p className="text-[11px] text-neutral-500">Concierge: +91 98765 43210</p>
          </div>
        </div>
      )}
    </>
  );
}
