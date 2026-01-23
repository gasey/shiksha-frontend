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

  /* ================= Auth ================= */

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const showDashboard = isAuthenticated && !hasRole("admin");

  /* ================= Render ================= */

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
          <a href="https://www.facebook.com" className="social-icon">
            <FaFacebookF />
          </a>
          <a href="https://www.instagram.com" className="social-icon">
            <FaInstagram />
          </a>
          <a href="https://www.youtube.com" className="social-icon">
            <FaYoutube />
          </a>
        </div>
      </header>

      {/* ===== NAV ===== */}
      <nav className="navbar navbar-pc">
        <ul className="nav-menu">
          <li><Link to="/">{t("home")}</Link></li>
          <li><Link to="/about">{t("about")}</Link></li>
          <li><Link to="/upcoming">{t("registration")}</Link></li>
          <li><Link to="/courses">{t("services")}</Link></li>
          <li><Link to="/placements">Placements</Link></li>
          <li><Link to="/general-studies">{t("generalStudies")}</Link></li>
          <li><Link to="/forum">{t("forum")}</Link></li>
          <li><Link to="/counselling">{t("counselling")}</Link></li>
          <li><Link to="/insight">{t("insight")}</Link></li>
          <li><Link to="/contact">{t("contact")}</Link></li>

          {!isAuthenticated ? (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </>
          ) : (
            <>
              {showDashboard && (
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              )}

              {hasRole("teacher") && (
                <li>
                  <Link to="/teacher">Teacher</Link>
                </li>
              )}

              {hasRole("admin") && (
                <li>
                  <Link to="/admin">Admin</Link>
                </li>
              )}

              <li className="nav-user">
                <span className="nav-email">{user?.email}</span>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
