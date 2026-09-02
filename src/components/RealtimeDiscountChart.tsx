import React, { useState } from 'react';
import { POPULAR_MODELS } from '../data/mockData';
import { ModelPriceInfo } from '../types';
import { Search, Clock, Zap, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

interface RealtimeDiscountChartProps {
  onOpenApiKey: () => void;
}

export const RealtimeDiscountChart: React.FC<RealtimeDiscountChartProps> = ({ onOpenApiKey }) => {
  const [selectedProvider, setSelectedProvider] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModel, setSelectedModel] = useState<ModelPriceInfo>(POPULAR_MODELS[0]);
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);

  const { language } = useLanguage();
  const t = translations[language].realtimeDiscount;

  const filteredModels = POPULAR_MODELS.filter((m) => {
    const matchesProvider = selectedProvider === 'all' || m.provider === selectedProvider;
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.provider.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProvider && matchesSearch;
  });

  // Calculate SVG curve path coordinates for the selected model's 48h history
  const history = selectedModel.history48h;
  const minVal = Math.min(...history) * 0.85;
  const maxVal = Math.max(...history) * 1.15;
  const chartWidth = 700;
  const chartHeight = 220;
  const paddingX = 30;
  const paddingY = 25;

  const points = history.map((val, idx) => {
    const x = paddingX + (idx / (history.length - 1)) * (chartWidth - paddingX * 2);
    const normalizedY = (val - minVal) / (maxVal - minVal || 1);
    const y = chartHeight - paddingY - normalizedY * (chartHeight - paddingY * 2);
    return { x, y, val, hourOffset: 48 - idx };
  });

  // Generate smooth SVG path command
  const pathD = points.reduce((acc, pt, i, arr) => {
    if (i === 0) return `M ${pt.x},${pt.y}`;
    const prev = arr[i - 1];
    const cx = (prev.x + pt.x) / 2;
    return `${acc} C ${cx},${prev.y} ${cx},${pt.y} ${pt.x},${pt.y}`;
  }, '');

  // Fill gradient area below the curve
  const areaD = `${pathD} L ${points[points.length - 1].x},${chartHeight - paddingY} L ${points[0].x},${chartHeight - paddingY} Z`;

  const getDiscountLabel = (discount: number, display: string) => {
    if (language === 'zh') return display;
    if (display.includes('限时')) return 'Promo 99.9% Off';
    const pct = Math.round((1 - discount / 10) * 100);
    return `${pct}% OFF`;
  };

  return (
    <section id="discount-chart-section" className="py-20 bg-neutral-50/50 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            {t.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-500 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Provider Tabs and Search Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-semibold py-1">
            {[
              { id: 'all', label: language === 'zh' ? '精选' : 'Featured' },
              { id: 'OpenAI', label: 'OpenAI' },
              { id: 'Anthropic', label: 'Anthropic' },
              { id: 'Google', label: 'Google' },
              { id: 'Kimi', label: 'Kimi' },
              { id: 'DeepSeek', label: 'DeepSeek' },
              { id: 'GLM', label: 'GLM' },
              { id: 'Grok', label: 'Grok' }
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedProvider(p.id)}
                className={`px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                  selectedProvider === p.id
                    ? 'bg-neutral-900 text-white font-bold shadow-2xs'
                    : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-1.5 bg-white border border-neutral-200 rounded-lg text-xs text-neutral-800 placeholder-neutral-400 focus:outline-hidden focus:ring-1 focus:ring-neutral-400 w-52 shadow-2xs"
            />
          </div>
        </div>

        {/* 2-Column Master-Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left: Model List (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-neutral-200 p-3 shadow-xs max-h-[560px] overflow-y-auto space-y-1.5">
            {filteredModels.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedModel(m)}
                className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                  selectedModel.id === m.id
                    ? 'bg-orange-50/80 border border-orange-200 ring-1 ring-orange-200 shadow-2xs'
                    : 'hover:bg-neutral-50 border border-transparent'
                }`}
              >
                <div>
                  <div className="text-xs font-semibold text-neutral-400">
                    {m.provider}
                  </div>
                  <div className="text-sm font-bold text-neutral-900 mt-0.5">
                    {m.name}
                  </div>
                  <div className="text-[11px] text-neutral-500 font-mono">
                    ${m.inputDiscounted.toFixed(m.inputDiscounted < 0.1 ? 4 : 2)} / 1M
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-bold ${
                      selectedModel.id === m.id
                        ? 'bg-neutral-900 text-white'
                        : 'bg-neutral-100 text-neutral-800'
                    }`}
                  >
                    {getDiscountLabel(m.discount, m.discountDisplay)}
                  </span>
                  {m.fastMode && (
                    <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                      <Zap className="w-2.5 h-2.5" /> Fast
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Right: Detailed Model Curve Chart (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-xs">
            
            {/* Model Title & Tags */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-neutral-100">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900">
                    {selectedModel.name}
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-neutral-100 text-neutral-600 font-medium">
                    {selectedModel.providerName}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2 text-xs">
                  <span className="px-2 py-0.5 rounded-md bg-neutral-900 text-white font-bold">
                    {getDiscountLabel(selectedModel.discount, selectedModel.discountDisplay)}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600">
                    {selectedModel.context.replace('上下文', language === 'zh' ? '上下文' : 'Context')}
                  </span>
                  {selectedModel.fastMode && (
                    <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium flex items-center gap-1">
                      <Zap className="w-3 h-3" /> Fast Mode
                    </span>
                  )}
                  {selectedModel.limitedPromo && (
                    <span className="px-2 py-0.5 rounded-md bg-red-50 text-red-700 border border-red-200 font-semibold">
                      {language === 'zh' ? '限时特惠' : 'Limited Promo'}
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={onOpenApiKey}
                className="px-4 py-2 rounded-lg bg-neutral-900 text-white font-semibold text-xs hover:bg-neutral-800 transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <span>{language === 'zh' ? '获取 API Key' : 'Get API Key'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 6 Key Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 my-6 text-center font-mono">
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                <div className="text-[11px] text-neutral-400 font-sans mb-1">{t.currentDiscount}</div>
                <div className="text-sm font-bold text-neutral-900">{getDiscountLabel(selectedModel.discount, selectedModel.discountDisplay)}</div>
              </div>

              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                <div className="text-[11px] text-neutral-400 font-sans mb-1">{t.avg48h}</div>
                <div className="text-sm font-bold text-neutral-900">{getDiscountLabel(parseFloat(selectedModel.avg48h), selectedModel.avg48h)}</div>
              </div>

              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                <div className="text-[11px] text-neutral-400 font-sans mb-1">{t.min48h}</div>
                <div className="text-sm font-bold text-orange-600">{getDiscountLabel(parseFloat(selectedModel.min48h), selectedModel.min48h)}</div>
              </div>

              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                <div className="text-[11px] text-neutral-400 font-sans mb-1">{t.inputPrice}</div>
                <div className="text-sm font-bold text-neutral-900">
                  ${selectedModel.inputDiscounted.toFixed(selectedModel.inputDiscounted < 0.1 ? 4 : 2)}
                </div>
              </div>

              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                <div className="text-[11px] text-neutral-400 font-sans mb-1">{t.outputPrice}</div>
                <div className="text-sm font-bold text-neutral-900">
                  ${selectedModel.outputDiscounted.toFixed(selectedModel.outputDiscounted < 0.1 ? 4 : 2)}
                </div>
              </div>

              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                <div className="text-[11px] text-neutral-400 font-sans mb-1">{t.cachePrice}</div>
                <div className="text-sm font-bold text-emerald-600">
                  ${selectedModel.cachedPrice ? selectedModel.cachedPrice.toFixed(4) : '-'}
                </div>
              </div>
            </div>

            {/* Interactive SVG 48-Hour Fluctuating Curve Chart */}
            <div className="relative pt-2">
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-2 font-mono">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-neutral-500" />
                  {language === 'zh' 
                    ? '过去 48 小时实时折扣波动走势 (Hourly Price Fluctuation)'
                    : 'Past 48 Hours Real-time Price Fluctuation (Hourly)'}
                </span>
                <span>
                  {language === 'zh'
                    ? `浮动区间: ${minVal.toFixed(1)}折 ~ ${maxVal.toFixed(1)}折`
                    : `Range: ${getDiscountLabel(minVal, `${minVal.toFixed(1)}折`)} ~ ${getDiscountLabel(maxVal, `${maxVal.toFixed(1)}折`)}`}
                </span>
              </div>

              {/* Chart SVG */}
              <div className="relative w-full overflow-hidden bg-neutral-50/50 rounded-xl p-2 border border-neutral-100">
                <svg
                  viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                  className="w-full h-48 sm:h-56 overflow-visible"
                >
                  <defs>
                    <linearGradient id="discountGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f97316" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#f97316" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid lines */}
                  {[0.25, 0.5, 0.75].map((fraction, i) => {
                    const y = paddingY + fraction * (chartHeight - paddingY * 2);
                    return (
                      <line
                        key={i}
                        x1={paddingX}
                        y1={y}
                        x2={chartWidth - paddingX}
                        y2={y}
                        stroke="#e5e7eb"
                        strokeDasharray="4 4"
                      />
                    );
                  })}

                  {/* Area under curve */}
                  <path d={areaD} fill="url(#discountGradient)" />

                  {/* The curve line */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke="#ea580c"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Interactive Points on curve */}
                  {points.map((pt, i) => (
                    <g key={i}>
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={hoveredPointIndex === i ? 6 : 3}
                        className={`transition-all cursor-pointer ${
                          hoveredPointIndex === i
                            ? 'fill-orange-600 stroke-white stroke-2'
                            : 'fill-orange-500 opacity-60 hover:opacity-100'
                        }`}
                        onMouseEnter={() => setHoveredPointIndex(i)}
                        onMouseLeave={() => setHoveredPointIndex(null)}
                      />
                    </g>
                  ))}

                  {/* Hover Tooltip in SVG */}
                  {hoveredPointIndex !== null && (
                    <g transform={`translate(${points[hoveredPointIndex].x}, ${points[hoveredPointIndex].y - 35})`}>
                      <rect
                        x="-45"
                        y="-10"
                        width="90"
                        height="28"
                        rx="6"
                        fill="#18181b"
                        className="shadow-lg"
                      />
                      <text
                        x="0"
                        y="8"
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="11"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        {getDiscountLabel(points[hoveredPointIndex].val, `${points[hoveredPointIndex].val.toFixed(1)}折`)} ({points[hoveredPointIndex].hourOffset}h {language === 'zh' ? '前' : 'ago'})
                      </text>
                    </g>
                  )}
                </svg>

                {/* X-Axis Labels */}
                <div className="flex justify-between items-center text-[10px] text-neutral-400 font-mono px-6 pt-2">
                  <span>-48h</span>
                  <span>-36h</span>
                  <span>-24h</span>
                  <span>-12h</span>
                  <span className="text-orange-600 font-bold">{language === 'zh' ? '刚刚 (实时)' : 'Now (Live)'}</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
