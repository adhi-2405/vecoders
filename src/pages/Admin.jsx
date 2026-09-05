import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Store } from '../data/store';
import { renderGlowLetters } from '../components/GlowText';
import AdminLogin from '../components/AdminLogin';

export default function Admin() {
  const [authSession, setAuthSession] = useState(() => Store.getAdminAuth());
  const [activeTab, setActiveTab] = useState('overview'); // overview, blogs, registrations, events, achievements, settings
  const [blogs, setBlogs] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [events, setEvents] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [settings, setSettings] = useState({});
  const [adminCredsForm, setAdminCredsForm] = useState(() => Store.getAdminCredentials());
  const [showAdminPass, setShowAdminPass] = useState(false);

  // Filters & Search
  const [regSearch, setRegSearch] = useState('');
  const [regStatusFilter, setRegStatusFilter] = useState('all');
  const [blogSearch, setBlogSearch] = useState('');
  const [eventSearch, setEventSearch] = useState('');

  // Modals
  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [achModalOpen, setAchModalOpen] = useState(false);
  const [teamModalData, setTeamModalData] = useState(null);
  const [previewBlog, setPreviewBlog] = useState(null);

  // Form states for Blog
  const [blogForm, setBlogForm] = useState({
    title: '',
    category: 'Engineering',
    author: 'VECODERS Core',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    desc: '',
    content: '',
  });

  // Form states for Event
  const [eventForm, setEventForm] = useState({
    name: '',
    category: 'hackathon',
    domainLabel: 'AI & Data Intelligence',
    mode: 'Hybrid',
    dateDisplay: '20th - 21st Oct, 2026',
    pricePool: '₹30,000',
    teamSize: '1 - 3 Members',
    badge: 'Hackathon Sprint',
    tagline: '',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
    isLive: true,
  });

  // Form states for Achievement
  const [achForm, setAchForm] = useState({
    title: '',
    category: 'National Hackathon',
    desc: '',
    date: 'Oct 2026',
    badge: '🏆 Winner',
  });

  // Toast notice
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Sync with store
  const refreshData = () => {
    setBlogs(Store.getBlogs());
    setRegistrations(Store.getRegistrations());
    setEvents(Store.getEvents());
    setAchievements(Store.getAchievements());
    setSettings(Store.getSettings());
    setAuthSession(Store.getAdminAuth());
    setAdminCredsForm(Store.getAdminCredentials());
  };

  useEffect(() => {
    refreshData();
    const handleUpdate = () => refreshData();
    window.addEventListener('vecoders_store_update', handleUpdate);
    return () => window.removeEventListener('vecoders_store_update', handleUpdate);
  }, []);

  // Handlers for Blog
  const handleOpenBlogModal = (blog = null) => {
    if (blog) {
      setEditingBlog(blog);
      setBlogForm({
        title: blog.title || '',
        category: blog.category || 'Engineering',
        author: blog.author || 'VECODERS Core',
        readTime: blog.readTime || '5 min read',
        image: blog.image || '',
        desc: blog.desc || '',
        content: blog.content || '',
      });
    } else {
      setEditingBlog(null);
      setBlogForm({
        title: '',
        category: 'Engineering',
        author: 'VECODERS Core',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
        desc: '',
        content: '',
      });
    }
    setBlogModalOpen(true);
  };

  const handleSaveBlog = (e) => {
    e.preventDefault();
    if (!blogForm.title || !blogForm.desc) {
      alert('Please fill in both the title and short description.');
      return;
    }
    if (editingBlog) {
      Store.updateBlog(editingBlog.id, blogForm);
      showToast('Blog article updated successfully!');
    } else {
      Store.addBlog(blogForm);
      showToast('New blog published to site!');
    }
    setBlogModalOpen(false);
  };

  const handleDeleteBlog = (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      Store.deleteBlog(id);
      showToast('Blog removed.');
    }
  };

  // Handlers for Registration
  const handleStatusChange = (id, newStatus) => {
    Store.updateRegistrationStatus(id, newStatus);
    showToast(`Registration status set to ${newStatus}`);
  };

  const handleDeleteRegistration = (id) => {
    if (window.confirm('Are you sure you want to delete this registration?')) {
      Store.deleteRegistration(id);
      showToast('Registration deleted.');
    }
  };

  // Handlers for Events
  const handleOpenEventModal = (event = null) => {
    if (event) {
      setEditingEvent(event);
      setEventForm({
        name: event.name || '',
        category: event.category || 'hackathon',
        domainLabel: event.domainLabel || 'AI & Data Intelligence',
        mode: event.mode || 'Hybrid',
        dateDisplay: event.dateDisplay || '',
        pricePool: event.pricePool || 'Free',
        teamSize: event.teamSize || '1 - 3 Members',
        badge: event.badge || '',
        tagline: event.tagline || '',
        image: event.image || '',
        isLive: event.isLive !== false,
      });
    } else {
      setEditingEvent(null);
      setEventForm({
        name: '',
        category: 'hackathon',
        domainLabel: 'AI & Data Intelligence',
        mode: 'Hybrid',
        dateDisplay: '20th - 21st Oct, 2026',
        pricePool: '₹30,000',
        teamSize: '1 - 3 Members',
        badge: 'Sprint Challenge',
        tagline: '',
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
        isLive: true,
      });
    }
    setEventModalOpen(true);
  };

  const handleSaveEvent = (e) => {
    e.preventDefault();
    if (!eventForm.name) {
      alert('Event name is required.');
      return;
    }
    if (editingEvent) {
      Store.updateEvent(editingEvent.id, eventForm);
      showToast('Event updated successfully!');
    } else {
      Store.addEvent(eventForm);
      showToast('New event created and visible on Events page!');
    }
    setEventModalOpen(false);
  };

  const handleDeleteEvent = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      Store.deleteEvent(id);
      showToast('Event deleted.');
    }
  };

  // Handlers for Achievements
  const handleSaveAchievement = (e) => {
    e.preventDefault();
    if (!achForm.title) return;
    Store.addAchievement(achForm);
    showToast('New achievement added!');
    setAchModalOpen(false);
    setAchForm({
      title: '',
      category: 'National Hackathon',
      desc: '',
      date: 'Oct 2026',
      badge: '🏆 Winner',
    });
  };

  const handleDeleteAchievement = (id) => {
    if (window.confirm('Delete this milestone?')) {
      Store.deleteAchievement(id);
      showToast('Milestone removed.');
    }
  };

  // Settings Handlers
  const handleUpdateSettings = (patch) => {
    Store.updateSettings(patch);
    showToast('Site settings updated!');
  };

  // Filtered lists
  const filteredRegistrations = registrations.filter((r) => {
    const lead = r.members && r.members[0] ? r.members[0] : {};
    const matchesSearch =
      regSearch === '' ||
      (r.id && r.id.toLowerCase().includes(regSearch.toLowerCase())) ||
      (r.event && r.event.toLowerCase().includes(regSearch.toLowerCase())) ||
      (r.teamName && r.teamName.toLowerCase().includes(regSearch.toLowerCase())) ||
      (lead.name && lead.name.toLowerCase().includes(regSearch.toLowerCase())) ||
      (lead.email && lead.email.toLowerCase().includes(regSearch.toLowerCase())) ||
      (lead.department && lead.department.toLowerCase().includes(regSearch.toLowerCase()));
    const matchesStatus = regStatusFilter === 'all' || r.status.toLowerCase() === regStatusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const filteredBlogs = blogs.filter(
    (b) =>
      blogSearch === '' ||
      b.title.toLowerCase().includes(blogSearch.toLowerCase()) ||
      b.category.toLowerCase().includes(blogSearch.toLowerCase()) ||
      b.author.toLowerCase().includes(blogSearch.toLowerCase())
  );

  const filteredEvents = events.filter(
    (e) =>
      eventSearch === '' ||
      e.name.toLowerCase().includes(eventSearch.toLowerCase()) ||
      (e.domainLabel && e.domainLabel.toLowerCase().includes(eventSearch.toLowerCase())) ||
      (e.category && e.category.toLowerCase().includes(eventSearch.toLowerCase()))
  );

  if (!authSession || !authSession.isAuthenticated) {
    return (
      <AdminLogin
        onLoginSuccess={(session) => {
          setAuthSession(session);
          showToast('Access Granted! Welcome to Central Command Center.');
        }}
      />
    );
  }

  return (
    <div className="admin-page">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
            color: '#FFFFFF',
            padding: '12px 24px',
            borderRadius: '14px',
            fontWeight: '600',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            animation: 'fadeIn 0.3s ease',
          }}
        >
          <span>✓</span> {toastMessage}
        </div>
      )}

      <div className="container">
        {/* Admin Session Top Bar */}
        <div className="admin-session-topbar">
          <div className="admin-session-topbar__left">
            <span className="admin-session-dot" />
            <span className="admin-session-text">
              Active Node: <strong style={{ color: '#EFE9E0' }}>{authSession.displayName || 'Central Commander'}</strong> <span style={{ color: '#10B981' }}>({authSession.role || 'Super Admin'})</span>
            </span>
          </div>
          <button
            className="admin-topbar-logout-btn"
            onClick={() => {
              if (window.confirm('Are you sure you want to log out of the admin panel?')) {
                Store.logoutAdmin();
                setAuthSession({ isAuthenticated: false });
                showToast('Administrator session ended.');
              }
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Log Out of Admin</span>
          </button>
        </div>

        {/* Admin Header */}
        <div className="admin-header">
          <div className="admin-header__title-wrap">
            <div className="admin-header__badge-row">
              <div className="admin-header__badge">
                <span className="dot-live" style={{ width: '8px', height: '8px' }} />
                VECODERS CENTRAL HUB
              </div>
              <div className="admin-header__auth-badge">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>{authSession.displayName || 'Administrator'} ({authSession.role || 'Super Admin'})</span>
              </div>
            </div>
            <h1 className="admin-header__title">
              {renderGlowLetters('COMMAND CENTER', 'glow-crimson')}
            </h1>
            <p className="admin-header__subtitle">
              Total system management: publish blogs, monitor participant registrations, control events, and configure site announcements.
            </p>
          </div>

          <div className="admin-header__actions">
            <button
              className="btn-primary"
              style={{ padding: '10px 20px', fontSize: '0.88rem' }}
              onClick={() => handleOpenBlogModal()}
            >
              + Add Blog
            </button>
            <button
              className="btn-glass"
              style={{ padding: '10px 18px', fontSize: '0.88rem' }}
              onClick={() => handleOpenEventModal()}
            >
              + Add Event
            </button>
            <button
              className="btn-glass"
              style={{ padding: '10px 18px', fontSize: '0.88rem' }}
              onClick={() => Store.exportRegistrationsCSV()}
            >
              📥 Export CSV
            </button>
            <button
              className="admin-logout-btn-header"
              onClick={() => {
                if (window.confirm('Are you sure you want to log out of the admin panel?')) {
                  Store.logoutAdmin();
                  setAuthSession({ isAuthenticated: false });
                  showToast('Administrator session ended.');
                }
              }}
              title="Log Out of Administrator Session"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Admin Nav Tabs */}
        <div className="admin-tabs">
          <button
            className={`admin-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📊 Overview
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'registrations' ? 'active' : ''}`}
            onClick={() => setActiveTab('registrations')}
          >
            👥 Registrations <span className="admin-tab-badge">{registrations.length}</span>
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'blogs' ? 'active' : ''}`}
            onClick={() => setActiveTab('blogs')}
          >
            📝 Blogs & Stories <span className="admin-tab-badge">{blogs.length}</span>
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            🚀 Events & Hackathons <span className="admin-tab-badge">{events.length}</span>
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'achievements' ? 'active' : ''}`}
            onClick={() => setActiveTab('achievements')}
          >
            🏆 Achievements <span className="admin-tab-badge">{achievements.length}</span>
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            ⚙️ Site Controls
          </button>
          <button
            className="admin-tab-btn admin-tab-btn--logout"
            onClick={() => {
              if (window.confirm('Log out from administrator session?')) {
                Store.logoutAdmin();
                setAuthSession({ isAuthenticated: false });
                showToast('Administrator session ended.');
              }
            }}
            title="Log out of Admin Dashboard"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Log Out</span>
          </button>
        </div>

        {/* ========== TAB 1: OVERVIEW ========== */}
        {activeTab === 'overview' && (
          <div className="admin-tab-content">
            {/* Metric Cards Grid */}
            <div className="admin-metrics-grid">
              <div className="admin-metric-card">
                <div className="admin-metric-card__glow" style={{ background: 'rgba(239, 101, 34, 0.4)' }} />
                <div className="admin-metric-card__header">
                  <span className="admin-metric-card__title">Total Registrations</span>
                  <span className="admin-metric-card__icon" style={{ background: 'rgba(239, 101, 34, 0.15)', color: 'var(--orange)' }}>👥</span>
                </div>
                <div className="admin-metric-card__val">{registrations.length}</div>
                <p className="admin-metric-card__subtitle">
                  {registrations.filter((r) => r.status === 'Approved').length} Approved · {registrations.filter((r) => r.status === 'Pending').length} Pending
                </p>
              </div>

              <div className="admin-metric-card">
                <div className="admin-metric-card__glow" style={{ background: 'rgba(16, 185, 129, 0.4)' }} />
                <div className="admin-metric-card__header">
                  <span className="admin-metric-card__title">Published Blogs</span>
                  <span className="admin-metric-card__icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>📝</span>
                </div>
                <div className="admin-metric-card__val">{blogs.length}</div>
                <p className="admin-metric-card__subtitle">Stories & Tech retrospectives</p>
              </div>

              <div className="admin-metric-card">
                <div className="admin-metric-card__glow" style={{ background: 'rgba(6, 182, 212, 0.4)' }} />
                <div className="admin-metric-card__header">
                  <span className="admin-metric-card__title">Active Events</span>
                  <span className="admin-metric-card__icon" style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#06B6D4' }}>🚀</span>
                </div>
                <div className="admin-metric-card__val">{events.filter((e) => e.isLive).length}</div>
                <p className="admin-metric-card__subtitle">{events.length} Total Sprints & Workshops</p>
              </div>

              <div className="admin-metric-card">
                <div className="admin-metric-card__glow" style={{ background: 'rgba(168, 85, 247, 0.4)' }} />
                <div className="admin-metric-card__header">
                  <span className="admin-metric-card__title">Accolades & Records</span>
                  <span className="admin-metric-card__icon" style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#A855F7' }}>🏆</span>
                </div>
                <div className="admin-metric-card__val">{achievements.length}</div>
                <p className="admin-metric-card__subtitle">National & State Level Milestones</p>
              </div>
            </div>

            {/* Quick Actions & Recent Registrations */}
            <div className="admin-card-box">
              <div className="admin-card-box__header">
                <h3 className="admin-card-box__title">
                  <span>⚡</span> Recent Participant Registrations
                </h3>
                <div className="admin-card-box__controls">
                  <button className="btn-glass" style={{ fontSize: '0.82rem', padding: '6px 14px' }} onClick={() => setActiveTab('registrations')}>
                    View All ({registrations.length})
                  </button>
                </div>
              </div>

              {registrations.length > 0 ? (
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Reg ID</th>
                        <th>Team Identity</th>
                        <th>Lead Contact</th>
                        <th>Department</th>
                        <th>Year</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registrations.slice(0, 5).map((reg) => {
                        const lead = reg.members && reg.members[0] ? reg.members[0] : {};
                        return (
                          <tr key={reg.id}>
                            <td><strong>{reg.id}</strong></td>
                            <td>
                              <div style={{ fontWeight: '600', color: 'var(--cream)' }}>{reg.teamName || lead.name}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                {reg.members ? `${reg.members.length} Member(s)` : 'Solo'}
                              </div>
                            </td>
                            <td>
                              <div>{lead.name}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{lead.email || 'N/A'}</div>
                            </td>
                            <td>{lead.department ? lead.department.split('(')[0] : 'N/A'}</td>
                            <td>{lead.year || '1st Year'}</td>
                            <td>
                              <span className={`badge-status badge-status--${reg.status.toLowerCase()}`}>
                                {reg.status}
                              </span>
                            </td>
                            <td>
                              <div style={{ display: 'flex', gap: '6px' }}>
                                {reg.status !== 'Approved' && (
                                  <button
                                    className="btn-action-icon btn-success"
                                    title="Approve"
                                    onClick={() => handleStatusChange(reg.id, 'Approved')}
                                  >
                                    ✓
                                  </button>
                                )}
                                <button
                                  className="btn-action-icon"
                                  title="View Details"
                                  onClick={() => setTeamModalData(reg)}
                                >
                                  👁️
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>No registrations received yet.</p>
              )}
            </div>

            {/* Quick Controls Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <div className="admin-card-box">
                <h3 className="admin-card-box__title" style={{ fontSize: '1.1rem', marginBottom: '16px' }}>
                  📢 Live Announcement Banner
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '14px' }}>
                  Currently {settings.announcementActive ? 'active and visible on top of pages' : 'hidden'}.
                </p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    className={settings.announcementActive ? 'btn-primary' : 'btn-glass'}
                    style={{ fontSize: '0.82rem', padding: '8px 16px' }}
                    onClick={() => handleUpdateSettings({ announcementActive: !settings.announcementActive })}
                  >
                    {settings.announcementActive ? '🟢 Banner Active' : '⚪ Turn On Banner'}
                  </button>
                  <button
                    className="btn-glass"
                    style={{ fontSize: '0.82rem', padding: '8px 16px' }}
                    onClick={() => setActiveTab('settings')}
                  >
                    Edit Message
                  </button>
                </div>
              </div>

              <div className="admin-card-box">
                <h3 className="admin-card-box__title" style={{ fontSize: '1.1rem', marginBottom: '16px' }}>
                  📝 Quick Blog Generator
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '14px' }}>
                  Publish technical tutorials, student achievements, or announcements directly to the blog.
                </p>
                <button
                  className="btn-primary"
                  style={{ fontSize: '0.82rem', padding: '8px 18px' }}
                  onClick={() => handleOpenBlogModal()}
                >
                  + Write New Story
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========== TAB 2: REGISTRATIONS ========== */}
        {activeTab === 'registrations' && (
          <div className="admin-tab-content">
            <div className="admin-card-box">
              <div className="admin-card-box__header">
                <div>
                  <h3 className="admin-card-box__title">
                    <span>👥</span> Event Registrations ({filteredRegistrations.length})
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', margin: '4px 0 0 0' }}>
                    Real-time roster of registered student teams and participants.
                  </p>
                </div>

                <div className="admin-card-box__controls">
                  <input
                    type="text"
                    placeholder="Search name, team, email, dept..."
                    className="admin-input-search"
                    value={regSearch}
                    onChange={(e) => setRegSearch(e.target.value)}
                  />

                  <select
                    className="admin-select"
                    value={regStatusFilter}
                    onChange={(e) => setRegStatusFilter(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                  </select>

                  <button
                    className="btn-primary"
                    style={{ fontSize: '0.82rem', padding: '8px 16px' }}
                    onClick={() => Store.exportRegistrationsCSV()}
                  >
                    📥 Export CSV
                  </button>
                </div>
              </div>

              {filteredRegistrations.length > 0 ? (
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Team Identity</th>
                        <th>Lead Contact</th>
                        <th>Department & Year</th>
                        <th>Registered Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRegistrations.map((reg) => {
                        const lead = reg.members && reg.members[0] ? reg.members[0] : {};
                        return (
                          <tr key={reg.id}>
                            <td>
                              <span style={{ fontFamily: 'monospace', fontWeight: '700', color: 'var(--orange)' }}>
                                {reg.id}
                              </span>
                            </td>
                            <td>
                              <div style={{ fontWeight: '600', color: '#FFFFFF' }}>{reg.teamName || lead.name}</div>
                              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                                {reg.members ? `${reg.members.length} member(s)` : 'Solo'}
                              </div>
                            </td>
                            <td>
                              <div>{lead.name}</div>
                              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{lead.email}</div>
                              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{lead.phone}</div>
                            </td>
                            <td>
                              <div style={{ fontSize: '0.85rem' }}>{lead.department || 'N/A'}</div>
                              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{lead.year || ''}</div>
                            </td>
                            <td>
                              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                {reg.registeredAt ? new Date(reg.registeredAt).toLocaleDateString() : 'Recent'}
                              </span>
                            </td>
                            <td>
                              <span className={`badge-status badge-status--${reg.status.toLowerCase()}`}>
                                {reg.status}
                              </span>
                            </td>
                            <td>
                              <div style={{ display: 'flex', gap: '6px' }}>
                                <button
                                  className="btn-action-icon"
                                  title="View Full Team"
                                  onClick={() => setTeamModalData(reg)}
                                >
                                  👁️
                                </button>
                                {reg.status !== 'Approved' && (
                                  <button
                                    className="btn-action-icon btn-success"
                                    title="Approve"
                                    onClick={() => handleStatusChange(reg.id, 'Approved')}
                                  >
                                    ✓
                                  </button>
                                )}
                                {reg.status !== 'Rejected' && (
                                  <button
                                    className="btn-action-icon"
                                    title="Reject"
                                    style={{ color: '#F87171' }}
                                    onClick={() => handleStatusChange(reg.id, 'Rejected')}
                                  >
                                    ✕
                                  </button>
                                )}
                                <button
                                  className="btn-action-icon btn-danger"
                                  title="Delete"
                                  onClick={() => handleDeleteRegistration(reg.id)}
                                >
                                  🗑️
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                  <p>No registrations matching filter.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========== TAB 3: BLOGS ========== */}
        {activeTab === 'blogs' && (
          <div className="admin-tab-content">
            <div className="admin-card-box">
              <div className="admin-card-box__header">
                <div>
                  <h3 className="admin-card-box__title">
                    <span>📝</span> Articles & Tech Stories ({blogs.length})
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', margin: '4px 0 0 0' }}>
                    Create, update, and manage stories published to the VECODERS Blog page.
                  </p>
                </div>

                <div className="admin-card-box__controls">
                  <input
                    type="text"
                    placeholder="Search blogs..."
                    className="admin-input-search"
                    value={blogSearch}
                    onChange={(e) => setBlogSearch(e.target.value)}
                  />

                  <button
                    className="btn-primary"
                    style={{ fontSize: '0.85rem', padding: '9px 18px' }}
                    onClick={() => handleOpenBlogModal()}
                  >
                    + Write New Blog
                  </button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
                {filteredBlogs.map((b) => (
                  <div
                    key={b.id}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div
                      style={{
                        height: '160px',
                        backgroundImage: `url('${b.image}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative',
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          top: '10px',
                          left: '10px',
                          background: 'rgba(0,0,0,0.7)',
                          padding: '3px 10px',
                          borderRadius: '20px',
                          fontSize: '0.72rem',
                          fontWeight: '600',
                          color: '#34D399',
                        }}
                      >
                        {b.category}
                      </div>
                    </div>

                    <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h4 style={{ color: 'var(--cream)', fontSize: '1.1rem', marginBottom: '8px', lineHeight: '1.3' }}>
                        {b.title}
                      </h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5', flex: 1, marginBottom: '16px' }}>
                        {b.desc}
                      </p>

                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          borderTop: '1px solid rgba(255,255,255,0.06)',
                          paddingTop: '12px',
                        }}
                      >
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {b.date} · {b.readTime || '5m'}
                        </span>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button
                            className="btn-action-icon"
                            title="Preview Article"
                            onClick={() => setPreviewBlog(b)}
                          >
                            👁️
                          </button>
                          <button
                            className="btn-action-icon"
                            title="Edit"
                            onClick={() => handleOpenBlogModal(b)}
                          >
                            ✏️
                          </button>
                          <button
                            className="btn-action-icon btn-danger"
                            title="Delete"
                            onClick={() => handleDeleteBlog(b.id)}
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========== TAB 4: EVENTS ========== */}
        {activeTab === 'events' && (
          <div className="admin-tab-content">
            <div className="admin-card-box">
              <div className="admin-card-box__header">
                <div>
                  <h3 className="admin-card-box__title">
                    <span>🚀</span> Events & Hackathons Management ({events.length})
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', margin: '4px 0 0 0' }}>
                    Control upcoming hackathons, sprint challenges, workshops and prize pools.
                  </p>
                </div>

                <div className="admin-card-box__controls">
                  <input
                    type="text"
                    placeholder="Search events..."
                    className="admin-input-search"
                    value={eventSearch}
                    onChange={(e) => setEventSearch(e.target.value)}
                  />

                  <button
                    className="btn-primary"
                    style={{ fontSize: '0.85rem', padding: '9px 18px' }}
                    onClick={() => handleOpenEventModal()}
                  >
                    + Create Event
                  </button>
                </div>
              </div>

              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Event Title</th>
                      <th>Category & Domain</th>
                      <th>Mode</th>
                      <th>Dates</th>
                      <th>Prize Pool</th>
                      <th>Live Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEvents.map((ev) => (
                      <tr key={ev.id}>
                        <td>
                          <div style={{ fontWeight: '700', color: 'var(--cream)' }}>{ev.name}</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{ev.tagline}</div>
                        </td>
                        <td>
                          <div>{ev.domainLabel || ev.domain}</div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--orange)' }}>{ev.badge || ev.category}</span>
                        </td>
                        <td>{ev.mode || 'Online'}</td>
                        <td>{ev.dateDisplay}</td>
                        <td style={{ color: '#34D399', fontWeight: '600' }}>{ev.pricePool || 'Free'}</td>
                        <td>
                          <button
                            className={ev.isLive ? 'badge-status badge-status--approved' : 'badge-status badge-status--rejected'}
                            style={{ cursor: 'pointer', border: 'none' }}
                            onClick={() => {
                              Store.updateEvent(ev.id, { isLive: !ev.isLive });
                              showToast(`Event status updated.`);
                            }}
                          >
                            {ev.isLive ? '🟢 Live' : '⚪ Past'}
                          </button>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button
                              className="btn-action-icon"
                              title="Edit"
                              onClick={() => handleOpenEventModal(ev)}
                            >
                              ✏️
                            </button>
                            <button
                              className="btn-action-icon btn-danger"
                              title="Delete"
                              onClick={() => handleDeleteEvent(ev.id)}
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========== TAB 5: ACHIEVEMENTS ========== */}
        {activeTab === 'achievements' && (
          <div className="admin-tab-content">
            <div className="admin-card-box">
              <div className="admin-card-box__header">
                <div>
                  <h3 className="admin-card-box__title">
                    <span>🏆</span> Records & Milestones ({achievements.length})
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', margin: '4px 0 0 0' }}>
                    Milestones and accolades displayed on the Achievements page.
                  </p>
                </div>

                <button
                  className="btn-primary"
                  style={{ fontSize: '0.85rem', padding: '9px 18px' }}
                  onClick={() => setAchModalOpen(true)}
                >
                  + Add Milestone
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                {achievements.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '16px',
                      padding: '20px',
                      position: 'relative',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span
                        style={{
                          background: 'rgba(239, 101, 34, 0.15)',
                          color: 'var(--orange)',
                          padding: '3px 10px',
                          borderRadius: '20px',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                        }}
                      >
                        {item.badge}
                      </span>
                      <button
                        className="btn-action-icon btn-danger"
                        style={{ width: '26px', height: '26px', fontSize: '0.8rem' }}
                        title="Delete"
                        onClick={() => handleDeleteAchievement(item.id)}
                      >
                        ✕
                      </button>
                    </div>
                    <h4 style={{ color: 'var(--cream)', fontSize: '1rem', marginBottom: '6px' }}>{item.title}</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '14px' }}>
                      {item.desc}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '10px' }}>
                      <span>{item.category}</span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========== TAB 6: SETTINGS & BROADCAST ========== */}
        {activeTab === 'settings' && (
          <div className="admin-tab-content">
            <div className="admin-card-box">
              <h3 className="admin-card-box__title" style={{ marginBottom: '20px' }}>
                <span>📢</span> Global Announcement Banner
              </h3>
              <div className="admin-form-group">
                <label className="admin-form-label">Banner Message</label>
                <input
                  type="text"
                  className="admin-form-input"
                  value={settings.announcementText || ''}
                  onChange={(e) => setSettings({ ...settings, announcementText: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '16px' }}>
                <button
                  className={settings.announcementActive ? 'btn-primary' : 'btn-glass'}
                  onClick={() => {
                    const next = !settings.announcementActive;
                    setSettings({ ...settings, announcementActive: next });
                    handleUpdateSettings({ announcementActive: next, announcementText: settings.announcementText });
                  }}
                >
                  {settings.announcementActive ? '🟢 Banner is Active (Visible on site)' : '⚪ Banner is Disabled'}
                </button>

                <button
                  className="btn-glass"
                  onClick={() => handleUpdateSettings({ announcementText: settings.announcementText })}
                >
                  Save Text
                </button>
              </div>
            </div>

            <div className="admin-card-box">
              <h3 className="admin-card-box__title" style={{ marginBottom: '20px' }}>
                <span>🛡️</span> Administrator Security & Access Passkey
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                <div className="admin-form-group">
                  <label className="admin-form-label">Access ID / Username</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    value={adminCredsForm.username || ''}
                    onChange={(e) => setAdminCredsForm({ ...adminCredsForm, username: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Administrator Display Name</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    value={adminCredsForm.displayName || ''}
                    onChange={(e) => setAdminCredsForm({ ...adminCredsForm, displayName: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-form-group" style={{ marginBottom: '20px' }}>
                <label className="admin-form-label">Security Passkey / Password</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type={showAdminPass ? 'text' : 'password'}
                    className="admin-form-input"
                    value={adminCredsForm.password || ''}
                    onChange={(e) => setAdminCredsForm({ ...adminCredsForm, password: e.target.value })}
                    style={{ flex: 1 }}
                  />
                  <button
                    type="button"
                    className="btn-glass"
                    onClick={() => setShowAdminPass(!showAdminPass)}
                    style={{ minWidth: '85px', fontSize: '0.82rem' }}
                  >
                    {showAdminPass ? 'Hide' : 'Reveal'}
                  </button>
                </div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '6px', display: 'block' }}>
                  Default Passkey: <code>vecoders2026</code>. Changing this will immediately protect all future login attempts.
                </span>
              </div>

              <button
                className="btn-primary"
                onClick={() => {
                  if (!adminCredsForm.username || !adminCredsForm.password) {
                    alert('Username and password cannot be empty.');
                    return;
                  }
                  Store.updateAdminCredentials(adminCredsForm);
                  showToast('Security credentials updated successfully!');
                }}
              >
                💾 Update Security Credentials
              </button>
            </div>

            <div className="admin-card-box">
              <h3 className="admin-card-box__title" style={{ marginBottom: '20px' }}>
                <span>⚙️</span> Portal Master Controls
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <h4 style={{ color: 'var(--cream)', marginBottom: '8px' }}>Registration Portal Status</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '14px' }}>
                    Control whether new team registrations can be submitted.
                  </p>
                  <button
                    className={settings.registrationsOpen !== false ? 'btn-primary' : 'btn-glass'}
                    onClick={() => handleUpdateSettings({ registrationsOpen: settings.registrationsOpen === false })}
                  >
                    {settings.registrationsOpen !== false ? '🟢 Registrations Open' : '🔴 Registrations Closed'}
                  </button>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <h4 style={{ color: 'var(--cream)', marginBottom: '8px' }}>Reset System Data</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '14px' }}>
                    Reset all blogs, registrations, and events back to fresh initial demo defaults.
                  </p>
                  <button
                    className="btn-glass"
                    style={{ color: '#F87171', borderColor: 'rgba(239, 68, 68, 0.4)' }}
                    onClick={() => {
                      if (window.confirm('Are you sure you want to reset all data back to original defaults?')) {
                        Store.resetAll();
                        showToast('System data reset to defaults.');
                      }
                    }}
                  >
                    ⚠️ Reset to Default Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========== MODAL: ADD / EDIT BLOG ========== */}
      {blogModalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setBlogModalOpen(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal__header">
              <h3 className="admin-modal__title">{editingBlog ? 'Edit Blog Story' : 'Publish New Blog'}</h3>
              <button className="admin-modal__close" onClick={() => setBlogModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleSaveBlog}>
              <div className="admin-form-group">
                <label className="admin-form-label">Article Title *</label>
                <input
                  type="text"
                  className="admin-form-input"
                  placeholder="e.g. Scaling AI Workflows with Open Source..."
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  required
                />
              </div>

              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label className="admin-form-label">Category</label>
                  <select
                    className="admin-form-select"
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="DevOps & Cloud">DevOps & Cloud</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Open Source">Open Source</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Community">Community</option>
                  </select>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Author Name</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    value={blogForm.author}
                    onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Cover Image URL</label>
                <input
                  type="url"
                  className="admin-form-input"
                  placeholder="https://images.unsplash.com/..."
                  value={blogForm.image}
                  onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                />
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Quick Presets:</span>
                  {[
                    { label: 'Code', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80' },
                    { label: 'AI', url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80' },
                    { label: 'Cloud', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80' },
                    { label: 'Design', url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80' },
                  ].map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: 'var(--cream)', borderRadius: '6px', fontSize: '0.72rem', padding: '2px 8px', cursor: 'pointer' }}
                      onClick={() => setBlogForm({ ...blogForm, image: p.url })}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Short Summary / Excerpt *</label>
                <textarea
                  className="admin-form-textarea"
                  rows="3"
                  placeholder="A concise summary of the article shown on blog cards..."
                  value={blogForm.desc}
                  onChange={(e) => setBlogForm({ ...blogForm, desc: e.target.value })}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Full Article Content</label>
                <textarea
                  className="admin-form-textarea"
                  rows="5"
                  placeholder="Detailed breakdown, technical guide, or narrative..."
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <button type="button" className="btn-glass" onClick={() => setBlogModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary">
                  {editingBlog ? 'Save Changes' : 'Publish Blog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========== MODAL: ADD / EDIT EVENT ========== */}
      {eventModalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setEventModalOpen(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal__header">
              <h3 className="admin-modal__title">{editingEvent ? 'Edit Event' : 'Create New Event / Hackathon'}</h3>
              <button className="admin-modal__close" onClick={() => setEventModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleSaveEvent}>
              <div className="admin-form-group">
                <label className="admin-form-label">Event Name *</label>
                <input
                  type="text"
                  className="admin-form-input"
                  placeholder="e.g. NeuralCraft AI Hackathon..."
                  value={eventForm.name}
                  onChange={(e) => setEventForm({ ...eventForm, name: e.target.value })}
                  required
                />
              </div>

              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label className="admin-form-label">Category</label>
                  <select
                    className="admin-form-select"
                    value={eventForm.category}
                    onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
                  >
                    <option value="hackathon">Hackathon</option>
                    <option value="gamejam">Game Jam</option>
                    <option value="competition">Competition / CTF</option>
                    <option value="workshop">Workshop / Bootcamp</option>
                  </select>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Domain Track</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    placeholder="e.g. AI & Data Intelligence"
                    value={eventForm.domainLabel}
                    onChange={(e) => setEventForm({ ...eventForm, domainLabel: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label className="admin-form-label">Date Display</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    placeholder="e.g. 20th - 21st Oct, 2026"
                    value={eventForm.dateDisplay}
                    onChange={(e) => setEventForm({ ...eventForm, dateDisplay: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Prize Pool / Fee</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    placeholder="e.g. ₹35,000 / Free"
                    value={eventForm.pricePool}
                    onChange={(e) => setEventForm({ ...eventForm, pricePool: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Tagline & Description</label>
                <textarea
                  className="admin-form-textarea"
                  rows="3"
                  placeholder="Short description of challenges and tasks..."
                  value={eventForm.tagline}
                  onChange={(e) => setEventForm({ ...eventForm, tagline: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Banner Image URL</label>
                <input
                  type="url"
                  className="admin-form-input"
                  placeholder="https://images.unsplash.com/..."
                  value={eventForm.image}
                  onChange={(e) => setEventForm({ ...eventForm, image: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <button type="button" className="btn-glass" onClick={() => setEventModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary">
                  {editingEvent ? 'Save Event' : 'Create Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========== MODAL: ADD ACHIEVEMENT ========== */}
      {achModalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setAchModalOpen(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal__header">
              <h3 className="admin-modal__title">Add Milestone or Honor</h3>
              <button className="admin-modal__close" onClick={() => setAchModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleSaveAchievement}>
              <div className="admin-form-group">
                <label className="admin-form-label">Milestone Title *</label>
                <input
                  type="text"
                  className="admin-form-input"
                  placeholder="e.g. 1st Place - SIH 2026..."
                  value={achForm.title}
                  onChange={(e) => setAchForm({ ...achForm, title: e.target.value })}
                  required
                />
              </div>

              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label className="admin-form-label">Category</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    placeholder="e.g. National Hackathon"
                    value={achForm.category}
                    onChange={(e) => setAchForm({ ...achForm, category: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Badge Label</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    placeholder="e.g. 🏆 1st Place"
                    value={achForm.badge}
                    onChange={(e) => setAchForm({ ...achForm, badge: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Description</label>
                <textarea
                  className="admin-form-textarea"
                  rows="3"
                  placeholder="What was built or accomplished..."
                  value={achForm.desc}
                  onChange={(e) => setAchForm({ ...achForm, desc: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <button type="button" className="btn-glass" onClick={() => setAchModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Add Milestone</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========== MODAL: VIEW TEAM ROSTER ========== */}
      {teamModalData && (
        <div className="admin-modal-backdrop" onClick={() => setTeamModalData(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal__header">
              <div>
                <h3 className="admin-modal__title">{teamModalData.teamName || 'Team Details'}</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--orange)' }}>{teamModalData.event || 'General'} · {teamModalData.id}</span>
              </div>
              <button className="admin-modal__close" onClick={() => setTeamModalData(null)}>✕</button>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '14px' }}>
                <span className={`badge-status badge-status--${teamModalData.status.toLowerCase()}`}>
                  {teamModalData.status}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Registered on: {teamModalData.registeredAt ? new Date(teamModalData.registeredAt).toLocaleString() : 'N/A'}
                </span>
              </div>

              <h4 style={{ color: 'var(--cream)', fontSize: '1rem', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '6px' }}>
                Team Members ({teamModalData.members ? teamModalData.members.length : 0})
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {teamModalData.members &&
                  teamModalData.members.map((m, idx) => (
                    <div
                      key={m.id || idx}
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '12px',
                        padding: '14px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span style={{ fontWeight: '700', color: 'var(--cream)' }}>
                          {m.name} {idx === 0 && <span style={{ color: 'var(--orange)', fontSize: '0.75rem' }}>(Lead)</span>}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{m.year}</span>
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                        ✉️ {m.email} {m.phone ? ` · 📞 ${m.phone}` : ''}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        🎓 {m.department}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                className="btn-glass"
                onClick={() => {
                  handleStatusChange(teamModalData.id, teamModalData.status === 'Approved' ? 'Pending' : 'Approved');
                  setTeamModalData(null);
                }}
              >
                Toggle {teamModalData.status === 'Approved' ? 'Pending' : 'Approved'}
              </button>
              <button className="btn-primary" onClick={() => setTeamModalData(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* ========== MODAL: PREVIEW BLOG ========== */}
      {previewBlog && (
        <div className="admin-modal-backdrop" onClick={() => setPreviewBlog(null)}>
          <div className="admin-modal" style={{ maxWidth: '750px' }} onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal__header">
              <span style={{ color: '#34D399', fontSize: '0.8rem', fontWeight: '700' }}>{previewBlog.category}</span>
              <button className="admin-modal__close" onClick={() => setPreviewBlog(null)}>✕</button>
            </div>

            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--cream)', fontSize: '1.8rem', marginBottom: '12px' }}>
                {previewBlog.title}
              </h2>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                By {previewBlog.author} · {previewBlog.date} · {previewBlog.readTime}
              </div>

              {previewBlog.image && (
                <img
                  src={previewBlog.image}
                  alt={previewBlog.title}
                  style={{ width: '100%', maxHeight: '280px', objectFit: 'cover', borderRadius: '14px', marginBottom: '20px' }}
                />
              )}

              <p style={{ fontSize: '1rem', color: 'var(--cream)', lineHeight: '1.7', fontStyle: 'italic', marginBottom: '20px' }}>
                {previewBlog.desc}
              </p>

              <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {previewBlog.content || previewBlog.desc}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button className="btn-primary" onClick={() => setPreviewBlog(null)}>Close Preview</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
