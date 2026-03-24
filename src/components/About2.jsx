import React from "react";
import "../css/About2.css";
import { FaUsers, FaWrench, FaHome } from "react-icons/fa";
import { GiSprout } from "react-icons/gi";

import img1 from "../assets/teach1.jpeg";
import img2 from "../assets/teach2.jpeg";
import img3 from "../assets/teach3.jpeg";
import img4 from "../assets/teach4.jpeg";
import img5 from "../assets/teach5.jpeg";
import visionImg from "../assets/meet.jpeg";
import valuesImg from "../assets/studio.jpeg";

const missionPillars = [
  { icon: <FaUsers />,   bg: "#e0cce8", color: "#7a3d9a", label: "Fostering a supportive community" },
  { icon: <FaWrench />,  bg: "#ccd4f5", color: "#3a52c4", label: "Leveraging cutting-edge tools" },
  { icon: <GiSprout />,  bg: "#c4e8d4", color: "#2a7a50", label: "Making education inclusive, effective, and transformative" },
  { icon: <FaHome />,    bg: "#dce8b4", color: "#5a7a20", label: "Bridging the gap in educational access between urban and rural settings" },
];

const whyFeatures = [
  { title: "Interactive Courses",      desc: "Engage students with multimedia content, quizzes, and real-world projects." },
  { title: "Live Classes",             desc: "Provide direct interaction with expert instructors, fostering a supportive learning environment." },
  { title: "Personalized Dashboards",  desc: "Engage students with multimedia content, quizzes, and real-world projects." },
  { title: "Vibrant Community",        desc: "Connect with peers, share knowledge, and grow together." },
];

const About2 = () => {
  return (
    <div className="about-page">

      {/* ── 1. About Us ── */}
      <section className="ap-section ap-about-us">
        <h1 className="ap-heading ap-heading-main">About Us</h1>
        <p className="ap-intro">
          Through innovative technology, our intelligent platform empowers individuals to achieve their full potential and contribute
          positively to society.
        </p>
        <div className="ap-img-row">
          <img src={img1} alt="classroom 1" />
          <img src={img2} alt="classroom 2" />
          <img src={img3} alt="classroom 3" />
          <img src={img4} alt="classroom 4" />
          <img src={img5} alt="classroom 5" />
        </div>
      </section>

      {/* ── 2. Our Vision ── */}
      <section className="ap-section">
        <h2 className="ap-heading">Our Vision</h2>
        <div className="ap-card ap-row">
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
              <li>Enabling individuals in remote areas to acquire knowledge and skills for personal growth and community development.</li>
              <li>Supporting learners of all backgrounds, abilities, and learning styles.</li>
              <li>Raising awareness of non-traditional and diverse career opportunities.</li>
              <li>Bringing the classroom to your doorstep.</li>
            </ul>
          </div>
          <div className="ap-card-img">
            <img src={visionImg} alt="Vision" />
          </div>
        </div>
      </section>

      {/* ── 3. Our Mission ── */}
      <section className="ap-section">
        <h2 className="ap-heading">Our Mission</h2>
        <p className="ap-intro">
          At Shiksha, our mission is to deliver high-quality, accessible education using innovative technology and expert guidance.
          We are committed to empowering learners of all ages and backgrounds to achieve their full potential through engaging,
          personalized learning experiences.
        </p>
        <div className="ap-pillars">
          {missionPillars.map((p, i) => (
            <div className="ap-pillar" key={i}>
              <div className="ap-circle" style={{ background: p.bg, color: p.color }}>{p.icon}</div>
              <p className="ap-pillar-label">{p.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. Our Value ── */}
      <section className="ap-section">
        <h2 className="ap-heading">Our Value</h2>
        <div className="ap-card ap-row">
          <div className="ap-card-img">
            <img src={valuesImg} alt="Values" />
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
              <li><strong>Inclusivity:</strong> Welcomes and supports learners from all backgrounds, making education accessible to everyone.</li>
              <li><strong>Innovation:</strong> Drives us to continuously improve and adapt to the evolving needs of our community.</li>
            </ul>
            <p className="ap-label">Digital Mode of Learning:</p>
            <ul className="ap-list">
              <li>Aims to enhance teaching and learning through technology integration.</li>
              <li>Mobile schools or "m-learning" bring education directly to remote communities, often incorporating digital tools.</li>
              <li>Platforms are provided for easily accessible and highly interactive education through digital learning materials.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── 5. Why Choose ShikshaCom? ── */}
      <section className="ap-section">
        <h2 className="ap-heading">Why Choose ShikshaCom?</h2>
        <p className="ap-intro">
          At Shiksha, we offer a unique learning experience designed to meet the needs of modern learners. Choose Shiksha
          for an education that is not only effective but also enjoyable and accessible from anywhere.
        </p>
        <div className="ap-why-cards">
          {whyFeatures.map((f, i) => (
            <div className="ap-why-card" key={i}>
              <h3 className="ap-why-title">{f.title}</h3>
              <p className="ap-why-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default About2;
