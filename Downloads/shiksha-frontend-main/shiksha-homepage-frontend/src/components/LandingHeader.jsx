import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import '../css/LandingHeader.css';

const LandingHeader = () => {
  const { t } = useLanguage();
  return (
    <div className="landing-header">
      <div className="search-section">
        <input
          type="text"
          placeholder="Search courses, teachers, topics..."
          className="search-bar"
        />
      </div>
      {/* Login and Signup Buttons */}
      <div className="auth-buttons">
          <Link to="/login" className="login-btn">Login</Link>
          <Link to="/signup" className="signup-btn">Signup</Link>
      </div>
      {/*<div className="header-icons">
        <button className="icon-btn" aria-label="Accessibility">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1m16.24-3.76l-4.24 4.24m-6-6L2.76 6.24m16.24 11.52l-4.24-4.24m-6 6L2.76 17.76"></path>
          </svg>
        </button>
        <button className="icon-btn" aria-label="Profile">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </button>
        <button className="icon-btn" aria-label="Notifications">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        </button>
        <button className="icon-btn mobile-menu" aria-label="Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>*/}
    </div>
  );
};

export default LandingHeader;
