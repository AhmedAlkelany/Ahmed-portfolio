import { useEffect } from 'react';
import { Download, ExternalLink, X } from 'lucide-react';
import { PROFILE_META, type PortfolioContent } from '../data/portfolioData';

interface CvModalProps {
  open: boolean;
  onClose: () => void;
  content: PortfolioContent['cvModal'];
}

export function CvModal({ open, onClose, content }: CvModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 sm:p-6 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="flex h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#10141B] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 px-6 py-4">
          <div>
            <h2 id="cv-modal-title" className="font-display text-lg font-semibold text-slate-950 dark:text-slate-50">
              {content.title}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {content.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <a
              href={PROFILE_META.cvUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{content.openNewTab}</span>
            </a>
            <a
              href={PROFILE_META.cvUrl}
              download={PROFILE_META.cvFileName}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#2563EB] px-3.5 py-2 text-xs font-medium text-white hover:bg-[#1D4ED8] transition-colors whitespace-nowrap shrink-0"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{content.downloadButton}</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label={content.closeLabel}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="flex-1 bg-slate-100 dark:bg-[#090B0E]">
          <iframe
            src={PROFILE_META.cvUrl}
            title={content.title}
            className="h-full w-full border-0"
          />
        </div>
      </div>
    </div>
  );
}
