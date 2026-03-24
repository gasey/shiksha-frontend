import '../css/LowerGrid.css';

const LowerGrid = () => {
  return (
    <div className="lower-grid">
      {/* STATS SECTION */}
      <section className="stats-section">
        <div className="stat">
          <div className="number">31+</div>
          <div className="label">Courses</div>
        </div>
        <div className="stat">
          <div className="number">100+</div>
          <div className="label">Practitioners</div>
        </div>
        <div className="stat">
          <div className="number">5</div>
          <div className="label">Labs</div>
        </div>
      </section>

      {/* WHY CHOOSE SHIKSHA HEADING */}
      <section className="why-choose-heading">
        <h2>Why Choose ShikshaCom?</h2>
      </section>

      {/* WHY CHOOSE SECTION */}
      <section className="why-choose-section">
        <div className="features">
          <div className="feature-card">
            <h4>Academic Courses</h4>
            <p>Bringing Board Topics for Class 8 – 12</p>
          </div>
          <div className="feature-card">
            <h4>Student Courses</h4>
            <p>Bringing Board Topics for Class 8 – 12</p>
          </div>
          <div className="feature-card">
            <h4>Judicial Courses</h4>
            <p>Bringing Board Topics for Class 8 – 12</p>
          </div>
          <div className="feature-card">
            <h4>Academic Courses</h4>
            <p>Bringing Board Topics for Class 8 – 12</p>
          </div>
        </div>
        <div className="promo-video">
          <p>(promo video will be played here statically)</p>
        </div>
      </section>
    </div>
  );
};

export default LowerGrid;
