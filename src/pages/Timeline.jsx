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
      desc: "VECODERS reaches new heights with national-level hackathons, 500+ active members, industry partnerships, and a fully revamped digital presence. Code Arena becomes the college's marquee tech event.",
      gradients: [
        'linear-gradient(135deg, #EF6522 0%, #8B5CF6 100%)',
        'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
      ],
    },
    {
      year: '2025',
      title: 'Scaling Innovation',
      desc: 'Launched the AI/ML vertical, hosted first inter-college hackathon with 30+ teams, and established cloud computing workshops with AWS partnerships. VECODERS branded merch goes live.',
      gradients: [
        'linear-gradient(135deg, #06b6d4 0%, #8B5CF6 100%)',
        'linear-gradient(135deg, #f97316 0%, #ef4444 100%)',
      ],
    },
    {
      year: '2024',
      title: 'Building Momentum',
      desc: 'First official website launched. Introduced domain-based teams: Web Dev, AI, Cybersecurity, Design. Monthly tech talks and weekly coding sessions become tradition. 200+ members strong.',
      gradients: [
        'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
        'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
      ],
    },
    {
      year: '2023',
      title: 'The First Spark',
      desc: 'Organized the inaugural coding bootcamp and workshop series. Created GitHub organization and started collaborative open-source projects. First batch of 80 members onboarded.',
      gradients: [
        'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
        'linear-gradient(135deg, #22d3ee 0%, #818cf8 100%)',
      ],
    },
    {
      year: '2022',
      title: 'Post-COVID Renaissance',
      desc: 'Back on campus after the pandemic. Small group of passionate coders begin meeting in the CS lab. The seed of what would become VECODERS is planted — driven by a shared love for building things.',
      gradients: ['linear-gradient(135deg, #e11d48 0%, #be185d 100%)'],
    },
    {
      year: '2019',
      title: 'Where It All Began',
      desc: 'A group of 15 students at Valliammai Engineering College envisioned a community where coding meets creativity. VECODERS was born — with a mission to go "Beyond Code. Beyond Limits."',
      gradients: ['linear-gradient(135deg, #EF6522 0%, #FFE400 100%)'],
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
                <div className="timeline-scroll__year-number">{item.year}</div>
                <div className="timeline-scroll__year-content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
                <div className="timeline-scroll__year-gallery">
                  {item.gradients.map((grad, i) => (
                    <div
                      className="timeline-scroll__gallery-img"
                      style={{ background: grad }}
                      key={i}
                    />
                  ))}
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
