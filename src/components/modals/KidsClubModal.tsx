import React from 'react';
import { motion } from 'framer-motion';
import { X, Smile, Gift, Sparkles, Star, Heart } from 'lucide-react';

interface KidsClubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KidsClubModal: React.FC<KidsClubModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-3xl my-8 bg-gradient-to-b from-kbfc-blue/95 via-kbfc-dark/95 to-kbfc-dark/95 border-2 border-kbfc-yellow/50 rounded-3xl shadow-2xl overflow-hidden glass-panel max-h-[85vh] flex flex-col"
      >
        <div className="relative bg-gradient-to-r from-amber-500 via-kbfc-yellow to-yellow-400 p-6 text-kbfc-dark flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center text-2xl">
              🐘
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-widest font-black text-kbfc-dark/80">
                Official Junior Membership
              </span>
              <h2 className="text-xl md:text-2xl font-black font-display tracking-tight text-kbfc-dark">
                KBFC Kids Club (KBFCLSI)
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-kbfc-dark/80 hover:text-kbfc-dark hover:bg-black/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-6 overflow-y-auto flex-1 text-slate-200">
          <div className="text-center max-w-md mx-auto space-y-2">
            <span className="text-xs font-bold text-kbfc-yellow uppercase tracking-widest">
              Ages 4 to 14 • Future Champions
            </span>
            <h3 className="text-2xl font-black text-white font-display">
              Igniting the Yellow Passion in the Next Generation!
            </h3>
            <p className="text-xs text-slate-300">
              The official junior club created to inspire young boys and girls across Kerala with football, fitness, teamwork, and unforgettable matchday memories.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-kbfc-yellow/40 transition-colors">
              <Gift className="w-6 h-6 text-kbfc-yellow mb-2" />
              <h4 className="font-bold text-white text-sm mb-1">Junior Welcome Pack</h4>
              <p className="text-xs text-slate-400">
                Official junior kit bag, signed mascot poster, wristband, and personalized membership badge.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-kbfc-yellow/40 transition-colors">
              <Sparkles className="w-6 h-6 text-kbfc-yellow mb-2" />
              <h4 className="font-bold text-white text-sm mb-1">Matchday Mascot Walkout</h4>
              <p className="text-xs text-slate-400">
                Lucky draw entry to walk out onto the Kaloor pitch holding hands with First Team stars.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-kbfc-yellow/40 transition-colors">
              <Star className="w-6 h-6 text-kbfc-yellow mb-2" />
              <h4 className="font-bold text-white text-sm mb-1">Free Soccer Clinics</h4>
              <p className="text-xs text-slate-400">
                Quarterly coaching masterclasses hosted by Young Blasters certified trainers.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-r from-kbfc-yellow/20 to-amber-500/10 border border-kbfc-yellow/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-white text-base">Annual Junior Membership</h4>
              <p className="text-xs text-slate-300">₹999 / year • Includes Welcome Kit & Match Passes</p>
            </div>
            <button
              onClick={() => {
                alert('Junior Membership enrollment opens on the 1st of every month!');
                onClose();
              }}
              className="px-6 py-3 bg-kbfc-yellow text-kbfc-dark font-black text-sm rounded-xl hover:brightness-110 shadow-lg shadow-kbfc-yellow/20 font-display flex-shrink-0"
            >
              Enroll Junior Blaster
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
