import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { courseCards, CourseCard } from './Courses';
import ComingSoon from './ComingSoon';
import '../css/CoursePreview.css';

const TABS = ['Online', 'Classroom Training', 'Software Development'];

const CoursePreview = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Online');

  const handleArrow = (course) => {
    navigate('/courses', { state: { selectedCourse: course } });
    window.scrollTo(0, 0);
  };

  return (
    <div className="course-preview">
      {/* Tab bar */}
      <div className="preview-tab-bar">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`preview-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'Online' ? (
        <div className="preview-grid-wrap">
          <div className="preview-grid">
            {courseCards.slice(0, 4).map((course) => (
              <CourseCard key={course.id} course={course} onArrowClick={handleArrow} />
            ))}
          </div>
          <button className="preview-show-all-btn" onClick={() => { navigate('/courses'); window.scrollTo(0, 0); }}>
            Show all
          </button>
        </div>
      ) : (
        <ComingSoon />
      )}
    </div>
  );
};

export default CoursePreview;
