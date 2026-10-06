import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, Heart } from 'lucide-react';

interface PreloaderProps {
  onLoaded?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [statusText, setStatusText] = useState('Initializing Clinical Systems...');

  useEffect(() => {
    // Ultra-smooth 60fps-style eased progress increment
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }

        // Natural medical boot progression with organic easing
        let increment = 1;
        if (prev < 25) {
          increment = Math.floor(Math.random() * 3) + 2; // 2-4%
        } else if (prev < 65) {
          increment = Math.floor(Math.random() * 2) + 1; // 1-2%
        } else if (prev < 90) {
          increment = Math.floor(Math.random() * 3) + 2; // 2-4%
        } else {
          increment = 1; // gentle finish
        }

        const next = Math.min(100, prev + increment);

        if (next < 32) {
          setStatusText('Initializing Clinical Systems & Telemetry...');
        } else if (next < 68) {
          setStatusText('Synchronizing Outpatient & Emergency Registry...');
        } else if (next < 92) {
          setStatusText('Verifying Ghana Health Service & HeFRA Accreditation...');
        } else {
          setStatusText('Welcome to K.A. Busia Memorial Hospital');
        }

        return next;
      });
    }, 38);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setIsFadingOut(true);
        if (onLoaded) onLoaded();
        const removeTimer = setTimeout(() => {
          setIsDone(true);
        }, 650);
        return () => clearTimeout(removeTimer);
      }, 350);

      return () => clearTimeout(timer);
    }
  }, [progress, onLoaded]);

  if (isDone) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#032B27] text-white transition-all duration-700 ease-in-out ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Subtle Medical Telemetry Grid */}
      <div className="absolute inset-0 medical-grid-bg opacity-70 pointer-events-none" />

      {/* Radial Depth Spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(7,94,84,0.45)_0%,rgba(5,69,62,0.85)_55%,#032B27_100%)] pointer-events-none" />

      {/* Ambient Pulsing Glow Halos */}
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#2F8F83]/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/3 right-1/3 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-[#D6A84F]/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-sm sm:max-w-md w-full">
        
        {/* Telemetry Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#D6A84F] tracking-widest uppercase mb-6 shadow-sm backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>VITAL TELEMETRY • LEAD II • 72 BPM</span>
        </div>

        {/* Central Emblem with Organic Heartbeat Pulse & Radar Rings */}
        <div className="relative mb-6 flex items-center justify-center">
          {/* Concentric Expanding Wave Rings */}
          <div className="absolute -inset-5 rounded-3xl border border-[#D6A84F]/40 animate-radar-1 pointer-events-none" />
          <div className="absolute -inset-10 rounded-3xl border border-[#2F8F83]/30 animate-radar-2 pointer-events-none" />

          {/* Golden Ambient Glow Backing */}
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#D6A84F]/30 via-[#2F8F83]/40 to-[#075E54] blur-md" />

          {/* Hospital Logo Emblem Badge with Authentic Heartbeat Rhythm */}
          <div className="relative w-24 h-24 rounded-3xl bg-white p-3.5 border-2 border-[#D6A84F] shadow-2xl flex items-center justify-center animate-heartbeat">
            <img 
              src="/images/logo-mark.png" 
              alt="K.A. Busia Memorial Hospital Emblem" 
              className="w-full h-full object-contain filter drop-shadow-sm"
            />
          </div>
        </div>

        {/* Hospital Typography & Wordmark */}
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight font-heading text-white drop-shadow-sm">
          K.A. Busia Memorial Hospital
        </h2>
        <div className="flex items-center justify-center gap-2 text-[11px] uppercase tracking-widest text-[#D6A84F] font-semibold mt-1 mb-5">
          <span>Bogoso, Western Region</span>
          <span className="text-white/40">•</span>
          <span className="text-[#8CE3D7] flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#D6A84F]" />
            MDC & HeFRA Certified
          </span>
        </div>

        {/* Dynamic ECG Cardiac Telemetry Display */}
        <div className="w-full max-w-xs h-11 mb-4 relative flex items-center justify-center bg-black/35 rounded-xl border border-white/10 p-2 overflow-hidden shadow-inner backdrop-blur-md">
          <svg
            className="w-full h-full"
            viewBox="0 0 320 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background Medical Telemetry Grid Marks */}
            <path
              d="M0 20 H320"
              stroke="rgba(47, 143, 131, 0.2)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            
            {/* Luminous High-Precision ECG Cardiogram */}
            <path
              d="M0 20 L45 20 L55 20 L62 14 L68 25 L74 20 L85 20 L94 4 L104 36 L112 10 L118 24 L126 20 L165 20 L175 20 L182 14 L188 25 L194 20 L205 20 L214 4 L224 36 L232 10 L238 24 L246 20 L320 20"
              stroke="url(#ecgGradientEnhanced)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ecg-draw"
            />

            <defs>
              <linearGradient id="ecgGradientEnhanced" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2F8F83" stopOpacity="0.2" />
                <stop offset="60%" stopColor="#8CE3D7" />
                <stop offset="85%" stopColor="#D6A84F" />
                <stop offset="100%" stopColor="#FFFFFF" />
              </linearGradient>
            </defs>
          </svg>

          {/* Cardiac Pulse Heart Icon Accent */}
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/80 animate-ping opacity-75" />
          </div>
        </div>

        {/* Liquid Shimmer Progress Meter */}
        <div className="w-full max-w-xs bg-black/50 rounded-full h-2 overflow-hidden p-[1px] border border-white/15 relative shadow-inner mb-3">
          {/* Progress Fill */}
          <div
            className="h-full bg-gradient-to-r from-[#0C776B] via-[#2F8F83] to-[#D6A84F] rounded-full transition-all duration-100 ease-out relative overflow-hidden shadow-sm"
            style={{ width: `${progress}%` }}
          >
            {/* Traveling Light Shimmer Wave */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer-slide pointer-events-none" />
          </div>
        </div>

        {/* Progress Metrics & Status Badge */}
        <div className="flex items-center justify-between w-full max-w-xs text-[11px] text-[#E1EBE7]">
          <div className="flex items-center gap-1.5 truncate pr-2 text-left text-xs font-sans text-[#E1EBE7]/90 font-medium">
            <Activity className="w-3.5 h-3.5 text-[#D6A84F] flex-shrink-0 animate-pulse" />
            <span className="truncate">{statusText}</span>
          </div>
          <span className="font-mono font-bold text-[#D6A84F] text-xs flex-shrink-0 bg-white/10 px-2 py-0.5 rounded border border-white/10">
            {progress}%
          </span>
        </div>

      </div>
    </div>
  );
};
