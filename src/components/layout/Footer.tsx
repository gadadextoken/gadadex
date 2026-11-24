import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ExternalLink, Globe, Send, MessageSquare, Share2 } from 'lucide-react';

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
              A modern, high-performance cryptocurrency exchange simulation platform. Explore digital assets, test trading strategies, and experience exchange-grade interfaces in a risk-free virtual environment.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-gada-elevated hover:bg-gada-violet/20 hover:text-white transition-colors"
                aria-label="Community"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-gada-elevated hover:bg-gada-violet/20 hover:text-white transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-gada-elevated hover:bg-gada-violet/20 hover:text-white transition-colors"
                aria-label="Discussion"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gada-elevated text-xs text-gada-muted border border-gada-border">
                <Globe className="w-3.5 h-3.5 text-gada-magenta" />
                <span>Cloudflare Global Edge</span>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Platform</h4>
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

          {/* GADA Ecosystem */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Ecosystem</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/gdt" className="hover:text-gada-magenta transition-colors font-medium text-white flex items-center gap-1.5">
                  <span>GADA Token (GDT)</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-gada-magenta/20 text-gada-magenta">Featured</span>
                </Link>
              </li>
              <li>
                <Link to="/trade/GDT-USDT" className="hover:text-gada-magenta transition-colors">
                  Trade GDT/USDT
                </Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-gada-magenta transition-colors">
                  VIP Demo Tier
                </Link>
              </li>
              <li>
                <Link to="/learn" className="hover:text-gada-magenta transition-colors">
                  Gada Architecture
                </Link>
              </li>
            </ul>
          </div>

          {/* Learn & Security */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Education & Risk</h4>
            <ul className="space-y-2 text-sm">
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
                  Risk Management
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
              GADADEX is an educational simulation platform intended solely for technical, interface, and market demonstration purposes. All orders, holdings, prices, order books, and transaction records on this website are simulated. Gadadex does not provide financial services, custody, deposit accounts, withdrawals, or real-money trading execution. Virtual tokens (including GDT) within this application have no monetary value and cannot be redeemed for fiat currency or actual digital assets.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gada-subtle gap-2">
            <div>
              &copy; {new Date().getFullYear()} GADADEX. Built for the GADA Ecosystem. All rights reserved.
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
