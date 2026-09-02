import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Tag, 
  Clock, 
  RefreshCw
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

type RoutingStrategy = 'availability' | 'cost' | 'latency';

export const RoutingAlgorithmSimulation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<RoutingStrategy>('availability');
  const [isSimulatedFailover, setIsSimulatedFailover] = useState(true);

  const { language } = useLanguage();
  const t = translations[language].routingSim;

  // Strategy specific configurations
  const strategyData = {
    availability: {
      question: t.availQuestion,
      leftPath: {
        label: t.availPrimary,
        isActive: !isSimulatedFailover,
        isDashed: isSimulatedFailover,
      },
      rightPath: {
        label: t.availFailover,
        isActive: isSimulatedFailover,
        isDashed: !isSimulatedFailover,
      },
      leftCard: {
        modelName: 'DeepSeek V4 Pro',
        provider: language === 'zh' ? '深度求索' : 'DeepSeek',
        providerType: 'deepseek',
        statusText: isSimulatedFailover ? t.availFault : t.availActive,
        isSuccess: !isSimulatedFailover,
        isActive: !isSimulatedFailover,
      },
      rightCard: {
        modelName: 'DeepSeek V4 Pro',
        provider: language === 'zh' ? '百度云' : 'Baidu Cloud',
        providerType: 'baidu',
        statusText: isSimulatedFailover ? t.availTakenOver : t.availStandby,
        isSuccess: isSimulatedFailover,
        isActive: isSimulatedFailover,
      },
    },
    cost: {
      question: t.costQuestion,
      leftPath: {
        label: t.costBest,
        isActive: true,
        isDashed: false,
      },
      rightPath: {
        label: t.costBase,
        isActive: false,
        isDashed: true,
      },
      leftCard: {
        modelName: 'Claude Opus 5',
        provider: 'AWS Bedrock',
        providerType: 'aws_bedrock',
        statusText: language === 'zh' ? '2 折' : '80% OFF',
        isSuccess: true,
        isActive: true,
      },
      rightCard: {
        modelName: 'Claude Opus 5',
        provider: 'Anthropic',
        providerType: 'anthropic',
        statusText: language === 'zh' ? '原价' : 'Standard',
        isSuccess: false,
        isActive: false,
      },
    },
    latency: {
      question: t.latQuestion,
      leftPath: {
        label: t.latDefault,
        isActive: false,
        isDashed: true,
      },
      rightPath: {
        label: t.latReroute,
        isActive: true,
        isDashed: false,
      },
      leftCard: {
        modelName: 'Kimi K3',
        provider: 'Moonshot AI',
        providerType: 'moonshot',
        statusText: language === 'zh' ? '首字 15.2s' : 'TTFT 15.2s',
        isSuccess: false,
        isActive: false,
      },
      rightCard: {
        modelName: 'Kimi K3',
        provider: language === 'zh' ? '腾讯云' : 'Tencent Cloud',
        providerType: 'tencent',
        statusText: language === 'zh' ? '首字 3.6s' : 'TTFT 3.6s',
        isSuccess: true,
        isActive: true,
      },
    },
  };

  const current = strategyData[activeTab];

  // Helper renderer for Provider Logos
  const renderProviderIcon = (type: string, isInactive: boolean) => {
    switch (type) {
      case 'aws_bedrock':
        return (
          <div className="w-6 h-6 rounded-md bg-blue-50 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a10 10 0 1 0 10 10" />
              <path d="M12 6a6 6 0 1 0 6 6" />
              <circle cx="12" cy="12" r="2" fill="currentColor" />
            </svg>
          </div>
        );

      case 'anthropic':
        return (
          <div className="w-6 h-6 rounded-md bg-neutral-100 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-neutral-800" fill="currentColor">
              <path d="M14.5 3L21 21H16.8L15.3 16.5H8.7L7.2 21H3L9.5 3H14.5ZM12 7.2L9.8 13.5H14.2L12 7.2Z" />
            </svg>
          </div>
        );

      case 'moonshot':
        return (
          <div className="w-6 h-6 rounded-md bg-neutral-100 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-neutral-600" fill="currentColor">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M4 10C8 8 16 8 20 10" stroke="currentColor" strokeWidth="1.5" />
              <path d="M3 14C7 16 17 16 21 14" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
        );

      case 'tencent':
        return (
          <div className="w-6 h-6 rounded-md bg-blue-50 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-blue-600" fill="currentColor">
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
            </svg>
          </div>
        );

      case 'baidu':
        return (
          <div className="w-6 h-6 rounded-md bg-blue-50 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-blue-600" fill="currentColor">
              <circle cx="9" cy="7" r="2.5" />
              <circle cx="15" cy="7" r="2.5" />
              <circle cx="6" cy="12" r="2" />
              <circle cx="18" cy="12" r="2" />
              <path d="M12 11c-3.3 0-5 2.2-5 4.5 0 2.5 2.2 4.5 5 4.5s5-2 5-4.5c0-2.3-1.7-4.5-5-4.5z" />
            </svg>
          </div>
        );

      case 'deepseek':
      default:
        return (
          <div className="w-6 h-6 rounded-md bg-blue-50 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-blue-600" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
          </div>
        );
    }
  };

  const renderModelLogo = (modelName: string, isInactive: boolean) => {
    if (modelName.includes('Claude')) {
      return (
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
          <svg 
            viewBox="0 0 100 100" 
            className={`w-7 h-7 transition-colors duration-300 ${isInactive ? 'text-neutral-400' : 'text-[#d97706]'}`} 
            fill="none" 
            stroke="currentColor" 
            strokeLinecap="round"
          >
            <line x1="50" y1="50" x2="50" y2="12" strokeWidth="7" />
            <line x1="50" y1="50" x2="31" y2="20" strokeWidth="6.5" />
            <line x1="50" y1="50" x2="19" y2="34" strokeWidth="6.5" />
            <line x1="50" y1="50" x2="14" y2="49" strokeWidth="6.5" />
            <line x1="50" y1="50" x2="20" y2="69" strokeWidth="7" />
            <line x1="50" y1="50" x2="30" y2="82" strokeWidth="6.5" />
            <line x1="50" y1="50" x2="51" y2="86" strokeWidth="7" />
            <line x1="50" y1="50" x2="68" y2="80" strokeWidth="6.5" />
            <line x1="50" y1="50" x2="79" y2="67" strokeWidth="6.5" />
            <line x1="50" y1="50" x2="86" y2="48" strokeWidth="7" />
            <line x1="50" y1="50" x2="77" y2="33" strokeWidth="6.5" />
            <line x1="50" y1="50" x2="67" y2="20" strokeWidth="6" />
          </svg>
        </div>
      );
    }

    if (modelName.includes('Kimi')) {
      return (
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 relative">
          <span className={`text-xl font-black font-mono tracking-tighter ${isInactive ? 'text-neutral-400' : 'text-neutral-900'}`}>
            K
          </span>
          <span className={`absolute top-1 right-1 w-1.5 h-1.5 rounded-full ${isInactive ? 'bg-neutral-400' : 'bg-blue-500 ring-2 ring-white'}`} />
        </div>
      );
    }

    // Official DeepSeek Mascot
    return (
      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
        <svg 
          viewBox="0 0 100 100" 
          className={`w-7 h-7 transition-colors duration-300 ${isInactive ? 'text-neutral-400' : 'text-[#4364f7]'}`} 
          fill="currentColor"
        >
          <path 
            d="M 46 22
               C 56 21, 65 24, 71 29
               C 74 27, 78 24, 83 23
               C 85 23, 86 25, 85 27
               C 83 31, 80 34, 78 37
               C 83 39, 87 41, 88 44
               C 89 46, 87 48, 85 47
               C 80 44, 75 42, 72 45
               C 68 51, 71 61, 78 65
               C 80 66, 79 69, 76 69
               C 72 69, 68 67, 65 71
               C 57 80, 46 84, 34 83
               C 21 82, 12 72, 11 58
               C 10 40, 24 23, 46 22 Z" 
          />
          <path 
            fill="#ffffff"
            d="M 18 56
               C 18 44, 25 35, 34 31
               C 33 40, 36 50, 42 58
               C 49 65, 58 68, 67 66
               C 60 74, 50 78, 40 77
               C 27 76, 18 68, 18 56 Z"
          />
          <ellipse 
            cx="63" 
            cy="52" 
            rx="4.5" 
            ry="6" 
            fill="#ffffff" 
            transform="rotate(-15 63 52)"
          />
          <circle 
            cx="63.5" 
            cy="52.5" 
            r="2.5" 
            fill={isInactive ? '#9ca3af' : '#4364f7'} 
          />
        </svg>
      </div>
    );
  };

  return (
    <section id="routing-diagram" className="py-12 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Diagram Canvas Container */}
        <div className="relative w-full rounded-3xl bg-[#fafafa] border border-neutral-200/90 overflow-hidden shadow-xs p-6 sm:p-10 lg:p-12">
          
          {/* Subtle Dot Grid Background */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-60"
            style={{
              backgroundImage: 'radial-gradient(circle, #d4d4d8 1.2px, transparent 1.2px)',
              backgroundSize: '24px 24px',
              backgroundPosition: '12px 12px'
            }}
          />

          {/* Top Left Strategy Tabs */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-10 sm:mb-14">
            <div className="flex items-center gap-1.5 sm:gap-2">
              
              {/* Tab 1: 可用性 (Availability) */}
              <button
                onClick={() => {
                  setActiveTab('availability');
                  setIsSimulatedFailover(true);
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  activeTab === 'availability'
                    ? 'bg-white text-neutral-900 font-bold border border-neutral-900/80 shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900 bg-transparent'
                }`}
              >
                <ShieldCheck className={`w-4 h-4 ${activeTab === 'availability' ? 'text-neutral-900' : 'text-neutral-500'}`} />
                <span>{t.tabAvailability}</span>
              </button>

              {/* Tab 2: 成本 (Cost) */}
              <button
                onClick={() => {
                  setActiveTab('cost');
                  setIsSimulatedFailover(false);
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  activeTab === 'cost'
                    ? 'bg-white text-neutral-900 font-bold border border-neutral-900/80 shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900 bg-transparent'
                }`}
              >
                <Tag className={`w-3.5 h-3.5 ${activeTab === 'cost' ? 'text-neutral-900' : 'text-neutral-500'}`} />
                <span>{t.tabCost}</span>
              </button>

              {/* Tab 3: 延迟 (Latency) */}
              <button
                onClick={() => {
                  setActiveTab('latency');
                  setIsSimulatedFailover(false);
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  activeTab === 'latency'
                    ? 'bg-white text-neutral-900 font-bold border border-neutral-900/80 shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900 bg-transparent'
                }`}
              >
                <Clock className={`w-3.5 h-3.5 ${activeTab === 'latency' ? 'text-neutral-900' : 'text-neutral-500'}`} />
                <span>{t.tabLatency}</span>
              </button>

            </div>

            {/* Interactive Test Trigger */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSimulatedFailover(!isSimulatedFailover)}
                className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white border border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:border-neutral-300 shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <RefreshCw className="w-3 h-3 text-neutral-400 animate-spin-slow" />
                <span>
                  {activeTab === 'availability' 
                    ? (isSimulatedFailover ? (language === 'zh' ? '切换为正常直连状态' : 'Switch to Normal') : (language === 'zh' ? '触发上游模拟故障 (503)' : 'Simulate 503 Outage'))
                    : activeTab === 'cost'
                    ? (language === 'zh' ? '重新动态竞价路由' : 'Re-run Cost Routing')
                    : (language === 'zh' ? '刷新边缘专线延迟测速' : 'Test Edge Latencies')
                  }
                </span>
              </button>
            </div>
          </div>

          {/* Interactive Topology Diagram Stage */}
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            
            {/* Top Node: App Window Wireframe Card */}
            <div className="w-72 sm:w-80 rounded-2xl bg-white border border-neutral-200/90 shadow-sm p-4 sm:p-5 transition-all">
              {/* Window Header Dots */}
              <div className="flex items-center gap-1.5 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
              </div>

              {/* App Label */}
              <div className="text-xl sm:text-2xl font-bold text-neutral-300 tracking-tight mb-3 font-sans">
                App
              </div>

              {/* Skeleton Mockup Lines */}
              <div className="space-y-2">
                <div className="w-3/4 h-2.5 rounded-full bg-neutral-100" />
                <div className="w-1/2 h-2.5 rounded-full bg-neutral-100" />
                <div className="w-full h-14 rounded-xl bg-neutral-100/90 mt-3" />
                <div className="w-2/3 h-2.5 rounded-full bg-neutral-100 mt-2" />
              </div>
            </div>

            {/* Trunk Wire */}
            <div className="relative w-0.5 h-10 bg-neutral-900 my-0.5 overflow-hidden">
              <div 
                className="absolute inset-x-0 w-full h-4 bg-gradient-to-b from-transparent via-cyan-400 to-white"
                style={{
                  animation: 'wireTrunkPulse 1.8s linear infinite',
                }}
              />
            </div>

            {/* Center Question Box Node */}
            <div className="px-5 py-2.5 rounded-xl bg-white border border-neutral-200 shadow-xs text-xs sm:text-sm font-medium text-neutral-800 z-10 transition-all duration-300">
              <span>{current.question}</span>
            </div>

            {/* SVG Connecting Curved Wire Harness with Animated Data Flows */}
            <div className="w-full relative h-20 -mt-2">
              <svg className="w-full h-full" viewBox="0 0 500 80" preserveAspectRatio="none" fill="none">
                <defs>
                  <linearGradient id="activeLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#18181b" />
                    <stop offset="50%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#18181b" />
                  </linearGradient>

                  <linearGradient id="activeRightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#18181b" />
                    <stop offset="50%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#18181b" />
                  </linearGradient>

                  <filter id="wireGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Left Branch Wire */}
                <path
                  id="leftBranchPath"
                  d="M 250 10 C 250 45, 125 40, 125 80"
                  stroke={current.leftPath.isDashed ? "#9ca3af" : "#18181b"}
                  strokeWidth={current.leftPath.isActive ? "2.2" : "1.8"}
                  strokeDasharray={current.leftPath.isDashed ? "5 5" : "none"}
                />

                {/* Active Left Wire Beam Animation */}
                {current.leftPath.isActive && (
                  <path
                    d="M 250 10 C 250 45, 125 40, 125 80"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                    strokeDasharray="16 32"
                    strokeLinecap="round"
                    style={{
                      animation: 'dashFlowReverse 1.2s linear infinite',
                    }}
                    filter="url(#wireGlow)"
                  />
                )}

                {/* Right Branch Wire */}
                <path
                  id="rightBranchPath"
                  d="M 250 10 C 250 45, 375 40, 375 80"
                  stroke={current.rightPath.isDashed ? "#9ca3af" : "#18181b"}
                  strokeWidth={current.rightPath.isActive ? "2.2" : "1.8"}
                  strokeDasharray={current.rightPath.isDashed ? "5 5" : "none"}
                />

                {/* Active Right Wire Beam Animation */}
                {current.rightPath.isActive && (
                  <path
                    d="M 250 10 C 250 45, 375 40, 375 80"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                    strokeDasharray="16 32"
                    strokeLinecap="round"
                    style={{
                      animation: 'dashFlowForward 1.2s linear infinite',
                    }}
                    filter="url(#wireGlow)"
                  />
                )}
              </svg>

              {/* Path Label 1 (Left Badge) */}
              <div className="absolute left-[20%] sm:left-[22%] top-6 -translate-x-1/2 transition-all duration-300">
                <span className={`text-[11px] px-2.5 py-0.5 rounded-full border transition-all ${
                  current.leftPath.isActive 
                    ? 'bg-neutral-900 text-white font-medium shadow-xs border-neutral-900' 
                    : 'bg-white text-neutral-500 border-neutral-200'
                }`}>
                  {current.leftPath.label}
                </span>
              </div>

              {/* Path Label 2 (Right Badge) */}
              <div className="absolute left-[80%] sm:left-[78%] top-6 -translate-x-1/2 transition-all duration-300">
                <span className={`text-[11px] px-2.5 py-0.5 rounded-full border transition-all ${
                  current.rightPath.isActive 
                    ? 'bg-neutral-900 text-white font-medium shadow-xs border-neutral-900' 
                    : 'bg-white text-neutral-500 border-neutral-200'
                }`}>
                  {current.rightPath.label}
                </span>
              </div>
            </div>

            {/* Bottom 2 Target Model Cards */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-1">
              
              {/* Left Destination Card */}
              <div className={`p-4 sm:p-5 rounded-2xl bg-white border transition-all duration-300 flex items-center justify-between ${
                current.leftCard.isActive
                  ? 'border-neutral-900 ring-1 ring-neutral-900/10 shadow-md'
                  : 'border-neutral-200/80 opacity-75'
              }`}>
                <div className="flex items-center gap-3">
                  {renderModelLogo(current.leftCard.modelName, !current.leftCard.isActive)}
                  
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-neutral-900">
                      {current.leftCard.modelName}
                    </div>
                    <div className="text-[11px] text-neutral-500 flex items-center gap-1.5 font-sans mt-0.5">
                      {renderProviderIcon(current.leftCard.providerType, !current.leftCard.isActive)}
                      <span className="text-neutral-500 font-mono text-[11px]">{current.leftCard.provider}</span>
                    </div>
                  </div>
                </div>

                <div>
                  {current.leftCard.isSuccess ? (
                    <span className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-[#eafaf1] text-[#16a34a] border border-[#bbf7d0]">
                      {current.leftCard.statusText}
                    </span>
                  ) : (
                    <span className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-500">
                      {current.leftCard.statusText}
                    </span>
                  )}
                </div>
              </div>

              {/* Right Destination Card */}
              <div className={`p-4 sm:p-5 rounded-2xl bg-white border transition-all duration-300 flex items-center justify-between ${
                current.rightCard.isActive
                  ? 'border-neutral-900 ring-1 ring-neutral-900/10 shadow-md'
                  : 'border-neutral-200/80 opacity-75'
              }`}>
                <div className="flex items-center gap-3">
                  {renderModelLogo(current.rightCard.modelName, !current.rightCard.isActive)}
                  
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-neutral-900">
                      {current.rightCard.modelName}
                    </div>
                    <div className="text-[11px] text-neutral-500 flex items-center gap-1.5 font-sans mt-0.5">
                      {renderProviderIcon(current.rightCard.providerType, !current.rightCard.isActive)}
                      <span className="text-neutral-500 font-mono text-[11px]">{current.rightCard.provider}</span>
                    </div>
                  </div>
                </div>

                <div>
                  {current.rightCard.isSuccess ? (
                    <span className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-[#eafaf1] text-[#16a34a] border border-[#bbf7d0]">
                      {current.rightCard.statusText}
                    </span>
                  ) : (
                    <span className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-500">
                      {current.rightCard.statusText}
                    </span>
                  )}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Global CSS Keyframes for Wire Animation */}
      <style>{`
        @keyframes wireTrunkPulse {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(200%);
            opacity: 0;
          }
        }

        @keyframes dashFlowForward {
          0% {
            stroke-dashoffset: 48;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        @keyframes dashFlowReverse {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: 48;
          }
        }
      `}</style>
    </section>
  );
};
