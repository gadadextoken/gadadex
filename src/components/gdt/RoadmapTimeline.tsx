import React from 'react';
import { GDT_ROADMAP } from '../../data/gdtEcosystemData';
import { CheckCircle2, Clock, Sparkles, ArrowRight } from 'lucide-react';

export const RoadmapTimeline: React.FC = () => {
  return (
    <div className="rounded-2xl bg-gada-surface/90 border border-gada-border p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gada-border pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Sparkles className="w-4 h-4 text-gada-magenta" />
            <span className="text-xs font-semibold text-gada-magenta uppercase tracking-wider">
              Strategic Growth Execution
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            GADA Ecosystem Roadmap
          </h3>
          <p className="text-xs sm:text-sm text-gada-muted mt-1">
            Five deliberate phases focused on sustainable real-world utility, banking integration, and exchange liquidity.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gada-violet/15 border border-gada-violet/30 text-gada-violet text-xs font-semibold self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Currently in Phase 1 (Foundation)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {GDT_ROADMAP.map((phase) => {
          const isCurrent = phase.status === 'current';
          return (
            <div
              key={`phase-${phase.phase}`}
              className={`rounded-2xl p-5 border flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                isCurrent
                  ? 'bg-gradient-to-b from-[#24005E]/40 via-gada-midnight to-gada-surface border-gada-violet/80 shadow-glow-purple ring-1 ring-gada-magenta/40'
                  : 'bg-gada-midnight/60 border-gada-border/80 hover:border-gada-border'
              }`}
            >
              {isCurrent && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-gada-magenta to-gada-violet text-white text-[10px] font-black uppercase px-3 py-0.5 rounded-bl-lg tracking-wider">
                  Active Phase
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      isCurrent
                        ? 'bg-gada-magenta/20 text-gada-magenta border border-gada-magenta/40'
                        : 'bg-gada-surface text-gada-subtle border border-gada-border'
                    }`}
                  >
                    Phase 0{phase.phase}
                  </span>
                  <span className="text-[11px] font-medium text-gada-subtle">
                    {phase.timeline}
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white tracking-tight">
                    {phase.title}
                  </h4>
                  <p className="text-xs text-gada-muted font-medium mt-0.5">
                    {phase.subtitle}
                  </p>
                </div>

                <ul className="space-y-2 pt-2 border-t border-gada-border/50">
                  {phase.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      {isCurrent ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <Clock className="w-3.5 h-3.5 text-gada-subtle shrink-0 mt-0.5" />
                      )}
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 pt-3 border-t border-gada-border/40 flex items-center justify-between text-[11px] text-gada-muted">
                <span>Status:</span>
                <span
                  className={`font-semibold ${
                    isCurrent
                      ? 'text-emerald-400'
                      : 'text-gada-subtle'
                  }`}
                >
                  {isCurrent ? 'In Execution' : 'Upcoming Milestone'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 rounded-xl bg-gada-midnight/70 border border-gada-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-gada-muted">
        <p>
          <strong className="text-white">Authoritative Milestone Source:</strong> Synchronized with Whitepaper v1.0 on{' '}
          <a
            href="https://gadatoken.com#roadmap"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gada-violet hover:text-gada-magenta underline font-medium"
          >
            gadatoken.com
          </a>
          . Phase execution prioritizes authentic product delivery and verified transactional utility before public secondary listings.
        </p>
      </div>
    </div>
  );
};
