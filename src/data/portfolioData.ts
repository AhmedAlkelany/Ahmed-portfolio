export type Locale = 'en' | 'ar';

export interface DefenseStage {
  id: string;
  index: string;
  label: string;
  title: string;
  summary: string;
  tools: string[];
  credentialRef: string;
  deliverable: string;
}

export interface CapabilityItem {
  id: string;
  index: string;
  category: 'defensive' | 'offensive' | 'engineering';
  categoryLabel: string;
  title: string;
  description: string;
  stack: string[];
}

export interface CertificationItem {
  id: string;
  index: string;
  code: string;
  name: string;
  domain: 'soc' | 'forensics' | 'offensive' | 'ai';
  domainLabel: string;
  focus: string;
  overview: string;
  appliedSkills: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  role: string;
  period: string;
  type: string;
  summary: string;
  highlights: string[];
  deliverables: string[];
  tools: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  highlights: string[];
  tools: string[];
}

export interface PortfolioContent {
  nav: {
    brand: string;
    links: { id: string; label: string }[];
    downloadCv: string;
    menuLabel: string;
  };
  hero: {
    kicker: string;
    headline: string;
    summary: string;
    primaryCta: string;
    secondaryCta: string;
    linkedinCta: string;
    facts: { value: string; label: string; detail: string }[];
    lifecycleHeading: string;
    lifecycleSubheading: string;
    lifecycleToolsLabel: string;
    lifecycleCredentialLabel: string;
    lifecycleDeliverableLabel: string;
    stages: DefenseStage[];
  };
  expertise: {
    sectionTitle: string;
    sectionLead: string;
    filters: { id: 'all' | 'defensive' | 'offensive' | 'engineering'; label: string }[];
    capabilities: CapabilityItem[];
    skillsTitle: string;
    technicalGroups: { label: string; items: string[] }[];
    softSkillsLabel: string;
    softSkills: string[];
    languagesLabel: string;
    languages: { name: string; level: string }[];
  };
  certifications: {
    sectionTitle: string;
    sectionLead: string;
    filters: { id: 'all' | 'soc' | 'forensics' | 'offensive' | 'ai'; label: string }[];
    viewDetails: string;
    modalFocusLabel: string;
    modalSkillsLabel: string;
    items: CertificationItem[];
  };
  experience: {
    sectionTitle: string;
    sectionLead: string;
    workHeading: string;
    projectsHeading: string;
    educationHeading: string;
    inspectProject: string;
    work: ExperienceItem[];
    projects: ProjectItem[];
    education: {
      degree: string;
      institution: string;
      location: string;
      graduation: string;
      focusNote: string;
    };
  };
  contact: {
    sectionTitle: string;
    sectionLead: string;
    directChannelsLabel: string;
    emailLabel: string;
    phoneLabel: string;
    linkedinLabel: string;
    locationLabel: string;
    locationValue: string;
    copyAction: string;
    copiedLabel: string;
    openProfile: string;
    formTitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailInputLabel: string;
    emailPlaceholder: string;
    topicLabel: string;
    topics: string[];
    messageLabel: string;
    messagePlaceholder: string;
    submitLabel: string;
    copyMessageLabel: string;
    openEmailClientLabel: string;
    confirmationTitle: string;
    confirmationBody: string;
    resetFormLabel: string;
    validationError: string;
  };
  cvModal: {
    title: string;
    subtitle: string;
    downloadButton: string;
    openNewTab: string;
    closeLabel: string;
  };
  footer: {
    copyright: string;
    location: string;
  };
}

export const PROFILE_META = {
  fullName: 'Ahmed Khalfallah Hussein',
  alias: 'Ahmed Alkelany',
  email: 'ahmdalkylany669@gmail.com',
  phone: '+201092626499',
  phoneHref: 'tel:+201092626499',
  linkedinUrl: 'https://linkedin.com/in/ahmed-alkelany',
  cvUrl: '/assets/aistudio/Ahmed_Khalfallah_Hussein_CV_bd4b7bb6.pdf',
  cvFileName: 'Ahmed_Khalfallah_Hussein_CV.pdf',
};

export const PORTFOLIO_CONTENT: Record<Locale, PortfolioContent> = {
  en: {
    nav: {
      brand: 'Ahmed Khalfallah',
      links: [
        { id: 'expertise', label: 'Expertise' },
        { id: 'certifications', label: 'Certifications' },
        { id: 'experience', label: 'Experience' },
        { id: 'projects', label: 'Projects' },
        { id: 'contact', label: 'Contact' },
      ],
      downloadCv: 'Download CV',
      menuLabel: 'Toggle navigation menu',
    },
    hero: {
      kicker: 'Tier 1 SOC Analyst · Cybersecurity Specialist · Cairo, Egypt',
      headline: 'Defending networks through alert analysis, threat hunting, and digital forensics.',
      summary:
        'Tier 1 SOC Analyst and Cybersecurity Specialist with hands-on experience in threat detection, incident response, and digital forensics. Trained in CND, eJPTv2, and CHFI, with strong proficiency in Splunk SIEM, Security Onion, Kali Linux, and Python/C++ scripting to analyze security alerts and strengthen network defense postures.',
      primaryCta: 'Get in Touch',
      secondaryCta: 'Preview CV',
      linkedinCta: 'LinkedIn Profile',
      facts: [
        {
          value: '05',
          label: 'Certifications & Training',
          detail: 'eJPTv2 · CHFI · CND · Splunk · ML & AI',
        },
        {
          value: 'B.Sc. 2026',
          label: 'Computer Science',
          detail: 'New Cairo Academy · Cairo, Egypt',
        },
        {
          value: 'Tier 1 SOC',
          label: 'Operational Stack',
          detail: 'Splunk · Security Onion · Kali Linux',
        },
        {
          value: 'EN / AR',
          label: 'Bilingual Operations',
          detail: 'Native Arabic · Fluent English',
        },
      ],
      lifecycleHeading: 'Security Operations Workflow',
      lifecycleSubheading: 'Select a phase to inspect tools, methodology, and training.',
      lifecycleToolsLabel: 'Primary Tooling',
      lifecycleCredentialLabel: 'Aligned Training',
      lifecycleDeliverableLabel: 'Operational Output',
      stages: [
        {
          id: 'detect',
          index: '01',
          label: 'Detect',
          title: 'Tier 1 Alert Triage, SIEM Monitoring & Threat Hunting',
          summary:
            'Correlate endpoint, authentication, and network telemetry to analyze security alerts and surface anomalous behavior early before lateral movement escalates.',
          tools: ['Splunk (SIEM)', 'Security Onion', 'Python'],
          credentialRef: 'Splunk Training / Certification',
          deliverable: 'Triaged alerts & correlation queries',
        },
        {
          id: 'investigate',
          index: '02',
          label: 'Investigate',
          title: 'Digital Forensics & Root-Cause Analysis',
          summary:
            'Apply structured forensic acquisition and artifact examination to reconstruct incident timelines, trace attack vectors, and preserve evidence integrity.',
          tools: ['Security Onion', 'Digital Forensics Toolkits', 'C++ / Python'],
          credentialRef: 'CHFI — Computer Hacking Forensic Investigator',
          deliverable: 'Forensic incident timeline & artifact report',
        },
        {
          id: 'assess',
          index: '03',
          label: 'Assess',
          title: 'Vulnerability Assessment & Penetration Testing',
          summary:
            'Evaluate network surfaces and host configurations from an adversarial perspective to identify exploitable weaknesses prior to production exposure.',
          tools: ['Kali Linux', 'Network Scanners', 'Python'],
          credentialRef: 'eJPTv2 — Junior Penetration Tester v2',
          deliverable: 'Prioritized vulnerability findings & PoCs',
        },
        {
          id: 'harden',
          index: '04',
          label: 'Harden',
          title: 'Defensive Posture Strengthening & Containment',
          summary:
            'Translate incident findings into actionable mitigation protocols, network segmentation controls, and documented security workflows.',
          tools: ['Network Defense Controls', 'Splunk Dashboards', 'Security Onion'],
          credentialRef: 'CND — Certified Network Defender',
          deliverable: 'Actionable mitigation roadmap & hardening baseline',
        },
      ],
    },
    expertise: {
      sectionTitle: '01. Core Capabilities & Technical Stack',
      sectionLead:
        'Combining Blue Team operational discipline with offensive testing awareness to detect, investigate, and remediate security threats.',
      filters: [
        { id: 'all', label: 'All Domains' },
        { id: 'defensive', label: 'SOC & Defense' },
        { id: 'offensive', label: 'Testing & Forensics' },
        { id: 'engineering', label: 'Code & Systems' },
      ],
      capabilities: [
        {
          id: 'soc-siem',
          index: '01',
          category: 'defensive',
          categoryLabel: 'SOC & Defense',
          title: 'Threat Detection & SIEM Monitoring',
          description:
            'Continuous log monitoring, threat hunting, and alert triage using Splunk and Security Onion to maintain clear visibility across network infrastructures.',
          stack: ['Splunk (SIEM)', 'Security Onion', 'Threat Hunting', 'Continuous Monitoring'],
        },
        {
          id: 'ir-forensics',
          index: '02',
          category: 'offensive',
          categoryLabel: 'Testing & Forensics',
          title: 'Incident Response & Digital Forensics',
          description:
            'Structured incident containment and forensic analysis to uncover root causes, document attacker activity, and deliver clear mitigation strategies.',
          stack: ['Incident Response', 'Digital Forensics', 'Evidence Analysis', 'Mitigation Planning'],
        },
        {
          id: 'network-vuln',
          index: '03',
          category: 'offensive',
          categoryLabel: 'Testing & Forensics',
          title: 'Network Defense & Vulnerability Assessment',
          description:
            'Proactive vulnerability identification and defensive posture hardening informed by both Certified Network Defender and eJPTv2 methodologies.',
          stack: ['Kali Linux', 'Vulnerability Assessment', 'Network Security', 'Posture Hardening'],
        },
        {
          id: 'scripting-systems',
          index: '04',
          category: 'engineering',
          categoryLabel: 'Code & Systems',
          title: 'Security Scripting & System Analysis',
          description:
            'Writing analytical scripts in Python and C++, authoring architectural specifications, and bridging business requirements with resilient technical design.',
          stack: ['Python', 'C++', 'System Analysis', 'Machine Learning & AI Foundations'],
        },
      ],
      skillsTitle: 'Verified Technical & Professional Skills',
      technicalGroups: [
        {
          label: 'Security & Forensics',
          items: [
            'Incident Response',
            'Threat Detection & Hunting',
            'Digital Forensics',
            'Network Security',
            'Vulnerability Assessment',
            'Defensive Posture Strengthening',
          ],
        },
        {
          label: 'Tools & Operating Systems',
          items: ['Splunk (SIEM)', 'Security Onion', 'Kali Linux', 'Microsoft Office Suite (Excel, Word, PowerPoint)'],
        },
        {
          label: 'Programming Languages',
          items: ['Python', 'C++'],
        },
      ],
      softSkillsLabel: 'Core Competencies',
      softSkills: [
        'Analytical Thinking & Problem Solving',
        'Strategic Decision Making',
        'Self-Learning & Continuous Research',
        'Time Management & Team Collaboration',
        'Effective Communication & Presentation',
      ],
      languagesLabel: 'Languages',
      languages: [
        { name: 'Arabic', level: 'Native' },
        { name: 'English', level: 'Fluent' },
      ],
    },
    certifications: {
      sectionTitle: '02. Certifications & Training',
      sectionLead:
        'Five specialized certifications and training tracks spanning penetration testing, forensic investigation, network defense, SIEM tooling, and applied AI.',
      filters: [
        { id: 'all', label: 'All (5)' },
        { id: 'soc', label: 'SIEM & Network' },
        { id: 'forensics', label: 'Forensics' },
        { id: 'offensive', label: 'Penetration Testing' },
        { id: 'ai', label: 'AI & Data' },
      ],
      viewDetails: 'Inspect scope',
      modalFocusLabel: 'Operational Focus',
      modalSkillsLabel: 'Applied Capabilities',
      items: [
        {
          id: 'ejptv2',
          index: '01',
          code: 'eJPTv2',
          name: 'eLearnSecurity Junior Penetration Tester v2',
          domain: 'offensive',
          domainLabel: 'Penetration Testing',
          focus: 'Hands-on network and host penetration testing, enumeration, and exploitation fundamentals.',
          overview:
            'Validates practical red-team and assessment readiness across reconnaissance, host and network auditing, exploitation workflows, and reporting—strengthening defensive intuition by understanding real attacker tradecraft.',
          appliedSkills: ['Host & Network Auditing', 'Vulnerability Identification', 'Kali Linux Workflows', 'Assessment Reporting'],
        },
        {
          id: 'chfi',
          index: '02',
          code: 'CHFI',
          name: 'Computer Hacking Forensic Investigator',
          domain: 'forensics',
          domainLabel: 'Digital Forensics',
          focus: 'Methodical digital evidence acquisition, forensic investigation, and incident reconstruction.',
          overview:
            'Covers end-to-end digital forensics methodology including evidence preservation, host and network artifact analysis, intrusion tracing, and producing defensible forensic findings for incident mitigation.',
          appliedSkills: ['Forensic Investigation', 'Artifact & Log Analysis', 'Timeline Reconstruction', 'Mitigation Reporting'],
        },
        {
          id: 'cnd',
          index: '03',
          code: 'CND',
          name: 'Certified Network Defender',
          domain: 'soc',
          domainLabel: 'SIEM & Network',
          focus: 'Network perimeter protection, traffic monitoring, hardening, and defensive architecture.',
          overview:
            'Focuses on protecting, detecting, and responding to threats on modern network infrastructures—establishing strong baseline controls, traffic visibility, and resilient defensive postures.',
          appliedSkills: ['Network Security Controls', 'Traffic Analysis', 'Defensive Hardening', 'Threat Mitigation'],
        },
        {
          id: 'splunk',
          index: '04',
          code: 'SPLUNK',
          name: 'Splunk Training / Certification',
          domain: 'soc',
          domainLabel: 'SIEM & Network',
          focus: 'SIEM search processing, alert analysis, log correlation, and operational visibility.',
          overview:
            'Demonstrates hands-on proficiency in querying machine data, building focused detection searches, investigating security alerts, and supporting continuous monitoring inside Splunk SIEM environments.',
          appliedSkills: ['SIEM Querying', 'Log Correlation', 'Security Dashboards', 'Alert Triage & Detection'],
        },
        {
          id: 'ml-ai',
          index: '05',
          code: 'ML & AI',
          name: 'Certified Machine Learning & AI',
          domain: 'ai',
          domainLabel: 'AI & Data',
          focus: 'Applied machine learning concepts, analytical modeling, and data-driven pattern recognition.',
          overview:
            'Provides foundational grounding in machine learning and artificial intelligence workflows, complementing analytical security engineering and automated pattern recognition.',
          appliedSkills: ['Analytical Modeling', 'Python Data Workflows', 'Pattern Recognition', 'Problem Solving'],
        },
      ],
    },
    experience: {
      sectionTitle: '03. Experience, Academic Work & Education',
      sectionLead:
        'Hands-on freelance cybersecurity engagements paired with structured systems analysis and formal Computer Science training.',
      workHeading: 'Professional Experience',
      projectsHeading: 'Featured Academic Project',
      educationHeading: 'Education',
      inspectProject: 'View architecture brief',
      work: [
        {
          id: 'freelance-sec',
          role: 'Freelance Cyber Security Specialist',
          organization: 'Self-Employed',
          period: 'October 2025 – Present',
          location: 'Cairo, Egypt · Remote & On-Site',
          highlights: [
            'Execute threat detection and incident response protocols to secure network infrastructures and identify potential vulnerabilities.',
            'Utilize digital forensic techniques to analyze security incidents and provide actionable mitigation strategies.',
            'Strengthen clients’ defensive postures through comprehensive security assessments and continuous monitoring.',
            'Manage full-cycle security projects with meticulous attention to detail and precise execution using Splunk and Security Onion.',
          ],
          tools: ['Splunk', 'Security Onion', 'Kali Linux', 'Digital Forensics', 'Incident Response'],
        },
      ],
      projects: [
        {
          id: 'auto-go',
          title: '"Auto Go" Platform',
          role: 'System Analyst · Graduation Project',
          period: 'September 2025 – June 2026',
          type: 'Mobile Application Architecture & System Analysis',
          summary:
            'Comprehensive system analysis and architectural specification for an automotive maintenance and roadside emergency assistance mobile platform.',
          highlights: [
            'Authored complete system analysis documentation and architectural descriptions covering end-to-end automotive maintenance and emergency assistance workflows.',
            'Mapped real-world user and service-provider requirements directly into unambiguous technical specifications to ensure reliable application performance.',
          ],
          deliverables: [
            'Software Requirements & Functional Specification',
            'End-to-End System Architecture Description',
            'User-to-Technical Requirement Traceability Mapping',
            'Emergency Assistance & Maintenance Workflow Models',
          ],
          tools: ['System Analysis', 'Requirements Mapping', 'Technical Architecture', 'Documentation'],
        },
      ],
      education: {
        degree: 'Bachelor of Computer Science',
        institution: 'Higher Institute for Computer Science and Information Systems (New Cairo Academy)',
        location: 'New Cairo, Egypt',
        graduation: 'Graduated: July 2026',
        focusNote:
          'Foundations in computer science, systems analysis, programming in C++ and Python, networking, and applied machine learning.',
      },
    },
    contact: {
      sectionTitle: '04. Contact & Engagement',
      sectionLead:
        'Available for Tier 1 SOC Analyst roles, freelance security assessments, digital forensics investigations, and collaborative cybersecurity projects.',
      directChannelsLabel: 'Direct Channels',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      linkedinLabel: 'LinkedIn',
      locationLabel: 'Location',
      locationValue: 'Cairo, Egypt',
      copyAction: 'Copy',
      copiedLabel: 'Copied',
      openProfile: 'Open profile',
      formTitle: 'Send a Direct Inquiry',
      nameLabel: 'Your Name',
      namePlaceholder: 'Full name or hiring manager',
      emailInputLabel: 'Your Email',
      emailPlaceholder: 'name@company.com',
      topicLabel: 'Engagement Type',
      topics: [
        'Tier 1 SOC Analyst / Full-Time Role',
        'Freelance Security Assessment',
        'Incident Response & Forensics',
        'General Collaboration',
      ],
      messageLabel: 'Project or Role Details',
      messagePlaceholder: 'Share scope, timeline, or role requirements...',
      submitLabel: 'Prepare Inquiry',
      copyMessageLabel: 'Copy Formatted Message',
      openEmailClientLabel: 'Open in Email Client',
      confirmationTitle: 'Inquiry ready to send',
      confirmationBody:
        'Your formatted message is prepared below. Launch your email client directly or copy the text to send via LinkedIn or email.',
      resetFormLabel: 'Write another message',
      validationError: 'Please enter your name, a valid email address, and a brief message.',
    },
    cvModal: {
      title: 'Curriculum Vitae',
      subtitle: 'Ahmed Khalfallah Hussein · PDF Document',
      downloadButton: 'Download PDF',
      openNewTab: 'Open File',
      closeLabel: 'Close CV preview',
    },
    footer: {
      copyright: '© 2026 Ahmed Khalfallah Hussein. All rights reserved.',
      location: 'Cairo, Egypt',
    },
  },
  ar: {
    nav: {
      brand: 'أحمد خلف الله',
      links: [
        { id: 'expertise', label: 'الخبرات' },
        { id: 'certifications', label: 'الشهادات' },
        { id: 'experience', label: 'التجربة العملية' },
        { id: 'projects', label: 'المشاريع' },
        { id: 'contact', label: 'تواصل معي' },
      ],
      downloadCv: 'تحميل السيرة الذاتية',
      menuLabel: 'فتح قائمة التنقل',
    },
    hero: {
      kicker: 'محلل SOC مستوى أول (Tier 1) · أخصائي أمن سيبراني · القاهرة، مصر',
      headline: 'حماية الشبكات عبر تحليل التنبيهات ورصد التهديدات والتحقيق الجنائي الرقمي.',
      summary:
        'محلل عمليات أمنية مستوى أول (Tier 1 SOC Analyst) وأخصائي أمن سيبراني بخبرة عملية في اكتشاف التهديدات، الاستجابة للحوادث، والتحقيق الجنائي الرقمي. متدرب في CND و eJPTv2 و CHFI، وبإجادة قوية لأدوات SIEM مثل Splunk وتوزيعات Security Onion و Kali Linux والبرمجة بـ Python و C++.',
      primaryCta: 'تواصل معي',
      secondaryCta: 'معاينة السيرة الذاتية',
      linkedinCta: 'حساب لينكدإن',
      facts: [
        {
          value: '05',
          label: 'شهادات وبرامج تدريبية',
          detail: 'eJPTv2 · CHFI · CND · Splunk · ML & AI',
        },
        {
          value: '2026',
          label: 'بكالوريوس علوم الحاسب',
          detail: 'أكاديمية القاهرة الجديدة · مصر',
        },
        {
          value: 'Tier 1 SOC',
          label: 'أدوات التشغيل الأمني',
          detail: 'Splunk · Security Onion · Kali Linux',
        },
        {
          value: 'AR / EN',
          label: 'اللغات',
          detail: 'العربية (لغة أم) · الإنجليزية (بطلاقة)',
        },
      ],
      lifecycleHeading: 'منهجية العمل في العمليات الأمنية',
      lifecycleSubheading: 'اختر مرحلة لاستعراض الأدوات والمنهجية والتدريب المرتبط بها.',
      lifecycleToolsLabel: 'الأدوات الأساسية',
      lifecycleCredentialLabel: 'التدريب / الشهادة المرتبطة',
      lifecycleDeliverableLabel: 'المخرج العملي',
      stages: [
        {
          id: 'detect',
          index: '01',
          label: 'الرصد',
          title: 'فرز تنبيهات Tier 1 والمراقبة عبر SIEM وصيد التهديدات',
          summary:
            'تحليل التنبيهات الأمنية وربط سجلات الشبكة والأجهزة لاكتشاف السلوكيات المشبوهة مبكراً قبل تصاعد الحادث الأمني.',
          tools: ['Splunk (SIEM)', 'Security Onion', 'Python'],
          credentialRef: 'تدريب / شهادة Splunk',
          deliverable: 'فرز التنبيهات واستعلامات الكشف',
        },
        {
          id: 'investigate',
          index: '02',
          label: 'التحقيق',
          title: 'التحقيق الجنائي الرقمي وتحليل الأسباب الجذرية',
          summary:
            'تطبيق منهجيات التحقيق الجنائي الرقمي لتحليل الأدلة وإعادة بناء الخط الزمني للهجوم وتقديم خطط احتواء دقيقة.',
          tools: ['Security Onion', 'أدوات التحقيق الجنائي', 'C++ / Python'],
          credentialRef: 'CHFI — محقق جنائي في الاختراقات',
          deliverable: 'تقرير التحقيق والخط الزمني للحادث',
        },
        {
          id: 'assess',
          index: '03',
          label: 'التقييم',
          title: 'تقييم الثغرات واختبار الاختراق',
          summary:
            'فحص الشبكات والأنظمة بعقلية المهاجم لاكتشاف نقاط الضعف القابلة للاستغلال ومعالجتها استباقياً.',
          tools: ['Kali Linux', 'أدوات الفحص الشبكي', 'Python'],
          credentialRef: 'eJPTv2 — مختبر اختراق معتمد',
          deliverable: 'تقرير الثغرات حسب الأولوية وخطوات المعالجة',
        },
        {
          id: 'harden',
          index: '04',
          label: 'التحصين',
          title: 'تعزيز البنية الدفاعية وتقليل المخاطر',
          summary:
            'تحويل نتائج الحوادث والتقييمات إلى إجراءات حماية عملية وتقوية إعدادات الشبكة والمراقبة المستمرة.',
          tools: ['ضوابط أمن الشبكات', 'لوحات Splunk', 'Security Onion'],
          credentialRef: 'CND — مدافع شبكات معتمد',
          deliverable: 'خطة المعالجة وتحصين البنية التحتية',
        },
      ],
    },
    expertise: {
      sectionTitle: '01. القدرات الأساسية والمهارات التقنية',
      sectionLead:
        'الجمع بين انضباط الفرق الدفاعية (Blue Team) والوعي بأساليب اختبار الاختراق لرصد التهديدات والتحقيق فيها ومعالجتها.',
      filters: [
        { id: 'all', label: 'كل المجالات' },
        { id: 'defensive', label: 'العمليات والدفاع' },
        { id: 'offensive', label: 'التقييم والتحقيق' },
        { id: 'engineering', label: 'البرمجة والأنظمة' },
      ],
      capabilities: [
        {
          id: 'soc-siem',
          index: '01',
          category: 'defensive',
          categoryLabel: 'العمليات والدفاع',
          title: 'رصد التهديدات وإدارة SIEM',
          description:
            'مراقبة مستمرة للسجلات وصيد التهديدات وفرز التنبيهات باستخدام Splunk و Security Onion لتأمين البنية التحتية للشبكات.',
          stack: ['Splunk (SIEM)', 'Security Onion', 'صيد التهديدات', 'المراقبة المستمرة'],
        },
        {
          id: 'ir-forensics',
          index: '02',
          category: 'offensive',
          categoryLabel: 'التقييم والتحقيق',
          title: 'الاستجابة للحوادث والتحقيق الجنائي الرقمي',
          description:
            'تطبيق بروتوكولات الاستجابة للحوادث وتقنيات التحقيق الجنائي لتحليل الاختراقات وتقديم استراتيجيات معالجة عملية.',
          stack: ['الاستجابة للحوادث', 'التحقيق الجنائي الرقمي', 'تحليل الأدلة', 'خطط المعالجة'],
        },
        {
          id: 'network-vuln',
          index: '03',
          category: 'offensive',
          categoryLabel: 'التقييم والتحقيق',
          title: 'أمن الشبكات وتقييم الثغرات',
          description:
            'تحديد نقاط الضعف وتعزيز الوضع الدفاعي للعملاء استناداً إلى منهجيات CND و eJPTv2 وأدوات Kali Linux.',
          stack: ['Kali Linux', 'تقييم الثغرات', 'أمن الشبكات', 'تعزيز الدفاعات'],
        },
        {
          id: 'scripting-systems',
          index: '04',
          category: 'engineering',
          categoryLabel: 'البرمجة والأنظمة',
          title: 'البرمجة الأمنية وتحليل الأنظمة',
          description:
            'تطوير سكربتات التحليل باستخدام Python و C++، وإعداد وثائق تحليل الأنظمة والمواصفات المعمارية بدقة عالية.',
          stack: ['Python', 'C++', 'تحليل الأنظمة', 'أساسيات الذكاء الاصطناعي'],
        },
      ],
      skillsTitle: 'المهارات التقنية والشخصية الموثقة',
      technicalGroups: [
        {
          label: 'الأمن السيبراني والتحقيق الجنائي',
          items: [
            'الاستجابة للحوادث (Incident Response)',
            'رصد وصيد التهديدات (Threat Detection & Hunting)',
            'التحقيق الجنائي الرقمي (Digital Forensics)',
            'أمن الشبكات (Network Security)',
            'تقييم الثغرات (Vulnerability Assessment)',
            'تعزيز البنية الدفاعية',
          ],
        },
        {
          label: 'الأدوات وأنظمة التشغيل',
          items: ['Splunk (SIEM)', 'Security Onion', 'Kali Linux', 'Microsoft Office (Excel, Word, PowerPoint)'],
        },
        {
          label: 'لغات البرمجة',
          items: ['Python', 'C++'],
        },
      ],
      softSkillsLabel: 'المهارات المهنية',
      softSkills: [
        'التفكير التحليلي وحل المشكلات',
        'اتخاذ القرار الاستراتيجي',
        'التعلم الذاتي المستمر',
        'إدارة الوقت والعمل الجماعي',
        'التواصل الفعّال ومهارات العرض',
      ],
      languagesLabel: 'اللغات',
      languages: [
        { name: 'العربية', level: 'اللغة الأم' },
        { name: 'الإنجليزية', level: 'إجادة بطلاقة (Fluent)' },
      ],
    },
    certifications: {
      sectionTitle: '02. الشهادات والتدريب المهني',
      sectionLead:
        'خمسة مسارات وشهادات متخصصة تغطي اختبار الاختراق، التحقيق الجنائي الرقمي، الدفاع الشبكي، أداة Splunk، وتعلم الآلة والذكاء الاصطناعي.',
      filters: [
        { id: 'all', label: 'الكل (5)' },
        { id: 'soc', label: 'SIEM والشبكات' },
        { id: 'forensics', label: 'التحقيق الجنائي' },
        { id: 'offensive', label: 'اختبار الاختراق' },
        { id: 'ai', label: 'الذكاء الاصطناعي' },
      ],
      viewDetails: 'عرض التفاصيل',
      modalFocusLabel: 'نطاق التخصص',
      modalSkillsLabel: 'المهارات التطبيقية',
      items: [
        {
          id: 'ejptv2',
          index: '01',
          code: 'eJPTv2',
          name: 'eLearnSecurity Junior Penetration Tester v2',
          domain: 'offensive',
          domainLabel: 'اختبار الاختراق',
          focus: 'اختبار اختراق الشبكات والأنظمة عملياً، جمع المعلومات، وتقييم الثغرات.',
          overview:
            'تُثبت الجاهزية العملية لتنفيذ اختبارات الاختراق وتدقيق الشبكات والأجهزة، مما يعزز القدرة الدفاعية عبر فهم أساليب المهاجمين الواقعية.',
          appliedSkills: ['تدقيق الشبكات والأنظمة', 'تحديد الثغرات', 'أدوات Kali Linux', 'إعداد تقارير الفحص'],
        },
        {
          id: 'chfi',
          index: '02',
          code: 'CHFI',
          name: 'Computer Hacking Forensic Investigator',
          domain: 'forensics',
          domainLabel: 'التحقيق الجنائي الرقمي',
          focus: 'جمع الأدلة الرقمية والتحقيق الجنائي وإعادة بناء تسلسل الحوادث الأمنية.',
          overview:
            'تغطي المنهجية الكاملة للتحقيق الجنائي الرقمي بدءاً من الحفاظ على الأدلة وتحليل السجلات وتتبع الاختراقات حتى صياغة توصيات المعالجة.',
          appliedSkills: ['التحقيق الجنائي الرقمي', 'تحليل السجلات والأدلة', 'إعادة بناء الخط الزمني', 'تقارير المعالجة'],
        },
        {
          id: 'cnd',
          index: '03',
          code: 'CND',
          name: 'Certified Network Defender',
          domain: 'soc',
          domainLabel: 'SIEM والشبكات',
          focus: 'حماية الشبكات، مراقبة حركة البيانات، وتحصين البنية التحتية الدفاعية.',
          overview:
            'تركز على حماية الشبكات واكتشاف الهجمات والاستجابة لها عبر تطبيق ضوابط أمنية محكمة ورؤية واضحة لحركة البيانات.',
          appliedSkills: ['ضوابط أمن الشبكات', 'تحليل حركة البيانات', 'التحصين الدفاعي', 'تخفيف المخاطر'],
        },
        {
          id: 'splunk',
          index: '04',
          code: 'SPLUNK',
          name: 'Splunk Training / Certification',
          domain: 'soc',
          domainLabel: 'SIEM والشبكات',
          focus: 'إدارة SIEM وتحليل التنبيهات والبحث في السجلات وربط الأحداث الأمنية.',
          overview:
            'تُبرز الكفاءة العملية في استعلام وتحليل السجلات الضخمة، وفحص التنبيهات وبناء قواعد الكشف ولوحات المراقبة داخل بيئات Splunk SIEM.',
          appliedSkills: ['استعلامات SIEM', 'ربط السجلات', 'لوحات المتابعة الأمنية', 'فرز التنبيهات ورصد التهديدات'],
        },
        {
          id: 'ml-ai',
          index: '05',
          code: 'ML & AI',
          name: 'Certified Machine Learning & AI',
          domain: 'ai',
          domainLabel: 'الذكاء الاصطناعي',
          focus: 'تطبيقات تعلم الآلة، التحليل البياني، والتعرف على الأنماط.',
          overview:
            'توفر أساساً متيناً في مفاهيم الذكاء الاصطناعي وتعلم الآلة لدعم التحليل المتقدم للبيانات واكتشاف الأنماط غير المعتادة.',
          appliedSkills: ['النمذجة التحليلية', 'تطبيقات Python', 'تحليل الأنماط', 'حل المشكلات'],
        },
      ],
    },
    experience: {
      sectionTitle: '03. الخبرة العملية، المشاريع والتعليم',
      sectionLead:
        'مشاريع حرة في الأمن السيبراني إلى جانب خبرة أكاديمية منظمة في تحليل الأنظمة وعلوم الحاسب.',
      workHeading: 'الخبرة العملية',
      projectsHeading: 'مشروع التخرج',
      educationHeading: 'التعليم الأكاديمي',
      inspectProject: 'عرض تفاصيل المشروع',
      work: [
        {
          id: 'freelance-sec',
          role: 'أخصائي أمن سيبراني مستقل (Freelance)',
          organization: 'عمل حر',
          period: 'أكتوبر 2025 – حتى الآن',
          location: 'القاهرة، مصر · عن بُعد وميداني',
          highlights: [
            'تنفيذ بروتوكولات رصد التهديدات والاستجابة للحوادث لتأمين البنى التحتية للشبكات وتحديد الثغرات المحتملة.',
            'استخدام تقنيات التحقيق الجنائي الرقمي لتحليل الحوادث الأمنية وتقديم استراتيجيات معالجة عملية.',
            'تعزيز الوضع الدفاعي للعملاء من خلال تقييمات أمنية شاملة ومراقبة مستمرة.',
            'إدارة مشاريع الأمن السيبراني بدورتها الكاملة بدقة عالية باستخدام أدوات Splunk و Security Onion.',
          ],
          tools: ['Splunk', 'Security Onion', 'Kali Linux', 'التحقيق الجنائي الرقمي', 'الاستجابة للحوادث'],
        },
      ],
      projects: [
        {
          id: 'auto-go',
          title: 'منصة "Auto Go"',
          role: 'محلل أنظمة · مشروع التخرج',
          period: 'سبتمبر 2025 – يونيو 2026',
          type: 'تحليل الأنظمة والهندسة المعمارية لتطبيق هاتف',
          summary:
            'إعداد تحليل نظام شامل ووصف معماري كامل لتطبيق هاتف ذكي مخصص لصيانة السيارات وخدمات الطوارئ على الطرق.',
          highlights: [
            'تأليف وثائق تحليل الأنظمة والوصف المعماري الشامل لتطبيق صيانة السيارات والمساعدة الطارئة.',
            'تحويل متطلبات المستخدمين إلى مواصفات تقنية دقيقة لضمان أداء قوي ومستقر للتطبيق.',
          ],
          deliverables: [
            'وثيقة تحليل المتطلبات الوظيفية وغير الوظيفية',
            'الوصف المعماري الشامل للنظام',
            'ربط متطلبات المستخدم بالمواصفات التقنية',
            'نماذج تدفق خدمات الصيانة والطوارئ',
          ],
          tools: ['تحليل الأنظمة', 'توثيق المتطلبات', 'التصميم المعماري', 'هندسة البرمجيات'],
        },
      ],
      education: {
        degree: 'بكالوريوس علوم الحاسب',
        institution: 'المعهد العالي لعلوم الحاسب ونظم المعلومات (أكاديمية القاهرة الجديدة)',
        location: 'القاهرة الجديدة، مصر',
        graduation: 'التخرج: يوليو 2026',
        focusNote:
          'أساس أكاديمي في علوم الحاسب، تحليل الأنظمة، البرمجة بلغتي C++ و Python، الشبكات، وتعلم الآلة.',
      },
    },
    contact: {
      sectionTitle: '04. التواصل وفرص العمل',
      sectionLead:
        'متاح لفرص العمل كمحلل عمليات أمنية مستوى أول (Tier 1 SOC Analyst)، وتقييمات الأمن السيبراني المستقلة، ومشاريع الاستجابة للحوادث.',
      directChannelsLabel: 'قنوات التواصل المباشر',
      emailLabel: 'البريد الإلكتروني',
      phoneLabel: 'الهاتف',
      linkedinLabel: 'لينكدإن',
      locationLabel: 'الموقع',
      locationValue: 'القاهرة، مصر',
      copyAction: 'نسخ',
      copiedLabel: 'تم النسخ',
      openProfile: 'زيارة الحساب',
      formTitle: 'إرسال رسالة مباشرة',
      nameLabel: 'الاسم',
      namePlaceholder: 'الاسم الكامل أو مسؤول التوظيف',
      emailInputLabel: 'البريد الإلكتروني',
      emailPlaceholder: 'name@company.com',
      topicLabel: 'نوع الطلب',
      topics: [
        'فرصة عمل Tier 1 SOC Analyst / دوام كامل',
        'تقييم أمني مستقل (Freelance)',
        'الاستجابة للحوادث والتحقيق الجنائي',
        'تعاون أو استفسار عام',
      ],
      messageLabel: 'تفاصيل المشروع أو الوظيفة',
      messagePlaceholder: 'اكتب نبذة عن المتطلبات أو النطاق المقترح...',
      submitLabel: 'تجهيز الرسالة',
      copyMessageLabel: 'نسخ نص الرسالة',
      openEmailClientLabel: 'فتح تطبيق البريد',
      confirmationTitle: 'الرسالة جاهزة للإرسال',
      confirmationBody:
        'تم تجهيز رسالتك أدناه. يمكنك فتح تطبيق البريد الإلكتروني مباشرة أو نسخ النص لإرساله عبر لينكدإن.',
      resetFormLabel: 'كتابة رسالة جديدة',
      validationError: 'يرجى إدخال الاسم وبريد إلكتروني صحيح ورسالة مختصرة.',
    },
    cvModal: {
      title: 'السيرة الذاتية',
      subtitle: 'أحمد خلف الله حسين · ملف PDF',
      downloadButton: 'تحميل PDF',
      openNewTab: 'فتح الملف',
      closeLabel: 'إغلاق معاينة السيرة الذاتية',
    },
    footer: {
      copyright: '© 2026 أحمد خلف الله حسين. جميع الحقوق محفوظة.',
      location: 'القاهرة، مصر',
    },
  },
};
