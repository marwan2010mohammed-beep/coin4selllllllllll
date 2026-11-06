import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProofBar } from './components/ProofBar';
import { LogoSlider } from './components/LogoSlider';
import { HowItWorks } from './components/HowItWorks';
import { TrustFeatures } from './components/TrustFeatures';
import { PricingCalculator } from './components/PricingCalculator';
import { FaqAccordion } from './components/FaqAccordion';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { AxialBeam } from './components/axial-beam';
import { AuthModal } from './components/AuthModal';
import { DashboardModal } from './components/DashboardModal';
import { LegalModal } from './components/LegalModal';
import { Toast, ToastMessage } from './components/Toast';
import { MemberCoinsPage } from './components/MemberCoinsPage';
import { BackToTopButton } from './components/BackToTopButton';
import { DevAdminModal } from './components/DevAdminModal';
import {
  DiscordUser,
  parseDiscordHashToken,
  fetchDiscordUserProfile,
  redirectToDiscordAuth,
  getStoredDiscordSession,
  saveDiscordSession,
  clearDiscordSession,
} from './utils/discordAuth';

export default function App() {
  const [coins, setCoins] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('coin4sell_user_coins');
      return saved !== null ? parseFloat(saved) || 0 : 0;
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('coin4sell_user_coins', coins.toString());
    } catch (e) {
      console.error(e);
    }
  }, [coins]);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [showMemberCoins, setShowMemberCoins] = useState(false);
  const [legalTitle, setLegalTitle] = useState<string | null>(null);
  const [isDevAdminOpen, setIsDevAdminOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [discordUser, setDiscordUser] = useState<DiscordUser | null>(null);

  const addToast = (type: 'coin' | 'success' | 'info', title: string, subtitle?: string) => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, type, title, subtitle }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleEarnCoin = (amount: number) => {
    setCoins((prev) => prev + amount);
    addToast('coin', `+${amount} Coin Earned!`, `New balance: ${(coins + amount).toLocaleString()} coins`);
  };

  const handleBuyCoins = (purchasedCoins: number, price: number) => {
    setCoins((prev) => prev + purchasedCoins);
    addToast(
      'success',
      `+${purchasedCoins.toLocaleString()} coins added!`,
      `Checkout simulated for $${price.toFixed(2)} via Stripe.`
    );
  };

  const handleOpenAuthModal = () => {
    setIsAuthOpen(true);
  };

  const handleAuthorizeDiscord = () => {
    redirectToDiscordAuth();
  };

  const handleLogout = () => {
    clearDiscordSession();
    setDiscordUser(null);
    addToast('info', 'Logged Out', 'You have been logged out of Discord.');
  };

  // Immediate check for URL hash fragment (#access_token=...) on redirect back
  useEffect(() => {
    const hashData = parseDiscordHashToken();
    if (hashData && hashData.token) {
      // Async fetch request using that token to call 'https://discord.com/api/users/@me'
      fetchDiscordUserProfile(hashData.token)
        .then((profile) => {
          setDiscordUser(profile);
          saveDiscordSession(hashData.token, profile);
          setShowMemberCoins(true);
          addToast(
            'success',
            `Welcome back, ${profile.global_name || profile.username}!`,
            `Successfully authenticated with Discord (@${profile.username})`
          );
        })
        .catch((err) => {
          console.error('Failed to fetch Discord user profile:', err);
          addToast(
            'info',
            'Discord Auth Failed',
            'Could not retrieve user details from Discord.'
          );
        });
    } else {
      // Restore existing stored session if already authenticated
      const session = getStoredDiscordSession();
      if (session.user) {
        setDiscordUser(session.user);
      }
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const observeElements = () => {
      const elements = document.querySelectorAll('.reveal-on-scroll');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
          el.classList.add('is-revealed');
        } else {
          observer.observe(el);
        }
      });
    };

    observeElements();

    const handleScroll = () => {
      const elements = document.querySelectorAll('.reveal-on-scroll:not(.is-revealed)');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
          el.classList.add('is-revealed');
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (showMemberCoins) {
    return (
      <MemberCoinsPage
        onBack={() => setShowMemberCoins(false)}
        coins={coins}
        onEarnCoins={handleEarnCoin}
        discordUser={discordUser}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#05070D] text-slate-100 flex flex-col selection:bg-sky-500 selection:text-white relative overflow-x-hidden">
      {/* Website Background: React Bits Pro Axial Beam (Soft rays of light rising from beyond the frame) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <AxialBeam
          colors={['#0284c7', '#38bdf8', '#0ea5e9', '#60a5fa', '#38bdf8']}
          backgroundColor="#05070D"
          originX={0.5}
          originY={-0.6}
          spread={38}
          rays={12}
          rayWidth={1.2}
          reach={1.4}
          swing={1}
          flicker={0.5}
          haze={1.1}
          intensity={0.85}
          speed={0.9}
          interactive={true}
          cursorBoost={1.4}
          cursorWidth={7}
        />
      </div>

      {/* Navigation Bar */}
      <Navbar
        onOpenDashboard={() => setShowMemberCoins(true)}
        onOpenAuth={handleOpenAuthModal}
        discordUser={discordUser}
        onLoginWithDiscord={handleOpenAuthModal}
        onLogout={handleLogout}
        showMemberCoins={showMemberCoins}
        setShowMemberCoins={setShowMemberCoins}
      />

      {/* Main Content Sections */}
      <main className="flex-1 relative z-10">
        {/* Hero Section with Dashboard Mockup */}
        <Hero
          onOpenAuth={handleOpenAuthModal}
          onEarnCoin={handleEarnCoin}
          coins={coins}
          discordUser={discordUser}
          onLoginWithDiscord={handleOpenAuthModal}
          onLogout={handleLogout}
          onOpenDashboard={() => setShowMemberCoins(true)}
        />

        {/* 4-Column Proof Bar */}
        <ProofBar />

        {/* Infinite Partner & Community Logo Slider */}
        <div className="py-8 bg-[#03060d] border-b border-sky-900/30 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 mb-3 text-center">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
              Trusted by leading Discord communities &amp; creators worldwide
            </span>
          </div>
          <LogoSlider
            speed={35}
            direction="left"
            pauseOnHover={true}
            logos={[
              <span className="text-slate-300 font-extrabold tracking-wider hover:text-sky-400 transition-colors">GAMERS.GG</span>,
              <span className="text-slate-300 font-extrabold tracking-wider hover:text-sky-400 transition-colors">ANIME HUB</span>,
              <span className="text-slate-300 font-extrabold tracking-wider hover:text-sky-400 transition-colors">DEV CIRCLE</span>,
              <span className="text-slate-300 font-extrabold tracking-wider hover:text-sky-400 transition-colors">CRYPTO 101</span>,
              <span className="text-slate-300 font-extrabold tracking-wider hover:text-sky-400 transition-colors">LORENIX</span>,
              <span className="text-slate-300 font-extrabold tracking-wider hover:text-sky-400 transition-colors">ARTISTS UNITE</span>,
              <span className="text-slate-300 font-extrabold tracking-wider hover:text-sky-400 transition-colors">METAVERSE</span>,
              <span className="text-slate-300 font-extrabold tracking-wider hover:text-sky-400 transition-colors">ALPHA LEAK</span>,
            ]}
          />
        </div>

        {/* How It Works (3-step exchange) */}
        <HowItWorks />

        {/* Built on Trust (Features Grid) */}
        <TrustFeatures />

        {/* Pricing & Interactive Coin Calculator */}
        <PricingCalculator
          onStartFree={() => setIsAuthOpen(true)}
          onBuyCoins={handleBuyCoins}
        />

        {/* FAQ Accordion */}
        <FaqAccordion
          onJoinDiscord={() => {
            addToast('info', 'Connecting to Community Discord...', 'Opening official support server');
          }}
        />

        {/* Bottom CTA Card */}
        <CtaSection
          onOpenAuth={handleOpenAuthModal}
          discordUser={discordUser}
          onLoginWithDiscord={handleOpenAuthModal}
          onLogout={handleLogout}
          onOpenDashboard={() => setShowMemberCoins(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenDashboard={() => setIsDashboardOpen(true)}
        onOpenAuth={handleOpenAuthModal}
        onOpenLegal={(title) => setLegalTitle(title)}
        onOpenDevAdmin={() => setIsDevAdminOpen(true)}
      />

      {/* Modals & Overlays */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(serverName) => {
          addToast('success', `Connected: ${serverName}`, 'Server featured in organic discovery queue!');
        }}
        onLoginWithDiscord={handleAuthorizeDiscord}
      />

      <DevAdminModal
        isOpen={isDevAdminOpen}
        onClose={() => setIsDevAdminOpen(false)}
        onGoHome={() => setShowMemberCoins(false)}
        onGoDashboard={() => setShowMemberCoins(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      <DashboardModal
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        coins={coins}
        onEarnCoins={handleEarnCoin}
        onBuyCoins={() => {
          setIsDashboardOpen(false);
          const pricingEl = document.getElementById('pricing');
          if (pricingEl) {
            pricingEl.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      <LegalModal
        title={legalTitle}
        onClose={() => setLegalTitle(null)}
      />

      {/* Toast Notification Container */}
      <Toast
        toasts={toasts}
        onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))}
      />

      <BackToTopButton />
    </div>
  );
}
