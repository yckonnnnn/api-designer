export interface ModelPriceInfo {
  id: string;
  name: string;
  provider: 'OpenAI' | 'Anthropic' | 'Google' | 'Kimi' | 'DeepSeek' | 'GLM' | 'Grok';
  providerName: string;
  context: string;
  discount: number; // e.g. 0.9 for 0.9折 (90% off = 0.1x price or 9折)
  discountDisplay: string; // "0.9 折", "2 折", "限时0.01折"
  inputOriginal: number; // in USD per 1M tokens
  inputDiscounted: number;
  outputOriginal: number;
  outputDiscounted: number;
  cachedPrice?: number;
  fastMode?: boolean;
  limitedPromo?: boolean;
  history48h: number[]; // 48 hourly discount points
  avg48h: string;
  min48h: string;
}

export interface AgentLeaderboardItem {
  rank: number;
  name: string;
  icon: string;
  tokens: string;
  tasks: string;
  trend: string;
  isUp: boolean;
}

export interface ModelLeaderboardItem {
  rank: number;
  name: string;
  icon: string;
  tokens: string;
  firstTokenLatency: string;
  successRate: string;
  trend: string;
  isUp: boolean;
}

export interface DailyUsageData {
  date: string;
  gpt: number;
  claude: number;
  deepseek: number;
  kimi: number;
  others: number;
  total: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  questionEn?: string;
  answerEn?: string;
}
