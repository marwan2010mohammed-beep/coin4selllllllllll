import React, { useState, useEffect } from 'react';
import { X, Check, ShieldCheck, ArrowRight, Server } from 'lucide-react';
import { DiscordIcon, JoinsLogoIcon } from './Icons';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (username: string) => void;
  onLoginWithDiscord?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onLoginWithDiscord,
}) => {
  const [step, setStep] = useState<'authorize' | 'selectServer' | 'complete'>('authorize');
  const [selectedServer, setSelectedServer] = useState<string>('Cyberpunk Tavern');

  useEffect(() => {
    if (isOpen) {
      setStep('authorize');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const mockServers = [
    { name: 'Cyberpunk Tavern', icon: '🌆', members: '1,420 members' },
    { name: 'Chill Coffee Lo-Fi', icon: '☕', members: '8,900 members' },
    { name: 'React & AI Builders', icon: '⚡', members: '5,120 members' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl bg-[#090d18] border border-slate-800 shadow-2xl p-6 sm:p-7 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close modal"
          className="cursor-pointer absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'authorize' && (
          <div className="space-y-5">
            {/* Header Lockup */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <div className="w-12 h-12 rounded-2xl bg-[#5865F2] flex items-center justify-center text-white shadow-lg shadow-indigo-900/40">
                <DiscordIcon className="w-7 h-7" />
              </div>
              <span className="text-slate-600 text-xl font-bold">⇄</span>
              <JoinsLogoIcon className="w-12 h-12 rounded-2xl" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="text-xl font-extrabold text-white">
                Authorize coin4sell
              </h3>
              <p className="text-xs text-slate-400">
                Connect your Discord account to discover communities and feature your server.
              </p>
            </div>

            {/* Scope Permissions List */}
            <div className="p-3.5 rounded-xl bg-[#0c1222] border border-slate-800/80 space-y-2.5 text-xs text-slate-300">
              <div className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">
                coin4sell will receive:
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Access your Discord username, avatar, and banner</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Know which Discord servers you manage</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>Cannot send messages or join servers without your consent</span>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={() => {
                  if (onLoginWithDiscord) {
                    onLoginWithDiscord();
                  } else {
                    setStep('selectServer');
                  }
                }}
                className="cursor-pointer w-full py-3.5 rounded-xl font-bold text-sm text-white bg-[#5865F2] hover:bg-[#4752c4] shadow-lg shadow-indigo-900/40 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
              >
                <DiscordIcon className="w-4 h-4 text-white" />
                <span>Authorize with Discord</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer w-full py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {step === 'selectServer' && (
          <div className="space-y-5">
            <div className="text-center space-y-1.5">
              <div className="w-10 h-10 rounded-xl bg-sky-950/60 border border-sky-500/30 text-sky-400 flex items-center justify-center mx-auto mb-2">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-extrabold text-white">
                Select your Discord Server
              </h3>
              <p className="text-xs text-slate-400">
                Choose the community you want to promote on the organic network.
              </p>
            </div>

            <div className="space-y-2">
              {mockServers.map((server) => (
                <div
                  key={server.name}
                  onClick={() => setSelectedServer(server.name)}
                  className={`cursor-pointer p-3 rounded-xl border flex items-center justify-between transition-all ${
                    selectedServer === server.name
                      ? 'bg-sky-950/40 border-sky-500/60 text-white'
                      : 'bg-[#0c1222] border-slate-800/80 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{server.icon}</span>
                    <div>
                      <div className="text-sm font-bold text-white">{server.name}</div>
                      <div className="text-xs text-slate-400">{server.members}</div>
                    </div>
                  </div>
                  {selectedServer === server.name && (
                    <div className="w-5 h-5 rounded-full bg-sky-500 flex items-center justify-center text-slate-950">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                setStep('complete');
                onSuccess(selectedServer);
              }}
              className="cursor-pointer w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all flex items-center justify-center gap-2"
            >
              <span>Promote this Server</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 'complete' && (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-extrabold text-white">You're all set!</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xs mx-auto leading-relaxed">
              <strong className="text-sky-400">{selectedServer}</strong> is now linked to coin4sell.
              Your campaign is receiving organic opt-in discovery.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              Close &amp; View Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
