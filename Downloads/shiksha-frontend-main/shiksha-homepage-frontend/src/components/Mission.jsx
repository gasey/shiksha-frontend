
import React from "react";
import "../css/About2.css";

const Mission = () => {
  return (
    <div className="about2-container">
      <header className="about2-header">
        <h1>Our Mission</h1>
      </header>
      <section className="about2-cards">
        <div className="about2-card">
          <p>
            At Shiksha, our mission is to deliver high-quality, accessible
            education using innovative technology and expert guidance. We are
            committed to empowering learners of all ages and backgrounds to
            achieve their full potential through engaging, personalized learning
            experiences.
          </p>
          <h2>Key Aspects:</h2>
          <ul>
            <li>Fostering a supportive community</li>
            <li>Leveraging cutting-edge tools</li>
            <li>Making education inclusive, effective, and transformative</li>
            <li>Bridging the gap in educational access between urban and rural settings</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Mission;
