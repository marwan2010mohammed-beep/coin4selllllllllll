import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface LegalModalProps {
  title: string | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ title, onClose }) => {
  if (!title) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-2xl bg-[#090d18] border border-slate-800 shadow-2xl p-6 sm:p-7">
        <button
          onClick={onClose}
          type="button"
          aria-label="Close modal"
          className="cursor-pointer absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-4">
          <ShieldCheck className="w-5 h-5 text-sky-400" />
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {title === 'Terms of Service' && (
            <>
              <p>
                Welcome to coin4sell, operated by SONHEI TECHNOLOGIES SELL (Company no. SC888385,
                Scotland). By accessing or using our discovery service, you agree to these terms.
              </p>
              <h4 className="font-bold text-white text-sm pt-2">1. Organic Member Guarantee</h4>
              <p>
                coin4sell facilitates voluntary, human opt-in discovery between real Discord users
                and community servers. We explicitly prohibit automated bot joiners, purchased token
                raids, and deceptive promotions.
              </p>
              <h4 className="font-bold text-white text-sm pt-2">2. Coin System &amp; Escrow</h4>
              <p>
                Coins represent promotional points within the coin4sell network and hold no external
                cash redemption value. Coins earned via community discovery are subject to retention
                verification rules.
              </p>
              <h4 className="font-bold text-white text-sm pt-2">3. Stripe Payments</h4>
              <p>
                All top-up payments are processed securely through Stripe. No recurring subscription
                or hidden billing applies.
              </p>
            </>
          )}

          {title === 'Privacy Policy' && (
            <>
              <p>
                Your privacy is paramount. coin4sell complies with UK GDPR and global data
                protection principles.
              </p>
              <h4 className="font-bold text-white text-sm pt-2">Data We Collect</h4>
              <p>
                We only receive your Discord public ID, username, and avatar hash via Discord’s
                official OAuth2 gateway. We never see or store your Discord password.
              </p>
              <h4 className="font-bold text-white text-sm pt-2">No Tracking or Ad Cookies</h4>
              <p>
                We do not sell personal data to third parties. Data is used exclusively to facilitate
                server discovery and verify non-bot attendance.
              </p>
            </>
          )}

          {title === 'Blog' && (
            <>
              <p className="text-slate-400">Published October 2026</p>
              <h4 className="font-bold text-white text-base">
                Why organic discovery outperforms bot invites every time
              </h4>
              <p>
                Discord communities thrive on genuine participation. When users choose to join a
                server based on shared hobbies, retention rates jump by 480% compared to automated
                boost services.
              </p>
              <p>
                Our 2026 transparent coin-exchange model ensures server owners only reward members
                who genuinely show up and stick around.
              </p>
            </>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 text-right">
          <button
            onClick={onClose}
            className="cursor-pointer px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
