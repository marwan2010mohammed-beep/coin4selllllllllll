import React from 'react';
import StatsCounter from './StatsCounter';
import { Users, Smile, ThumbsUp, ShieldCheck } from 'lucide-react';

export const ProofBar: React.FC = () => {
  const stats = [
    {
      num: 99.4,
      suffix: '%',
      label: 'Active Users Growth',
      icon: Users,
    },
    {
      num: 98.8,
      suffix: '%',
      label: 'User Satisfaction',
      icon: Smile,
    },
    {
      num: 99.9,
      suffix: '%',
      label: 'Server Recommendations',
      icon: ThumbsUp,
    },
    {
      num: 100,
      suffix: '%',
      label: 'Real, Verified Members',
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="py-14 sm:py-20 border-y border-sky-900/40 bg-gradient-to-b from-[#060913]/80 via-[#030712]/90 to-[#060913]/80 relative overflow-hidden">
      {/* Subtle blue accent glow behind proof bar */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(2,132,199,0.12)_0%,transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            const delayClass = i === 0 ? '' : i === 1 ? 'reveal-delay-75' : i === 2 ? 'reveal-delay-150' : 'reveal-delay-225';
            return (
              <div
                key={stat.label}
                className={`reveal-on-scroll ${delayClass} p-6 rounded-2xl bg-[#080e1d]/90 border border-sky-500/30 hover:border-sky-400/60 shadow-[0_0_25px_rgba(2,132,199,0.15)] hover:shadow-[0_0_35px_rgba(2,132,199,0.3)] transition-all duration-300 flex flex-col items-center text-center group`}
              >
                <div className="w-12 h-12 rounded-xl bg-sky-950/60 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(56,189,248,0.2)]">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#38bdf8] tracking-tight tabular-nums drop-shadow-[0_0_15px_rgba(56,189,248,0.35)]">
                  <StatsCounter value={stat.num} decimals={stat.num % 1 !== 0 ? 1 : 0} suffix={stat.suffix} />
                </div>

                <p className="mt-2 text-xs sm:text-sm text-slate-300 font-medium">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProofBar;
