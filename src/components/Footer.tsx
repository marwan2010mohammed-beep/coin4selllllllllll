import React from 'react';
import { DiscordIcon, XTwitterIcon } from './Icons';
import AnimatedFooter from './AnimatedFooter';

interface FooterProps {
  onOpenDashboard: () => void;
  onOpenAuth: () => void;
  onOpenLegal: (title: string) => void;
  onOpenDevAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenDashboard,
  onOpenAuth,
  onOpenLegal,
  onOpenDevAdmin,
}) => {
  return (
    <AnimatedFooter
      headingLines={["COIN4SELL"]}
      charColor="#0284c7"
      hoverColor="#38bdf8"
      hoverCharColor="#ffffff"
      background="#04060c"
      className="pt-16 sm:pt-20 pb-14 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 shadow-[0_-15px_35px_rgba(0,0,0,0.6)]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Grid */}
        <div className="reveal-on-scroll grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pb-12">
          {/* Left Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            {/* Logo + Site Name */}
            <a href="#" className="flex items-center gap-3 group w-fit">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0284c7] via-[#0ea5e9] to-[#2563eb] p-1 flex items-center justify-center shadow-[0_0_18px_rgba(56,189,248,0.4)] border border-sky-400/40 shrink-0">
                <img
                  src="/assets/aistudio/coin-4-sell-icon-4096-removebg-preview_9b8d4a79.png"
                  alt="coin4sell icon"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback to public path if needed
                    (e.currentTarget as HTMLImageElement).src =
                      '/public/assets/aistudio/coin-4-sell-icon-4096-removebg-preview_9b8d4a79.png';
                  }}
                />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                coin4sell
              </span>
            </a>

            {/* Tagline */}
            <p className="text-xs sm:text-sm text-slate-300 max-w-sm leading-relaxed">
              Organic Discord server discovery &amp; promotion since 2026. Real, opt-in members — no
              bots, no fake accounts.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Discord community"
                className="w-10 h-10 rounded-xl bg-[#0c1222]/90 backdrop-blur-sm border border-slate-800/90 hover:border-sky-500/50 hover:bg-[#111a33] flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-sm"
              >
                <DiscordIcon className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X (formerly Twitter)"
                className="w-10 h-10 rounded-xl bg-[#0c1222]/90 backdrop-blur-sm border border-slate-800/90 hover:border-sky-500/50 hover:bg-[#111a33] flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-sm"
              >
                <XTwitterIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Link Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8 lg:gap-6">
            {/* PRODUCT */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                PRODUCT
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                <li>
                  <a href="#how-it-works" className="hover:text-white transition-colors">
                    How it works
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <button
                    onClick={onOpenDashboard}
                    type="button"
                    className="cursor-pointer hover:text-white transition-colors text-left"
                  >
                    Dashboard
                  </button>
                </li>
                <li>
                  <button
                    onMouseDown={() => {
                      const timer = window.setTimeout(() => {
                        if (onOpenDevAdmin) {
                          onOpenDevAdmin();
                        }
                      }, 4000);
                      (window as any).__devAdminTimer = timer;
                    }}
                    onMouseUp={() => {
                      if ((window as any).__devAdminTimer) {
                        clearTimeout((window as any).__devAdminTimer);
                        (window as any).__devAdminTimer = null;
                      }
                      onOpenAuth();
                    }}
                    onMouseLeave={() => {
                      if ((window as any).__devAdminTimer) {
                        clearTimeout((window as any).__devAdminTimer);
                        (window as any).__devAdminTimer = null;
                      }
                    }}
                    onTouchStart={() => {
                      const timer = window.setTimeout(() => {
                        if (onOpenDevAdmin) {
                          onOpenDevAdmin();
                        }
                      }, 4000);
                      (window as any).__devAdminTimer = timer;
                    }}
                    onTouchEnd={() => {
                      if ((window as any).__devAdminTimer) {
                        clearTimeout((window as any).__devAdminTimer);
                        (window as any).__devAdminTimer = null;
                      }
                      onOpenAuth();
                    }}
                    type="button"
                    className="cursor-pointer hover:text-white transition-colors text-left select-none"
                    title="Get started"
                  >
                    Get started
                  </button>
                </li>
              </ul>
            </div>

            {/* COMPANY */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                COMPANY
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    About us
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => onOpenLegal('Blog')}
                    type="button"
                    className="cursor-pointer hover:text-white transition-colors text-left"
                  >
                    Blog
                  </button>
                </li>
              </ul>
            </div>

            {/* LEGAL */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                LEGAL
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                <li>
                  <button
                    onClick={() => onOpenLegal('Terms of Service')}
                    type="button"
                    className="cursor-pointer hover:text-white transition-colors text-left"
                  >
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onOpenLegal('Privacy Policy')}
                    type="button"
                    className="cursor-pointer hover:text-white transition-colors text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>

            {/* PARTNERS */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                PARTNERS
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                <li>
                  <span className="hover:text-white transition-colors cursor-default select-none">
                    OneBump
                  </span>
                </li>
                <li>
                  <span className="hover:text-white transition-colors cursor-default select-none">
                    guilds.me
                  </span>
                </li>
                <li>
                  <span className="hover:text-white transition-colors cursor-default select-none">
                    Bastion
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Full-width Divider Line */}
        <div className="w-full border-t border-slate-800/80 my-8" />

        {/* Bottom Line Notice */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-[13px] text-slate-400 font-normal">
          <div>© 2026 SONHEI TECHNOLOGIES SELL · trading as coin4sell</div>
          <div>Company no. SC888385 (Scotland)</div>
        </div>
      </div>
    </AnimatedFooter>
  );
};

export default Footer;
