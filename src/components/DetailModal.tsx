import { useEffect } from 'react';
import { X } from 'lucide-react';
import type { CertificationItem, ProjectItem } from '../data/portfolioData';

export type ModalDetailPayload =
  | { kind: 'certification'; item: CertificationItem; focusLabel: string; skillsLabel: string }
  | { kind: 'project'; item: ProjectItem };

interface DetailModalProps {
  detail: ModalDetailPayload | null;
  onClose: () => void;
  closeLabel: string;
  deliverablesLabel: string;
  highlightsLabel: string;
}

export function DetailModal({
  detail,
  onClose,
  closeLabel,
  deliverablesLabel,
  highlightsLabel,
}: DetailModalProps) {
  useEffect(() => {
    if (!detail) return;
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
  }, [detail, onClose]);

  if (!detail) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 sm:p-6 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#10141B] p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {detail.kind === 'certification' ? (
          <div>
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-mono text-[#2563EB] dark:text-[#60A5FA]">{detail.item.code}</span>
                  <span aria-hidden="true">·</span>
                  <span>{detail.item.domainLabel}</span>
                </div>
                <h3
                  id="detail-modal-title"
                  className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-950 dark:text-slate-50"
                >
                  {detail.item.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={closeLabel}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-6 space-y-6">
              <div>
                <h4 className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {detail.focusLabel}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  {detail.item.overview}
                </p>
              </div>

              <div className="border-t border-slate-200 dark:border-slate-800 pt-5">
                <h4 className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {detail.skillsLabel}
                </h4>
                <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-6 text-sm text-slate-800 dark:text-slate-200">
                  {detail.item.appliedSkills.map((skill) => (
                    <li key={skill} className="flex items-baseline gap-2.5">
                      <span className="font-mono text-xs text-[#2563EB] dark:text-[#60A5FA]" aria-hidden="true">
                        —
                      </span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span>{detail.item.role}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono">{detail.item.period}</span>
                </div>
                <h3
                  id="detail-modal-title"
                  className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-950 dark:text-slate-50"
                >
                  {detail.item.title}
                </h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  {detail.item.type}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={closeLabel}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-6 space-y-6">
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                {detail.item.summary}
              </p>

              <div className="border-t border-slate-200 dark:border-slate-800 pt-5">
                <h4 className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {highlightsLabel}
                </h4>
                <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  {detail.item.highlights.map((line) => (
                    <li key={line} className="flex items-baseline gap-2.5">
                      <span className="font-mono text-xs text-[#2563EB] dark:text-[#60A5FA]" aria-hidden="true">
                        —
                      </span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-slate-200 dark:border-slate-800 pt-5">
                <h4 className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {deliverablesLabel}
                </h4>
                <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-6 text-sm text-slate-800 dark:text-slate-200">
                  {detail.item.deliverables.map((item) => (
                    <li key={item} className="flex items-baseline gap-2.5">
                      <span className="font-mono text-xs text-slate-400" aria-hidden="true">
                        /
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
