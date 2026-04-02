import { useEffect, useState, useRef } from 'react';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import image4 from '../assets/image4.jpg';
import image5 from '../assets/image5.jpg';
import image6 from '../assets/image6.jpg';
import '../css/Hero.css';

const subjectCards = [
  { id: 1, name: 'Physics', img: image1, accent: '#60a5fa' },
  { id: 2, name: 'Chemistry', img: image2, accent: '#34d399' },
  { id: 3, name: 'Biology', img: image3, accent: '#fbbf24' },
  { id: 4, name: 'Mathematics', img: image4, accent: '#a78bfa' },
  { id: 5, name: 'History', img: image5, accent: '#f87171' },
  { id: 6, name: 'English', img: image6, accent: '#fb923c' },
];

const updates = [
  { id: 1, title: 'April Session Starting soon', accent: '#ff8f01' },
  { id: 2, title: 'CBSE / NCERT Course from Class 8 to Class 12', accent: '#f87171' },
  { id: 3, title: 'MBSC Course from Class 8 to Class 12', accent: '#1dcaab' },
  { id: 4, title: 'Higher education for all stream', accent: '#a78bfa' },
  { id: 5, title: 'Free guest access — no registration needed', accent: '#34d399' },
  { id: 6, title: 'New Live Session features just added', accent: '#fbbf24' },
  { id: 7, title: 'Enrollment open now', accent: '#60a5fa' },
  { id: 8, title: 'New and Profound Instructor joining us', accent: '#fb923c' },
];

const CARD_HEIGHT = 72;
const GAP = 10;

const Hero = () => {
  const [visible, setVisible] = useState(false);
  const [offset, setOffset] = useState(0);
  const [transitioning, setTransitioning] = useState(true);
  const [paused, setPaused] = useState(false);
  const items = [...updates, ...updates];
  const currentRef = useRef(0);
  const intervalRef = useRef(null);
  const resetTimeoutRef = useRef(null);

  useEffect(() => {
    setVisible(true);
  }, []);

  const step = CARD_HEIGHT + GAP;

  const advance = () => {
    currentRef.current += 1;
    setTransitioning(true);
    setOffset(currentRef.current * step);

    if (currentRef.current >= updates.length) {
      resetTimeoutRef.current = setTimeout(() => {
        setTransitioning(false);
        currentRef.current = 0;
        setOffset(0);
      }, 520);
    }
  };

  useEffect(() => {
    if (paused) {
      clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(advance, 4000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [paused]);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(resetTimeoutRef.current);
    };
  }, []);

  return (
    <section className="shiksha-hero">
      <div className="hero-bg-grid"></div>
      <div className="hero-glow-1"></div>
      <div className="hero-glow-2"></div>
      <div className="hero-glow-3"></div>

      <div className="hero-inner">
        <div className="hero-left">
          <div className="subject-grid">
            {subjectCards.map((card, i) => (
              <div
                key={card.id}
                className={`scard ${visible ? 'scard-visible' : ''}`}
                style={{ '--delay': `${i * 40}ms`, '--accent': card.accent }}
              >
                <img src={card.img} alt={card.name} className="scard-img" />
              </div>
            ))}
          </div>
        </div>

        <div className="hero-right">
          <div className="updates-panel">
            <div className="up-header">
              <div className="up-header-left">
                <span className="up-title">Latest Updates</span>
              </div>
            </div>

            <div
              className="up-viewport"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div className="up-fade up-fade-top"></div>

              <div
                className="up-track"
                style={{
                  transform: `translateY(-${offset}px)`,
                  transition: transitioning
                    ? 'transform 0.52s cubic-bezier(0.4,0,0.2,1)'
                    : 'none',
                }}
              >
                {items.map((u, i) => (
                  <div
                    key={`${u.id}-${i}`}
                    className="up-card"
                    style={{ '--uaccent': u.accent }}
                  >
                    <div className="up-card-dot"></div>
                    <span className="up-card-title">{u.title}</span>
                  </div>
                ))}
              </div>

              <div className="up-fade up-fade-bottom"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;