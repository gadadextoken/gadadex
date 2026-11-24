import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import {
  Coins,
  ShieldCheck,
  Zap,
  Globe,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Copy,
  Check,
  ExternalLink,
  BookOpen,
  Send,
  Percent,
  Calculator,
  Lock,
} from 'lucide-react';
import { useMarketStore } from '../store/marketStore';
import {
  GDT_SPECIFICATIONS,
  GADA_ECOSYSTEM_PLATFORMS,
} from '../data/gdtEcosystemData';
import { TokenomicsChart } from '../components/gdt/TokenomicsChart';
import { RoadmapTimeline } from '../components/gdt/RoadmapTimeline';
import { WhitepaperModal } from '../components/gdt/WhitepaperModal';
import { EcosystemSyncBanner } from '../components/gdt/EcosystemSyncBanner';

export const GdtPage: React.FC = () => {
  const { getAsset } = useMarketStore();
  const gdt = getAsset('GDT');
  const [copied, setCopied] = useState(false);
  const [isWhitepaperOpen, setIsWhitepaperOpen] = useState(false);

  // Simulated Fee Discount Calculator State
  const [holdingAmount, setHoldingAmount] = useState<number>(5000);
  const [monthlyTradingVolume, setMonthlyTradingVolume] = useState<number>(25000);

  const handleCopyContract = () => {
    navigator.clipboard.writeText(GDT_SPECIFICATIONS.contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Tier calculation:
  // < 1000 GDT: 0%
  // 1000 - 4999 GDT: 10%
  // 5000 - 9999 GDT: 20%
  // >= 10000 GDT: 25%
  const getFeeDiscount = (amount: number) => {
    if (amount >= 10000) return 25;
    if (amount >= 5000) return 20;
    if (amount >= 1000) return 10;
    return 0;
  };

  const discountPercent = getFeeDiscount(holdingAmount);
  const standardFeeRate = 0.001; // 0.1%
  const effectiveFeeRate = standardFeeRate * (1 - discountPercent / 100);
  const standardMonthlyFee = monthlyTradingVolume * standardFeeRate;
  const discountedMonthlyFee = monthlyTradingVolume * effectiveFeeRate;
  const monthlySavings = standardMonthlyFee - discountedMonthlyFee;

  const faqs = [
    {
      q: 'What is GADA TOKEN (GDT)?',
      a: 'GDT is the native BEP-20 utility token deployed on the BNB Smart Chain (BSC). It unites the Gada ecosystem across social networking (gada.chat), voice/video streaming (gadavoice.com), decentralized commerce (gadacoop.org), and exchange simulation fee tiers on Gadadex.',
    },
    {
      q: 'What is the official contract address of GDT?',
      a: `The verified BEP-20 contract address on BNB Smart Chain is ${GDT_SPECIFICATIONS.contractAddress}. You can inspect it directly on BscScan.`,
    },
    {
      q: 'What is the total token supply?',
      a: 'Gada Token has a fixed, non-inflationary total supply of 50,000,000,000 GDT (50 Billion). There are no hidden minting functions in the audited smart contract.',
    },
    {
      q: 'How does GDT integrate with Gadadex?',
      a: 'On Gadadex, users can simulate trading GDT/USDT with real-time candlestick charts, order books, and depth charts, and test simulated fee discount tiers (up to 25% fee discount) when holding simulated GDT.',
    },
    {
      q: 'Where can I read the official Whitepaper?',
      a: 'You can read the full 13-chapter Whitepaper v1.0 directly here in Gadadex using the interactive reader or on the official parent hub at gadatoken.com.',
    },
    {
      q: 'Is Gadadex live real-money trading?',
      a: 'No. Gadadex operates in pure simulation/paper-trading mode. All orders, balances, and PnL are simulated so you can master digital asset trading safely.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Ecosystem Sync Banner */}
      <EcosystemSyncBanner onOpenWhitepaper={() => setIsWhitepaperOpen(true)} />

      {/* Hero Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#24005E] via-[#1F1730] to-gada-surface border border-gada-violet/50 p-8 sm:p-12 overflow-hidden shadow-glow-purple">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gada-magenta/20 border border-gada-magenta/40 text-gada-magenta text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>OFFICIAL PARENT ASSET</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-semibold">
                <Globe className="w-3.5 h-3.5" />
                <span>BNB Smart Chain (BEP-20)</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              GADA TOKEN <span className="text-gada-magenta">(GDT)</span>
            </h1>

            <p className="text-sm sm:text-base text-gada-muted max-w-xl leading-relaxed">
              The unified digital utility currency powering social connection, encrypted voice communication, live streaming, decentralized commerce, and exchange fee tiers across the global Gada ecosystem.
            </p>

            {/* Official Metrics from gadatoken.com */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 num-tabular">
              <div className="p-3.5 rounded-xl bg-gada-midnight/70 border border-gada-border">
                <span className="text-[10px] text-gada-subtle block uppercase font-medium">Total Supply</span>
                <span className="text-xl font-black text-white">50 Billion GDT</span>
                <span className="text-[10px] text-emerald-400 block font-semibold">Fixed & Capped</span>
              </div>
              <div className="p-3.5 rounded-xl bg-gada-midnight/70 border border-gada-border">
                <span className="text-[10px] text-gada-subtle block uppercase font-medium">Simulated Exchange Price</span>
                <span className="text-xl font-black text-white">${gdt ? gdt.price.toFixed(4) : '1.8450'} USDT</span>
                <span className="text-[10px] text-gada-up block font-semibold">+8.75% 24h</span>
              </div>
              <div className="p-3.5 rounded-xl bg-gada-midnight/70 border border-gada-border">
                <span className="text-[10px] text-gada-subtle block uppercase font-medium">Underlying Blockchain</span>
                <span className="text-xl font-black text-white">BNB Smart Chain</span>
                <span className="text-[10px] text-gada-muted block">Sub-Cent Gas Fees</span>
              </div>
            </div>

            {/* Contract Address Copy Card */}
            <div className="p-3.5 rounded-xl bg-gada-midnight/90 border border-gada-violet/40 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gada-muted font-medium flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Verified BEP-20 Contract Address:
                </span>
                <a
                  href={GDT_SPECIFICATIONS.explorerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gada-magenta hover:underline flex items-center gap-1 text-[11px] font-semibold"
                >
                  <span>View on BscScan</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-gada-surface border border-gada-border">
                <span className="font-mono text-xs sm:text-sm text-white truncate select-all">
                  {GDT_SPECIFICATIONS.contractAddress}
                </span>
                <button
                  onClick={handleCopyContract}
                  className="px-3 py-1.5 rounded-lg bg-gada-violet/20 hover:bg-gada-violet text-gada-magenta hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link to="/trade/GDT-USDT">
                <Button size="lg" variant="primary">
                  <span>Trade GDT/USDT (Simulated)</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <button
                onClick={() => setIsWhitepaperOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gada-elevated hover:bg-gada-border border border-gada-border text-sm font-semibold text-white transition-all shadow-md"
              >
                <BookOpen className="w-4 h-4 text-gada-magenta" />
                <span>Read Official Whitepaper</span>
              </button>
            </div>
          </div>

          {/* Logo Badge Card */}
          <div className="flex justify-center">
            <div className="p-8 rounded-3xl bg-gada-midnight/90 border border-gada-border shadow-2xl text-center space-y-4 max-w-xs">
              <img
                src="/brand/app-icon.png"
                alt="Gada Token Icon"
                className="w-32 h-32 mx-auto rounded-3xl shadow-glow-magenta object-cover"
              />
              <div>
                <h3 className="text-xl font-black text-white">GADA TOKEN</h3>
                <span className="text-xs text-gada-magenta font-semibold">GDT &bull; BEP-20 Standard</span>
              </div>
              <div className="p-2.5 rounded-xl bg-gada-surface border border-gada-border text-[11px] text-gada-muted text-left space-y-1.5">
                <div className="flex justify-between items-center">
                  <span>Parent Authority:</span>
                  <a
                    href={GDT_SPECIFICATIONS.parentPortal}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gada-magenta hover:underline font-bold"
                  >
                    gadatoken.com
                  </a>
                </div>
                <div className="flex justify-between items-center">
                  <span>Blockchain:</span>
                  <span className="text-white font-medium">BNB Smart Chain</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Whitepaper:</span>
                  <span className="text-emerald-400 font-semibold">Version 1.0 (Audited)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Verified Tokenomics & Allocation Section */}
      <TokenomicsChart />

      {/* Simulated GDT Fee Discount Tier Calculator */}
      <div className="rounded-2xl bg-gada-surface border border-gada-border p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gada-border pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Percent className="w-4 h-4 text-gada-magenta" />
              <span className="text-xs font-semibold text-gada-magenta uppercase tracking-wider">
                Simulated Utility Engine
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              GDT Trading Fee Discount Simulator
            </h3>
            <p className="text-xs sm:text-sm text-gada-muted mt-1">
              Test how holding simulated GDT reduces your exchange trading fees on Gadadex from 0.10% down to 0.075%.
            </p>
          </div>

          <div className="px-4 py-2 rounded-xl bg-gada-midnight/80 border border-gada-border flex items-center gap-2.5 text-xs">
            <Calculator className="w-4 h-4 text-gada-violet" />
            <span className="text-gada-muted">Current Simulated Discount:</span>
            <span className="text-base font-black text-gada-magenta num-tabular">
              {discountPercent}% OFF
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Sliders */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gada-muted font-medium">Simulated GDT Holdings:</span>
                <span className="text-white font-bold num-tabular">{holdingAmount.toLocaleString()} GDT</span>
              </div>
              <input
                type="range"
                min="0"
                max="20000"
                step="500"
                value={holdingAmount}
                onChange={(e) => setHoldingAmount(Number(e.target.value))}
                className="w-full accent-gada-magenta h-2 bg-gada-midnight rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gada-subtle font-mono">
                <span>0 GDT (0%)</span>
                <span>1,000 GDT (10%)</span>
                <span>5,000 GDT (20%)</span>
                <span>10,000+ GDT (25%)</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gada-muted font-medium">Monthly Simulated Trading Volume:</span>
                <span className="text-white font-bold num-tabular">${monthlyTradingVolume.toLocaleString()} USDT</span>
              </div>
              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={monthlyTradingVolume}
                onChange={(e) => setMonthlyTradingVolume(Number(e.target.value))}
                className="w-full accent-gada-violet h-2 bg-gada-midnight rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gada-subtle font-mono">
                <span>$1,000</span>
                <span>$25,000</span>
                <span>$50,000</span>
                <span>$100,000</span>
              </div>
            </div>
          </div>

          {/* Results Card */}
          <div className="p-6 rounded-2xl bg-gada-midnight/80 border border-gada-violet/40 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gada-subtle">
              Simulated Fee Breakdown
            </h4>

            <div className="space-y-2.5 text-xs num-tabular">
              <div className="flex justify-between p-2.5 rounded-xl bg-gada-surface/60 border border-gada-border">
                <span className="text-gada-muted">Standard Fee Rate (No GDT):</span>
                <span className="font-semibold text-white">0.100%</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-gada-surface/60 border border-gada-border">
                <span className="text-gada-muted">Effective Fee Rate:</span>
                <span className="font-black text-gada-magenta">
                  {(effectiveFeeRate * 100).toFixed(3)}%
                </span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-gada-surface/60 border border-gada-border">
                <span className="text-gada-muted">Standard Monthly Fee:</span>
                <span className="font-medium text-slate-400">${standardMonthlyFee.toFixed(2)} USDT</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <span className="font-bold text-emerald-400">Monthly Simulated Savings:</span>
                <span className="font-black text-emerald-400 text-sm">
                  +${monthlySavings.toFixed(2)} USDT ({discountPercent}%)
                </span>
              </div>
            </div>

            <p className="text-[11px] text-gada-subtle leading-relaxed">
              *Fee reductions apply automatically during simulated order execution when holding simulated GDT in your demo account.
            </p>
          </div>
        </div>
      </div>

      {/* Official Roadmap Timeline */}
      <RoadmapTimeline />

      {/* Connected GADA Ecosystem Platforms Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl font-black text-white">The Connected GADA Ecosystem</h2>
            <p className="text-xs sm:text-sm text-gada-muted">
              Live platforms powered by Gada Token (GDT) across communication, creator content, and commerce
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={GDT_SPECIFICATIONS.socials.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gada-magenta hover:underline"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Telegram Community</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {GADA_ECOSYSTEM_PLATFORMS.map((app) => (
            <div
              key={app.name}
              className="bg-gada-surface border border-gada-border hover:border-gada-violet/50 rounded-2xl p-6 shadow-xl transition-all group flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-gada-violet/20 text-gada-magenta border border-gada-violet/30 group-hover:scale-105 transition-transform">
                    <Coins className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-gada-subtle uppercase px-2.5 py-0.5 rounded-full bg-gada-midnight border border-gada-border">
                    {app.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-gada-magenta transition-colors">
                    {app.name}
                  </h3>
                  <span className="text-[11px] text-gada-violet font-mono">{app.domain}</span>
                </div>

                <p className="text-xs text-gada-muted leading-relaxed">
                  {app.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {app.features.map((feat, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-gada-midnight border border-gada-border text-slate-300"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-gada-border/50">
                <a
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gada-elevated hover:bg-gada-violet/30 text-xs font-bold text-white group-hover:border-gada-violet/50 border border-gada-border transition-all"
                >
                  <span>Visit {app.name}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-gada-magenta" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-gada-magenta" />
          <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, i) => (
            <div key={i} className="p-5 rounded-2xl bg-gada-surface border border-gada-border space-y-2">
              <h3 className="text-sm font-bold text-white">{faq.q}</h3>
              <p className="text-xs text-gada-muted leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Whitepaper Modal */}
      <WhitepaperModal
        isOpen={isWhitepaperOpen}
        onClose={() => setIsWhitepaperOpen(false)}
      />
    </div>
  );
};
