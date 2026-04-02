import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/SubjectList.css';

const Breadcrumb = ({ items, onNavigate }) => {
  return (
    <div className="course-breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={item.key}>
            <button
              type="button"
              className={`course-breadcrumb__item ${isLast ? 'is-active' : ''}`}
              onClick={() => !isLast && onNavigate(item.key)}
              disabled={isLast}
            >
              {item.label}
            </button>
            {!isLast && <span className="course-breadcrumb__sep">&gt;</span>}
          </span>
        );
      })}
    </div>
  );
};

const SubjectList = ({ course, boardGroup, board, selectedClass, onBack }) => {
  const navigate = useNavigate();
  const [expandedIndex, setExpandedIndex] = useState(0);

  if (!course || !course.topics) return null;

  const courseName = selectedClass || course.title;
  const coursePrice = course.price || '₹1,500';
  const boardName = board || 'CBSE';
  const isMbse = boardName.toLowerCase() === 'mbse';

  const summaryText = useMemo(() => {
    if (isMbse) {
      return `${courseName} complete curriculum for ${boardName} with subject-wise structured coverage, chapter breakdown, and board-aligned academic preparation.`;
    }

    return `${courseName} complete curriculum with subject-wise structured coverage, chapter breakdown, and strong board exam preparation support.`;
  }, [courseName, boardName, isMbse]);

  const learnItems = useMemo(
    () => [
      `Master complete ${courseName} curriculum across all subjects`,
      'Attend live interactive classes with expert educators',
      'Access recorded sessions for unlimited revision',
      `Prepare comprehensively for ${boardName} board examinations`,
      'Complete chapter-wise assignments for self-assessment',
      'Take quizzes for regular practice and progress tracking',
      'Build strong conceptual understanding',
      isMbse
        ? 'Learn from MBSE / textbook-aligned curriculum'
        : 'Learn from textbook-aligned curriculum',
    ],
    [courseName, boardName, isMbse]
  );

  const includeItems = [
    `${course.topics.length} subject sections included in this course`,
    'Live interactive sessions + recorded access',
    'Lifetime access after course completion',
    'Private session support with educators',
    'Assignments and quizzes for self-assessment',
    'Access on mobile and desktop',
    `${boardName} curriculum-aligned content`,
  ];

  const handleBreadcrumbNav = (key) => {
    onBack?.(key);
  };

  return (
    <div className="course-detail-screen">
      <section className="course-detail-hero">
        <div className="course-detail-container">
          <Breadcrumb
            items={[
              { key: 'boards', label: 'Boards' },
              { key: 'boardGroup', label: boardGroup || 'Board Type' },
              { key: 'board', label: boardName },
              { key: 'class', label: courseName },
              { key: 'detail', label: 'Course Detail' },
            ]}
            onNavigate={handleBreadcrumbNav}
          />

          <div className="course-detail-hero__content">
            <h1 className="course-detail-hero__title">
              {courseName} — Complete Academic Program
            </h1>

            <p className="course-detail-hero__summary">
              {summaryText}
              <br />
              Live Digital Classes | Structured learning | Chapter-wise coverage | Board-focused preparation
            </p>

            <p className="course-detail-hero__meta">
              Created by ShikshaCom Education Team
            </p>

            <p className="course-detail-hero__meta">
              Board: {boardName} / Curriculum aligned
            </p>
          </div>
        </div>
      </section>

      <div className="course-detail-container">
        <div className="course-page-layout">
          <div className="course-page-left">
            <div className="course-detail-panel">
              <section className="course-learn-box">
                <h2 className="course-section-heading">What you'll learn</h2>

                <div className="course-learn-grid">
                  {learnItems.map((item, index) => (
                    <div key={index} className="course-learn-item">
                      ✓ {item}
                    </div>
                  ))}
                </div>
              </section>

              <section className="course-includes">
                <h3 className="course-sub-heading">This course includes:</h3>

                <div className="course-includes-grid">
                  {includeItems.map((item, index) => (
                    <div key={index} className="course-includes-item">
                      {item}
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="course-detail-panel course-detail-panel--content">
              <section className="course-content-section">
                <div className="course-content-head">
                  <h3 className="course-sub-heading">Course Contents</h3>
                </div>

                <div className="course-accordion">
                  {course.topics.map((topic, index) => {
                    const isOpen = expandedIndex === index;

                    return (
                      <div className="course-accordion__item" key={index}>
                        <button
                          type="button"
                          className="course-accordion__header"
                          onClick={() => setExpandedIndex(isOpen ? null : index)}
                        >
                          <span className="course-accordion__left">
                            <span
                              className={`course-accordion__arrow ${isOpen ? 'is-open' : ''}`}
                            >
                              ▾
                            </span>
                            <span>{topic.title}</span>
                          </span>

                          <span className="course-accordion__count">
                            {topic.chapters?.length || 0} Chapters
                          </span>
                        </button>

                        {isOpen && (
                          <div className="course-accordion__body">
                            <p className="course-accordion__textbook">
                              Textbook: {topic.textbook}
                            </p>

                            <ul className="course-accordion__chapters">
                              {topic.chapters.map((chapter, chapterIndex) => (
                                <li key={chapterIndex}>
                                  {chapterIndex + 1}. {chapter}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>
          </div>

          <aside className="purchase-card">
            <h3 className="purchase-card__title">Purchase course</h3>

            <div className="purchase-card__plan">
              <div className="purchase-card__radio" />
              <div>
                <p className="purchase-card__label">Subscribe</p>
                <p className="purchase-card__price">{coursePrice} / month</p>
              </div>
            </div>

            <ul className="purchase-card__features">
              <li>Duration: 12 months</li>
              <li>Lifetime access after course completion</li>
              <li>Access to all subjects included in this course</li>
            </ul>

            <button
              className="purchase-card__btn"
              onClick={() =>
                navigate('/payment', {
                  state: {
                    className: courseName,
                    price: coursePrice,
                    board: boardName,
                  },
                })
              }
            >
              Start Subscription
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default SubjectList;