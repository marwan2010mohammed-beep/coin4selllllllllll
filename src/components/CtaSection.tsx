import React from 'react';
import { ArrowRight, LogOut } from 'lucide-react';
import { DiscordIcon } from './Icons';
import { DiscordUser, getDiscordAvatarUrl } from '../utils/discordAuth';

interface CtaSectionProps {
  onOpenAuth: () => void;
  discordUser: DiscordUser | null;
  onLoginWithDiscord: () => void;
  onLogout: () => void;
  onOpenDashboard: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({
  onOpenAuth: _onOpenAuth,
  discordUser,
  onLoginWithDiscord,
  onLogout,
  onOpenDashboard,
}) => {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 relative">
      <div className="max-w-4xl mx-auto">
        <div className="reveal-on-scroll relative rounded-3xl bg-gradient-to-b from-[#0a1122] to-[#070b16] border border-slate-800/90 p-8 sm:p-14 text-center overflow-hidden shadow-2xl">
          {/* Subtle ambient light inside card */}
          <div
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-sky-500/15 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Ready to grow your community?
            </h2>
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              Join a network of Discord communities discovering each other every day — the organic
              way. Free to start, no credit card required.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              {discordUser ? (
                <div className="flex flex-col sm:flex-row items-center gap-3 p-3 rounded-2xl bg-[#090e1c] border border-sky-500/40">
                  <div className="flex items-center gap-3">
                    <img
                      src={getDiscordAvatarUrl(discordUser, 64)}
                      alt={discordUser.username}
                      className="w-9 h-9 rounded-full border border-sky-400 object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = 'https://cdn.discordapp.com/embed/avatars/0.png';
                      }}
                    />
                    <div className="text-left">
                      <div className="text-xs text-sky-400 font-semibold">Logged In</div>
                      <div className="text-sm font-bold text-white">@{discordUser.username}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:ml-4">
                    <button
                      onClick={onOpenDashboard}
                      type="button"
                      className="cursor-pointer px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs"
                    >
                      Open Dashboard
                    </button>
                    <button
                      onClick={onLogout}
                      type="button"
                      className="cursor-pointer px-3 py-2 rounded-xl bg-slate-800 hover:bg-red-500/20 text-slate-300 hover:text-red-400 text-xs font-semibold border border-slate-700 flex items-center gap-1"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={onLoginWithDiscord}
                  type="button"
                  className="cursor-pointer w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-[#5865F2] hover:bg-[#4752C4] shadow-[0_0_30px_rgba(88,101,242,0.45)] hover:shadow-[0_0_40px_rgba(88,101,242,0.65)] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 border border-[#7983f5]/50"
                >
                  <DiscordIcon className="w-5 h-5 text-white" />
                  <span>Login with Discord</span>
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </button>
              )}

              <a
                href="#pricing"
                className="uiverse-zjssun-btn"
              >
                View pricing
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
