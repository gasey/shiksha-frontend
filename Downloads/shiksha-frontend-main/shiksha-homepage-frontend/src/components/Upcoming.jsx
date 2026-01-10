import '../css/Upcoming.css';
import Navbar from './Navbar';
import Footer from './Footer';

const Upcoming = () => {
  const upcomingFeatures = [
    {
      title: "Teacher Registration Portal",
      description: "Complete registration system for educators to join our platform",
      status: "Coming Soon",
      
    },
    {
      title: "Expert Network",
      description: "Connect with industry experts for mentorship and guidance",
      status: "In Development",
    
    },
    {
      title: "Advanced Analytics Dashboard",
      description: "Comprehensive analytics for teachers and students",
      status: "Coming soon",
     
    },
    {
      title: "Mobile App Launch",
      description: "Native mobile applications for iOS and Android",
      status: "Coming Soon",
      
    },
    {
      title: "AI-Powered Learning Paths",
      description: "Personalized learning recommendations using AI",
      status: "Research Phase",
      
    },
    {
      title: "Virtual Reality Classrooms",
      description: "Immersive learning experiences in VR environments",
      status: "Concept Phase",
      
    }
  ];

  return (
    <div className="upcoming-page">
      <div className="upcoming-page-content">

        <Navbar />
        
        <div className="upcoming-container">
          <h1>Coming Soon</h1>
          <p className="upcoming-page-description">
            We're working hard to bring you exciting new features. Here's what's on our roadmap:
          </p>

          <div className="upcoming-features-grid">
            {upcomingFeatures.map((feature, index) => (
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
            <p>Be the first to know when these features launch!</p>
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

export default Upcoming;