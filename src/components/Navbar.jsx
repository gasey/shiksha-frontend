import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import '../css/Navbar.css';
import { useLanguage } from '../contexts/LanguageContext';


const Navbar = () => {
  const [contrast, setContrast] = useState(false);
  const [fontSize, setFontSize] = useState(1);
  const { t, switchLanguage } = useLanguage();

{/*const toggleContrast = () => {
    setContrast(!contrast);
    document.body.classList.toggle('high-contrast');
  };*/}

  const increaseFont = () => {
    setFontSize(prev => Math.min(prev + 0.1, 1.5));
    document.documentElement.style.fontSize = `${fontSize * 100}%`;
  };

  const decreaseFont = () => {
    setFontSize(prev => Math.max(prev - 0.1, 0.8));
    document.documentElement.style.fontSize = `${fontSize * 100}%`;
  };

  return (
    <>
      {/* Top Slim Strip */}
      <div className="top-strip">
        <div className="strip-text">
        </div>
        <div className="strip-controls">
      {/*   <button onClick={toggleContrast} className="accessibility-btn" aria-label="Toggle contrast">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </button>*/}
          <button onClick={decreaseFont} className="accessibility-btn" aria-label="Decrease font size">
            A-
          </button>
          <button onClick={increaseFont} className="accessibility-btn" aria-label="Increase font size">
            A+
          </button>
          <button onClick={switchLanguage} className="language-btn">
            {t('language')}
          </button>
        </div>
      </div> 

      {/* Main Header */}
      <header className="main-header">
        <div className="header-left">
           <Link to="/"
            className="brand-link"
            style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }} >
          <img src="/Shiksha.png" alt="Shiksha Logo" className="logo" />
          <div className="title">
            <h1>ShikshaCom</h1>
            <p>Empowerment Through Education</p>
          </div>
          </Link>
        </div>
        <div className="header-right">
            <a href="https://www.facebook.com/profile.php?id=61580053190184" className="social-icon" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://www.instagram.com/shikshacom/" className="social-icon" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://www.youtube.com/@Shikshacom-edu" className="social-icon" aria-label="YouTube"><FaYoutube /></a>
        </div> 
      </header>

      {/* Navigation Bar */}
      <nav className="navbar">
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="/">{t('home')}</a>
          </li>
          <li className="nav-item dropdown">
            <Link to="/about">{t('about')}</Link>
            <ul className="dropdown-menu">
              <li><Link to="/vision">{t('vision')}</Link></li>
              <li><Link to="/mission">{t('mission')}</Link></li>
              <li><Link to="/values">{t('values')}</Link></li>
              <li><Link to="/why-shiksha">{t('whyShiksha')}</Link></li>
            </ul>
          </li>
          <li className="nav-item dropdown">
            <a href="/upcoming">{t('registration')}</a>
            <ul className="dropdown-menu">
              <li><a href="/upcoming">{t('students')}</a></li>
              <li><a href="/upcoming">{t('teachers')}</a></li>
              <li><a href="/upcoming">{t('experts')}</a></li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <a href="/courses">{t('services')}</a>
            <ul className="dropdown-menu">
              <li><a href="/courses">{t('online')}</a></li>
              <li><span className="locked-link">{t('classroom')} <span className="lock-icon">🔒</span></span></li>
              <li><span className="locked-link">{t('softwareDev')} <span className="lock-icon">🔒</span></span></li>
            </ul>
          </li>
          
         {/* <li className="nav-item dropdown">
            <a href="/courses">{t('services')}</a>
            <ul className="dropdown-menu">
              <li><a href="/courses">{t('online')}</a></li>
              <li><a href="/upcoming">{t('offline')}</a></li>
              <li><a href="/upcoming">{t('classroom')}</a></li>
              <li><a href="/upcoming">{t('softwareDev')}</a></li>
            </ul>
          </li> /}

          {/*<li className="nav-item dropdown">
            <a href="#genral-studies">{t('generalStudies')}</a>
            <ul className="dropdown-menu">
              <li><a href="/current-affairs">{t('currentAffairs')}</a></li>
            </ul>
          </li>*/}
          <li className="nav-item">
            <span className="locked-link">
              {t('generalStudies')} <span className="lock-icon">🔒</span>
            </span>
          </li>
          {/*<li className="nav-item dropdown">
            <a href="#councelling">{t('counselling')}</a>
             <ul className="dropdown-menu">
              <li><a href="#career">Career Councelling</a></li>
              <li><a href="#admission-in-india">Admission in India</a></li>
              <li><a href="#admission-in-abroad">Admission in Abroad</a></li>
            </ul>
          </li>*/}
           <li className="nav-item">
            <span className="locked-link">
              {t('counselling')} <span className="lock-icon">🔒</span>
            </span>
          </li>
          <li className="nav-item">
            <span className="locked-link">
              {t('forum')} <span className="lock-icon">🔒</span>
            </span>
          </li>
          <li className="nav-item">
            <Link to="/insight">{t('insight')}</Link>
          </li>
          {/*} <li className="nav-item dropdown">
            <a href="#training">{t('training')}</a>
             <ul className="dropdown-menu">
              <li><a href="#industrial">Industrial</a></li>
              <li><a href="#specialized">Specialized</a></li>
            </ul>
          </li> */}
          <li className="nav-item">
            <span className="locked-link">
              {t('training')} <span className="lock-icon">🔒</span>
            </span>
          </li>
          <li className="nav-item">
            <span className="locked-link">
              {t('placements')} <span className="lock-icon">🔒</span>
            </span>
          </li>
          <li className="nav-item">
            <a href="/contact">{t('contact')}</a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;