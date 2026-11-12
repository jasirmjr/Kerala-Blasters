import React from 'react';
import { motion } from 'framer-motion';
import { X, Heart, TreePine, Droplets, Trophy, Users } from 'lucide-react';

interface YellowHeartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const YellowHeartModal: React.FC<YellowHeartModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-3xl my-8 bg-kbfc-dark/95 border border-kbfc-yellow/30 rounded-2xl shadow-2xl overflow-hidden glass-panel max-h-[85vh] flex flex-col"
      >
        <div className="relative bg-gradient-to-r from-amber-600 via-kbfc-blue to-kbfc-dark p-6 border-b border-kbfc-yellow/20 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-kbfc-yellow/20 text-kbfc-yellow border border-kbfc-yellow/40">
              <Heart className="w-6 h-6 text-kbfc-yellow fill-kbfc-yellow" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-kbfc-yellow font-bold">
                CSR & Social Responsibility
              </span>
              <h2 className="text-xl md:text-2xl font-black text-white font-display">
                The Yellow Heart Initiative
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

        <div className="p-6 md:p-8 space-y-6 overflow-y-auto flex-1 text-slate-300 text-sm">
          <div className="relative aspect-[16/8] rounded-xl overflow-hidden border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80"
              alt="Yellow Heart Community"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-kbfc-dark via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-xs font-bold text-kbfc-yellow uppercase tracking-widest">
                Our Community Vow
              </span>
              <h3 className="text-xl font-black text-white font-display">
                Football with a Purpose, Giving Back to God's Own Country
              </h3>
            </div>
          </div>

          <p className="leading-relaxed">
            The Yellow Heart is Kerala Blasters FC's dedicated social impact foundation. We believe a football club is only as strong as the community it represents. From flood relief mobilization to building eco-friendly turf facilities for underprivileged kids, our mission is to empower Kerala through football.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start space-x-3">
              <TreePine className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-white text-sm mb-1">Green Goal Kerala</h4>
                <p className="text-xs text-slate-400">
                  For every goal scored at Kaloor stadium, the club plants 100 indigenous trees across Kerala's ecologically sensitive Western Ghats.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start space-x-3">
              <Droplets className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-white text-sm mb-1">Clean Coast Clean Kerala</h4>
                <p className="text-xs text-slate-400">
                  Annual coastal and waterway cleanup drives removing over 10 tonnes of plastic waste annually with Manjappada volunteers.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start space-x-3">
              <Trophy className="w-5 h-5 text-kbfc-yellow flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-white text-sm mb-1">Football for All</h4>
                <p className="text-xs text-slate-400">
                  Free weekly training camps and athletic nutrition assistance for differently-abled athletes and tribal youth communities.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start space-x-3">
              <Users className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-white text-sm mb-1">Rapid Disaster Support</h4>
                <p className="text-xs text-slate-400">
                  Emergency relief funds and food distribution networks activated in tandem with local district administrations during monsoon emergencies.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-kbfc-yellow/10 border border-kbfc-yellow/30 text-center">
            <p className="text-xs text-slate-200 mb-2">
              Want to volunteer or partner with The Yellow Heart Foundation?
            </p>
            <a
              href="mailto:community@keralablastersfc.in"
              className="inline-block px-5 py-2 rounded-lg bg-kbfc-yellow text-kbfc-dark font-extrabold text-xs uppercase tracking-wider hover:brightness-110"
            >
              Get Involved
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
