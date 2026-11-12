import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Ticket, ShieldCheck, CheckCircle2, QrCode, Download } from 'lucide-react';
import confetti from 'canvas-confetti';
import { bookTicketApi } from '../../services/api';
import { MatchItem } from '../../types';

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMatch?: MatchItem;
}

const STANDS = [
  {
    id: 'manjappada-east-lower',
    name: 'East Lower (Manjappada Yellow Sea)',
    price: 350,
    desc: 'Heart of the atmosphere. Standing & chanting all 90 minutes.',
    badge: 'High Energy',
    color: 'from-amber-500/30 to-yellow-500/10 border-kbfc-yellow/60',
  },
  {
    id: 'west-executive',
    name: 'West Grandstand (Executive Tier)',
    price: 650,
    desc: 'Prime halfway line elevated tactical view with cushioned seating.',
    badge: 'Best View',
    color: 'from-blue-600/30 to-slate-900/60 border-blue-500/40',
  },
  {
    id: 'east-upper',
    name: 'East Upper Tier',
    price: 250,
    desc: 'Panoramic stadium overview, family-friendly atmosphere.',
    badge: 'Popular',
    color: 'from-slate-700/40 to-slate-900/60 border-slate-700',
  },
  {
    id: 'vip-hospitality',
    name: 'VIP Yellow Club Hospitality Lounge',
    price: 1800,
    desc: 'Air-conditioned lounge, complimentary buffet & priority gate access.',
    badge: 'VIP Elite',
    color: 'from-amber-400/40 to-kbfc-gold/20 border-kbfc-gold',
  },
];

export const TicketModal: React.FC<TicketModalProps> = ({ isOpen, onClose, selectedMatch }) => {
  const [selectedStand, setSelectedStand] = useState(STANDS[0].id);
  const [quantity, setQuantity] = useState(2);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<any | null>(null);

  if (!isOpen) return null;

  const currentStand = STANDS.find((s) => s.id === selectedStand) || STANDS[0];
  const totalPrice = currentStand.price * quantity;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    setLoading(true);
    try {
      const res = await bookTicketApi({
        matchId: selectedMatch?.id || 'match-next',
        stand: currentStand.name,
        quantity,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      });

      setBookingSuccess(res);
      // Trigger confetti celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD100', '#0C2340', '#FFFFFF', '#E5A800'],
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setBookingSuccess(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-3xl my-8 bg-kbfc-dark/95 border border-kbfc-yellow/30 rounded-2xl shadow-2xl overflow-hidden glass-panel"
      >
        {/* Header Ribbon */}
        <div className="relative bg-gradient-to-r from-kbfc-blue via-kbfc-dark to-kbfc-blue p-6 border-b border-kbfc-yellow/20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-kbfc-yellow/20 text-kbfc-yellow border border-kbfc-yellow/40">
              <Ticket className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-kbfc-yellow font-bold">
                Official Matchday Pass
              </span>
              <h2 className="text-xl md:text-2xl font-black text-white font-display">
                Book Match Tickets
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 md:p-8 max-h-[80vh] overflow-y-auto">
          {!bookingSuccess ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Left Column: Match Details & Stand Selection */}
              <div className="md:col-span-7 space-y-6">
                {/* Match Banner Card */}
                <div className="p-4 rounded-xl bg-kbfc-blue/40 border border-kbfc-yellow/20 flex flex-col space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-kbfc-yellow text-kbfc-dark">
                      ISL 2025/26
                    </span>
                    <span className="text-xs text-slate-300 flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1 text-kbfc-yellow" />
                      Sun, 15 Nov 2026 • 7:30 PM
                    </span>
                  </div>
                  <div className="flex items-center justify-around py-2 border-y border-white/10 text-center">
                    <div className="font-bold text-white text-lg">
                      <div className="text-2xl">🐘</div>
                      KBFC
                    </div>
                    <div className="text-kbfc-yellow font-extrabold text-sm px-3 py-1 rounded bg-black/40">
                      VS
                    </div>
                    <div className="font-bold text-white text-lg">
                      <div className="text-2xl">🦁</div>
                      BFC
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-slate-300">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-kbfc-yellow flex-shrink-0" />
                    Jawaharlal Nehru Stadium, Kaloor, Kochi
                  </div>
                </div>

                {/* Stand Picker */}
                <div>
                  <label className="block text-sm font-bold text-slate-200 mb-3 uppercase tracking-wider">
                    Select Stadium Stand
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {STANDS.map((stand) => {
                      const isSelected = selectedStand === stand.id;
                      return (
                        <div
                          key={stand.id}
                          onClick={() => setSelectedStand(stand.id)}
                          className={`p-3.5 rounded-xl cursor-pointer border transition-all relative overflow-hidden ${
                            isSelected
                              ? 'bg-kbfc-yellow/15 border-kbfc-yellow shadow-[0_0_15px_rgba(255,209,0,0.25)]'
                              : 'bg-white/5 border-white/10 hover:border-white/30'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white/10 text-kbfc-yellow">
                              {stand.badge}
                            </span>
                            <span className="font-black text-white text-base">
                              ₹{stand.price}
                            </span>
                          </div>
                          <h4 className="font-bold text-sm text-white">{stand.name}</h4>
                          <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                            {stand.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-bold text-slate-200 mb-2 uppercase tracking-wider">
                    Number of Seats
                  </label>
                  <div className="flex items-center space-x-3">
                    {[1, 2, 4, 6].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setQuantity(num)}
                        className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                          quantity === num
                            ? 'bg-kbfc-yellow text-kbfc-dark font-extrabold shadow-md'
                            : 'bg-white/10 text-slate-300 hover:bg-white/20'
                        }`}
                      >
                        {num} {num === 1 ? 'Seat' : 'Seats'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Checkout Form & Summary */}
              <div className="md:col-span-5 bg-black/40 p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-display font-bold text-lg text-white border-b border-white/10 pb-3 flex items-center">
                    <ShieldCheck className="w-5 h-5 mr-2 text-kbfc-yellow" />
                    Fan Information
                  </h3>

                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Varma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg bg-slate-900/90 border border-white/20 text-white text-sm focus:outline-none focus:border-kbfc-yellow transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg bg-slate-900/90 border border-white/20 text-white text-sm focus:outline-none focus:border-kbfc-yellow transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">
                      Mobile Number (WhatsApp Pass) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg bg-slate-900/90 border border-white/20 text-white text-sm focus:outline-none focus:border-kbfc-yellow transition-colors"
                    />
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="pt-3 border-t border-white/10 space-y-1.5 text-xs text-slate-300">
                    <div className="flex justify-between">
                      <span>Rate per seat</span>
                      <span>₹{currentStand.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quantity</span>
                      <span>× {quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Convenience & GST</span>
                      <span className="text-emerald-400">Included</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-white/10 text-base font-extrabold text-white">
                      <span>Total Amount</span>
                      <span className="text-kbfc-yellow font-display text-lg">
                        ₹{totalPrice}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-4 py-3.5 bg-gradient-to-r from-kbfc-yellow to-kbfc-gold text-kbfc-dark font-display font-extrabold text-base rounded-xl hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-kbfc-yellow/20 flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-kbfc-dark border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Ticket className="w-5 h-5" />
                        <span>Confirm & Get Match Pass</span>
                      </>
                    )}
                  </button>
                </form>

                <p className="text-[10px] text-center text-slate-400 mt-4">
                  Official ticketing partner for Kerala Blasters FC. E-Ticket QR will be sent via SMS & Email.
                </p>
              </div>
            </div>
          ) : (
            /* Booking Confirmation & E-Ticket Pass */
            <div className="py-6 flex flex-col items-center text-center max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h3 className="text-2xl font-black text-white font-display mb-1">
                You're Heading to Kaloor!
              </h3>
              <p className="text-sm text-slate-300 mb-6">
                Booking Reference:{' '}
                <span className="font-mono font-bold text-kbfc-yellow">
                  {bookingSuccess.bookingReference}
                </span>
              </p>

              {/* Digital Match Pass Badge */}
              <div className="w-full bg-gradient-to-b from-kbfc-blue to-kbfc-dark p-6 rounded-2xl border-2 border-kbfc-yellow/40 shadow-2xl relative overflow-hidden mb-6 text-left">
                <div className="absolute top-0 right-0 w-32 h-32 bg-kbfc-yellow/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-4">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-kbfc-yellow">
                      MATCHDAY E-PASS
                    </span>
                    <h4 className="text-lg font-black text-white">KBFC vs Bengaluru FC</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-300">Gate</span>
                    <p className="font-black text-white text-base">
                      {bookingSuccess.details?.gate || 'Gate 3'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs mb-4">
                  <div>
                    <span className="text-slate-400 block">Supporter</span>
                    <strong className="text-white text-sm">{bookingSuccess.details?.name}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Stand / Sector</span>
                    <strong className="text-kbfc-yellow text-sm">{bookingSuccess.details?.stand}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Seats</span>
                    <strong className="text-white text-sm">{bookingSuccess.details?.quantity} Tickets</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Kickoff</span>
                    <strong className="text-white text-sm">Sun 15 Nov, 7:30 PM</strong>
                  </div>
                </div>

                <div className="p-3 bg-black/60 rounded-xl border border-white/10 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <QrCode className="w-10 h-10 text-white" />
                    <span className="text-[10px] font-mono text-slate-400">
                      SCAN AT TURNSTILE <br />
                      VALID FOR GATE ENTRY
                    </span>
                  </div>
                  <span className="text-xs font-bold text-kbfc-yellow px-2 py-1 rounded bg-kbfc-yellow/10 border border-kbfc-yellow/30">
                    VERIFIED
                  </span>
                </div>
              </div>

              <div className="flex space-x-3 w-full">
                <button
                  onClick={handleReset}
                  className="flex-1 py-3 rounded-xl bg-kbfc-yellow text-kbfc-dark font-extrabold text-sm hover:brightness-110 transition-all font-display"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
