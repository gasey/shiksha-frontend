import React from "react";
import "../css/About2.css";

const Vision = () => {
  return (
    <div className="about2-container">
      <header className="about2-header">
        <h1>Our Vision</h1>
      </header>
      <section className="about2-cards">
        <div className="about2-card">
          <p>
            At Shiksha, our vision is to provide learners with the skills and
            knowledge they need to thrive in the modern world. We aim to make
            education accessible, engaging, and effective for everyone,
            regardless of their background or location. Through innovative
            technology and expert guidance, we empower individuals to achieve
            their full potential and contribute positively to society.
          </p>
          <h2>Key Initiatives:</h2>
          <ul>
            <li>Leveraging technology like online learning platforms, mobile schools, and digital resources to reach students in remote areas.</li>
            <li>Enabling individuals in remote areas to acquire knowledge and skills for personal growth and community development.</li>
            <li>Supporting learners of all backgrounds, abilities, and learning styles.</li>
            <li>Raising awareness of non-traditional and diverse career opportunities.</li>
            <li>Bringing the classroom to your doorstep.</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Vision;
