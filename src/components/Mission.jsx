import React from "react";
import "../css/Mission.css";
import { FaUsers, FaWrench, FaHome } from "react-icons/fa";
import { GiSprout } from "react-icons/gi";

const pillars = [
  {
    icon: <FaUsers />,
    bg: "#e0cce8",
    color: "#7a3d9a",
    label: "Fostering a supportive community",
  },
  {
    icon: <FaWrench />,
    bg: "#ccd4f5",
    color: "#3a52c4",
    label: "Leveraging cutting-edge tools",
  },
  {
    icon: <GiSprout />,
    bg: "#c4e8d4",
    color: "#2a7a50",
    label: "Making education inclusive, effective, and transformative",
  },
  {
    icon: <FaHome />,
    bg: "#dce8b4",
    color: "#5a7a20",
    label: "Bridging the gap in educational access between urban and rural settings",
  },
];

const Mission = () => {
  return (
    <div className="mission-container">
      <h1 className="mission-heading">Our Mission</h1>

      <p className="mission-intro">
        At Shiksha, our mission is to deliver high-quality, accessible education
        using innovative technology and expert guidance. We are committed to
        empowering learners of all ages and backgrounds to achieve their full
        potential through engaging, personalized learning experiences.
      </p>

      <div className="mission-pillars">
        {pillars.map((item, i) => (
          <div className="mission-pillar" key={i}>
            <div
              className="mission-circle"
              style={{ background: item.bg, color: item.color }}
            >
              {item.icon}
            </div>
            <p className="mission-pillar-label">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mission;
