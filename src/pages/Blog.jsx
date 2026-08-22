import React from 'react';

export default function Blog() {
  const blogs = [
    {
      id: 1,
      title: 'The Art of Clean Code',
      desc: "Writing clean, maintainable code is more than a skill — it's a craft. Discover how VECODERS members approach software quality, design patterns, and the elegance of simplicity...",
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
      date: 'August 10, 2026',
      time: '05:30 PM',
    },
    {
      id: 2,
      title: 'AI Revolution on Campus',
      desc: 'How large language models, agentic workflows, and local AI deployment are transforming classroom projects into industry-grade startups.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80',
      date: 'July 28, 2026',
      time: '03:15 PM',
    },
    {
      id: 3,
      title: 'From Idea to Production',
      desc: 'A comprehensive retrospective on shipping Code Arena: architecting cloud microservices, zero-downtime deployments, and edge CDNs.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
      date: 'July 14, 2026',
      time: '06:00 PM',
    },
    {
      id: 4,
      title: 'Designing for Humans',
      desc: 'Why micro-interactions, dark glassmorphism, and spatial UX hierarchy matter in winning collegiate design competitions.',
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80',
      date: 'June 30, 2026',
      time: '04:45 PM',
    },
    {
      id: 5,
      title: 'The Open Source Mindset',
      desc: 'Demystifying your first pull request. How contributing to open source can unlock high-impact internship opportunities and global networks.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
      date: 'June 18, 2026',
      time: '02:00 PM',
    },
    {
      id: 6,
      title: 'Building High-Throughput Systems',
      desc: 'Lessons from stress-testing our tournament evaluation engine under 10,000 concurrent submissions using Go and Redis.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
      date: 'May 25, 2026',
      time: '07:30 PM',
    },
  ];

  return (
    <div className="blogs-page">
      {/* ========== BLOGS HERO ========== */}
      <section className="blogs-page-hero">
        <div className="blogs-page-hero__glow-tr" />
        <div className="blogs-page-hero__glow-tl" />
        <div className="blogs-page-hero__title-wrap" id="blogsHeroTitle">
          <h1>
            <span className="blogs-page-hero__white">V</span>
            <span className="blogs-page-hero__accent">E</span>
            <span className="blogs-page-hero__white">CODERS</span>
          </h1>
          <h2>BLOGS</h2>
        </div>
      </section>

      {/* ========== BLOGS GRID ========== */}
      <section className="blogs-page-content">
        <div className="container">
          <h2 className="blogs-page__section-title">Our Stories & Insights</h2>

          <div className="blogs-page__grid" id="blogsGrid">
            {blogs.map((b) => (
              <div className="blogs-page__card" key={b.id}>
                <div className="blogs-page__card-inner">
                  <div className="blogs-page__card-spine" />
                  <div className="blogs-page__card-front">
                    <img src={b.image} alt={b.title} />
                    <span className="blogs-page__card-front-title">{b.title}</span>
                    <div className="blogs-page__card-front-fade" />
                  </div>
                  <div className="blogs-page__card-back">
                    <div className="blogs-page__card-back-inner">
                      <h4>{b.title}</h4>
                      <p>
                        {b.desc}{' '}
                        <span className="blogs-page__card-readmore">...Read More</span>
                      </p>
                      <div className="blogs-page__card-meta-tags">
                        <span>{b.date}</span>
                        <span>{b.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
