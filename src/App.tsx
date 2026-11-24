import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  ArrowUpRight,
  Check,
  Copy,
  FileText,
  Languages,
  Mail,
  Moon,
  Sun,
} from 'lucide-react';
import {
  PORTFOLIO_CONTENT,
  PROFILE_META,
  type Locale,
} from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { DefenseLifecyclePanel } from './components/DefenseLifecyclePanel';
import { CvModal } from './components/CvModal';
import { DetailModal, type ModalDetailPayload } from './components/DetailModal';

type CapabilityFilter = 'all' | 'defensive' | 'offensive' | 'engineering';
type CertificationFilter = 'all' | 'soc' | 'forensics' | 'offensive' | 'ai';

export default function App() {
  const [locale, setLocale] = useState<Locale>('en');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [capabilityFilter, setCapabilityFilter] = useState<CapabilityFilter>('all');
  const [certFilter, setCertFilter] = useState<CertificationFilter>('all');
  const [cvOpen, setCvOpen] = useState(false);
  const [modalDetail, setModalDetail] = useState<ModalDetailPayload | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Contact inquiry form state
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);
  const [messageBody, setMessageBody] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [preparedInquiry, setPreparedInquiry] = useState<{
    subject: string;
    body: string;
    mailtoHref: string;
  } | null>(null);

  const content = PORTFOLIO_CONTENT[locale];
  const isRtl = locale === 'ar';

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  const filteredCapabilities = useMemo(() => {
    if (capabilityFilter === 'all') return content.expertise.capabilities;
    return content.expertise.capabilities.filter((item) => item.category === capabilityFilter);
  }, [capabilityFilter, content.expertise.capabilities]);

  const filteredCertifications = useMemo(() => {
    if (certFilter === 'all') return content.certifications.items;
    return content.certifications.items.filter((item) => item.domain === certFilter);
  }, [certFilter, content.certifications.items]);

  async function handleCopy(key: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(key);
      window.setTimeout(() => {
        setCopiedField((prev) => (prev === key ? null : prev));
      }, 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = value;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedField(key);
      window.setTimeout(() => {
        setCopiedField((prev) => (prev === key ? null : prev));
      }, 2000);
    }
  }

  function handleInquirySubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = senderName.trim();
    const trimmedEmail = senderEmail.trim();
    const trimmedMessage = messageBody.trim();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

    if (!trimmedName || !emailValid || trimmedMessage.length < 5) {
      setFormError(content.contact.validationError);
      return;
    }

    setFormError(null);
    const topic = content.contact.topics[selectedTopicIndex] ?? content.contact.topics[0];
    const subject = `${topic} — ${trimmedName}`;
    const formattedBody = [
      `Name: ${trimmedName}`,
      `Email: ${trimmedEmail}`,
      `Topic: ${topic}`,
      '',
      trimmedMessage,
    ].join('\n');

    const mailtoHref = `mailto:${PROFILE_META.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(formattedBody)}`;

    setPreparedInquiry({
      subject,
      body: formattedBody,
      mailtoHref,
    });
  }

  function resetInquiry() {
    setPreparedInquiry(null);
    setSenderName('');
    setSenderEmail('');
    setMessageBody('');
    setFormError(null);
  }

  return (
    <div id="top" className="min-h-screen bg-[#F8F9FB] text-[#11151B] dark:bg-[#090B0E] dark:text-[#EEF2F6]">
      <Navbar content={content.nav} />

      <main className="mx-auto max-w-[1200px] px-6">
        {/* HERO SECTION — Split Architectural Layout + Full-Width Proof Strip */}
        <section className="pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24">
          {/* Subtle Hero Utility Controls (Language & Theme placed outside Navbar) */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
            <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
              {content.hero.kicker}
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setLocale((prev) => (prev === 'en' ? 'ar' : 'en'))}
                className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 dark:border-slate-800 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-950 dark:hover:text-white transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
              >
                <Languages className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>{locale === 'en' ? 'العربية' : 'English'}</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 dark:border-slate-800 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-950 dark:hover:text-white transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>{locale === 'en' ? 'Light' : 'نهاري'}</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>{locale === 'en' ? 'Dark' : 'داكن'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch">
            {/* Left Column: Focal Headline & Primary Actions */}
            <div className="flex flex-col justify-between lg:col-span-6">
              <div>
                <h1 className="font-display text-[clamp(2.25rem,4.2vw,3.5rem)] font-semibold leading-[1.08] tracking-tight text-slate-950 dark:text-white [text-wrap:balance]">
                  {content.hero.headline}
                </h1>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
                  {content.hero.summary}
                </p>

                {/* Primary & Secondary Actions (Single Dominant Primary CTA) */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-5 py-3 text-sm font-medium text-white hover:bg-[#1D4ED8] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
                  >
                    <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{content.hero.primaryCta}</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setCvOpen(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-5 py-3 text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
                  >
                    <FileText className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{content.hero.secondaryCta}</span>
                  </button>

                  <a
                    href={PROFILE_META.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-[#2563EB] dark:hover:text-[#60A5FA] underline-offset-4 hover:underline transition-colors duration-150 whitespace-nowrap shrink-0 px-1 py-2"
                  >
                    <span>{content.hero.linkedinCta}</span>
                    <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Quiet Identity Ledger */}
              <div className="mt-10 border-t border-slate-200/80 dark:border-slate-800/80 pt-5 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    {PROFILE_META.fullName}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono">{PROFILE_META.email}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono" dir="ltr">
                    {PROFILE_META.phone}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Security Operations Workflow Panel */}
            <div className="lg:col-span-6">
              <DefenseLifecyclePanel
                heading={content.hero.lifecycleHeading}
                subheading={content.hero.lifecycleSubheading}
                toolsLabel={content.hero.lifecycleToolsLabel}
                credentialLabel={content.hero.lifecycleCredentialLabel}
                deliverableLabel={content.hero.lifecycleDeliverableLabel}
                stages={content.hero.stages}
              />
            </div>
          </div>

          {/* Full-Width 4-Column Verified Facts Strip Below Hero Split */}
          <div className="mt-12 grid grid-cols-1 gap-6 border-y border-slate-200 dark:border-slate-800/90 py-7 sm:grid-cols-2 lg:grid-cols-4">
            {content.hero.facts.map((fact) => (
              <div key={fact.label} className="space-y-1">
                <p className="font-mono text-2xl font-medium tracking-tight text-slate-950 dark:text-white tabular-nums">
                  {fact.value}
                </p>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  {fact.label}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {fact.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 01: CORE CAPABILITIES & TECHNICAL ARSENAL */}
        <section id="expertise" className="scroll-mt-24 py-16 sm:py-20">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-slate-950 dark:text-white [text-wrap:balance]">
                {content.expertise.sectionTitle}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-400">
                {content.expertise.sectionLead}
              </p>
            </div>

            {/* Interactive Domain Filter Control */}
            <div
              role="group"
              aria-label="Filter capabilities"
              className="flex flex-wrap items-center gap-1 rounded-lg bg-slate-200/70 dark:bg-[#11151C] p-1 self-start lg:self-auto"
            >
              {content.expertise.filters.map((filter) => {
                const active = capabilityFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setCapabilityFilter(filter.id)}
                    className={`rounded-md px-3.5 py-2 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] ${
                      active
                        ? 'bg-white dark:bg-[#1B2230] text-slate-950 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-200'
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {filteredCapabilities.map((item) => (
              <article
                key={item.id}
                className="flex flex-col justify-between rounded-xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-[#10141B] p-6 sm:p-7"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-mono tabular-nums">{item.index}</span>
                    <span>{item.categoryLabel}</span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-slate-950 dark:text-slate-50">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {item.description}
                  </p>
                </div>

                <p className="mt-6 border-t border-slate-200/80 dark:border-slate-800/80 pt-4 font-mono text-xs text-slate-500 dark:text-slate-400">
                  {item.stack.join(' · ')}
                </p>
              </article>
            ))}
          </div>

          {/* Unboxed Structured Skills & Languages Ledger */}
          <div className="mt-14 border-t border-slate-200 dark:border-slate-800/90 pt-10">
            <h3 className="font-display text-lg font-semibold text-slate-950 dark:text-slate-50">
              {content.expertise.skillsTitle}
            </h3>

            <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className="space-y-6 lg:col-span-7">
                {content.expertise.technicalGroups.map((group) => (
                  <div
                    key={group.label}
                    className="grid grid-cols-1 gap-2 border-b border-slate-200/70 dark:border-slate-800/70 pb-5 sm:grid-cols-12"
                  >
                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400 sm:col-span-4">
                      {group.label}
                    </div>
                    <div className="text-sm leading-relaxed text-slate-800 dark:text-slate-200 sm:col-span-8">
                      {group.items.join(' · ')}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-6 lg:col-span-5 lg:border-s lg:border-slate-200/80 dark:lg:border-slate-800/80 lg:ps-8">
                <div>
                  <h4 className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {content.expertise.softSkillsLabel}
                  </h4>
                  <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                    {content.expertise.softSkills.map((skill) => (
                      <li key={skill} className="flex items-baseline gap-2.5">
                        <span className="font-mono text-xs text-slate-400" aria-hidden="true">
                          —
                        </span>
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-slate-200/70 dark:border-slate-800/70 pt-5">
                  <h4 className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {content.expertise.languagesLabel}
                  </h4>
                  <dl className="mt-3 space-y-2 text-sm">
                    {content.expertise.languages.map((lang) => (
                      <div key={lang.name} className="flex items-baseline justify-between gap-4">
                        <dt className="font-medium text-slate-900 dark:text-slate-100">
                          {lang.name}
                        </dt>
                        <dd className="text-xs text-slate-500 dark:text-slate-400">
                          {lang.level}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 02: CERTIFICATIONS & CREDENTIALS */}
        <section
          id="certifications"
          className="scroll-mt-24 border-t border-slate-200 dark:border-slate-800/90 py-16 sm:py-20"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-slate-950 dark:text-white [text-wrap:balance]">
                {content.certifications.sectionTitle}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-400">
                {content.certifications.sectionLead}
              </p>
            </div>

            <div
              role="group"
              aria-label="Filter certifications"
              className="flex flex-wrap items-center gap-1 rounded-lg bg-slate-200/70 dark:bg-[#11151C] p-1 self-start lg:self-auto"
            >
              {content.certifications.filters.map((filter) => {
                const active = certFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setCertFilter(filter.id)}
                    className={`rounded-md px-3 py-2 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] ${
                      active
                        ? 'bg-white dark:bg-[#1B2230] text-slate-950 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-200'
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-10 divide-y divide-slate-200 dark:divide-slate-800/90 border-y border-slate-200 dark:border-slate-800/90">
            {filteredCertifications.map((cert) => (
              <div
                key={cert.id}
                className="group grid grid-cols-1 items-center gap-4 py-5 sm:grid-cols-12 sm:gap-6"
              >
                <div className="flex items-baseline gap-4 sm:col-span-3">
                  <span className="font-mono text-xs text-slate-400 tabular-nums">
                    {cert.index}
                  </span>
                  <span className="font-mono text-sm font-medium text-[#2563EB] dark:text-[#60A5FA]">
                    {cert.code}
                  </span>
                </div>

                <div className="sm:col-span-6">
                  <h3 className="font-display text-lg font-semibold text-slate-950 dark:text-slate-50">
                    {cert.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    {cert.focus}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4 sm:col-span-3 sm:justify-end">
                  <span className="text-xs text-slate-500 dark:text-slate-400 sm:hidden">
                    {cert.domainLabel}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setModalDetail({
                        kind: 'certification',
                        item: cert,
                        focusLabel: content.certifications.modalFocusLabel,
                        skillsLabel: content.certifications.modalSkillsLabel,
                      })
                    }
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-[#2563EB] dark:hover:text-[#60A5FA] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB]"
                  >
                    <span>{content.certifications.viewDetails}</span>
                    <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 03: EXPERIENCE, PROJECTS & EDUCATION */}
        <section
          id="experience"
          className="scroll-mt-24 border-t border-slate-200 dark:border-slate-800/90 py-16 sm:py-20"
        >
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-slate-950 dark:text-white [text-wrap:balance]">
              {content.experience.sectionTitle}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-400">
              {content.experience.sectionLead}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Professional Experience */}
            <div className="lg:col-span-7">
              <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {content.experience.workHeading}
              </h3>

              <div className="mt-4 space-y-6">
                {content.experience.work.map((job) => (
                  <article
                    key={job.id}
                    className="rounded-xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-[#10141B] p-6 sm:p-8"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className="font-display text-xl font-semibold text-slate-950 dark:text-slate-50">
                        {job.role}
                      </h4>
                      <span className="font-mono text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                        {job.period}
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      {job.organization} <span aria-hidden="true">·</span> {job.location}
                    </p>

                    <ul className="mt-6 space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                      {job.highlights.map((point) => (
                        <li key={point} className="flex items-baseline gap-3">
                          <span className="font-mono text-xs text-[#2563EB] dark:text-[#60A5FA]" aria-hidden="true">
                            —
                          </span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="mt-6 border-t border-slate-200/80 dark:border-slate-800/80 pt-4 font-mono text-xs text-slate-500 dark:text-slate-400">
                      {job.tools.join(' · ')}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            {/* Right Column: Featured Project & Education */}
            <div className="space-y-8 lg:col-span-5">
              {/* Academic Project */}
              <div id="projects" className="scroll-mt-24">
                <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {content.experience.projectsHeading}
                </h3>

                <div className="mt-4 space-y-4">
                  {content.experience.projects.map((project) => (
                    <article
                      key={project.id}
                      className="rounded-xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-[#10141B] p-6 sm:p-7"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <span>{project.role}</span>
                        <span className="font-mono tabular-nums">{project.period}</span>
                      </div>

                      <h4 className="mt-3 font-display text-xl font-semibold text-slate-950 dark:text-slate-50">
                        {project.title}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        {project.summary}
                      </p>

                      <div className="mt-5 flex items-center justify-between gap-4 border-t border-slate-200/80 dark:border-slate-800/80 pt-4">
                        <span className="font-mono text-xs text-slate-500 dark:text-slate-400 truncate">
                          {project.tools.slice(0, 2).join(' · ')}
                        </span>
                        <button
                          type="button"
                          onClick={() => setModalDetail({ kind: 'project', item: project })}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2563EB] dark:text-[#60A5FA] hover:underline underline-offset-4 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB]"
                        >
                          <span>{content.experience.inspectProject}</span>
                          <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {content.experience.educationHeading}
                </h3>

                <article className="mt-4 rounded-xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-[#10141B] p-6 sm:p-7">
                  <p className="font-mono text-xs text-[#2563EB] dark:text-[#60A5FA] tabular-nums">
                    {content.experience.education.graduation}
                  </p>
                  <h4 className="mt-2 font-display text-lg font-semibold text-slate-950 dark:text-slate-50">
                    {content.experience.education.degree}
                  </h4>
                  <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                    {content.experience.education.institution}
                  </p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {content.experience.education.location}
                  </p>
                  <p className="mt-4 border-t border-slate-200/80 dark:border-slate-800/80 pt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {content.experience.education.focusNote}
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 04: CONTACT & ENGAGEMENT */}
        <section
          id="contact"
          className="scroll-mt-24 border-t border-slate-200 dark:border-slate-800/90 py-16 sm:py-20"
        >
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Left: Direct Channels with Copy Actions */}
            <div className="lg:col-span-5">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-slate-950 dark:text-white [text-wrap:balance]">
                {content.contact.sectionTitle}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-400">
                {content.contact.sectionLead}
              </p>

              <div className="mt-8 border-t border-slate-200 dark:border-slate-800/90 pt-6">
                <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {content.contact.directChannelsLabel}
                </h3>

                <dl className="mt-5 divide-y divide-slate-200/80 dark:divide-slate-800/80">
                  {/* Email */}
                  <div className="flex items-center justify-between gap-4 py-4">
                    <div className="min-w-0">
                      <dt className="text-xs text-slate-500 dark:text-slate-400">
                        {content.contact.emailLabel}
                      </dt>
                      <dd className="mt-1 truncate font-mono text-sm text-slate-900 dark:text-slate-100">
                        <a
                          href={`mailto:${PROFILE_META.email}`}
                          className="hover:text-[#2563EB] dark:hover:text-[#60A5FA] transition-colors"
                        >
                          {PROFILE_META.email}
                        </a>
                      </dd>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('email', PROFILE_META.email)}
                      className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
                    >
                      {copiedField === 'email' ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-[#2563EB] dark:text-[#60A5FA]" aria-hidden="true" />
                          <span>{content.contact.copiedLabel}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>{content.contact.copyAction}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center justify-between gap-4 py-4">
                    <div className="min-w-0">
                      <dt className="text-xs text-slate-500 dark:text-slate-400">
                        {content.contact.phoneLabel}
                      </dt>
                      <dd className="mt-1 font-mono text-sm text-slate-900 dark:text-slate-100" dir="ltr">
                        <a
                          href={PROFILE_META.phoneHref}
                          className="hover:text-[#2563EB] dark:hover:text-[#60A5FA] transition-colors"
                        >
                          {PROFILE_META.phone}
                        </a>
                      </dd>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('phone', PROFILE_META.phone)}
                      className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
                    >
                      {copiedField === 'phone' ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-[#2563EB] dark:text-[#60A5FA]" aria-hidden="true" />
                          <span>{content.contact.copiedLabel}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>{content.contact.copyAction}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* LinkedIn */}
                  <div className="flex items-center justify-between gap-4 py-4">
                    <div className="min-w-0">
                      <dt className="text-xs text-slate-500 dark:text-slate-400">
                        {content.contact.linkedinLabel}
                      </dt>
                      <dd className="mt-1 truncate text-sm font-medium text-slate-900 dark:text-slate-100">
                        linkedin.com/in/ahmed-alkelany-5b6669244
                      </dd>
                    </div>
                    <a
                      href={PROFILE_META.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>{content.contact.openProfile}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>

                  {/* Location */}
                  <div className="flex items-center justify-between gap-4 py-4">
                    <div>
                      <dt className="text-xs text-slate-500 dark:text-slate-400">
                        {content.contact.locationLabel}
                      </dt>
                      <dd className="mt-1 text-sm text-slate-900 dark:text-slate-100">
                        {content.contact.locationValue}
                      </dd>
                    </div>
                  </div>
                </dl>
              </div>
            </div>

            {/* Right: Working Inquiry Composer */}
            <div className="lg:col-span-7">
              <div className="rounded-xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-[#10141B] p-6 sm:p-8">
                <h3 className="font-display text-xl font-semibold text-slate-950 dark:text-slate-50">
                  {content.contact.formTitle}
                </h3>

                {preparedInquiry ? (
                  <div className="mt-6 space-y-5">
                    <div>
                      <p className="text-sm font-semibold text-slate-950 dark:text-slate-50">
                        {content.contact.confirmationTitle}
                      </p>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                        {content.contact.confirmationBody}
                      </p>
                    </div>

                    <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B0E14] p-4 font-mono text-xs leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
                      {preparedInquiry.subject}
                      {'\n\n'}
                      {preparedInquiry.body}
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={preparedInquiry.mailtoHref}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#1D4ED8] transition-colors whitespace-nowrap shrink-0"
                      >
                        <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>{content.contact.openEmailClientLabel}</span>
                      </a>

                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(
                            'inquiry',
                            `${preparedInquiry.subject}\n\n${preparedInquiry.body}`
                          )
                        }
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
                      >
                        {copiedField === 'inquiry' ? (
                          <>
                            <Check className="h-4 w-4 text-[#2563EB] dark:text-[#60A5FA]" aria-hidden="true" />
                            <span>{content.contact.copiedLabel}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" aria-hidden="true" />
                            <span>{content.contact.copyMessageLabel}</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={resetInquiry}
                        className="px-2 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
                      >
                        {content.contact.resetFormLabel}
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} noValidate className="mt-6 space-y-5">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-xs font-medium text-slate-600 dark:text-slate-300"
                        >
                          {content.contact.nameLabel}
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          value={senderName}
                          onChange={(e) => setSenderName(e.target.value)}
                          placeholder={content.contact.namePlaceholder}
                          required
                          className="mt-2 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-[#F8F9FB] dark:bg-[#0B0E14] px-3.5 py-2.5 text-sm text-slate-950 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#2563EB] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-xs font-medium text-slate-600 dark:text-slate-300"
                        >
                          {content.contact.emailInputLabel}
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          value={senderEmail}
                          onChange={(e) => setSenderEmail(e.target.value)}
                          placeholder={content.contact.emailPlaceholder}
                          required
                          className="mt-2 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-[#F8F9FB] dark:bg-[#0B0E14] px-3.5 py-2.5 text-sm text-slate-950 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#2563EB] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-topic"
                        className="block text-xs font-medium text-slate-600 dark:text-slate-300"
                      >
                        {content.contact.topicLabel}
                      </label>
                      <select
                        id="contact-topic"
                        value={selectedTopicIndex}
                        onChange={(e) => setSelectedTopicIndex(Number(e.target.value))}
                        className="mt-2 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-[#F8F9FB] dark:bg-[#0B0E14] px-3.5 py-2.5 text-sm text-slate-950 dark:text-slate-100 focus:border-[#2563EB] focus:outline-none"
                      >
                        {content.contact.topics.map((topic, index) => (
                          <option key={topic} value={index}>
                            {topic}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-medium text-slate-600 dark:text-slate-300"
                      >
                        {content.contact.messageLabel}
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        value={messageBody}
                        onChange={(e) => setMessageBody(e.target.value)}
                        placeholder={content.contact.messagePlaceholder}
                        required
                        className="mt-2 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-[#F8F9FB] dark:bg-[#0B0E14] px-3.5 py-2.5 text-sm text-slate-950 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#2563EB] focus:outline-none"
                      />
                    </div>

                    {formError && (
                      <p role="alert" className="text-xs font-medium text-rose-600 dark:text-rose-400">
                        {formError}
                      </p>
                    )}

                    <div className="pt-1">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-lg bg-[#2563EB] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1D4ED8] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
                      >
                        {content.contact.submitLabel}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* QUIET EDITORIAL FOOTER */}
      <footer className="border-t border-slate-200 dark:border-slate-800/90">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-4 px-6 py-8 text-xs text-slate-500 dark:text-slate-400 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-3">
            <span>{content.footer.copyright}</span>
            <span aria-hidden="true">·</span>
            <span>{content.footer.location}</span>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <a
              href={PROFILE_META.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-950 dark:hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${PROFILE_META.email}`}
              className="hover:text-slate-950 dark:hover:text-white transition-colors"
            >
              Email
            </a>
            <a
              href={PROFILE_META.cvUrl}
              download={PROFILE_META.cvFileName}
              className="hover:text-slate-950 dark:hover:text-white transition-colors"
            >
              {content.nav.downloadCv}
            </a>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      <CvModal
        open={cvOpen}
        onClose={() => setCvOpen(false)}
        content={content.cvModal}
      />

      <DetailModal
        detail={modalDetail}
        onClose={() => setModalDetail(null)}
        closeLabel={isRtl ? 'إغلاق النافذة' : 'Close details'}
        deliverablesLabel={isRtl ? 'المخرجات الرئيسية' : 'Key Deliverables'}
        highlightsLabel={isRtl ? 'نطاق العمل والمسؤوليات' : 'Scope & Responsibilities'}
      />
    </div>
  );
}
