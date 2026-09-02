import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

interface MetricStatsBannerProps {
  onOpenApiKey: () => void;
  onOpenDownload?: () => void;
}

export const MetricStatsBanner: React.FC<MetricStatsBannerProps> = ({ 
  onOpenApiKey
}) => {
  const { language } = useLanguage();
  const t = translations[language].metricsBanner;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 4 Stat Indicators with Dashed Separators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-dashed border-neutral-200">
          
          {/* Stat 1 */}
          <div className="text-center md:text-left px-2 md:border-r border-neutral-100 last:border-r-0">
            <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight font-mono">
              1.4T+
            </div>
            <div className="mt-2 text-xs sm:text-sm text-neutral-500 font-medium">
              {language === 'zh' ? '每日路由 tokens' : 'Daily Routed Tokens'}
            </div>
          </div>

          {/* Stat 2 */}
          <div className="text-center md:text-left px-2 md:border-r border-neutral-100 last:border-r-0">
            <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight font-mono">
              &gt;99%
            </div>
            <div className="mt-2 text-xs sm:text-sm text-neutral-500 font-medium">
              {language === 'zh' ? '提示缓存命中率' : 'Prompt Cache Hit Rate'}
            </div>
          </div>

          {/* Stat 3 */}
          <div className="text-center md:text-left px-2 md:border-r border-neutral-100 last:border-r-0">
            <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight font-mono">
              99.98%
            </div>
            <div className="mt-2 text-xs sm:text-sm text-neutral-500 font-medium">
              {language === 'zh' ? '路由 SLA' : 'Routing SLA'}
            </div>
          </div>

          {/* Stat 4 */}
          <div className="text-center md:text-left px-2">
            <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight">
              {language === 'zh' ? '小时级' : 'Sub-hour'}
            </div>
            <div className="mt-2 text-xs sm:text-sm text-neutral-500 font-medium">
              {language === 'zh' ? '新模型支持速度' : 'New Model Rollout'}
            </div>
          </div>

        </div>

        {/* Prototype Exact 1:1 Pay-as-you-go Banner (Image 1) */}
        <div className="mt-12 relative rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-200/90 shadow-sm">
          
          {/* Background Multi-color Mesh Gradient: Lavender Purple to Cream White to Coral Peach Orange */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(115deg, #c4b5fd 0%, #ddd6fe 20%, #ffffff 50%, #fecdd3 75%, #fb923c 92%, #ea580c 100%)',
            }}
          />

          {/* Dotted Texture Mesh Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-35"
            style={{
              backgroundImage: 'radial-gradient(circle, #475569 1.15px, transparent 1.15px)',
              backgroundSize: '16px 16px',
              backgroundPosition: '8px 8px',
            }}
          />

          {/* Content Container - Centered */}
          <div className="relative z-10 py-16 sm:py-20 md:py-24 px-4 sm:px-8 text-center flex flex-col items-center justify-center">
            
            {/* Headline: 按量付费，用多少付多少 */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-neutral-900 leading-tight">
              {language === 'zh' ? (
                <>
                  <span>按量付费，</span>
                  <span className="bg-gradient-to-r from-[#0284c7] via-[#0ea5e9] to-[#38bdf8] bg-clip-text text-transparent font-black ml-1 drop-shadow-2xs">
                    用多少付多少
                  </span>
                </>
              ) : (
                <>
                  <span>Pay As You Go, </span>
                  <span className="bg-gradient-to-r from-[#0284c7] via-[#0ea5e9] to-[#38bdf8] bg-clip-text text-transparent font-black ml-1 drop-shadow-2xs">
                    Zero Commitment
                  </span>
                </>
              )}
            </h2>

            {/* Subtitle */}
            <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-neutral-700 font-normal max-w-2xl mx-auto leading-relaxed">
              {t.payAsYouGoDesc}
            </p>

            {/* Centered Button */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center">
              {/* Button: Split [ → | 购买额度 ] */}
              <button
                id="banner-buy-credits-btn"
                onClick={onOpenApiKey}
                className="group inline-flex items-stretch rounded-none border border-neutral-900 bg-neutral-900 shadow-xs hover:shadow-md hover:border-black active:scale-98 transition-all overflow-hidden cursor-pointer"
              >
                {/* Left Part: White Square with Crisp Black Arrow */}
                <div className="w-12 h-11 sm:w-13 sm:h-12 bg-white flex items-center justify-center border-r border-neutral-900 group-hover:bg-neutral-50 transition-colors">
                  <ArrowRight className="w-5 h-5 text-neutral-900 stroke-[2] group-hover:translate-x-0.5 transition-transform" />
                </div>

                {/* Right Part: Solid Black Box with White '购买额度' Text */}
                <div className="px-7 sm:px-9 h-11 sm:h-12 bg-neutral-900 flex items-center justify-center group-hover:bg-neutral-800 transition-colors">
                  <span className="text-sm sm:text-base font-semibold text-white tracking-wider">
                    {t.buyCreditsBtn}
                  </span>
                </div>
              </button>
            </div>

            {/* Bottom Bullet Metrics */}
            <div className="mt-7 sm:mt-9 flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-3.5 text-xs sm:text-sm text-neutral-600 font-normal">
              <span>{language === 'zh' ? '美元计费' : 'USD Billing'}</span>
              <span className="text-neutral-400">·</span>
              <span>{language === 'zh' ? '无最低消费' : 'No Minimum'}</span>
              <span className="text-neutral-400">·</span>
              <span>{language === 'zh' ? '随时充值' : 'Instant Top-up'}</span>
              <span className="text-neutral-400">·</span>
              <span>{language === 'zh' ? '支持支付宝 / Stripe' : 'Alipay & Global Cards'}</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

