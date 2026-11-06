import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X, LogOut } from 'lucide-react';
import { JoinsLogoIcon, DiscordIcon } from './Icons';
import { DiscordUser, getDiscordAvatarUrl } from '../utils/discordAuth';

interface NavbarProps {
  onOpenDashboard: () => void;
  onOpenAuth: () => void;
  discordUser: DiscordUser | null;
  onLoginWithDiscord: () => void;
  onLogout: () => void;
  showMemberCoins?: boolean;
  setShowMemberCoins?: (show: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenDashboard,
  discordUser,
  onLoginWithDiscord,
  onLogout,
  showMemberCoins,
  setShowMemberCoins,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '#about' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-[#060913]/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <a
          href="#"
          className="flex items-center gap-2 group whitespace-nowrap shrink-0 transition-opacity hover:opacity-90"
        >
          <JoinsLogoIcon className="w-7 h-7" />
          <div className="flex items-center tracking-tight font-bold text-base sm:text-lg">
            <span className="text-white">coin4sell</span>
          </div>
        </a>

        {/* Center Nav Links - Desktop */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors duration-150 whitespace-nowrap shrink-0 py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA / Auth Status */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          {discordUser && discordUser.username === 'Marwan' && (
            <button
              onClick={() => {
                // Toggle view functionality
                window.location.hash = window.location.hash === '#dashboard' ? '' : '#dashboard';
                setShowMemberCoins?.(!showMemberCoins);
              }}
              className="px-3 py-1.5 rounded-lg bg-sky-900/50 border border-sky-500/30 text-sky-300 text-xs font-bold hover:bg-sky-900"
            >
              Toggle View
            </button>
          )}
          {discordUser ? (
            <div className="flex items-center gap-2.5">
              <button
                onClick={onOpenDashboard}
                type="button"
                className="cursor-pointer flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#0c1326] border border-sky-500/30 hover:border-sky-500/70 transition-all text-slate-200 hover:text-white group"
                title="Open Dashboard"
              >
                <div className="relative">
                  <img
                    src={getDiscordAvatarUrl(discordUser, 64)}
                    alt={discordUser.username}
                    className="w-7 h-7 rounded-full border border-sky-400/60 object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://cdn.discordapp.com/embed/avatars/0.png';
                    }}
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-[#0c1326]" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-white leading-tight">
                    {discordUser.global_name || discordUser.username}
                  </span>
                  <span className="text-[10px] text-sky-400 font-medium leading-tight">
                    @{discordUser.username}
                  </span>
                </div>
              </button>

              <button
                onClick={onLogout}
                type="button"
                title="Log Out"
                className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/70 hover:border-red-500/50 hover:bg-red-500/10 text-slate-400 hover:text-red-400 font-semibold text-xs transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginWithDiscord}
              type="button"
              className="cursor-pointer inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#5865F2] hover:bg-[#4752C4] active:scale-[0.98] shadow-[0_0_20px_rgba(88,101,242,0.4)] hover:shadow-[0_0_30px_rgba(88,101,242,0.65)] transition-all duration-200 border border-[#7983f5]/40"
            >
              <DiscordIcon className="w-4 h-4 text-white" />
              <span>Login with Discord</span>
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex sm:hidden items-center gap-2">
          {discordUser ? (
            <button
              onClick={onOpenDashboard}
              type="button"
              className="cursor-pointer flex items-center gap-1.5 bg-[#0c1326] border border-sky-500/40 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg"
            >
              <img
                src={getDiscordAvatarUrl(discordUser, 48)}
                alt={discordUser.username}
                className="w-5 h-5 rounded-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://cdn.discordapp.com/embed/avatars/0.png';
                }}
              />
              <span className="max-w-[80px] truncate">{discordUser.username}</span>
            </button>
          ) : (
            <button
              onClick={onLoginWithDiscord}
              type="button"
              className="cursor-pointer bg-[#5865F2] text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-md shadow-indigo-900/30"
            >
              <DiscordIcon className="w-3.5 h-3.5" />
              <span>Login</span>
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0a0f1d] border-b border-slate-800 px-4 pt-2 pb-6 space-y-3 animate-in fade-in duration-150">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 hover:text-white py-2 px-3 rounded-lg hover:bg-slate-800/50 text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-slate-800/60 flex flex-col gap-2">
            {discordUser ? (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 px-3 py-2 bg-slate-900/70 rounded-xl border border-slate-800">
                  <img
                    src={getDiscordAvatarUrl(discordUser, 64)}
                    alt={discordUser.username}
                    className="w-9 h-9 rounded-full object-cover border border-sky-400"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://cdn.discordapp.com/embed/avatars/0.png';
                    }}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white">
                      {discordUser.global_name || discordUser.username}
                    </span>
                    <span className="text-xs text-sky-400">@{discordUser.username}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDashboard();
                  }}
                  className="w-full py-2.5 text-center text-sm font-semibold rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold"
                >
                  Open Dashboard
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full py-2 text-center text-xs font-semibold rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 flex items-center justify-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLoginWithDiscord();
                }}
                className="w-full py-2.5 text-center text-sm font-semibold rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/40"
              >
                <DiscordIcon className="w-4 h-4 text-white" />
                <span>Login with Discord</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

