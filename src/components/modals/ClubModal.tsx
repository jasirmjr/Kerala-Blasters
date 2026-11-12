import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Trophy, Users, Shield, Award, Star } from 'lucide-react';
import { fetchSquad } from '../../services/api';
import { SquadMember } from '../../types';

interface ClubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClubModal: React.FC<ClubModalProps> = ({ isOpen, onClose }) => {
  const [squad, setSquad] = useState<SquadMember[]>([]);
  const [filterPosition, setFilterPosition] = useState('All');
  const [activeTab, setActiveTab] = useState<'squad' | 'heritage' | 'honors'>('squad');

  useEffect(() => {
    if (isOpen) {
      fetchSquad().then(setSquad);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredSquad = squad.filter((m) =>
    filterPosition === 'All' ? true : m.position === filterPosition
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-4xl my-8 bg-kbfc-dark/95 border border-kbfc-yellow/30 rounded-2xl shadow-2xl overflow-hidden glass-panel flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-kbfc-blue via-kbfc-dark to-kbfc-blue p-6 border-b border-kbfc-yellow/20 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-kbfc-yellow/20 text-kbfc-yellow border border-kbfc-yellow/40 flex items-center justify-center font-black text-xl">
              🐘
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-kbfc-yellow font-bold">
                Club Information & Heritage
              </span>
              <h2 className="text-xl md:text-2xl font-black text-white font-display">
                Kerala Blasters Football Club
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

        {/* Tab switcher */}
        <div className="flex border-b border-white/10 px-6 pt-3 space-x-2 bg-black/30 flex-shrink-0">
          {[
            { id: 'squad', label: 'First Team Squad', icon: Users },
            { id: 'heritage', label: 'Club Heritage & Identity', icon: Shield },
            { id: 'honors', label: 'Honors & Records', icon: Trophy },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2.5 text-xs md:text-sm font-bold border-b-2 transition-all ${
                  isActive
                    ? 'border-kbfc-yellow text-kbfc-yellow bg-kbfc-yellow/10'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'squad' && (
            <div>
              {/* Position Filter Pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {['All', 'Forward', 'Midfielder', 'Defender', 'Goalkeeper'].map((pos) => (
                  <button
                    key={pos}
                    onClick={() => setFilterPosition(pos)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                      filterPosition === pos
                        ? 'bg-kbfc-yellow text-kbfc-dark'
                        : 'bg-white/5 text-slate-300 hover:bg-white/15'
                    }`}
                  >
                    {pos}
                  </button>
                ))}
              </div>

              {/* Player Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {filteredSquad.map((player) => (
                  <div
                    key={player.id}
                    className="group bg-gradient-to-b from-slate-900 to-kbfc-dark border border-white/10 hover:border-kbfc-yellow/50 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-slate-800">
                      <img
                        src={player.image}
                        alt={player.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2 flex items-center space-x-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-xs font-bold text-white">
                        <span>{player.flag}</span>
                        <span className="text-kbfc-yellow font-black">#{player.number}</span>
                      </div>
                      {player.isCaptain && (
                        <div className="absolute top-2 right-2 bg-gradient-to-r from-kbfc-yellow to-kbfc-gold text-kbfc-dark font-black text-[10px] px-2 py-0.5 rounded-full shadow-md">
                          CAPTAIN
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-kbfc-dark via-transparent to-transparent opacity-90" />
                      <div className="absolute bottom-2 left-3 right-3">
                        <span className="text-[10px] font-bold text-kbfc-yellow uppercase tracking-wider">
                          {player.position}
                        </span>
                        <h4 className="font-display font-black text-white text-base leading-tight">
                          {player.name}
                        </h4>
                      </div>
                    </div>

                    <div className="p-3 bg-black/40 border-t border-white/5 grid grid-cols-3 text-center text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Caps</span>
                        <strong className="text-white font-mono">{player.appearances}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Goals</span>
                        <strong className="text-kbfc-yellow font-mono">{player.goals}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Assists</span>
                        <strong className="text-slate-200 font-mono">{player.assists}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'heritage' && (
            <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
              <div className="p-6 rounded-2xl bg-kbfc-blue/30 border border-kbfc-yellow/30 relative overflow-hidden">
                <div className="max-w-xl">
                  <span className="text-kbfc-yellow text-xs font-extrabold uppercase tracking-widest">
                    Established May 2014 • Kochi, Kerala
                  </span>
                  <h3 className="text-2xl font-black text-white font-display mt-1 mb-3">
                    The Soul of God’s Own Country
                  </h3>
                  <p className="text-slate-200 text-sm">
                    Kerala Blasters Football Club represents the deep-rooted passion for football in Kerala. Named as a tribute to Kerala’s legendary sporting spirit and the iconic Sachin Tendulkar’s nickname "Master Blaster", the club has evolved into South Asia's most vocal and loyal football community.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="font-bold text-white mb-2 text-base flex items-center">
                    <span className="text-kbfc-yellow mr-2">🐘</span> The Elephant Crest
                  </h4>
                  <p className="text-xs text-slate-400">
                    The elephant represents Kerala’s state animal, symbolising strength, nobility, and pride, anchored by traditional yellow and navy tones.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="font-bold text-white mb-2 text-base flex items-center">
                    <span className="text-kbfc-yellow mr-2">💛</span> Manjappada
                  </h4>
                  <p className="text-xs text-slate-400">
                    The Yellow Army is celebrated globally as one of football’s most fervent fan communities, turning Kaloor stadium into a cauldron of noise.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="font-bold text-white mb-2 text-base flex items-center">
                    <span className="text-kbfc-yellow mr-2">🏟️</span> Kaloor Fortress
                  </h4>
                  <p className="text-xs text-slate-400">
                    The Jawaharlal Nehru Stadium in Kochi stands as our sanctuary, regularly witnessing 40,000+ passionate supporters singing in unison.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'honors' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'Indian Super League Finalists', years: '2014, 2016, 2021-22', badge: 'Silverware Contenders' },
                { title: 'ISL Fan Club of the Year', years: '2017, 2019, 2020, 2023', badge: 'Manjappada' },
                { title: 'Durand Cup Semifinalists', years: '2021, 2023', badge: 'Historic Cup' },
                { title: 'Highest Average Attendance in South Asia', years: 'Consecutive Seasons', badge: 'Record Crowds' },
              ].map((item, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-white/5 border border-white/10 flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-kbfc-yellow/15 text-kbfc-yellow border border-kbfc-yellow/30">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-white/10 text-kbfc-yellow">
                      {item.badge}
                    </span>
                    <h4 className="font-bold text-white text-base mt-1">{item.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{item.years}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
