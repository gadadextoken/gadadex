import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  TrendingUp,
  BarChart2,
  PieChart,
  Star,
  BookOpen,
  User,
  Bell,
  Menu,
  X,
  PlusCircle,
  Coins,
  Globe,
  ExternalLink,
  ChevronDown,
  MessageCircle,
  PhoneCall,
  Store,
} from 'lucide-react';
import { usePortfolioStore } from '../../store/portfolioStore';
import { useNotificationStore } from '../../store/notificationStore';
import { NotificationDrawer } from './NotificationDrawer';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [ecosystemDropdownOpen, setEcosystemDropdownOpen] = useState(false);

  const { balances, claimFaucet } = usePortfolioStore();
  const { getUnreadCount } = useNotificationStore();

  const usdtBalance = balances['USDT']?.free || 0;
  const unreadCount = getUnreadCount();

  const navLinks = [
    { name: 'Markets', path: '/markets', icon: TrendingUp },
    { name: 'Trade', path: '/trade', icon: BarChart2 },
    { name: 'Portfolio', path: '/portfolio', icon: PieChart },
    { name: 'Watchlist', path: '/watchlist', icon: Star },
    { name: 'Learn', path: '/learn', icon: BookOpen },
    { name: 'GDT Token', path: '/gdt', icon: Coins, highlight: true },
  ];

  const ecosystemLinks = [
    {
      name: 'gadatoken.com',
      desc: 'Official Parent Token Authority & Whitepaper',
      badge: 'Parent Portal',
      url: 'https://gadatoken.com',
      icon: Coins,
    },
    {
      name: 'gada.chat',
      desc: 'Social Networking & Decentralized Chat',
      badge: 'Social',
      url: 'https://gada.chat',
      icon: MessageCircle,
    },
    {
      name: 'gadavoice.com',
      desc: 'Voice/Video Messenger & Live Streaming',
      badge: 'Streaming',
      url: 'https://gadavoice.com',
      icon: PhoneCall,
    },
    {
      name: 'gadacoop.org',
      desc: 'Decentralized Commerce & Cooperatives',
      badge: 'Commerce',
      url: 'https://gadacoop.org',
      icon: Store,
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-gada-midnight/90 backdrop-blur-md border-b border-gada-border transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/brand/app-icon.png"
                alt="Gadadex App Icon"
                className="w-9 h-9 rounded-xl shadow-glow-purple object-cover group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-xl font-extrabold tracking-tight text-white">GADA</span>
                  <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-gada-violet via-gada-electric to-gada-magenta bg-clip-text text-transparent">
                    DEX
                  </span>
                </div>
                <span className="text-[9px] font-semibold tracking-widest text-gada-muted uppercase -mt-1">
                  Simulation
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname.startsWith(link.path);
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-gada-elevated text-white border border-gada-violet/40 shadow-glow-purple font-semibold'
                        : link.highlight
                        ? 'text-gada-magenta hover:bg-gada-violet/10 font-semibold'
                        : 'text-gada-muted hover:text-white hover:bg-gada-elevated/60'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${link.highlight ? 'text-gada-magenta' : ''}`} />
                    <span>{link.name}</span>
                    {link.highlight && (
                      <span className="w-1.5 h-1.5 rounded-full bg-gada-magenta animate-pulse" />
                    )}
                  </Link>
                );
              })}

              {/* Ecosystem Dropdown Trigger */}
              <div className="relative">
                <button
                  onClick={() => setEcosystemDropdownOpen(!ecosystemDropdownOpen)}
                  onBlur={() => setTimeout(() => setEcosystemDropdownOpen(false), 200)}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    ecosystemDropdownOpen
                      ? 'bg-gada-elevated text-white'
                      : 'text-gada-muted hover:text-white hover:bg-gada-elevated/60'
                  }`}
                >
                  <Globe className="w-4 h-4 text-gada-magenta" />
                  <span>Ecosystem</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${ecosystemDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {ecosystemDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1.5 w-64 rounded-2xl bg-gada-surface border border-gada-border shadow-2xl p-2 z-50 animate-fadeIn">
                    <div className="px-3 py-1.5 text-[10px] font-bold text-gada-subtle uppercase tracking-wider">
                      Connected GADA Ecosystem
                    </div>
                    <div className="space-y-1">
                      {ecosystemLinks.map((item) => {
                        const Icon = item.icon;
                        return (
                          <a
                            key={item.name}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-gada-elevated transition-colors group"
                          >
                            <div className="p-1.5 rounded-lg bg-gada-violet/20 text-gada-magenta group-hover:scale-105 transition-transform mt-0.5">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1.5">
                                <div className="flex items-center gap-1.5 min-w-0">
                                  <span className="text-xs font-bold text-white group-hover:text-gada-magenta transition-colors truncate">
                                    {item.name}
                                  </span>
                                  {item.badge && (
                                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-gada-midnight text-gada-magenta border border-gada-border shrink-0">
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                <ExternalLink className="w-3 h-3 text-gada-subtle group-hover:text-white shrink-0" />
                              </div>
                              <span className="text-[10px] text-gada-muted block truncate">
                                {item.desc}
                              </span>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            {/* Demo Balance Indicator */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gada-surface border border-gada-border">
              <div className="flex flex-col text-right">
                <span className="text-[10px] text-gada-subtle font-medium uppercase tracking-wider">
                  Simulated Balance
                </span>
                <span className="text-xs font-bold text-white num-tabular">
                  ${usdtBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{' '}
                  <span className="text-gada-magenta text-[10px]">USDT</span>
                </span>
              </div>
              <button
                onClick={() => claimFaucet()}
                title="Claim Demo Faucet (+5,000 USDT)"
                className="p-1 rounded-lg bg-gada-violet/20 hover:bg-gada-violet/40 text-gada-magenta transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
              </button>
            </div>

            {/* Notification Bell */}
            <button
              onClick={() => setNotificationOpen(true)}
              className="relative p-2 rounded-xl text-gada-muted hover:text-white hover:bg-gada-elevated transition-colors border border-transparent hover:border-gada-border"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-gada-magenta text-[10px] font-bold text-white flex items-center justify-center animate-pulse">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* Account / Profile Link */}
            <Link
              to="/account"
              className={`p-2 rounded-xl border transition-all flex items-center gap-2 ${
                location.pathname === '/account'
                  ? 'bg-gada-violet/20 text-white border-gada-violet'
                  : 'bg-gada-elevated text-gada-muted hover:text-white border-gada-border hover:border-gada-violet/40'
              }`}
              title="Account Settings"
            >
              <User className="w-5 h-5" />
              <span className="hidden xl:inline text-xs font-semibold text-white">Demo User</span>
            </Link>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-gada-muted hover:text-white hover:bg-gada-elevated transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gada-surface/95 border-b border-gada-border px-4 pt-2 pb-6 space-y-2 backdrop-blur-xl animate-fadeIn">
            {/* Mobile Balance Card */}
            <div className="p-3 mb-3 rounded-xl bg-gada-midnight/80 border border-gada-border flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gada-subtle block uppercase">Demo USDT Balance</span>
                <span className="text-sm font-bold text-white num-tabular">
                  ${usdtBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT
                </span>
              </div>
              <button
                onClick={() => claimFaucet()}
                className="text-xs px-2.5 py-1 rounded-lg bg-gada-violet/30 text-gada-magenta font-semibold flex items-center gap-1 border border-gada-violet/40"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                +5,000 Faucet
              </button>
            </div>

            {navLinks.map((link) => {
              const isActive = location.pathname.startsWith(link.path);
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-gada-elevated text-white border border-gada-violet/40 font-semibold'
                      : 'text-gada-muted hover:text-white hover:bg-gada-elevated/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-gada-magenta" />
                    <span>{link.name}</span>
                  </div>
                  {link.highlight && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-gada-magenta/20 text-gada-magenta font-bold border border-gada-magenta/30">
                      GADA
                    </span>
                  )}
                </Link>
              );
            })}

            {/* Mobile Ecosystem Apps Section */}
            <div className="pt-2 border-t border-gada-border/60">
              <span className="text-[10px] font-bold text-gada-subtle uppercase px-3 block mb-1">
                GADA Ecosystem Network
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                <a
                  href="https://gadatoken.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-lg bg-gada-midnight text-xs text-white border border-gada-border"
                >
                  <span className="font-semibold text-gada-magenta">gadatoken.com</span>
                  <ExternalLink className="w-3 h-3 text-gada-subtle" />
                </a>
                <a
                  href="https://gada.chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-lg bg-gada-midnight text-xs text-white border border-gada-border"
                >
                  <span>gada.chat</span>
                  <ExternalLink className="w-3 h-3 text-gada-subtle" />
                </a>
              </div>
            </div>

            <Link
              to="/account"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium text-gada-muted hover:text-white hover:bg-gada-elevated/50"
            >
              <User className="w-4 h-4 text-gada-magenta" />
              <span>Demo Account & Settings</span>
            </Link>
          </div>
        )}
      </header>

      {/* Notification Slideout Drawer */}
      <NotificationDrawer
        isOpen={notificationOpen}
        onClose={() => setNotificationOpen(false)}
      />
    </>
  );
};
