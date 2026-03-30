import React, { useEffect, useRef } from "react";
import "../css/About2.css";
import { FaUsers, FaWrench, FaHome } from "react-icons/fa";
import { GiSprout } from "react-icons/gi";

import img1 from "../assets/image7.jpg";
import img2 from "../assets/image8.jpg";
import img3 from "../assets/image9.jpg";
import img4 from "../assets/image10.jpg";
import img5 from "../assets/image11.jpg";
import visionImg from "../assets/vision.jpg";
import valuesImg from "../assets/value.jpg";

const missionPillars = [
  { icon: <FaUsers />,  bg: "rgba(29,202,171,0.12)",  color: "#1dcaab", label: "Fostering a supportive community" },
  { icon: <FaWrench />, bg: "rgba(18,80,39,0.12)",    color: "#125027", label: "Leveraging cutting-edge tools" },
  { icon: <GiSprout />, bg: "rgba(27,156,133,0.12)",  color: "#1b9c85", label: "Making education inclusive, effective, and transformative" },
  { icon: <FaHome />,   bg: "rgba(255,143,1,0.12)",   color: "#ff8f01", label: "Bridging the gap in educational access between urban and rural settings" },
];

const whyFeatures = [
  { title: "Interactive Courses",     desc: "Engage students with multimedia content, quizzes, and real-world projects.", num: "01" },
  { title: "Live Classes",            desc: "Direct interaction with expert instructors, fostering a supportive learning environment.", num: "02" },
  { title: "Personalized Dashboards", desc: "Track your progress and get content tailored to your learning pace and goals.", num: "03" },
  { title: "Vibrant Community",       desc: "Connect with peers, share knowledge, and grow together in a thriving forum.", num: "04" },
];

const About2 = () => {
  const revealRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("ap-visible");
          }
        });
      },
      { threshold: 0.12 }
    );

    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const ref = (el) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  return (
    <div className="about-page">

      {/* ── 1. About Us ── */}
      <section className="ap-section ap-about-us">
        <div className="ap-section-inner">
          <div className="ap-hero-badge" ref={ref}>
            <span className="ap-badge-dot"></span>
            <span>DONT HACK US !!</span>
          </div>
          <h1 className="ap-heading ap-heading-main ap-reveal" ref={ref}>About Us</h1>
          <p className="ap-intro ap-reveal" ref={ref}>
            Through innovative technology, our intelligent platform empowers individuals to achieve their full potential and contribute
            positively to society.
          </p>
          <div className="ap-img-row ap-reveal" ref={ref}>
            {[img1,img2,img3,img4,img5].map((img, i) => (
              <div className="ap-img-wrap" key={i} style={{ '--i': i }}>
                <img src={img} alt={`classroom ${i+1}`} />
                <div className="ap-img-overlay"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. Our Vision ── */}
      <section id="vision" className="ap-section ap-alt">
        <div className="ap-section-inner">
          <div className="ap-section-label ap-reveal" ref={ref}>Vision</div>
          <h2 className="ap-heading ap-reveal" ref={ref}>Our Vision</h2>
          <div className="ap-card ap-row ap-reveal" ref={ref}>
            <div className="ap-card-text">
              <p>
                At Shiksha, our vision is to provide learners with the skills and
                knowledge they need to thrive in the modern world. We aim to make
                education accessible, engaging, and effective for everyone,
                regardless of their background or location.
              </p>
              <p className="ap-label">Key Initiatives:</p>
              <ul className="ap-list">
                <li>Leveraging technology like online learning platforms, mobile schools, and digital resources to reach students in remote areas.</li>
                <li>Enabling individuals in remote areas to acquire knowledge and skills for personal growth.</li>
                <li>Supporting learners of all backgrounds, abilities, and learning styles.</li>
                <li>Raising awareness of non-traditional and diverse career opportunities.</li>
                <li>Bringing the classroom to your doorstep.</li>
              </ul>
            </div>
            <div className="ap-card-img">
              <img src={visionImg} alt="Vision" />
              <div className="ap-img-shine"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Our Mission ── */}
      <section id="mission" className="ap-section">
        <div className="ap-section-inner">
          <div className="ap-section-label ap-reveal" ref={ref}>Mission</div>
          <h2 className="ap-heading ap-reveal" ref={ref}>Our Mission</h2>
          <p className="ap-intro ap-reveal" ref={ref}>
            At Shiksha, our mission is to deliver high-quality, accessible education using innovative technology and expert guidance.
            We are committed to empowering learners of all ages and backgrounds to achieve their full potential.
          </p>
          <div className="ap-pillars">
            {missionPillars.map((p, i) => (
              <div
                className="ap-pillar ap-reveal"
                key={i}
                ref={ref}
                style={{ '--delay': `${i * 100}ms` }}
              >
                <div className="ap-circle" style={{ background: p.bg, color: p.color }}>
                  {p.icon}
                </div>
                <p className="ap-pillar-label">{p.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Our Value ── */}
      <section id="values" className="ap-section ap-alt">
        <div className="ap-section-inner">
          <div className="ap-section-label ap-reveal" ref={ref}>Values</div>
          <h2 className="ap-heading ap-reveal" ref={ref}>Our Value</h2>
          <div className="ap-card ap-row ap-row-reverse ap-reveal" ref={ref}>
            <div className="ap-card-img">
              <img src={valuesImg} alt="Values" />
              <div className="ap-img-shine"></div>
            </div>
            <div className="ap-card-text">
              <p>
                At Shiksha, our values are the foundation of everything we do.
                These values guide our decisions and inspire our team to create a
                positive impact in the world of education.
              </p>
              <p className="ap-label">Our Core Values:</p>
              <ul className="ap-list">
                <li><strong>Commitment to Excellence:</strong> Ensures we deliver the highest quality education.</li>
                <li><strong>Quality:</strong> In our content and services empowers learners to succeed.</li>
                <li><strong>Inclusivity:</strong> Welcomes and supports learners from all backgrounds.</li>
                <li><strong>Innovation:</strong> Drives us to continuously improve and adapt.</li>
              </ul>
              <p className="ap-label">Digital Mode of Learning:</p>
              <ul className="ap-list">
                <li>Aims to enhance teaching and learning through technology integration.</li>
                <li>Mobile schools bring education directly to remote communities.</li>
                <li>Highly interactive platforms for accessible digital education.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Why Choose ShikshaCom? ── */}
      <section id="why-shiksha" className="ap-section ap-why-section">
        <div className="ap-section-inner">
          <div className="ap-section-label ap-reveal" ref={ref}>Why Us</div>
          <h2 className="ap-heading ap-reveal" ref={ref}>Why Choose ShikshaCom?</h2>
          <p className="ap-intro ap-reveal" ref={ref}>
            At Shiksha, we offer a unique learning experience designed to meet the needs of modern learners.
            Choose Shiksha for education that is effective, enjoyable, and accessible from anywhere.
          </p>
          <div className="ap-why-cards">
            {whyFeatures.map((f, i) => (
              <div
                className="ap-why-card ap-reveal"
                key={i}
                ref={ref}
                style={{ '--delay': `${i * 90}ms` }}
              >
                <span className="ap-why-num">{f.num}</span>
                <h3 className="ap-why-title">{f.title}</h3>
                <p className="ap-why-desc">{f.desc}</p>
                <div className="ap-why-line"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default About2;