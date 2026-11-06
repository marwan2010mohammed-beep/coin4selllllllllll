import React, { useEffect } from 'react';
import { GoldCoinIcon } from './Icons';
import { CheckCircle2, Sparkles, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'coin' | 'success' | 'info';
  title: string;
  subtitle?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-xl bg-[#0c1322] border border-sky-500/40 shadow-2xl text-white animate-in slide-in-from-bottom-5 duration-200"
        >
          <div className="flex items-center gap-2.5">
            {toast.type === 'coin' && <GoldCoinIcon className="w-5 h-5 shrink-0" />}
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
            {toast.type === 'info' && <Sparkles className="w-5 h-5 text-sky-400 shrink-0" />}
            <div>
              <div className="text-xs sm:text-sm font-bold text-white">{toast.title}</div>
              {toast.subtitle && (
                <div className="text-[11px] text-slate-400">{toast.subtitle}</div>
              )}
            </div>
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-slate-400 hover:text-white p-1 rounded transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
