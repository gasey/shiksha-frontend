import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ComingSoon from './ComingSoon';
import '../css/CoursePreview.css';
import '../css/Courses.css';

import cbseImg from '../assets/courses/Cbse.png';
import mbseImg from '../assets/courses/Mbse.png';

const TABS = ['Online', 'Classroom Training', 'Software Development'];

const BOARDS = [
  {
    id: 'CENTRAL_BOARD',
    title: 'Central Board',
    desc: 'National Curriculum Boards',
    image: cbseImg,
  },
  {
    id: 'STATE_BOARD',
    title: 'State Board',
    desc: 'Regional Curriculum Boards',
    image: mbseImg,
  },
];

const BoardCard = ({ board, onClick }) => (
  <div className="board-card-preview" onClick={onClick}>
    <div className="board-card-preview-image">
      <img
        src={board.image}
        alt={board.title}
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
    </div>

    <div className="board-card-preview-content">
      <h3>{board.title}</h3>
      <p>{board.desc}</p>

      <button
        className="board-card-preview-btn"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        BROWSE
      </button>
    </div>
  </div>
);

const CoursePreview = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Online');

  const handleBoardClick = (board) => {
    navigate('/courses', { state: { selectedBoard: board.id } });
    window.scrollTo(0, 0);
  };

  return (
    <section className="course-preview">
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

      {activeTab === 'Online' ? (
        <div className="preview-grid-wrap">
          <h2 className="preview-section-title">Boards</h2>

          <div className="preview-grid">
            {BOARDS.map((board) => (
              <BoardCard
                key={board.id}
                board={board}
                onClick={() => handleBoardClick(board)}
              />
            ))}
          </div>
        </div>
      ) : (
        <ComingSoon />
      )}
    </section>
  );
};

export default CoursePreview;