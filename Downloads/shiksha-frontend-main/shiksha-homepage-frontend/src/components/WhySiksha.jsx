import React from "react";
import "../css/About2.css";

const WhyShiksha = () => {
  return (
    <div className="about2-container">
      <header className="about2-header">
        <h1>Why Choose Shiksha?</h1>
      </header>
      <section className="about2-cards">
        <div className="about2-card">
          <p>
            At Shiksha, we offer a unique learning experience designed to meet the needs of modern learners. Choose Shiksha for an education that is not only effective but also enjoyable and accessible from anywhere.
          </p>
          <h2>Key Features:</h2>
          <ul>
            <li><strong>Interactive Courses:</strong> Engage students with multimedia content, quizzes, and real-world projects.</li>
            <li><strong>Live Classes:</strong> Provide direct interaction with expert instructors, fostering a supportive learning environment.</li>
            <li><strong>Personalized Dashboards:</strong> Track your progress and customize your learning path.</li>
            <li><strong>Vibrant Community:</strong> Connect with peers, share knowledge, and grow together.</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default WhyShiksha;
