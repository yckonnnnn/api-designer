import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

interface TokenValueBannerSectionProps {
  onOpenApiKey: () => void;
}

export const TokenValueBannerSection: React.FC<TokenValueBannerSectionProps> = ({ onOpenApiKey }) => {
  const { language } = useLanguage();
  const t = translations[language].tokenBanner;

  return (
    <section id="token-value-section" className="relative w-full bg-white overflow-hidden py-8 sm:py-12">
      {/* Full Screen / Full Bleed Container with responsive edge breathing space */}
      <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 max-w-[1680px] mx-auto">
        
        {/* Full-bleed Canvas Card with Smooth Curved Radius & Precise Outer Border */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl md:rounded-[32px] overflow-hidden border border-neutral-200/90 shadow-sm">
          
          {/* Background Canvas: Soft Tri-Color Gradient (Blue-Lilac to Pure White to Peach-Amber) */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, #e0e7ff 0%, #ede9fe 22%, #f8fafc 50%, #ffedd5 78%, #fed7aa 100%)',
            }}
          />

          {/* Dotted Texture Mesh Overlay (Exact match to prototype's halftone micro-dot pattern) */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage: 'radial-gradient(circle, #64748b 1.15px, transparent 1.15px)',
              backgroundSize: '16px 16px',
              backgroundPosition: '8px 8px',
            }}
          />

          {/* Inner Content Area - Tall generous vertical padding filling screen gracefully like prototype */}
          <div className="relative z-10 py-20 sm:py-28 md:py-32 lg:py-36 px-4 sm:px-8 text-center flex flex-col items-center justify-center">
            
            {/* Top Medallion: Translucent Frosted Glass Cloud Shell with 4-Point Stars & Swirl */}
            <div className="mb-6 sm:mb-8 relative flex items-center justify-center">
              {/* Ambient Glow */}
              <div className="absolute w-32 h-32 bg-sky-300/30 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute w-28 h-28 bg-amber-300/25 rounded-full blur-xl pointer-events-none translate-x-4 translate-y-2" />

              {/* Medallion Badge SVG */}
              <div className="relative w-22 h-18 sm:w-28 sm:h-22 flex items-center justify-center drop-shadow-md">
                <svg viewBox="0 0 100 80" className="w-full h-full overflow-visible">
                  <defs>
                    {/* Shell Top-Left Blue Gradient */}
                    <linearGradient id="tokenMedallionBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.95" />
                      <stop offset="60%" stopColor="#60a5fa" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.65" />
                    </linearGradient>

                    {/* Shell Bottom-Right Amber Wave Gradient */}
                    <linearGradient id="tokenMedallionAmberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fed7aa" stopOpacity="0.85" />
                      <stop offset="50%" stopColor="#fb923c" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#ea580c" stopOpacity="0.8" />
                    </linearGradient>

                    {/* Frosted Glass Highlight Gradient */}
                    <linearGradient id="tokenMedallionFrost" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>

                  {/* Main Rounded Dome / Shell Base */}
                  <path 
                    d="M 50 10 
                       C 72 10, 90 26, 90 48 
                       C 90 64, 75 72, 50 72 
                       C 25 72, 10 64, 10 48 
                       C 10 26, 28 10, 50 10 Z" 
                    fill="url(#tokenMedallionBlueGrad)"
                  />

                  {/* Right Side Golden Swirl Overlay */}
                  <path 
                    d="M 50 10 
                       C 72 10, 90 26, 90 48 
                       C 90 64, 75 72, 50 72 
                       C 60 72, 70 60, 68 48 
                       C 66 34, 56 22, 50 10 Z" 
                    fill="url(#tokenMedallionAmberGrad)"
                  />

                  {/* Frosted Glass Ambient Border */}
                  <path 
                    d="M 50 10 
                       C 72 10, 90 26, 90 48 
                       C 90 64, 75 72, 50 72 
                       C 25 72, 10 64, 10 48 
                       C 10 26, 28 10, 50 10 Z" 
                    fill="url(#tokenMedallionFrost)"
                    opacity="0.35"
                  />

                  {/* Pure White 4-Point Diamond Sparkles ✦ on the blue side */}
                  {/* Large Center Sparkle */}
                  <path 
                    d="M 42 22 
                       C 42 28, 36 34, 30 34 
                       C 36 34, 42 40, 42 46 
                       C 42 40, 48 34, 54 34 
                       C 48 34, 42 28, 42 22 Z" 
                    fill="#ffffff" 
                  />

                  {/* Small Top-Left Sparkle */}
                  <path 
                    d="M 30 18 
                       C 30 21, 27 24, 24 24 
                       C 27 24, 30 27, 30 30 
                       C 30 27, 33 24, 36 24 
                       C 33 24, 30 21, 30 18 Z" 
                    fill="#ffffff" 
                    opacity="0.9"
                  />

                  {/* Small Lower-Right Sparkle */}
                  <path 
                    d="M 56 46 
                       C 56 48, 54 50, 52 50 
                       C 54 50, 56 52, 56 54 
                       C 56 52, 58 50, 60 50 
                       C 58 50, 56 48, 56 46 Z" 
                    fill="#ffffff" 
                    opacity="0.8"
                  />
                </svg>
              </div>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 leading-tight">
              {language === 'zh' ? (
                <>
                  <span>每一份 token 都</span>
                  <span className="text-[#0284c7] font-black drop-shadow-2xs ml-1">更划算</span>
                </>
              ) : (
                <>
                  <span>Every Token is </span>
                  <span className="text-[#0284c7] font-black drop-shadow-2xs ml-1">More Cost-Effective</span>
                </>
              )}
            </h2>

            {/* Subtitle Lines */}
            <div className="mt-4 sm:mt-6 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-neutral-600 leading-relaxed font-normal">
              {language === 'zh' ? (
                <>
                  <p>现在充值，让每一次调用都跑在更低的成本上。美元余额持续保留在你的</p>
                  <p>账户中，随用随扣。</p>
                </>
              ) : (
                <p>{t.subtitle}</p>
              )}
            </div>

            {/* High-Precision Split Action Button: [ → | 购买 ] */}
            <div className="mt-8 sm:mt-11">
              <button
                id="token-value-buy-btn"
                onClick={onOpenApiKey}
                className="group inline-flex items-stretch rounded-none border border-neutral-900 bg-neutral-900 shadow-sm hover:shadow-md hover:border-black active:scale-98 transition-all overflow-hidden cursor-pointer"
              >
                {/* Left Part: White Square with Crisp Black Arrow */}
                <div className="w-12 h-11 sm:w-14 sm:h-12 bg-white flex items-center justify-center border-r border-neutral-900 group-hover:bg-neutral-50 transition-colors">
                  <ArrowRight className="w-5 h-5 text-neutral-900 stroke-[2] group-hover:translate-x-0.5 transition-transform" />
                </div>

                {/* Right Part: Solid Black Box with White '购买' Text */}
                <div className="px-8 sm:px-10 h-11 sm:h-12 bg-neutral-900 flex items-center justify-center group-hover:bg-neutral-800 transition-colors">
                  <span className="text-sm sm:text-base font-semibold text-white tracking-widest">
                    {t.buyBtn}
                  </span>
                </div>
              </button>
            </div>

            {/* Bottom Bullet Metrics */}
            <div className="mt-8 sm:mt-11 flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 text-xs sm:text-sm md:text-base text-neutral-500 font-normal">
              <span>{t.tag1}</span>
              <span className="text-neutral-400">·</span>
              <span>{t.tag2}</span>
              <span className="text-neutral-400">·</span>
              <span>{t.tag3}</span>
              <span className="text-neutral-400">·</span>
              <span>{t.tag4}</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
