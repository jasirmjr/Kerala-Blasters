import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  toggleAudio: () => void;
  volume: number;
  setVolume: (vol: number) => void;
}

const StadiumAudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const playStadiumBeat = (ctx: AudioContext, masterGain: GainNode) => {
    const now = ctx.currentTime;

    // Rhythmic Stadium Drum Kick (boom boom - boom boom boom)
    const playKick = (time: number, freq: number = 75) => {
      const osc = ctx.createOscillator();
      const kickGain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);
      osc.frequency.exponentialRampToValueAtTime(30, time + 0.25);

      kickGain.gain.setValueAtTime(0.7, time);
      kickGain.gain.exponentialRampToValueAtTime(0.001, time + 0.28);

      osc.connect(kickGain);
      kickGain.connect(masterGain);

      osc.start(time);
      osc.stop(time + 0.3);
    };

    // Stadium Crowd Noise / Roar burst
    const playCrowdCheer = (time: number, duration: number = 0.5) => {
      const bufferSize = ctx.sampleRate * duration;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(420, time);
      filter.Q.setValueAtTime(3, time);

      const cheerGain = ctx.createGain();
      cheerGain.gain.setValueAtTime(0.01, time);
      cheerGain.gain.linearRampToValueAtTime(0.25, time + duration * 0.3);
      cheerGain.gain.exponentialRampToValueAtTime(0.001, time + duration);

      noise.connect(filter);
      filter.connect(cheerGain);
      cheerGain.connect(masterGain);

      noise.start(time);
      noise.stop(time + duration);
    };

    // Crowd Chanting melodic drone chord ("Yennum Yellow / Olé")
    const playChantHarmonic = (time: number, freq: number, duration: number = 0.4) => {
      const osc = ctx.createOscillator();
      const chantGain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, time);

      chantGain.gain.setValueAtTime(0.001, time);
      chantGain.gain.linearRampToValueAtTime(0.12, time + 0.1);
      chantGain.gain.exponentialRampToValueAtTime(0.001, time + duration);

      osc.connect(chantGain);
      chantGain.connect(masterGain);

      osc.start(time);
      osc.stop(time + duration);
    };

    // 4-beat chant pattern
    // Beat 1: Drum + crowd roar
    playKick(now, 85);
    playCrowdCheer(now, 0.4);
    playChantHarmonic(now, 220, 0.35); // A3

    // Beat 2: Drum
    playKick(now + 0.4, 80);
    playCrowdCheer(now + 0.4, 0.35);
    playChantHarmonic(now + 0.4, 261.63, 0.35); // C4

    // Beat 3: Double quick drum
    playKick(now + 0.8, 85);
    playKick(now + 1.05, 85);
    playCrowdCheer(now + 0.8, 0.5);
    playChantHarmonic(now + 0.8, 329.63, 0.4); // E4
    playChantHarmonic(now + 1.05, 293.66, 0.35); // D4

    // Beat 4: Big chorus cheer
    playKick(now + 1.35, 90);
    playCrowdCheer(now + 1.35, 0.8);
    playChantHarmonic(now + 1.35, 220, 0.6); // A3
  };

  const toggleAudio = () => {
    if (isPlaying) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsPlaying(false);
    } else {
      try {
        if (!audioCtxRef.current) {
          const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          audioCtxRef.current = new AudioContextClass();
        }

        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }

        if (!gainNodeRef.current) {
          gainNodeRef.current = audioCtxRef.current.createGain();
          gainNodeRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
          gainNodeRef.current.connect(audioCtxRef.current.destination);
        }

        // Play immediate
        playStadiumBeat(audioCtxRef.current, gainNodeRef.current);

        // Loop every 2.2 seconds
        intervalRef.current = window.setInterval(() => {
          if (audioCtxRef.current && gainNodeRef.current) {
            playStadiumBeat(audioCtxRef.current, gainNodeRef.current);
          }
        }, 2200);

        setIsPlaying(true);
      } catch (err) {
        console.error('Audio start error:', err);
      }
    }
  };

  const handleSetVolume = (vol: number) => {
    setVolume(vol);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(vol, audioCtxRef.current.currentTime);
    }
  };

  return (
    <StadiumAudioContext.Provider
      value={{
        isPlaying,
        toggleAudio,
        volume,
        setVolume: handleSetVolume,
      }}
    >
      {children}
    </StadiumAudioContext.Provider>
  );
};

export const useStadiumAudio = () => {
  const context = useContext(StadiumAudioContext);
  if (!context) {
    throw new Error('useStadiumAudio must be used within an AudioProvider');
  }
  return context;
};
