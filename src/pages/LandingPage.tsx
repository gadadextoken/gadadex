import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  BarChart2,
  Sparkles,
  BookOpen,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  Coins,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Sparkline } from '../components/common/Sparkline';
import { MarketMovers } from '../components/markets/MarketMovers';
import { useMarketStore } from '../store/marketStore';

export const LandingPage: React.FC = () => {
  const { assets } = useMarketStore();

  const btc = assets.find((a) => a.symbol === 'BTC');
  const eth = assets.find((a) => a.symbol === 'ETH');
  const gdt = assets.find((a) => a.symbol === 'GDT');

  const featured = assets.slice(0, 6);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 md:pt-20 pb-16 border-b border-gada-border/40">
        {/* Abstract glowing backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-gada-violet/30 via-gada-electric/20 to-gada-magenta/20 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gada-violet/15 border border-gada-violet/30 text-gada-magenta text-xs font-semibold shadow-glow-purple animate-fadeIn">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Generation Exchange Simulation Environment</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">
            Explore the{' '}
            <span className="bg-gradient-to-r from-white via-gada-magenta to-gada-electric bg-clip-text text-transparent">
              Digital Asset Market.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gada-muted max-w-2xl mx-auto leading-relaxed">
            Discover digital assets, explore market movements and experience a modern trading interface in simulation mode. Practice with 10,000 virtual USDT without financial risk.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/markets">
              <Button size="lg" variant="primary" className="w-full sm:w-auto">
                <span>Explore Markets</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/trade">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                <BarChart2 className="w-4 h-4 text-gada-magenta" />
                <span>Open Trading Workspace</span>
              </Button>
            </Link>
          </div>

          {/* Quick Metrics Ticker */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-10 text-left">
            <div className="p-4 rounded-2xl bg-gada-surface/80 border border-gada-border backdrop-blur-md">
              <span className="text-[10px] text-gada-subtle block uppercase font-medium">Simulated Market Cap</span>
              <span className="text-lg font-bold text-white num-tabular">$2.68 Trillion</span>
              <span className="text-[11px] text-gada-up block font-semibold">+2.84% 24h</span>
            </div>
            <div className="p-4 rounded-2xl bg-gada-surface/80 border border-gada-border backdrop-blur-md">
              <span className="text-[10px] text-gada-subtle block uppercase font-medium">Bitcoin (BTC)</span>
              <span className="text-lg font-bold text-white num-tabular">
                ${btc?.price.toLocaleString() || '94,820'}
              </span>
              <span className={`text-[11px] font-semibold block ${btc && btc.change24h >= 0 ? 'text-gada-up' : 'text-gada-down'}`}>
                {btc && btc.change24h >= 0 ? '+' : ''}{btc?.change24h.toFixed(2)}%
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-gada-surface/80 border border-gada-border backdrop-blur-md">
              <span className="text-[10px] text-gada-subtle block uppercase font-medium">Ethereum (ETH)</span>
              <span className="text-lg font-bold text-white num-tabular">
                ${eth?.price.toLocaleString() || '3,624'}
              </span>
              <span className={`text-[11px] font-semibold block ${eth && eth.change24h >= 0 ? 'text-gada-up' : 'text-gada-down'}`}>
                {eth && eth.change24h >= 0 ? '+' : ''}{eth?.change24h.toFixed(2)}%
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-gada-surface/80 border border-gada-border backdrop-blur-md">
              <span className="text-[10px] text-gada-subtle block uppercase font-medium">Listed Assets</span>
              <span className="text-lg font-bold text-gada-magenta num-tabular">{assets.length} Markets</span>
              <span className="text-[11px] text-gada-muted block">100% Simulated Paper Trading</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Markets Ticker Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Featured Markets</h2>
            <p className="text-xs text-gada-muted">Real-time simulated ticker quotes and sparklines</p>
          </div>
          <Link to="/markets" className="text-xs font-semibold text-gada-magenta hover:underline flex items-center gap-1">
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          {featured.map((asset) => {
            const isUp = asset.change24h >= 0;
            return (
              <Link
                key={asset.symbol}
                to={`/trade/${asset.symbol}-USDT`}
                className="p-4 rounded-2xl bg-gada-surface hover:bg-gada-elevated border border-gada-border hover:border-gada-violet/40 transition-all group flex flex-col justify-between h-36"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gada-elevated border border-gada-border flex items-center justify-center font-bold text-[10px] text-white">
                      {asset.symbol.slice(0, 3)}
                    </div>
                    <span className="font-bold text-xs text-white group-hover:text-gada-magenta transition-colors">
                      {asset.symbol}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-bold num-tabular px-1.5 py-0.5 rounded ${
                      isUp ? 'bg-gada-up/15 text-gada-up' : 'bg-gada-down/15 text-gada-down'
                    }`}
                  >
                    {isUp ? '+' : ''}{asset.change24h.toFixed(2)}%
                  </span>
                </div>

                <div className="my-1">
                  <div className="text-base font-extrabold text-white num-tabular">
                    ${asset.price.toLocaleString(undefined, { minimumFractionDigits: asset.precision })}
                  </div>
                </div>

                <div className="w-full flex justify-end">
                  <Sparkline data={asset.sparkline} isPositive={isUp} width={90} height={26} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Market Movers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div>
          <h2 className="text-xl font-bold text-white">Market Overview & Movers</h2>
          <p className="text-xs text-gada-muted">Top gainers, losers, and most active simulated volume pairs</p>
        </div>
        <MarketMovers assets={assets} />
      </section>

      {/* GDT Token Spotlight */}
      {gdt && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-r from-[#24005E]/80 via-[#1F1730] to-gada-surface border border-gada-violet/40 p-6 sm:p-10 overflow-hidden shadow-glow-purple">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
              <div className="lg:col-span-2 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gada-magenta/20 border border-gada-magenta/40 text-gada-magenta text-xs font-bold">
                  <Coins className="w-3.5 h-3.5" />
                  <span>ECOSYSTEM SPOTLIGHT</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-black text-white">
                  GADA TOKEN (GDT)
                </h2>

                <p className="text-sm text-gada-muted leading-relaxed max-w-xl">
                  {gdt.description} Experience zero-slippage testing, simulate VIP fee discounts, and explore the future of the Gada digital ecosystem.
                </p>

                <div className="flex flex-wrap items-center gap-6 pt-2 num-tabular">
                  <div>
                    <span className="text-[10px] text-gada-subtle uppercase block">Sample Price</span>
                    <span className="text-xl font-black text-white">${gdt.price.toFixed(4)} USDT</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gada-subtle uppercase block">24h Movement</span>
                    <span className="text-xl font-black text-gada-up">+{gdt.change24h.toFixed(2)}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gada-subtle uppercase block">Simulated Supply</span>
                    <span className="text-xl font-black text-white">{gdt.circulatingSupply}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-3">
                  <Link to="/trade/GDT-USDT">
                    <Button variant="primary" size="md">
                      Trade GDT/USDT
                    </Button>
                  </Link>
                  <Link to="/gdt">
                    <Button variant="outline" size="md">
                      Token Details & FAQ
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Visual Logo Card */}
              <div className="flex justify-center lg:justify-end">
                <div className="p-6 rounded-3xl bg-gada-midnight/90 border border-gada-border flex flex-col items-center text-center space-y-3 shadow-2xl">
                  <img
                    src="/brand/app-icon.png"
                    alt="Gada Token Icon"
                    className="w-24 h-24 rounded-2xl shadow-glow-magenta object-cover"
                  />
                  <div>
                    <h3 className="text-base font-extrabold text-white">GADA TOKEN</h3>
                    <span className="text-xs text-gada-magenta font-semibold">GDT &bull; Simulated Utility</span>
                  </div>
                  <span className="text-[10px] text-gada-subtle px-2.5 py-1 rounded-full bg-gada-elevated border border-gada-border">
                    Paper Trading Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Platform Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Built for Serious Simulation
          </h2>
          <p className="text-xs sm:text-sm text-gada-muted">
            Everything you expect from an exchange-grade trading interface, crafted with precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-gada-surface border border-gada-border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-gada-violet/20 text-gada-magenta border border-gada-violet/30 flex items-center justify-center font-bold">
              <BarChart2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Interactive Candlesticks</h3>
            <p className="text-xs text-gada-muted leading-relaxed">
              Full multi-timeframe charts (1m to 1W) powered by Lightweight Charts with crosshairs, zoom, and volume histograms.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gada-surface border border-gada-border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-gada-up/20 text-gada-up border border-gada-up/30 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Live Order Book & Tape</h3>
            <p className="text-xs text-gada-muted leading-relaxed">
              Real-time simulated order book with visual depth bars, spread calculations, and recent trade transaction feeds.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gada-surface border border-gada-border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-gada-magenta/20 text-gada-magenta border border-gada-magenta/30 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Crypto Learning Center</h3>
            <p className="text-xs text-gada-muted leading-relaxed">
              Curated tutorials on order types, risk management, slippage, and an interactive crypto glossary for traders.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-gada-surface via-gada-elevated to-gada-surface border border-gada-border text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Ready to test your market strategies?
          </h2>
          <p className="text-sm text-gada-muted max-w-md mx-auto">
            Open your simulated account now with 10,000 virtual USDT. No credit card, no personal identification required.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/trade">
              <Button size="lg" variant="primary">
                Start Paper Trading
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
