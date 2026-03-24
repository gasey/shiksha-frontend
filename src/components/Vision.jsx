import React from "react";
import "../css/Vision.css";
import classroomImg from "../assets/meet.jpeg";

const Vision = () => {
  return (
    <div className="vision-container">
      <h1 className="vision-heading">Our Vision</h1>

      <div className="vision-card">
        <div className="vision-text">
          <p>
            At Shiksha, our vision is to provide learners with the skills and
            knowledge they need to thrive in the modern world. We aim to make
            education accessible, engaging, and effective for everyone,
            regardless of their background or location.
          </p>

          <p className="vision-initiatives-label">Key Initiatives:</p>
          <ul className="vision-list">
            <li>Leveraging technology like online learning platforms, mobile schools, and digital resources to reach students in remote areas.</li>
            <li>Enabling individuals in remote areas to acquire knowledge and skills for personal growth and community development.</li>
            <li>Supporting learners of all backgrounds, abilities, and learning styles.</li>
            <li>Raising awareness of non-traditional and diverse career opportunities.</li>
            <li>Bringing the classroom to your doorstep.</li>
          </ul>
        </div>

        <div className="vision-image-wrap">
          <img src={classroomImg} alt="Classroom" className="vision-image" />
        </div>
      </div>
    </div>
  );
};

export default Vision;
