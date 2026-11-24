import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ExternalLink, Globe, Send, MessageSquare, Share2, Coins } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gada-surface border-t border-gada-border text-gada-muted mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/brand/app-icon.png"
                alt="Gadadex Icon"
                className="w-8 h-8 rounded-lg shadow-glow-purple"
              />
              <div className="flex items-center gap-1">
                <span className="text-xl font-extrabold text-white">GADA</span>
                <span className="text-xl font-extrabold bg-gradient-to-r from-gada-violet via-gada-electric to-gada-magenta bg-clip-text text-transparent">
                  DEX
                </span>
              </div>
            </Link>
            <p className="text-sm text-gada-muted/80 max-w-sm leading-relaxed">
              A modern, high-performance cryptocurrency exchange simulation platform. Directly connected to the Gada ecosystem and the official GADA TOKEN on BNB Smart Chain.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://t.me/gadachat"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gada-elevated hover:bg-gada-violet/20 hover:text-white transition-colors"
                aria-label="Telegram Community"
                title="Join Telegram: @gadachat"
              >
                <Send className="w-4 h-4 text-gada-magenta" />
              </a>
              <a
                href="https://facebook.com/share/1E1epkWBcr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gada-elevated hover:bg-gada-violet/20 hover:text-white transition-colors"
                aria-label="Facebook Community"
                title="Facebook Community"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href="https://gadatoken.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gada-elevated hover:bg-gada-violet/20 hover:text-white transition-colors"
                aria-label="gadatoken.com"
                title="Official GDT Portal"
              >
                <Coins className="w-4 h-4 text-gada-magenta" />
              </a>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gada-elevated text-xs text-gada-muted border border-gada-border">
                <Globe className="w-3.5 h-3.5 text-gada-magenta" />
                <span>BNB Smart Chain (BEP-20)</span>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Exchange</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/markets" className="hover:text-gada-magenta transition-colors">
                  Spot Markets
                </Link>
              </li>
              <li>
                <Link to="/trade" className="hover:text-gada-magenta transition-colors">
                  Trading Workspace
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-gada-magenta transition-colors">
                  Demo Portfolio
                </Link>
              </li>
              <li>
                <Link to="/watchlist" className="hover:text-gada-magenta transition-colors">
                  Watchlist
                </Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-gada-magenta transition-colors">
                  Transaction History
                </Link>
              </li>
            </ul>
          </div>

          {/* Connected GADA Ecosystem */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">GADA Ecosystem</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://gadatoken.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gada-magenta transition-colors font-medium text-white flex items-center justify-between"
                >
                  <span>gadatoken.com</span>
                  <ExternalLink className="w-3 h-3 text-gada-magenta" />
                </a>
              </li>
              <li>
                <a
                  href="https://gada.chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gada-magenta transition-colors flex items-center justify-between"
                >
                  <span>gada.chat (Social)</span>
                  <ExternalLink className="w-3 h-3 text-gada-subtle" />
                </a>
              </li>
              <li>
                <a
                  href="https://gadavoice.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gada-magenta transition-colors flex items-center justify-between"
                >
                  <span>gadavoice.com (Voice)</span>
                  <ExternalLink className="w-3 h-3 text-gada-subtle" />
                </a>
              </li>
              <li>
                <a
                  href="https://gadacoop.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gada-magenta transition-colors flex items-center justify-between"
                >
                  <span>gadacoop.org (Commerce)</span>
                  <ExternalLink className="w-3 h-3 text-gada-subtle" />
                </a>
              </li>
              <li>
                <a
                  href="https://bscscan.com/token/0x090458b49D6deAA9F7334a5e628aa26D82A3A082"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gada-magenta transition-colors flex items-center justify-between text-xs text-gada-muted pt-1"
                >
                  <span>BscScan Contract Explorer</span>
                  <ExternalLink className="w-3 h-3 text-gada-subtle" />
                </a>
              </li>
            </ul>
          </div>

          {/* Learn & Security */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Education & Risk</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/gdt" className="hover:text-gada-magenta transition-colors font-medium text-white">
                  GDT Token Overview
                </Link>
              </li>
              <li>
                <Link to="/learn" className="hover:text-gada-magenta transition-colors">
                  Crypto Glossary
                </Link>
              </li>
              <li>
                <Link to="/learn" className="hover:text-gada-magenta transition-colors">
                  Order Book Mechanics
                </Link>
              </li>
              <li>
                <Link to="/learn" className="hover:text-gada-magenta transition-colors">
                  Candlestick Analysis
                </Link>
              </li>
              <li>
                <Link to="/learn" className="hover:text-gada-magenta transition-colors">
                  Simulation Protocol
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Risk & Simulation Legal Disclaimer */}
        <div className="pt-8 border-t border-gada-border/70 space-y-4">
          <div className="p-4 rounded-xl bg-gada-midnight/70 border border-gada-border flex items-start gap-3 text-xs leading-relaxed text-gada-muted">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-0.5">Simulated Trading Disclaimer & Risk Disclosure:</strong>
              GADADEX is an educational exchange simulation platform connected to the Gada ecosystem. All trading operations, balances, prices, order books, and transaction records on this website are simulated. Gadadex does not provide financial custody, real cash deposits, withdrawals, or real-money order execution. For official token documentation, visit{' '}
              <a
                href="https://gadatoken.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gada-magenta hover:underline font-semibold"
              >
                gadatoken.com
              </a>.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gada-subtle gap-2">
            <div>
              &copy; {new Date().getFullYear()} GADADEX &bull; Connected to <a href="https://gadatoken.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">gadatoken.com</a>. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span className="hover:text-white cursor-pointer transition-colors">Terms of Simulation</span>
              <span>&bull;</span>
              <span className="hover:text-white cursor-pointer transition-colors">Privacy Notice</span>
              <span>&bull;</span>
              <span className="hover:text-white cursor-pointer transition-colors">Security Architecture</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
