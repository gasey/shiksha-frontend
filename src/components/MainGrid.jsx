import '../css/MainGrid.css';
import { useState, useEffect } from 'react';

import itImage from '../assets/it.jpeg';
import studioImage from '../assets/studio.jpeg';
import meetImage from '../assets/meet.jpeg';
import mualpuiImage from '../assets/mualpui.jpeg';
import teacherImage from '../assets/teacher.jpeg';

const heroSlides = [
  { title: "Information",  image: itImage       },
  { title: "Studio",       image: studioImage   },
  { title: "Team",         image: meetImage     },
  { title: "Location",     image: mualpuiImage  },
  { title: "Staff-Room",   image: teacherImage  },
];

const notifications = [
  "New JEE courses will be available soon!",
  "Live classes starting soon",
  "Scholarship opportunities for students",
  "Teacher training programs coming soon",
  "Upcoming career counselling sessions",
  "Digital India initiative updates",
  "Admission guidance for abroad",
  "Skill development workshops"
];

const longNotificationsList = Array(10).fill(notifications).flat();

const MainGrid = () => {
  const [heroIndex, setHeroIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Auto-advance hero every 4 s
  useEffect(() => {
    const t = setInterval(() => setHeroIndex(p => (p + 1) % heroSlides.length), 4000);
    return () => clearInterval(t);
  }, []);

  // Roll notifications every 2 s
  useEffect(() => {
    const t = setInterval(() => setScrollPosition(p => p + 60), 2000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setHeroIndex(p => (p - 1 + heroSlides.length) % heroSlides.length);
  const next = () => setHeroIndex(p => (p + 1) % heroSlides.length);

  return (
    <div className="main-grid">

      {/* ===== HERO SLIDESHOW ===== */}
      <div className="hero-slideshow">
        <img
          src={heroSlides[heroIndex].image}
          alt={heroSlides[heroIndex].title}
          className="hero-image"
        />

        {/* Dark gradient overlay */}
        <div className="hero-overlay" />

        {/* Title */}
        <div className="hero-title">{heroSlides[heroIndex].title}</div>

        {/* Arrows */}
        <button className="hero-arrow hero-arrow--left"  onClick={prev}>&#8249;</button>
        <button className="hero-arrow hero-arrow--right" onClick={next}>&#8250;</button>

        {/* Dots */}
        <div className="hero-dots">
          {heroSlides.map((_, i) => (
            <span
              key={i}
              className={`hero-dot${i === heroIndex ? ' active' : ''}`}
              onClick={() => setHeroIndex(i)}
            />
          ))}
        </div>
      </div>

      {/* ===== LATEST UPDATES ===== */}
      <div className="notification-panel">
        <h3>Latest Updates</h3>
        <div className="rolling-notification-container">
          <div
            className="notification-list"
            style={{
              transform: `translateY(-${scrollPosition}px)`,
              transition: 'transform 0.8s ease-in-out'
            }}
          >
            {longNotificationsList.map((notification, index) => (
              <div key={index} className="notification-item">
                <p>{notification}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default MainGrid;