import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SimulationBanner } from './components/layout/SimulationBanner';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Pages
import { LandingPage } from './pages/LandingPage';
import { MarketsPage } from './pages/MarketsPage';
import { AssetDetailPage } from './pages/AssetDetailPage';
import { TradingWorkspacePage } from './pages/TradingWorkspacePage';
import { PortfolioPage } from './pages/PortfolioPage';
import { WatchlistPage } from './pages/WatchlistPage';
import { HistoryPage } from './pages/HistoryPage';
import { GdtPage } from './pages/GdtPage';
import { LearnPage } from './pages/LearnPage';
import { AccountPage } from './pages/AccountPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gada-midnight text-white selection:bg-gada-violet selection:text-white">
        {/* Universal Simulation Header Notice */}
        <SimulationBanner />

        {/* Navigation Bar */}
        <Navbar />

        {/* Dynamic Route Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/markets" element={<MarketsPage />} />
            <Route path="/market/:symbol" element={<AssetDetailPage />} />
            <Route path="/trade" element={<TradingWorkspacePage />} />
            <Route path="/trade/:pair" element={<TradingWorkspacePage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/watchlist" element={<WatchlistPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/gdt" element={<GdtPage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/account" element={<AccountPage />} />

            {/* 404 Fallback */}
            <Route
              path="*"
              element={
                <div className="py-24 text-center space-y-4">
                  <h1 className="text-4xl font-black text-white">404</h1>
                  <p className="text-sm text-gada-muted">The requested exchange route does not exist.</p>
                  <Navigate to="/" replace />
                </div>
              }
            />
          </Routes>
        </main>

        {/* Exchange Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
};
export default App;
