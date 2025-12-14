import "../css/Upcoming.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Counselling = () => {
  const counsellingFeatures = [
    {
      title: "Career Counselling",
      description: "Personalized guidance to help students choose the right career path.",
      status: "Coming Soon",
    },
    {
      title: "Admission in India",
      description: "Support & counselling for college admissions within India.",
      status: "Coming Soon",
    },
    {
      title: "Admission Abroad",
      description: "Guidance for applying to international universities.",
      status: "Coming Soon",
    },
  ];

  return (
    <div className="upcoming-page">
      <div className="upcoming-page-content">


        <div className="upcoming-container">
          <h1>Coming Soon</h1>
          <p className="upcoming-page-description">
            Our counselling services are under development. Here's what we are preparing for you:
          </p>

          <div className="upcoming-features-grid">
            {counsellingFeatures.map((item, index) => (
              <div key={index} className="upcoming-feature-card">
                <div className="upcoming-feature-header">
                  <h3>{item.title}</h3>
                  <span
                    className={`upcoming-status-badge ${item.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {item.status}
                  </span>
                </div>

                <p className="upcoming-feature-description">
                  {item.description}
                </p>

                <div className="upcoming-feature-footer"></div>
              </div>
            ))}
          </div>

          <div className="upcoming-cta-section">
            <h2>Stay Updated</h2>
            <p>Get notified when counselling services go live!</p>
            <div className="upcoming-cta-buttons">
              <button className="upcoming-notify-btn">Notify Me</button>
              <button
                className="upcoming-back-btn"
                onClick={() => window.history.back()}
              >
                Back
              </button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Counselling;
