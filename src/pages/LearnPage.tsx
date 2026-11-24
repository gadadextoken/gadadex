import React, { useState } from 'react';
import { EDUCATIONAL_LESSONS, GLOSSARY_ITEMS, Lesson } from '../data/educationalContent';
import { Modal } from '../components/common/Modal';
import { Button } from '../components/common/Button';
import {
  BookOpen,
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  HelpCircle,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

export const LearnPage: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [glossarySearch, setGlossarySearch] = useState('');
  const [glossaryCategory, setGlossaryCategory] = useState<string>('all');

  const filteredGlossary = GLOSSARY_ITEMS.filter((item) => {
    const matchesCategory = glossaryCategory === 'all' || item.category === glossaryCategory;
    const matchesSearch =
      item.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      item.definition.toLowerCase().includes(glossarySearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gada-violet/15 border border-gada-violet/30 text-gada-magenta text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Knowledge & Education Hub</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Exchange Learning Center
        </h1>
        <p className="text-sm text-gada-muted max-w-2xl leading-relaxed">
          Master the mechanics of exchange order books, risk management strategies, candlestick charting, and simulated trading practices without financial risk.
        </p>
      </div>

      {/* Educational Lessons Grid */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white">Educational Guides & Tutorials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EDUCATIONAL_LESSONS.map((lesson) => (
            <div
              key={lesson.id}
              onClick={() => setSelectedLesson(lesson)}
              className="bg-gada-surface border border-gada-border hover:border-gada-violet/50 rounded-2xl p-6 shadow-xl transition-all cursor-pointer group flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gada-magenta uppercase tracking-wider bg-gada-violet/10 px-2 py-0.5 rounded-full border border-gada-violet/20">
                    {lesson.category}
                  </span>
                  <span className="text-[11px] text-gada-subtle flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {lesson.readTime}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-gada-magenta transition-colors">
                  {lesson.title}
                </h3>

                <p className="text-xs text-gada-muted leading-relaxed line-clamp-3">
                  {lesson.summary}
                </p>
              </div>

              <div className="pt-2 border-t border-gada-border/50 flex items-center justify-between text-xs font-semibold text-gada-magenta group-hover:translate-x-0.5 transition-transform">
                <span>Read Full Guide</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Glossary Section */}
      <div className="space-y-6 pt-6 border-t border-gada-border/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white">Crypto & Trading Glossary</h2>
            <p className="text-xs text-gada-muted">Comprehensive definitions of common market concepts</p>
          </div>

          {/* Glossary Search & Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex items-center gap-1 p-1 bg-gada-surface rounded-xl border border-gada-border text-xs">
              <button
                onClick={() => setGlossaryCategory('all')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  glossaryCategory === 'all'
                    ? 'bg-gada-violet text-white'
                    : 'text-gada-muted hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setGlossaryCategory('trading')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  glossaryCategory === 'trading'
                    ? 'bg-gada-violet text-white'
                    : 'text-gada-muted hover:text-white'
                }`}
              >
                Trading
              </button>
              <button
                onClick={() => setGlossaryCategory('order-types')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  glossaryCategory === 'order-types'
                    ? 'bg-gada-violet text-white'
                    : 'text-gada-muted hover:text-white'
                }`}
              >
                Orders
              </button>
              <button
                onClick={() => setGlossaryCategory('risk')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  glossaryCategory === 'risk'
                    ? 'bg-gada-violet text-white'
                    : 'text-gada-muted hover:text-white'
                }`}
              >
                Risk
              </button>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gada-muted" />
              <input
                type="text"
                placeholder="Search term..."
                value={glossarySearch}
                onChange={(e) => setGlossarySearch(e.target.value)}
                className="w-full sm:w-56 pl-8 pr-3 py-1.5 bg-gada-surface border border-gada-border rounded-xl text-xs text-white placeholder-gada-muted focus:outline-none focus:border-gada-violet"
              />
            </div>
          </div>
        </div>

        {/* Glossary Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGlossary.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-gada-surface border border-gada-border space-y-2 hover:border-gada-violet/30 transition-colors"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white">{item.term}</h4>
                <span className="text-[10px] uppercase font-semibold text-gada-subtle bg-gada-midnight px-2 py-0.5 rounded border border-gada-border">
                  {item.category}
                </span>
              </div>
              <p className="text-xs text-gada-muted leading-relaxed">{item.definition}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Lesson Reader Modal */}
      {selectedLesson && (
        <Modal
          isOpen={!!selectedLesson}
          onClose={() => setSelectedLesson(null)}
          title={selectedLesson.title}
          maxWidth="lg"
        >
          <div className="space-y-6 text-sm">
            <div className="flex items-center justify-between pb-3 border-b border-gada-border text-xs">
              <span className="text-gada-magenta font-bold">{selectedLesson.category}</span>
              <span className="text-gada-muted">{selectedLesson.readTime}</span>
            </div>

            <div className="space-y-4 text-gada-muted leading-relaxed">
              {selectedLesson.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-gada-midnight/80 border border-gada-border space-y-2.5">
              <h4 className="text-xs font-bold uppercase text-white tracking-wider">
                Key Takeaways
              </h4>
              <ul className="space-y-2 text-xs text-gada-muted">
                {selectedLesson.keyTakeaways.map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gada-up shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end pt-2">
              <Button variant="primary" size="sm" onClick={() => setSelectedLesson(null)}>
                Got it
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
