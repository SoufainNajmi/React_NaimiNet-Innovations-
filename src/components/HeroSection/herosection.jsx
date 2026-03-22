import React, { useRef, useEffect, useState } from 'react';
import './HeroSection.css';

function HeroSection() {
  const heroRef = useRef(null);
  const shapesRef = useRef([]);
  const cursorRef = useRef(null);
  const cursorFollowerRef = useRef(null);
  const [cursorText, setCursorText] = useState('');
  const [isHoveringButton, setIsHoveringButton] = useState(false);

  // Handle Get Started button click
  const handleGetStarted = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle scroll indicator click
  const handleScrollClick = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Custom cursor animation
  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = cursorFollowerRef.current;

    if (!cursor || !follower) return;

    const onMouseMove = (e) => {
      // Main cursor (dot)
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;

      // Follower cursor (circle) with delay
      setTimeout(() => {
        if (follower) {
          follower.style.left = `${e.clientX}px`;
          follower.style.top = `${e.clientY}px`;
        }
      }, 50);
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

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  // Mouse move parallax effect for floating shapes
  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const { clientX, clientY } = e;
    const xPos = (clientX / window.innerWidth) * 20;
    const yPos = (clientY / window.innerHeight) * 20;

    shapesRef.current.forEach((shape, idx) => {
      if (shape) {
        const speed = idx === 0 ? 12 : idx === 1 ? 8 : 6;
        const moveX = (xPos - 10) / speed;
        const moveY = (yPos - 10) / speed;
        shape.style.transform = `translate(${moveX * 0.5}px, ${moveY * 0.3}px)`;
      }
    });
  };

  const handleMouseLeave = () => {
    shapesRef.current.forEach((shape) => {
      if (shape) {
        shape.style.transform = 'translate(0px, 0px)';
      }
    });
  };

  // Handle cursor hover effects on interactive elements
  const handleLinkHover = (text) => {
    setCursorText(text);
    if (cursorRef.current) {
      cursorRef.current.classList.add('cursor-grow');
    }
    if (cursorFollowerRef.current) {
      cursorFollowerRef.current.classList.add('follower-grow');
    }
  };

  const handleLinkLeave = () => {
    setCursorText('');
    if (cursorRef.current) {
      cursorRef.current.classList.remove('cursor-grow');
    }
    if (cursorFollowerRef.current) {
      cursorFollowerRef.current.classList.remove('follower-grow');
    }
  };

  // Set up refs for shapes
  useEffect(() => {
    shapesRef.current = [
      document.querySelector('.floating-shape.shape-1'),
      document.querySelector('.floating-shape.shape-2'),
      document.querySelector('.floating-shape.shape-3')
    ];
  }, []);

  return (
    <>
      {/* Custom Cursor Elements */}
      <div ref={cursorRef} className="custom-cursor">
        {cursorText && <span className="cursor-text">{cursorText}</span>}
      </div>
      <div ref={cursorFollowerRef} className="cursor-follower"></div>

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
          {[...Array(30)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}></div>
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
          <p>Pioneering cutting-edge technology solutions for a modern world.</p>
          <button
            className="btn-primary"
            onClick={handleGetStarted}
            onMouseEnter={() => handleLinkHover('Explore →')}
            onMouseLeave={handleLinkLeave}
          >
            Get Started
            <span className="btn-icon">→</span>
          </button>
        </div>

        {/* Subtle scroll hint */}
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
        </div>

        {/* Animated wave background */}
        <svg className="waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
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
