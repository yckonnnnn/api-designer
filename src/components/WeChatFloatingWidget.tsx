import React, { useState } from 'react';
import { X, Copy, Check, QrCode } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

export const WeChatFloatingWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  const { language } = useLanguage();
  const t = translations[language].wechat;
  const wechatId = 'FYT_API_SUPPORT';

  const handleCopyId = () => {
    navigator.clipboard.writeText(wechatId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside aria-label="微信支持助手" className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {isOpen ? (
        <div className="w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-neutral-200/90 p-4 animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Card Header */}
          <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
            <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{t.title}</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-md transition-colors cursor-pointer"
              title="最小化"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* QR Code Placeholder Graphic */}
          <div className="my-3 flex flex-col items-center justify-center p-2.5 bg-neutral-50 rounded-xl border border-neutral-100">
            {/* Styled QR Code Box with brand mark */}
            <div className="relative w-36 h-36 bg-white p-2 rounded-lg border border-neutral-200 flex flex-col items-center justify-center shadow-2xs">
              <svg viewBox="0 0 100 100" className="w-full h-full text-neutral-900" fill="currentColor">
                {/* Simulated high density QR Pattern */}
                <rect x="5" y="5" width="28" height="28" rx="4" fill="none" stroke="currentColor" strokeWidth="6" />
                <rect x="13" y="13" width="12" height="12" rx="2" />
                
                <rect x="67" y="5" width="28" height="28" rx="4" fill="none" stroke="currentColor" strokeWidth="6" />
                <rect x="75" y="13" width="12" height="12" rx="2" />
                
                <rect x="5" y="67" width="28" height="28" rx="4" fill="none" stroke="currentColor" strokeWidth="6" />
                <rect x="13" y="75" width="12" height="12" rx="2" />

                {/* Random QR clusters */}
                <rect x="38" y="10" width="8" height="6" />
                <rect x="50" y="8" width="6" height="8" />
                <rect x="42" y="24" width="8" height="8" />
                
                <rect x="10" y="42" width="6" height="12" />
                <rect x="22" y="40" width="10" height="6" />
                <rect x="20" y="52" width="8" height="6" />

                <rect x="40" y="40" width="20" height="20" rx="4" fill="#f97316" />
                
                <rect x="68" y="40" width="8" height="8" />
                <rect x="80" y="44" width="12" height="6" />
                <rect x="70" y="56" width="6" height="10" />
                <rect x="84" y="56" width="8" height="8" />

                <rect x="40" y="68" width="10" height="8" />
                <rect x="56" y="72" width="8" height="14" />
                <rect x="40" y="82" width="12" height="8" />
                <rect x="70" y="72" width="10" height="8" />
                <rect x="84" y="80" width="8" height="12" />
              </svg>
            </div>

            <span className="text-[11px] text-neutral-500 font-medium mt-2">
              {t.supportRole}
            </span>
          </div>

          {/* Wechat ID copy button */}
          <div className="flex items-center justify-between gap-1 text-[11px] bg-neutral-100/80 px-2.5 py-1.5 rounded-lg text-neutral-700">
            <span className="font-mono text-neutral-800">{language === 'zh' ? '微信号: ' : 'WeChat ID: '}{wechatId}</span>
            <button
              onClick={handleCopyId}
              className="text-orange-600 font-semibold hover:text-orange-700 flex items-center gap-0.5 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-600" />
                  <span className="text-green-600">{t.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{t.copy}</span>
                </>
              )}
            </button>
          </div>

        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-neutral-900 text-white shadow-xl hover:bg-neutral-800 transition-all text-xs font-semibold hover:scale-105 active:scale-95 cursor-pointer"
        >
          <QrCode className="w-4 h-4 text-emerald-400" />
          <span>{t.btnText}</span>
        </button>
      )}
    </aside>
  );
};
