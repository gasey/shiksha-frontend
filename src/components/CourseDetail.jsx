import { useNavigate } from 'react-router-dom';

const CourseDetail = ({ course, onBack }) => {
  const navigate = useNavigate();

  if (!course) return null;

  const hasStructuredContent = course.overview && course.topics;

  if (!hasStructuredContent) {
    return (
      <div className="courses-page">
        <div className="course-detail-page">
          <h2 className="course-detail-title">{course.title}</h2>
          <p className="course-detail-subtitle">{course.desc}</p>

          <div className="course-detail-footer">
            <span className="course-detail-price">{course.price}</span>
            <button
              className="course-buy-button"
              onClick={() =>
                navigate('/payment', {
                  state: { className: course.title, price: course.price },
                })
              }
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="courses-page">
      <div className="course-detail-page">
        <h2 className="course-detail-title">
          {course.title} — Complete Academic Program
        </h2>

        <table className="course-info-table">
          <tbody>
            <tr>
              <td><strong>Board:</strong></td>
              <td>{course.overview.board}</td>
            </tr>
            <tr>
              <td><strong>Class:</strong></td>
              <td>{course.overview.className}</td>
            </tr>
            <tr>
              <td><strong>Stream:</strong></td>
              <td>{course.overview.stream}</td>
            </tr>
            <tr>
              <td><strong>Mode:</strong></td>
              <td>{course.overview.mode}</td>
            </tr>
            <tr>
              <td><strong>Platform:</strong></td>
              <td>{course.overview.platform}</td>
            </tr>
            <tr>
              <td><strong>Document:</strong></td>
              <td>{course.overview.document}</td>
            </tr>
          </tbody>
        </table>

        <div className="course-section-title">About This Program</div>
        <div className="course-about-section">
          <p>{course.overview.about}</p>
        </div>

        <h3 className="course-highlight-title">Key Features of This Program</h3>
        <table className="course-feature-table">
          <tbody>
            {course.overview.features.map(([label, value], index) => (
              <tr key={index}>
                <td><strong>{label}</strong></td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="course-section-title">Subjects Covered</div>
        <table className="course-subjects-table">
          <tbody>
            {course.overview.subjectsCovered.map((subject, index) => (
              <tr key={index}>
                <td>• {subject}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="course-outline-title">Chapter-wise Lesson Plan</div>

        {course.topics.map((topic, topicIndex) => (
          <div className="course-topic-block" key={topicIndex}>
            <div className="course-topic-title">{topic.title}</div>
            <p className="course-topic-book">Textbook: {topic.textbook}</p>

            <table className="course-chapter-table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Lesson / Chapter Title</th>
                </tr>
              </thead>
              <tbody>
                {topic.chapters.map((chapter, chapterIndex) => (
                  <tr key={chapterIndex}>
                    <td>{chapterIndex + 1}</td>
                    <td>{chapter}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

        <div className="course-detail-footer">
          <span className="course-detail-price">{course.price}</span>
          <button
            className="course-buy-button"
            onClick={() =>
              navigate('/payment', {
                state: { className: course.title, price: course.price },
              })
            }
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;