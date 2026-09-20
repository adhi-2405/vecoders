import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { renderGlowLetters } from '../components/GlowText';

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
  const trackRef = useRef(null);
  const pinWrapRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero content fade-in
      gsap.fromTo(
        '#timelineHeroContent',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.2 }
      );

      // Horizontal Timeline Scroll
      const track = trackRef.current;
      const pinWrap = pinWrapRef.current;

      if (track && pinWrap) {
        const totalWidth = track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: -totalWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: '#timelineScroll',
            pin: true,
            scrub: 1,
            end: () => '+=' + (totalWidth + 300),
            invalidateOnRefresh: true,
          },
        });

        // Timeline line progress
        gsap.fromTo(
          '#timelineLine',
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '#timelineScroll',
              start: 'top top',
              end: 'bottom bottom',
              scrub: true,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const timelineYears = [
    {
      year: '2026',
      title: 'The Apex Year',
      desc: "Under the leadership of Current President Abishek.R, VECODERS scales to unprecedented heights with national-level hackathons, 36+ active members, enterprise alliances, and a fully revamped digital ecosystem. Code Arena stands as the college's marquee tech battleground.",
      themeColor: '#EF6522',
      glowColor: 'rgba(239, 101, 34, 0.25)',
      president: {
        name: 'Abishek.R',
        role: 'Current President',
        title: 'Current President of VECODERS',
        image: '/current president.png',
      },
      tags: ['Current Leadership', '500+ Members', 'National Hackathons', 'Code Arena'],
    },
    {
      year: '2025',
      title: 'Scaling Innovation',
      desc: 'Spearheaded by Third President Sanjaikumar K, VECODERS launched the specialized AI/ML vertical, hosted premier inter-college hackathons with 30+ teams, and established cutting-edge cloud computing workshops with industry alliances.',
      themeColor: '#06b6d4',
      glowColor: 'rgba(6, 182, 212, 0.25)',
      president: {
        name: 'Sanjaikumar K',
        role: 'Third President',
        title: '3rd President of VECODERS',
        image: '/thirdpresident.jpeg',
      },
      tags: ['Third President', 'AI/ML Vertical', 'Inter-College Hackathons', 'Cloud Workshops'],
    },
    {
      year: '2024',
      title: 'Building Momentum',
      desc: 'Under the tenure of Second President Kogulmurugaiah, the official web portal was born and domain-based specialization teams were introduced across Web Dev, AI, Cybersecurity, and Design, growing the community to 20+ active developers.',
      themeColor: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.25)',
      president: {
        name: 'Kogulmurugaiah',
        role: 'Second President',
        title: '2nd President of VECODERS',
        image: '/second president.png',
      },
      tags: ['Second President', 'Domain Teams', 'Web Platform', '200+ Coders'],
    },
    {
      year: '2023',
      title: 'The First Spark',
      desc: 'Founded and ignited under First President Vasanthakumar.VK, VECODERS took its historic initial steps: launching foundational bootcamps, creating the official GitHub organization, and onboarding the pioneering cohort of 80 tech enthusiasts.',
      themeColor: '#a855f7',
      glowColor: 'rgba(168, 85, 247, 0.25)',
      president: {
        name: 'Vasanthakumar.VK',
        role: 'First President',
        title: '1st President of VECODERS',
        image: '/first president.jpeg',
      },
      tags: ['First President', 'Foundation & Ignition', 'GitHub Org', '80 Pioneers'],
    },
  ];

  return (
    <div className="timeline-page">
      {/* ========== TIMELINE HERO ========== */}
      <section className="timeline-hero" id="timelineHero">
        <svg className="timeline-hero__svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d="M -5 50 C 25 0, 25 100, 50 50 C 75 0, 75 100, 105 50"
            fill="none"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="0.5"
            strokeDasharray="2 2"
          />
          <circle cx="50" cy="50" r="0.8" fill="rgba(255, 255, 255, 0.6)" />
        </svg>

        <div className="timeline-hero__glow-bl" />
        <div className="timeline-hero__glow-br" />

        <div className="timeline-hero__content" id="timelineHeroContent">
          <div className="timeline-hero__title-wrap">
            <h1>
              {renderGlowLetters('VECODERS', 'glow-orange')}
            </h1>
            <p className="timeline-hero__subtitle" style={{ letterSpacing: '6px' }}>
              {renderGlowLetters('TIMELINE', 'glow-orange')}
            </p>
          </div>
        </div>
      </section>

      {/* ========== TIMELINE SCROLL ========== */}
      <section className="timeline-scroll" id="timelineScroll">
        <div className="timeline-scroll__pin-wrap" id="timelinePinWrap" ref={pinWrapRef}>
          <div className="timeline-scroll__track" id="timelineTrack" ref={trackRef}>
            {timelineYears.map((item) => (
              <div className="timeline-scroll__year" data-year={item.year} key={item.year}>
                <div className="timeline-card" style={{ '--card-theme': item.themeColor }}>
                  <div
                    className="timeline-card__ambient-glow"
                    style={{ background: item.glowColor }}
                  />

                  {/* Left Column: Milestone Narrative */}
                  <div className="timeline-card__content">
                    <div className="timeline-card__header">
                      <div className="timeline-card__year-badge">{item.year}</div>
                      <span className="timeline-card__role-pill">
                        {item.president.role}
                      </span>
                    </div>

                    <div className="timeline-card__text-block">
                      <h3 className="timeline-card__title">{item.title}</h3>
                      <p className="timeline-card__desc">{item.desc}</p>
                    </div>

                    <div className="timeline-card__tags">
                      {item.tags.map((tag, idx) => (
                        <span className="timeline-card__tag" key={idx}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: President Showcase */}
                  <div className="timeline-card__leader">
                    <div className="timeline-leader__frame">
                      <div
                        className="timeline-leader__glow"
                        style={{ background: item.glowColor }}
                      />
                      <img
                        src={encodeURI(item.president.image)}
                        alt={`${item.president.name} - ${item.president.title}`}
                        className="timeline-leader__img"
                        loading="lazy"
                      />
                      <div className="timeline-leader__gradient-overlay" />
                      <div className="timeline-leader__info">
                        <span className="timeline-leader__badge">
                          {item.president.role}
                        </span>
                        <h4 className="timeline-leader__name">{item.president.name}</h4>
                        <p className="timeline-leader__title">{item.president.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dashed line */}
        <div className="timeline-scroll__line" id="timelineLine" />
      </section>
    </div>
  );
}
