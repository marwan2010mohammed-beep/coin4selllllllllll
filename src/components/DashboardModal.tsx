import React, { useState } from 'react';
import { X, Sliders, Users, Coins, Check, ArrowUpRight } from 'lucide-react';
import { GoldCoinIcon } from './Icons';

interface DashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  coins: number;
  onEarnCoins: (amount: number) => void;
  onBuyCoins: () => void;
}

export const DashboardModal: React.FC<DashboardModalProps> = ({
  isOpen,
  onClose,
  coins,
  onEarnCoins,
  onBuyCoins,
}) => {
  const [activeTab, setActiveTab] = useState<'campaign' | 'discover' | 'settings'>('campaign');
  const [delivered, setDelivered] = useState(312);
  const target = 500;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#090d18] border border-slate-800 shadow-2xl flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 bg-[#0b101f] border-b border-slate-800/80 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center font-bold text-slate-950 text-sm">
              J
            </div>
            <div>
              <h3 className="text-base font-bold text-white leading-tight">Discord member Coins</h3>
              <p className="text-[11px] text-slate-400">Design Guild · ID: 81920391</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121929] border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <GoldCoinIcon className="w-3.5 h-3.5" />
              <span className="tabular-nums font-mono">{coins.toLocaleString()}</span>
            </div>

            <button
              onClick={onClose}
              type="button"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800/80 px-5 sm:px-7 bg-[#070b14] gap-6 text-xs font-medium">
          <button
            onClick={() => setActiveTab('campaign')}
            className={`py-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'campaign'
                ? 'border-sky-400 text-sky-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Active Campaign</span>
          </button>
          <button
            onClick={() => setActiveTab('discover')}
            className={`py-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'discover'
                ? 'border-sky-400 text-sky-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Coins className="w-3.5 h-3.5" />
            <span>Discover &amp; Earn</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'settings'
                ? 'border-sky-400 text-sky-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Targeting &amp; Rules</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5 sm:p-7 space-y-6 flex-1">
          {activeTab === 'campaign' && (
            <div className="space-y-6">
              {/* Campaign Status Card */}
              <div className="p-5 rounded-xl bg-[#0c1322] border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Live &amp; Featured in Discovery
                    </span>
                    <h4 className="text-lg font-bold text-white mt-1">Growth Campaign #104</h4>
                  </div>
                  <button
                    onClick={onBuyCoins}
                    className="cursor-pointer px-3.5 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center gap-1"
                  >
                    <span>Top up coins</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Campaign Progress</span>
                    <span className="text-sky-400 font-bold tabular-nums">
                      {delivered} / {target} members
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-sky-500 to-blue-500 rounded-full"
                      style={{ width: `${(delivered / target) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-lg bg-[#080d19] border border-slate-800/80 text-center">
                    <div className="text-xl font-bold text-white tabular-nums">+{delivered}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Joined Members</div>
                  </div>
                  <div className="p-3 rounded-lg bg-[#080d19] border border-slate-800/80 text-center">
                    <div className="text-xl font-bold text-white tabular-nums">1,940</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Impressions</div>
                  </div>
                  <div className="p-3 rounded-lg bg-[#080d19] border border-slate-800/80 text-center">
                    <div className="text-xl font-bold text-white tabular-nums text-amber-400">4.8★</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Retention Score</div>
                  </div>
                </div>
              </div>

              {/* Recent Joins Table */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Recent Verified Joins
                </h4>
                <div className="space-y-2 text-xs">
                  {[
                    { user: 'alex_visuals#2021', time: '2 mins ago', status: 'Verified Active' },
                    { user: 'pixel_monk#9941', time: '14 mins ago', status: 'Verified Active' },
                    { user: 'nordic_dev#4110', time: '28 mins ago', status: 'Verified Active' },
                  ].map((row) => (
                    <div
                      key={row.user}
                      className="p-3 rounded-xl bg-[#0c1322] border border-slate-800/80 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-sky-950 border border-sky-500/30 text-sky-400 flex items-center justify-center text-[10px] font-bold">
                          {row.user[0].toUpperCase()}
                        </div>
                        <span className="font-semibold text-white">{row.user}</span>
                      </div>
                      <div className="flex items-center gap-4 text-slate-400">
                        <span>{row.time}</span>
                        <span className="text-emerald-400 font-medium flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          {row.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'discover' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Browse and join communities to earn coins</span>
                <span>Current Balance: {coins} coins</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { name: 'TypeScript Wizards', members: '18.2k', reward: 1, icon: '🧙‍♂️' },
                  { name: 'Unreal Engine Creators', members: '34.1k', reward: 1, icon: '🎮' },
                  { name: 'Synthesizer Music Club', members: '12.9k', reward: 1, icon: '🎹' },
                  { name: 'Minimalist UX Design', members: '21.5k', reward: 1, icon: '📐' },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="p-3.5 rounded-xl bg-[#0c1322] border border-slate-800/80 flex items-center justify-between hover:border-slate-700 transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{item.icon}</span>
                      <div>
                        <div className="text-xs font-bold text-white">{item.name}</div>
                        <div className="text-[11px] text-slate-400">{item.members} members</div>
                      </div>
                    </div>
                    <button
                      onClick={() => onEarnCoins(item.reward)}
                      className="cursor-pointer px-2.5 py-1 rounded-md bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold text-xs flex items-center gap-1"
                    >
                      <span>+{item.reward}</span>
                      <GoldCoinIcon className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-[#0c1322] border border-slate-800 space-y-3">
                <h5 className="font-bold text-white text-sm">Targeting Filters</h5>
                <label className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800 cursor-pointer">
                  <span>Block newly created Discord alt accounts (&lt; 30 days)</span>
                  <input type="checkbox" defaultChecked className="accent-sky-400" />
                </label>
                <label className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800 cursor-pointer">
                  <span>Require phone-verified Discord account</span>
                  <input type="checkbox" defaultChecked className="accent-sky-400" />
                </label>
                <label className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800 cursor-pointer">
                  <span>Language targeting: English &amp; International</span>
                  <input type="checkbox" defaultChecked className="accent-sky-400" />
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
