import React, { useState } from 'react';
import { POPULAR_MODELS } from '../data/mockData';
import { ArrowRight, Calculator, Zap, Search } from 'lucide-react';
import { ModelPriceInfo } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

interface PricingSectionProps {
  onSelectModelForQuickstart: (modelId: string) => void;
  onOpenApiKey: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ 
  onSelectModelForQuickstart, 
  onOpenApiKey 
}) => {
  const [showFullCatalog, setShowFullCatalog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProviderFilter, setSelectedProviderFilter] = useState<string>('all');
  
  const { language } = useLanguage();
  const t = translations[language].pricing;

  // Calculator state
  const [calcInputTokens, setCalcInputTokens] = useState<number>(100000); // 100k
  const [calcOutputTokens, setCalcOutputTokens] = useState<number>(20000); // 20k
  const [calcModel, setCalcModel] = useState<ModelPriceInfo>(POPULAR_MODELS[0]);

  const filteredModels = POPULAR_MODELS.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.provider.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProvider = selectedProviderFilter === 'all' || m.provider === selectedProviderFilter;
    return matchesSearch && matchesProvider;
  });

  const calculateCost = (model: ModelPriceInfo) => {
    const inputCost = (calcInputTokens / 1_000_000) * model.inputDiscounted;
    const outputCost = (calcOutputTokens / 1_000_000) * model.outputDiscounted;
    const originalInput = (calcInputTokens / 1_000_000) * model.inputOriginal;
    const originalOutput = (calcOutputTokens / 1_000_000) * model.outputOriginal;
    const totalDiscounted = inputCost + outputCost;
    const totalOriginal = originalInput + originalOutput;
    const saved = Math.max(0, totalOriginal - totalDiscounted);
    const savePercent = totalOriginal > 0 ? ((saved / totalOriginal) * 100).toFixed(0) : '0';
    return {
      discounted: totalDiscounted.toFixed(4),
      original: totalOriginal.toFixed(4),
      saved: saved.toFixed(4),
      savePercent
    };
  };

  const currentCalc = calculateCost(calcModel);

  return (
    <section id="pricing-section" className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              {language === 'zh' ? '实时价格 · 低至 1 折' : 'Live Pricing · Up to 90% Off'}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-500 max-w-2xl leading-relaxed">
              {language === 'zh' ? (
                <>
                  价格实时更新，折扣随上游成本波动；每次调用按请求时的实时折扣结算。
                  <br />
                  价格单位：<span className="font-semibold text-neutral-700">USD / 1M Tokens</span>。
                </>
              ) : (
                <>
                  Pricing updates dynamically based on upstream spot capacity. Billed at current discount rate per request.
                  <br />
                  Unit: <span className="font-semibold text-neutral-700">USD / 1M Tokens</span>.
                </>
              )}
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <a
              href="#discount-chart-section"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900 hover:text-orange-600 transition-colors"
            >
              <span>{language === 'zh' ? '查看实时折扣曲线' : 'View 48H Discount Curve'}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 6 Popular Pricing Cards Grid (Exact screenshot 2 layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {POPULAR_MODELS.slice(0, 6).map((model) => (
            <div
              key={model.id}
              className="relative flex flex-col justify-between p-6 rounded-2xl bg-white border border-neutral-200/90 hover:border-neutral-300 hover:shadow-md transition-all group"
            >
              {/* Top Row: Provider & Discount Pill */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs font-semibold text-neutral-400">
                    {model.providerName}
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mt-0.5">
                    {model.name}
                  </h3>
                  <div className="text-xs text-neutral-400 mt-0.5">{model.context}</div>
                </div>

                {/* Discount Badge */}
                <div className="flex flex-col items-end gap-1">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-neutral-900 text-white shadow-2xs">
                    {model.discountDisplay}
                  </span>
                  {model.fastMode && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <Zap className="w-2.5 h-2.5" /> Fast Mode
                    </span>
                  )}
                  {model.limitedPromo && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-red-50 text-red-700 border border-red-200">
                      {t.limitedPromo}
                    </span>
                  )}
                </div>
              </div>

              {/* Price Details */}
              <div className="my-6 space-y-3 bg-neutral-50/70 p-3.5 rounded-xl border border-neutral-100 font-mono text-xs">
                {/* Input Price */}
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500 font-sans">
                    {language === 'zh' ? '输入 (Prompt)' : 'Input (Prompt)'}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-400 line-through text-[11px]">
                      ${model.inputOriginal.toFixed(2)}
                    </span>
                    <span className="text-sm font-bold text-neutral-900">
                      ${model.inputDiscounted.toFixed(model.inputDiscounted < 0.1 ? 4 : 2)}
                    </span>
                  </div>
                </div>

                {/* Output Price */}
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500 font-sans">
                    {language === 'zh' ? '输出 (Completion)' : 'Output (Completion)'}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-400 line-through text-[11px]">
                      ${model.outputOriginal.toFixed(2)}
                    </span>
                    <span className="text-sm font-bold text-neutral-900">
                      ${model.outputDiscounted.toFixed(model.outputDiscounted < 0.1 ? 4 : 2)}
                    </span>
                  </div>
                </div>

                {/* Cache Price */}
                {model.cachedPrice && (
                  <div className="flex items-center justify-between pt-1 border-t border-dashed border-neutral-200 text-[11px]">
                    <span className="text-neutral-500 font-sans">
                      {language === 'zh' ? '缓存命中 (Cache)' : 'Cache Hit (Cache)'}
                    </span>
                    <span className="font-semibold text-emerald-600">
                      ${model.cachedPrice.toFixed(4)}
                    </span>
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
                <button
                  onClick={() => {
                    setCalcModel(model);
                    setShowFullCatalog(true);
                  }}
                  className="w-full text-neutral-600 hover:text-neutral-900 font-medium flex items-center justify-center gap-1.5 py-1 rounded-md hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  {t.estimateCost}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Models & Cost Calculator Trigger Bar */}
        <div className="mt-8 p-4 rounded-xl bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-neutral-900">
                {language === 'zh' 
                  ? '想要对比完整 50+ 款大模型价格与实时折扣？' 
                  : 'Want to compare all 50+ LLM models and real-time discounts?'}
              </div>
              <div className="text-xs text-neutral-500">
                {language === 'zh'
                  ? '支持 OpenAI, Anthropic, Google Gemini, DeepSeek, Kimi, GLM, xAI Grok 全系列'
                  : 'Full catalog for OpenAI, Anthropic, Google Gemini, DeepSeek, Kimi, GLM, xAI Grok'}
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowFullCatalog(true)}
            className="w-full sm:w-auto px-5 py-2 rounded-lg bg-neutral-900 text-white font-medium text-xs sm:text-sm hover:bg-neutral-800 transition-colors shadow-2xs cursor-pointer"
          >
            {language === 'zh' ? '打开完整价格表 & 成本计算器' : 'Open Full Catalog & Calculator'}
          </button>
        </div>

      </div>

      {/* Full Catalog & Calculator Modal */}
      {showFullCatalog && (
        <div className="fixed inset-0 z-50 bg-neutral-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-neutral-200 max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-neutral-900">
                  {language === 'zh' ? '全量模型价格表 & Token 成本估算器' : 'Complete Model Pricing & Token Cost Calculator'}
                </h3>
                <p className="text-xs text-neutral-500">
                  {language === 'zh' ? '实时结算汇率标准：USD / 1M Tokens (每百万 Tokens)' : 'Real-time settlement rate: USD / 1M Tokens'}
                </p>
              </div>
              <button
                onClick={() => setShowFullCatalog(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Interactive Calculator Banner inside Modal */}
            <div className="px-6 py-4 bg-orange-50/50 border-b border-orange-100 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block text-neutral-600 font-medium mb-1">
                  {language === 'zh' ? '选择测试模型' : 'Select Target Model'}
                </label>
                <select
                  value={calcModel.id}
                  onChange={(e) => {
                    const found = POPULAR_MODELS.find((m) => m.id === e.target.value);
                    if (found) setCalcModel(found);
                  }}
                  className="w-full bg-white border border-neutral-300 rounded-md px-2.5 py-1.5 font-medium text-neutral-800 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                >
                  {POPULAR_MODELS.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.discountDisplay})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-neutral-600 font-medium mb-1">
                  {language === 'zh' ? '预估输入 Token (Prompt)' : 'Estimated Input Tokens (Prompt)'}
                </label>
                <input
                  type="number"
                  step="10000"
                  value={calcInputTokens}
                  onChange={(e) => setCalcInputTokens(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-white border border-neutral-300 rounded-md px-2.5 py-1.5 font-mono text-neutral-800 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-neutral-600 font-medium mb-1">
                  {language === 'zh' ? '预估输出 Token (Completion)' : 'Estimated Output Tokens (Completion)'}
                </label>
                <input
                  type="number"
                  step="5000"
                  value={calcOutputTokens}
                  onChange={(e) => setCalcOutputTokens(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-white border border-neutral-300 rounded-md px-2.5 py-1.5 font-mono text-neutral-800 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Calculator Summary Result */}
              <div className="md:col-span-3 bg-white p-3 rounded-xl border border-orange-200 flex flex-wrap items-center justify-between gap-3 font-mono">
                <div className="text-neutral-700">
                  {language === 'zh' ? '原厂官方费用: ' : 'Official Cost: '}
                  <span className="line-through text-neutral-400">${currentCalc.original}</span>
                </div>
                <div className="text-neutral-900 font-bold text-sm">
                  {language === 'zh' ? '福易通折后: ' : 'FYTAPI Cost: '}
                  <span className="text-orange-600 text-base">${currentCalc.discounted}</span>
                </div>
                <div className="text-emerald-600 font-semibold text-xs bg-emerald-50 px-2 py-1 rounded">
                  {language === 'zh' ? `节省 $${currentCalc.saved} (${currentCalc.savePercent}%)` : `Save $${currentCalc.saved} (${currentCalc.savePercent}%)`}
                </div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="px-6 py-3 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-3 bg-neutral-50/50">
              {/* Provider Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
                {['all', 'OpenAI', 'Anthropic', 'Google', 'DeepSeek', 'Kimi', 'GLM', 'Grok'].map((p) => (
                  <button
                    key={p}
                    onClick={() => setSelectedProviderFilter(p)}
                    className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                      selectedProviderFilter === p
                        ? 'bg-neutral-900 text-white font-semibold'
                        : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    {p === 'all' ? (language === 'zh' ? '全部' : 'All') : p}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder={language === 'zh' ? '搜索模型名称...' : 'Search models...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1 bg-white border border-neutral-200 rounded-md text-xs text-neutral-800 placeholder-neutral-400 focus:outline-hidden focus:ring-1 focus:ring-neutral-400 w-44"
                />
              </div>
            </div>

            {/* Table Content */}
            <div className="flex-1 overflow-y-auto px-6 py-2">
              <table className="w-full text-left text-xs border-collapse font-mono">
                <thead>
                  <tr className="border-b border-neutral-200 text-neutral-400 font-sans uppercase">
                    <th className="py-2.5 font-semibold">{language === 'zh' ? '模型 / 供应商' : 'Model / Provider'}</th>
                    <th className="py-2.5 font-semibold">{language === 'zh' ? '当前折扣' : 'Discount'}</th>
                    <th className="py-2.5 font-semibold">{language === 'zh' ? '折后输入 / 1M' : 'Discounted Input / 1M'}</th>
                    <th className="py-2.5 font-semibold">{language === 'zh' ? '折后输出 / 1M' : 'Discounted Output / 1M'}</th>
                    <th className="py-2.5 font-semibold">{language === 'zh' ? '缓存命中' : 'Prompt Cache'}</th>
                    <th className="py-2.5 font-semibold text-right">{language === 'zh' ? '操作' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {filteredModels.map((m) => (
                    <tr key={m.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="py-3">
                        <div className="font-bold text-neutral-900 font-sans">{m.name}</div>
                        <div className="text-[11px] text-neutral-400 font-sans">{m.provider} · {m.context}</div>
                      </td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded bg-neutral-900 text-white font-bold text-[11px]">
                          {m.discountDisplay}
                        </span>
                      </td>
                      <td className="py-3 text-neutral-800 font-medium">
                        ${m.inputDiscounted.toFixed(m.inputDiscounted < 0.1 ? 4 : 2)}
                      </td>
                      <td className="py-3 text-neutral-800 font-medium">
                        ${m.outputDiscounted.toFixed(m.outputDiscounted < 0.1 ? 4 : 2)}
                      </td>
                      <td className="py-3 text-emerald-600 font-medium">
                        ${m.cachedPrice ? m.cachedPrice.toFixed(4) : '-'}
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => {
                            onSelectModelForQuickstart(m.id);
                            setShowFullCatalog(false);
                          }}
                          className="px-2.5 py-1 rounded bg-orange-50 text-orange-600 hover:bg-orange-100 font-sans font-semibold text-[11px] transition-colors cursor-pointer"
                        >
                          {language === 'zh' ? '选用' : 'Select'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between text-xs">
              <span className="text-neutral-500 font-medium">
                {language === 'zh' ? '价格根据全球 2000+ 算力池实时竞价撮合更新' : 'Pricing dynamically matched across 2,000+ global spot compute nodes'}
              </span>
              <button
                onClick={onOpenApiKey}
                className="px-4 py-2 rounded-lg bg-neutral-900 text-white font-semibold hover:bg-neutral-800 cursor-pointer"
              >
                {t.getApiKeyBtn || (language === 'zh' ? '立即获取 API Key 接入' : 'Get API Key Now')}
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

