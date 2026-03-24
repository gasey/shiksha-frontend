import React from "react";
import "../css/Values.css";
import studentsImg from "../assets/studio.jpeg";

const Values = () => {
  return (
    <div className="values-container">
      <h1 className="values-heading">Our Value</h1>

      <div className="values-card">
        {/* Left: image */}
        <div className="values-image-wrap">
          <img src={studentsImg} alt="Students learning" className="values-image" />
        </div>

        {/* Right: text */}
        <div className="values-text">
          <p>
            At Shiksha, our values are the foundation of everything we do.
            These values guide our decisions and inspire our team to create a
            positive impact in the world of education.
          </p>

          <p className="values-section-label">Our Core Values:</p>
          <ul className="values-list">
            <li><strong>Commitment to Excellence:</strong> Ensures we deliver the highest quality education.</li>
            <li><strong>Quality:</strong> In our content and services empowers learners to succeed.</li>
            <li><strong>Inclusivity:</strong> Welcomes and supports learners from all backgrounds, making education accessible to everyone.</li>
            <li><strong>Innovation:</strong> Drives us to continuously improve and adapt to the evolving needs of our community.</li>
          </ul>

          <p className="values-section-label">Digital Mode of Learning:</p>
          <ul className="values-list">
            <li>Aims to enhance teaching and learning through technology integration.</li>
            <li>Mobile schools or "m-learning" bring education directly to remote communities, often incorporating digital tools.</li>
            <li>Platforms are provided for easily accessible and highly interactive education through digital learning materials.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Values;
