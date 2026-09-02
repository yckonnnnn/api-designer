import React, { useState } from 'react';
import { DAILY_USAGE_DATA, AGENT_LEADERBOARD, MODEL_LEADERBOARD } from '../data/mockData';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { DailyUsageData } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

export const UsageLeaderboardSection: React.FC = () => {
  const [hoveredDay, setHoveredDay] = useState<DailyUsageData | null>(null);
  const [activeLeaderboardTab, setActiveLeaderboardTab] = useState<'agents' | 'models'>('agents');

  const { language } = useLanguage();
  const t = translations[language].leaderboard;

  const maxTotal = Math.max(...DAILY_USAGE_DATA.map((d) => d.total));

  return (
    <section id="leaderboard-section" className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              {t.title}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-500">
              {t.subtitle}
            </p>
          </div>

          <div className="mt-4 sm:mt-0 flex items-center gap-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-mono">
              1.4T tokens
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-100 font-mono">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>{t.vsYesterday}</span>
            </div>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: 30-Day Stacked Token Volume Bar Chart (6 cols) */}
          <div className="lg:col-span-6 bg-neutral-50/70 rounded-2xl border border-neutral-200 p-6 shadow-xs flex flex-col justify-between min-h-[460px]">
            
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-500 font-medium mb-4">
                <span className="font-semibold text-neutral-700">{t.chartTitle}</span>
                <span className="font-mono text-[11px]">08/03 ~ 09/01</span>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-neutral-600 mb-6">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-neutral-900" />
                  GPT
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-orange-500" />
                  Claude
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-cyan-500" />
                  DeepSeek
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-amber-500" />
                  Kimi
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-neutral-300" />
                  {t.others}
                </span>
              </div>
            </div>

            {/* Stacked Bars Container */}
            <div className="relative pt-4">
              {/* Tooltip on hover */}
              {hoveredDay && (
                <div className="absolute top-0 right-0 p-3 rounded-lg bg-neutral-900 text-white text-xs font-mono shadow-xl z-20 pointer-events-none animate-in fade-in">
                  <div className="font-bold border-b border-neutral-700 pb-1 mb-1">
                    {language === 'zh' ? '日期' : 'Date'}: {hoveredDay.date} ({language === 'zh' ? '总计' : 'Total'}: {hoveredDay.total}B)
                  </div>
                  <div>GPT: {hoveredDay.gpt}B</div>
                  <div>Claude: {hoveredDay.claude}B</div>
                  <div>DeepSeek: {hoveredDay.deepseek}B</div>
                  <div>Kimi: {hoveredDay.kimi}B</div>
                </div>
              )}

              {/* Bars Row */}
              <div className="h-44 sm:h-52 flex items-end gap-1 sm:gap-1.5 border-b border-neutral-200 pb-1">
                {DAILY_USAGE_DATA.map((day, idx) => {
                  const heightPercent = (day.total / maxTotal) * 100;
                  const gptPct = (day.gpt / day.total) * 100;
                  const claudePct = (day.claude / day.total) * 100;
                  const deepseekPct = (day.deepseek / day.total) * 100;
                  const kimiPct = (day.kimi / day.total) * 100;
                  const othersPct = (day.others / day.total) * 100;

                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => setHoveredDay(day)}
                      onMouseLeave={() => setHoveredDay(null)}
                      className="flex-1 h-full flex flex-col justify-end group cursor-pointer"
                    >
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className="w-full rounded-t-xs overflow-hidden flex flex-col transition-all group-hover:opacity-85 group-hover:scale-y-105 origin-bottom"
                      >
                        <div style={{ height: `${othersPct}%` }} className="bg-neutral-300 w-full" />
                        <div style={{ height: `${kimiPct}%` }} className="bg-amber-500 w-full" />
                        <div style={{ height: `${deepseekPct}%` }} className="bg-cyan-500 w-full" />
                        <div style={{ height: `${claudePct}%` }} className="bg-orange-500 w-full" />
                        <div style={{ height: `${gptPct}%` }} className="bg-neutral-900 w-full" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* X-axis labels */}
              <div className="flex justify-between items-center text-[10px] text-neutral-400 font-mono pt-2">
                <span>08/03</span>
                <span>08/10</span>
                <span>08/17</span>
                <span>08/24</span>
                <span>09/01</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-200/80 text-xs text-neutral-500 flex justify-between items-center">
              <span>{t.cachePrompt}</span>
              <span className="font-mono text-emerald-600 font-semibold">&gt;99% Cache Hit</span>
            </div>

          </div>

          {/* Right: Leaderboard Columns (6 cols) */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs">
            
            {/* Toggle tabs for mobile / desktop switcher */}
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveLeaderboardTab('agents')}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeLeaderboardTab === 'agents'
                      ? 'bg-neutral-900 text-white'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  {t.agentRank}
                </button>
                <button
                  onClick={() => setActiveLeaderboardTab('models')}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeLeaderboardTab === 'models'
                      ? 'bg-neutral-900 text-white'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  {t.modelRank}
                </button>
              </div>

              <span className="text-[11px] text-neutral-400 font-mono">
                {t.active24h}
              </span>
            </div>

            {/* List */}
            {activeLeaderboardTab === 'agents' ? (
              <div className="divide-y divide-neutral-100">
                {AGENT_LEADERBOARD.map((item) => (
                  <div key={item.rank} className="py-3 flex items-center justify-between hover:bg-neutral-50/80 px-2 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="w-5 font-mono text-xs font-bold text-neutral-400">
                        0{item.rank}
                      </span>
                      <div>
                        <div className="text-sm font-bold text-neutral-900 flex items-center gap-1.5">
                          <span>{item.name}</span>
                        </div>
                        <div className="text-[11px] text-neutral-400 font-mono">
                          {language === 'zh' ? item.tasks : item.tasks.replace('任务', ' Tasks')}
                        </div>
                      </div>
                    </div>

                    <div className="text-right font-mono">
                      <div className="text-xs font-bold text-neutral-800">
                        {item.tokens}
                      </div>
                      <div className="text-[10px] text-emerald-600 font-semibold flex items-center justify-end gap-0.5">
                        <TrendingUp className="w-2.5 h-2.5" />
                        <span>+{item.trend}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="divide-y divide-neutral-100">
                {MODEL_LEADERBOARD.map((item) => (
                  <div key={item.rank} className="py-3 flex items-center justify-between hover:bg-neutral-50/80 px-2 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="w-5 font-mono text-xs font-bold text-neutral-400">
                        0{item.rank}
                      </span>
                      <div>
                        <div className="text-sm font-bold text-neutral-900">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-neutral-400 font-mono flex items-center gap-2">
                          <span>{item.firstTokenLatency}</span>
                          <span>•</span>
                          <span className="text-emerald-600">{item.successRate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right font-mono">
                      <div className="text-xs font-bold text-neutral-800">
                        {item.tokens}
                      </div>
                      <div className="text-[10px] text-emerald-600 font-semibold flex items-center justify-end gap-0.5">
                        <TrendingUp className="w-2.5 h-2.5" />
                        <span>+{item.trend}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
