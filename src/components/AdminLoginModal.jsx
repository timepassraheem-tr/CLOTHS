import React, { useState } from 'react';
import { X, Lock, Mail, ShieldCheck, AlertCircle, Eye, EyeOff, Sparkles, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccessAnim, setLoginSuccessAnim] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const trimmedEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    // Required Admin credentials:
    // gmail id: mohdabduleaheem@gmail (also accept with .com if typed)
    const validEmails = ['mohdabduleaheem@gmail', 'mohdabduleaheem@gmail.com'];
    const validPassword = '12Raheem123';

    setIsLoading(true);

    setTimeout(() => {
      if (validEmails.includes(trimmedEmail) && cleanPassword === validPassword) {
        sounds.playChime(880, 'sine', 0.25);
        setLoginSuccessAnim(true);
        setTimeout(() => {
          setIsLoading(false);
          setLoginSuccessAnim(false);
          onLoginSuccess({
            email: 'mohdabduleaheem@gmail',
            name: 'Mohd Abdul Raheem (Administrator)',
            role: 'Head of Haute Couture Operations'
          });
          onClose();
        }, 800);
      } else {
        setIsLoading(false);
        sounds.playChime(220, 'sawtooth', 0.25);
        if (!validEmails.includes(trimmedEmail)) {
          setError('Invalid Admin Gmail ID. Access restricted to authorized administrator.');
        } else {
          setError('Incorrect Admin Password. Please verify your credentials.');
        }
      }
    }, 450);
  };

  const handleFillDemo = () => {
    setEmail('mohdabduleaheem@gmail');
    setPassword('12Raheem123');
    setError('');
    sounds.playChime(659.25, 'sine', 0.12);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#0e0e13] border border-[#d4af37]/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/90 overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#d4af37]/15 blur-3xl rounded-full pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:border-white/30 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Insignia */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto mb-3 rounded-full border border-[#d4af37]/50 bg-[#15151c] flex items-center justify-center shadow-lg shadow-[#d4af37]/10">
            <ShieldCheck className="w-7 h-7 text-[#d4af37]" />
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-[#f5e0aa] uppercase">
            ADMIN PORTAL
          </h2>
          <p className="text-xs text-[#cfcbd5]/70 tracking-wider font-sans mt-1">
            Raheem Cloths Showroom Management
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/40 border border-red-500/40 flex items-start gap-2.5 text-xs text-red-200 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Success message */}
        {loginSuccessAnim && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-center gap-2.5 text-xs text-emerald-200 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Authentication verified. Opening Admin Portal...</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-mono tracking-widest uppercase text-neutral-300 mb-1.5">
              Admin Gmail ID
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#d4af37]/60" />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mohdabduleaheem@gmail"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-black/60 border border-white/15 focus:border-[#d4af37] rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono tracking-widest uppercase text-neutral-300 mb-1.5">
              Admin Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#d4af37]/60" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full pl-10 pr-10 py-2.5 bg-black/60 border border-white/15 focus:border-[#d4af37] rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Quick Auto-Fill Authorized Credentials Helper */}
          <div className="pt-1 flex items-center justify-between text-[11px]">
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-[#d4af37] hover:text-[#f5e0aa] transition-colors flex items-center gap-1 font-mono"
            >
              <Sparkles className="w-3 h-3" />
              Auto-fill Admin Credentials
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading || loginSuccessAnim}
            className={`w-full py-3 rounded-xl font-serif text-xs tracking-[0.2em] uppercase font-bold transition-all shadow-lg mt-2 flex items-center justify-center gap-2 ${
              isLoading || loginSuccessAnim
                ? 'bg-[#d4af37]/50 text-black cursor-wait'
                : 'bg-gradient-to-r from-[#f5e0aa] via-[#d4af37] to-[#aa801e] hover:brightness-110 text-black shadow-[#d4af37]/20 active:scale-[0.99]'
            }`}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span>AUTHENTICATE & ENTER</span>
              </>
            )}
          </button>
        </form>

        {/* Footer Security Badge */}
        <div className="mt-6 pt-4 border-t border-white/10 text-center">
          <p className="text-[10px] text-neutral-400 font-mono tracking-wider">
            🔒 SECURE 256-BIT ENCRYPTED RAHEEM ADMIN ACCESS
          </p>
        </div>
      </div>
    </div>
  );
}
