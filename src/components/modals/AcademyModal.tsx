import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Award, CheckCircle, MapPin, User, Calendar, Phone, Mail } from 'lucide-react';
import { registerAcademyApi } from '../../services/api';

interface AcademyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DISTRICTS = [
  'Ernakulam (Kochi)',
  'Thiruvananthapuram',
  'Kozhikode',
  'Malappuram',
  'Thrissur',
  'Kannur',
  'Kottayam',
  'Palakkad',
  'Kollam',
  'Alappuzha',
  'Wayanad',
  'Kasaragod',
  'Idukki',
  'Pathanamthitta',
];

export const AcademyModal: React.FC<AcademyModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    studentName: '',
    dob: '',
    guardianName: '',
    phone: '',
    email: '',
    district: DISTRICTS[0],
    preferredCenter: 'Kochi - Regional High Performance Center',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<any | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await registerAcademyApi(formData);
      setSuccess(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccess(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl my-8 bg-kbfc-dark/95 border border-kbfc-yellow/30 rounded-2xl shadow-2xl overflow-hidden glass-panel"
      >
        <div className="relative bg-gradient-to-r from-kbfc-blue via-kbfc-dark to-kbfc-blue p-6 border-b border-kbfc-yellow/20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-kbfc-yellow/20 text-kbfc-yellow border border-kbfc-yellow/40">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-kbfc-yellow font-bold">
                Sport Hood Academy Pathway
              </span>
              <h2 className="text-xl md:text-2xl font-black text-white font-display">
                Young Blasters Trial Registration
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

        <div className="p-6 md:p-8 max-h-[80vh] overflow-y-auto">
          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm text-slate-300">
                Join the state-of-the-art youth development program designed by UEFA and AFC certified coaches. Ages 6 to 18 eligible for regional scouting trials.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Student / Player Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Candidate name"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-white/20 text-white text-sm focus:border-kbfc-yellow outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-white/20 text-white text-sm focus:border-kbfc-yellow outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Parent / Guardian Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Parent's name"
                    value={formData.guardianName}
                    onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-white/20 text-white text-sm focus:border-kbfc-yellow outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-white/20 text-white text-sm focus:border-kbfc-yellow outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="contact@family.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-white/20 text-white text-sm focus:border-kbfc-yellow outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Home District *
                  </label>
                  <select
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-white/20 text-white text-sm focus:border-kbfc-yellow outline-none"
                  >
                    {DISTRICTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 mt-4 bg-gradient-to-r from-kbfc-yellow to-kbfc-gold text-kbfc-dark font-display font-extrabold text-base rounded-xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-kbfc-dark border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>Submit Trial Application</span>
                )}
              </button>
            </form>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-white font-display">Application Received!</h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                {success.message}
              </p>
              <div className="p-3 bg-black/40 rounded-xl border border-white/10 max-w-xs mx-auto">
                <span className="text-xs text-slate-400 block">Application Code</span>
                <strong className="text-kbfc-yellow font-mono text-base">{success.applicationId}</strong>
              </div>
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl bg-kbfc-yellow text-kbfc-dark font-extrabold text-sm hover:brightness-110"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
