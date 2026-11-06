import React, { useState, useMemo } from 'react';
import { Check, ArrowRight, Sparkles, Tag } from 'lucide-react';
import { GoldCoinIcon } from './Icons';
import { PricingPlansComponent } from './PricingPlansComponent';

interface PricingCalculatorProps {
  onStartFree: () => void;
  onBuyCoins: (coins: number, price: number) => void;
}

const PRESETS = [
  { coins: 500, label: '500' },
  { coins: 5000, label: '5,000' },
  { coins: 15000, label: '15,000' },
  { coins: 40000, label: '40,000' },
  { coins: 100000, label: '100,000' },
];

const DISCOUNT_TIERS = [
  { threshold: 1000, discount: 0.07, label: '-7%' },
  { threshold: 5000, discount: 0.15, label: '-15%' },
  { threshold: 15000, discount: 0.25, label: '-25%' },
  { threshold: 40000, discount: 0.36, label: '-36%' },
  { threshold: 75000, discount: 0.47, label: '-47%' },
  { threshold: 100000, discount: 0.57, label: '-57%' },
];

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({
  onStartFree,
  onBuyCoins,
}) => {
  const [coins, setCoins] = useState<number>(1000);

  // Pricing math: base is $0.01995/coin ($19.95 per 1,000 coins)
  const baseRatePerCoin = 0.01995;

  const { discountPct, discountAmount, totalPrice, nextTier } = useMemo(() => {
    let discount = 0;
    let next = null;

    if (coins >= 100000) {
      discount = 0.57;
    } else if (coins >= 75000) {
      discount = 0.47;
      next = { coins: 100000, discount: '57%' };
    } else if (coins >= 40000) {
      discount = 0.36;
      next = { coins: 75000, discount: '47%' };
    } else if (coins >= 15000) {
      discount = 0.25;
      next = { coins: 40000, discount: '36%' };
    } else if (coins >= 5000) {
      discount = 0.15;
      next = { coins: 15000, discount: '25%' };
    } else if (coins >= 1000) {
      discount = 0.07;
      next = { coins: 5000, discount: '15%' };
    } else {
      next = { coins: 1000, discount: '7%' };
    }

    const rawTotal = coins * baseRatePerCoin;
    const discAmount = rawTotal * discount;
    const finalPrice = rawTotal - discAmount;

    return {
      discountPct: Math.round(discount * 100),
      discountAmount: discAmount,
      totalPrice: finalPrice,
      nextTier: next,
    };
  }, [coins]);

  const freeFeatures = [
    'Discover & join communities',
    'Earn coins for every join',
    'Daily rewards & streaks',
    'Referral bonuses',
    'Promote with earned coins',
  ];

  return (
    <section id="pricing" className="py-20 sm:py-28 px-4 sm:px-6 relative border-t border-slate-900/80">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="reveal-on-scroll text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-sky-400 uppercase">
            Pricing
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Free to start. Top up when you want to move faster.
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Earn coins for free by discovering communities — or buy exactly what you need. Larger
            amounts unlock automatic volume discounts. No subscriptions.
          </p>
        </div>

        <div className="space-y-6">
          {/* Card 1: FREE FOREVER */}
          <div className="reveal-on-scroll reveal-delay-75 p-7 sm:p-8 rounded-2xl bg-[#090e1b] border border-slate-800/80 hover:border-slate-700/80 transition-all duration-300">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Free Forever</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-6">
              <span className="text-4xl sm:text-5xl font-black text-white tabular-nums tracking-tight">
                $0
              </span>
              <span className="text-slate-400 text-sm">
                Earn coins by discovering servers
              </span>
            </div>

            <ul className="space-y-2.5 mb-8">
              {freeFeatures.map((feat) => (
                <li key={feat} className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={onStartFree}
              type="button"
              className="cursor-pointer w-full py-3.5 rounded-xl bg-[#141d30] hover:bg-[#1a2640] border border-slate-700/80 text-white font-semibold text-sm transition-all shadow-sm active:scale-[0.99] text-center"
            >
              Start free
            </button>
          </div>

          {/* Card 2: COIN TOP-UP CALCULATOR */}
          <div className="reveal-on-scroll reveal-delay-150 p-7 sm:p-8 rounded-2xl bg-[#090e1b] border border-slate-800/80 shadow-2xl relative overflow-hidden">
            {/* Top row with coin summary and price */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
              <div>
                <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase block mb-1">
                  You get
                </span>
                <div className="flex items-center gap-2.5">
                  <GoldCoinIcon className="w-6 h-6" />
                  <span className="text-3xl sm:text-4xl font-extrabold text-white tabular-nums tracking-tight">
                    {coins.toLocaleString()}
                  </span>
                  <span className="text-slate-400 text-sm font-medium">coins</span>
                </div>

                {/* Discount Tag & Savings */}
                <div className="flex flex-wrap items-center gap-2.5 mt-2.5 text-xs">
                  {discountPct > 0 ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 font-medium text-[11px]">
                      <Tag className="w-3 h-3" />
                      <span>{discountPct}% volume discount</span>
                    </span>
                  ) : null}

                  {discountAmount > 0 && (
                    <span className="text-slate-400">
                      You save ${discountAmount.toFixed(2)}
                    </span>
                  )}

                  {nextTier && (
                    <button
                      onClick={() => setCoins(nextTier.coins)}
                      type="button"
                      className="text-sky-400 hover:text-sky-300 font-medium transition-colors"
                    >
                      +{ (nextTier.coins - coins).toLocaleString() } coins → {nextTier.discount} off
                    </button>
                  )}
                </div>
              </div>

              {/* Price block on right */}
              <div className="sm:text-right mt-2 sm:mt-0">
                <div className="text-3xl sm:text-4xl font-extrabold text-white tabular-nums tracking-tight">
                  ${totalPrice.toFixed(2)}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  ${(totalPrice / coins).toFixed(3)} per coin
                </div>
              </div>
            </div>

            {/* Range Slider Container */}
            <div className="mt-8 mb-4">
              <div className="relative">
                <input
                  type="range"
                  min="200"
                  max="100000"
                  step="100"
                  value={coins}
                  onChange={(e) => setCoins(Number(e.target.value))}
                  aria-label="Select coin package amount"
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
                />
              </div>

              {/* Discount markers underneath slider */}
              <div className="flex justify-between items-center text-[10px] sm:text-xs text-slate-500 font-mono mt-2 px-1 select-none">
                {DISCOUNT_TIERS.map((tier) => (
                  <span
                    key={tier.threshold}
                    onClick={() => setCoins(tier.threshold)}
                    className="cursor-pointer hover:text-sky-400 transition-colors"
                  >
                    {tier.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Presets Button Row */}
            <div className="grid grid-cols-5 gap-2 my-6">
              {PRESETS.map((preset) => {
                const isActive = coins === preset.coins;
                return (
                  <button
                    key={preset.coins}
                    type="button"
                    onClick={() => setCoins(preset.coins)}
                    className={`cursor-pointer py-2 px-1 text-center rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-[#1b253b] text-sky-400 border border-sky-500/50 shadow-[0_0_12px_rgba(56,189,248,0.2)]'
                        : 'bg-[#0f1627] text-slate-400 hover:text-white border border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>

            {/* Big Action Button */}
            <a
              href="https://discord.com/users/1511463181799788825"
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer w-full py-4 rounded-xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-[0_0_25px_rgba(56,189,248,0.35)] hover:shadow-[0_0_35px_rgba(56,189,248,0.55)] active:scale-[0.99] transition-all flex items-center justify-center gap-2 no-underline text-center"
            >
              <span>
                Get {coins.toLocaleString()} coins · ${totalPrice.toFixed(2)}
              </span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <p className="mt-3.5 text-center text-xs text-slate-500">
              From 200 to 100,000 coins · one-time · secured by Stripe
            </p>
          </div>

          {/* Integrated Premium Blue Pricing Plans Component */}
          <PricingPlansComponent />
        </div>
      </div>
    </section>
  );
};
