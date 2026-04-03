import "../css/AboutShiksha.css";

const AboutShiksha = () => {
  return (
    <section className="sa-section">
      {/* ambient glows — mirrors hero-glow-1 / 2 */}
      <div className="sa-glow-1"></div>
      <div className="sa-glow-2"></div>

      <div className="sa-inner">

        {/* LEFT */}
        <div className="sa-left">
          <div className="sa-features">

            <div className="sa-feat">
              <div className="sa-feat-icon">
                <i className="fa-solid fa-graduation-cap"></i>
              </div>
              <div>
                <div className="sa-feat-title">Board-Aligned Academic Programs</div>
                <div className="sa-feat-sub">Full curriculum coverage for Class 8 – 12</div>
              </div>
            </div>

            <div className="sa-feat">
              <div className="sa-feat-icon">
                <i className="fa-solid fa-bullseye"></i>
              </div>
              <div>
                <div className="sa-feat-title">Competitive Exam Preparation</div>
                <div className="sa-feat-sub">JEE, NEET, UPSC & more</div>
              </div>
            </div>

            <div className="sa-feat">
              <div className="sa-feat-icon">
                <i className="fa-solid fa-tower-broadcast"></i>
              </div>
              <div>
                <div className="sa-feat-title">Dual Delivery — Live & Recorded</div>
                <div className="sa-feat-sub">Live + recorded lectures</div>
              </div>
            </div>

            <div className="sa-feat">
              <div className="sa-feat-icon">
                <i className="fa-solid fa-mobile-screen-button"></i>
              </div>
              <div>
                <div className="sa-feat-title">Mobile-First Access</div>
                <div className="sa-feat-sub">Works on all devices</div>
              </div>
            </div>

          </div>

          <div className="sa-cta-row">
            <a href="/courses" className="sa-btn">
              Explore Programs
              <span className="sa-btn-arrow">
                <i className="fa-solid fa-arrow-right"></i>
              </span>
            </a>
            <div className="sa-trust">
              <i className="fa-solid fa-circle-check"></i>
              Free preview — no sign-up required
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="sa-right">
          <div className="sa-card">
            <div className="sa-card-title">
              Empowering Learners Across Northeast India
            </div>

            <div className="sa-stat-grid">
              <div className="sa-stat-box">
                <div className="sa-stat-val">17<span>+</span></div>
                <div className="sa-stat-lbl">Academic Programs</div>
              </div>
              <div className="sa-stat-box">
                <div className="sa-stat-val">8<span>+</span></div>
                <div className="sa-stat-lbl">Exam Categories</div>
              </div>
              <div className="sa-stat-box">
                <div className="sa-stat-val" style={{ fontSize: "22px" }}>Live</div>
                <div className="sa-stat-lbl">Interactive Classes</div>
              </div>
              <div className="sa-stat-box">
                <div className="sa-stat-val" style={{ fontSize: "22px", color: "#ff8f01" }}>Free</div>
                <div className="sa-stat-lbl">Guest Preview Access</div>
              </div>
            </div>

            <div className="sa-badges">
              <span className="sa-badge">CBSE Aligned</span>
              <span className="sa-badge">NCERT Based</span>
              <span className="sa-badge">Mizoram Board</span>
              <span className="sa-badge">NTA Pattern</span>
              <span className="sa-badge">UPSC Framework</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutShiksha;