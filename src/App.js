import React, { useEffect, useRef, useState, useCallback } from 'react';
import './App.css';

/* ------------------------------------------------------------------
   Content — sourced from resume
------------------------------------------------------------------- */
const NAV = [
  ['about', 'About'],
  ['skills', 'Skills'],
  ['experience', 'Experience'],
  ['projects', 'Projects'],
  ['credentials', 'Credentials'],
  ['contact', 'Contact'],
];
const SECTION_IDS = ['home', ...NAV.map(([id]) => id)];

const EMAIL = 'shivaneuva@gmail.com';
const PHONE = '+91 7550300762';

const STATS = [
  ['2+', 'Years of experience'],
  ['4+', 'Full-stack projects delivered'],
  ['15+', 'RESTful APIs built'],
  ['4+', 'Interns mentored'],
];

const FACTS = [
  ['Based in', 'Ariyalur, India'],
  ['Current role', 'Software Engineer, Dian Technology Solutions'],
  ['Core stack', 'React · Next.js · Node.js'],
  ['Database', 'PostgreSQL · MongoDB · MySQL'],
  ['Education', 'B.E. Civil Engineering'],
  ['Focus', 'Full-stack web applications'],
];

const SKILLS = [
  { title: 'Frontend', icon: 'code', tags: ['React.js', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap'] },
  { title: 'Backend', icon: 'server', tags: ['Node.js', 'Express.js', 'RESTful APIs', 'JWT Auth'] },
  { title: 'Databases', icon: 'db', tags: ['PostgreSQL', 'MongoDB', 'MySQL', 'Schema Design', 'Query Optimization'] },
  { title: 'Tools & Platforms', icon: 'tool', tags: ['Git', 'GitHub', 'Docker', 'Postman', 'Vercel', 'Railway', 'CI/CD'] },
];

const MARQUEE = ['React.js', 'Next.js', 'TypeScript', 'Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'MySQL', 'JWT Auth', 'Docker', 'Git', 'Tailwind CSS', 'Vercel', 'REST APIs'];

const EXPERIENCE = [
  {
    role: 'Software Engineer',
    org: 'Dian Technology Solutions',
    period: 'Feb 2026 — Present',
    loc: 'Chennai, India',
    points: [
      'Delivered 4+ full-stack client and internal projects, including production web applications for US-based clients, while meeting deadlines and maintaining code quality.',
      'Built an AI-powered document analysis application that extracts data from PDF files and converts it into interactive charts and dashboards, reducing manual document review effort.',
      'Developed and maintained production applications using React.js, Next.js, Node.js, Express.js, and PostgreSQL — covering frontend, backend APIs, database integration, and deployment.',
      'Served as a primary technical point of contact for clients — gathering requirements, providing updates, troubleshooting issues, and translating business needs into technical solutions.',
      'Mentored and guided 4+ interns through development tasks, code reviews, responsive web development, and project deliverables.',
      'Adopted and implemented WordPress and GoHighLevel (GHL) to support evolving client requirements without delaying delivery.',
      'Collaborated with cross-functional teams to build features, troubleshoot production issues, and deliver maintainable software.',
    ],
  },
  {
    role: 'Full Stack Developer',
    org: 'Crayon Biz LLP',
    period: 'Jan 2025 — Jan 2026',
    loc: 'Chennai, India',
    points: [
      'Developed and enhanced responsive web applications using Next.js and TypeScript, applying component-based architecture for reuse and maintainability.',
      'Designed and developed 15+ RESTful APIs for authentication, dashboards, user management, and frontend integration.',
      'Designed normalized PostgreSQL schemas and implemented targeted indexing to improve query performance for core features.',
      'Refactored a legacy API repository into a modern, testable, and documented codebase, simplifying developer onboarding.',
      'Managed environment configuration, production deployments, and debugging for a live customer-facing application.',
      'Maintained CI/CD pipelines and collaborated in Agile sprints to plan, develop, test, and release features on schedule.',
    ],
  },
  {
    role: 'Career Transition — Software Development',
    period: 'May 2024 — Dec 2024',
    points: ['Transitioned from Civil Engineering to Software Development through structured self-learning and hands-on full-stack application development.'],
  },
  {
    role: 'TULIP Intern',
    org: 'Tirupur Corporation',
    period: 'Nov 2021 — Nov 2022',
    loc: 'Tirupur, India',
    points: ['Participated in a central government internship scheme focused on urban development and municipal operations, gaining experience in structured project execution and public-sector processes.'],
  },
];

const PROJECTS = [
  {
    title: 'User Management System',
    icon: 'lock',
    tech: 'React · Node.js · Express.js · PostgreSQL · JWT',
    desc: 'Full-stack platform with JWT authentication, role-based access control, and an admin dashboard with image upload.',
    link: 'https://github.com/SK8100/Signup-Login-Admin-Panel',
    points: ['CRUD operations with role-based access control', 'Secure password hashing & token refresh', 'Optimized PostgreSQL queries with connection pooling', 'Real-time data sync on admin dashboard'],
  },
  {
    title: 'Smart Bookmark Manager',
    icon: 'bookmark',
    tech: 'Next.js · Supabase · Google OAuth · Tailwind CSS',
    desc: 'Bookmark management app with Google OAuth and real-time sync across browser tabs via Supabase Realtime.',
    link: 'https://github.com/SK8100/smart-bookmark-app',
    points: ['Google OAuth authentication', 'Cross-tab real-time sync with Supabase Realtime', 'PostgreSQL Row-Level Security for data isolation', 'Deployed on Vercel, sub-200ms API responses'],
  },
  {
    title: 'MERN Stack To-Do App',
    icon: 'check',
    tech: 'MongoDB · Express.js · React.js · Node.js · Bootstrap',
    desc: 'Responsive task management app with CRUD operations and persistent storage.',
    link: 'https://github.com/SK8100/MERN-STACK-ToDo',
    points: ['RESTful APIs with validation & error handling middleware', 'React hooks-based interface', 'Cross-browser compatibility with Bootstrap', 'Persistent MongoDB storage'],
  },
];

/* ------------------------------------------------------------------
   Icons (inline SVG, no extra dependency)
------------------------------------------------------------------- */
const P = {
  code: <><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></>,
  server: <><rect x="2" y="3" width="20" height="6" rx="1" /><rect x="2" y="15" width="20" height="6" rx="1" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></>,
  db: <><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></>,
  tool: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />,
  lock: <><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>,
  bookmark: <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />,
  check: <><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></>,
  // terminal prompt — replaces the old arrow for "open repository"
  terminal: <><polyline points="4 17 10 11 4 5" /><line className="term-caret" x1="12" y1="19" x2="20" y2="19" /></>,
  pin: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>,
  mail: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></>,
  phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />,
  linkedin: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>,
  github: <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />,
  globe: <><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>,
  cap: <><path d="M22 10 12 5 2 10l10 5 10-5Z" /><path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" /></>,
  award: <><circle cx="12" cy="8" r="6" /><path d="M15.5 13.5 17 22l-5-3-5 3 1.5-8.5" /></>,
  menu: <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>,
};

const Icon = ({ name, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {P[name]}
  </svg>
);

const BADGE_ICONS = {
  React: <svg viewBox="0 0 24 24" fill="none" stroke="#61dafb" strokeWidth="1.6"><ellipse cx="12" cy="12" rx="10" ry="4.2" /><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" /><circle cx="12" cy="12" r="1.6" fill="#61dafb" /></svg>,
  Node: <svg viewBox="0 0 24 24" fill="none" stroke="#8cc84b" strokeWidth="1.6"><path d="M12 2 3 7v10l9 5 9-5V7z" /><path d="M12 12V2M12 12l9-5M12 12l-9 5" strokeOpacity="0.5" /></svg>,
  TS: <svg viewBox="0 0 24 24" fill="none" stroke="#3178c6" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M9 9h4M11 9v7" /><path d="M15.5 11.2c.4-.4 1-.6 1.6-.5.9.1 1.4.7 1.4 1.3 0 1.4-2.8 1.2-2.8 2.8 0 .7.6 1.3 1.5 1.3.6 0 1.2-.2 1.6-.6" /></svg>,
  PSQL: <svg viewBox="0 0 24 24" fill="none" stroke="#4fd1c5" strokeWidth="1.6"><ellipse cx="12" cy="6" rx="8" ry="3" /><path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" /><path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" /></svg>,
  API: <svg viewBox="0 0 24 24" fill="none" stroke="#6c8cff" strokeWidth="1.6"><path d="M8 3H6a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h2" /><path d="M16 3h2a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2 2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-2" /></svg>,
};
const BADGES = [
  { angle: -20, ring: 1, name: 'React' },
  { angle: 100, ring: 1, name: 'Node' },
  { angle: 200, ring: 1, name: 'TS' },
  { angle: 40, ring: 2, name: 'PSQL' },
  { angle: 160, ring: 2, name: 'API' },
];

/* ------------------------------------------------------------------
   Hooks / helpers
------------------------------------------------------------------- */
const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      el.classList.add('in');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

const Reveal = ({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) => {
  const ref = useReveal();
  return (
    <Tag ref={ref} className={`reveal reveal-stagger ${className}`} style={{ '--d': `${delay}s` }} {...rest}>
      {children}
    </Tag>
  );
};

const SectionHead = ({ tag, title, sub }) => (
  <Reveal className="section-head">
    <span className="section-tag">{tag}</span>
    <h2>{title}</h2>
    {sub && <p>{sub}</p>}
  </Reveal>
);

/* ------------------------------------------------------------------
   Background particle network
------------------------------------------------------------------- */
function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf;
    let particles = [];
    const mouse = { x: null, y: null };
    const linkDist = 130;

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = window.innerWidth < 720 ? 34 : 70;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.6,
      }));
    };

    const tick = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        if (mouse.x !== null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 20000) {
            const f = ((20000 - d2) / 20000) * 0.0004;
            p.vx += dx * f;
            p.vy += dy * f;
          }
        }
        p.vx *= 0.998;
        p.vy *= 0.998;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(79,209,197,0.55)';
        ctx.fill();
      }
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkDist) {
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.strokeStyle = `rgba(108,140,255,${0.14 * (1 - dist / linkDist)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = () => { mouse.x = null; mouse.y = null; };

    setup();
    tick();
    window.addEventListener('resize', setup);
    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', setup);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return <canvas id="bg-canvas" ref={canvasRef} aria-hidden="true" />;
}

/* ------------------------------------------------------------------
   Tech cursor — crosshair reticle that locks onto interactive elements
------------------------------------------------------------------- */
function TechCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine || prefersReducedMotion()) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const root = document.documentElement;
    root.classList.add('has-tech-cursor');

    let mx = -100, my = -100, rx = -100, ry = -100, raf;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      dot.style.opacity = ring.style.opacity = 1;
      ring.classList.toggle('is-link', !!e.target.closest('a, button, [role="button"]'));
    };
    const onLeave = () => { dot.style.opacity = ring.style.opacity = 0; };
    const onDown = () => ring.classList.add('is-down');
    const onUp = () => ring.classList.remove('is-down');

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove('has-tech-cursor');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  return (
    <>
      <div className="tc-ring" ref={ringRef} aria-hidden="true" />
      <div className="tc-dot" ref={dotRef} aria-hidden="true" />
    </>
  );
}

/* ------------------------------------------------------------------
   Project card with tilt + cursor glow
------------------------------------------------------------------- */
function ProjectCard({ project, delay }) {
  const ref = useReveal();
  const canTilt = typeof window !== 'undefined' && !prefersReducedMotion() && window.matchMedia('(pointer: fine)').matches;

  const onMove = (e) => {
    if (!canTilt) return;
    const card = ref.current;
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    card.style.transform = `perspective(700px) rotateX(${(y / r.height - 0.5) * -6}deg) rotateY(${(x / r.width - 0.5) * 6}deg) translateY(-4px)`;
    card.style.setProperty('--gx', `${x}px`);
    card.style.setProperty('--gy', `${y}px`);
  };
  const onLeave = () => {
    if (canTilt) ref.current.style.transform = 'perspective(700px) rotateX(0) rotateY(0) translateY(0)';
  };

  return (
    <div
      ref={ref}
      className="project-card reveal reveal-stagger"
      style={{ '--d': `${delay}s` }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="project-glow" />
      <div className="pj-top">
        <div className="pj-icon"><Icon name={project.icon} /></div>
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="pj-link" aria-label={`Open ${project.title} repository`} title="Open repository">
          <Icon name="terminal" size={18} />
        </a>
      </div>
      <h3>{project.title}</h3>
      <div className="pj-tech">{project.tech}</div>
      <p className="pj-desc">{project.desc}</p>
      <ul className="pj-highlights">
        {project.points.map((p) => <li key={p}>{p}</li>)}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------
   Main component
------------------------------------------------------------------- */
export default function App() {
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [toast, setToast] = useState(false);
  const [narrow, setNarrow] = useState(typeof window !== 'undefined' && window.innerWidth < 900);
  const timelineRef = useRef(null);

  const goTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
    setMenuOpen(false);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
      let current = 'home';
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      });
      setActive(current);
    };
    const onResize = () => setNarrow(window.innerWidth < 900);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // timeline line draw-in
  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('in'); io.disconnect(); }
    }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const copyEmail = () => {
    const done = () => { setToast(true); setTimeout(() => setToast(false), 2200); };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(EMAIL).then(done).catch(() => { window.location.href = `mailto:${EMAIL}`; });
    } else {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const marqueeItems = [...MARQUEE, ...MARQUEE];

  return (
    <>
      <TechCursor />
      <ParticleBackground />
      <div className="bg-gradient" />
      <div className="grain" />

      <div className="progress-rail"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>

      {/* Nav */}
      <nav>
        <div className="nav-inner">
          <div className="logo"><span className="logo-mark">ST</span> Sivaramakrishnan</div>
          <div className="nav-links">
            {NAV.map(([id, label]) => (
              <button key={id} className={`${active === id ? 'active' : ''} ${id === 'contact' ? 'nav-cta' : ''}`} onClick={() => goTo(id)}>
                {label}
              </button>
            ))}
          </div>
          <button className="menu-btn" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((o) => !o)}>
            <Icon name="menu" />
          </button>
        </div>
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          {NAV.map(([id, label]) => <button key={id} onClick={() => goTo(id)}>{label}</button>)}
        </div>
      </nav>

      {/* Hero */}
      <section className="hero" id="home">
        <div className="wrap hero-inner">
          <div className="hero-text">
            <div className="eyebrow-row">
              <span className="status-dot" />
              <span className="eyebrow-text">Open to <span className="hl">full-stack</span> opportunities</span>
            </div>
            <h1>Building reliable <span className="grad">web applications</span> end to end.</h1>
            <p className="hero-role">Full Stack Developer — React.js · Next.js · Node.js · PostgreSQL</p>
            <p className="hero-desc">Two years of shipping production applications for real users and clients — from database schema to deployed interface. I care about clean APIs, sound data models, and interfaces that don't get in the way.</p>
            <div className="hero-cta">
              <button className="btn btn-primary" onClick={() => goTo('projects')}>View my work</button>
              <button className="btn btn-ghost" onClick={() => goTo('contact')}>Get in touch</button>
            </div>
            <div className="hero-meta-row">
              <span className="hero-meta-item"><Icon name="pin" size={15} /> Ariyalur, India</span>
              <a href={`mailto:${EMAIL}`} className="hero-meta-item"><Icon name="mail" size={15} /> {EMAIL}</a>
              <a href="tel:+917550300762" className="hero-meta-item"><Icon name="phone" size={15} /> {PHONE}</a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="orbit-ring r1" />
            <div className="orbit-ring r2" />
            <div className="photo-frame">
              <img src={`${process.env.PUBLIC_URL}/siva_photo.jpg`} alt="Portrait of Sivaramakrishnan T" />
              <div className="photo-scan" />
            </div>
            {BADGES.map((b) => {
              const radius = b.ring === 1 ? (narrow ? 145 : 170) : (narrow ? 170 : 200);
              const rad = (b.angle * Math.PI) / 180;
              return (
                <div
                  key={b.name}
                  className="orbit-badge"
                  title={b.name}
                  style={{ left: `calc(50% + ${radius * Math.cos(rad) - 23}px)`, top: `calc(50% + ${radius * Math.sin(rad) - 23}px)` }}
                >
                  {BADGE_ICONS[b.name]}
                </div>
              );
            })}
            <div className="code-float mono" aria-hidden="true">
              <span className="k">const</span> dev = {'{'}<br />
              &nbsp;&nbsp;name: <span className="s">"Sivaramakrishnan T"</span>,<br />
              &nbsp;&nbsp;role: <span className="s">"Full Stack Dev"</span>,<br />
              &nbsp;&nbsp;stack: [<span className="p">"React"</span>, <span className="p">"Node"</span>, <span className="p">"PSQL"</span>]<br />
              {'};'}<span className="code-caret" />
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section-pad" id="about">
        <div className="wrap">
          <SectionHead tag="01 · About" title="From civil engineering to full-stack development" />
          <div className="about-grid">
            <Reveal className="about-text">
              <p>I'm a Full Stack Developer with <strong>two years of professional experience</strong> designing, building, and deploying production web applications using <strong>React.js, Next.js, TypeScript, Node.js, Express.js, and PostgreSQL</strong>. My work spans RESTful API development, relational database design, JWT authentication, performance optimization, and managing real production deployments.</p>
              <p>My path here wasn't conventional — I hold a <strong>Bachelor's degree in Civil Engineering</strong> from Anna University, and made a deliberate transition into software development in 2024 through structured self-learning and hands-on full-stack projects.</p>
              <p>Today, I work as a Software Engineer at <strong>Dian Technology Solutions</strong>, where I build client-facing applications, serve as a technical point of contact for US-based clients, and mentor junior developers — while continuing to write the code myself.</p>
              <div className="stat-row">
                {STATS.map(([n, l]) => (
                  <div className="stat-card" key={l}><div className="stat-num">{n}</div><div className="stat-label">{l}</div></div>
                ))}
              </div>
            </Reveal>
            <Reveal className="about-card">
              <h3>Quick facts</h3>
              {FACTS.map(([k, v]) => <div className="fact-item" key={k}><span>{k}</span><span>{v}</span></div>)}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="section-pad" id="skills">
        <div className="wrap">
          <SectionHead tag="02 · Tech Stack" title="Tools I use to ship full-stack applications" sub="A practical toolkit built through production work — not a checklist, but what I actually reach for day to day." />
          <div className="skills-grid">
            {SKILLS.map((s, i) => (
              <Reveal className="skill-card" delay={i * 0.08} key={s.title}>
                <div className="skill-icon"><Icon name={s.icon} /></div>
                <h4>{s.title}</h4>
                <div className="tag-list">{s.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
              </Reveal>
            ))}
          </div>
          <Reveal className="marquee-wrap" aria-hidden="true">
            <div className="marquee-track" style={prefersReducedMotion() ? { animation: 'none' } : undefined}>
              {marqueeItems.map((t, i) => <span className="marquee-item" key={`${t}-${i}`}><span className="dot" />{t}</span>)}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Experience */}
      <section className="section-pad" id="experience">
        <div className="wrap">
          <SectionHead tag="03 · Experience" title="Professional journey" />
          <div className="timeline" ref={timelineRef}>
            {EXPERIENCE.map((x) => (
              <Reveal className="tl-item" key={x.role + x.period}>
                <div className="tl-dot" />
                <div className="tl-card">
                  <div className="tl-top">
                    <div>
                      <div className="tl-role">{x.role}</div>
                      {x.org && <div className="tl-org">{x.org}</div>}
                    </div>
                    <span className="tl-period">{x.period}</span>
                  </div>
                  {x.loc && <div className="tl-loc">{x.loc}</div>}
                  <ul className="tl-list">{x.points.map((p) => <li key={p}>{p}</li>)}</ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="section-pad" id="projects">
        <div className="wrap">
          <SectionHead tag="04 · Projects" title="Selected work" sub="Full-stack builds covering authentication, real-time sync, and data-driven dashboards." />
          <div className="project-grid">
            {PROJECTS.map((p, i) => <ProjectCard project={p} delay={i * 0.1} key={p.title} />)}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="section-pad" id="credentials">
        <div className="wrap">
          <SectionHead tag="05 · Credentials" title="Education & certifications" />
          <div className="split-grid">
            <Reveal className="panel-card">
              <div className="panel-head"><div className="panel-head-icon"><Icon name="cap" /></div><h3>Education</h3></div>
              <div className="edu-degree">Bachelor of Engineering</div>
              <div className="edu-field">Civil Engineering</div>
              <div className="edu-row"><span>Institution</span><span>Anna University, Tiruchirappalli</span></div>
              <div className="edu-row"><span>Duration</span><span>Sept 2017 — May 2021</span></div>
              <div className="edu-row"><span>GPA</span><span>7.25 / 10</span></div>
            </Reveal>
            <Reveal className="panel-card" delay={0.1}>
              <div className="panel-head"><div className="panel-head-icon"><Icon name="award" /></div><h3>Certifications</h3></div>
              <div className="cert-item"><div className="cert-dot" /><div><div className="cert-name">Deloitte Australia Technology Job Simulation</div><div className="cert-date">Forage · Jan 2025</div></div></div>
              <div className="cert-item"><div className="cert-dot" /><div><div className="cert-name">Oracle Cloud Infrastructure (OCI) Certification</div><div className="cert-date">Jul 2023</div></div></div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section-pad" id="contact">
        <div className="wrap">
          <Reveal className="contact-card">
            <h2>Let's build something together.</h2>
            <p>I'm currently open to full-stack developer roles and freelance work. Reach out and I'll get back to you.</p>
            <div className="contact-actions">
              <button className="btn btn-primary" onClick={copyEmail}><Icon name="mail" size={16} /> {EMAIL}</button>
              <a href="tel:+917550300762" className="btn btn-ghost"><Icon name="phone" size={16} /> {PHONE}</a>
            </div>
            <div className="contact-socials">
              <a href="https://www.linkedin.com/in/shivask08" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="LinkedIn"><Icon name="linkedin" /></a>
              <a href="https://github.com/SK8100" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="GitHub"><Icon name="github" /></a>
              <a href="https://sk8100.github.io/" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Portfolio website"><Icon name="globe" /></a>
            </div>
          </Reveal>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <span className="fmono">© 2026 Sivaramakrishnan T</span> — Built with intent, one component at a time.
        </div>
      </footer>

      <div className={`copy-toast ${toast ? 'show' : ''}`} role="status">Email copied to clipboard</div>
    </>
  );
}