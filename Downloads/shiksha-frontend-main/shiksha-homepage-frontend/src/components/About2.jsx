import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/About2.css";

const About2 = () => {
  const navigate = useNavigate();

  const aboutItems = [
    {
      title: "Our Vision",
      text: "To provide learners with the skills and knowledge they need to thrive in the modern world.",
      link: "/vision",
    },
    {
      title: "Our Mission",
      text: "Deliver high-quality, accessible education using innovative technology and expert guidance.",
      link: "/mission",
    },
    {
      title: "Our Values",
      text: "Commitment, quality, inclusivity, and innovation drive everything we do at Shiksha.",
      link: "/values",
    },
    {
      title: "Why Choose Shiksha?",
      text: "Interactive courses, live classes, personalized dashboards, and a vibrant learning community.",
      link: "/why-shiksha",
    },
  ];

  return (
    <div className="about2-container">
      <header className="about2-header fade-in-up">
        <h1>About Shiksha</h1>
    {/* <p>
          Shiksha is a modern e-learning platform dedicated to empowering learners with quality education.
          Our mission is to make learning accessible, engaging, and effective for everyone.
        </p> */} 
      </header>

      <section className="about2-list">
        {aboutItems.map((item, index) => (
          <div
            key={index}
            className="about2-item fade-in-up"
            style={{ animationDelay: `${0.2 * index}s` }}
            onClick={() => navigate(item.link)}
          >
            <h2>
              <span className="item-icon">{item.icon}</span>
              {item.title}
            </h2>
            <p>{item.text}</p>
          </div>
        ))}
      </section>

    {/* <section className="about2-team-section fade-in-up">
        <h2>Meet Some of Our Teams</h2>
        <div className="about2-team-list">
          {teamItems.map((team, index) => (
            <div
              key={index}
              className="about2-team-item fade-in-up"
              style={{ animationDelay: `${0.2 * index}s` }}
            >
              <h3>{team.title}</h3>
              <p>{team.desc}</p>
              <Link to={team.link}>
                <button className="team-button">→</button>
              </Link>
            </div>
          ))}
        </div>
      </section> */} 
    </div>
  );
};

export default About2;