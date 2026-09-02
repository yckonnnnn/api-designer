import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  ArrowUpRight, 
  ChevronDown
} from 'lucide-react';
import { POPULAR_MODELS } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

interface QuickStartSectionProps {
  selectedModelId?: string;
  onOpenApiKey: () => void;
  onOpenDownload?: () => void;
}

export const QuickStartSection: React.FC<QuickStartSectionProps> = ({
  selectedModelId = 'gpt-5.6-sol',
  onOpenApiKey
}) => {
  const [activeTab, setActiveTab] = useState<'api' | 'codex' | 'claude' | 'cli' | 'others'>('api');
  const [codeLang, setCodeLang] = useState<'python' | 'ts' | 'curl' | 'go' | 'java' | 'rust' | 'php' | 'ruby'>('python');
  const [model, setModel] = useState<string>(selectedModelId);
  const [copied, setCopied] = useState(false);

  const { language } = useLanguage();
  const t = translations[language].quickstart;

  const currentModel = POPULAR_MODELS.find(m => m.id === model) || POPULAR_MODELS[0];

  const getCodeLines = (): { lineNum: number; content: React.ReactNode; raw: string }[] => {
    const onlyChangeComment = language === 'zh' ? ' # 只改这一行' : ' # Only change this line';
    const onlyChangeCommentJs = language === 'zh' ? ' // 只改这一行' : ' // Only change this line';

    if (activeTab === 'api') {
      if (codeLang === 'python') {
        const raw = `from openai import OpenAI

client = OpenAI(
    base_url="https://api.fytapi.com/v1", ${onlyChangeComment}
    api_key="<FYTAPI_API_KEY>",
)
response = client.chat.completions.create(
    model="${currentModel.id}",
    messages=[{"role": "user", "content": "Hello"}],
)
print(response.choices[0].message.content)`;

        return [
          { lineNum: 1, content: <span><span className="text-purple-600 font-semibold">from</span> openai <span className="text-purple-600 font-semibold">import</span> OpenAI</span>, raw: 'from openai import OpenAI' },
          { lineNum: 2, content: <span></span>, raw: '' },
          { lineNum: 3, content: <span>client = <span className="text-blue-600 font-semibold">OpenAI</span>(</span>, raw: 'client = OpenAI(' },
          { lineNum: 4, content: <span>    base_url=<span className="text-emerald-600">"https://api.fytapi.com/v1"</span>,  <span className="text-neutral-400 font-normal">{onlyChangeComment}</span></span>, raw: `    base_url="https://api.fytapi.com/v1",  ${onlyChangeComment}` },
          { lineNum: 5, content: <span>    api_key=<span className="text-emerald-600">"&lt;FYTAPI_API_KEY&gt;"</span>,</span>, raw: '    api_key="<FYTAPI_API_KEY>",' },
          { lineNum: 6, content: <span>)</span>, raw: ')' },
          { lineNum: 7, content: <span>response = client.chat.completions.<span className="text-blue-600 font-semibold">create</span>(</span>, raw: 'response = client.chat.completions.create(' },
          { lineNum: 8, content: <span>    model=<span className="text-emerald-600">"{currentModel.id}"</span>,</span>, raw: `    model="${currentModel.id}",` },
          { lineNum: 9, content: <span>    messages=[&#123;<span className="text-emerald-600">"role"</span>: <span className="text-emerald-600">"user"</span>, <span className="text-emerald-600">"content"</span>: <span className="text-emerald-600">"Hello"</span>&#125;],</span>, raw: '    messages=[{"role": "user", "content": "Hello"}],' },
          { lineNum: 10, content: <span>)</span>, raw: ')' },
          { lineNum: 11, content: <span><span className="text-blue-600 font-semibold">print</span>(response.choices[0].message.content)</span>, raw: 'print(response.choices[0].message.content)' },
        ];
      }

      if (codeLang === 'ts') {
        return [
          { lineNum: 1, content: <span><span className="text-purple-600 font-semibold">import</span> OpenAI <span className="text-purple-600 font-semibold">from</span> <span className="text-emerald-600">'openai'</span>;</span>, raw: "import OpenAI from 'openai';" },
          { lineNum: 2, content: <span></span>, raw: '' },
          { lineNum: 3, content: <span><span className="text-purple-600 font-semibold">const</span> client = <span className="text-purple-600 font-semibold">new</span> <span className="text-blue-600 font-semibold">OpenAI</span>(&#123;</span>, raw: 'const client = new OpenAI({' },
          { lineNum: 4, content: <span>  baseURL: <span className="text-emerald-600">'https://api.fytapi.com/v1'</span>,  <span className="text-neutral-400 font-normal">{onlyChangeCommentJs}</span></span>, raw: `  baseURL: 'https://api.fytapi.com/v1',  ${onlyChangeCommentJs}` },
          { lineNum: 5, content: <span>  apiKey: process.env.FYTAPI_API_KEY || <span className="text-emerald-600">'&lt;API_KEY&gt;'</span>,</span>, raw: "  apiKey: process.env.FYTAPI_API_KEY || '<API_KEY>'," },
          { lineNum: 6, content: <span>&#125;);</span>, raw: '});' },
          { lineNum: 7, content: <span></span>, raw: '' },
          { lineNum: 8, content: <span><span className="text-purple-600 font-semibold">const</span> response = <span className="text-purple-600 font-semibold">await</span> client.chat.completions.<span className="text-blue-600 font-semibold">create</span>(&#123;</span>, raw: 'const response = await client.chat.completions.create({' },
          { lineNum: 9, content: <span>  model: <span className="text-emerald-600">'{currentModel.id}'</span>,</span>, raw: `  model: '${currentModel.id}',` },
          { lineNum: 10, content: <span>  messages: [&#123; role: <span className="text-emerald-600">'user'</span>, content: <span className="text-emerald-600">'Hello'</span> &#125;],</span>, raw: "  messages: [{ role: 'user', content: 'Hello' }]," },
          { lineNum: 11, content: <span>&#125;);</span>, raw: '});' },
          { lineNum: 12, content: <span>console.<span className="text-blue-600 font-semibold">log</span>(response.choices[0].message.content);</span>, raw: 'console.log(response.choices[0].message.content);' },
        ];
      }

      if (codeLang === 'curl') {
        return [
          { lineNum: 1, content: <span>curl https://api.fytapi.com/v1/chat/completions \</span>, raw: 'curl https://api.fytapi.com/v1/chat/completions \\' },
          { lineNum: 2, content: <span>  -H <span className="text-emerald-600">"Content-Type: application/json"</span> \</span>, raw: '  -H "Content-Type: application/json" \\' },
          { lineNum: 3, content: <span>  -H <span className="text-emerald-600">"Authorization: Bearer &lt;FYTAPI_API_KEY&gt;"</span> \</span>, raw: '  -H "Authorization: Bearer <FYTAPI_API_KEY>" \\' },
          { lineNum: 4, content: <span>  -d <span className="text-emerald-600">'&#123;</span></span>, raw: "  -d '{" },
          { lineNum: 5, content: <span>    <span className="text-emerald-600">"model": "{currentModel.id}",</span></span>, raw: `    "model": "${currentModel.id}",` },
          { lineNum: 6, content: <span>    <span className="text-emerald-600">"messages": [&#123;"role": "user", "content": "Hello"&#125;]</span></span>, raw: '    "messages": [{"role": "user", "content": "Hello"}]' },
          { lineNum: 7, content: <span>  <span className="text-emerald-600">&#125;'</span></span>, raw: "  }'" },
        ];
      }

      if (codeLang === 'go') {
        return [
          { lineNum: 1, content: <span><span className="text-purple-600 font-semibold">package</span> main</span>, raw: 'package main' },
          { lineNum: 2, content: <span></span>, raw: '' },
          { lineNum: 3, content: <span><span className="text-purple-600 font-semibold">import</span> (</span>, raw: 'import (' },
          { lineNum: 4, content: <span>	<span className="text-emerald-600">"context"</span></span>, raw: '\t"context"' },
          { lineNum: 5, content: <span>	<span className="text-emerald-600">"fmt"</span></span>, raw: '\t"fmt"' },
          { lineNum: 6, content: <span>	<span className="text-emerald-600">"github.com/sashabaranov/go-openai"</span></span>, raw: '\t"github.com/sashabaranov/go-openai"' },
          { lineNum: 7, content: <span>)</span>, raw: ')' },
          { lineNum: 8, content: <span></span>, raw: '' },
          { lineNum: 9, content: <span>config := openai.<span className="text-blue-600 font-semibold">DefaultConfig</span>(<span className="text-emerald-600">"&lt;API_KEY&gt;"</span>)</span>, raw: 'config := openai.DefaultConfig("<API_KEY>")' },
          { lineNum: 10, content: <span>config.BaseURL = <span className="text-emerald-600">"https://api.fytapi.com/v1"</span>  <span className="text-neutral-400 font-normal">{onlyChangeCommentJs}</span></span>, raw: `config.BaseURL = "https://api.fytapi.com/v1"  ${onlyChangeCommentJs}` },
          { lineNum: 11, content: <span>client := openai.<span className="text-blue-600 font-semibold">NewClientWithConfig</span>(config)</span>, raw: 'client := openai.NewClientWithConfig(config)' },
        ];
      }

      if (codeLang === 'java') {
        return [
          { lineNum: 1, content: <span><span className="text-purple-600 font-semibold">import</span> com.openai.client.OpenAIClient;</span>, raw: 'import com.openai.client.OpenAIClient;' },
          { lineNum: 2, content: <span></span>, raw: '' },
          { lineNum: 3, content: <span>OpenAIClient client = OpenAIClient.<span className="text-blue-600 font-semibold">builder</span>()</span>, raw: 'OpenAIClient client = OpenAIClient.builder()' },
          { lineNum: 4, content: <span>    .baseUrl(<span className="text-emerald-600">"https://api.fytapi.com/v1"</span>)  <span className="text-neutral-400 font-normal">{onlyChangeCommentJs}</span></span>, raw: `    .baseUrl("https://api.fytapi.com/v1")  ${onlyChangeCommentJs}` },
          { lineNum: 5, content: <span>    .apiKey(<span className="text-emerald-600">"&lt;API_KEY&gt;"</span>)</span>, raw: '    .apiKey("<API_KEY>")' },
          { lineNum: 6, content: <span>    .build();</span>, raw: '    .build();' },
        ];
      }

      if (codeLang === 'rust') {
        return [
          { lineNum: 1, content: <span><span className="text-purple-600 font-semibold">let</span> client = async_openai::Client::<span className="text-blue-600 font-semibold">with_config</span>(</span>, raw: 'let client = async_openai::Client::with_config(' },
          { lineNum: 2, content: <span>    async_openai::config::OpenAIConfig::<span className="text-blue-600 font-semibold">default</span>()</span>, raw: '    async_openai::config::OpenAIConfig::default()' },
          { lineNum: 3, content: <span>        .with_api_base(<span className="text-emerald-600">"https://api.fytapi.com/v1"</span>)  <span className="text-neutral-400 font-normal">{onlyChangeCommentJs}</span></span>, raw: `        .with_api_base("https://api.fytapi.com/v1")  ${onlyChangeCommentJs}` },
          { lineNum: 4, content: <span>        .with_api_key(<span className="text-emerald-600">"&lt;API_KEY&gt;"</span>)</span>, raw: '        .with_api_key("<API_KEY>")' },
          { lineNum: 5, content: <span>);</span>, raw: ');' },
        ];
      }

      if (codeLang === 'php') {
        return [
          { lineNum: 1, content: <span>$client = OpenAI::<span className="text-blue-600 font-semibold">factory</span>()</span>, raw: '$client = OpenAI::factory()' },
          { lineNum: 2, content: <span>    -&gt;withBaseUri(<span className="text-emerald-600">'https://api.fytapi.com/v1'</span>)  <span className="text-neutral-400 font-normal">{onlyChangeCommentJs}</span></span>, raw: `    ->withBaseUri('https://api.fytapi.com/v1')  ${onlyChangeCommentJs}` },
          { lineNum: 3, content: <span>    -&gt;withApiKey(<span className="text-emerald-600">'&lt;API_KEY&gt;'</span>)</span>, raw: "    ->withApiKey('<API_KEY>')" },
          { lineNum: 4, content: <span>    -&gt;make();</span>, raw: '    ->make();' },
        ];
      }

      if (codeLang === 'ruby') {
        return [
          { lineNum: 1, content: <span>client = OpenAI::Client.<span className="text-blue-600 font-semibold">new</span>(</span>, raw: 'client = OpenAI::Client.new(' },
          { lineNum: 2, content: <span>  uri_base: <span className="text-emerald-600">"https://api.fytapi.com/v1"</span>,  <span className="text-neutral-400 font-normal">{onlyChangeComment}</span></span>, raw: `  uri_base: "https://api.fytapi.com/v1",  ${onlyChangeComment}` },
          { lineNum: 3, content: <span>  access_token: <span className="text-emerald-600">"&lt;API_KEY&gt;"</span></span>, raw: '  access_token: "<API_KEY>"' },
          { lineNum: 4, content: <span>)</span>, raw: ')' },
        ];
      }
    }

    if (activeTab === 'codex') {
      return [
        { lineNum: 1, content: <span className="text-neutral-400 font-normal"># ~/.codex/config.json</span>, raw: '# ~/.codex/config.json' },
        { lineNum: 2, content: <span>&#123;</span>, raw: '{' },
        { lineNum: 3, content: <span>  <span className="text-emerald-600">"provider"</span>: <span className="text-emerald-600">"openai-compatible"</span>,</span>, raw: '  "provider": "openai-compatible",' },
        { lineNum: 4, content: <span>  <span className="text-emerald-600">"base_url"</span>: <span className="text-emerald-600">"https://api.fytapi.com/v1"</span>,</span>, raw: '  "base_url": "https://api.fytapi.com/v1",' },
        { lineNum: 5, content: <span>  <span className="text-emerald-600">"api_key"</span>: <span className="text-emerald-600">"&lt;FYTAPI_API_KEY&gt;"</span>,</span>, raw: '  "api_key": "<FYTAPI_API_KEY>",' },
        { lineNum: 6, content: <span>  <span className="text-emerald-600">"model"</span>: <span className="text-emerald-600">"{currentModel.id}"</span></span>, raw: `  "model": "${currentModel.id}"` },
        { lineNum: 7, content: <span>&#125;</span>, raw: '}' },
      ];
    }

    if (activeTab === 'claude') {
      return [
        { lineNum: 1, content: <span className="text-neutral-400 font-normal">{language === 'zh' ? '# Claude Code 终端环境变量快速接入' : '# Claude Code Terminal Environment Setup'}</span>, raw: '# Claude Code Quickstart' },
        { lineNum: 2, content: <span><span className="text-purple-600 font-semibold">export</span> ANTHROPIC_BASE_URL=<span className="text-emerald-600">"https://api.fytapi.com/anthropic/v1"</span></span>, raw: 'export ANTHROPIC_BASE_URL="https://api.fytapi.com/anthropic/v1"' },
        { lineNum: 3, content: <span><span className="text-purple-600 font-semibold">export</span> ANTHROPIC_API_KEY=<span className="text-emerald-600">"&lt;FYTAPI_API_KEY&gt;"</span></span>, raw: 'export ANTHROPIC_API_KEY="<FYTAPI_API_KEY>"' },
        { lineNum: 4, content: <span><span className="text-purple-600 font-semibold">export</span> ANTHROPIC_MODEL=<span className="text-emerald-600">"claude-3-7-sonnet-20250219"</span></span>, raw: 'export ANTHROPIC_MODEL="claude-3-7-sonnet-20250219"' },
        { lineNum: 5, content: <span></span>, raw: '' },
        { lineNum: 6, content: <span className="text-neutral-400 font-normal">{language === 'zh' ? '# 直接启动' : '# Run command'}</span>, raw: '# Run' },
        { lineNum: 7, content: <span>claude</span>, raw: 'claude' },
      ];
    }

    if (activeTab === 'cli') {
      return [
        { lineNum: 1, content: <span className="text-neutral-400 font-normal">{language === 'zh' ? '# 全局 OpenAI 兼容环境变量' : '# Global OpenAI compatible env vars'}</span>, raw: '# Global Env' },
        { lineNum: 2, content: <span><span className="text-purple-600 font-semibold">export</span> OPENAI_BASE_URL=<span className="text-emerald-600">"https://api.fytapi.com/v1"</span></span>, raw: 'export OPENAI_BASE_URL="https://api.fytapi.com/v1"' },
        { lineNum: 3, content: <span><span className="text-purple-600 font-semibold">export</span> OPENAI_API_KEY=<span className="text-emerald-600">"&lt;FYTAPI_API_KEY&gt;"</span></span>, raw: 'export OPENAI_API_KEY="<FYTAPI_API_KEY>"' },
        { lineNum: 4, content: <span></span>, raw: '' },
        { lineNum: 5, content: <span className="text-neutral-400 font-normal">{language === 'zh' ? '# 测试连通性' : '# Test connectivity'}</span>, raw: '# Test' },
        { lineNum: 6, content: <span>curl $OPENAI_BASE_URL/models -H <span className="text-emerald-600">"Authorization: Bearer $OPENAI_API_KEY"</span></span>, raw: 'curl $OPENAI_BASE_URL/models -H "Authorization: Bearer $OPENAI_API_KEY"' },
      ];
    }

    return [
      { lineNum: 1, content: <span className="text-neutral-400 font-normal">{language === 'zh' ? '# Dify / FastGPT / NextChat / Cline 接入配置' : '# Dify / FastGPT / NextChat / Cline Setup'}</span>, raw: '# Third Party Client Setup' },
      { lineNum: 2, content: <span>API Endpoint: <span className="text-emerald-600">https://api.fytapi.com/v1</span></span>, raw: 'API Endpoint: https://api.fytapi.com/v1' },
      { lineNum: 3, content: <span>API Key:      <span className="text-emerald-600">&lt;FYTAPI_API_KEY&gt;</span></span>, raw: 'API Key: <FYTAPI_API_KEY>' },
      { lineNum: 4, content: <span>Model:        <span className="text-emerald-600">{currentModel.id}</span></span>, raw: `Model: ${currentModel.id}` },
    ];
  };

  const codeLines = getCodeLines();

  const handleCopy = () => {
    const rawText = codeLines.map(l => l.raw).join('\n');
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getFileName = () => {
    if (activeTab === 'api') {
      if (codeLang === 'python') return 'quickstart.py';
      if (codeLang === 'ts') return 'quickstart.ts';
      if (codeLang === 'curl') return 'curl.sh';
      if (codeLang === 'go') return 'main.go';
      if (codeLang === 'java') return 'Quickstart.java';
      if (codeLang === 'rust') return 'main.rs';
      if (codeLang === 'php') return 'quickstart.php';
      if (codeLang === 'ruby') return 'quickstart.rb';
    }
    if (activeTab === 'codex') return 'config.json';
    if (activeTab === 'claude') return '.env';
    if (activeTab === 'cli') return '.bashrc';
    return 'settings.env';
  };

  return (
    <section id="quickstart-section" className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title & Subtitle (Exact match to Image 3) */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight">
            {language === 'zh' ? '快速开始' : 'Quickstart'}
          </h2>
          <div className="mt-4 space-y-1 text-base sm:text-lg text-neutral-700 font-normal">
            <p>
              {language === 'zh' 
                ? '100% 协议兼容，只改一行 Base URL，即可接入生产环境；' 
                : '100% Protocol compatible. Change just one line of Base URL to connect your production app;'}
            </p>
            <p>
              {language === 'zh' 
                ? '配置环境变量，即可一键接入 Codex / Claude Code / Cline / Dify。' 
                : 'Set environment variables to instantly power Codex, Claude Code, Cline, and Dify.'}
            </p>
          </div>
        </div>

        {/* 2-Column Layout (Image 3) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column (Image 3 left side) */}
          <div className="lg:col-span-4 space-y-4">
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed mb-4">
              {language === 'zh'
                ? '同样适用于 Codex、Claude Desktop、OpenClaw、CC-Switch，以及任何兼容 OpenAI 协议的客户端。'
                : 'Equally compatible with Codex, Claude Desktop, OpenClaw, CC-Switch, and any OpenAI/Anthropic SDK.'}
            </p>

            {/* Action Card 1: 查看 API 文档 (Image 3) */}
            <div
              onClick={onOpenApiKey}
              className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-xs hover:border-neutral-300 hover:shadow-sm transition-all cursor-pointer group flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                {/* Code Doc + Plus Icon */}
                <div className="w-10 h-10 rounded-xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-neutral-700" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="12" y1="18" x2="12" y2="12" />
                    <line x1="9" y1="15" x2="15" y2="15" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900 group-hover:text-orange-600 transition-colors">
                    {language === 'zh' ? '查看 API 文档' : 'API Documentation'}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    {language === 'zh' ? '接入生产环境或 Agent Harness' : 'Integrate with production or Agent Harness'}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
            </div>

            {/* Action Card 2: 快速配置 Claude Code CLI */}
            <div
              onClick={() => setActiveTab('claude')}
              className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-xs hover:border-neutral-300 hover:shadow-sm transition-all cursor-pointer group flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                {/* Screen / Desktop Monitor Icon */}
                <div className="w-10 h-10 rounded-xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-neutral-700" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900 group-hover:text-orange-600 transition-colors">
                    {language === 'zh' ? 'Claude Code / Codex 环境变量' : 'Claude Code / Codex Env Vars'}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    {language === 'zh' ? '复制环境变量即插即用，免额外配置（终端推荐）' : 'Copy env variables to launch directly in terminal'}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
            </div>

          </div>

          {/* Right Column: High Fidelity Code Playground (Image 3) */}
          <div className="lg:col-span-8">
            
            {/* Top Navigation Tabs with Underline (Image 3) */}
            <div className="flex items-center gap-6 sm:gap-8 border-b border-neutral-200 text-sm font-medium pb-px overflow-x-auto">
              {[
                { id: 'api', label: 'API' },
                { id: 'codex', label: language === 'zh' ? 'Codex 客户端' : 'Codex Client' },
                { id: 'claude', label: language === 'zh' ? 'Claude 客户端' : 'Claude Client' },
                { id: 'cli', label: language === 'zh' ? '命令行' : 'CLI / Terminal' },
                { id: 'others', label: language === 'zh' ? '其他' : 'Others' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-3 whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'border-b-2 border-neutral-900 text-neutral-900 font-bold'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Language Sub-bar (Image 3) */}
            {activeTab === 'api' && (
              <div className="flex flex-wrap items-center justify-between gap-2 mt-4 mb-3">
                <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-mono">
                  {[
                    { id: 'python', label: 'Python' },
                    { id: 'ts', label: 'TypeScript' },
                    { id: 'curl', label: 'curl' },
                    { id: 'go', label: 'Go' },
                    { id: 'java', label: 'Java' },
                    { id: 'rust', label: 'Rust' },
                    { id: 'php', label: 'PHP' },
                    { id: 'ruby', label: 'Ruby' },
                  ].map((l) => (
                    <button
                      key={l.id}
                      onClick={() => setCodeLang(l.id as any)}
                      className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                        codeLang === l.id
                          ? 'bg-neutral-100 text-neutral-900 font-bold border border-neutral-200 shadow-2xs'
                          : 'text-neutral-500 hover:text-neutral-800'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>

                {/* Right Link */}
                <button
                  onClick={onOpenApiKey}
                  className="text-xs text-neutral-500 hover:text-neutral-900 flex items-center gap-1 font-sans transition-colors cursor-pointer"
                >
                  <span>{language === 'zh' ? '查看 API 文档' : 'View Docs'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Code Box Container (Exact match to Image 3) */}
            <div className="mt-3 rounded-2xl bg-white border border-neutral-200/90 shadow-xs overflow-hidden">
              
              {/* Window Header */}
              <div className="px-4 py-3 bg-neutral-50/50 border-b border-neutral-200/80 flex items-center justify-between">
                
                {/* Traffic Light Dots */}
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                </div>

                {/* Centered File Name */}
                <div className="text-xs font-mono text-neutral-500">
                  {getFileName()}
                </div>

                {/* Right Controls: Model selector + Copy */}
                <div className="flex items-center gap-2">
                  {/* Model Dropdown */}
                  <div className="relative inline-block">
                    <select
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      className="appearance-none bg-white border border-neutral-200 rounded-md pl-5 pr-6 py-1 text-xs font-mono text-neutral-700 hover:border-neutral-300 focus:outline-hidden cursor-pointer"
                    >
                      {POPULAR_MODELS.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name}
                        </option>
                      ))}
                    </select>
                    {/* Small Dot Bullet */}
                    <div className="absolute left-2.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-neutral-900 pointer-events-none" />
                    <ChevronDown className="w-3 h-3 text-neutral-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  {/* Copy Button */}
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50 text-xs font-mono transition-all cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-600 font-medium">{language === 'zh' ? '已复制' : 'Copied'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-neutral-500" />
                        <span>{language === 'zh' ? '复制' : 'Copy'}</span>
                      </>
                    )}
                  </button>
                </div>

              </div>

              {/* Code Content Area with Line Numbers (Image 3) */}
              <div className="p-4 sm:p-6 bg-white overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed select-text">
                <table className="w-full border-collapse">
                  <tbody>
                    {codeLines.map((line) => (
                      <tr key={line.lineNum} className="hover:bg-neutral-50/50">
                        <td className="w-8 pr-4 text-right text-neutral-300 select-none font-mono text-xs align-top">
                          {line.lineNum}
                        </td>
                        <td className="text-neutral-800 whitespace-pre align-top">
                          {line.content}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>

            {/* Bottom Footer Note (Image 3) */}
            <div className="mt-4 text-xs sm:text-sm text-neutral-500">
              {language === 'zh' 
                ? '把 Base URL 指向 FYTAPI (福易通)、填入你的 API Key，其余代码保持不变。' 
                : 'Point Base URL to FYTAPI, insert your API Key, and keep the rest of your code unchanged.'}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
