import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import {
  Coins,
  ShieldCheck,
  Zap,
  Globe,
  Users,
  HelpCircle,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Copy,
  Check,
  ExternalLink,
  MessageCircle,
  PhoneCall,
  Store,
  FileText,
  Send,
} from 'lucide-react';
import { useMarketStore } from '../store/marketStore';

export const GdtPage: React.FC = () => {
  const { getAsset } = useMarketStore();
  const gdt = getAsset('GDT');
  const [copied, setCopied] = useState(false);

  const contractAddress = '0x090458b49D6deAA9F7334a5e628aa26D82A3A082';

  const handleCopyContract = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const ecosystemApps = [
    {
      name: 'gadatoken.com',
      badge: 'Official Token Portal',
      description: 'The central hub for GADA TOKEN specifications, official documentation, whitepaper, and ecosystem announcements.',
      url: 'https://gadatoken.com',
      icon: Coins,
      action: 'Visit Portal',
    },
    {
      name: 'gada.chat',
      badge: 'Social & Messaging',
      description: 'Decentralized social networking and encrypted messaging platform powered by GDT utility for creator tipping and micro-payments.',
      url: 'https://gada.chat',
      icon: MessageCircle,
      action: 'Open Chat',
    },
    {
      name: 'gadavoice.com',
      badge: 'Voice, Video & Streaming',
      description: 'High-definition encrypted voice/video calling, creator live broadcasting, and virtual community audio rooms.',
      url: 'https://gadavoice.com',
      icon: PhoneCall,
      action: 'Explore Voice',
    },
    {
      name: 'gadacoop.org',
      badge: 'Commerce & Cooperatives',
      description: 'Decentralized commerce network enabling peer-to-peer marketplace trading, cooperative incentives, and digital merchandise.',
      url: 'https://gadacoop.org',
      icon: Store,
      action: 'Visit Coop',
    },
  ];

  const faqs = [
    {
      q: 'What is GADA TOKEN (GDT)?',
      a: 'GDT is the native BEP-20 utility token deployed on the BNB Smart Chain (BSC). It unites the Gada ecosystem across social networking (gada.chat), voice/video streaming (gadavoice.com), decentralized commerce (gadacoop.org), and exchange simulation fee tiers on Gadadex.',
    },
    {
      q: 'What is the official contract address of GDT?',
      a: 'The verified BEP-20 contract address on BNB Smart Chain is 0x090458b49D6deAA9F7334a5e628aa26D82A3A082. You can inspect it directly on BscScan.',
    },
    {
      q: 'What is the total token supply?',
      a: 'Gada Token has a fixed, non-inflationary total supply of 50,000,000,000 GDT (50 Billion).',
    },
    {
      q: 'How does GDT integrate with Gadadex?',
      a: 'On Gadadex, users can simulate trading GDT/USDT with real-time candlestick charts, order books, and depth charts, and test simulated fee discount tiers before interacting with live platforms.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#24005E] via-[#1F1730] to-gada-surface border border-gada-violet/50 p-8 sm:p-12 overflow-hidden shadow-glow-purple">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gada-magenta/20 border border-gada-magenta/40 text-gada-magenta text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>OFFICIAL ECOSYSTEM ASSET</span>
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
              The unified digital currency powering social connection, encrypted voice communication, live streaming, and decentralized commerce across the global Gada ecosystem.
            </p>

            {/* Official Metrics from gadatoken.com */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 num-tabular">
              <div className="p-3.5 rounded-xl bg-gada-midnight/70 border border-gada-border">
                <span className="text-[10px] text-gada-subtle block uppercase font-medium">Total Supply</span>
                <span className="text-xl font-black text-white">50 Billion GDT</span>
                <span className="text-[10px] text-gada-muted block">Fixed BEP-20 Standard</span>
              </div>
              <div className="p-3.5 rounded-xl bg-gada-midnight/70 border border-gada-border">
                <span className="text-[10px] text-gada-subtle block uppercase font-medium">Simulated Exchange Price</span>
                <span className="text-xl font-black text-white">${gdt ? gdt.price.toFixed(4) : '1.8450'} USDT</span>
                <span className="text-[10px] text-gada-up block font-semibold">+8.75% 24h</span>
              </div>
              <div className="p-3.5 rounded-xl bg-gada-midnight/70 border border-gada-border">
                <span className="text-[10px] text-gada-subtle block uppercase font-medium">Underlying Blockchain</span>
                <span className="text-xl font-black text-white">BNB Smart Chain</span>
                <span className="text-[10px] text-gada-muted block">Fast & Low Gas Fees</span>
              </div>
            </div>

            {/* Contract Address Copy Card */}
            <div className="p-3.5 rounded-xl bg-gada-midnight/90 border border-gada-violet/40 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gada-muted font-medium flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-gada-up" />
                  Verified BEP-20 Contract Address:
                </span>
                <a
                  href={`https://bscscan.com/token/${contractAddress}`}
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
                  {contractAddress}
                </span>
                <button
                  onClick={handleCopyContract}
                  className="px-3 py-1.5 rounded-lg bg-gada-violet/20 hover:bg-gada-violet text-gada-magenta hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-gada-up" /> : <Copy className="w-3.5 h-3.5" />}
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
              <a
                href="https://gadatoken.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-6 py-3 rounded-lg bg-gada-elevated hover:bg-gada-border border border-gada-border text-sm font-semibold text-white transition-all"
              >
                <span>Visit gadatoken.com</span>
                <ExternalLink className="w-4 h-4 text-gada-magenta" />
              </a>
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
              <div className="p-2 rounded-xl bg-gada-surface border border-gada-border text-[11px] text-gada-muted text-left space-y-1">
                <div className="flex justify-between">
                  <span>Ecosystem Hub:</span>
                  <a href="https://gadatoken.com" target="_blank" rel="noopener noreferrer" className="text-gada-magenta hover:underline font-bold">
                    gadatoken.com
                  </a>
                </div>
                <div className="flex justify-between">
                  <span>Network:</span>
                  <span className="text-white font-medium">BNB Chain</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Connected GADA Ecosystem Platforms Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl font-black text-white">The Connected GADA Ecosystem</h2>
            <p className="text-xs sm:text-sm text-gada-muted">
              Live platforms powered by Gada Token (GDT) across communication, creator content, and commerce
            </p>
          </div>
          <a
            href="https://t.me/gadachat"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gada-magenta hover:underline"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Join Telegram Community</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {ecosystemApps.map((app) => {
            const Icon = app.icon;
            return (
              <div
                key={app.name}
                className="bg-gada-surface border border-gada-border hover:border-gada-violet/50 rounded-2xl p-6 shadow-xl transition-all group flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-gada-violet/20 text-gada-magenta border border-gada-violet/30 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold text-gada-subtle uppercase px-2 py-0.5 rounded-full bg-gada-midnight border border-gada-border">
                      {app.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-gada-magenta transition-colors">
                    {app.name}
                  </h3>

                  <p className="text-xs text-gada-muted leading-relaxed">
                    {app.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-gada-border/50">
                  <a
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gada-elevated hover:bg-gada-violet/30 text-xs font-bold text-white group-hover:border-gada-violet/50 border border-gada-border transition-all"
                  >
                    <span>{app.action}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-gada-magenta" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Official Whitepaper & Tokenomics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gada-surface border border-gada-border rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-gada-magenta" />
            <h2 className="text-base font-bold text-white">Whitepaper & Economics Summary</h2>
          </div>
          <p className="text-xs text-gada-muted leading-relaxed">
            As detailed in the official GADA Token Whitepaper on{' '}
            <a href="https://gadatoken.com" target="_blank" rel="noopener noreferrer" className="text-gada-magenta hover:underline font-semibold">
              gadatoken.com
            </a>
            , GDT is built as an efficient, low-fee BEP-20 asset on BNB Smart Chain. It eliminates fragmented platform tokens by establishing a single universal currency across social chat, streaming, and marketplace transactions.
          </p>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-gada-midnight/70 border border-gada-border">
              <span className="text-gada-muted">Total Supply:</span>
              <span className="font-bold text-white">50,000,000,000 GDT (Fixed)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-gada-midnight/70 border border-gada-border">
              <span className="text-gada-muted">Token Standard:</span>
              <span className="font-bold text-white">BEP-20 (BNB Smart Chain)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-gada-midnight/70 border border-gada-border">
              <span className="text-gada-muted">Exchange Utility:</span>
              <span className="font-bold text-gada-magenta">Tiered Fee Discounts on Gadadex</span>
            </div>
          </div>
        </div>

        <div className="bg-gada-surface border border-gada-border rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-gada-up" />
            <h2 className="text-base font-bold text-white">Real-World Utility Pillars</h2>
          </div>
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-gada-midnight/70 border border-gada-border">
              <strong className="text-white block mb-0.5">1. Social Chat & Creator Streaming:</strong>
              <p className="text-gada-muted leading-relaxed">
                Send peer-to-peer tips, unlock creator content, and tip live video broadcasters on gada.chat and gadavoice.com.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-gada-midnight/70 border border-gada-border">
              <strong className="text-white block mb-0.5">2. Decentralized Cooperative Commerce:</strong>
              <p className="text-gada-muted leading-relaxed">
                Purchase goods, participate in cooperative profit-sharing pools, and trade digital products on gadacoop.org.
              </p>
            </div>
          </div>
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
    </div>
  );
};
