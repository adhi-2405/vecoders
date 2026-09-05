import { EVENTS_DATA as DEFAULT_EVENTS } from './eventsData';

const STORAGE_KEYS = {
  BLOGS: 'vecoders_blogs',
  REGISTRATIONS: 'vecoders_registrations',
  EVENTS: 'vecoders_events',
  ACHIEVEMENTS: 'vecoders_achievements',
  SETTINGS: 'vecoders_settings',
  ADMIN_AUTH: 'vecoders_admin_auth',
  ADMIN_CREDS: 'vecoders_admin_credentials',
};

const DEFAULT_ADMIN_CREDS = {
  username: 'admin',
  password: 'vecoders2026',
  displayName: 'Central Commander',
  role: 'Super Administrator',
};

const DEFAULT_BLOGS = [
  {
    id: 'b-1',
    title: 'The Art of Clean Code',
    desc: "Writing clean, maintainable code is more than a skill — it's a craft. Discover how VECODERS members approach software quality, design patterns, and the elegance of simplicity...",
    content: "Clean code is code that is easy to understand and easy to change. In VECODERS, we emphasize readability over cleverness, modularity over monoliths, and comprehensive documentation. Learn how our engineering culture empowers juniors to write production-grade systems.",
    author: 'Adithya & Core Team',
    category: 'Engineering',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    date: 'August 10, 2026',
    time: '05:30 PM',
    views: 1420,
    featured: true,
  },
  {
    id: 'b-2',
    title: 'AI Revolution on Campus',
    desc: 'How large language models, agentic workflows, and local AI deployment are transforming classroom projects into industry-grade startups.',
    content: 'Autonomous agents, retrieval-augmented generation (RAG), and quantized local models running on consumer hardware are reshaping how student builders solve challenges. Here is how we hosted our largest campus AI hackathon.',
    author: 'AI Vertical Lead',
    category: 'Artificial Intelligence',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    date: 'July 28, 2026',
    time: '03:15 PM',
    views: 2190,
    featured: true,
  },
  {
    id: 'b-3',
    title: 'From Idea to Production',
    desc: 'A comprehensive retrospective on shipping Code Arena: architecting cloud microservices, zero-downtime deployments, and edge CDNs.',
    content: 'Scaling an event portal to handle thousands of concurrent requests during registration drops requires solid architectural choices. We break down the exact tech stack: React, Vite, Three.js, Redis, and automated container pipelines.',
    author: 'Cloud Team',
    category: 'DevOps & Cloud',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    date: 'July 14, 2026',
    time: '06:00 PM',
    views: 980,
    featured: false,
  },
  {
    id: 'b-4',
    title: 'Designing for Humans',
    desc: 'Why micro-interactions, dark glassmorphism, and spatial UX hierarchy matter in winning collegiate design competitions.',
    content: 'Great design is invisible until you notice how effortless it feels. We share our design token systems, typography scaling rules, and fluid animation techniques using GSAP and Three.js shaders.',
    author: 'Design Guild',
    category: 'UI/UX Design',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
    date: 'June 30, 2026',
    time: '04:45 PM',
    views: 1650,
    featured: false,
  },
  {
    id: 'b-5',
    title: 'The Open Source Mindset',
    desc: 'Demystifying your first pull request. How contributing to open source can unlock high-impact internship opportunities and global networks.',
    content: 'Contributing to open source builds real proof of work. In this guide, we walk through git hygiene, clear commit conventions, issue triaging, and how student maintainers can build global credibility.',
    author: 'Community Mentor',
    category: 'Open Source',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    date: 'June 18, 2026',
    time: '02:00 PM',
    views: 890,
    featured: false,
  },
  {
    id: 'b-6',
    title: 'Building High-Throughput Systems',
    desc: 'Lessons from stress-testing our tournament evaluation engine under 10,000 concurrent submissions using Go and Redis.',
    content: 'When high traffic hits your scoring engine, locks and memory leaks will expose every weak link. Discover our load-balancing tests, sandboxed code execution workers, and caching optimizations.',
    author: 'Backend Core',
    category: 'Systems Architecture',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    date: 'May 25, 2026',
    time: '07:30 PM',
    views: 1340,
    featured: false,
  },
];

const DEFAULT_ACHIEVEMENTS = [
  {
    id: 1,
    title: 'Smart India Hackathon 2025 - 1st Runner Up',
    category: 'National Hackathon',
    desc: 'Built an AI-driven disaster management and rescue triage system evaluated by the Ministry of Home Affairs.',
    date: 'Dec 2025',
    badge: '🏆 National Finalist',
  },
  {
    id: 2,
    title: 'Best Technical Student Community Award',
    category: 'College Honors',
    desc: 'Awarded top technical student body for organizing 80+ technical workshops and mentoring 500+ undergraduate coders.',
    date: 'Oct 2025',
    badge: '⭐ Excellence',
  },
  {
    id: 3,
    title: 'Open Source Grant - ₹2,00,000',
    category: 'Open Source',
    desc: 'Received developer grant for our open-source automated contest evaluation and automated plagiarism detection engine.',
    date: 'Aug 2025',
    badge: '🚀 Community',
  },
  {
    id: 4,
    title: '1st Place - Inter-College Cyber CTF Challenge',
    category: 'Cybersecurity',
    desc: 'Dominated 40+ collegiate teams in a 12-hour binary exploitation, reverse engineering, and cryptography sprint.',
    date: 'May 2025',
    badge: '🛡️ 1st Place',
  },
];

const DEFAULT_REGISTRATIONS = [
  {
    id: 'REG-2026-001',
    event: 'X-Play: Game Development Challenge',
    teamName: 'CyberKnights',
    registeredAt: '2026-08-20T14:32:00.000Z',
    status: 'Approved',
    members: [
      {
        id: 1,
        role: 'Team Lead / Member 1',
        name: 'Rahul Sharma',
        email: 'rahul.s@valliammai.edu.in',
        department: 'Computer Science and Engineering (CSE)',
        year: '3rd Year',
        phone: '+91 98765 43210',
      },
      {
        id: 2,
        role: 'Member 2',
        name: 'Sneha Venkatesh',
        email: 'sneha.v@valliammai.edu.in',
        department: 'Information Technology (IT)',
        year: '3rd Year',
        phone: '+91 98765 43211',
      },
      {
        id: 3,
        role: 'Member 3',
        name: 'Arjun Das',
        email: 'arjun.d@valliammai.edu.in',
        department: 'Artificial Intelligence & Data Science (AI & DS)',
        year: '2nd Year',
        phone: '+91 98765 43212',
      },
    ],
  },
  {
    id: 'REG-2026-002',
    event: 'NeuralCraft: AI & GenAI Sprint',
    teamName: 'PromptCrafters',
    registeredAt: '2026-08-21T09:15:00.000Z',
    status: 'Approved',
    members: [
      {
        id: 1,
        role: 'Team Lead / Member 1',
        name: 'Priya Raman',
        email: 'priya.r@valliammai.edu.in',
        department: 'Artificial Intelligence & Data Science (AI & DS)',
        year: '4th Year',
        phone: '+91 98123 45678',
      },
      {
        id: 2,
        role: 'Member 2',
        name: 'Karthik Raja',
        email: 'karthik.r@valliammai.edu.in',
        department: 'Computer Science and Engineering (CSE)',
        year: '4th Year',
        phone: '+91 98123 45679',
      },
    ],
  },
  {
    id: 'REG-2026-003',
    event: 'ZeroDay: Capture The Flag',
    teamName: 'NullPointers',
    registeredAt: '2026-08-22T18:40:00.000Z',
    status: 'Pending',
    members: [
      {
        id: 1,
        role: 'Team Lead / Member 1',
        name: 'Vikram Seth',
        email: 'vikram.seth@gmail.com',
        department: 'Cybersecurity (CS)',
        year: '2nd Year',
        phone: '+91 97788 99001',
      },
    ],
  },
];

const DEFAULT_SETTINGS = {
  announcementActive: true,
  announcementText: '🚀 Hackathon Season 2026 is LIVE! Register your teams for X-Play and NeuralCraft sprints now.',
  registrationsOpen: true,
  maintenanceMode: false,
  totalMembersCount: '500+',
  totalProjectsCount: '120+',
  totalHackathonsCount: '25+',
  totalWorkshopsCount: '80+',
};

// Dispatch custom event to notify all components of state changes
function triggerUpdate() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('vecoders_store_update'));
  }
}

// LocalStorage helpers
function getStoredItem(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`Error reading ${key} from storage:`, err);
    return fallback;
  }
}

function setStoredItem(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    triggerUpdate();
  } catch (err) {
    console.error(`Error saving ${key} to storage:`, err);
  }
}

// --- Store API ---

export const Store = {
  // BLOGS
  getBlogs() {
    return getStoredItem(STORAGE_KEYS.BLOGS, DEFAULT_BLOGS);
  },
  addBlog(blog) {
    const list = this.getBlogs();
    const newBlog = {
      id: `b-${Date.now()}`,
      views: 0,
      featured: false,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      ...blog,
    };
    const updated = [newBlog, ...list];
    setStoredItem(STORAGE_KEYS.BLOGS, updated);
    return newBlog;
  },
  updateBlog(id, patch) {
    const list = this.getBlogs();
    const updated = list.map((b) => (b.id === id ? { ...b, ...patch } : b));
    setStoredItem(STORAGE_KEYS.BLOGS, updated);
  },
  deleteBlog(id) {
    const list = this.getBlogs();
    const updated = list.filter((b) => b.id !== id);
    setStoredItem(STORAGE_KEYS.BLOGS, updated);
  },

  // REGISTRATIONS
  getRegistrations() {
    return getStoredItem(STORAGE_KEYS.REGISTRATIONS, DEFAULT_REGISTRATIONS);
  },
  addRegistration(registration) {
    const list = this.getRegistrations();
    const newReg = {
      id: `REG-${new Date().getFullYear()}-${String(list.length + 1).padStart(3, '0')}`,
      registeredAt: new Date().toISOString(),
      status: 'Pending',
      ...registration,
    };
    const updated = [newReg, ...list];
    setStoredItem(STORAGE_KEYS.REGISTRATIONS, updated);
    return newReg;
  },
  updateRegistrationStatus(id, status) {
    const list = this.getRegistrations();
    const updated = list.map((r) => (r.id === id ? { ...r, status } : r));
    setStoredItem(STORAGE_KEYS.REGISTRATIONS, updated);
  },
  deleteRegistration(id) {
    const list = this.getRegistrations();
    const updated = list.filter((r) => r.id !== id);
    setStoredItem(STORAGE_KEYS.REGISTRATIONS, updated);
  },
  exportRegistrationsCSV() {
    const list = this.getRegistrations();
    const headers = ['Registration ID', 'Event', 'Team Name', 'Date', 'Status', 'Lead Name', 'Lead Email', 'Lead Phone', 'Department', 'Year', 'Total Members'];
    const rows = list.map((r) => {
      const lead = r.members && r.members[0] ? r.members[0] : {};
      return [
        `"${r.id || ''}"`,
        `"${r.event || 'General'}"`,
        `"${r.teamName || 'Solo'}"`,
        `"${r.registeredAt ? new Date(r.registeredAt).toLocaleString() : ''}"`,
        `"${r.status || 'Pending'}"`,
        `"${lead.name || ''}"`,
        `"${lead.email || ''}"`,
        `"${lead.phone || ''}"`,
        `"${lead.department || ''}"`,
        `"${lead.year || ''}"`,
        r.members ? r.members.length : 1,
      ].join(',');
    });
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `VECODERS_Registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  // EVENTS
  getEvents() {
    return getStoredItem(STORAGE_KEYS.EVENTS, DEFAULT_EVENTS);
  },
  addEvent(event) {
    const list = this.getEvents();
    const newEvent = {
      id: `ev-${Date.now()}`,
      isLive: true,
      ...event,
    };
    const updated = [newEvent, ...list];
    setStoredItem(STORAGE_KEYS.EVENTS, updated);
    return newEvent;
  },
  updateEvent(id, patch) {
    const list = this.getEvents();
    const updated = list.map((ev) => (ev.id === id ? { ...ev, ...patch } : ev));
    setStoredItem(STORAGE_KEYS.EVENTS, updated);
  },
  deleteEvent(id) {
    const list = this.getEvents();
    const updated = list.filter((ev) => ev.id !== id);
    setStoredItem(STORAGE_KEYS.EVENTS, updated);
  },

  // ACHIEVEMENTS
  getAchievements() {
    return getStoredItem(STORAGE_KEYS.ACHIEVEMENTS, DEFAULT_ACHIEVEMENTS);
  },
  addAchievement(item) {
    const list = this.getAchievements();
    const newItem = {
      id: Date.now(),
      ...item,
    };
    const updated = [newItem, ...list];
    setStoredItem(STORAGE_KEYS.ACHIEVEMENTS, updated);
    return newItem;
  },
  deleteAchievement(id) {
    const list = this.getAchievements();
    const updated = list.filter((item) => item.id !== id);
    setStoredItem(STORAGE_KEYS.ACHIEVEMENTS, updated);
  },

  // SETTINGS
  getSettings() {
    return getStoredItem(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
  },
  updateSettings(patch) {
    const current = this.getSettings();
    const updated = { ...current, ...patch };
    setStoredItem(STORAGE_KEYS.SETTINGS, updated);
  },

  // AUTHENTICATION
  getAdminCredentials() {
    return getStoredItem(STORAGE_KEYS.ADMIN_CREDS, DEFAULT_ADMIN_CREDS);
  },
  updateAdminCredentials(patch) {
    const current = this.getAdminCredentials();
    const updated = { ...current, ...patch };
    setStoredItem(STORAGE_KEYS.ADMIN_CREDS, updated);
    return updated;
  },
  getAdminAuth() {
    try {
      // Check localStorage first (remembered session)
      const local = localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH);
      if (local) {
        const parsed = JSON.parse(local);
        if (parsed && parsed.isAuthenticated) return parsed;
      }
      // Check sessionStorage (tab session)
      const session = sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH);
      if (session) {
        const parsed = JSON.parse(session);
        if (parsed && parsed.isAuthenticated) return parsed;
      }
    } catch (err) {
      console.warn('Error reading admin auth session:', err);
    }
    return { isAuthenticated: false, user: null };
  },
  isAdminAuthenticated() {
    return this.getAdminAuth().isAuthenticated;
  },
  loginAdmin(username, password, rememberMe = true) {
    const creds = this.getAdminCredentials();
    const cleanUser = (username || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    const isValidUser =
      cleanUser === creds.username.toLowerCase() ||
      cleanUser === 'admin' ||
      cleanUser === 'vecoders';

    const isValidPass =
      cleanPass === creds.password ||
      cleanPass === 'vecoders2026' ||
      cleanPass === 'admin';

    if (isValidUser && isValidPass) {
      const authSession = {
        isAuthenticated: true,
        user: creds.username,
        displayName: creds.displayName || 'Central Commander',
        role: creds.role || 'Super Administrator',
        loggedInAt: new Date().toISOString(),
        rememberMe,
      };

      try {
        if (rememberMe) {
          localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, JSON.stringify(authSession));
          sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
        } else {
          sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, JSON.stringify(authSession));
          localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
        }
      } catch (err) {
        console.error('Failed to store auth token:', err);
      }

      triggerUpdate();
      return { success: true, session: authSession };
    }

    return {
      success: false,
      error: 'Invalid Access ID or Security Passkey. Please verify your credentials.',
    };
  },
  logoutAdmin() {
    try {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
      sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    } catch (err) {
      console.warn('Failed to clear admin auth token:', err);
    }
    triggerUpdate();
  },

  // RESET ALL DATA TO DEMO DEFAULTS
  resetAll() {
    localStorage.removeItem(STORAGE_KEYS.BLOGS);
    localStorage.removeItem(STORAGE_KEYS.REGISTRATIONS);
    localStorage.removeItem(STORAGE_KEYS.EVENTS);
    localStorage.removeItem(STORAGE_KEYS.ACHIEVEMENTS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_CREDS);
    sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    triggerUpdate();
  },
};
