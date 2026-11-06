import React, { useState } from 'react';
import {
  ArrowLeft,
  Sparkles,
  Send,
  LogOut,
  ShoppingBag,
  Compass,
  Gift,
  TrendingUp,
  Megaphone,
  Users,
  Check,
  X,
} from 'lucide-react';
import { GoldCoinIcon } from './Icons';
import { DiscordUser, getDiscordAvatarUrl } from '../utils/discordAuth';

interface MemberCoinsPageProps {
  onBack: () => void;
  coins: number;
  onEarnCoins: (amount: number) => void;
  discordUser?: DiscordUser | null;
  onLogout?: () => void;
}

export const MemberCoinsPage: React.FC<MemberCoinsPageProps> = ({
  onBack,
  coins,
  onEarnCoins,
  discordUser,
  onLogout,
}) => {
  const [coinInput1, setCoinInput1] = useState('');
  const [coinInput2, setCoinInput2] = useState('');
  const [coinInput3, setCoinInput3] = useState('');
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);

  const getTodayDateKey = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  const [lastClaimedDate, setLastClaimedDate] = useState<string>(() => {
    try {
      const stored = localStorage.getItem('coin4sell_daily_reward_last_claim');
      return stored !== null ? stored : '';
    } catch {
      return '';
    }
  });

  const isClaimedToday = lastClaimedDate === getTodayDateKey();

  const handleClaimDaily = () => {
    if (isClaimedToday) return;
    const todayKey = getTodayDateKey();
    onEarnCoins(2);
    try {
      localStorage.setItem('coin4sell_daily_reward_last_claim', todayKey);
    } catch (e) {
      console.error(e);
    }
    setLastClaimedDate(todayKey);
  };

  const displayName = discordUser?.global_name || discordUser?.username || 'SONHEI';
  const currentBalance = coins.toFixed(2);
  const totalEarned = coins.toFixed(2);
  const totalSpent = (0).toFixed(2);

  const handleSubmit1 = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(coinInput1, 10);
    if (isNaN(val) || val <= 0) return;

    onEarnCoins(val);
    setCoinInput1('');
  };

  const handleSubmit2 = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(coinInput2, 10);
    if (isNaN(val) || val <= 0) return;

    onEarnCoins(val);
    setCoinInput2('');
  };

  const handleSubmit3 = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(coinInput3, 10);
    if (isNaN(val) || val <= 0) return;

    onEarnCoins(val);
    setCoinInput3('');
  };

  return (
    <div className="min-h-screen bg-[#05070D] text-slate-100 flex flex-col relative selection:bg-sky-500 selection:text-white">
      {/* Top Header bar */}
      <header className="sticky top-0 z-40 bg-[#060913]/90 backdrop-blur-md border-b border-sky-900/40 px-4 sm:px-8 py-4 flex items-center justify-between">
        <button
          onClick={onBack}
          type="button"
          className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0b1222] border border-sky-500/30 text-sky-400 hover:text-white hover:bg-sky-500/20 transition-all font-semibold text-xs sm:text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-3">
          {discordUser && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a1124] border border-sky-500/30">
              <img
                src={getDiscordAvatarUrl(discordUser, 48)}
                alt={discordUser.username}
                className="w-5 h-5 rounded-full object-cover border border-sky-400"
              />
              <span className="text-xs font-bold text-white max-w-[100px] truncate">
                {discordUser.global_name || discordUser.username}
              </span>
              {onLogout && (
                <button
                  onClick={onLogout}
                  type="button"
                  title="Log Out"
                  className="cursor-pointer ml-1 text-slate-400 hover:text-red-400"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
          <button 
            onClick={() => setIsBuyModalOpen(true)}
            type="button"
            className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Buy coins</span>
          </button>
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a1124] border border-amber-500/30 text-amber-300 text-sm font-bold shadow-[0_0_15px_rgba(245,158,11,0.15)]">
            <GoldCoinIcon className="w-4 h-4" />
            <span className="tabular-nums">{coins.toFixed(2)} Coins</span>
          </div>
        </div>
      </header>

      {/* Buy Coins Confirmation Modal */}
      {isBuyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-[#090d18] border border-amber-500/40 shadow-2xl p-6 sm:p-7 overflow-hidden space-y-6">
            <button
              onClick={() => setIsBuyModalOpen(false)}
              type="button"
              className="cursor-pointer absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto shadow-lg shadow-amber-900/30 text-2xl">
                🛍️
              </div>
              <h3 className="text-2xl font-extrabold text-white">Direct Purchase via Discord</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                You are about to be redirected to Discord to send a Direct Message (DM) to the owner (<strong className="text-amber-400">@coin4sell</strong>) and complete your coin purchase.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0c1326] border border-slate-800 space-y-2 text-xs text-slate-300">
              <div className="font-bold text-amber-400 uppercase tracking-wider text-[10px]">
                Suggested Message Preview:
              </div>
              <div className="p-3 rounded-xl bg-[#050811] text-slate-200 font-mono text-[11px] border border-slate-800/80 leading-relaxed select-all">
                "Hello! I would like to buy coins on coin4sell. My Discord username is @{discordUser?.username || 'User'}. Please let me know the payment details and rates."
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://discord.com/users/1511463181799788825"
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsBuyModalOpen(false)}
                className="cursor-pointer flex-1 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-amber-500 hover:bg-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all text-center no-underline"
              >
                Proceed to Discord DM ↗
              </a>
              <button
                type="button"
                onClick={() => setIsBuyModalOpen(false)}
                className="cursor-pointer px-4 py-3.5 rounded-xl font-semibold text-xs text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-8 py-10 space-y-10">
        {/* User Greeting & Stats Dashboard Section (from Screenshots) */}
        <div className="space-y-6">
          {/* Welcome Headline */}
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>Welcome back, {displayName}</span>
              <span className="text-2xl">👑</span>
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm">
              Here&apos;s what&apos;s happening with your communities today.
            </p>
          </div>

          {/* Balance & Daily Reward Card */}
          <div className="rounded-3xl bg-[#080d19] border border-slate-800/80 p-6 sm:p-7 space-y-6 shadow-xl">
            {/* Balance & Action buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
                  YOUR BALANCE
                </span>
                <div className="flex items-center gap-3 mt-1.5">
                  <div className="w-8 h-8 rounded-full bg-[#EAB308] border border-amber-300/40 text-slate-950 font-black text-sm flex items-center justify-center shadow-[0_0_12px_rgba(234,179,8,0.4)]">
                    $
                  </div>
                  <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    {currentBalance}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsBuyModalOpen(true)}
                  className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Buy coins</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('exchange-boxes');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0e1628] hover:bg-[#141f38] border border-slate-700/80 text-white font-bold text-xs sm:text-sm transition-all active:scale-95"
                >
                  <Compass className="w-4 h-4 text-slate-300" />
                  <span>Earn coins</span>
                </button>
              </div>
            </div>

            {/* Daily Reward Row */}
            <div className="rounded-2xl bg-[#08151d] border border-emerald-500/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#0a2327] border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                  <Gift className="w-5 h-5 text-[#2DD4BF]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <span>Daily reward</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      +2 Coins
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {isClaimedToday ? (
                      <span className="text-emerald-400/90 font-medium">
                        Claimed today! Resets at 12:00 AM (midnight).
                      </span>
                    ) : (
                      <span>Ready to claim — keep your streak alive!</span>
                    )}
                  </div>
                </div>
              </div>

              <div>
                {isClaimedToday ? (
                  <button
                    disabled
                    type="button"
                    className="w-full sm:w-auto px-5 py-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-400 font-bold text-xs flex items-center justify-center gap-1.5 cursor-not-allowed"
                  >
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Claimed</span>
                  </button>
                ) : (
                  <button
                    onClick={handleClaimDaily}
                    type="button"
                    className="cursor-pointer w-full sm:w-auto px-6 py-2 rounded-xl bg-[#2DD4BF] hover:bg-[#14B8A6] text-slate-950 font-extrabold text-sm shadow-[0_0_15px_rgba(45,212,191,0.35)] active:scale-95 transition-all"
                  >
                    Claim
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 3 Stats Boxes: TOTAL EARNED, TOTAL SPENT, REFERRALS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* TOTAL EARNED */}
            <div className="rounded-2xl bg-[#080d19] border border-slate-800/80 p-5 flex flex-col justify-between shadow-lg hover:border-slate-700 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  TOTAL EARNED
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#0e271c] border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-3">
                {totalEarned}
              </div>
            </div>

            {/* TOTAL SPENT */}
            <div className="rounded-2xl bg-[#080d19] border border-slate-800/80 p-5 flex flex-col justify-between shadow-lg hover:border-slate-700 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  TOTAL SPENT
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#1f1737] border border-purple-500/20 text-purple-400 flex items-center justify-center">
                  <Megaphone className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-3">
                {totalSpent}
              </div>
            </div>

            {/* REFERRALS */}
            <div className="rounded-2xl bg-[#080d19] border border-slate-800/80 p-5 flex flex-col justify-between shadow-lg hover:border-slate-700 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  REFERRALS
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#2b1f13] border border-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-3">
                0
              </div>
            </div>
          </div>
        </div>

        {/* Title Banner */}
        <div id="exchange-boxes" className="text-center space-y-4 pt-6 border-t border-slate-800/60">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-sky-500/30 shadow-[0_0_20px_rgba(2,132,199,0.3)]">
              <img
                src="/assets/aistudio/image_56e3aee5.png"
                alt="Discord Logo"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/public/assets/aistudio/image_56e3aee5.png';
                }}
              />
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a1224] border border-sky-500/30 text-sky-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
            <span>Official Member &amp; Coin Exchange Network</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            Discord member Coins
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Discover verified Discord communities, earn rewards by participating, and use your coins to power your server&apos;s organic growth.
          </p>
        </div>

        {/* Bot Box Container */}
        <div className="flex justify-center items-start gap-10">
          {/* First Bot Box */}
          <div className="max-w-xs w-full rounded-2xl bg-[#080d19] border border-sky-500/30 shadow-[0_0_30px_rgba(2,132,199,0.15)] overflow-hidden p-4 space-y-3">
            <div className="flex justify-center pb-2 border-b border-slate-800/80">
              <img
                src="/assets/aistudio/image_25d75c7e.png"
                alt="JOIN4JOIN Header"
                className="h-12 w-auto object-contain mix-blend-screen"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/public/assets/aistudio/image_25d75c7e.png';
                }}
              />
            </div>
            <form onSubmit={handleSubmit1} className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="relative max-w-[150px]">
                  <input
                    type="number"
                    min="1"
                    placeholder="Type members..."
                    value={coinInput1}
                    onChange={(e) => setCoinInput1(e.target.value)}
                    className="w-full bg-[#050811] border border-slate-700/80 focus:border-sky-500 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 outline-none transition-all shadow-inner"
                  />
                </div>
                <button
                  type="submit"
                  className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all shrink-0"
                >
                  <span>Add</span>
                  <Send className="w-3 h-3" />
                </button>
              </div>
              <div className="h-4">
                {parseInt(coinInput1, 10) > 0 && (
                  <div className="text-red-500 text-[10px] font-bold flex items-center gap-1">
                    <span>Needs {parseInt(coinInput1, 10)} Coins</span>
                    <GoldCoinIcon className="w-3 h-3" />
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Second Bot Box */}
          <div className="max-w-xs w-full rounded-2xl bg-[#080d19] border border-sky-500/30 shadow-[0_0_30px_rgba(2,132,199,0.15)] overflow-hidden p-4 space-y-3">
            <div className="flex justify-center pb-2 border-b border-slate-800/80">
              <img
                src="/assets/aistudio/image_735a3848.png"
                alt="JOINS.LTD Header"
                className="h-12 w-auto object-contain mix-blend-screen"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/public/assets/aistudio/image_735a3848.png';
                }}
              />
            </div>
            <form onSubmit={handleSubmit2} className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="relative max-w-[150px]">
                  <input
                    type="number"
                    min="1"
                    placeholder="Type subs..."
                    value={coinInput2}
                    onChange={(e) => setCoinInput2(e.target.value)}
                    className="w-full bg-[#050811] border border-slate-700/80 focus:border-sky-500 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 outline-none transition-all shadow-inner"
                  />
                </div>
                <button
                  type="submit"
                  className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all shrink-0"
                >
                  <span>Add</span>
                  <Send className="w-3 h-3" />
                </button>
              </div>
              <div className="h-4">
                {parseInt(coinInput2, 10) > 0 && (
                  <div className="text-red-500 text-[10px] font-bold flex items-center gap-1">
                    <span>Needs {parseInt(coinInput2, 10)} Subs</span>
                    <GoldCoinIcon className="w-3 h-3" />
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* YouTube Section */}
        <div className="flex flex-col items-center pt-8">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.3)] mb-4">
            <img
              src="/assets/aistudio/image_10102c9f.png"
              alt="YouTube Logo"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/public/assets/aistudio/image_10102c9f.png';
              }}
            />
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">Youtube Coins</h2>
          
          {/* Third Bot Box - Subscribe */}
          <div className="max-w-xs w-full rounded-2xl bg-[#080d19] border border-sky-500/30 shadow-[0_0_30px_rgba(2,132,199,0.15)] overflow-hidden p-4 space-y-3 mt-6">
            <div className="flex justify-center pb-2 border-b border-slate-800/80">
              <img
                src="/assets/aistudio/image_f603d2f4.png"
                alt="Subscribe Header"
                className="h-12 w-auto object-contain mix-blend-screen"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/public/assets/aistudio/image_f603d2f4.png';
                }}
              />
            </div>
            <form onSubmit={handleSubmit3} className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="relative max-w-[150px]">
                  <input
                    type="number"
                    min="1"
                    placeholder="Type subs..."
                    value={coinInput3}
                    onChange={(e) => setCoinInput3(e.target.value)}
                    className="w-full bg-[#050811] border border-slate-700/80 focus:border-sky-500 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 outline-none transition-all shadow-inner"
                  />
                </div>
                <button
                  type="submit"
                  className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all shrink-0"
                >
                  <span>Add</span>
                  <Send className="w-3 h-3" />
                </button>
              </div>
              <div className="h-4">
                {parseInt(coinInput3, 10) > 0 && (
                  <div className="text-red-500 text-[10px] font-bold flex items-center gap-1">
                    <span>Needs {parseInt(coinInput3, 10)} Follows</span>
                    <GoldCoinIcon className="w-3 h-3" />
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* TikTok Section */}
        <div className="flex flex-col items-center pt-8">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-pink-500/30 shadow-[0_0_20px_rgba(236,72,153,0.3)] mb-4">
            <img
              src="/assets/aistudio/image_9ac3eb78.png"
              alt="TikTok Logo"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/public/assets/aistudio/image_9ac3eb78.png';
              }}
            />
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">Tiktok Coins</h2>
        </div>

        {/* 8 Action Boxes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
          {[
            'Followers',
            'Hearts',
            'Comments Hearts',
            'Views',
            'Shares',
            'Favourits',
            'Live Stream',
            'Repost',
          ].map((title) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [val, setVal] = useState('');
            return (
              <div
                key={title}
                className="rounded-2xl bg-[#080d19] border border-sky-500/30 shadow-[0_0_20px_rgba(2,132,199,0.1)] p-6 space-y-4"
              >
                <h3 className="text-base font-bold text-white text-center">{title}</h3>
                <form
                  className="flex flex-col gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const n = parseInt(val, 10);
                    if (!isNaN(n) && n > 0) onEarnCoins(n);
                    setVal('');
                  }}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      placeholder="Type..."
                      value={val}
                      onChange={(e) => setVal(e.target.value)}
                      className="w-full bg-[#050811] border border-slate-700/80 focus:border-sky-500 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 outline-none transition-all shadow-inner"
                    />
                    <button
                      type="submit"
                      className="cursor-pointer px-3 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-[0_0_10px_rgba(56,189,248,0.2)] transition-all shrink-0"
                    >
                      <Send className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="h-4">
                    {parseInt(val, 10) > 0 && (
                      <div className="text-red-500 text-[10px] font-bold flex items-center gap-1 justify-center">
                        <span>Needs {parseInt(val, 10)} Coins</span>
                        <GoldCoinIcon className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                </form>
              </div>
            );
          })}
        </div>

        {/* Twitch Section */}
        <div className="flex flex-col items-center pt-8">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.3)] mb-4">
            <img
              src="/assets/aistudio/image_be820902.png"
              alt="Twitch Logo"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/public/assets/aistudio/image_be820902.png';
              }}
            />
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">Twitch Coins</h2>
          
          {/* Fifth Bot Box - Twitch */}
          <div className="max-w-xs w-full rounded-2xl bg-[#080d19] border border-sky-500/30 shadow-[0_0_30px_rgba(2,132,199,0.15)] overflow-hidden p-4 space-y-3 mt-6">
            <div className="flex justify-center items-center py-2 border-b border-slate-800/80">
              <span className="text-lg font-extrabold text-white tracking-wide">Followers</span>
            </div>
            <form onSubmit={handleSubmit3} className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="relative max-w-[150px]">
                  <input
                    type="number"
                    min="1"
                    placeholder="Type follows..."
                    value={coinInput3}
                    onChange={(e) => setCoinInput3(e.target.value)}
                    className="w-full bg-[#050811] border border-slate-700/80 focus:border-sky-500 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 outline-none transition-all shadow-inner"
                  />
                </div>
                <button
                  type="submit"
                  className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all shrink-0"
                >
                  <span>Add</span>
                  <Send className="w-3 h-3" />
                </button>
              </div>
              <div className="h-4">
                {parseInt(coinInput3, 10) > 0 && (
                  <div className="text-red-500 text-[10px] font-bold flex items-center gap-1">
                    <span>Needs {parseInt(coinInput3, 10)} Follows</span>
                    <GoldCoinIcon className="w-3 h-3" />
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Kick Section */}
        <div className="flex flex-col items-center pt-8">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.3)] mb-4">
            <img
              src="/assets/aistudio/image-removebg-preview__1__5f385f96.png"
              alt="Kick Logo"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/public/assets/aistudio/image-removebg-preview__1__5f385f96.png';
              }}
            />
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">Kick Coins</h2>
          
          {/* Sixth Bot Box - Kick */}
          <div className="max-w-xs w-full rounded-2xl bg-[#080d19] border border-sky-500/30 shadow-[0_0_30px_rgba(2,132,199,0.15)] overflow-hidden p-4 space-y-3 mt-6">
            <div className="flex justify-center items-center py-2 border-b border-slate-800/80">
              <span className="text-lg font-extrabold text-white tracking-wide">Followers</span>
            </div>
            <form onSubmit={handleSubmit3} className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="relative max-w-[150px]">
                  <input
                    type="number"
                    min="1"
                    placeholder="Type follows..."
                    value={coinInput3}
                    onChange={(e) => setCoinInput3(e.target.value)}
                    className="w-full bg-[#050811] border border-slate-700/80 focus:border-sky-500 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 outline-none transition-all shadow-inner"
                  />
                </div>
                <button
                  type="submit"
                  className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all shrink-0"
                >
                  <span>Add</span>
                  <Send className="w-3 h-3" />
                </button>
              </div>
              <div className="h-4">
                {parseInt(coinInput3, 10) > 0 && (
                  <div className="text-red-500 text-[10px] font-bold flex items-center gap-1">
                    <span>Needs {parseInt(coinInput3, 10)} Follows</span>
                    <GoldCoinIcon className="w-3 h-3" />
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MemberCoinsPage;
