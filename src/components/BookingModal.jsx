import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle2, Sparkles, User, Phone, Mail } from 'lucide-react';
import { SHOWROOM_INFO } from '../data/products';
import { sounds } from '../utils/soundEffects';

export default function BookingModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Bespoke Wedding & Sherwani Fitting',
    date: '2026-10-15',
    time: '12:00 PM',
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    sounds.playChime(783.99, 'triangle', 0.4);
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#0e0e13] border border-[#d4af37]/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center mx-auto text-[#f5e0aa]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl text-white">VIP Appointment Scheduled</h3>
            <p className="text-xs text-neutral-300 max-w-sm mx-auto leading-relaxed">
              We look forward to welcoming you at our Delhi Flagship Atelier. Our senior master tailor has reserved private salon suite 02 for your session.
            </p>
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-left text-xs space-y-2">
              <div className="flex items-center gap-2 text-[#f5e0aa]">
                <Calendar className="w-4 h-4 text-[#d4af37]" />
                <span>{formData.date} at {formData.time}</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-300">
                <MapPin className="w-4 h-4 text-[#d4af37]" />
                <span>{SHOWROOM_INFO.address}</span>
              </div>
            </div>
            <button
              onClick={() => {
                setIsSubmitted(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 rounded-full bg-[#d4af37] text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#f5e0aa]"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <span className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase">
                PRIVATE SALON SUITE RESERVATION
              </span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-white leading-tight">
              Book A Personal Showroom Fitting
            </h3>
            <p className="text-xs text-neutral-400">
              Meet our master cutters and stylists in private fitting salons with beverage service.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-3" />
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Kabir Mehra"
                    className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-3" />
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 00000"
                    className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-neutral-400 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-3" />
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="client@domain.com"
                  className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-neutral-400 mb-1">Consultation Category</label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-3 py-2 bg-[#14141a] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#d4af37]"
              >
                <option>Bespoke Wedding &amp; Sherwani Fitting</option>
                <option>Italian Wool Tuxedo &amp; Black Tie Tailoring</option>
                <option>Handloom Linen &amp; Festive Kurta Styling</option>
                <option>Doorstep White-Glove VIP Trial</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">Preferred Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>
              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">Preferred Slot</label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-3 py-2 bg-[#14141a] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#d4af37]"
                >
                  <option>11:30 AM (Morning)</option>
                  <option>02:30 PM (Afternoon)</option>
                  <option>05:30 PM (Evening)</option>
                  <option>07:30 PM (Night Salon)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b38328] hover:from-[#f5e0aa] hover:to-[#d4af37] text-black font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl shadow-[#d4af37]/20 transition-all hover:scale-[1.01]"
            >
              <Calendar className="w-4 h-4" /> Confirm Appointment Reservation
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
