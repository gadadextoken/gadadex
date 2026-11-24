import React, { useState } from 'react';
import { GDT_SPECIFICATIONS } from '../../data/gdtEcosystemData';
import {
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
  BookOpen,
} from 'lucide-react';

interface EcosystemSyncBannerProps {
  onOpenWhitepaper?: () => void;
  compact?: boolean;
}

export const EcosystemSyncBanner: React.FC<EcosystemSyncBannerProps> = ({
  onOpenWhitepaper,
  compact = false,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(GDT_SPECIFICATIONS.contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (compact) {
    return (
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-gada-midnight/90 border border-gada-violet/40 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-white">GDT Ecosystem Anchor:</span>
          <a
            href={GDT_SPECIFICATIONS.parentPortal}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gada-violet hover:text-gada-magenta font-mono font-medium underline flex items-center gap-1"
          >
            gadatoken.com
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-2.5 py-1 rounded-lg bg-gada-surface border border-gada-border text-gada-muted hover:text-white flex items-center gap-1.5 transition-colors font-mono text-[11px]"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>BSC Contract</span>
              </>
            )}
          </button>

          {onOpenWhitepaper && (
            <button
              onClick={onOpenWhitepaper}
              className="px-2.5 py-1 rounded-lg bg-gada-violet/20 border border-gada-violet/40 text-gada-violet hover:text-white flex items-center gap-1 transition-colors text-[11px] font-semibold"
            >
              <BookOpen className="w-3 h-3" />
              <span>Whitepaper v1.0</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-gradient-to-r from-[#24005E]/80 via-gada-midnight to-gada-surface border border-gada-violet/50 p-5 sm:p-6 shadow-glow-purple relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
        <div className="space-y-2 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gada-magenta/20 border border-gada-magenta/40 text-gada-magenta text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>OFFICIAL GADA ECOSYSTEM ASSET</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>BNB Smart Chain (BEP-20)</span>
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
            Directly Synchronized with <a href={GDT_SPECIFICATIONS.parentPortal} target="_blank" rel="noopener noreferrer" className="text-gada-magenta underline hover:text-white">gadatoken.com</a>
          </h3>

          <p className="text-xs sm:text-sm text-gada-muted leading-relaxed">
            All GDT parameters, tokenomics distributions (50 Billion fixed cap), and roadmap milestones are anchored directly to official documentation at gadatoken.com and verified on BscScan.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={handleCopy}
            className="px-3.5 py-2 rounded-xl bg-gada-midnight border border-gada-border text-white text-xs font-semibold flex items-center gap-2 hover:border-gada-violet transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Address Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-gada-muted" />
                <span>Copy BSC Contract</span>
              </>
            )}
          </button>

          <a
            href={GDT_SPECIFICATIONS.explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-gada-surface border border-gada-border text-white text-xs font-semibold flex items-center gap-1.5 hover:border-gada-violet transition-colors"
          >
            <span>BscScan</span>
            <ExternalLink className="w-3.5 h-3.5 text-gada-subtle" />
          </a>

          {onOpenWhitepaper && (
            <button
              onClick={onOpenWhitepaper}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-gada-violet to-gada-magenta text-white text-xs font-bold flex items-center gap-1.5 shadow-md hover:opacity-95 transition-opacity"
            >
              <BookOpen className="w-4 h-4" />
              <span>Read Whitepaper</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
