export interface SocialLinks {
  github?: string;
  twitter?: string;
  linkedin?: string;
  email: string;
  phone?: string;
  whatsapp?: string;
}

export interface SiteProfile {
  name: string;
  role: string;
  rolesList: string[];
  tagline: string;
  bioShort: string;
  bioDetailed: string[];
  email: string;
  phone?: string;
  location: string;
  avatarUrl?: string;
  socialLinks: SocialLinks;
}

export interface Availability {
  isAvailable: boolean;
  statusType: 'available' | 'select_projects' | 'booked';
  statusLabel: string;
  statusNote: string;
}

export interface ProjectMetric {
  value: string;
  label: string;
  description?: string;
}

export interface ProjectArchitecture {
  clientLayer?: string;
  stateAndData?: string;
  designSystem?: string;
  performanceAndOps?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: 'Web Application' | 'iOS Application' | 'Website' | 'Digital Platform' | 'Web & Mobile Platform';
  projectNature: 'production' | 'personal_build';
  badge?: string;
  platforms?: string[];
  subtitle: string;
  featured: boolean;
  order: number;
  year: string;
  coverImage: string;
  mockupType?: 'browser' | 'mobile' | 'dual' | 'isometric';
  accentColor?: string;
  shortDescription: string;
  fullDescription: string;
  role: string;
  client?: string;
  liveUrl?: string;
  githubUrl?: string;
  technologies: string[];
  highlights: string[];
  metrics?: ProjectMetric[];
  architecture?: ProjectArchitecture;
  keyFeatures?: { title: string; description: string }[];
  problemAndContext?: string;
  solutionAndDesign?: string;
  outcomeAndImpact?: string;
}

export interface Service {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  technologies: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
}

export interface TechStackItem {
  id: string;
  name: string;
  category: 'Frontend' | 'Mobile / iOS' | 'Mobile / Cross-Platform' | 'Backend & Data' | 'Architecture & Tools';
  level: 'Core' | 'Advanced' | 'Proficient';
  focus: string;
}

export interface Experiment {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  status: 'Live' | 'Prototype' | 'Concept';
  demoUrl?: string;
  codeSnippet?: string;
}

export interface SiteSettings {
  seoTitle: string;
  seoDescription: string;
  ogImageUrl: string;
  contactHeadline: string;
  contactSubtitle: string;
  contactEmail: string;
  contactPhone?: string;
  adminPin: string; // Used for secure authentication
}

export interface SiteContent {
  profile: SiteProfile;
  availability: Availability;
  projects: Project[];
  services: Service[];
  process: ProcessStep[];
  technologies: TechStackItem[];
  experiments: Experiment[];
  settings: SiteSettings;
  lastUpdated: string;
}
