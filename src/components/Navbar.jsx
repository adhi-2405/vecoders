import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Store } from '../data/store';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => Store.isAdminAuthenticated());

  useEffect(() => {
    const handleAuth = () => {
      setIsAdminLoggedIn(Store.isAdminAuthenticated());
    };
    window.addEventListener('vecoders_store_update', handleAuth);
    return () => window.removeEventListener('vecoders_store_update', handleAuth);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* ========== NAVBAR ========== */}
      <nav className="navbar" id="navbar">
        <Link to="/" className="navbar__brand" onClick={closeMobileMenu}>
          <img src="/logo.png" alt="VECODERS Logo" className="navbar__logo" onError={(e) => { e.target.style.display = 'none'; }} />
          <span className="navbar__name">VECODERS</span>
        </Link>

        {/* Centre nav pill */}
        <div className="navbar__center">
          <ul className="navbar__links" id="navLinks">
            <li>
              <NavLink 
                to="/about" 
                style={({ isActive }) => isActive ? { color: 'var(--orange)' } : undefined}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/events" 
                style={({ isActive }) => isActive ? { color: 'var(--orange)' } : undefined}
              >
                Events
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/blog" 
                style={({ isActive }) => isActive ? { color: 'var(--orange)' } : undefined}
              >
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/timeline" 
                style={({ isActive }) => isActive ? { color: 'var(--orange)' } : undefined}
              >
                Timeline
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/achievements" 
                style={({ isActive }) => isActive ? { color: 'var(--orange)' } : undefined}
              >
                Achievements
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Right buttons */}
        <div className="navbar__right">
          <button className="btn-glass" aria-label="Utilities">
            <svg width="16" height="16" viewBox="0 0 512 512" fill="currentColor">
              <path d="M432 320h-32a16 16 0 0 0-16 16v112H64V128h144a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16H48A48 48 0 0 0 0 112v352a48 48 0 0 0 48 48h352a48 48 0 0 0 48-48V336a16 16 0 0 0-16-16zM488 0H360c-21.37 0-32 25.91-17 41l35.73 35.73L135 320.37a24 24 0 0 0 0 34L157.67 377a24 24 0 0 0 34 0l243.61-243.68L471 169c15 15 41 4.5 41-17V24a24 24 0 0 0-24-24z" />
            </svg>
          </button>
          <Link to="/admin">
            <button className="btn-glass btn-admin-nav" id="btnAdminNav">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              <span>Admin</span>
              {isAdminLoggedIn && (
                <span className="navbar-admin-status-dot" title="Authenticated Session Active" />
              )}
            </button>
          </Link>
          {isAdminLoggedIn && (
            <button
              className="btn-glass"
              style={{
                color: '#F87171',
                borderColor: 'rgba(239, 68, 68, 0.45)',
                background: 'rgba(239, 68, 68, 0.12)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                fontSize: '0.85rem',
                fontWeight: '600'
              }}
              onClick={() => {
                Store.logoutAdmin();
                window.location.href = '/admin';
              }}
              title="Log Out of Admin Session"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Log Out
            </button>
          )}
          <Link to="/register">
            <button className="btn-glass" id="btnRegister">Register</button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <div 
          className={`navbar__hamburger ${mobileMenuOpen ? 'active' : ''}`} 
          id="hamburger" 
          aria-label="Menu"
          onClick={toggleMobileMenu}
        >
          <span></span><span></span><span></span>
        </div>
      </nav>

      {/* Mobile nav */}
      <div className={`navbar__mobile ${mobileMenuOpen ? 'active' : ''}`} id="mobileNav">
        <Link to="/about" onClick={closeMobileMenu}>About</Link>
        <Link to="/events" onClick={closeMobileMenu}>Events</Link>
        <Link to="/blog" onClick={closeMobileMenu}>Blog</Link>
        <Link to="/timeline" onClick={closeMobileMenu}>Timeline</Link>
        <Link to="/achievements" onClick={closeMobileMenu}>Achievements</Link>
        <Link to="/admin" onClick={closeMobileMenu} style={{ color: 'var(--orange)', fontWeight: '600' }}>⚡ Admin Dashboard</Link>
        {isAdminLoggedIn && (
          <button
            className="btn-glass"
            style={{ color: '#F87171', borderColor: 'rgba(239, 68, 68, 0.4)', marginTop: '8px', width: '100%', justifyContent: 'center' }}
            onClick={() => {
              Store.logoutAdmin();
              closeMobileMenu();
              window.location.href = '/admin';
            }}
          >
            🚪 Log Out (Admin)
          </button>
        )}
        <Link to="/register" className="btn-primary" style={{ marginTop: '12px', justifyContent: 'center' }} onClick={closeMobileMenu}>
          Register for Events
        </Link>
      </div>
    </>
  );
}
