import React, { useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { GDT_TOKENOMICS, GDT_SPECIFICATIONS } from '../../data/gdtEcosystemData';
import { Shield, Lock, Layers, CheckCircle2 } from 'lucide-react';

export const TokenomicsChart: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeItem = activeIndex !== null ? GDT_TOKENOMICS[activeIndex] : null;

  return (
    <div className="rounded-2xl bg-gada-surface/90 border border-gada-border p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gada-border pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-gada-magenta animate-pulse" />
            <span className="text-xs font-semibold text-gada-magenta uppercase tracking-wider">
              Verified Economic Framework
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Tokenomics & Supply Allocation
          </h3>
          <p className="text-xs sm:text-sm text-gada-muted mt-1">
            Synchronized directly with <a href="https://gadatoken.com" target="_blank" rel="noopener noreferrer" className="text-gada-violet hover:text-gada-magenta underline font-medium">gadatoken.com</a> & Whitepaper v1.0
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-gada-midnight/80 border border-gada-border text-right num-tabular">
            <span className="text-[10px] uppercase font-bold text-gada-subtle block">Total Supply</span>
            <span className="text-sm font-black text-white">{GDT_SPECIFICATIONS.totalSupplyFormatted}</span>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>100% Fixed Cap</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Chart Column */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          <div className="w-full h-64 sm:h-72 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={GDT_TOKENOMICS}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={105}
                  paddingAngle={3}
                  dataKey="percentage"
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {GDT_TOKENOMICS.map((entry, index) => (
                    <Cell
                      key={`cell-${entry.id}`}
                      fill={entry.color}
                      stroke="#10091E"
                      strokeWidth={2}
                      className="cursor-pointer transition-opacity duration-200"
                      opacity={activeIndex === null || activeIndex === index ? 1 : 0.4}
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-gada-midnight/95 border border-gada-violet/50 p-3 rounded-xl shadow-xl backdrop-blur-md">
                          <p className="text-xs font-bold text-white flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: data.color }} />
                            {data.name}
                          </p>
                          <p className="text-sm font-black text-gada-magenta mt-1 num-tabular">
                            {data.percentage}% ({data.amountFormatted})
                          </p>
                          <p className="text-[11px] text-gada-muted mt-1 max-w-[200px] leading-relaxed">
                            {data.description}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Center label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none num-tabular">
              <span className="text-[11px] text-gada-muted uppercase font-medium">
                {activeItem ? activeItem.name : 'Total Allocation'}
              </span>
              <span className="text-2xl font-black text-white">
                {activeItem ? `${activeItem.percentage}%` : '50 Billion'}
              </span>
              <span className="text-[10px] text-gada-violet font-semibold">
                {activeItem ? activeItem.amountFormatted : 'GDT (100%)'}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-gada-subtle text-center italic mt-1">
            Hover over any segment to inspect its strategic allocation & vesting
          </p>
        </div>

        {/* Breakdown List Column */}
        <div className="lg:col-span-7 space-y-3">
          {GDT_TOKENOMICS.map((item, index) => {
            const isHovered = activeIndex === index;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                  isHovered
                    ? 'bg-gada-midnight border-gada-violet/80 shadow-md translate-x-1'
                    : 'bg-gada-midnight/50 border-gada-border/70 hover:border-gada-border hover:bg-gada-midnight/70'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-3.5 h-3.5 rounded-md shrink-0 shadow-sm"
                      style={{ backgroundColor: item.color }}
                    />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                        {item.name}
                        {item.vesting && (
                          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-gada-surface border border-gada-border text-gada-subtle">
                            <Lock className="w-2.5 h-2.5" />
                            {item.vesting}
                          </span>
                        )}
                      </h4>
                      <p className="text-[11px] text-gada-muted mt-0.5 line-clamp-1">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0 num-tabular">
                    <span className="text-sm font-black text-white block">
                      {item.percentage}%
                    </span>
                    <span className="text-[11px] text-gada-subtle">
                      {item.amountFormatted}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stewardship Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4 border-t border-gada-border/60">
        <div className="p-3.5 rounded-xl bg-gada-midnight/60 border border-gada-border flex items-start gap-3">
          <div className="p-2 rounded-lg bg-gada-violet/10 text-gada-violet shrink-0">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <h5 className="text-xs font-bold text-white">Zero Hidden Inflation</h5>
            <p className="text-[11px] text-gada-muted mt-0.5 leading-snug">
              Mathematically fixed at 50B GDT on BNB Smart Chain. No minting backdoor.
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-gada-midnight/60 border border-gada-border flex items-start gap-3">
          <div className="p-2 rounded-lg bg-gada-magenta/10 text-gada-magenta shrink-0">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <h5 className="text-xs font-bold text-white">Vested Alignments</h5>
            <p className="text-[11px] text-gada-muted mt-0.5 leading-snug">
              Team, advisor, and reserve distributions bound by multi-year linear vesting cliffs.
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-gada-midnight/60 border border-gada-border flex items-start gap-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h5 className="text-xs font-bold text-white">Multi-App Utility</h5>
            <p className="text-[11px] text-gada-muted mt-0.5 leading-snug">
              Unifies social tipping (gada.chat), streaming (gadavoice.com), commerce, and trading simulation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
