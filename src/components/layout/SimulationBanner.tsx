import React, { useState } from 'react';
import { AlertTriangle, X, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SimulationBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside aria-label="Simulation Notice" className="bg-gradient-to-r from-[#24005E] via-[#1F1730] to-[#10091E] border-b border-gada-violet/30 px-4 py-2 text-xs relative z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-gada-muted">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 font-semibold text-[11px] border border-amber-500/30">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            SIMULATION MODE
          </span>
          <span className="hidden sm:inline text-white/90">
            Gadadex is a paper-trading demonstration platform. All orders, balances, and market activities are virtual.
          </span>
          <span className="sm:hidden text-white/90">
            Virtual simulation demo. No real assets.
          </span>
          <Link
            to="/learn"
            className="text-gada-magenta hover:underline ml-1 font-medium inline-flex items-center gap-1"
          >
            Learn more
          </Link>
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="text-gada-muted hover:text-white p-1 rounded transition-colors"
          title="Dismiss banner"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
