import { supabase } from './supabaseClient';

// ─── helpers ───────────────────────────────────────────────
function triggerUpdate() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('vecoders_store_update'));
  }
}

// Map Supabase row → frontend-friendly shape (snake_case → camelCase)
function mapBlog(row) {
  return {
    id: row.id,
    title: row.title,
    desc: row.desc,
    content: row.content,
    author: row.author,
    category: row.category,
    readTime: row.read_time,
    image: row.image,
    date: row.date_display,
    time: row.time_display,
    views: row.views,
    featured: row.featured,
  };
}

function mapEvent(row) {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    edition: row.edition,
    domain: row.domain,
    domainLabel: row.domain_label,
    category: row.category,
    isLive: row.is_live,
    startDate: row.start_date,
    dateDisplay: row.date_display,
    timeDisplay: row.time_display,
    location: row.location,
    mode: row.mode,
    teamSize: row.team_size,
    pricePool: row.price_pool,
    entryFee: row.entry_fee,
    badge: row.badge,
    tagline: row.tagline,
    bannerGradient: row.banner_gradient,
    icon: row.icon,
    image: row.image,
  };
}

function mapAchievement(row) {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    desc: row.desc,
    date: row.date_display,
    badge: row.badge,
  };
}

function mapSettings(row) {
  if (!row) {
    return {
      announcementActive: true,
      announcementText: '🚀 Hackathon Season 2026 is LIVE!',
      registrationsOpen: true,
      maintenanceMode: false,
      totalMembersCount: '500+',
      totalProjectsCount: '120+',
      totalHackathonsCount: '25+',
      totalWorkshopsCount: '80+',
    };
  }
  return {
    id: row.id,
    announcementActive: row.announcement_active,
    announcementText: row.announcement_text,
    registrationsOpen: row.registrations_open,
    maintenanceMode: row.maintenance_mode,
    totalMembersCount: row.total_members_count,
    totalProjectsCount: row.total_projects_count,
    totalHackathonsCount: row.total_hackathons_count,
    totalWorkshopsCount: row.total_workshops_count,
  };
}

function mapRegistration(row, members) {
  return {
    id: row.registration_id,
    _uuid: row.id,
    event: row.event,
    teamName: row.team_name,
    registeredAt: row.registered_at,
    status: row.status,
    members: (members || [])
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((m) => ({
        id: m.id,
        role: m.role,
        name: m.name,
        email: m.email,
        department: m.department,
        year: m.year,
        phone: m.phone,
      })),
  };
}

// ─── Store API (async, Supabase-backed) ────────────────────

export const Store = {
  // ── BLOGS ────────────────────────────────────────────────
  async getBlogs() {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) { console.error('getBlogs error:', error); return []; }
    return (data || []).map(mapBlog);
  },

  async addBlog(blog) {
    const row = {
      title: blog.title,
      desc: blog.desc,
      content: blog.content,
      author: blog.author || 'VECODERS Core',
      category: blog.category || 'Engineering',
      read_time: blog.readTime || '5 min read',
      image: blog.image,
      date_display: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      time_display: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      views: 0,
      featured: blog.featured || false,
    };
    const { data, error } = await supabase.from('blogs').insert(row).select().single();
    if (error) { console.error('addBlog error:', error); return null; }
    triggerUpdate();
    return mapBlog(data);
  },

  async updateBlog(id, patch) {
    const row = {};
    if (patch.title !== undefined) row.title = patch.title;
    if (patch.desc !== undefined) row.desc = patch.desc;
    if (patch.content !== undefined) row.content = patch.content;
    if (patch.author !== undefined) row.author = patch.author;
    if (patch.category !== undefined) row.category = patch.category;
    if (patch.readTime !== undefined) row.read_time = patch.readTime;
    if (patch.image !== undefined) row.image = patch.image;
    if (patch.featured !== undefined) row.featured = patch.featured;
    const { error } = await supabase.from('blogs').update(row).eq('id', id);
    if (error) console.error('updateBlog error:', error);
    triggerUpdate();
  },

  async deleteBlog(id) {
    const { error } = await supabase.from('blogs').delete().eq('id', id);
    if (error) console.error('deleteBlog error:', error);
    triggerUpdate();
  },

  // ── EVENTS ───────────────────────────────────────────────
  async getEvents() {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) { console.error('getEvents error:', error); return []; }
    return (data || []).map(mapEvent);
  },

  async addEvent(event) {
    const row = {
      slug: event.slug || `ev-${Date.now()}`,
      name: event.name,
      edition: event.edition || '',
      domain: event.domain || '',
      domain_label: event.domainLabel || '',
      category: event.category || 'hackathon',
      is_live: event.isLive !== false,
      start_date: event.startDate || '',
      date_display: event.dateDisplay || '',
      time_display: event.timeDisplay || '',
      location: event.location || '',
      mode: event.mode || 'Online',
      team_size: event.teamSize || '',
      price_pool: event.pricePool || '',
      entry_fee: event.entryFee || 'Free',
      badge: event.badge || '',
      tagline: event.tagline || '',
      banner_gradient: event.bannerGradient || '',
      icon: event.icon || '🚀',
      image: event.image || '',
    };
    const { data, error } = await supabase.from('events').insert(row).select().single();
    if (error) { console.error('addEvent error:', error); return null; }
    triggerUpdate();
    return mapEvent(data);
  },

  async updateEvent(id, patch) {
    const row = {};
    if (patch.name !== undefined) row.name = patch.name;
    if (patch.category !== undefined) row.category = patch.category;
    if (patch.domainLabel !== undefined) row.domain_label = patch.domainLabel;
    if (patch.mode !== undefined) row.mode = patch.mode;
    if (patch.dateDisplay !== undefined) row.date_display = patch.dateDisplay;
    if (patch.pricePool !== undefined) row.price_pool = patch.pricePool;
    if (patch.teamSize !== undefined) row.team_size = patch.teamSize;
    if (patch.badge !== undefined) row.badge = patch.badge;
    if (patch.tagline !== undefined) row.tagline = patch.tagline;
    if (patch.image !== undefined) row.image = patch.image;
    if (patch.isLive !== undefined) row.is_live = patch.isLive;
    if (patch.bannerGradient !== undefined) row.banner_gradient = patch.bannerGradient;
    if (patch.icon !== undefined) row.icon = patch.icon;
    const { error } = await supabase.from('events').update(row).eq('id', id);
    if (error) console.error('updateEvent error:', error);
    triggerUpdate();
  },

  async deleteEvent(id) {
    const { error } = await supabase.from('events').delete().eq('id', id);
    if (error) console.error('deleteEvent error:', error);
    triggerUpdate();
  },

  // ── REGISTRATIONS ────────────────────────────────────────
  async getRegistrations() {
    const { data: regs, error: regErr } = await supabase
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false });
    if (regErr) { console.error('getRegistrations error:', regErr); return []; }

    const { data: members, error: memErr } = await supabase
      .from('registration_members')
      .select('*')
      .order('sort_order', { ascending: true });
    if (memErr) console.error('getRegistrationMembers error:', memErr);

    const membersByReg = {};
    (members || []).forEach((m) => {
      if (!membersByReg[m.registration_id]) membersByReg[m.registration_id] = [];
      membersByReg[m.registration_id].push(m);
    });

    return (regs || []).map((r) => mapRegistration(r, membersByReg[r.id] || []));
  },

  async addRegistration(registration) {
    // Count existing registrations to generate sequential ID
    const { count } = await supabase
      .from('registrations')
      .select('*', { count: 'exact', head: true });
    const seqNum = (count || 0) + 1;
    const regId = `REG-${new Date().getFullYear()}-${String(seqNum).padStart(3, '0')}`;

    const { data: regRow, error: regErr } = await supabase
      .from('registrations')
      .insert({
        registration_id: regId,
        event: registration.event || 'General',
        team_name: registration.teamName || 'Solo',
        status: 'Pending',
      })
      .select()
      .single();

    if (regErr) { console.error('addRegistration error:', regErr); return null; }

    // Insert members
    if (registration.members && registration.members.length > 0) {
      const memberRows = registration.members.map((m, idx) => ({
        registration_id: regRow.id,
        sort_order: idx,
        role: m.role || (idx === 0 ? 'Team Lead / Member 1' : `Member ${idx + 1}`),
        name: m.name,
        email: m.email,
        department: m.department,
        year: m.year,
        phone: m.phone,
      }));
      const { error: memErr } = await supabase.from('registration_members').insert(memberRows);
      if (memErr) console.error('addRegistrationMembers error:', memErr);
    }

    triggerUpdate();
    return { id: regId };
  },

  async updateRegistrationStatus(id, status) {
    // `id` here is the registration_id text (e.g. REG-2026-001)
    const { error } = await supabase
      .from('registrations')
      .update({ status })
      .eq('registration_id', id);
    if (error) console.error('updateRegistrationStatus error:', error);
    triggerUpdate();
  },

  async deleteRegistration(id) {
    // First get the UUID from registration_id
    const { data } = await supabase
      .from('registrations')
      .select('id')
      .eq('registration_id', id)
      .single();
    if (data) {
      // Members cascade-deleted via FK
      const { error } = await supabase.from('registrations').delete().eq('id', data.id);
      if (error) console.error('deleteRegistration error:', error);
    }
    triggerUpdate();
  },

  async exportRegistrationsCSV() {
    const list = await this.getRegistrations();
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

  // ── ACHIEVEMENTS ─────────────────────────────────────────
  async getAchievements() {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) { console.error('getAchievements error:', error); return []; }
    return (data || []).map(mapAchievement);
  },

  async addAchievement(item) {
    const row = {
      title: item.title,
      category: item.category,
      desc: item.desc,
      date_display: item.date,
      badge: item.badge,
    };
    const { data, error } = await supabase.from('achievements').insert(row).select().single();
    if (error) { console.error('addAchievement error:', error); return null; }
    triggerUpdate();
    return mapAchievement(data);
  },

  async deleteAchievement(id) {
    const { error } = await supabase.from('achievements').delete().eq('id', id);
    if (error) console.error('deleteAchievement error:', error);
    triggerUpdate();
  },

  // ── SETTINGS ─────────────────────────────────────────────
  async getSettings() {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .limit(1)
      .single();
    if (error) {
      console.warn('getSettings error (may be empty table):', error);
      return mapSettings(null);
    }
    return mapSettings(data);
  },

  async updateSettings(patch) {
    // Get existing settings row ID
    const current = await this.getSettings();
    const row = {};
    if (patch.announcementActive !== undefined) row.announcement_active = patch.announcementActive;
    if (patch.announcementText !== undefined) row.announcement_text = patch.announcementText;
    if (patch.registrationsOpen !== undefined) row.registrations_open = patch.registrationsOpen;
    if (patch.maintenanceMode !== undefined) row.maintenance_mode = patch.maintenanceMode;
    if (patch.totalMembersCount !== undefined) row.total_members_count = patch.totalMembersCount;
    if (patch.totalProjectsCount !== undefined) row.total_projects_count = patch.totalProjectsCount;
    if (patch.totalHackathonsCount !== undefined) row.total_hackathons_count = patch.totalHackathonsCount;
    if (patch.totalWorkshopsCount !== undefined) row.total_workshops_count = patch.totalWorkshopsCount;

    if (current.id) {
      const { error } = await supabase.from('settings').update(row).eq('id', current.id);
      if (error) console.error('updateSettings error:', error);
    } else {
      // No settings row yet, insert one
      const { error } = await supabase.from('settings').insert(row);
      if (error) console.error('insertSettings error:', error);
    }
    triggerUpdate();
  },

  // ── AUTHENTICATION (Supabase Auth) ──────────────────────
  async getAdminAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    if (session && session.user) {
      return {
        isAuthenticated: true,
        user: session.user.email,
        displayName: session.user.user_metadata?.display_name || 'Central Commander',
        role: 'Super Administrator',
        loggedInAt: session.user.last_sign_in_at,
      };
    }
    return { isAuthenticated: false, user: null };
  },

  async isAdminAuthenticated() {
    const auth = await this.getAdminAuth();
    return auth.isAuthenticated;
  },

  async loginAdmin(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        success: false,
        error: error.message || 'Authentication failed. Please check your credentials.',
      };
    }

    const session = {
      isAuthenticated: true,
      user: data.user.email,
      displayName: data.user.user_metadata?.display_name || 'Central Commander',
      role: 'Super Administrator',
      loggedInAt: new Date().toISOString(),
    };

    triggerUpdate();
    return { success: true, session };
  },

  async logoutAdmin() {
    const { error } = await supabase.auth.signOut();
    if (error) console.warn('logoutAdmin error:', error);
    triggerUpdate();
  },

  // ── RESET (re-seed from Supabase — not applicable in production) ─
  async resetAll() {
    // In Supabase, reset means clearing localStorage leftovers
    // The actual data lives in the database; to reset, re-run the migration SQL
    console.warn('resetAll: To reset data, re-run the SQL migration in Supabase dashboard.');
    triggerUpdate();
  },
};
