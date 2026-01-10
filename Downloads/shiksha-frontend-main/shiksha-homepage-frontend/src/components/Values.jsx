import React from "react";
import "../css/About2.css";

const Values = () => {
  return (
    <div className="about2-container">
      <header className="about2-header">
        <h1>Our Values</h1>
      </header>
      <section className="about2-cards">
        <div className="about2-card">
          <p>
            At Shiksha, our values are the foundation of everything we do. These values guide our decisions and inspire our team to create a positive impact in the world of education.
          </p>
          <h2>Our Core Values:</h2>
          <ul>
            <li><strong>Commitment to Excellence:</strong> Ensures we deliver the highest quality education.</li>
            <li><strong>Quality:</strong> In our content and services empowers learners to succeed.</li>
            <li><strong>Inclusivity:</strong> Welcomes and supports learners from all backgrounds, making education accessible to everyone.</li>
            <li><strong>Innovation:</strong> Drives us to continuously improve and adapt to the evolving needs of our community.</li>
          </ul>
          <h2>Digital Mode of Learning:</h2>
          <ul>
            <li>Aims to enhance teaching and learning through technology integration.</li>
            <li>Mobile schools or “m-learning” bring education directly to remote communities, often incorporating digital tools.</li>
            <li>Platforms are provided for easily accessible and highly interactive education through digital learning materials.</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Values;
