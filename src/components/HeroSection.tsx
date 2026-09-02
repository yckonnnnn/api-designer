import React, { useState, useEffect } from 'react';
import { 
  KeyRound, 
  Copy, 
  Check, 
  ChevronDown,
  ArrowUpRight,
  Database,
  RefreshCw,
  FileText,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

interface HeroSectionProps {
  onOpenApiKey: () => void;
  onOpenDownload?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenApiKey }) => {
  const [copied, setCopied] = useState(false);
  const [selectedProtocol, setSelectedProtocol] = useState<'openai' | 'anthropic' | 'gemini'>('openai');
  const [protocolDropdownOpen, setProtocolDropdownOpen] = useState(false);
  const [activeModel, setActiveModel] = useState<'claude' | 'gpt' | 'gemini'>('gpt');
  const [activeAgent, setActiveAgent] = useState<'claude-code' | 'codex' | 'cc-switch' | 'openclaw'>('codex');

  const { language } = useLanguage();
  const t = translations[language].hero;

  const endpointUrl = selectedProtocol === 'openai' 
    ? 'https://api.fytapi.com/v1' 
    : selectedProtocol === 'anthropic'
    ? 'https://api.fytapi.com/anthropic/v1'
    : 'https://api.fytapi.com/gemini/v1';

  const handleCopy = () => {
    navigator.clipboard.writeText(endpointUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-b from-[#fefbf6] via-[#fff8f0] to-[#fcfaf7] border-b border-neutral-200/80">
      
      {/* Background Decorative Soft Warm Radial Highlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-orange-300/20 via-amber-200/25 to-rose-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-35 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Title Group */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-neutral-900 leading-[1.15]">
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-500 bg-clip-text text-transparent">
              Agent
            </span>{' '}
            {language === 'zh' ? '接入' : 'Access'}
            <br />
            {language === 'zh' ? '大模型的统一入口' : 'Unified Gateway to Premier LLMs'}
          </h1>

          <p className="mt-5 text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto font-normal">
            {language === 'zh'
              ? '专为 Agent 与企业级开发者打造。一次对接，享超低折扣、多通道毫秒容灾与原生 Prompt 缓存。'
              : 'Engineered for AI agents and enterprise developers. Unified API access, wholesale discounts, sub-millisecond multi-cloud failover, and native prompt caching.'}
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            {/* API Key Button */}
            <button
              id="hero-get-apikey-btn"
              onClick={onOpenApiKey}
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-neutral-900 text-white font-semibold text-sm sm:text-base hover:bg-neutral-800 active:scale-95 transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              <KeyRound className="w-4 h-4 text-orange-400 group-hover:rotate-12 transition-transform" />
              <span>{t.getApiKeyBtn}</span>
            </button>
          </div>

          {/* API Endpoint Input Box */}
          <div className="mt-7 flex items-center justify-center">
            <div className="inline-flex items-center bg-white border border-neutral-200/90 rounded-xl p-1 shadow-xs max-w-full overflow-hidden">
              {/* Protocol selector */}
              <div className="relative">
                <button
                  onClick={() => setProtocolDropdownOpen(!protocolDropdownOpen)}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs sm:text-sm font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
                >
                  <span>
                    {selectedProtocol === 'openai' && t.openaiProtocol}
                    {selectedProtocol === 'anthropic' && t.anthropicProtocol}
                    {selectedProtocol === 'gemini' && t.geminiProtocol}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                </button>

                {protocolDropdownOpen && (
                  <div className="absolute left-0 top-full mt-1 w-40 bg-white border border-neutral-200 rounded-xl shadow-lg py-1 z-30 text-left text-xs font-medium">
                    <button
                      onClick={() => {
                        setSelectedProtocol('openai');
                        setProtocolDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-neutral-50 text-neutral-800 cursor-pointer"
                    >
                      {t.openaiProtocol}
                    </button>
                    <button
                      onClick={() => {
                        setSelectedProtocol('anthropic');
                        setProtocolDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-neutral-50 text-neutral-800 cursor-pointer"
                    >
                      {t.anthropicProtocol}
                    </button>
                    <button
                      onClick={() => {
                        setSelectedProtocol('gemini');
                        setProtocolDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-neutral-50 text-neutral-800 cursor-pointer"
                    >
                      {t.geminiProtocol}
                    </button>
                  </div>
                )}
              </div>

              <div className="h-4 w-px bg-neutral-200 mx-1" />

              {/* Endpoint text */}
              <code className="px-3 py-1 text-xs sm:text-sm font-mono text-neutral-800 select-all truncate max-w-[200px] sm:max-w-none">
                {endpointUrl.replace('/v1', '')}/<span className="text-orange-600 font-semibold">v1</span>
              </code>

              {/* Copy button */}
              <button
                id="hero-copy-endpoint-btn"
                onClick={handleCopy}
                className="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-all ml-1"
                title="复制端点"
              >
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* High-Fidelity Interactive Hero Topology Banner (Faithful to image.png) */}
        {/* ========================================================================= */}
        <div className="mt-14 relative w-full max-w-6xl mx-auto rounded-3xl p-6 sm:p-10 shadow-lg border border-orange-200/60 overflow-hidden"
             style={{
               background: 'radial-gradient(ellipse at 50% 50%, #f97316 0%, #ea580c 25%, #fed7aa 65%, #bae6fd 100%)',
             }}
        >
          {/* Internal Diffuse Glowing Lighting Layers to match image.png */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-100/90 via-orange-300/40 to-sky-100/90 mix-blend-screen pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(255,255,255,0.4)_100%)] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-400/50 rounded-full blur-3xl pointer-events-none" />

          {/* Top Category Headers matching screenshot */}
          <div className="relative z-10 flex justify-between items-center text-xs font-bold tracking-wider text-neutral-700/80 mb-6 px-4">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-neutral-600 rounded-xs" />
              {language === 'zh' ? '全球模型直连' : 'GLOBAL MODEL DIRECT'}
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-neutral-600 rounded-xs" />
              {language === 'zh' ? 'AGENT 客户端' : 'AGENT CLIENTS'}
            </span>
          </div>

          {/* Main Network Graph with Multi-Fiber Bundles */}
          <div className="relative z-10 min-h-[320px] sm:min-h-[360px] flex items-center justify-between">
            
            {/* SVG Wire Harness / Fiber Bundles Overlay */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
              viewBox="0 0 1000 360"
              preserveAspectRatio="none"
            >
              <defs>
                {/* Gradients for left fiber strands */}
                <linearGradient id="fiberLeftClaude" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#d97706" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#f97316" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
                </linearGradient>

                <linearGradient id="fiberLeftGPT" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.7" />
                  <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
                </linearGradient>

                <linearGradient id="fiberLeftGemini" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.7" />
                  <stop offset="50%" stopColor="#fb923c" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
                </linearGradient>

                {/* Gradients for right fiber strands */}
                <linearGradient id="fiberRightClaudeCode" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#fb923c" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#d97706" stopOpacity="0.8" />
                </linearGradient>

                <linearGradient id="fiberRightCodex" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#ec4899" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
                </linearGradient>

                <linearGradient id="fiberRightCCSwitch" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
                </linearGradient>

                <linearGradient id="fiberRightOpenClaw" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#f97316" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.8" />
                </linearGradient>

                {/* Filter for smooth glow on fibers */}
                <filter id="fiberGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* ================= LEFT FIBER BUNDLES (Models to Center) ================= */}
              
              {/* Claude Bundle (Top Left -> Center) */}
              <g opacity={activeModel === 'claude' ? '1' : '0.65'}>
                {/* Secondary strands */}
                <path d="M 170 58 C 310 58, 380 180, 465 180" fill="none" stroke="url(#fiberLeftClaude)" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />
                <path d="M 170 64 C 330 64, 400 178, 465 178" fill="none" stroke="url(#fiberLeftClaude)" strokeWidth="1" opacity="0.5" />
                <path d="M 170 60 C 320 60, 390 180, 465 180" fill="none" stroke="url(#fiberLeftClaude)" strokeWidth="2.5" filter="url(#fiberGlow)" />
                {/* Flowing particle pulses */}
                <circle r="3" fill="#ffffff">
                  <animateMotion path="M 170 60 C 320 60, 390 180, 465 180" dur="2.4s" repeatCount="indefinite" />
                </circle>
              </g>

              {/* GPT Bundle (Middle Left -> Center) */}
              <g opacity={activeModel === 'gpt' ? '1' : '0.65'}>
                {/* Secondary strands */}
                <path d="M 155 177 C 260 177, 360 180, 465 180" fill="none" stroke="url(#fiberLeftGPT)" strokeWidth="1.2" strokeDasharray="4 2" opacity="0.6" />
                <path d="M 155 183 C 270 183, 370 180, 465 180" fill="none" stroke="url(#fiberLeftGPT)" strokeWidth="1" opacity="0.5" />
                <path d="M 155 180 C 265 180, 365 180, 465 180" fill="none" stroke="url(#fiberLeftGPT)" strokeWidth="2.5" filter="url(#fiberGlow)" />
                {/* Flowing particle pulses */}
                <circle r="3" fill="#ffffff">
                  <animateMotion path="M 155 180 C 265 180, 365 180, 465 180" dur="1.8s" repeatCount="indefinite" />
                </circle>
              </g>

              {/* Gemini Bundle (Bottom Left -> Center) */}
              <g opacity={activeModel === 'gemini' ? '1' : '0.65'}>
                {/* Secondary strands */}
                <path d="M 170 298 C 310 298, 380 180, 465 180" fill="none" stroke="url(#fiberLeftGemini)" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />
                <path d="M 170 304 C 330 304, 400 182, 465 182" fill="none" stroke="url(#fiberLeftGemini)" strokeWidth="1" opacity="0.5" />
                <path d="M 170 300 C 320 300, 390 180, 465 180" fill="none" stroke="url(#fiberLeftGemini)" strokeWidth="2.5" filter="url(#fiberGlow)" />
                {/* Flowing particle pulses */}
                <circle r="3" fill="#ffffff">
                  <animateMotion path="M 170 300 C 320 300, 390 180, 465 180" dur="2.2s" repeatCount="indefinite" />
                </circle>
              </g>

              {/* ================= RIGHT FIBER BUNDLES (Center to Agents) ================= */}

              {/* Claude Code Bundle (Center -> Top Right) */}
              <g opacity={activeAgent === 'claude-code' ? '1' : '0.65'}>
                <path d="M 535 180 C 620 180, 690 50, 830 50" fill="none" stroke="url(#fiberRightClaudeCode)" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />
                <path d="M 535 178 C 610 178, 680 52, 830 52" fill="none" stroke="url(#fiberRightClaudeCode)" strokeWidth="1" opacity="0.5" />
                <path d="M 535 180 C 615 180, 685 50, 830 50" fill="none" stroke="url(#fiberRightClaudeCode)" strokeWidth="2.5" filter="url(#fiberGlow)" />
                <circle r="3" fill="#ffffff">
                  <animateMotion path="M 535 180 C 615 180, 685 50, 830 50" dur="2.1s" repeatCount="indefinite" />
                </circle>
              </g>

              {/* Codex Bundle (Center -> Middle-Top Right) */}
              <g opacity={activeAgent === 'codex' ? '1' : '0.65'}>
                <path d="M 535 180 C 630 180, 710 126, 860 126" fill="none" stroke="url(#fiberRightCodex)" strokeWidth="1.2" strokeDasharray="4 2" opacity="0.6" />
                <path d="M 535 182 C 640 182, 720 128, 860 128" fill="none" stroke="url(#fiberRightCodex)" strokeWidth="1" opacity="0.5" />
                <path d="M 535 180 C 635 180, 715 126, 860 126" fill="none" stroke="url(#fiberRightCodex)" strokeWidth="2.5" filter="url(#fiberGlow)" />
                <circle r="3" fill="#ffffff">
                  <animateMotion path="M 535 180 C 635 180, 715 126, 860 126" dur="1.7s" repeatCount="indefinite" />
                </circle>
              </g>

              {/* CC Switch Bundle (Center -> Middle-Bottom Right) */}
              <g opacity={activeAgent === 'cc-switch' ? '1' : '0.65'}>
                <path d="M 535 180 C 630 180, 710 216, 840 216" fill="none" stroke="url(#fiberRightCCSwitch)" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />
                <path d="M 535 178 C 640 178, 720 214, 840 214" fill="none" stroke="url(#fiberRightCCSwitch)" strokeWidth="1" opacity="0.5" />
                <path d="M 535 180 C 635 180, 715 216, 840 216" fill="none" stroke="url(#fiberRightCCSwitch)" strokeWidth="2.5" filter="url(#fiberGlow)" />
                <circle r="3" fill="#ffffff">
                  <animateMotion path="M 535 180 C 635 180, 715 216, 840 216" dur="2.0s" repeatCount="indefinite" />
                </circle>
              </g>

              {/* OpenClaw Bundle (Center -> Bottom Right) */}
              <g opacity={activeAgent === 'openclaw' ? '1' : '0.65'}>
                <path d="M 535 180 C 620 180, 690 306, 840 306" fill="none" stroke="url(#fiberRightOpenClaw)" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />
                <path d="M 535 182 C 610 182, 680 304, 840 304" fill="none" stroke="url(#fiberRightOpenClaw)" strokeWidth="1" opacity="0.5" />
                <path d="M 535 180 C 615 180, 685 306, 840 306" fill="none" stroke="url(#fiberRightOpenClaw)" strokeWidth="2.5" filter="url(#fiberGlow)" />
                <circle r="3" fill="#ffffff">
                  <animateMotion path="M 535 180 C 615 180, 685 306, 840 306" dur="2.3s" repeatCount="indefinite" />
                </circle>
              </g>
            </svg>

            {/* LEFT COLUMN: Model Cards */}
            <div className="flex flex-col justify-between space-y-6 sm:space-y-8 z-10 w-36 sm:w-44">
              
              {/* Claude */}
              <button
                onClick={() => setActiveModel('claude')}
                className={`group flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/95 backdrop-blur-md transition-all shadow-md hover:shadow-lg border ${
                  activeModel === 'claude' 
                    ? 'border-orange-400 ring-2 ring-orange-300/60 scale-105' 
                    : 'border-white/80 hover:scale-102'
                }`}
              >
                {/* Official Anthropic Claude Organic Sunburst / Asterisk Logo */}
                <div className="w-8 h-8 shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#cc785c">
                    {/* Anthropic Claude Official Multi-Ray Sunburst Asterisk */}
                    <path d="M13.85 2.15a1.2 1.2 0 0 0-1.7 0l-.85.85a1.2 1.2 0 0 0 0 1.7l1.4 1.4-2.7 1.12-2.7-1.12 1.4-1.4a1.2 1.2 0 0 0 0-1.7l-.85-.85a1.2 1.2 0 0 0-1.7 0l-3.7 3.7a1.2 1.2 0 0 0 0 1.7l.85.85a1.2 1.2 0 0 0 1.7 0l1.4-1.4 1.12 2.7-1.12 2.7-1.4-1.4a1.2 1.2 0 0 0-1.7 0l-.85.85a1.2 1.2 0 0 0 0 1.7l3.7 3.7a1.2 1.2 0 0 0 1.7 0l.85-.85a1.2 1.2 0 0 0 0-1.7l-1.4-1.4 2.7-1.12 2.7 1.12-1.4 1.4a1.2 1.2 0 0 0 0 1.7l.85.85a1.2 1.2 0 0 0 1.7 0l3.7-3.7a1.2 1.2 0 0 0 0-1.7l-.85-.85a1.2 1.2 0 0 0-1.7 0l-1.4 1.4-1.12-2.7 1.12-2.7 1.4 1.4a1.2 1.2 0 0 0 1.7 0l.85-.85a1.2 1.2 0 0 0 0-1.7l-3.7-3.7z" opacity="0" />
                    {/* High Precision Anthropic Claude Mark */}
                    <path d="M4.5 10.2c-.3 0-.6.2-.7.5l-.6 1.8c-.1.4.1.8.5.9l2.8.9-1.8 2.4c-.2.3-.2.8.1 1l1.4 1.1c.3.2.8.2 1-.1l1.8-2.4.9 2.8c.1.4.5.6.9.5l1.8-.6c.4-.1.6-.5.5-.9l-.9-2.8 2.8.9c.4.1.8-.1.9-.5l.6-1.8c.1-.4-.1-.8-.5-.9l-2.8-.9 1.8-2.4c.2-.3.2-.8-.1-1l-1.4-1.1c-.3-.2-.8-.2-1 .1L10.5 9l-.9-2.8c-.1-.4-.5-.6-.9-.5l-1.8.6c-.4.1-.6.5-.5.9l.9 2.8-2.8-.9c-.1-.1-.3-.1-.4-.1z" opacity="0" />
                    {/* Realistic Anthropic Claude Sunburst Vector */}
                    <g transform="translate(12,12)">
                      {[0, 25.7, 51.4, 77.1, 102.8, 128.5, 154.2, 180, 205.7, 231.4, 257.1, 282.8, 308.5, 334.2].map((angle, idx) => {
                        const len = idx % 2 === 0 ? 10 : 8.5;
                        const width = idx % 2 === 0 ? 2.4 : 1.8;
                        return (
                          <line
                            key={idx}
                            x1="0"
                            y1="0"
                            x2={len * Math.cos((angle * Math.PI) / 180)}
                            y2={len * Math.sin((angle * Math.PI) / 180)}
                            stroke="#cc785c"
                            strokeWidth={width}
                            strokeLinecap="round"
                          />
                        );
                      })}
                      <circle cx="0" cy="0" r="3.2" fill="#cc785c" />
                    </g>
                  </svg>
                </div>
                <span className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight">Claude</span>
              </button>

              {/* GPT */}
              <button
                onClick={() => setActiveModel('gpt')}
                className={`group flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/95 backdrop-blur-md transition-all shadow-md hover:shadow-lg border ${
                  activeModel === 'gpt' 
                    ? 'border-neutral-900 ring-2 ring-neutral-700/40 scale-105' 
                    : 'border-white/80 hover:scale-102'
                }`}
              >
                {/* Official OpenAI 6-Segment Interlocking Spiral Logo */}
                <div className="w-8 h-8 shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-neutral-900" fill="currentColor">
                    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.5045 4.5045 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4998 4.4998 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.5045 4.5045 0 0 1 2.3408 7.8956zm16.0993 3.8558L12.5973 8.3829l2.02-1.1638a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.495 4.495 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.4022-.6813zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4998 4.4998 0 0 1 6.1802 2.3168zm-7.6833-2.7203l-2.02-1.1685a.071.071 0 0 1-.038-.052V.2166a4.5045 4.5045 0 0 1 7.3756 3.4536l-.142.0805-4.783 2.7582a.7948.7948 0 0 0-.3926.6813v6.7369zm-2.02 4.0416l-3.0475 1.7607v-3.5214l3.0475-1.7607 3.0475 1.7607v3.5214z" />
                  </svg>
                </div>
                <span className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight">GPT</span>
              </button>

              {/* Gemini */}
              <button
                onClick={() => setActiveModel('gemini')}
                className={`group flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/95 backdrop-blur-md transition-all shadow-md hover:shadow-lg border ${
                  activeModel === 'gemini' 
                    ? 'border-blue-400 ring-2 ring-blue-300/60 scale-105' 
                    : 'border-white/80 hover:scale-102'
                }`}
              >
                {/* Official Google Gemini Sparkle 4-pointed Star Gradient Logo */}
                <div className="w-8 h-8 shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 28 28" className="w-7 h-7">
                    <defs>
                      <linearGradient id="geminiStarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1a73e8" />
                        <stop offset="35%" stopColor="#4285f4" />
                        <stop offset="70%" stopColor="#9b51e0" />
                        <stop offset="100%" stopColor="#e8710a" />
                      </linearGradient>
                    </defs>
                    <path 
                      d="M14 2C14 8.627 8.627 14 2 14C8.627 14 14 19.373 14 26C14 19.373 19.373 14 26 14C19.373 14 14 8.627 14 2Z" 
                      fill="url(#geminiStarGrad)" 
                    />
                  </svg>
                </div>
                <span className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight">Gemini</span>
              </button>
            </div>

            {/* CENTER: Smart Dispatch Node (智能调度) matching image.png */}
            <div className="flex flex-col items-center justify-center z-20">
              <div className="relative flex items-center justify-center">
                {/* Glowing ambient ring */}
                <div className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white/40 blur-xl animate-pulse" />
                <div className="absolute w-24 h-24 rounded-full bg-orange-200/50 blur-lg" />
                
                {/* Center Glowing Glass Orb */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/90 backdrop-blur-md p-1.5 shadow-2xl border-2 border-white flex flex-col items-center justify-center">
                  <div className="w-full h-full rounded-full bg-gradient-to-tr from-amber-100 via-orange-50 to-blue-50 flex items-center justify-center shadow-inner">
                    {/* Smart Dispatch Mascot matching image 1 */}
                    <svg viewBox="0 0 100 100" className="w-10 h-10 text-neutral-900" fill="currentColor">
                      <path d="M 50 14 C 28 14, 16 28, 16 48 C 16 58, 20 66, 28 72 L 22 84 C 21.2 85.6, 23 87, 24.5 86 L 36 78.5 C 40.5 80.5, 45 81.5, 50 81.5 C 72 81.5, 84 67.5, 84 48 C 84 28, 72 14, 50 14 Z" />
                      <ellipse cx="39" cy="46" rx="5.5" ry="3.2" fill="#ffffff" />
                      <ellipse cx="61" cy="46" rx="5.5" ry="3.2" fill="#ffffff" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Label below hub matching image.png: ● 智能调度 */}
              <div className="mt-3 flex items-center gap-1.5 text-sm sm:text-base font-extrabold text-neutral-900 tracking-tight drop-shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-600 animate-pulse shadow-sm" />
                <span>智能调度</span>
              </div>
            </div>

            {/* RIGHT COLUMN: Agent Client Cards */}
            <div className="flex flex-col justify-between space-y-3.5 sm:space-y-4 z-10 w-44 sm:w-52">
              
              {/* Claude Code */}
              <button
                onClick={() => setActiveAgent('claude-code')}
                className={`group flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md transition-all shadow-md hover:shadow-lg border ${
                  activeAgent === 'claude-code'
                    ? 'border-orange-400 ring-2 ring-orange-300/60 scale-105'
                    : 'border-white/80 hover:scale-102'
                }`}
              >
                {/* Official Claude Code Pixel Art Terracotta Mascot from image.png */}
                <div className="w-8 h-8 shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#c96442">
                    {/* Retro Pixel Mascot / Crab Robot */}
                    <rect x="5" y="4" width="2.5" height="2.5" rx="0.5" />
                    <rect x="16.5" y="4" width="2.5" height="2.5" rx="0.5" />
                    <rect x="3" y="7" width="18" height="9" rx="1.5" />
                    {/* Cutout eyes */}
                    <rect x="6.5" y="9.5" width="3" height="3" fill="#ffffff" rx="0.5" />
                    <rect x="14.5" y="9.5" width="3" height="3" fill="#ffffff" rx="0.5" />
                    {/* Bottom feet */}
                    <rect x="4" y="17" width="3" height="2.5" rx="0.5" />
                    <rect x="10.5" y="17" width="3" height="2.5" rx="0.5" />
                    <rect x="17" y="17" width="3" height="2.5" rx="0.5" />
                  </svg>
                </div>
                <span className="text-sm sm:text-base font-bold text-neutral-900 tracking-tight">Claude Code</span>
              </button>

              {/* Codex */}
              <button
                onClick={() => setActiveAgent('codex')}
                className={`group flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md transition-all shadow-md hover:shadow-lg border ${
                  activeAgent === 'codex'
                    ? 'border-blue-400 ring-2 ring-blue-300/60 scale-105'
                    : 'border-white/80 hover:scale-102'
                }`}
              >
                {/* Official Codex Cloud / Scalloped Prompt Badge from image.png */}
                <div className="w-8 h-8 shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 28 28" className="w-7 h-7">
                    <defs>
                      <linearGradient id="codexBadgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                    {/* Scalloped soft cloud polygon badge */}
                    <path
                      d="M14 2C16.5 2 18.8 3.3 20 5.4C22.2 5.5 24 7.2 24.2 9.4C25.9 11 26.5 13.5 25.7 15.8C26 18.2 24.7 20.5 22.5 21.6C21.4 23.5 19.3 24.7 17 24.8C15 26.2 12.3 26.1 10.4 24.7C8.2 24.5 6.3 23.1 5.4 21.1C3.3 19.9 2.2 17.5 2.6 15.1C2 12.8 2.8 10.4 4.7 8.9C5.1 6.7 6.9 5.1 9.1 5.1C10.4 3.2 12.1 2 14 2Z"
                      fill="url(#codexBadgeGrad)"
                    />
                    {/* Terminal prompt symbol >_ */}
                    <path
                      d="M9 11L12.5 14L9 17"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <line
                      x1="14"
                      y1="17"
                      x2="18.5"
                      y2="17"
                      stroke="#ffffff"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <span className="text-sm sm:text-base font-bold text-neutral-900 tracking-tight">Codex</span>
              </button>

              {/* CC Switch */}
              <button
                onClick={() => setActiveAgent('cc-switch')}
                className={`group flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md transition-all shadow-md hover:shadow-lg border ${
                  activeAgent === 'cc-switch'
                    ? 'border-amber-400 ring-2 ring-amber-300/60 scale-105'
                    : 'border-white/80 hover:scale-102'
                }`}
              >
                {/* Official CC Switch Rainbow Multi-Color Pinwheel Logo from image.png */}
                <div className="w-8 h-8 shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 28 28" className="w-7 h-7">
                    {/* 8 colorful radial spokes / petals */}
                    <circle cx="14" cy="14" r="2.8" fill="#f59e0b" />
                    <line x1="14" y1="3" x2="14" y2="8" stroke="#ef4444" strokeWidth="2.8" strokeLinecap="round" />
                    <line x1="14" y1="20" x2="14" y2="25" stroke="#10b981" strokeWidth="2.8" strokeLinecap="round" />
                    <line x1="3" y1="14" x2="8" y2="14" stroke="#3b82f6" strokeWidth="2.8" strokeLinecap="round" />
                    <line x1="20" y1="14" x2="25" y2="14" stroke="#8b5cf6" strokeWidth="2.8" strokeLinecap="round" />
                    <line x1="6.2" y1="6.2" x2="9.8" y2="9.8" stroke="#f97316" strokeWidth="2.8" strokeLinecap="round" />
                    <line x1="18.2" y1="18.2" x2="21.8" y2="21.8" stroke="#06b6d4" strokeWidth="2.8" strokeLinecap="round" />
                    <line x1="6.2" y1="21.8" x2="9.8" y2="18.2" stroke="#eab308" strokeWidth="2.8" strokeLinecap="round" />
                    <line x1="18.2" y1="9.8" x2="21.8" y2="6.2" stroke="#ec4899" strokeWidth="2.8" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-sm sm:text-base font-bold text-neutral-900 tracking-tight">CC Switch</span>
              </button>

              {/* OpenClaw */}
              <button
                onClick={() => setActiveAgent('openclaw')}
                className={`group flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md transition-all shadow-md hover:shadow-lg border ${
                  activeAgent === 'openclaw'
                    ? 'border-red-400 ring-2 ring-red-300/60 scale-105'
                    : 'border-white/80 hover:scale-102'
                }`}
              >
                {/* Official OpenClaw Cute Red Crab Mascot from image.png */}
                <div className="w-8 h-8 shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 28 28" className="w-7 h-7" fill="#dc2626">
                    {/* Cute round crab body */}
                    <ellipse cx="14" cy="15" rx="8" ry="6.5" />
                    
                    {/* Big anime eyes on top */}
                    <circle cx="10" cy="8.5" r="2.8" fill="#dc2626" />
                    <circle cx="18" cy="8.5" r="2.8" fill="#dc2626" />
                    <circle cx="10" cy="8.5" r="1.8" fill="#ffffff" />
                    <circle cx="18" cy="8.5" r="1.8" fill="#ffffff" />
                    <circle cx="10.5" cy="8" r="0.9" fill="#1e293b" />
                    <circle cx="18.5" cy="8" r="0.9" fill="#1e293b" />

                    {/* Raised Cute Claws / Pincers */}
                    <path
                      d="M6 13C3.5 12 2.5 9 4 7C5.5 5 8.5 6.5 8 9.5"
                      fill="#dc2626"
                    />
                    <path
                      d="M22 13C24.5 12 25.5 9 24 7C22.5 5 19.5 6.5 20 9.5"
                      fill="#dc2626"
                    />

                    {/* Little walking feet */}
                    <path d="M9 21.5L7.5 24.5" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
                    <path d="M14 22L14 25" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
                    <path d="M19 21.5L20.5 24.5" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-sm sm:text-base font-bold text-neutral-900 tracking-tight">OpenClaw</span>
              </button>
            </div>

          </div>

          {/* Right Sub-caption: —— 已支持 10+ Agent / 客户端 —— */}
          <div className="relative z-10 text-right mt-3">
            <span className="text-xs sm:text-sm font-semibold text-neutral-700/80 drop-shadow-xs">
              {language === 'zh' ? '—— 已支持 10+ Agent / 客户端 ——' : '—— 10+ Agents & Clients Supported ——'}
            </span>
          </div>

          {/* Bottom 6 Glassmorphism Feature Pills matching image.png */}
          <div className="relative z-10 mt-6 pt-4 border-t border-white/30 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            
            {/* 智能调度 */}
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/75 backdrop-blur-md border border-white/90 text-neutral-900 text-xs sm:text-sm font-bold shadow-xs hover:bg-white transition-all">
              <ArrowUpRight className="w-4 h-4 text-orange-600" />
              <span>{language === 'zh' ? '智能调度' : 'Smart Routing'}</span>
            </div>

            {/* 提示缓存 */}
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/75 backdrop-blur-md border border-white/90 text-neutral-900 text-xs sm:text-sm font-bold shadow-xs hover:bg-white transition-all">
              <Database className="w-4 h-4 text-amber-600" />
              <span>{language === 'zh' ? '提示缓存' : 'Prompt Cache'}</span>
            </div>

            {/* 自动兜底 */}
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/75 backdrop-blur-md border border-white/90 text-neutral-900 text-xs sm:text-sm font-bold shadow-xs hover:bg-white transition-all">
              <RefreshCw className="w-4 h-4 text-emerald-600" />
              <span>{language === 'zh' ? '自动兜底' : 'Auto Failover'}</span>
            </div>

            {/* 一张账单 */}
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/75 backdrop-blur-md border border-white/90 text-neutral-900 text-xs sm:text-sm font-bold shadow-xs hover:bg-white transition-all">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>{language === 'zh' ? '一张账单' : 'Unified Bill'}</span>
            </div>

            {/* 消费追踪 */}
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/75 backdrop-blur-md border border-white/90 text-neutral-900 text-xs sm:text-sm font-bold shadow-xs hover:bg-white transition-all">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <span>{language === 'zh' ? '消费追踪' : 'Usage Audit'}</span>
            </div>

            {/* 绝不降级 */}
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/75 backdrop-blur-md border border-white/90 text-neutral-900 text-xs sm:text-sm font-bold shadow-xs hover:bg-white transition-all">
              <ShieldCheck className="w-4 h-4 text-rose-600" />
              <span>{language === 'zh' ? '绝不降级' : 'No Degradation'}</span>
            </div>

          </div>

          {/* User Avatar Cluster: 已有 6,000+ 开发团队与独立开发者在用 */}
          <div className="relative z-10 mt-5 flex items-center justify-center gap-2 text-xs sm:text-sm text-neutral-800 font-medium">
            <div className="flex items-center -space-x-1.5 bg-white/90 p-1 rounded-full border border-white shadow-xs">
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">
                💬
              </span>
              <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold">
                🍄
              </span>
              <span className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center text-[10px] font-bold">
                ⚡
              </span>
            </div>
            <span>
              {language === 'zh' ? (
                <>已有 <strong className="font-extrabold text-neutral-950">6,000+</strong> 开发团队与独立开发者在用</>
              ) : (
                <>Trusted by <strong className="font-extrabold text-neutral-950">6,000+</strong> engineering teams and developers</>
              )}
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
