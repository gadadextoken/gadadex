import React from 'react';
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
} from 'lucide-react';
import { useMarketStore } from '../store/marketStore';

export const GdtPage: React.FC = () => {
  const { getAsset } = useMarketStore();
  const gdt = getAsset('GDT');

  const faqs = [
    {
      q: 'What is GADA TOKEN (GDT)?',
      a: 'GDT is the native utility and ecosystem token designed for the Gada platform and Gadadex simulation environment.',
    },
    {
      q: 'Can I withdraw or deposit real GDT tokens?',
      a: 'No. Gadadex currently operates strictly in paper-trading simulation mode. GDT tokens on this platform are virtual testing units and do not represent real-money value or liquid cryptocurrency assets.',
    },
    {
      q: 'What are the planned ecosystem utilities?',
      a: 'Within the Gada ecosystem, GDT is slated for fee discount tiers, platform governance demonstrations, staking simulations, and ecosystem access privileges.',
    },
    {
      q: 'Where can I see verified token contract addresses?',
      a: 'Verified smart contract addresses will be published on official Gada ecosystem channels upon mainnet deployment. Gadadex does not display speculative or unverified third-party contract addresses.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#24005E] via-[#1F1730] to-gada-surface border border-gada-violet/50 p-8 sm:p-12 overflow-hidden shadow-glow-purple">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gada-magenta/20 border border-gada-magenta/40 text-gada-magenta text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>OFFICIAL ECOSYSTEM ASSET</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              GADA TOKEN <span className="text-gada-magenta">(GDT)</span>
            </h1>

            <p className="text-sm sm:text-base text-gada-muted max-w-xl leading-relaxed">
              The foundational digital asset powering the Gada decentralized ecosystem and the Gadadex exchange platform.
            </p>

            {gdt && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 num-tabular">
                <div className="p-3 rounded-xl bg-gada-midnight/70 border border-gada-border">
                  <span className="text-[10px] text-gada-subtle block uppercase">Simulated Price</span>
                  <span className="text-xl font-black text-white">${gdt.price.toFixed(4)} USDT</span>
                </div>
                <div className="p-3 rounded-xl bg-gada-midnight/70 border border-gada-border">
                  <span className="text-[10px] text-gada-subtle block uppercase">24h Change</span>
                  <span className="text-xl font-black text-gada-up">+{gdt.change24h.toFixed(2)}%</span>
                </div>
                <div className="p-3 rounded-xl bg-gada-midnight/70 border border-gada-border">
                  <span className="text-[10px] text-gada-subtle block uppercase">Circulating Supply</span>
                  <span className="text-xl font-black text-white">{gdt.circulatingSupply}</span>
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 pt-4">
              <Link to="/trade/GDT-USDT">
                <Button size="lg" variant="primary">
                  <span>Trade GDT/USDT (Simulated)</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="p-8 rounded-3xl bg-gada-midnight/90 border border-gada-border shadow-2xl text-center space-y-4">
              <img
                src="/brand/app-icon.png"
                alt="Gada Token Icon"
                className="w-32 h-32 mx-auto rounded-3xl shadow-glow-magenta object-cover"
              />
              <div>
                <h3 className="text-xl font-black text-white">GDT</h3>
                <span className="text-xs text-gada-magenta font-semibold">GADA Ecosystem Token</span>
              </div>
              <span className="text-[10px] text-gada-subtle px-3 py-1 rounded-full bg-gada-elevated border border-gada-border inline-block">
                Simulation Protocol
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Strict Simulation Disclaimer */}
      <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3.5 text-xs text-amber-300 leading-relaxed">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white block mb-0.5">Verified Information Notice:</strong>
          In compliance with project specifications, tokenomics, smart contract addresses, staking yields, and market listings will only be published when verified official data is supplied by the Gada core team. No speculative claims or fictitious contracts are represented on this page.
        </div>
      </div>

      {/* Ecosystem Utilities (Simulated) */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white">Ecosystem Utility & Vision</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-gada-surface border border-gada-border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-gada-violet/20 text-gada-magenta border border-gada-violet/30 flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Trading Fee Discounts</h3>
            <p className="text-xs text-gada-muted leading-relaxed">
              Holders can simulate tiered maker/taker fee reductions up to 50% across spot trading pairs on the Gadadex platform.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gada-surface border border-gada-border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-gada-up/20 text-gada-up border border-gada-up/30 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Staking & Yield Demos</h3>
            <p className="text-xs text-gada-muted leading-relaxed">
              Test simulated network staking pools and protocol reward models directly within the paper-trading environment.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gada-surface border border-gada-border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-gada-magenta/20 text-gada-magenta border border-gada-magenta/30 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Ecosystem Governance</h3>
            <p className="text-xs text-gada-muted leading-relaxed">
              Simulated voting power on platform feature proposals, testnet listings, and ecosystem development grants.
            </p>
          </div>
        </div>
      </div>

      {/* Roadmap & Tokenomics Placeholders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gada-surface border border-gada-border rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-bold text-white">Token Distribution & Tokenomics</h2>
          <div className="p-8 rounded-xl bg-gada-midnight/70 border border-gada-border text-center space-y-2">
            <Coins className="w-10 h-10 mx-auto text-gada-violet opacity-50" />
            <h4 className="text-sm font-semibold text-white">Verified Allocation Schedule Pending</h4>
            <p className="text-xs text-gada-muted max-w-sm mx-auto">
              Official token allocation percentages (Ecosystem, Treasury, Team, Liquidity) will be rendered here upon verified release.
            </p>
          </div>
        </div>

        <div className="bg-gada-surface border border-gada-border rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-bold text-white">Project Roadmap</h2>
          <div className="p-8 rounded-xl bg-gada-midnight/70 border border-gada-border text-center space-y-2">
            <Globe className="w-10 h-10 mx-auto text-gada-magenta opacity-50" />
            <h4 className="text-sm font-semibold text-white">Official Ecosystem Milestones</h4>
            <p className="text-xs text-gada-muted max-w-sm mx-auto">
              Milestone timelines will be populated with verified roadmap dates directly from the Gada foundation.
            </p>
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
