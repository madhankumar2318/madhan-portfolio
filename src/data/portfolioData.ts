export interface Project {
  id: string;
  title: string;
  category: 'Full-Stack' | 'Frontend' | 'Backend / Cloud' | 'AI / Machine Learning';
  description: string;
  impactMetrics: string[];
  architectureHighlights: string[];
  techStack: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: { name: string; tag: 'Advanced' | 'Proficient' | 'Experienced' }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description: string;
  keyAchievements: string[];
  technologies: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  location: string;
  period: string;
  score: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    phone: string;
    title: string;
    targetRole: string;
    location: string;
    email: string;
    bio: string;
    stats: { label: string; value: string }[];
    socials: {
      github: string;
      linkedin: string;
      leetcode?: string;
      email: string;
    };
  };
  projects: Project[];
  skillCategories: SkillCategory[];
  softSkills: string[];
  experiences: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
}

export const portfolioData: PortfolioData = {
  personal: {
    name: 'Madhan Kumar S',
    phone: '+91 6369461227',
    title: 'Software Development Engineer & Full-Stack AI Developer',
    targetRole: 'Software Development Engineer / Full-Stack Developer',
    location: 'Musiri, Trichy District, Tamil Nadu, India - 621211',
    email: 'kumarmathan12334@gmail.com',
    bio: 'AI & Data Science Student & SDE Intern at Cothon Solutions. I specialize in building fast web applications, intelligent AI tools, and scalable full-stack products.',
    stats: [
      { label: 'Department', value: 'AI & DS' },
      { label: 'Academic CGPA', value: '8.02 / 10' },
      { label: 'Graduation Year', value: '2027' },
      { label: 'Production Projects', value: '3 Major' },
    ],
    socials: {
      github: 'https://github.com/madhankumar2318',
      linkedin: 'https://www.linkedin.com/in/madhan-kumar-019831360/',
      leetcode: 'https://leetcode.com/u/madhanSK/',
      email: 'kumarmathan12334@gmail.com',
    },
  },
  projects: [
    {
      id: 'proj-1',
      title: 'Autonomous AI Knowledge Worker',
      category: 'AI / Machine Learning',
      description: 'Full-stack AI platform with 6-tier hybrid search, live YouTube video lookup with 120ms real-time autocomplete, RAG file workspaces, and dark-mode dashboard.',
      impactMetrics: [
        'Built 6-tier hybrid search & live YouTube video lookup with 120ms real-time autocomplete.',
        'Engineered Yahoo Session & Crumb API caching to drop stock fetch latency from 20s to 3s.',
        'Integrated RAG file workspaces, AI PDF report generation, and an OLED dark-mode dashboard.',
      ],
      architectureHighlights: ['RAG Vector Workspaces', 'Next.js Edge API', 'FastAPI Microservices'],
      techStack: ['Python', 'TypeScript', 'SQL', 'Next.js', 'FastAPI', 'Tailwind CSS', 'PostgreSQL'],
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      liveUrl: 'https://autonomous-ai-knowledge-worker.vercel.app/',
      githubUrl: 'https://github.com/madhankumar2318/Autonomous-AI-Knowledge-worker',
      featured: true,
    },
    {
      id: 'proj-2',
      title: 'AI Grievance System',
      category: 'Full-Stack',
      description: 'Next.js 16 portal featuring role-based dashboards for Citizens, Officers, & Chiefs powered by Google Gemini 2.5 Flash for instant AI complaint classification.',
      impactMetrics: [
        'Architected full-stack portal with role-based dashboards for Citizens, Officers, and Chiefs using Next.js 16 Edge Proxy guards, HTTP-only cookies, and Supabase for route security.',
        'Engineered AI triage engine using Google Gemini 2.5 Flash with structured JSON schemas for instant complaint classification, paired with GPS photo capture and voice input.',
        'Implemented Nodemailer SMTP for automated tracking emails delivered in under 10 seconds, interactive Leaflet.js GIS maps, Recharts analytics, and executive PDF report exports.',
      ],
      architectureHighlights: ['Gemini 2.5 Flash Triage', 'Supabase Edge Guards', 'GIS Leaflet Maps'],
      techStack: ['TypeScript', 'Next.js 16', 'React', 'Google Gemini API', 'Supabase', 'Nodemailer', 'Leaflet.js'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
      liveUrl: 'https://ai-grievance-system-beta.vercel.app/',
      githubUrl: 'https://github.com/madhankumar2318/Ai-Grievance-System',
      featured: true,
    },
    {
      id: 'proj-3',
      title: 'User Behaviour Analytics',
      category: 'Backend / Cloud',
      description: 'Enterprise-grade insider threat detection and anomaly analysis platform powered by Scikit-Learn Isolation Forest ML, Flask, and WebSockets.',
      impactMetrics: [
        'Built an enterprise-grade User Behavior Analytics platform to detect insider threats, credential misuse, and impossible travel anomalies in real time.',
        'Developed a React security dashboard backed by a Flask API, SQLite database, and an Isolation Forest ML risk engine integrated with WebSocket live updates.',
        'Containerized using Docker Compose with automated PDF reporting, Slack alerts, and validated backend stability using 33 automated pytest test suites.',
      ],
      architectureHighlights: ['Isolation Forest ML', 'WebSocket Live Updates', 'Docker Compose'],
      techStack: ['Python', 'React', 'Scikit-Learn', 'SQLite', 'WebSockets', 'Docker'],
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',
      liveUrl: '',
      githubUrl: 'https://github.com/madhankumar2318/User-Behaviour-Analytics',
      featured: true,
    },
  ],
  skillCategories: [
    {
      category: 'Languages',
      description: 'Core languages used across AI models, full-stack web apps, and backend APIs.',
      skills: [
        { name: 'Java', tag: 'Proficient' },
        { name: 'JavaScript', tag: 'Advanced' },
        { name: 'SQL', tag: 'Proficient' },
        { name: 'HTML', tag: 'Advanced' },
        { name: 'CSS', tag: 'Advanced' },
      ],
    },
    {
      category: 'Frameworks',
      description: 'Modern web frameworks, UI libraries, and microservice APIs.',
      skills: [
        { name: 'React', tag: 'Advanced' },
        { name: 'Spring Boot', tag: 'Experienced' },
      ],
    },
    {
      category: 'Developer Tools',
      description: 'DevOps, database systems, cloud deployment, and developer tools.',
      skills: [
        { name: 'Git', tag: 'Advanced' },
        { name: 'GitHub', tag: 'Advanced' },
        { name: 'Docker', tag: 'Proficient' },
        { name: 'AWS', tag: 'Experienced' },
        { name: 'IntelliJ', tag: 'Advanced' },
      ],
    },
  ],
  softSkills: ['Problem Solving', 'Teamwork'],
  experiences: [
    {
      id: 'exp-1',
      role: 'Software Development Engineer Intern',
      company: 'Cothon Solutions',
      location: 'Hyderabad, Telangana',
      period: 'Aug. 2025 – Sep. 2025',
      type: 'Internship',
      description: 'Engineered full-stack AI applications, RESTful microservices, and hardened application security daemons.',
      keyAchievements: [
        'Built a full-stack AI Knowledge Worker app with Next.js & FastAPI for real-time news, stock tracking, and AI-powered report generation.',
        'Developed RESTful APIs for news, stocks, hybrid search, chat, and summarization with 15-min caching and automated background scheduling.',
        'Hardened application security with path-traversal guards, magic-byte file validation, strict CORS/CSP headers, and rate-limiter cleanup daemons.',
      ],
      technologies: ['Next.js', 'FastAPI', 'Python', 'TypeScript', 'REST APIs', 'CORS/CSP Security', 'Caching'],
    },
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'J.J.College of Engineering and Technology',
      degree: 'B.Tech in Artificial Intelligence and Data Science',
      location: 'Trichy',
      period: 'Aug. 2023 – May 2027',
      score: 'CGPA : 8.02',
    },
    {
      id: 'edu-2',
      institution: 'Shri Jayendra Vidhyalaya CBSE School',
      degree: 'SSLC : 81% - HSC : 63%',
      location: 'Musiri',
      period: 'June 2016 – May 2023',
      score: 'SSLC : 81% - HSC : 63%',
    },
  ],
  certifications: [
    { title: 'Introduction to Machine Learning', issuer: 'NPTEL' },
    { title: 'Java', issuer: 'Apollo Computer Education' },
    { title: 'Cloud Computing Fundamentals', issuer: 'Udemy' },
    { title: 'Claude 101', issuer: 'Anthropic' },
  ],
};
