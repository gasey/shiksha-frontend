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
          <div className="number">0+</div>
          <div className="label">Enrollment</div>
        </div>
        <div className="stat">
          <div className="number">1</div>
          <div className="label">Sites</div>
        </div>
      </section>

      {/* WHY CHOOSE SHIKSHA HEADING */}
      <section className="why-choose-heading">
        <h2>Why Choose Shiksha?</h2>
      </section>

      {/* WHY CHOOSE SECTION */}
      <section className="why-choose-section">
        <div className="features">
          <div className="feature-card">
            <h4>Academic Courses</h4>
            <p>Comprehensive curriculum for all levels.</p>
          </div>
          <div className="feature-card">
            <h4>Advance Teaching</h4>
            <p>Expert instructors with modern methods.</p>
          </div>
          <div className="feature-card">
            <h4>Self Paced Learning</h4>
            <p>Learn at your own speed.</p>
          </div>
          <div className="feature-card">
            <h4>Registration</h4>
            <p>Easy and quick enrollment process.</p>
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
