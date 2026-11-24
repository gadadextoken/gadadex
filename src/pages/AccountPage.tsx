import React, { useState } from 'react';
import { useAccountStore } from '../store/accountStore';
import { usePortfolioStore } from '../store/portfolioStore';
import { useTradingStore } from '../store/tradingStore';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import {
  User,
  ShieldCheck,
  Settings,
  RotateCcw,
  PlusCircle,
  KeyRound,
  CheckCircle2,
  AlertTriangle,
  Lock,
} from 'lucide-react';

export const AccountPage: React.FC = () => {
  const { profile, preferences, updatePreferences } = useAccountStore();
  const { balances, resetPortfolio, claimFaucet } = usePortfolioStore();
  const { clearHistory } = useTradingStore();

  const [showResetModal, setShowResetModal] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const usdtBalance = balances['USDT']?.free || 0;

  const handleReset = () => {
    resetPortfolio();
    clearHistory();
    setShowResetModal(false);
    setResetSuccess(true);
    setTimeout(() => setResetSuccess(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Demo Account & Settings
          </h1>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-gada-violet/20 text-gada-magenta font-semibold border border-gada-violet/30">
            SIMULATED PROFILE
          </span>
        </div>
        <p className="text-xs sm:text-sm text-gada-muted mt-1">
          Manage your virtual trader profile, display preferences, and testnet portfolio configurations.
        </p>
      </div>

      {resetSuccess && (
        <div className="p-4 rounded-xl bg-gada-up/15 border border-gada-up/30 text-xs text-gada-up flex items-center gap-3 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5" />
          <span>Demo account balances and order history have been successfully reset to default!</span>
        </div>
      )}

      {/* Profile Overview Card */}
      <div className="bg-gada-surface border border-gada-border rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-gada-violet to-gada-magenta p-0.5 shadow-glow-purple">
            <div className="w-full h-full bg-gada-midnight rounded-2xl flex items-center justify-center font-black text-xl text-white">
              GD
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white">{profile.username}</h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-gada-magenta/20 text-gada-magenta font-bold border border-gada-magenta/30">
                {profile.tier}
              </span>
            </div>
            <p className="text-xs text-gada-muted mt-0.5">{profile.email}</p>
            <span className="text-[10px] text-gada-subtle mt-1 block">
              Joined {profile.joinedAt} &bull; Simulated Environment User
            </span>
          </div>
        </div>

        {/* Balance Snapshot */}
        <div className="flex items-center gap-4 text-xs num-tabular">
          <div className="p-4 rounded-xl bg-gada-midnight/80 border border-gada-border text-right">
            <span className="text-[10px] text-gada-subtle block uppercase font-medium">Demo USDT Free</span>
            <span className="text-lg font-black text-white">
              ${usdtBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <button
            onClick={claimFaucet}
            className="px-3.5 py-3 rounded-xl bg-gada-violet/20 hover:bg-gada-violet/30 text-gada-magenta border border-gada-violet/40 font-bold transition-all flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+5,000 Faucet</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trading Preferences */}
        <div className="bg-gada-surface border border-gada-border rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gada-violet/20 text-gada-magenta border border-gada-violet/30">
              <Settings className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white">Exchange Preferences</h3>
          </div>

          <div className="space-y-4 text-xs">
            {/* Currency Selector */}
            <div className="flex items-center justify-between pb-3 border-b border-gada-border/50">
              <div>
                <span className="font-semibold text-white block">Display Currency</span>
                <span className="text-[11px] text-gada-muted">Benchmark simulated valuations</span>
              </div>
              <select
                value={preferences.currency}
                onChange={(e) => updatePreferences({ currency: e.target.value as any })}
                className="bg-gada-midnight border border-gada-border rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-gada-violet"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>

            {/* Order Confirmations */}
            <div className="flex items-center justify-between pb-3 border-b border-gada-border/50">
              <div>
                <span className="font-semibold text-white block">Order Submission Confirmation</span>
                <span className="text-[11px] text-gada-muted">Show modal warning before simulated order execution</span>
              </div>
              <button
                onClick={() => updatePreferences({ orderConfirmations: !preferences.orderConfirmations })}
                className={`w-11 h-6 rounded-full transition-colors relative ${
                  preferences.orderConfirmations ? 'bg-gada-magenta' : 'bg-gada-elevated border border-gada-border'
                }`}
              >
                <span
                  className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                    preferences.orderConfirmations ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Layout Density */}
            <div className="flex items-center justify-between pb-3 border-b border-gada-border/50">
              <div>
                <span className="font-semibold text-white block">Layout Density</span>
                <span className="text-[11px] text-gada-muted">Adjust workspace table and panel padding</span>
              </div>
              <div className="flex items-center gap-1 bg-gada-midnight p-1 rounded-xl border border-gada-border">
                <button
                  onClick={() => updatePreferences({ layoutDensity: 'compact' })}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                    preferences.layoutDensity === 'compact' ? 'bg-gada-violet text-white' : 'text-gada-muted'
                  }`}
                >
                  Compact
                </button>
                <button
                  onClick={() => updatePreferences({ layoutDensity: 'comfortable' })}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                    preferences.layoutDensity === 'comfortable' ? 'bg-gada-violet text-white' : 'text-gada-muted'
                  }`}
                >
                  Comfortable
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Security Demonstration */}
        <div className="bg-gada-surface border border-gada-border rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gada-up/20 text-gada-up border border-gada-up/30">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white">Security Architecture (Demo)</h3>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-gada-border/50">
              <div>
                <span className="font-semibold text-white block">Two-Factor Authentication (2FA)</span>
                <span className="text-[11px] text-gada-muted">Simulated hardware authenticator key</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-gada-up/15 text-gada-up font-bold text-[10px] border border-gada-up/30">
                ACTIVE
              </span>
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-gada-border/50">
              <div>
                <span className="font-semibold text-white block">Anti-Phishing Code</span>
                <span className="text-[11px] text-gada-muted">Verified security stamp on outgoing alerts</span>
              </div>
              <span className="font-mono text-white text-xs bg-gada-midnight px-2 py-1 rounded border border-gada-border">
                GADA-SEC-992
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-white block">API Keys Management</span>
                <span className="text-[11px] text-gada-muted">Simulation testnet endpoints only</span>
              </div>
              <span className="text-gada-subtle text-xs">Restricted Mode</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reset Account Danger Area */}
      <div className="p-6 rounded-2xl bg-gada-surface border border-gada-down/30 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-gada-down" />
              Reset Demo Account
            </h3>
            <p className="text-xs text-gada-muted max-w-xl">
              Restore your virtual balance back to default (10,000 USDT and 100 GDT). All simulated open orders and transaction histories will be wiped.
            </p>
          </div>

          <Button variant="danger" size="md" onClick={() => setShowResetModal(true)}>
            <RotateCcw className="w-4 h-4" />
            <span>Reset Demo Portfolio</span>
          </Button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        title="Confirm Portfolio Reset"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <div className="p-3 rounded-xl bg-gada-down/10 border border-gada-down/30 text-xs text-gada-down flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>
              Are you sure you want to reset your simulated portfolio? This will cancel all open limit orders, wipe your transaction ledger, and restore 10,000 USDT.
            </span>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" size="sm" onClick={() => setShowResetModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" onClick={handleReset}>
              Yes, Reset Everything
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
