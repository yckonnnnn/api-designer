import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

export const ProductionRoutingSection: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].routing;

  return (
    <section id="production-routing" className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-Column Section from Image 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Pointillism Cloud Art Canvas (Screenshot Image 1) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[440px] aspect-[4/3] sm:aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-blue-50/50 via-white to-orange-50/50 border border-neutral-100/80 shadow-xs flex items-center justify-center p-8">
              
              {/* Dot Matrix / Pointillism Texture Background */}
              <div 
                className="absolute inset-0 opacity-70 pointer-events-none"
                style={{
                  backgroundImage: `
                    radial-gradient(circle, #60a5fa 1.2px, transparent 1.2px),
                    radial-gradient(circle, #fb923c 1.2px, transparent 1.2px)
                  `,
                  backgroundSize: '16px 16px, 24px 24px',
                  backgroundPosition: '0 0, 8px 8px'
                }}
              />

              {/* Organic Soft Halos */}
              <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-blue-200/40 blur-3xl" />
              <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-orange-200/40 blur-3xl" />

              {/* Central Scalloped Cloud Badge with Lightning Bolt (Exact match to Image 1) */}
              <div className="relative z-10">
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center">
                  
                  {/* Outer Pulsing Glow */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400 via-purple-300 to-orange-400 blur-xl opacity-60 animate-pulse" />
                  
                  {/* Scalloped Cloud Shape SVG */}
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
                    <defs>
                      <linearGradient id="cloudSunsetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="35%" stopColor="#818cf8" />
                        <stop offset="65%" stopColor="#f472b6" />
                        <stop offset="100%" stopColor="#fb923c" />
                      </linearGradient>
                      <filter id="badgeShadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="6" stdDeviation="6" floodOpacity="0.25" floodColor="#f97316" />
                      </filter>
                    </defs>

                    {/* 10-Lobed Soft Cloud / Flower Outline */}
                    <path
                      d="M 50 12
                         C 58 12, 65 17, 68 24
                         C 76 23, 83 29, 84 37
                         C 91 41, 93 50, 90 58
                         C 93 66, 88 75, 80 78
                         C 78 86, 70 91, 62 90
                         C 55 95, 45 95, 38 90
                         C 30 91, 22 86, 20 78
                         C 12 75, 7 66, 10 58
                         C 7 50, 9 41, 16 37
                         C 17 29, 24 23, 32 24
                         C 35 17, 42 12, 50 12 Z"
                      fill="url(#cloudSunsetGrad)"
                      filter="url(#badgeShadow)"
                    />
                    
                    {/* Inner Highlights */}
                    <path
                      d="M 50 15
                         C 56 15, 62 19, 65 25
                         C 72 24, 78 29, 79 36
                         C 85 40, 87 47, 84 54
                         C 87 61, 83 69, 76 72
                         C 74 79, 67 83, 60 82
                         C 54 87, 46 87, 40 82
                         C 33 83, 26 79, 24 72
                         C 17 69, 13 61, 16 54
                         C 13 47, 15 40, 21 36
                         C 22 29, 28 24, 35 25
                         C 38 19, 44 15, 50 15 Z"
                      fill="none"
                      stroke="rgba(255,255,255,0.4)"
                      strokeWidth="1.5"
                    />

                    {/* Lightning Flash Glyph */}
                    <path
                      d="M 54 28 
                         L 38 52 
                         H 50 
                         L 46 72 
                         L 64 46 
                         H 51 
                         L 54 28 Z"
                      fill="#ffffff"
                      className="drop-shadow-md"
                    />
                  </svg>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Title + Intro + 4 Dashed Parameter Rows (Exact match to Image 1) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Title & Description */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
                {t.title}
              </h2>
              <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl font-normal">
                {t.desc}
              </p>
            </div>

            {/* 4 Key Metric Rows with Dashed Dividers */}
            <div className="space-y-4 pt-2">
              
              {/* Row 1: 价格 */}
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-10 pb-4 border-b border-dashed border-neutral-300">
                <span className="w-16 text-sm text-neutral-400 shrink-0 font-normal">
                  {t.priceLabel}
                </span>
                <span className="text-sm sm:text-base font-medium text-neutral-900">
                  {t.priceValue}
                </span>
              </div>

              {/* Row 2: 延迟 */}
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-10 pb-4 border-b border-dashed border-neutral-300">
                <span className="w-16 text-sm text-neutral-400 shrink-0 font-normal">
                  {t.latencyLabel}
                </span>
                <span className="text-sm sm:text-base font-medium text-neutral-900">
                  {t.latencyValue}
                </span>
              </div>

              {/* Row 3: 适用 */}
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-10 pb-4 border-b border-dashed border-neutral-300">
                <span className="w-16 text-sm text-neutral-400 shrink-0 font-normal">
                  {t.applyLabel}
                </span>
                <span className="text-sm sm:text-base font-medium text-neutral-900">
                  {t.applyValue}
                </span>
              </div>

              {/* Row 4: 保障 */}
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-10 pb-4 border-b border-dashed border-neutral-300">
                <span className="w-16 text-sm text-neutral-400 shrink-0 font-normal">
                  {t.guaranteeLabel}
                </span>
                <span className="text-sm sm:text-base font-medium text-neutral-900">
                  {t.guaranteeValue}
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
