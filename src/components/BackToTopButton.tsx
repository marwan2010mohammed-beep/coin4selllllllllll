import React, { useState, useEffect } from 'react';

export const BackToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger as soon as user scrolls slightly down (> 50px)
      setVisible(window.scrollY > 50);
    };

    // Check position on mount
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 transition-all duration-300 ease-out ${
        visible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-6 scale-75 pointer-events-none'
      }`}
    >
      <button
        onClick={scrollToTop}
        type="button"
        aria-label="Back to Top"
        className="uiverse-back-to-top"
      >
        <span>Back to top</span>
        <svg
          viewBox="0 0 384 512"
          className="svgIcon"
          aria-hidden="true"
        >
          <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
        </svg>
      </button>
    </div>
  );
};

export default BackToTopButton;
