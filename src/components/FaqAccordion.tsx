import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { DiscordIcon } from './Icons';
import { FaqItem } from '../types';

interface FaqAccordionProps {
  onJoinDiscord: () => void;
}

const FAQS: FaqItem[] = [
  {
    id: '1',
    question: 'What is coin4sell?',
    answer:
      'coin4sell is a discovery and promotion network for Discord communities. Members browse and join servers that interest them and earn coins for taking part. Server owners spend those coins to feature their community, so more real people can find it and choose to join — organically.',
  },
  {
    id: '2',
    question: 'How does the coin system work?',
    answer:
      'You earn coins by discovering and joining new servers in the network, claiming daily rewards, and referring friends. When you want to grow your own community, you spend those coins to feature your server in the discovery queue.',
  },
  {
    id: '3',
    question: 'Is it free to use?',
    answer:
      'Yes, 100% free! You can earn all the coins you need just by exploring communities. For creators and managers who want faster scale without manual discovery, optional coin packages are available with automatic volume discounts.',
  },
  {
    id: '4',
    question: 'Are the members real?',
    answer:
      'Every member on coin4sell is a real, authenticated human who connects via official Discord OAuth2. We never use bot accounts or automated scripts. Growth is genuine because users explicitly choose which servers align with their interests.',
  },
  {
    id: '5',
    question: 'How does promotion help my server?',
    answer:
      'Promotion places your server in the top spotlight of the community discovery feed, complete with your custom banner, description, tags, and member count, reaching thousands of active Discord users daily.',
  },
  {
    id: '6',
    question: 'Is my Discord account safe?',
    answer:
      'Completely safe. We authenticate exclusively via Discord’s official OAuth2 protocol. We never ask for or store your password, bot tokens, or private credentials, and we cannot perform actions without your explicit permission.',
  },
  {
    id: '7',
    question: 'Can I target a specific audience?',
    answer:
      'Yes! You can configure category filters, regional preferences, language criteria, and optional alt-account barriers to ensure incoming members match your community’s focus.',
  },
  {
    id: '8',
    question: 'What stops people from leaving right after joining?',
    answer:
      'Our anti-abuse engine enforces strict retention thresholds. Reward coins are held in verification escrow until the member satisfies minimum dwell and activity requirements. Accounts with churn patterns are suspended.',
  },
];

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ onJoinDiscord }) => {
  // First item open by default matching screenshot
  const [openIds, setOpenIds] = useState<string[]>(['1']);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="faq" className="py-20 sm:py-28 px-4 sm:px-6 relative border-t border-slate-900/80">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="reveal-on-scroll text-center mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-sky-400 uppercase">
            FAQ
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Everything you need to know
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            How coin4sell helps you grow your Discord community, the organic way.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIds.includes(faq.id);
            const delays = ['', 'reveal-delay-75', 'reveal-delay-150', 'reveal-delay-225', 'reveal-delay-300', 'reveal-delay-375'];
            return (
              <div
                key={faq.id}
                className={`reveal-on-scroll ${delays[i % delays.length]} rounded-xl bg-[#090d18] border border-slate-800/80 overflow-hidden transition-all duration-300 hover:border-slate-700/80`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-white leading-snug">
                    {faq.question}
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                    {isOpen ? <X className="w-4 h-4 text-sky-400" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/40 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="reveal-on-scroll reveal-delay-225 mt-14 text-center space-y-4">
          <p className="text-xs sm:text-sm text-slate-400">
            Still have questions? Our team is happy to help.
          </p>
          <button
            onClick={onJoinDiscord}
            type="button"
            className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0f172a] hover:bg-[#1e293b] border border-slate-800 text-white text-xs sm:text-sm font-semibold transition-all hover:scale-105 active:scale-95"
          >
            <DiscordIcon className="w-4 h-4" />
            <span>Join our Discord</span>
          </button>
        </div>
      </div>
    </section>
  );
};
