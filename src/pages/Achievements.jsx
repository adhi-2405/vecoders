import React from 'react';
import { Link } from 'react-router-dom';

export default function Achievements() {
  const achievements = [
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

  return (
    <div className="achievements-page">
      {/* ========== ACHIEVEMENTS HERO ========== */}
      <section className="blogs-page-hero">
        <div className="blogs-page-hero__glow-tr" />
        <div className="blogs-page-hero__glow-tl" />
        <div className="blogs-page-hero__title-wrap" id="blogsHeroTitle">
          <h1>
            <span className="blogs-page-hero__white">V</span>
            <span className="blogs-page-hero__accent">E</span>
            <span className="blogs-page-hero__white">CODERS</span>
          </h1>
          <h2>ACHIEVEMENTS</h2>
        </div>
      </section>

      {/* ========== ACHIEVEMENTS CONTENT ========== */}
      <section className="blogs-page-content" style={{ minHeight: '60vh' }}>
        <div className="container">
          <h2 className="blogs-page__section-title">Our Milestones & Accolades</h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '24px',
              marginTop: '40px',
            }}
          >
            {achievements.map((item) => (
              <div
                key={item.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '20px',
                  padding: '30px 24px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'transform 0.3s, border-color 0.3s',
                }}
              >
                <div
                  style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    borderRadius: '50px',
                    background: 'rgba(239, 101, 34, 0.12)',
                    color: 'var(--orange)',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    marginBottom: '16px',
                  }}
                >
                  {item.badge}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.2rem',
                    color: 'var(--cream)',
                    marginBottom: '10px',
                    lineHeight: '1.4',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.88rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6',
                    marginBottom: '20px',
                  }}
                >
                  {item.desc}
                </p>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    paddingTop: '14px',
                  }}
                >
                  <span>{item.category}</span>
                  <span>{item.date}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <Link to="/events" className="btn-primary">
              Join Our Next Challenge
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
