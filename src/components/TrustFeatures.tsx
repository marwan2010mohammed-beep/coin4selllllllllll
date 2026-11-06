import React from 'react';
import { UserCheck, ShieldCheck, CreditCard, Globe, Cpu, Scale } from 'lucide-react';

export const TrustFeatures: React.FC = () => {
  const features = [
    {
      icon: UserCheck,
      title: 'Real, opt-in members',
      description: 'Every member chooses which servers to join. No bots, no fake accounts — ever.',
    },
    {
      icon: ShieldCheck,
      title: 'Secure by design',
      description: 'We sign you in with official Discord OAuth2 and never see or store your password.',
    },
    {
      icon: CreditCard,
      title: 'Safe payments',
      description: 'Coin top-ups are processed by Stripe. We never store your card details.',
    },
    {
      icon: Globe,
      title: 'Smart targeting',
      description: 'Reach the right audience with language targeting and an optional alt-account filter.',
    },
    {
      icon: Cpu,
      title: 'Anti-abuse engine',
      description: 'Membership is verified and rewards are protected, so growth stays genuine.',
    },
    {
      icon: Scale,
      title: 'Fair & transparent',
      description: 'Clear pricing, clear terms, and human support whenever you need it.',
    },
  ];

  return (
    <section id="features" className="py-20 sm:py-28 px-4 sm:px-6 relative border-t border-slate-900/80">
      <div id="about" className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="reveal-on-scroll text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-sky-400 uppercase">
            Built on trust
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            What you can count on, every time
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            A growth network engineered to be safe, genuine, and effective.
          </p>
        </div>

        {/* 2x3 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            const delays = ['', 'reveal-delay-75', 'reveal-delay-150', 'reveal-delay-225', 'reveal-delay-300', 'reveal-delay-375'];
            return (
              <div
                key={feat.title}
                className={`reveal-on-scroll ${delays[i % delays.length]} p-6 sm:p-7 rounded-2xl bg-[#080d19] border border-slate-800/80 hover:border-slate-700 transition-all duration-300`}
              >
                <div className="w-10 h-10 rounded-xl bg-sky-950/40 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-5">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
