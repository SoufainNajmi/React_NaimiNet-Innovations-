import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import './HeroSection.css';

// Icônes SVG inline pour de meilleures performances
const Icons = {
  Menu: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  Close: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  ArrowRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  ),
  Scroll: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  ),
  Github: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  ),
  LinkedIn: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.204 0 22.225 0z" />
    </svg>
  ),
  Twitter: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.68-3.613c1.44-2.577 2.177-5.527 2.177-8.55 0-.325-.007-.65-.022-.975A7.499 7.499 0 0024 4.57z" />
    </svg>
  ),
  Sparkle: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  )
};

function HeroSection() {
  const heroRef = useRef(null);
  const shapesRef = useRef([]);
  const cursorRef = useRef(null);
  const cursorFollowerRef = useRef(null);
  const navRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [cursorText, setCursorText] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isScrolled, setIsScrolled] = useState(false);

  // Navigation items
  const navItems = [
    { id: 'home', label: 'Accueil', icon: '🏠' },
    { id: 'about', label: 'À propos', icon: 'ℹ️' },
    { id: 'services', label: 'Services', icon: '⚙️' },
    { id: 'portfolio', label: 'Portfolio', icon: '🎨' },
    { id: 'contact', label: 'Contact', icon: '📧' }
  ];

  // Optimized scroll functions
  const scrollToSection = useCallback((sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const navHeight = navRef.current?.offsetHeight || 0;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      setIsMenuOpen(false);
      setActiveSection(sectionId);
    }
  }, []);

  // Handle scroll spy
  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }

      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScrollSpy);
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  // Handle Get Started button click
  const handleGetStarted = useCallback(() => {
    scrollToSection('about');
  }, [scrollToSection]);

  // Custom cursor animation with optimization
  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = cursorFollowerRef.current;

    if (!cursor || !follower) return;

    let rafId = null;
    let followerX = 0;
    let followerY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const updateCursorPosition = () => {
      if (cursor) {
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      }
      if (follower) {
        followerX += (mousePosition.x - followerX) * 0.15;
        followerY += (mousePosition.y - followerY) * 0.15;
        follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
      }
      rafId = requestAnimationFrame(updateCursorPosition);
    };

    const onMouseMove = (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseEnter = () => {
      cursor.style.opacity = '1';
      follower.style.opacity = '1';
    };

    const onMouseLeave = () => {
      cursor.style.opacity = '0';
      follower.style.opacity = '0';
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    rafId = requestAnimationFrame(updateCursorPosition);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [mousePosition]);

  // Parallax effect for floating shapes
  const handleMouseMove = useCallback((e) => {
    if (!heroRef.current) return;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth) * 20;
      const yPos = (clientY / window.innerHeight) * 20;

      shapesRef.current.forEach((shape, idx) => {
        if (shape) {
          const speeds = [12, 8, 6];
          const speed = speeds[idx % speeds.length];
          const moveX = (xPos - 10) / speed;
          const moveY = (yPos - 10) / speed;
          shape.style.transform = `translate3d(${moveX * 0.5}px, ${moveY * 0.3}px, 0)`;
        }
      });
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    shapesRef.current.forEach((shape) => {
      if (shape) {
        shape.style.transform = 'translate3d(0px, 0px, 0)';
      }
    });
  }, []);

  // Cursor hover effects
  const handleLinkHover = useCallback((text) => {
    setCursorText(text);
    cursorRef.current?.classList.add('cursor-grow');
    cursorFollowerRef.current?.classList.add('follower-grow');
  }, []);

  const handleLinkLeave = useCallback(() => {
    setCursorText('');
    cursorRef.current?.classList.remove('cursor-grow');
    cursorFollowerRef.current?.classList.remove('follower-grow');
  }, []);

  // Set up refs for shapes
  useEffect(() => {
    shapesRef.current = [
      document.querySelector('.floating-shape.shape-1'),
      document.querySelector('.floating-shape.shape-2'),
      document.querySelector('.floating-shape.shape-3')
    ];
  }, []);

  // Generate random particles
  const particles = useMemo(() => {
    return [...Array(30)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${5 + Math.random() * 10}s`
    }));
  }, []);

  return (
    <>
      {/* Custom Cursor Elements */}
      <div ref={cursorRef} className="custom-cursor">
        {cursorText && <span className="cursor-text">{cursorText}</span>}
      </div>
      <div ref={cursorFollowerRef} className="cursor-follower"></div>

      {/* Navigation Bar */}
      <nav ref={navRef} className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo" onClick={() => scrollToSection('home')}>
            <Icons.Sparkle />
            <span>TechInnov</span>
          </div>

          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                onMouseEnter={() => handleLinkHover(item.label)}
                onMouseLeave={handleLinkLeave}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </a>
            ))}

            <button
              className="nav-cta"
              onClick={handleGetStarted}
              onMouseEnter={() => handleLinkHover('Commencer →')}
              onMouseLeave={handleLinkLeave}
            >
              Commencer
              <Icons.ArrowRight />
            </button>
          </div>

          <div className="nav-social">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Icons.Github />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Icons.LinkedIn />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Icons.Twitter />
            </a>
          </div>

          <div className="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <Icons.Close /> : <Icons.Menu />}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="hero"
        ref={heroRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Floating abstract tech blobs */}
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>

        {/* Animated particles */}
        <div className="particles-container">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="particle"
              style={{
                left: particle.left,
                top: particle.top,
                animationDelay: particle.delay,
                animationDuration: particle.duration
              }}
            />
          ))}
        </div>

        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-text">🚀 Next-Gen Solutions</span>
          </div>
          <h1>
            Innovating the
            <span className="gradient-text"> Future</span>
          </h1>
          <p>Pionnier des solutions technologiques de pointe pour un monde moderne.</p>
          <div className="hero-buttons">
            <button
              className="btn-primary"
              onClick={handleGetStarted}
              onMouseEnter={() => handleLinkHover('Explore →')}
              onMouseLeave={handleLinkLeave}
            >
              Commencer
              <span className="btn-icon">→</span>
            </button>
            <button
              className="btn-secondary"
              onClick={() => scrollToSection('portfolio')}
              onMouseEnter={() => handleLinkHover('Voir les projets')}
              onMouseLeave={handleLinkLeave}
            >
              Voir les projets
            </button>
          </div>

          {/* Stats Section */}
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">100+</span>
              <span className="stat-label">Projets réalisés</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Clients satisfaits</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support disponible</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="scroll-indicator"
          onClick={handleScrollClick}
          onMouseEnter={() => handleLinkHover('Scroll Down')}
          onMouseLeave={handleLinkLeave}
        >
          <span>Scroll</span>
          <div className="mouse">
            <div className="mouse-wheel"></div>
          </div>
          <Icons.Scroll />
        </div>

        {/* Animated wave background */}
        <svg className="waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="rgba(37, 99, 235, 0.1)" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,170.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
            <animate
              attributeName="d"
              dur="10s"
              repeatCount="indefinite"
              values="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,170.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                         M0,128L48,138.7C96,149,192,171,288,176C384,181,480,171,576,160C672,149,768,139,864,149.3C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                         M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,170.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </path>
        </svg>
      </section>
    </>
  );
}

export default HeroSection;
