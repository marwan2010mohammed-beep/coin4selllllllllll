import React from 'react';
import { Compass, Coins, Megaphone } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Discover & join',
      description:
        'Members browse the network and join communities that match their interests — entirely by choice.',
      icon: Compass,
    },
    {
      num: '02',
      title: 'Earn coins',
      description:
        'Every community you discover and join rewards you with coins. Or top up instantly from the store.',
      icon: Coins,
    },
    {
      num: '03',
      title: 'Promote your server',
      description:
        'Spend coins to feature your server in the network so more real people can find it and decide to join.',
      icon: Megaphone,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 px-4 sm:px-6 relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-14 sm:mb-16">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-sky-400 uppercase">
            HOW IT WORKS
          </span>
          <ScrollReveal
            highlightColor={null}
            mode="scrub"
            splitBy="words"
            effect="fade"
            stagger={0.05}
            duration={0.8}
            smoothing={0}
            baseOpacity={0.6}
            baseRotation={0}
            baseOffset={0}
            enableBlur={false}
            blurStrength={0}
            as="h2"
            containerClassName="mt-3"
            textClassName="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white tracking-tight leading-tight"
          >
            A transparent, three-step exchange
          </ScrollReveal>
          <p className="mt-5 text-slate-300 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl mx-auto">
            Put your server in front of real people who are actively looking for new communities.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const delayClass = i === 0 ? '' : i === 1 ? 'reveal-delay-150' : 'reveal-delay-300';
            return (
              <div
                key={step.num}
                className={`reveal-on-scroll ${delayClass} group relative p-7 rounded-2xl bg-[#090d19] border border-slate-800/80 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between`}
              >
                <div>
                  {/* Top row with icon and big index */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-xl bg-sky-950/50 border border-sky-500/20 flex items-center justify-center text-sky-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-4xl sm:text-5xl font-extrabold text-slate-700/60 select-none tracking-tight font-mono">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Footnote */}
        <div className="reveal-on-scroll reveal-delay-150 mt-12 text-center flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
          <span>Connect with Discord — we never see your password.</span>
        </div>
      </div>
    </section>
  );
};
