import React from 'react';
import { motion } from 'framer-motion';
import { X, Building2, Coffee, Sparkles, MapPin, Compass } from 'lucide-react';

interface HouseOfKbfcModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HouseOfKbfcModal: React.FC<HouseOfKbfcModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-3xl my-8 bg-kbfc-dark/95 border border-kbfc-yellow/30 rounded-2xl shadow-2xl overflow-hidden glass-panel max-h-[85vh] flex flex-col"
      >
        <div className="relative bg-gradient-to-r from-kbfc-blue via-kbfc-dark to-kbfc-blue p-6 border-b border-kbfc-yellow/20 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-kbfc-yellow/20 text-kbfc-yellow border border-kbfc-yellow/40">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-kbfc-yellow font-bold">
                Official Lifestyle & Fan Hub
              </span>
              <h2 className="text-xl md:text-2xl font-black text-white font-display">
                House of KBFC
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

        <div className="p-6 md:p-8 space-y-6 overflow-y-auto flex-1">
          <div className="relative aspect-[16/8] rounded-xl overflow-hidden border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=80"
              alt="House of KBFC"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-kbfc-dark via-kbfc-dark/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-xs font-bold text-kbfc-yellow uppercase tracking-widest">
                Kochi • Marine Drive Flagship
              </span>
              <h3 className="text-xl font-black text-white font-display">
                Where Football Meets Lifestyle & Community
              </h3>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            <strong>House of KBFC</strong> is the club's permanent cultural haven — an experiential club house blending a matchday sports lounge, interactive VR penalty simulator, trophy gallery, artisanal Kerala specialty coffee bar, and an exclusive merchandise flagship store.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <Coffee className="w-5 h-5 text-kbfc-yellow mb-2" />
              <h4 className="font-bold text-white text-sm mb-1">Matchday Café & Lounge</h4>
              <p className="text-xs text-slate-400">
                Screening away fixtures on stadium-scale LED screens with artisan bites and mocktails.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <Sparkles className="w-5 h-5 text-kbfc-yellow mb-2" />
              <h4 className="font-bold text-white text-sm mb-1">Interactive VR & Museum</h4>
              <p className="text-xs text-slate-400">
                Experience walking through the Kaloor tunnel and test your reaction time against simulated ISL shots.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <Compass className="w-5 h-5 text-kbfc-yellow mb-2" />
              <h4 className="font-bold text-white text-sm mb-1">Fan Meet & Greets</h4>
              <p className="text-xs text-slate-400">
                Exclusive signing sessions with first-team players and club legends.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-kbfc-yellow/10 border border-kbfc-yellow/30 flex items-center justify-between">
            <div className="flex items-center space-x-3 text-xs text-slate-200">
              <MapPin className="w-5 h-5 text-kbfc-yellow flex-shrink-0" />
              <span>Marine Drive Promenade, Ernakulam, Kochi. Open Daily 10 AM – 10 PM.</span>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-kbfc-yellow text-kbfc-dark text-xs font-bold rounded-lg hover:brightness-110 flex-shrink-0"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
