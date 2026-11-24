import React, { useState } from 'react';
import { GDT_WHITEPAPER_CHAPTERS, WhitepaperChapter } from '../../data/gdtEcosystemData';
import {
  FileText,
  X,
  ChevronRight,
  ChevronLeft,
  Search,
  Printer,
  ExternalLink,
  BookOpen,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '../common/Button';

interface WhitepaperModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialChapterId?: number;
}

export const WhitepaperModal: React.FC<WhitepaperModalProps> = ({
  isOpen,
  onClose,
  initialChapterId = 1,
}) => {
  const [selectedChapterId, setSelectedChapterId] = useState<number>(initialChapterId);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredChapters = GDT_WHITEPAPER_CHAPTERS.filter((ch) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      ch.title.toLowerCase().includes(query) ||
      ch.category.toLowerCase().includes(query) ||
      ch.summary.toLowerCase().includes(query) ||
      ch.subtitle.toLowerCase().includes(query)
    );
  });

  const currentChapter =
    GDT_WHITEPAPER_CHAPTERS.find((ch) => ch.id === selectedChapterId) ||
    GDT_WHITEPAPER_CHAPTERS[0];

  const currentIndex = GDT_WHITEPAPER_CHAPTERS.findIndex(
    (ch) => ch.id === currentChapter.id
  );

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelectedChapterId(GDT_WHITEPAPER_CHAPTERS[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < GDT_WHITEPAPER_CHAPTERS.length - 1) {
      setSelectedChapterId(GDT_WHITEPAPER_CHAPTERS[currentIndex + 1].id);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl h-[90vh] flex flex-col rounded-3xl bg-gada-surface border border-gada-violet/50 shadow-2xl shadow-purple-950/80 overflow-hidden">
        {/* Modal Top Header */}
        <div className="px-6 py-4 bg-gada-midnight/90 border-b border-gada-border flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-gada-violet to-gada-magenta text-white shadow-md">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                  GADA TOKEN (GDT) Official Whitepaper
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-gada-violet/20 border border-gada-violet/40 text-gada-violet font-bold">
                  v1.0 Verified
                </span>
              </div>
              <p className="text-xs text-gada-muted">
                Direct source: <span className="text-gada-subtle font-mono">gadatoken.com</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs py-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </Button>
            <a
              href="https://gadatoken.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gada-midnight border border-gada-border text-xs text-gada-muted hover:text-white transition-colors"
            >
              <span>gadatoken.com</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-gada-muted hover:text-white hover:bg-gada-midnight transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Sidebar + Main Content */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Chapter Navigation Sidebar */}
          <div className="w-full md:w-80 bg-gada-midnight/60 border-r border-gada-border flex flex-col shrink-0">
            {/* Search */}
            <div className="p-3 border-b border-gada-border">
              <div className="relative">
                <Search className="w-4 h-4 text-gada-subtle absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search 13 chapters..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gada-surface border border-gada-border rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-gada-subtle focus:outline-none focus:border-gada-violet"
                />
              </div>
            </div>

            {/* Chapter List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
              {filteredChapters.map((ch) => {
                const isSelected = ch.id === currentChapter.id;
                return (
                  <button
                    key={ch.id}
                    onClick={() => setSelectedChapterId(ch.id)}
                    className={`w-full text-left p-2.5 rounded-xl transition-all duration-150 flex items-start justify-between gap-2 ${
                      isSelected
                        ? 'bg-gradient-to-r from-gada-violet/25 to-gada-surface border border-gada-violet/60 text-white shadow-sm'
                        : 'text-gada-muted hover:text-white hover:bg-gada-surface/60 border border-transparent'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold text-gada-subtle">
                          0{ch.id}.
                        </span>
                        <span className="text-[10px] uppercase font-bold text-gada-violet tracking-wide">
                          {ch.category}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-white mt-0.5 line-clamp-1">
                        {ch.title}
                      </p>
                    </div>
                    {isSelected && (
                      <ChevronRight className="w-4 h-4 text-gada-magenta shrink-0 mt-1" />
                    )}
                  </button>
                );
              })}

              {filteredChapters.length === 0 && (
                <div className="text-center py-8 text-xs text-gada-subtle">
                  No chapters match "{searchQuery}"
                </div>
              )}
            </div>
          </div>

          {/* Chapter Content Pane */}
          <div className="flex-1 flex flex-col overflow-y-auto p-6 sm:p-10 custom-scrollbar bg-gradient-to-b from-gada-surface to-[#0e071c]">
            <div className="max-w-3xl mx-auto w-full space-y-6">
              {/* Header */}
              <div className="space-y-2 pb-6 border-b border-gada-border">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-gada-magenta/15 border border-gada-magenta/30 text-gada-magenta text-xs font-bold uppercase tracking-wider">
                    Chapter 0{currentChapter.id} • {currentChapter.category}
                  </span>
                  <span className="text-xs text-gada-subtle font-mono">
                    Official Gada Whitepaper v1.0
                  </span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  {currentChapter.title}
                </h2>

                <p className="text-sm sm:text-base text-gada-violet font-medium">
                  {currentChapter.subtitle}
                </p>
              </div>

              {/* Summary */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gada-midnight/70 border border-gada-border/80">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gada-subtle mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-gada-magenta" />
                  <span>Executive Summary</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {currentChapter.summary}
                </p>
              </div>

              {/* Key Bullet Highlights */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gada-subtle">
                  Architecture & Specifications
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {currentChapter.bullets.map((b, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-gada-midnight/40 border border-gada-border/60 space-y-1"
                    >
                      <h5 className="text-sm font-bold text-white flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gada-magenta" />
                        {b.heading}
                      </h5>
                      <p className="text-xs text-gada-muted leading-relaxed pl-3.5">
                        {b.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Callout */}
              {currentChapter.callout && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-gada-violet/20 via-gada-midnight to-gada-surface border border-gada-violet/40 flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-gada-magenta shrink-0" />
                  <span className="text-xs font-mono font-medium text-purple-200">
                    {currentChapter.callout}
                  </span>
                </div>
              )}

              {/* Bottom Pagination */}
              <div className="pt-8 border-t border-gada-border flex items-center justify-between gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="flex items-center gap-1.5 text-xs"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Chapter</span>
                </Button>

                <span className="text-xs font-mono text-gada-subtle num-tabular">
                  Chapter {currentIndex + 1} of {GDT_WHITEPAPER_CHAPTERS.length}
                </span>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleNext}
                  disabled={currentIndex === GDT_WHITEPAPER_CHAPTERS.length - 1}
                  className="flex items-center gap-1.5 text-xs"
                >
                  <span>Next Chapter</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
