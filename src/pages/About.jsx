import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function renderGlowLetters(text) {
  return text.split('').map((char, idx) => {
    if (char === ' ') {
      return ' ';
    }
    return (
      <span key={idx} className="hover-glow-letter">
        {char}
      </span>
    );
  });
}

export default function About() {
  const patronTrackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.fromTo(
        '#aboutHeroTitle',
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.2 }
      );
      gsap.fromTo(
        '#aboutHeroDesc',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.6 }
      );

      // Scroll-driven sticky stats
      const items = document.querySelectorAll('.about-stat-item, .about-stat-bento');
      const card = document.getElementById('aboutStatsCard');

      if (card && items.length > 0) {
        const totalItems = items.length;

        ScrollTrigger.create({
          trigger: '.about-stats-sticky',
          start: 'top top',
          end: 'bottom bottom',
          pin: card,
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const idx = Math.min(Math.floor(progress * totalItems), totalItems - 1);
            items.forEach((item, i) => {
              if (i === idx) {
                item.style.opacity = '1';
                item.style.transform = 'translate(-50%, -50%) translateY(0)';
              } else {
                item.style.opacity = '0';
                item.style.transform =
                  i < idx
                    ? 'translate(-50%, -50%) translateY(-50px)'
                    : 'translate(-50%, -50%) translateY(50px)';
              }
            });
          },
        });
      }

      // Patron card reveal
      gsap.to('.about-patrons__card', {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about-patrons', start: 'top 85%' },
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollPatrons = (direction) => {
    if (patronTrackRef.current) {
      const scrollAmount = 320;
      patronTrackRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="about-page">
      {/* ========== ABOUT HERO ========== */}
      <section className="about-page-hero">
        <div className="about-page-hero__glow-tr" />
        <div className="about-page-hero__glow-tl" />

        <div className="about-page-hero__text">
          <h1 className="about-page-hero__title" id="aboutHeroTitle">
            <span className="about-title-line">
              {renderGlowLetters('SINCE')}
            </span>
            <span className="about-title-line">
              {renderGlowLetters('2022')}
            </span>
          </h1>
          <div className="about-page-hero__desc-wrap" id="aboutHeroDesc">
            <p className="about-page-hero__desc">
              {renderGlowLetters(
                "Established in 2022 at Valliammai Engineering College, VECODERS emerged as a visionary initiative spearheaded by a cohort of passionate technophiles intent on redefining what a student tech community could achieve. What began as a quest for innovation and collaboration has since blossomed into one of the college's foremost student-driven platforms, nurturing creativity, critical thinking, and tangible real-world impact. Today, VECODERS continues to inspire the innovators of tomorrow through hands-on workshops, hackathons, and strategic alliances with industry leaders."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* ========== SCROLL-DRIVEN STATS ========== */}
      <section className="about-stats-section">
        <div className="about-stats-section__inner">
          <div className="about-stats-sticky" style={{ height: '500vh' }}>
            <div className="about-stats-sticky__card" id="aboutStatsCard">
              <div className="about-stats-sticky__glow-left" />
              <div className="about-stats-sticky__glow-right" />

              <div className="about-stats-sticky__content" id="aboutStatsContent">
                {/* Stat items cycled via GSAP */}
                <div className="about-stat-item active" data-index="0">
                  <h2>500+ Members</h2>
                </div>
                <div className="about-stat-item" data-index="1">
                  <h2>120+ Projects</h2>
                </div>
                <div className="about-stat-item" data-index="2">
                  <h2>25+ Hackathons</h2>
                </div>
                <div className="about-stat-item" data-index="3">
                  <h2>80+ Workshops</h2>
                </div>
                <div className="about-stat-item" data-index="4">
                  <h2>8 Domains</h2>
                </div>

                {/* Final bento grid */}
                <div className="about-stat-bento" data-index="5">
                  <div className="about-stat-bento__row">
                    <div className="about-stat-bento__cell about-stat-bento__cell--wide">
                      <h2>Hackathons, Workshops, Tech Talks, Bootcamps</h2>
                      <p>Initiatives and much more...</p>
                    </div>
                    <div className="about-stat-bento__cell">
                      <h2>500+</h2>
                      <p>Active Members</p>
                    </div>
                  </div>
                  <div className="about-stat-bento__row">
                    <div className="about-stat-bento__cell">
                      <h2>120+</h2>
                      <p>Projects Built</p>
                    </div>
                    <div className="about-stat-bento__cell about-stat-bento__cell--trio">
                      <div className="about-stat-bento__mini">
                        <h3>25+</h3>
                        <p>Hackathons</p>
                      </div>
                      <div className="about-stat-bento__mini">
                        <h3>8</h3>
                        <p>Domains</p>
                      </div>
                      <div className="about-stat-bento__mini">
                        <h3>5+</h3>
                        <p>Years</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== OUR PATRONS ========== */}
      <section className="about-patrons" id="aboutPatrons">
        <div className="container">
          <h2 className="about-patrons__title">OUR PATRONS</h2>
          <div className="about-patrons__scroll-area">
            <div className="about-patrons__track" id="patronTrack" ref={patronTrackRef}>
              <div className="about-patrons__card">
                <div className="about-patrons__card-inner">
                  <div className="about-patrons__card-gradient" />
                  <div className="about-patrons__card-info">
                    <h3>Dr. Principal</h3>
                    <p>Chief Patron, Principal</p>
                  </div>
                </div>
              </div>
              <div className="about-patrons__card">
                <div className="about-patrons__card-inner">
                  <div className="about-patrons__card-gradient" />
                  <div className="about-patrons__card-info">
                    <h3>Dr. HOD CSE</h3>
                    <p>Head of Department, CSE</p>
                  </div>
                </div>
              </div>
              <div className="about-patrons__card">
                <div className="about-patrons__card-inner">
                  <div className="about-patrons__card-gradient" />
                  <div className="about-patrons__card-info">
                    <h3>Prof. Faculty Advisor</h3>
                    <p>Faculty Coordinator — VECODERS</p>
                  </div>
                </div>
              </div>
              <div className="about-patrons__card">
                <div className="about-patrons__card-inner">
                  <div className="about-patrons__card-gradient" />
                  <div className="about-patrons__card-info">
                    <h3>Prof. Mentor</h3>
                    <p>Technical Mentor</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="about-patrons__nav">
              <button
                className="about-patrons__nav-btn"
                id="patronPrev"
                aria-label="Scroll left"
                onClick={() => scrollPatrons('left')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 8L2 12L6 16" />
                  <path d="M2 12H22" />
                </svg>
              </button>
              <button
                className="about-patrons__nav-btn"
                id="patronNext"
                aria-label="Scroll right"
                onClick={() => scrollPatrons('right')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8L22 12L18 16" />
                  <path d="M2 12H22" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
