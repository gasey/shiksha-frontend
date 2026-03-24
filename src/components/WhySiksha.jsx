import React from "react";
import "../css/WhySiksha.css";

const features = [
  {
    title: "Interactive Courses",
    desc: "Engage students with multimedia content, quizzes, and real-world projects.",
  },
  {
    title: "Live Classes",
    desc: "Provide direct interaction with expert instructors, fostering a supportive learning environment.",
  },
  {
    title: "Personalized Dashboards",
    desc: "Engage students with multimedia content, quizzes, and real-world projects.",
  },
  {
    title: "Vibrant Community",
    desc: "Connect with peers, share knowledge, and grow together.",
  },
];

const WhyShiksha = () => {
  return (
    <div className="why-container">
      <h1 className="why-heading">Why Choose ShikshaCom?</h1>

      <p className="why-intro">
        At Shiksha, we offer a unique learning experience designed to meet the
        needs of modern learners. Choose Shiksha for an education that is not
        only effective but also enjoyable and accessible from anywhere.
      </p>

      <div className="why-cards">
        {features.map((f, i) => (
          <div className="why-card" key={i}>
            <h3 className="why-card-title">{f.title}</h3>
            <p className="why-card-desc">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyShiksha;
