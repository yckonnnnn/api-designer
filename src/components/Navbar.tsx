import React, { useState, useEffect } from 'react';
import { Globe, Menu, X, KeyRound } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  onOpenApiKey: () => void;
  onOpenDownload?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenApiKey }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language].nav;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-neutral-200/80 shadow-xs'
          : 'bg-transparent border-b border-dashed border-neutral-200/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <BrandLogo size="md" variant="dark" />
          <div className="flex items-center">
            <span className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900">
              福易通<span className="text-neutral-500 font-semibold text-base sm:text-lg">API</span>
            </span>
            <span className="ml-2 hidden md:inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium bg-neutral-100 text-neutral-600 border border-neutral-200 font-mono">
              Router v2.6
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-[14px] font-medium text-neutral-600">
          <a href="#pricing-section" className="hover:text-neutral-950 transition-colors">
            {t.pricing}
          </a>
          <a href="#quickstart-section" className="hover:text-neutral-950 transition-colors">
            {t.routing}
          </a>
          <a href="#routing-features" className="hover:text-neutral-950 transition-colors">
            {t.routing}
          </a>
          <a href="#simulation-section" className="hover:text-neutral-950 transition-colors">
            {t.failover}
          </a>
          <a href="#discount-chart-section" className="hover:text-neutral-950 transition-colors">
            {t.discount}
          </a>
          <a href="#leaderboard-section" className="hover:text-neutral-950 transition-colors">
            {t.leaderboard}
          </a>
          <a href="#faq-section" className="hover:text-neutral-950 transition-colors">
            {t.faq}
          </a>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Language Switch */}
          <button
            id="lang-toggle-btn"
            onClick={toggleLanguage}
            className="p-2 rounded-md text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/80 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer border border-neutral-200/80"
            title={t.switchLang}
          >
            <Globe className="w-3.5 h-3.5 text-neutral-700" />
            <span className="uppercase tracking-wider">{language === 'zh' ? '中 / EN' : 'EN / 中'}</span>
          </button>

          {/* Primary CTA */}
          <button
            id="nav-get-started-btn"
            onClick={onOpenApiKey}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-neutral-900 rounded-md hover:bg-neutral-800 active:scale-[0.98] transition-all shadow-xs cursor-pointer"
          >
            {t.getStarted}
          </button>

          {/* Mobile menu toggle */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
            aria-label={t.menu}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-neutral-200 px-5 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="pb-3 border-b border-neutral-100">
            <button
              onClick={() => {
                onOpenApiKey();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 bg-neutral-900 text-white rounded-lg text-xs font-semibold shadow-xs cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5" />
              {t.getApiKey}
            </button>
          </div>

          <div className="flex flex-col space-y-2 text-sm font-medium text-neutral-700">
            <a
              href="#pricing-section"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-neutral-50"
            >
              {t.pricing}
            </a>
            <a
              href="#quickstart-section"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-neutral-50"
            >
              {t.routing}
            </a>
            <a
              href="#simulation-section"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-neutral-50"
            >
              {t.failover}
            </a>
            <a
              href="#discount-chart-section"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-neutral-50"
            >
              {t.discount}
            </a>
            <a
              href="#leaderboard-section"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-neutral-50"
            >
              {t.leaderboard}
            </a>
            <a
              href="#faq-section"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-neutral-50"
            >
              {t.faq}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

