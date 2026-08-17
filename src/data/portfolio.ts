export const PROFILE = {
  name: "Parvez Sharief",
  role: "AI & Software Engineer",
  email: "parvezsharief95@gmail.com",
  github: "https://github.com/Parvez-Sharief95",
  linkedin: "https://www.linkedin.com/in/parvez-sharief-055912260/",
  specializations: [
    "AI & Machine Learning Engineer",
    "Multi-Agent Systems Architect",
    "Full Stack Software Engineer",
    "Business & Data Analyst",
    "Salesforce Developer",
  ],
  metrics: [
    { label: "Projects Shipped", value: 7, suffix: "+" },
    { label: "Core AI Domains", value: 6, suffix: "" },
    { label: "Certifications", value: 4, suffix: "" },
    { label: "Retrieval Speed Gain", value: 98, suffix: "%" },
  ],
};

export type Project = {
  title: string;
  tagline: string;
  stack: string[];
  summary: string;
  architecture: string[];
  highlights: string[];
  repo?: string;
  demo?: string;
};

export const PROJECTS: Project[] = [
  {
    title: "RepoSense",
    tagline: "Autonomous GitHub Intelligence Bureau",
    stack: ["Google ADK", "Multi-Agent AI", "Python", "GitHub API", "LLMs"],
    summary:
      "Five specialized AI agents analyze every pull request in parallel across code quality, architecture, security, documentation and maintainability.",
    architecture: [
      "Orchestrator agent fans out PR diffs to five domain agents built on Google ADK.",
      "Each agent runs an isolated reasoning loop with tool access to GitHub APIs.",
      "Findings are merged, deduplicated and ranked before being posted as a single review.",
      "Event-driven ingestion via GitHub webhooks with idempotent job handling.",
    ],
    highlights: ["Multi-agent orchestration", "Autonomous PR analysis", "GitHub automation"],
    repo: "https://github.com/Parvez-Sharief95",
  },
  {
    title: "GitNexus",
    tagline: "Enterprise Knowledge Platform",
    stack: ["React", "Express.js", "LangChain", "Docker", "RAG", "Microservices"],
    summary:
      "Self-hosted knowledge platform supporting 30+ LLM providers — cut retrieval from ~50 minutes to 30 seconds while reducing API costs by 98%.",
    architecture: [
      "Microservice split: ingestion, embedding, retrieval and gateway services in Docker.",
      "Provider-agnostic LLM gateway abstracting 30+ providers behind one contract.",
      "Hybrid RAG pipeline with chunk re-ranking and citation-grounded answers.",
      "HIPAA/GDPR-aware design: tenant isolation, local embeddings, audit trails.",
    ],
    highlights: ["Enterprise architecture", "RAG at scale", "98% cost reduction"],
    repo: "https://github.com/Parvez-Sharief95",
  },
  {
    title: "NetGuardian",
    tagline: "Real-time AI content shield",
    stack: ["TensorFlow.js", "Flask", "LangChain", "Browser Extension"],
    summary:
      "Browser extension that detects and blurs harmful content in real time using privacy-preserving on-device inference.",
    architecture: [
      "TensorFlow.js models run in-browser so pixels never leave the device.",
      "MutationObserver pipeline scores newly rendered media incrementally.",
      "Flask + LangChain service handles heavier text moderation on opt-in.",
    ],
    highlights: ["On-device inference", "AI moderation", "OpenAI Hackathon project"],
    repo: "https://github.com/Parvez-Sharief95",
  },
  {
    title: "CXIntel",
    tagline: "Sentiment-aware CRM platform",
    stack: ["Salesforce", "Experience Cloud", "Apex", "LWC", "Python NLP"],
    summary:
      "Salesforce Experience Cloud CRM integrating NLP sentiment analysis through Python APIs to personalize customer feedback loops.",
    architecture: [
      "Apex REST callouts to a Python sentiment service, cached per feedback record.",
      "LWC dashboards surfacing sentiment trends to service agents.",
      "GitHub Actions pipeline for metadata deployment and unit test gating.",
    ],
    highlights: ["Experience Cloud", "Sentiment analysis", "CI/CD for Salesforce"],
  },
  {
    title: "IP & Patent Management System",
    tagline: "Enterprise Salesforce lifecycle app",
    stack: ["Apex", "LWC", "Flow Builder", "SOQL"],
    summary:
      "Platform managing patent lifecycles: approvals, expiry tracking, dashboards, notifications and role-based access control.",
    architecture: [
      "Custom objects modeling patent, filing and renewal lifecycle states.",
      "Flow + Apex automation for approval routing and expiry notifications.",
      "OWD, FLS and permission sets enforcing least-privilege access.",
    ],
    highlights: ["Workflow automation", "Access control", "Executive dashboards"],
  },
  {
    title: "RetainIQ",
    tagline: "AI campaign analytics & churn prevention",
    stack: ["Python", "SQL", "Power BI", "XGBoost", "HuggingFace", "Gemini API"],
    summary:
      "End-to-end analytics platform predicting churn, generating business insights and automating executive reporting.",
    architecture: [
      "SQL warehouse layer with window functions for cohort and retention metrics.",
      "XGBoost churn model with feature store built from behavioural events.",
      "HuggingFace NLP over review text, summarized into narratives via Gemini API.",
      "Power BI executive dashboards refreshed from the automated pipeline.",
    ],
    highlights: ["Churn prediction", "Marketing analytics", "Automated reporting"],
  },
  {
    title: "Weather App",
    tagline: "API integration playground",
    stack: ["JavaScript", "HTML", "CSS", "SLDS"],
    summary:
      "Lightweight weather client demonstrating client-server communication and responsive UI with Salesforce Lightning Design System.",
    architecture: [
      "Fetch-based API layer with graceful error and rate-limit handling.",
      "Responsive SLDS-driven layout tuned for mobile first.",
    ],
    highlights: ["API integration", "Responsive UI"],
  },
];

export const SKILLS: { category: string; items: string[] }[] = [
  {
    category: "Languages",
    items: ["Python", "JavaScript", "Apex", "SQL", "HTML", "CSS"],
  },
  {
    category: "AI/ML & Backend",
    items: [
      "Generative AI",
      "Agentic AI",
      "Multi-Agent Systems",
      "Google ADK",
      "LangChain",
      "RAG Pipelines",
      "Prompt Engineering",
      "NLP",
      "TensorFlow",
      "Scikit-learn",
      "HuggingFace",
      "OpenAI / Gemini / Claude APIs",
      "REST APIs",
      "Microservices",
      "Node.js",
      "Flask",
    ],
  },
  {
    category: "Frontend & Frameworks",
    items: ["React", "Lightning Web Components", "Express.js", "Tailwind CSS", "Web Technologies"],
  },
  {
    category: "Data & BI",
    items: [
      "Pandas",
      "NumPy",
      "Window Functions",
      "EDA",
      "KPI Analysis",
      "Power BI",
      "Excel",
      "Data Validation",
      "Root Cause Analysis",
    ],
  },
  {
    category: "Salesforce",
    items: [
      "Experience Cloud",
      "Flow Builder",
      "SOQL",
      "Permission Sets",
      "Custom Objects",
      "CRM Development",
      "Reports & Dashboards",
    ],
  },
  {
    category: "Tools & Cloud",
    items: ["Azure Databricks", "Docker", "Git", "GitHub Actions", "CI/CD", "VS Code"],
  },
];

export type TimelineItem = {
  period: string;
  title: string;
  org: string;
  kind: "work" | "education" | "milestone";
  points: string[];
};

export const TIMELINE: TimelineItem[] = [
  {
    period: "Jan 2026 – Jun 2026",
    title: "Business Analyst Intern",
    org: "Myntra (Flipkart Group)",
    kind: "work",
    points: [
      "Analyzed millions of transactional records supporting Tier-1 sale events.",
      "Built Azure Databricks pipelines and Power BI dashboards for campaign KPIs.",
      "Owned data validation, root cause analysis, UAT and stakeholder reporting.",
    ],
  },
  {
    period: "2022 – 2026",
    title: "B.Tech, Artificial Intelligence & Machine Learning",
    org: "Aditya College of Engineering and Technology — CGPA 7.0/10",
    kind: "education",
    points: [
      "Core: DSA, OOP, AI, ML, Deep Learning, DBMS, OS, Networks, Cloud Computing.",
      "Applied coursework into production-grade AI and enterprise CRM projects.",
    ],
  },
  {
    period: "2024 – 2026",
    title: "Certifications & Hackathons",
    org: "Salesforce · OpenAI Hackathon · IT Specialist",
    kind: "milestone",
    points: [
      "Salesforce Certified Platform Developer I · AgentForce Specialist.",
      "IT Specialist — Python · HTML & CSS.",
      "Built NetGuardian for the OpenAI Hackathon.",
    ],
  },
  {
    period: "Jun 2024 – Jul 2024",
    title: "Salesforce Administrator & Developer Intern",
    org: "Technical Hub Pvt Ltd",
    kind: "work",
    points: [
      "Built Apex, LWC and Flow automation for enterprise CRM workflows.",
      "Integrated REST APIs, ran unit tests, UAT and production deployments.",
      "Worked in Agile sprints with GitHub Actions based delivery.",
    ],
  },
];

export const ROLES = [
  "AI Engineer",
  "GenAI / LLM Engineer",
  "Software Engineer",
  "Full Stack Developer",
  "Data / Business Analyst",
  "Salesforce Developer",
];
