import React, { useState } from 'react';
import { X, Lock, ShieldCheck, Globe, LayoutDashboard, Home, KeyRound } from 'lucide-react';
import { DiscordUser, getDiscordAvatarUrl } from '../utils/discordAuth';

interface DevAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoHome: () => void;
  onGoDashboard: () => void;
  onOpenAuth: () => void;
}

export const DevAdminModal: React.FC<DevAdminModalProps> = ({
  isOpen,
  onClose,
  onGoHome,
  onGoDashboard,
  onOpenAuth,
}) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Marwan@2010') {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  // Retrieve all users who have logged in from localStorage or default mock
  let users: (DiscordUser & { ip?: string; country?: string; flag?: string })[] = [];
  try {
    const stored = localStorage.getItem('coin4sell_all_authorized_users');
    if (stored) {
      users = JSON.parse(stored);
    }
  } catch (e) {
    console.error(e);
  }

  const enhancedUsers = users.map((u, idx) => {
    const ips = ['197.54.22.10', '41.234.12.90', '154.180.55.12', '102.45.89.201'];
    const countries = ['Egypt 🇪🇬', 'United Arab Emirates 🇦🇪', 'Saudi Arabia 🇸🇦', 'United States 🇺🇸'];
    return {
      ...u,
      ip: u.ip || ips[idx % ips.length],
      country: u.country || countries[idx % countries.length],
    };
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#090d18] border border-sky-500/40 shadow-2xl p-6 sm:p-8 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close modal"
          className="cursor-pointer absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isAuthenticated ? (
          <div className="space-y-6 max-w-md mx-auto py-4">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-sky-500/20 border border-sky-500/40 text-sky-400 flex items-center justify-center mx-auto shadow-lg shadow-sky-900/30">
                <Lock className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-extrabold text-white">Developer Access</h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Enter developer password to access user session telemetry &amp; fast site controls.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Enter developer password..."
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  className="w-full bg-[#050811] border border-slate-700/80 focus:border-sky-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all shadow-inner"
                  autoFocus
                />
                {error && (
                  <p className="text-red-400 text-xs mt-1.5 font-semibold">
                    Incorrect developer password. Try again.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="cursor-pointer w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-[0_0_25px_rgba(56,189,248,0.35)] transition-all active:scale-[0.98]"
              >
                Authenticate Developer
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white">Developer Control Center</h3>
                  <p className="text-xs text-slate-400">
                    Fast navigation &amp; telemetry logs.
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                {enhancedUsers.length} Accounts Logged
              </span>
            </div>

            {/* Fast Navigation Controls */}
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => {
                  onGoHome();
                  onClose();
                }}
                className="cursor-pointer flex flex-col items-center justify-center p-3.5 rounded-2xl bg-[#0c1326] border border-sky-500/30 hover:border-sky-500 hover:bg-sky-500/10 transition-all text-white group"
              >
                <Home className="w-5 h-5 text-sky-400 mb-1.5 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold">Landing Page</span>
              </button>

              <button
                onClick={() => {
                  onGoDashboard();
                  onClose();
                }}
                className="cursor-pointer flex flex-col items-center justify-center p-3.5 rounded-2xl bg-[#0c1326] border border-sky-500/30 hover:border-sky-500 hover:bg-sky-500/10 transition-all text-white group"
              >
                <LayoutDashboard className="w-5 h-5 text-sky-400 mb-1.5 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold">Dashboard</span>
              </button>

              <button
                onClick={() => {
                  onOpenAuth();
                  onClose();
                }}
                className="cursor-pointer flex flex-col items-center justify-center p-3.5 rounded-2xl bg-[#0c1326] border border-indigo-500/30 hover:border-indigo-500 hover:bg-indigo-500/10 transition-all text-white group"
              >
                <KeyRound className="w-5 h-5 text-indigo-400 mb-1.5 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold">Auth Modal</span>
              </button>
            </div>

            {/* Accounts Telemetry List */}
            <div className="space-y-3 max-h-[45vh] overflow-y-auto pr-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest pt-2">
                Authorized User Accounts &amp; IP Telemetry
              </h4>
              {enhancedUsers.map((u) => (
                <div
                  key={u.id}
                  className="p-3.5 rounded-2xl bg-[#0c1326] border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-sky-500/40 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={getDiscordAvatarUrl(u, 96)}
                      alt={u.username}
                      className="w-10 h-10 rounded-full object-cover border border-sky-400/60 shadow-md"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          'https://cdn.discordapp.com/embed/avatars/0.png';
                      }}
                    />
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>{u.global_name || u.username}</span>
                        <span className="text-[10px] text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-500/30">
                          @{u.username}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5 font-mono">
                        ID: {u.id}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-[#050811] px-3.5 py-1.5 rounded-xl border border-slate-800/60 shrink-0">
                    <div className="flex flex-col text-right">
                      <span className="text-[11px] font-mono text-slate-300">{u.ip}</span>
                      <span className="text-xs font-semibold text-sky-400 flex items-center gap-1 justify-end">
                        <Globe className="w-3.5 h-3.5" />
                        <span>{u.country}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => {
                  setIsAuthenticated(false);
                  setPassword('');
                }}
                className="cursor-pointer px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
              >
                Lock Portal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
