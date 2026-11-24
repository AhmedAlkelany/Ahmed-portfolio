import { useState } from 'react';
import type { DefenseStage } from '../data/portfolioData';

interface DefenseLifecyclePanelProps {
  heading: string;
  subheading: string;
  toolsLabel: string;
  credentialLabel: string;
  deliverableLabel: string;
  stages: DefenseStage[];
}

export function DefenseLifecyclePanel({
  heading,
  subheading,
  toolsLabel,
  credentialLabel,
  deliverableLabel,
  stages,
}: DefenseLifecyclePanelProps) {
  const [activeId, setActiveId] = useState<string>(stages[0]?.id ?? 'detect');
  const activeStage = stages.find((s) => s.id === activeId) ?? stages[0];
  const activeIndex = stages.findIndex((s) => s.id === activeStage.id);

  return (
    <div className="flex h-full flex-col justify-between rounded-xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-[#10141B] p-6 sm:p-8">
      <div>
        <div className="flex items-start justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-5">
          <div>
            <h2 className="font-display text-lg font-semibold tracking-tight text-slate-950 dark:text-slate-50">
              {heading}
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {subheading}
            </p>
          </div>
          <span className="font-mono text-xs text-slate-500 dark:text-slate-400 tabular-nums shrink-0 pt-1">
            {activeStage.index} / 0{stages.length}
          </span>
        </div>

        {/* Interactive Stage Selector */}
        <div
          role="tablist"
          aria-label={heading}
          className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-1.5 rounded-lg bg-slate-100 dark:bg-[#0A0D12] p-1"
        >
          {stages.map((stage) => {
            const isSelected = stage.id === activeStage.id;
            return (
              <button
                key={stage.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveId(stage.id)}
                className={`flex items-center justify-center gap-1.5 rounded-md px-3 py-2 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] ${
                  isSelected
                    ? 'bg-white dark:bg-[#19202C] text-slate-950 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <span className="font-mono text-[11px] opacity-70 tabular-nums">{stage.index}</span>
                <span>{stage.label}</span>
              </button>
            );
          })}
        </div>

        {/* Architectural Signal Schematic SVG */}
        <div className="mt-6 rounded-lg bg-slate-50 dark:bg-[#0B0E14] px-5 py-4 border border-slate-200/70 dark:border-slate-800/60">
          <svg
            viewBox="0 0 460 74"
            className="w-full h-auto"
            role="img"
            aria-label={`${activeStage.label} phase diagram`}
          >
            {/* Baseline Track */}
            <line
              x1="44"
              y1="30"
              x2="416"
              y2="30"
              stroke="currentColor"
              className="text-slate-200 dark:text-slate-800"
              strokeWidth="1.5"
            />
            {/* Active Progress Track */}
            <line
              x1="44"
              y1="30"
              x2={44 + activeIndex * 124}
              y2="30"
              stroke="#2563EB"
              strokeWidth="2"
              className="transition-all duration-200"
            />
            {stages.map((stage, idx) => {
              const cx = 44 + idx * 124;
              const isCurrent = idx === activeIndex;
              const isPassed = idx < activeIndex;
              return (
                <g
                  key={stage.id}
                  onClick={() => setActiveId(stage.id)}
                  className="cursor-pointer"
                >
                  {isCurrent && (
                    <circle
                      cx={cx}
                      cy="30"
                      r="14"
                      fill="none"
                      stroke="#2563EB"
                      strokeOpacity="0.28"
                      strokeWidth="1.5"
                    />
                  )}
                  <circle
                    cx={cx}
                    cy="30"
                    r={isCurrent ? 7 : 5}
                    fill={isCurrent || isPassed ? '#2563EB' : 'currentColor'}
                    className={
                      isCurrent || isPassed
                        ? 'transition-transform duration-150'
                        : 'text-slate-300 dark:text-slate-700'
                    }
                  />
                  <text
                    x={cx}
                    y="60"
                    textAnchor="middle"
                    className={`text-[11px] font-mono ${
                      isCurrent
                        ? 'fill-slate-950 dark:fill-white font-medium'
                        : 'fill-slate-500 dark:fill-slate-400'
                    }`}
                  >
                    {stage.index}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Active Stage Body */}
        <div role="tabpanel" className="mt-6">
          <h3 className="font-display text-xl font-semibold tracking-tight text-slate-950 dark:text-slate-50">
            {activeStage.title}
          </h3>
          <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {activeStage.summary}
          </p>
        </div>
      </div>

      {/* Structured Operational Metadata (Zero-Pill Unboxed Ledger) */}
      <dl className="mt-7 grid grid-cols-1 gap-4 border-t border-slate-200/80 dark:border-slate-800/80 pt-5 text-sm">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
          <dt className="text-xs font-medium text-slate-500 dark:text-slate-400 shrink-0">
            {toolsLabel}
          </dt>
          <dd className="font-mono text-xs text-slate-900 dark:text-slate-100 sm:text-end">
            {activeStage.tools.join(' · ')}
          </dd>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
          <dt className="text-xs font-medium text-slate-500 dark:text-slate-400 shrink-0">
            {credentialLabel}
          </dt>
          <dd className="text-xs font-medium text-[#2563EB] dark:text-[#60A5FA] sm:text-end">
            {activeStage.credentialRef}
          </dd>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
          <dt className="text-xs font-medium text-slate-500 dark:text-slate-400 shrink-0">
            {deliverableLabel}
          </dt>
          <dd className="text-xs text-slate-700 dark:text-slate-300 sm:text-end">
            {activeStage.deliverable}
          </dd>
        </div>
      </dl>
    </div>
  );
}
