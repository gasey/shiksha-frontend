import { useEffect, useState } from 'react';
import '../css/Courses.css';
import CourseDetail from './CourseDetail';
import { courseData } from '../data/courseData';

export const courseCards = Object.values(courseData);

export const CourseCard = ({ course, onArrowClick }) => (
  <div className="course-card">
    <div className="course-card-img" />
    <div className="course-card-body">
      <h3 className="course-card-title">{course.title}</h3>
      <p className="course-card-desc">{course.desc}</p>
      <div className="course-card-footer">
        <span className="course-card-price">{course.price}</span>
        <button className="course-arrow-btn" onClick={() => onArrowClick(course)}>
          →
        </button>
      </div>
    </div>
  </div>
);

const Courses = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedCourse]);

  if (selectedCourse) {
    return (
      <CourseDetail
        course={selectedCourse}
        onBack={() => setSelectedCourse(null)}
      />
    );
  }

  return (
    <div className="courses-page">
      <div className="courses-full-header">
        <h1 className="courses-full-title">Online Courses</h1>
        <p className="courses-full-subtitle">
          Explore the Courses we provide in our website
        </p>
      </div>

      <div className="courses-grid-wrap">
        <div className="courses-grid">
          {courseCards.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onArrowClick={setSelectedCourse}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;