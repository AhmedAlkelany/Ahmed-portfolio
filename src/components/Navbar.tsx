import { useState } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { PROFILE_META, type PortfolioContent } from '../data/portfolioData';

interface NavbarProps {
  content: PortfolioContent['nav'];
}

export function Navbar({ content }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 dark:border-slate-800/80 bg-[#F8F9FB]/90 dark:bg-[#090B0E]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-8 px-6">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#top"
          className="font-display text-lg font-semibold tracking-tight text-slate-950 dark:text-slate-50 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB]"
        >
          {content.brand}
        </a>

        {/* Zone 2: Clean Single-Line Nav Links */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-7">
          {content.links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white underline-offset-8 hover:underline decoration-slate-400 dark:decoration-slate-500 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={PROFILE_META.cvUrl}
            download={PROFILE_META.cvFileName}
            className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-4 py-2 text-sm font-medium text-white hover:bg-[#1D4ED8] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
          >
            <Download className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{content.downloadCv}</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={content.menuLabel}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 md:hidden transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
          >
            {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {mobileOpen && (
        <div className="border-t border-slate-200 dark:border-slate-800 bg-[#F8F9FB] dark:bg-[#090B0E] px-6 py-4 md:hidden">
          <nav aria-label="Mobile" className="flex flex-col gap-3">
            {content.links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setMobileOpen(false)}
                className="py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-[#2563EB] dark:hover:text-[#60A5FA] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={PROFILE_META.cvUrl}
              download={PROFILE_META.cvFileName}
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#1D4ED8] transition-colors"
            >
              <Download className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{content.downloadCv}</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
