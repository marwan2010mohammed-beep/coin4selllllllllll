import React, { useState } from 'react';
import { GoldCoinIcon } from './Icons';
import { Check, Pause, Play, Sparkles } from 'lucide-react';

interface DashboardMockupProps {
  onEarnCoin?: (amount: number) => void;
  coins: number;
}

export const DashboardMockup: React.FC<DashboardMockupProps> = ({ onEarnCoin, coins }) => {
  const [guilds, setGuilds] = useState([
    {
      id: '1',
      name: 'Design Guild',
      letter: 'D',
      bg: 'bg-blue-600',
      members: '12.4k members',
      joined: false,
    },
    {
      id: '2',
      name: 'Indie Game Devs',
      letter: 'I',
      bg: 'bg-indigo-600',
      members: '8.1k members',
      joined: false,
    },
    {
      id: '3',
      name: 'Lofi Lounge',
      letter: 'L',
      bg: 'bg-purple-600',
      members: '24.7k members',
      joined: false,
    },
  ]);

  const [isCampaignActive, setIsCampaignActive] = useState(true);
  const [deliveredCount, setDeliveredCount] = useState(312);
  const targetCount = 500;

  const handleJoinGuild = (id: string) => {
    setGuilds((prev) =>
      prev.map((g) => {
        if (g.id === id && !g.joined) {
          if (onEarnCoin) onEarnCoin(1);
          return { ...g, joined: true };
        }
        return g;
      })
    );
  };

  const percentage = Math.round((deliveredCount / targetCount) * 100);

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-12 sm:mt-16">
      {/* Ambient background glow */}
      <div
        className="absolute -inset-1.5 bg-gradient-to-r from-sky-500/20 via-blue-600/15 to-cyan-500/20 rounded-3xl blur-2xl opacity-75 pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Window Frame */}
      <div className="relative rounded-2xl bg-[#090d18] border border-slate-800/90 shadow-2xl overflow-hidden">
        {/* Window Title Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#0b1120] border-b border-slate-800/80">
          {/* Mac Traffic Lights */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ef4444] inline-block shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-[#f59e0b] inline-block shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-[#10b981] inline-block shadow-sm" />
          </div>

          {/* Center Search / Address bar placeholder */}
          <div className="hidden sm:flex items-center justify-center">
            <div className="w-48 md:w-64 h-5 rounded-full bg-slate-900/80 border border-slate-800/60" />
          </div>

          {/* Coin Balance Pill */}
          <div className="flex items-center gap-1.5 bg-[#121929] border border-amber-500/30 px-3 py-1 rounded-full text-xs font-semibold text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
            <GoldCoinIcon className="w-4 h-4" />
            <span className="tabular-nums tracking-wide font-mono text-xs sm:text-sm">
              {coins.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Dashboard Interior: 2-Column Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800/80 p-4 sm:p-6 gap-6 md:gap-0 bg-[#070b14]">
          {/* Left Column: DISCOVER & EARN */}
          <div className="md:pr-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                Discover & Earn
              </span>
              <span className="text-[11px] text-sky-400 font-medium">Click +1 to claim</span>
            </div>

            <div className="space-y-2.5">
              {guilds.map((guild) => (
                <div
                  key={guild.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#0d1424] border border-slate-800/80 hover:border-slate-700/80 transition-all duration-150"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg ${guild.bg} flex items-center justify-center text-white font-bold text-sm shadow-md`}
                    >
                      {guild.letter}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white leading-tight">
                        {guild.name}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">{guild.members}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleJoinGuild(guild.id)}
                    disabled={guild.joined}
                    type="button"
                    className={`cursor-pointer px-2.5 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-1 ${
                      guild.joined
                        ? 'bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 cursor-default'
                        : 'bg-[#1b2234] hover:bg-[#252f48] border border-amber-500/30 text-amber-400 hover:text-amber-300 hover:scale-105 active:scale-95'
                    }`}
                  >
                    {guild.joined ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>Joined</span>
                      </>
                    ) : (
                      <>
                        <span>+1</span>
                        <GoldCoinIcon className="w-3 h-3" />
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-slate-500 text-center pt-1">
              Refreshes with new verified communities every few minutes.
            </p>
          </div>

          {/* Right Column: PROMOTE YOUR SERVER */}
          <div className="md:pl-6 space-y-4 pt-4 md:pt-0">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                Promote Your Server
              </span>
              <button
                onClick={() => setIsCampaignActive(!isCampaignActive)}
                className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                title="Pause or resume simulation"
              >
                {isCampaignActive ? (
                  <>
                    <Pause className="w-3 h-3 text-amber-400" />
                    <span>Active</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 text-slate-400" />
                    <span>Paused</span>
                  </>
                )}
              </button>
            </div>

            {/* Campaign Progress Card */}
            <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">Members delivered</span>
                <span className="font-bold text-sky-400 tabular-nums">
                  {deliveredCount} <span className="text-slate-500 font-normal">/ {targetCount}</span>
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden relative border border-slate-800/80">
                <div
                  className="h-full bg-gradient-to-r from-sky-500 to-blue-500 rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(56,189,248,0.7)]"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Real members joining every few minutes. Pause or top up anytime.
              </p>
            </div>

            {/* 3 Metric Stat Boxes */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="p-2.5 rounded-xl bg-[#0d1424] border border-slate-800/80 text-center">
                <div className="text-base sm:text-lg font-bold text-white tabular-nums tracking-tight">
                  +{deliveredCount}
                </div>
                <div className="text-[11px] text-slate-400 font-medium mt-0.5">joined</div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0d1424] border border-slate-800/80 text-center">
                <div className="text-base sm:text-lg font-bold text-white tabular-nums tracking-tight">
                  1.9k
                </div>
                <div className="text-[11px] text-slate-400 font-medium mt-0.5">reach</div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0d1424] border border-slate-800/80 text-center">
                <div className="text-base sm:text-lg font-bold text-white tabular-nums tracking-tight flex items-center justify-center gap-0.5">
                  <span>4.8</span>
                  <span className="text-amber-400 text-sm">★</span>
                </div>
                <div className="text-[11px] text-slate-400 font-medium mt-0.5">quality</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
