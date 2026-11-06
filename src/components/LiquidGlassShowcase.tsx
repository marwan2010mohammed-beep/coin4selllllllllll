import React, { useRef, useState } from 'react';
import { RotateCcw, Sparkles } from 'lucide-react';
import { LiquidGlassLogo, LiquidGlassLogoHandle } from './liquid-glass-logo';

export const LiquidGlassShowcase: React.FC = () => {
  const logoRef = useRef<LiquidGlassLogoHandle>(null);
  const [replayKey, setReplayKey] = useState(0);

  const handleReplay = () => {
    if (logoRef.current) {
      logoRef.current.replay();
    } else {
      setReplayKey((k) => k + 1);
    }
  };

  return (
    <section
      id="liquid-glass-showcase"
      className="py-16 sm:py-20 px-4 sm:px-6 relative bg-black border-y border-slate-900 overflow-hidden"
    >
      {/* Subtle background ambient radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse,rgba(56,189,248,0.12)_0%,transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-sky-400 uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ReactDrops Component · Liquid Glass Logo</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Brand Identity Physics
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Sphere-to-tile glass entrance, wavelength-based bevel refraction, and chromatic edge streaks.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleReplay}
              type="button"
              className="cursor-pointer px-4 py-2 rounded-xl bg-[#0c1424] hover:bg-[#142038] border border-sky-500/30 hover:border-sky-500/60 text-sky-300 hover:text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(56,189,248,0.2)] active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay Fluid Simulation</span>
            </button>
          </div>
        </div>

        {/* Liquid Glass Logo Canvas Container */}
        <div className="relative rounded-3xl border border-slate-800/90 bg-black overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          <LiquidGlassLogo
            key={replayKey}
            ref={logoRef}
            logo="/joins-logo.svg"
            ending="logo"
            theme="light"
            dropStrength={1.6}
            decay={2.4}
            speed={1.3}
            style={{ height: 480 }}
          />

          {/* Bottom subtle status label */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-slate-400/80 pointer-events-none font-mono">
            <span>coin4sell Vector Mark</span>
            <span>Wavelength Dispersion 1.0 · Decay 2.4s</span>
          </div>
        </div>
      </div>
    </section>
  );
};
