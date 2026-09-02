import { ModelPriceInfo, AgentLeaderboardItem, ModelLeaderboardItem, DailyUsageData, FaqItem } from '../types';

export const POPULAR_MODELS: ModelPriceInfo[] = [
  {
    id: 'gpt-5.6-sol',
    name: 'GPT-5.6 Sol',
    provider: 'OpenAI',
    providerName: 'OpenAI',
    context: '上下文 1M',
    discount: 0.9,
    discountDisplay: '0.9 折',
    inputOriginal: 5.0,
    inputDiscounted: 0.48,
    outputOriginal: 30.0,
    outputDiscounted: 2.88,
    cachedPrice: 0.0445,
    fastMode: true,
    avg48h: '0.9 折',
    min48h: '0.8 折',
    history48h: [0.92, 0.91, 0.90, 0.90, 0.89, 0.91, 0.93, 0.90, 0.88, 0.92, 0.94, 0.95, 0.90, 0.88, 0.89, 0.90, 0.91, 1.15, 1.18, 0.92, 0.90, 0.89, 0.90, 0.91, 0.92, 0.90, 0.93, 0.91, 0.89, 0.90, 0.92, 0.95, 0.98, 1.05, 0.95, 0.92, 0.90, 0.91, 0.90, 0.89, 0.90, 0.91, 0.94, 0.99, 1.02, 0.92, 0.90, 0.90]
  },
  {
    id: 'claude-opus-5',
    name: 'Claude Opus 5',
    provider: 'Anthropic',
    providerName: 'Anthropic',
    context: '上下文 1M',
    discount: 2.0,
    discountDisplay: '2 折',
    inputOriginal: 5.0,
    inputDiscounted: 1.04,
    outputOriginal: 25.0,
    outputDiscounted: 5.2,
    cachedPrice: 0.104,
    avg48h: '2.1 折',
    min48h: '1.9 折',
    history48h: [2.1, 2.0, 2.0, 1.9, 1.9, 2.0, 2.2, 2.1, 2.0, 2.0, 2.3, 2.1, 2.0, 1.9, 2.0, 2.1, 2.0, 2.4, 2.2, 2.0, 1.9, 2.0, 2.0, 2.1, 2.0, 1.9, 2.0, 2.2, 2.1, 2.0, 1.9, 2.0, 2.1, 2.2, 2.0, 1.9, 2.0, 2.1, 2.0, 1.9, 2.0, 2.0, 2.1, 2.3, 2.1, 2.0, 2.0, 2.0]
  },
  {
    id: 'claude-fable-5',
    name: 'Claude Fable 5',
    provider: 'Anthropic',
    providerName: 'Anthropic',
    context: '上下文 1M',
    discount: 2.4,
    discountDisplay: '2.4 折',
    inputOriginal: 10.0,
    inputDiscounted: 2.47,
    outputOriginal: 50.0,
    outputDiscounted: 12.35,
    cachedPrice: 0.247,
    avg48h: '2.5 折',
    min48h: '2.2 折',
    history48h: [2.5, 2.4, 2.4, 2.3, 2.4, 2.5, 2.6, 2.4, 2.3, 2.4, 2.5, 2.4, 2.3, 2.2, 2.3, 2.4, 2.4, 2.7, 2.5, 2.4, 2.3, 2.4, 2.4, 2.5, 2.4, 2.3, 2.4, 2.6, 2.5, 2.4, 2.3, 2.4, 2.5, 2.6, 2.4, 2.3, 2.4, 2.5, 2.4, 2.3, 2.4, 2.4, 2.5, 2.7, 2.5, 2.4, 2.4, 2.4]
  },
  {
    id: 'kimi-k3',
    name: 'Kimi K3',
    provider: 'Kimi',
    providerName: 'Kimi',
    context: '上下文 1M',
    discount: 7.7,
    discountDisplay: '7.7 折',
    inputOriginal: 3.0,
    inputDiscounted: 2.33,
    outputOriginal: 15.0,
    outputDiscounted: 11.64,
    cachedPrice: 0.233,
    avg48h: '7.8 折',
    min48h: '7.5 折',
    history48h: [7.8, 7.7, 7.7, 7.6, 7.7, 7.8, 7.9, 7.7, 7.6, 7.7, 7.8, 7.7, 7.6, 7.5, 7.6, 7.7, 7.7, 8.0, 7.8, 7.7, 7.6, 7.7, 7.7, 7.8, 7.7, 7.6, 7.7, 7.9, 7.8, 7.7, 7.6, 7.7, 7.8, 7.9, 7.7, 7.6, 7.7, 7.8, 7.7, 7.6, 7.7, 7.7, 7.8, 8.0, 7.8, 7.7, 7.7, 7.7]
  },
  {
    id: 'deepseek-v4-flash',
    name: 'DeepSeek V4 Flash 正式版',
    provider: 'DeepSeek',
    providerName: 'DeepSeek',
    context: '上下文 1M',
    discount: 6.3,
    discountDisplay: '6.3 折',
    limitedPromo: true,
    inputOriginal: 0.44,
    inputDiscounted: 0.281,
    outputOriginal: 1.32,
    outputDiscounted: 0.844,
    cachedPrice: 0.028,
    avg48h: '6.4 折',
    min48h: '5.9 折',
    history48h: [6.4, 6.3, 6.3, 6.1, 6.2, 6.4, 6.5, 6.3, 6.0, 6.2, 6.3, 6.2, 6.0, 5.9, 6.1, 6.3, 6.2, 6.6, 6.4, 6.3, 6.0, 6.1, 6.2, 6.4, 6.3, 6.1, 6.3, 6.5, 6.4, 6.3, 6.1, 6.2, 6.4, 6.5, 6.3, 6.0, 6.2, 6.3, 6.2, 6.1, 6.2, 6.3, 6.4, 6.6, 6.4, 6.3, 6.3, 6.3]
  },
  {
    id: 'glm-5.3-flash',
    name: 'GLM-5.3-Flash (Ox Alpha)',
    provider: 'GLM',
    providerName: 'GLM',
    context: '上下文 1M',
    discount: 5.3,
    discountDisplay: '5.3 折',
    limitedPromo: true,
    inputOriginal: 0.114,
    inputDiscounted: 0.0612,
    outputOriginal: 0.4,
    outputDiscounted: 0.21,
    cachedPrice: 0.006,
    avg48h: '5.4 折',
    min48h: '4.8 折',
    history48h: [5.4, 5.3, 5.2, 5.0, 5.1, 5.3, 5.5, 5.3, 5.0, 5.2, 5.3, 5.2, 5.0, 4.8, 5.0, 5.2, 5.2, 5.6, 5.4, 5.3, 5.0, 5.1, 5.2, 5.4, 5.3, 5.1, 5.3, 5.5, 5.4, 5.3, 5.1, 5.2, 5.4, 5.5, 5.3, 5.0, 5.2, 5.3, 5.2, 5.1, 5.2, 5.3, 5.4, 5.6, 5.4, 5.3, 5.3, 5.3]
  },
  {
    id: 'gpt-5.6-terra',
    name: 'GPT-5.6 Terra',
    provider: 'OpenAI',
    providerName: 'OpenAI',
    context: '上下文 1M',
    discount: 0.8,
    discountDisplay: '0.8 折',
    inputOriginal: 3.5,
    inputDiscounted: 0.28,
    outputOriginal: 14.0,
    outputDiscounted: 1.12,
    cachedPrice: 0.035,
    avg48h: '0.8 折',
    min48h: '0.7 折',
    history48h: [0.82, 0.81, 0.80, 0.79, 0.81, 0.83, 0.80, 0.78, 0.82, 0.84, 0.85, 0.80, 0.78, 0.79, 0.80, 0.81, 0.95, 0.98, 0.82, 0.80, 0.79, 0.80, 0.81, 0.82, 0.80, 0.83, 0.81, 0.79, 0.80, 0.82, 0.85, 0.88, 0.95, 0.85, 0.82, 0.80, 0.81, 0.80, 0.79, 0.80, 0.81, 0.84, 0.89, 0.92, 0.82, 0.80, 0.80, 0.80]
  },
  {
    id: 'gpt-5.6-luna',
    name: 'GPT-5.6 Luna',
    provider: 'OpenAI',
    providerName: 'OpenAI',
    context: '上下文 2M',
    discount: 4.3,
    discountDisplay: '4.3 折',
    inputOriginal: 2.0,
    inputDiscounted: 0.86,
    outputOriginal: 8.0,
    outputDiscounted: 3.44,
    cachedPrice: 0.086,
    avg48h: '4.4 折',
    min48h: '4.1 折',
    history48h: [4.4, 4.3, 4.3, 4.2, 4.3, 4.4, 4.5, 4.3, 4.2, 4.3, 4.4, 4.3, 4.2, 4.1, 4.2, 4.3, 4.3, 4.6, 4.4, 4.3, 4.2, 4.3, 4.3, 4.4, 4.3, 4.2, 4.3, 4.5, 4.4, 4.3, 4.2, 4.3, 4.4, 4.5, 4.3, 4.2, 4.3, 4.4, 4.3, 4.2, 4.3, 4.3, 4.4, 4.6, 4.4, 4.3, 4.3, 4.3]
  },
  {
    id: 'gemini-2.5-pro',
    name: 'Gemini 2.5 Pro',
    provider: 'Google',
    providerName: 'Google',
    context: '上下文 2M',
    discount: 1.5,
    discountDisplay: '1.5 折',
    inputOriginal: 1.25,
    inputDiscounted: 0.187,
    outputOriginal: 5.0,
    outputDiscounted: 0.75,
    cachedPrice: 0.03,
    avg48h: '1.6 折',
    min48h: '1.4 折',
    history48h: [1.6, 1.5, 1.5, 1.4, 1.5, 1.6, 1.7, 1.5, 1.4, 1.5, 1.6, 1.5, 1.4, 1.4, 1.5, 1.5, 1.5, 1.8, 1.6, 1.5, 1.4, 1.5, 1.5, 1.6, 1.5, 1.4, 1.5, 1.7, 1.6, 1.5, 1.4, 1.5, 1.6, 1.7, 1.5, 1.4, 1.5, 1.6, 1.5, 1.4, 1.5, 1.5, 1.6, 1.8, 1.6, 1.5, 1.5, 1.5]
  },
  {
    id: 'grok-3-ultra',
    name: 'Grok 3 Ultra',
    provider: 'Grok',
    providerName: 'xAI',
    context: '上下文 1M',
    discount: 3.2,
    discountDisplay: '3.2 折',
    inputOriginal: 4.0,
    inputDiscounted: 1.28,
    outputOriginal: 16.0,
    outputDiscounted: 5.12,
    cachedPrice: 0.128,
    avg48h: '3.3 折',
    min48h: '3.0 折',
    history48h: [3.3, 3.2, 3.2, 3.1, 3.2, 3.3, 3.4, 3.2, 3.1, 3.2, 3.3, 3.2, 3.1, 3.0, 3.1, 3.2, 3.2, 3.5, 3.3, 3.2, 3.1, 3.2, 3.2, 3.3, 3.2, 3.1, 3.2, 3.4, 3.3, 3.2, 3.1, 3.2, 3.3, 3.4, 3.2, 3.1, 3.2, 3.3, 3.2, 3.1, 3.2, 3.2, 3.3, 3.5, 3.3, 3.2, 3.2, 3.2]
  }
];

export const AGENT_LEADERBOARD: AgentLeaderboardItem[] = [
  {
    rank: 1,
    name: 'Codex Desktop',
    icon: 'codex',
    tokens: '2362.8B tokens',
    tasks: '任务 18940K 次',
    trend: '18.2%',
    isUp: true
  },
  {
    rank: 2,
    name: 'Claude CLI',
    icon: 'claude',
    tokens: '870.5B tokens',
    tasks: '任务 5363.2K 次',
    trend: '11.2%',
    isUp: true
  },
  {
    rank: 3,
    name: 'Codex CLI',
    icon: 'codex',
    tokens: '293.4B tokens',
    tasks: '任务 4925.3K 次',
    trend: '850.5%',
    isUp: true
  },
  {
    rank: 4,
    name: 'Cursor IDE Pro',
    icon: 'cursor',
    tokens: '245.1B tokens',
    tasks: '任务 3180.6K 次',
    trend: '34.8%',
    isUp: true
  },
  {
    rank: 5,
    name: 'Windsurf Agent',
    icon: 'windsurf',
    tokens: '198.6B tokens',
    tasks: '任务 2410.9K 次',
    trend: '42.1%',
    isUp: true
  },
  {
    rank: 6,
    name: 'Cline (VS Code)',
    icon: 'cline',
    tokens: '162.3B tokens',
    tasks: '任务 1890.1K 次',
    trend: '19.5%',
    isUp: true
  }
];

export const MODEL_LEADERBOARD: ModelLeaderboardItem[] = [
  {
    rank: 1,
    name: 'GPT-5.6 Sol',
    icon: 'openai',
    tokens: '2775.0B tokens',
    firstTokenLatency: '首字延时 1931ms',
    successRate: '成功率 99.45%',
    trend: '22.7%',
    isUp: true
  },
  {
    rank: 2,
    name: 'DeepSeek V4 Flash 正式版',
    icon: 'deepseek',
    tokens: '1614.2B tokens',
    firstTokenLatency: '首字延时 1333ms',
    successRate: '成功率 99.61%',
    trend: '38.4%',
    isUp: true
  },
  {
    rank: 3,
    name: 'GPT-5.6 Terra',
    icon: 'openai',
    tokens: '767.8B tokens',
    firstTokenLatency: '首字延时 2204ms',
    successRate: '成功率 99.64%',
    trend: '15.9%',
    isUp: true
  },
  {
    rank: 4,
    name: 'Claude 3.5 Sonnet v2',
    icon: 'claude',
    tokens: '689.4B tokens',
    firstTokenLatency: '首字延时 1620ms',
    successRate: '成功率 99.78%',
    trend: '8.4%',
    isUp: true
  },
  {
    rank: 5,
    name: 'Gemini 2.5 Flash',
    icon: 'gemini',
    tokens: '430.1B tokens',
    firstTokenLatency: '首字延时 890ms',
    successRate: '成功率 99.89%',
    trend: '54.2%',
    isUp: true
  }
];

export const DAILY_USAGE_DATA: DailyUsageData[] = [
  { date: '08/03', gpt: 180, claude: 120, deepseek: 90, kimi: 40, others: 30, total: 460 },
  { date: '08/04', gpt: 160, claude: 110, deepseek: 80, kimi: 35, others: 25, total: 410 },
  { date: '08/05', gpt: 200, claude: 130, deepseek: 100, kimi: 45, others: 35, total: 510 },
  { date: '08/06', gpt: 230, claude: 140, deepseek: 120, kimi: 50, others: 40, total: 580 },
  { date: '08/07', gpt: 220, claude: 135, deepseek: 115, kimi: 48, others: 38, total: 556 },
  { date: '08/08', gpt: 150, claude: 90, deepseek: 70, kimi: 30, others: 20, total: 360 },
  { date: '08/09', gpt: 130, claude: 80, deepseek: 60, kimi: 25, others: 15, total: 310 },
  { date: '08/10', gpt: 190, claude: 125, deepseek: 95, kimi: 42, others: 32, total: 484 },
  { date: '08/11', gpt: 220, claude: 140, deepseek: 110, kimi: 50, others: 40, total: 560 },
  { date: '08/12', gpt: 240, claude: 150, deepseek: 130, kimi: 55, others: 45, total: 620 },
  { date: '08/13', gpt: 210, claude: 130, deepseek: 105, kimi: 46, others: 36, total: 527 },
  { date: '08/14', gpt: 225, claude: 145, deepseek: 118, kimi: 52, others: 42, total: 582 },
  { date: '08/15', gpt: 170, claude: 105, deepseek: 85, kimi: 38, others: 28, total: 426 },
  { date: '08/16', gpt: 230, claude: 150, deepseek: 125, kimi: 55, others: 45, total: 605 },
  { date: '08/17', gpt: 270, claude: 175, deepseek: 150, kimi: 65, others: 55, total: 715 },
  { date: '08/18', gpt: 310, claude: 200, deepseek: 180, kimi: 75, others: 65, total: 830 },
  { date: '08/19', gpt: 350, claude: 230, deepseek: 210, kimi: 90, others: 75, total: 955 },
  { date: '08/20', gpt: 330, claude: 215, deepseek: 195, kimi: 85, others: 70, total: 895 },
  { date: '08/21', gpt: 260, claude: 170, deepseek: 145, kimi: 65, others: 50, total: 690 },
  { date: '08/22', gpt: 280, claude: 180, deepseek: 160, kimi: 70, others: 55, total: 745 },
  { date: '08/23', gpt: 370, claude: 245, deepseek: 230, kimi: 95, others: 80, total: 1020 },
  { date: '08/24', gpt: 420, claude: 280, deepseek: 260, kimi: 110, others: 95, total: 1165 },
  { date: '08/25', gpt: 440, claude: 295, deepseek: 280, kimi: 120, others: 100, total: 1235 },
  { date: '08/26', gpt: 410, claude: 270, deepseek: 250, kimi: 105, others: 90, total: 1125 },
  { date: '08/27', gpt: 430, claude: 285, deepseek: 270, kimi: 115, others: 95, total: 1195 },
  { date: '08/28', gpt: 390, claude: 260, deepseek: 240, kimi: 100, others: 85, total: 1075 },
  { date: '08/29', gpt: 360, claude: 240, deepseek: 220, kimi: 90, others: 75, total: 985 },
  { date: '08/30', gpt: 490, claude: 340, deepseek: 320, kimi: 140, others: 120, total: 1410 },
  { date: '08/31', gpt: 460, claude: 310, deepseek: 290, kimi: 130, others: 110, total: 1300 },
  { date: '09/01', gpt: 480, claude: 330, deepseek: 310, kimi: 135, others: 115, total: 1370 }
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: '什么是 LLM 路由？',
    questionEn: 'What is LLM Routing?',
    answer: 'LLM 智能路由层如同大模型请求的高速调度中心。它通过对全网上千家合规供应商进行实时延迟监控、吞吐量评估与竞价测算，将每一个发往模型的 Prompt 动态指派至质量最优、速度最快且成本最低的健康节点，同时提供原生 Prompt Caching 与毫秒级故障自动容灾。',
    answerEn: 'The LLM smart routing layer acts as a high-speed dispatch hub for AI model requests. By continuously monitoring latency, throughput, and spot pricing across verified suppliers, it dynamically routes prompts to the fastest, highest quality, and most cost-effective healthy node with sub-second failover.'
  },
  {
    id: 'faq-2',
    question: '福易通API 兼容 OpenAI 协议吗？',
    questionEn: 'Is FYTAPI compatible with OpenAI API specifications?',
    answer: '100% 协议级原生兼容。任何支持 OpenAI 格式的客户端（如 Cursor、Claude Code、Codex、Cline、LangChain、LlamaIndex、Dify、NextChat、OpenClaw 等），只需将 base_url 改为 https://api.fytapi.com/v1 并填入福易通 API Key，无需对原有业务逻辑与 Prompt 做任何改动即可无缝接入。',
    answerEn: '100% native protocol compatibility. Any SDK or client supporting OpenAI specs (Cursor, Claude Code, Codex, Cline, LangChain, Dify, NextChat, etc.) can connect simply by setting baseURL to https://api.fytapi.com/v1 and supplying your FYTAPI key.'
  },
  {
    id: 'faq-3',
    question: '价格为什么能低至 1 折？',
    questionEn: 'Why can prices be as low as 90%+ discount?',
    answer: '福易通API 汇聚了庞大的企业级调用体量，与全球头部云厂商及顶级大模型算力池直签规模化采购协议；同时结合自研的实时高频竞价引擎与提示词智能缓存（Prompt Cache）技术，将冗余成本直接省下并全额让利给开发者，因此可在保证原厂质量的前提下打出极致折扣。',
    answerEn: 'FYTAPI aggregates massive enterprise-tier volume to negotiate deep wholesale pricing directly with leading cloud infrastructure and GPU clusters. Combined with real-time bidding algorithms and prompt caching, savings are passed directly to developers.'
  },
  {
    id: 'faq-4',
    question: '我的数据会被拿去训练模型吗？',
    questionEn: 'Will my data ever be used to train models?',
    answer: '绝对不会。福易通API 严格遵循企业级数据安全与合规协议。所有 Prompt 与返回结果均直接通过专线传输至上游已验证安全通道，平台仅进行瞬时流量转发、Token 计量与计费统计，绝不持久化落盘，绝不用于任何模型的微调与预训练，绝不出售。',
    answerEn: 'Never. FYTAPI strictly adheres to enterprise-grade compliance and privacy standards. Prompts and completions stream directly through secure encrypted tunnels with zero disk retention, zero model training, and zero data selling.'
  },
  {
    id: 'faq-5',
    question: '额度会过期吗？',
    questionEn: 'Do purchased credits expire?',
    answer: '永不过期。福易通API 采用纯粹的按量计费（Pay-as-you-go）模式，充值的美元余额将永久保存在您的账户中，随用随扣，无月费、无最低消费限制、无强制订阅包。',
    answerEn: 'Never expire. FYTAPI uses true pay-as-you-go pricing. Your balance remains permanently in your account with zero recurring monthly fees, zero minimum spends, and no forced recurring subscriptions.'
  },
  {
    id: 'faq-6',
    question: '遇到上游节点宕机如何保障高可用？',
    questionEn: 'How does high availability work during upstream outages?',
    answer: '福易通API 具备毫秒级健康探针与多层级自动故障转移（Failover）机制。当某一供应商或机房出现响应超时、限流或 5xx 错误时，系统将在 10ms 内无感平滑重试并将请求切换至备用健康算力池，确保生产环境业务 99.99% 高可用。',
    answerEn: 'FYTAPI features sub-millisecond health probing and multi-tier automatic failover. When an upstream node experiences throttling or 5xx downtime, requests automatically retry against redundant healthy clusters within 10ms.'
  }
];
