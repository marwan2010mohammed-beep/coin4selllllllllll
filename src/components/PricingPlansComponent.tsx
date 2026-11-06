import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Zap, Building2, Rocket, ArrowRight } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type BillingCycle = 'monthly' | 'annual';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    annual: number;
  };
  features: PlanFeature[];
  highlight?: boolean;
  ctaText: string;
  icon: React.ElementType;
}

const plans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Community Starter',
    description: 'Perfect for new Discord servers starting organic growth.',
    price: { monthly: 19, annual: 15 },
    icon: Rocket,
    ctaText: 'Get Started',
    features: [
      { text: 'Up to 500 organic member joins/mo', included: true },
      { text: 'Basic server analytics & logs', included: true },
      { text: 'Standard community queue priority', included: true },
      { text: '24/7 Support access', included: true },
    ],
  },
  {
    id: 'pro',
    name: 'Professional Boost',
    description: 'For growing communities scaling up rapidly.',
    price: { monthly: 49, annual: 39 },
    icon: Zap,
    highlight: true,
    ctaText: 'Upgrade to Pro',
    features: [
      { text: 'Unlimited organic member joins', included: true },
      { text: 'Advanced priority queue placement', included: true },
      { text: 'Performance insights & analytics', included: true },
      { text: 'Custom community workflows', included: true },
      { text: 'Priority support with SLA', included: true },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise Network',
    description: 'For large-scale mission-critical communities.',
    price: { monthly: 199, annual: 159 },
    icon: Building2,
    ctaText: 'Contact Sales',
    features: [
      { text: 'Dedicated discovery manager', included: true },
      { text: 'Custom placement & banners', included: true },
      { text: 'Advanced security & audit logs', included: true },
      { text: 'Custom bot integrations', included: true },
    ],
  }
];

interface PricingPlansProps {
  onStartFree?: () => void;
  onBuyCoins?: (coins: number, price: number) => void;
}

export const PricingPlansComponent: React.FC<PricingPlansProps> = () => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

  return (
    <div className="mt-16 pt-12 border-t border-slate-800/80">
      <div className="mb-12 text-center">
        <span className="text-xs sm:text-sm font-bold tracking-widest text-sky-400 uppercase">
          Subscription Tiers
        </span>
        <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Featured Membership Plans
        </h3>
        <p className="mt-2 text-sm text-slate-400 max-w-xl mx-auto">
          Scale your community with premium monthly or annual memberships featuring deep blue aesthetics and premium glowing gradients.
        </p>

        {/* Toggle */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <span className={cn("text-xs sm:text-sm transition-colors", billingCycle === 'monthly' ? "text-white font-semibold" : "text-slate-400")}>
            Monthly
          </span>
          <button
            onClick={() => setBillingCycle(c => c === 'monthly' ? 'annual' : 'monthly')}
            className="cursor-pointer relative h-7 w-12 rounded-full bg-slate-800 p-1 ring-1 ring-sky-500/30 transition-all hover:ring-sky-500 focus:outline-none"
          >
            <motion.div
              className="h-5 w-5 rounded-full bg-sky-400 shadow-[0_0_10px_#38bdf8]"
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              animate={{ x: billingCycle === 'monthly' ? 0 : 20 }}
            />
          </button>
          <span className={cn("text-xs sm:text-sm transition-colors flex items-center gap-2", billingCycle === 'annual' ? "text-white font-semibold" : "text-slate-400")}>
            Annual
            <span className="rounded-full bg-sky-500/20 px-2 py-0.5 text-[10px] font-extrabold text-sky-400 border border-sky-500/30">
              Save 20%
            </span>
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan, index) => {
          const priceDisplay = `$${billingCycle === 'monthly' ? plan.price.monthly : plan.price.annual}`;
          const Icon = plan.icon;

          return (
            <div
              key={plan.id}
              className={cn(
                "relative flex flex-col rounded-3xl p-6 sm:p-7 backdrop-blur-xl transition-all duration-300",
                plan.highlight 
                  ? "bg-gradient-to-b from-[#0e172e] to-[#070b16] border-2 border-sky-500/60 shadow-[0_0_40px_rgba(56,189,248,0.2)] md:-mt-2 md:mb-2" 
                  : "bg-[#080d19]/90 border border-slate-800/90 hover:border-sky-500/30"
              )}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-sky-400 to-blue-600 px-3.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-950 shadow-lg">
                  Most Popular
                </div>
              )}

              {/* Header */}
              <div className="mb-5">
                <div className={cn("mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl", plan.highlight ? "bg-sky-500 text-slate-950 shadow-[0_0_15px_rgba(56,189,248,0.4)]" : "bg-[#0e1628] text-sky-400 border border-sky-500/20")}>
                  <Icon className="h-5 w-5" />
                </div>
                <h4 className="text-lg font-bold text-white">{plan.name}</h4>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-5 flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                  {priceDisplay}
                </span>
                <span className="text-xs text-slate-400">
                  /{billingCycle === 'monthly' ? 'mo' : 'mo billed annually'}
                </span>
              </div>

              {/* Features */}
              <ul className="mb-6 flex-1 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <Check className={cn("h-4 w-4 shrink-0 mt-0.5", plan.highlight ? "text-sky-400" : "text-emerald-400")} />
                    <span className="leading-snug">{feature.text}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="https://discord.com/users/1511463181799788825"
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "cursor-pointer group inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs sm:text-sm font-extrabold transition-all no-underline text-center",
                  plan.highlight
                    ? "bg-gradient-to-r from-sky-400 to-blue-600 hover:from-sky-300 hover:to-blue-500 text-slate-950 shadow-[0_0_20px_rgba(56,189,248,0.4)]"
                    : "bg-[#0e1628] hover:bg-[#141f38] border border-slate-700/80 text-white"
                )}
              >
                {plan.ctaText}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};
