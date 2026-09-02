import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PricingSection } from './components/PricingSection';
import { MetricStatsBanner } from './components/MetricStatsBanner';
import { QuickStartSection } from './components/QuickStartSection';
import { ProductionRoutingSection } from './components/ProductionRoutingSection';
import { RoutingAlgorithmSimulation } from './components/RoutingAlgorithmSimulation';
import { RealtimeDiscountChart } from './components/RealtimeDiscountChart';
import { UsageLeaderboardSection } from './components/UsageLeaderboardSection';
import { ThreeWarpTunnel } from './components/ThreeWarpTunnel';
import { TokenValueBannerSection } from './components/TokenValueBannerSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { WeChatFloatingWidget } from './components/WeChatFloatingWidget';
import { ApiKeyModal } from './components/ApiKeyModal';

function MainContent() {
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);
  const [selectedQuickstartModel, setSelectedQuickstartModel] = useState<string>('gpt-5.6-sol');

  const handleSelectModel = (modelId: string) => {
    setSelectedQuickstartModel(modelId);
    const elem = document.getElementById('quickstart-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-orange-500 selection:text-white flex flex-col font-sans">
      {/* Top Fixed Navbar */}
      <Navbar
        onOpenApiKey={() => setApiKeyModalOpen(true)}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 1. Hero with Interactive Node Routing Topology & Protocol Bar */}
        <HeroSection
          onOpenApiKey={() => setApiKeyModalOpen(true)}
        />

        {/* 2. Real-time Pricing Cards (0.9折 ~ 2.4折) & Catalog Modal */}
        <PricingSection
          onSelectModelForQuickstart={handleSelectModel}
          onOpenApiKey={() => setApiKeyModalOpen(true)}
        />

        {/* 3. 4-Metrics Stats Row & Peach/Orange Sunset Pay-as-you-go Banner */}
        <MetricStatsBanner
          onOpenApiKey={() => setApiKeyModalOpen(true)}
        />

        {/* 4. Quickstart Interactive Code Playground & Client Download Cards */}
        <QuickStartSection
          selectedModelId={selectedQuickstartModel}
          onOpenApiKey={() => setApiKeyModalOpen(true)}
        />

        {/* 5. 3 Production Pillars (Price, First Token, Uptime) & 6 Value Cards */}
        <ProductionRoutingSection />

        {/* 6. Production Routing Failover Algorithm Simulator */}
        <RoutingAlgorithmSimulation />

        {/* 7. 48-Hour Realtime Discount Fluctuating Line Chart with Model Picker */}
        <RealtimeDiscountChart
          onOpenApiKey={() => setApiKeyModalOpen(true)}
        />

        {/* 8. 30-Day Token Usage Stacked Chart & Agent/Model Leaderboard */}
        <UsageLeaderboardSection />

        {/* 9. 每一份 token 都更划算 Full-Bleed Prototype Hero Canvas */}
        <TokenValueBannerSection
          onOpenApiKey={() => setApiKeyModalOpen(true)}
        />

        {/* 10. FAQ Section */}
        <FaqSection
          onOpenApiKey={() => setApiKeyModalOpen(true)}
        />
      </main>

      {/* 11. Split Footer (Sky Clouds Card + Cream Links Grid + Vintage Stamp) */}
      <Footer
        onOpenApiKey={() => setApiKeyModalOpen(true)}
      />

      {/* 12. Bottom Cosmic Chromatic Hyperspace Warp Speed Tunnel (Prototype Image 2) */}
      <ThreeWarpTunnel />

      {/* Floating WeChat QR Card Widget (Right bottom) */}
      <WeChatFloatingWidget />

      {/* Modals */}
      <ApiKeyModal
        isOpen={apiKeyModalOpen}
        onClose={() => setApiKeyModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
}


