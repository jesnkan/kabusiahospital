import React, { useState, useEffect } from 'react';

interface PreloaderProps {
  onLoaded?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [statusText, setStatusText] = useState('Initializing Healthcare Portal...');

  useEffect(() => {
    // Progress counter animation from 0 to 100
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = prev < 40 ? 15 : prev < 75 ? 8 : 12;
        const next = Math.min(100, prev + increment);

        if (next > 30 && next < 70) {
          setStatusText('Loading Clinical Services & Specialist Directory...');
        } else if (next >= 70 && next < 95) {
          setStatusText('Verifying Healthcare Accreditation...');
        } else if (next >= 95) {
          setStatusText('Welcome to K..A Busia Memorial Hospital');
        }

        return next;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setIsFadingOut(true);
        if (onLoaded) onLoaded();
        const removeTimer = setTimeout(() => {
          setIsDone(true);
        }, 700);
        return () => clearTimeout(removeTimer);
      }, 350);

      return () => clearTimeout(timer);
    }
  }, [progress, onLoaded]);

  if (isDone) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#032B27] via-[#05453E] to-[#075E54] text-white transition-all duration-700 ease-in-out ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#2F8F83]/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#D6A84F]/15 rounded-full blur-3xl animate-pulse pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md w-full">
        
        {/* Emblem & Animated Pulse Rings */}
        <div className="relative mb-8 flex items-center justify-center">
          {/* Subtle Outer Pulsing Wave Ring */}
          <div className="absolute -inset-4 rounded-full border border-[#D6A84F]/30 animate-ping opacity-30" />
          
          {/* Rotating Glowing Gradient Ring */}
          <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-[#D6A84F] via-[#2F8F83] to-[#075E54] p-[2px] animate-spin [animation-duration:8s]">
            <div className="w-full h-full bg-[#05453E] rounded-full" />
          </div>

          {/* Central Hospital Emblem */}
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#075E54] to-[#032B27] border-2 border-[#D6A84F] shadow-2xl flex items-center justify-center">
            <svg className="w-10 h-10 drop-shadow-md" viewBox="0 0 32 32" fill="none">
              <path
                d="M16 3L6 7v8c0 7 4.5 12.5 10 14 5.5-1.5 10-7 10-14V7l-10-4z"
                stroke="#D6A84F"
                strokeWidth="1.5"
                fill="#075E54"
              />
              <path d="M14 10h4v4h4v4h-4v4h-4v-4h-4v-4h4v-4z" fill="#FFFFFF" />
              <circle cx="16" cy="16" r="2.5" fill="#D6A84F" />
            </svg>
          </div>
        </div>

        {/* Hospital Branding */}
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight font-heading text-white drop-shadow-sm">
          K..A Busia Memorial Hospital
        </h2>
        <p className="text-xs uppercase tracking-widest text-[#D6A84F] font-semibold mt-1 mb-6">
          Excellence in Healthcare • Bogoso, Ghana
        </p>

        {/* Dynamic Animated Heartbeat / ECG Waveform */}
        <div className="w-full max-w-xs h-10 mb-5 relative flex items-center justify-center overflow-hidden">
          <svg
            className="w-full h-8"
            viewBox="0 0 300 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background static grid faint line */}
            <path
              d="M0 25 H300"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            {/* Luminous Animated ECG Waveform */}
            <path
              d="M0 25 L40 25 L55 25 L65 10 L75 42 L85 5 L95 35 L105 25 L160 25 L175 25 L185 8 L195 44 L205 2 L215 38 L225 25 L300 25"
              stroke="url(#ecgGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ecg-draw"
            />
            <defs>
              <linearGradient id="ecgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2F8F83" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#D6A84F" />
                <stop offset="100%" stopColor="#FFFFFF" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Slim Progress Bar */}
        <div className="w-full max-w-xs bg-black/40 rounded-full h-1.5 overflow-hidden p-[1px] border border-white/10 relative shadow-inner mb-3">
          <div
            className="h-full bg-gradient-to-r from-[#2F8F83] via-[#D6A84F] to-white rounded-full transition-all duration-200 ease-out shadow-sm"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress Percentage & Status Text */}
        <div className="flex items-center justify-between w-full max-w-xs text-[11px] text-[#E1EBE7]/80 font-mono">
          <span className="truncate pr-2 text-left text-xs font-sans text-[#E1EBE7]/90 font-medium">
            {statusText}
          </span>
          <span className="font-bold text-[#D6A84F] text-xs">
            {progress}%
          </span>
        </div>

      </div>
    </div>
  );
};
