import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Users2, Send, CheckCircle2, MessageSquare, ShieldAlert } from 'lucide-react';

interface FanAdvisoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FanAdvisoryModal: React.FC<FanAdvisoryModalProps> = ({ isOpen, onClose }) => {
  const [feedback, setFeedback] = useState('');
  const [category, setCategory] = useState('Matchday Experience');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    setSubmitted(true);
  };

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
              <Users2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-kbfc-yellow font-bold">
                Direct Fan Democracy
              </span>
              <h2 className="text-xl md:text-2xl font-black text-white font-display">
                Fan Advisory Board (FAB)
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
          <div className="p-4 rounded-xl bg-kbfc-yellow/10 border border-kbfc-yellow/30">
            <h3 className="font-bold text-white text-base mb-1">
              Your Voice Shapes Kerala Blasters
            </h3>
            <p className="text-xs text-slate-300">
              The Kerala Blasters Fan Advisory Board is an independent elected consultative body ensuring supporter interests are embedded at the boardroom level — covering ticketing fairness, stadium amenities, heritage preservation, and environmental policies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <h4 className="font-bold text-white text-sm mb-1">Quarterly Meetings</h4>
              <p className="text-xs text-slate-400">
                Direct structured dialogue between fan representatives and club executive leadership.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <h4 className="font-bold text-white text-sm mb-1">Charter Transparency</h4>
              <p className="text-xs text-slate-400">
                Published meeting minutes, policy revisions, and matchday accessibility audits.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <h4 className="font-bold text-white text-sm mb-1">Supporter Welfare</h4>
              <p className="text-xs text-slate-400">
                Dedicated liaison officers for away traveling supporters and disabled fan access.
              </p>
            </div>
          </div>

          {/* Direct feedback submit */}
          <div className="p-5 rounded-2xl bg-black/40 border border-white/10">
            <h4 className="font-bold text-white text-base mb-3 flex items-center">
              <MessageSquare className="w-4 h-4 mr-2 text-kbfc-yellow" />
              Submit an Issue or Suggestion to the Board
            </h4>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/20 text-white text-xs outline-none"
                    >
                      <option>Matchday Experience</option>
                      <option>Ticketing & Pricing</option>
                      <option>Stadium Accessibility</option>
                      <option>Community & Green Initiatives</option>
                      <option>Away Fan Travel</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Your Detailed Proposal</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Share your thoughts for the next Fan Advisory Board agenda..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/20 text-white text-xs outline-none focus:border-kbfc-yellow"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-kbfc-yellow text-kbfc-dark font-extrabold text-xs flex items-center space-x-2 hover:brightness-110 transition-all font-display"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send to Advisory Council</span>
                </button>
              </form>
            ) : (
              <div className="py-4 flex items-center space-x-3 text-emerald-400">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                <span className="text-xs">
                  Thank you! Your submission has been logged into the FAB agenda review queue.
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
