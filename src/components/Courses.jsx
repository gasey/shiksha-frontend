import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/Courses.css';
import SubjectList from './SubjectList';
import { courseData, mbseCourseData } from '../data/courseData';

import cbseImg from '../assets/courses/Cbse.png';
import mbseImg from '../assets/courses/Mbse.png';
import class8Img from '../assets/courses/class8.png';
import class9Img from '../assets/courses/class9.png';
import class10Img from '../assets/courses/class10.png';
import class11ArtsImg from '../assets/courses/class11-Arts.png';
import class11ComImg from '../assets/courses/class11-Com.png';
import class11SciImg from '../assets/courses/class11-Sci.png';
import class12ArtsImg from '../assets/courses/class12-Arts.png';
import class12ComImg from '../assets/courses/class12-Com.png';
import class12SciImg from '../assets/courses/class12-Sci.png';

const BOARD_GROUPS = [
  {
    id: 'central',
    title: 'Central Board',
    desc: 'National Curriculum Boards',
    image: cbseImg,
  },
  {
    id: 'state',
    title: 'State Board',
    desc: 'Regional Curriculum Boards',
    image: mbseImg,
  },
];

const BOARD_OPTIONS = {
  central: [
    {
      id: 'cbse',
      title: 'CBSE',
      desc: 'Central Board of Secondary Education. Most widely followed board in India.',
      image: cbseImg,
    },
  ],
  state: [
    {
      id: 'mbse',
      title: 'MBSE',
      desc: 'Mizoram Board of School Education.',
      image: mbseImg,
    },
  ],
};

const CLASSES = [
  {
    id: 'class8',
    title: 'Class 8',
    desc: 'Information regarding the course',
    price: '₹1,500',
    image: class8Img,
  },
  {
    id: 'class9',
    title: 'Class 9',
    desc: 'Information regarding the course',
    price: '₹1,500',
    image: class9Img,
  },
  {
    id: 'class10',
    title: 'Class 10',
    desc: 'Information regarding the course',
    price: '₹1,500',
    image: class10Img,
  },
  {
    id: 'class11science',
    title: 'Class 11',
    subtitle: 'Science',
    desc: 'Physics, Chemistry, Biology, Mathematics',
    price: '₹1,500',
    image: class11SciImg,
  },
  {
    id: 'class11commerce',
    title: 'Class 11',
    subtitle: 'Commerce',
    desc: 'Accountancy, Business Studies, Economics',
    price: '₹1,500',
    image: class11ComImg,
  },
  {
    id: 'class11arts',
    title: 'Class 11',
    subtitle: 'Arts',
    desc: 'History, Political Science, Geography',
    price: '₹1,500',
    image: class11ArtsImg,
  },
  {
    id: 'class12science',
    title: 'Class 12',
    subtitle: 'Science',
    desc: 'Physics, Chemistry, Biology, Mathematics',
    price: '₹1,500',
    image: class12SciImg,
  },
  {
    id: 'class12commerce',
    title: 'Class 12',
    subtitle: 'Commerce',
    desc: 'Accountancy, Business Studies, Economics',
    price: '₹1,500',
    image: class12ComImg,
  },
  {
    id: 'class12arts',
    title: 'Class 12',
    subtitle: 'Arts',
    desc: 'History, Political Science, Geography',
    price: '₹1,500',
    image: class12ArtsImg,
  },
];

const SectionHeader = ({ title, subtitle, trail = [], onTrailClick }) => (
  <div className="courses-hero">
    {trail.length > 0 && (
      <div className="courses-breadcrumb">
        {trail.map((item, index) => {
          const isLast = index === trail.length - 1;

          return (
            <span key={item.key}>
              <button
                type="button"
                className={`courses-breadcrumb__item ${isLast ? 'is-active' : ''}`}
                onClick={() => !isLast && onTrailClick(item.key)}
                disabled={isLast}
              >
                {item.label}
              </button>
              {!isLast && <span className="courses-breadcrumb__sep">&gt;</span>}
            </span>
          );
        })}
      </div>
    )}

    <h1 className="courses-title">{title}</h1>
    {subtitle && <p className="courses-subtitle">{subtitle}</p>}
  </div>
);

const CourseTile = ({
  image,
  title,
  subtitle,
  desc,
  price,
  buttonText = 'Browse',
  onClick,
}) => {
  return (
    <article
      className="courses-tile"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick();
      }}
    >
      <div className="courses-tile__imageWrap">
        {image ? (
          <img src={image} alt={title} className="courses-tile__image" />
        ) : (
          <div className="courses-tile__imagePlaceholder">Course Image</div>
        )}
      </div>

      <div className="courses-tile__content">
        {subtitle && <span className="courses-tile__tag">{subtitle}</span>}
        <h3 className="courses-tile__title">{title}</h3>
        {desc && <p className="courses-tile__desc">{desc}</p>}

        <div className="courses-tile__footer">
          {price ? <span className="courses-tile__price">{price}</span> : <span />}
          <button
            type="button"
            className="courses-tile__btn"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </article>
  );
};

const Courses = () => {
  const location = useLocation();

  const [selectedBoardGroup, setSelectedBoardGroup] = useState(
    location.state?.selectedBoardGroup || null
  );
  const [selectedBoard, setSelectedBoard] = useState(location.state?.selectedBoard || null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [activeCourse, setActiveCourse] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedBoardGroup, selectedBoard, selectedClass, activeCourse]);

  useEffect(() => {
    if (location.state?.resetCourses) {
      setSelectedBoardGroup(null);
      setSelectedBoard(null);
      setSelectedClass(null);
      setActiveCourse(null);
    }
  }, [location.state]);

  const currentBoardGroup = useMemo(
    () => BOARD_GROUPS.find((item) => item.id === selectedBoardGroup),
    [selectedBoardGroup]
  );

  const currentBoard = useMemo(() => {
    if (!selectedBoardGroup || !selectedBoard) return null;
    return BOARD_OPTIONS[selectedBoardGroup]?.find((item) => item.id === selectedBoard) || null;
  }, [selectedBoardGroup, selectedBoard]);

  const resolvedCourseData = useMemo(() => {
    if (selectedBoard === 'mbse') return mbseCourseData;
    return courseData;
  }, [selectedBoard]);

  const handleTrailClick = (key) => {
    if (key === 'boards') {
      setSelectedBoardGroup(null);
      setSelectedBoard(null);
      setSelectedClass(null);
      setActiveCourse(null);
      return;
    }

    if (key === 'boardGroup') {
      setSelectedBoard(null);
      setSelectedClass(null);
      setActiveCourse(null);
      return;
    }

    if (key === 'board') {
      setSelectedClass(null);
      setActiveCourse(null);
    }
  };

  const handleBoardGroupSelect = (groupId) => {
    setSelectedBoardGroup(groupId);
    setSelectedBoard(null);
    setSelectedClass(null);
    setActiveCourse(null);
  };

  const handleBoardSelect = (boardId) => {
    setSelectedBoard(boardId);
    setSelectedClass(null);
    setActiveCourse(null);
  };

  const handleClassSelect = (cls) => {
    setSelectedClass(cls);
    const course = resolvedCourseData[cls.id];
    if (course) {
      setActiveCourse(course);
    }
  };

  if (activeCourse) {
    return (
      <SubjectList
        course={activeCourse}
        boardGroup={currentBoardGroup?.title}
        board={currentBoard?.title}
        selectedClass={
          selectedClass?.subtitle
            ? `${selectedClass.title} (${selectedClass.subtitle})`
            : selectedClass?.title
        }
        onBack={(level) => {
          if (level === 'boards') {
            setSelectedBoardGroup(null);
            setSelectedBoard(null);
            setSelectedClass(null);
            setActiveCourse(null);
            return;
          }

          if (level === 'boardGroup') {
            setSelectedBoard(null);
            setSelectedClass(null);
            setActiveCourse(null);
            return;
          }

          if (level === 'board') {
            setSelectedClass(null);
            setActiveCourse(null);
            return;
          }

          if (level === 'class') {
            setActiveCourse(null);
          }
        }}
      />
    );
  }

  if (selectedBoard) {
    return (
      <section className="courses-page">
        <div className="courses-container">
          <SectionHeader
            title="Courses"
            subtitle=""
            trail={[
              { key: 'boards', label: 'Boards' },
              { key: 'boardGroup', label: currentBoardGroup?.title || 'Board Type' },
              { key: 'board', label: currentBoard?.title || 'Board' },
            ]}
            onTrailClick={handleTrailClick}
          />

          <div className="courses-grid courses-grid--classes">
            {CLASSES.map((cls) => (
              <CourseTile
                key={cls.id}
                image={cls.image}
                title={cls.title}
                subtitle={cls.subtitle}
                desc={cls.desc}
                price={cls.price}
                buttonText="Browse"
                onClick={() => handleClassSelect(cls)}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (selectedBoardGroup) {
    return (
      <section className="courses-page">
        <div className="courses-container">
          <SectionHeader
            title={currentBoardGroup?.title || 'Boards'}
            subtitle=""
            trail={[
              { key: 'boards', label: 'Boards' },
              { key: 'boardGroup', label: currentBoardGroup?.title || 'Board Type' },
            ]}
            onTrailClick={handleTrailClick}
          />

          <div className="courses-grid courses-grid--board-options">
            {(BOARD_OPTIONS[selectedBoardGroup] || []).map((board) => (
              <CourseTile
                key={board.id}
                image={board.image}
                title={board.title}
                desc={board.desc}
                buttonText="Browse"
                onClick={() => handleBoardSelect(board.id)}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="courses-page">
      <div className="courses-container">
        <SectionHeader
          title="Boards"
          subtitle=""
          trail={[{ key: 'boards', label: 'Boards' }]}
          onTrailClick={handleTrailClick}
        />

        <div className="courses-grid courses-grid--boards">
          {BOARD_GROUPS.map((board) => (
            <CourseTile
              key={board.id}
              image={board.image}
              title={board.title}
              desc={board.desc}
              buttonText="Browse"
              onClick={() => handleBoardGroupSelect(board.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;