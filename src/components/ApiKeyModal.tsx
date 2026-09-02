import React, { useState } from 'react';
import { KeyRound, Copy, Check, Shield, Zap, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState('sk-fyt-8a9d7f6e5c4b3a210987654321fedcba');
  const [copied, setCopied] = useState(false);
  const { language } = useLanguage();
  const t = translations[language].apiKeyModal;

  if (!isOpen) return null;

  const handleGenerateKey = () => {
    const chars = 'abcdef0123456789';
    let rand = '';
    for (let i = 0; i < 32; i++) {
      rand += chars[Math.floor(Math.random() * chars.length)];
    }
    setApiKey(`sk-fyt-${rand}`);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
              <KeyRound className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900">
              {t.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          
          <div className="p-4 rounded-xl bg-orange-50/60 border border-orange-200/80 text-xs text-orange-950 leading-relaxed">
            <span className="font-bold">{t.benefitBadge}</span>{t.benefitDesc}
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
              {t.label}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={apiKey}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-xs font-mono text-neutral-800 select-all focus:outline-hidden focus:ring-1 focus:ring-orange-500"
              />
              <button
                onClick={handleCopy}
                className="px-3.5 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? t.copied : t.copy}</span>
              </button>
            </div>
          </div>

          {/* Quick Endpoint Guide */}
          <div className="bg-neutral-900 text-neutral-300 p-3.5 rounded-xl font-mono text-xs space-y-1">
            <div className="text-neutral-500 font-sans text-[11px]">{t.configTitle}</div>
            <div>Base URL: <span className="text-orange-400">https://api.fytapi.com/v1</span></div>
            <div>Auth: <span className="text-emerald-400">Bearer {apiKey.slice(0, 12)}...</span></div>
          </div>

          {/* Features Checkbox list */}
          <div className="grid grid-cols-2 gap-2 text-xs text-neutral-600 font-medium">
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.feature1}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-orange-500" />
              <span>{t.feature2}</span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between">
          <button
            onClick={handleGenerateKey}
            className="text-xs text-neutral-600 hover:text-neutral-900 font-medium underline cursor-pointer"
          >
            {t.regenerate}
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            {t.confirm}
          </button>
        </div>

      </div>
    </div>
  );
};
