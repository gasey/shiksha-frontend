import '../css/Upcoming.css';
import Navbar from './Navbar';
import Footer from './Footer';

const Training = () => {
  const trainingFeatures = [
    {
      title: "Industrial Training Programs",
      description: "Hands-on training in various industrial sectors including manufacturing, IT, and engineering",
      status: "Coming Soon",
    },
    {
      title: "Specialized Skill Development",
      description: "Advanced courses in niche areas like AI, data science, and digital marketing",
      status: "Coming Soon",
    },
 /*   {
      title: "Teacher Training Workshops",
      description: "Professional development programs for educators to enhance teaching skills",
      status: "Planning Phase",
    },
    {
      title: "Corporate Training Solutions",
      description: "Customized training programs for businesses and organizations",
      status: "Coming Soon",
    },
    {
      title: "Online Certification Courses",
      description: "Industry-recognized certifications in various technical and non-technical fields",
      status: "Research Phase",
    },
    {
      title: "Internship Programs",
      description: "Real-world experience opportunities for students and fresh graduates",
      status: "Concept Phase",
    } */
  ];

  return (
    <div className="upcoming-page">
      <div className="upcoming-page-content">
        <Navbar />
        <div className="upcoming-container">
          <h1>Training Programs - Coming Soon</h1>
          <p className="upcoming-page-description">
            We're developing comprehensive training programs to empower learners and professionals. Here's what's in our pipeline:
          </p>

          <div className="upcoming-features-grid">
            {trainingFeatures.map((feature, index) => (
              <div key={index} className="upcoming-feature-card">
                <div className="upcoming-feature-header">
                  <h3>{feature.title}</h3>
                  <span className={`upcoming-status-badge ${feature.status.toLowerCase().replace(' ', '-')}`}>
                    {feature.status}
                  </span>
                </div>
                <p className="upcoming-feature-description">{feature.description}</p>
                <div className="upcoming-feature-footer">
                </div>
              </div>
            ))}
          </div>

          <div className="upcoming-cta-section">
            <h2>Stay Updated</h2>
            <p>Be the first to know when our training programs launch!</p>
            <div className="upcoming-cta-buttons">
              <button className="upcoming-notify-btn">Notify Me</button>
              <button className="upcoming-back-btn" onClick={() => window.history.back()}>
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

export default Training;
