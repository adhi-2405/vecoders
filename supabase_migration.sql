-- =============================================================
-- VECODERS Supabase Migration
-- Run this ONCE in Supabase SQL Editor (supabase.com → SQL Editor)
-- =============================================================

-- ==================== TABLES ====================

-- BLOGS
CREATE TABLE IF NOT EXISTS blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  "desc" TEXT,
  content TEXT,
  author TEXT DEFAULT 'VECODERS Core',
  category TEXT DEFAULT 'Engineering',
  read_time TEXT DEFAULT '5 min read',
  image TEXT,
  date_display TEXT,
  time_display TEXT,
  views INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- EVENTS
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE,
  name TEXT NOT NULL,
  edition TEXT,
  domain TEXT,
  domain_label TEXT,
  category TEXT DEFAULT 'hackathon',
  is_live BOOLEAN DEFAULT true,
  start_date TEXT,
  date_display TEXT,
  time_display TEXT,
  location TEXT,
  mode TEXT DEFAULT 'Online',
  team_size TEXT,
  price_pool TEXT,
  entry_fee TEXT DEFAULT 'Free',
  badge TEXT,
  tagline TEXT,
  banner_gradient TEXT,
  icon TEXT,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- REGISTRATIONS
CREATE TABLE IF NOT EXISTS registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  registration_id TEXT UNIQUE NOT NULL,
  event TEXT,
  team_name TEXT,
  registered_at TIMESTAMPTZ DEFAULT now(),
  status TEXT DEFAULT 'Pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- REGISTRATION MEMBERS (normalized from nested array)
CREATE TABLE IF NOT EXISTS registration_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  registration_id UUID REFERENCES registrations(id) ON DELETE CASCADE,
  sort_order INTEGER DEFAULT 0,
  role TEXT,
  name TEXT NOT NULL,
  email TEXT,
  department TEXT,
  year TEXT,
  phone TEXT
);

-- ACHIEVEMENTS
CREATE TABLE IF NOT EXISTS achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  "desc" TEXT,
  date_display TEXT,
  badge TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- SETTINGS (singleton row)
CREATE TABLE IF NOT EXISTS settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  announcement_active BOOLEAN DEFAULT true,
  announcement_text TEXT DEFAULT '🚀 Hackathon Season 2026 is LIVE!',
  registrations_open BOOLEAN DEFAULT true,
  maintenance_mode BOOLEAN DEFAULT false,
  total_members_count TEXT DEFAULT '500+',
  total_projects_count TEXT DEFAULT '120+',
  total_hackathons_count TEXT DEFAULT '25+',
  total_workshops_count TEXT DEFAULT '80+'
);


-- ==================== ROW LEVEL SECURITY ====================

ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE registration_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ for display pages (anyone can view the website)
CREATE POLICY "Public read blogs" ON blogs FOR SELECT USING (true);
CREATE POLICY "Public read events" ON events FOR SELECT USING (true);
CREATE POLICY "Public read achievements" ON achievements FOR SELECT USING (true);
CREATE POLICY "Public read settings" ON settings FOR SELECT USING (true);
CREATE POLICY "Public read registration_members" ON registration_members FOR SELECT USING (true);
CREATE POLICY "Public read registrations" ON registrations FOR SELECT USING (true);

-- PUBLIC INSERT for registrations (anyone can register)
CREATE POLICY "Public insert registrations" ON registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert registration_members" ON registration_members FOR INSERT WITH CHECK (true);

-- AUTHENTICATED WRITE for admin operations
CREATE POLICY "Admin insert blogs" ON blogs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update blogs" ON blogs FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete blogs" ON blogs FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin insert events" ON events FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update events" ON events FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete events" ON events FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin update registrations" ON registrations FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete registrations" ON registrations FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin delete registration_members" ON registration_members FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin insert achievements" ON achievements FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update achievements" ON achievements FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete achievements" ON achievements FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin update settings" ON settings FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin insert settings" ON settings FOR INSERT TO authenticated WITH CHECK (true);


-- ==================== SEED DATA ====================

-- Seed Blogs
INSERT INTO blogs (title, "desc", content, author, category, read_time, image, date_display, time_display, views, featured) VALUES
(
  'The Art of Clean Code',
  'Writing clean, maintainable code is more than a skill — it''s a craft. Discover how VECODERS members approach software quality, design patterns, and the elegance of simplicity...',
  'Clean code is code that is easy to understand and easy to change. In VECODERS, we emphasize readability over cleverness, modularity over monoliths, and comprehensive documentation. Learn how our engineering culture empowers juniors to write production-grade systems.',
  'Adithya & Core Team', 'Engineering', '5 min read',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
  'August 10, 2026', '05:30 PM', 1420, true
),
(
  'AI Revolution on Campus',
  'How large language models, agentic workflows, and local AI deployment are transforming classroom projects into industry-grade startups.',
  'Autonomous agents, retrieval-augmented generation (RAG), and quantized local models running on consumer hardware are reshaping how student builders solve challenges. Here is how we hosted our largest campus AI hackathon.',
  'AI Vertical Lead', 'Artificial Intelligence', '7 min read',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
  'July 28, 2026', '03:15 PM', 2190, true
),
(
  'From Idea to Production',
  'A comprehensive retrospective on shipping Code Arena: architecting cloud microservices, zero-downtime deployments, and edge CDNs.',
  'Scaling an event portal to handle thousands of concurrent requests during registration drops requires solid architectural choices. We break down the exact tech stack: React, Vite, Three.js, Redis, and automated container pipelines.',
  'Cloud Team', 'DevOps & Cloud', '6 min read',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
  'July 14, 2026', '06:00 PM', 980, false
),
(
  'Designing for Humans',
  'Why micro-interactions, dark glassmorphism, and spatial UX hierarchy matter in winning collegiate design competitions.',
  'Great design is invisible until you notice how effortless it feels. We share our design token systems, typography scaling rules, and fluid animation techniques using GSAP and Three.js shaders.',
  'Design Guild', 'UI/UX Design', '4 min read',
  'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
  'June 30, 2026', '04:45 PM', 1650, false
),
(
  'The Open Source Mindset',
  'Demystifying your first pull request. How contributing to open source can unlock high-impact internship opportunities and global networks.',
  'Contributing to open source builds real proof of work. In this guide, we walk through git hygiene, clear commit conventions, issue triaging, and how student maintainers can build global credibility.',
  'Community Mentor', 'Open Source', '5 min read',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
  'June 18, 2026', '02:00 PM', 890, false
),
(
  'Building High-Throughput Systems',
  'Lessons from stress-testing our tournament evaluation engine under 10,000 concurrent submissions using Go and Redis.',
  'When high traffic hits your scoring engine, locks and memory leaks will expose every weak link. Discover our load-balancing tests, sandboxed code execution workers, and caching optimizations.',
  'Backend Core', 'Systems Architecture', '8 min read',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
  'May 25, 2026', '07:30 PM', 1340, false
);


-- Seed Events
INSERT INTO events (slug, name, edition, domain, domain_label, category, is_live, start_date, date_display, time_display, location, mode, team_size, price_pool, entry_fee, badge, tagline, banner_gradient, icon, image) VALUES
('x-play-gamejam', 'X-Play: Game Development Challenge', 'V26 National', 'gamedev', 'Game Dev & XR', 'gamejam', true, '2026-09-12', '12th - 18th Sept, 2026', '05:00 PM IST', 'Discord & Online Submissions', 'Online', '1 - 3 Members', '₹35,000', 'Free', '7-Day Game Jam', 'Unleash your imagination, design gripping mechanics, and forge playable game worlds.', 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)', '🎮', 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80'),
('neural-craft-ai', 'NeuralCraft: AI & GenAI Sprint', 'V26 AI Series', 'ai', 'AI & Data Intelligence', 'hackathon', true, '2026-09-20', '20th - 21st Sept, 2026', '10:00 AM IST', 'Virtual & Lab 304', 'Hybrid', '1 - 3 Members', '₹30,000', 'Free', 'AI Sprint', 'Build multi-agent frameworks, fine-tune models, and deploy production-grade AI solutions.', 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)', '🤖', 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80'),
('zeroday-ctf', 'ZeroDay: Capture The Flag', 'V26 Cyber', 'cybersecurity', 'Cybersecurity & CTF', 'competition', true, '2026-09-27', '27th Sept, 2026', '10:00 AM - 06:00 PM IST', 'Dedicated CTF Server / Online', 'Online', '1 - 2 Members', '₹25,000', 'Free', '8-Hour CTF', 'Reverse engineer binaries, crack cryptography, and exploit vulnerabilities to capture the flags.', 'linear-gradient(135deg, #10b981 0%, #059669 100%)', '🛡️', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80'),
('pixel-craft-design', 'PixelCraft: UI/UX Designathon', 'V26 Design', 'design', 'UI/UX & Design', 'competition', true, '2026-10-02', '2nd - 3rd Oct, 2026', '11:00 AM IST', 'Figma & Online', 'Online', '1 - 2 Members', '₹20,000', 'Free', 'Design Sprint', 'Craft breathtaking user experiences, intuitive design systems, and hyper-polished interfaces.', 'linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)', '🎨', 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80'),
('cloud-forge-devops', 'CloudForge: DevOps & Cloud Summit', 'V26 Cloud', 'webcloud', 'Web & Cloud', 'workshop', true, '2026-10-08', '8th Oct, 2026', '02:00 PM - 05:30 PM', 'Seminar Hall & YouTube Live', 'Hybrid', 'Individual', 'Certificates & Cloud Vouchers', 'Free', 'Hands-on Masterclass', 'Master Docker, Kubernetes, CI/CD pipelines, and serverless architectures in one intensive session.', 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', '☁️', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80'),
('code-blitz-2025', 'Code Blitz 2025', 'V25 Hall of Fame', 'flagship', 'Flagship Hackathon', 'hackathon', false, '2025-10-15', '15th - 16th Oct, 2025', 'Completed', 'Main Auditorium', 'Offline', '2 - 4 Members', '₹40,000', 'Free', 'Past Event', '400+ participants, 80+ project submissions, and 24 hours of non-stop engineering brilliance.', 'linear-gradient(135deg, #64748b 0%, #475569 100%)', '🏆', 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80'),
('web-craft-summit-2025', 'WebCraft Global Summit', 'V25 Summit', 'webcloud', 'Web & Cloud', 'workshop', false, '2025-08-20', '20th Aug, 2025', 'Completed', 'Virtual', 'Online', 'Individual', '₹15,000', 'Free', 'Past Event', 'Exploring Modern Frontend Architectures: React Server Components, WebGPU, and Edge Computing.', 'linear-gradient(135deg, #64748b 0%, #475569 100%)', '🌐', 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80');


-- Seed Achievements
INSERT INTO achievements (title, category, "desc", date_display, badge) VALUES
('Smart India Hackathon 2025 - 1st Runner Up', 'National Hackathon', 'Built an AI-driven disaster management and rescue triage system evaluated by the Ministry of Home Affairs.', 'Dec 2025', '🏆 National Finalist'),
('Best Technical Student Community Award', 'College Honors', 'Awarded top technical student body for organizing 80+ technical workshops and mentoring 500+ undergraduate coders.', 'Oct 2025', '⭐ Excellence'),
('Open Source Grant - ₹2,00,000', 'Open Source', 'Received developer grant for our open-source automated contest evaluation and automated plagiarism detection engine.', 'Aug 2025', '🚀 Community'),
('1st Place - Inter-College Cyber CTF Challenge', 'Cybersecurity', 'Dominated 40+ collegiate teams in a 12-hour binary exploitation, reverse engineering, and cryptography sprint.', 'May 2025', '🛡️ 1st Place');


-- Seed Settings (single row)
INSERT INTO settings (announcement_active, announcement_text, registrations_open, maintenance_mode, total_members_count, total_projects_count, total_hackathons_count, total_workshops_count)
VALUES (true, '🚀 Hackathon Season 2026 is LIVE! Register your teams for X-Play and NeuralCraft sprints now.', true, false, '500+', '120+', '25+', '80+');


-- Seed Demo Registrations
DO $$
DECLARE
  reg1_id UUID;
  reg2_id UUID;
  reg3_id UUID;
BEGIN
  INSERT INTO registrations (registration_id, event, team_name, registered_at, status)
  VALUES ('REG-2026-001', 'X-Play: Game Development Challenge', 'CyberKnights', '2026-08-20T14:32:00.000Z', 'Approved')
  RETURNING id INTO reg1_id;

  INSERT INTO registration_members (registration_id, sort_order, role, name, email, department, year, phone) VALUES
  (reg1_id, 0, 'Team Lead / Member 1', 'Rahul Sharma', 'rahul.s@valliammai.edu.in', 'Computer Science and Engineering (CSE)', '3rd Year', '+91 98765 43210'),
  (reg1_id, 1, 'Member 2', 'Sneha Venkatesh', 'sneha.v@valliammai.edu.in', 'Information Technology (IT)', '3rd Year', '+91 98765 43211'),
  (reg1_id, 2, 'Member 3', 'Arjun Das', 'arjun.d@valliammai.edu.in', 'Artificial Intelligence & Data Science (AI & DS)', '2nd Year', '+91 98765 43212');

  INSERT INTO registrations (registration_id, event, team_name, registered_at, status)
  VALUES ('REG-2026-002', 'NeuralCraft: AI & GenAI Sprint', 'PromptCrafters', '2026-08-21T09:15:00.000Z', 'Approved')
  RETURNING id INTO reg2_id;

  INSERT INTO registration_members (registration_id, sort_order, role, name, email, department, year, phone) VALUES
  (reg2_id, 0, 'Team Lead / Member 1', 'Priya Raman', 'priya.r@valliammai.edu.in', 'Artificial Intelligence & Data Science (AI & DS)', '4th Year', '+91 98123 45678'),
  (reg2_id, 1, 'Member 2', 'Karthik Raja', 'karthik.r@valliammai.edu.in', 'Computer Science and Engineering (CSE)', '4th Year', '+91 98123 45679');

  INSERT INTO registrations (registration_id, event, team_name, registered_at, status)
  VALUES ('REG-2026-003', 'ZeroDay: Capture The Flag', 'NullPointers', '2026-08-22T18:40:00.000Z', 'Pending')
  RETURNING id INTO reg3_id;

  INSERT INTO registration_members (registration_id, sort_order, role, name, email, department, year, phone) VALUES
  (reg3_id, 0, 'Team Lead / Member 1', 'Vikram Seth', 'vikram.seth@gmail.com', 'Cybersecurity (CS)', '2nd Year', '+91 97788 99001');
END $$;
