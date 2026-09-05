import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Store } from '../data/store';
import { renderGlowLetters } from './GlowText';

export default function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');

    if (!username.trim() || !password.trim()) {
      setErrorMessage('Please enter both Access ID and Security Passkey.');
      triggerShake();
      return;
    }

    setIsLoading(true);

    // Simulate cryptographic verification
    setTimeout(() => {
      const result = Store.loginAdmin(username, password, rememberMe);

      if (result.success) {
        setIsSuccess(true);
        setIsLoading(false);
        setTimeout(() => {
          if (onLoginSuccess) {
            onLoginSuccess(result.session);
          }
        }, 500);
      } else {
        setIsLoading(false);
        setErrorMessage(result.error || 'Authentication rejected: Invalid credentials.');
        triggerShake();
      }
    }, 450);
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const fillDemoCreds = () => {
    const creds = Store.getAdminCredentials();
    setUsername(creds.username || 'admin');
    setPassword(creds.password || 'vecoders2026');
    setErrorMessage('');
  };

  return (
    <div className="admin-login-page">
      {/* Background ambient glow effects */}
      <div className="admin-login-ambient-1" aria-hidden="true" />
      <div className="admin-login-ambient-2" aria-hidden="true" />

      <div className="admin-login-container">
        {/* Return to website link */}
        <div className="admin-login-top-nav">
          <Link to="/" className="admin-login-back-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Return to Public Portal</span>
          </Link>
          <span className="admin-login-node-tag">NODE #VEC-ADMIN-01</span>
        </div>

        {/* Login Card */}
        <div className={`admin-login-card ${shake ? 'admin-login-shake' : ''} ${isSuccess ? 'admin-login-card--success' : ''}`}>
          {/* Top Lock Icon Badge */}
          <div className="admin-login-icon-wrap">
            <div className="admin-login-icon-ring" />
            <div className="admin-login-icon-box">
              {isSuccess ? (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              )}
            </div>
          </div>

          {/* Security Badge */}
          <div className="admin-login-badge">
            <span className="dot-live" style={{ width: '7px', height: '7px', background: isSuccess ? '#10B981' : '#EF6522' }} />
            {isSuccess ? 'SECURITY VERIFIED · ACCESS GRANTED' : 'RESTRICTED ACCESS · CENTRAL COMMAND GATE'}
          </div>

          {/* Title */}
          <h1 className="admin-login-title">
            {renderGlowLetters('ADMIN LOGIN', isSuccess ? 'glow-emerald' : 'glow-crimson')}
          </h1>
          <p className="admin-login-subtitle">
            Authenticate to access the VECODERS Command Center & Central Database.
          </p>

          {/* Error Message */}
          {errorMessage && (
            <div className="admin-login-error">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form className="admin-login-form" onSubmit={handleSubmit}>
            {/* Username / Access ID */}
            <div className="admin-login-field">
              <label className="admin-login-label" htmlFor="admin-username">
                Access ID / Username
              </label>
              <div className="admin-login-input-wrap">
                <svg className="admin-login-field-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <input
                  id="admin-username"
                  type="text"
                  className="admin-login-input"
                  placeholder="Enter administrator ID (e.g. admin)"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  autoFocus
                  disabled={isLoading || isSuccess}
                />
              </div>
            </div>

            {/* Password / Security Passkey */}
            <div className="admin-login-field">
              <div className="admin-login-label-row">
                <label className="admin-login-label" htmlFor="admin-password">
                  Security Passkey / Password
                </label>
              </div>
              <div className="admin-login-input-wrap">
                <svg className="admin-login-field-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                </svg>
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  className="admin-login-input"
                  placeholder="Enter security key (e.g. vecoders2026)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  disabled={isLoading || isSuccess}
                />
                <button
                  type="button"
                  className="admin-login-pwd-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Terminal Option */}
            <div className="admin-login-options">
              <label className="admin-login-remember">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isLoading || isSuccess}
                />
                <span className="admin-login-checkbox-custom" />
                <span>Keep session active on this terminal</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`admin-login-submit-btn ${isLoading ? 'loading' : ''} ${isSuccess ? 'success' : ''}`}
              disabled={isLoading || isSuccess}
            >
              {isLoading ? (
                <>
                  <span className="admin-login-spinner" />
                  <span>Verifying Node Credentials...</span>
                </>
              ) : isSuccess ? (
                <>
                  <span>✓ Authenticated · Entering Command Center</span>
                </>
              ) : (
                <>
                  <span>Authenticate & Enter Central Hub</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Helper */}
          <div className="admin-login-demo-box">
            <div className="admin-login-demo-header">
              <span>⚡ Quick Demo Credentials</span>
              <button
                type="button"
                className="admin-login-demo-btn"
                onClick={fillDemoCreds}
              >
                Auto-fill
              </button>
            </div>
            <div className="admin-login-demo-creds">
              <code>ID: <strong>admin</strong></code>
              <span className="admin-login-demo-divider">•</span>
              <code>Pass: <strong>vecoders2026</strong></code>
            </div>
          </div>

          {/* Security Notice */}
          <div className="admin-login-footer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>256-bit Encrypted Session · Authorized Personnel Only</span>
          </div>
        </div>
      </div>
    </div>
  );
}
