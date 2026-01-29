import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import "../css/Navbar.css";

import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { t, switchLanguage } = useLanguage();
  const { isAuthenticated, user, logout, hasRole, loading } = useAuth();
  const navigate = useNavigate();

  const [fontSize, setFontSize] = useState(1);

  // ⛔ Prevent wrong buttons during auth bootstrap
  if (loading) return null;

  /* ================= Accessibility ================= */

  const increaseFont = () => {
    const size = Math.min(fontSize + 0.1, 1.5);
    setFontSize(size);
    document.documentElement.style.fontSize = `${size * 100}%`;
  };

  const decreaseFont = () => {
    const size = Math.max(fontSize - 0.1, 0.8);
    setFontSize(size);
    document.documentElement.style.fontSize = `${size * 100}%`;
  };

  /* ================= Logout ================= */
  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* ===== TOP STRIP ===== */}
      <div className="top-strip">
        <marquee width="90%" direction="left" height="30px" scrollamount="10">
          <span>Hurry Up!!! Admission is going on.</span>
          <span> | New session starts from 2026 | </span>
          <span className="blink">Register Now!</span>
        </marquee>

        <div className="strip-controls">
          <button onClick={decreaseFont} className="accessibility-btn">
            A-
          </button>
          <button onClick={increaseFont} className="accessibility-btn">
            A+
          </button>
          <button onClick={switchLanguage} className="language-btn">
            {t("language")}
          </button>
        </div>
      </div>

      {/* ===== HEADER ===== */}
      <header className="main-header">
        <div className="header-left">
          <Link to="/" className="brand-link">
            <img src="/Shiksha.png" alt="Shiksha Logo" className="logo" />
            <div className="title">
              <h1>ShikshaCom</h1>
              <p>Empowerment Through Education</p>
            </div>
          </Link>
        </div>

        <div className="header-right">
          <a href="https://www.facebook.com" className="social-icon" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </a>
          <a href="https://www.instagram.com" className="social-icon" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://www.youtube.com" className="social-icon" target="_blank" rel="noopener noreferrer">
            <FaYoutube />
          </a>
        </div>
      </header>

      {/* ===== NAV ===== */}
      <nav className="navbar navbar-pc">
        <ul className="nav-menu">
          <li><Link to="/">{t("home")}</Link></li>

          <li className="nav-item dropdown">
            <Link to="/about">{t("about")}</Link>
            <ul className="dropdown-menu">
              <li><Link to="/vision">{t("vision")}</Link></li>
              <li><Link to="/mission">{t("mission")}</Link></li>
              <li><Link to="/values">{t("values")}</Link></li>
              <li><Link to="/why-shiksha">{t("whyShiksha")}</Link></li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <Link to="/upcoming">{t('registration')}</Link>
            <ul className="dropdown-menu">
              <li><Link to="/upcoming">{t('students')}</Link></li>
              <li><Link to="/upcoming">{t('teachers')}</Link></li>
              <li><Link to="/upcoming">{t('experts')}</Link></li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <Link to="/courses">{t("services")}</Link>
            <ul className="dropdown-menu">
              <li><Link to="/courses">{t("online")}</Link></li>
              <li><Link to="/upcoming">{t("classroom")}</Link></li>
              <li><Link to="/upcoming">{t("softwareDev")}</Link></li>
            </ul>
          </li>

          <li><Link to="/placements">Placements</Link></li>
          <li><Link to="/general-studies">{t("generalStudies")}</Link></li>
          <li><Link to="/forum">{t("forum")}</Link></li>

          <li className="nav-item dropdown">
            <Link to="/counselling">{t("counselling")}</Link>
            <ul className="dropdown-menu">
              <li><Link to="/counselling">{t("Career")}</Link></li>
              <li><Link to="/counselling">{t("Admission in India")}</Link></li>
              <li><Link to="/counselling">{t("Admission in Abroad")}</Link></li>
            </ul>
          </li>

          <li><Link to="/insight">{t("insight")}</Link></li>

          <li className="nav-item dropdown">
            <Link to="/training">{t('training')}</Link>
            <ul className="dropdown-menu">
              <li><Link to="/training">{t('industrial')}</Link></li>
              <li><Link to="/training">{t('specialized')}</Link></li>
            </ul>
          </li>

          <li><Link to="/contact">{t("contact")}</Link></li>

          {/* ===== AUTH SECTION ===== */}
          {isAuthenticated && user && (
            <>
              {hasRole?.("teacher") && (
                <li><Link to="/teacher">Teacher</Link></li>
              )}

              {hasRole?.("admin") && (
                <li><Link to="/admin">Admin</Link></li>
              )}

              <li className="nav-user">
                <span className="nav-email">{user.email}</span>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </li>
            </>
          )}

          {!isAuthenticated && (
            <li className="nav-auth">
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
