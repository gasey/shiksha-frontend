import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import "../css/Navbar.css";

import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { t, switchLanguage } = useLanguage();
  const { isAuthenticated, user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const [fontSize, setFontSize] = useState(1);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleMobileMenu = () => {
    setMobileOpen((prev) => !prev);
    setOpenDropdown(null);
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  const handleDropdownToggle = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  // Prevent render while auth bootstraps
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
        <marquee width="90%" direction="left" height="30px" scrollAmount="10">
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
          <div className="header-social">
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
          <div className="header-auth">
            <Link to="/login"  className="header-login-btn">Login</Link>
            <Link to="/signup" className="header-signup-btn">Signup</Link>
          </div>
        </div>
      </header>

      {/* ===== NAV ===== */}
      <nav className="navbar navbar-pc">
        {/* Hamburger – phone only */}
        <button
          className={`hamburger-btn${mobileOpen ? " open" : ""}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-menu${mobileOpen ? " mobile-open" : ""}`}>
          <li><NavLink to="/" end onClick={closeMobileMenu}>{t("home")}</NavLink></li>

          <li className={`nav-item dropdown${openDropdown === "about" ? " mobile-dropdown-open" : ""}`}>
            <NavLink to="/about" onClick={closeMobileMenu}>{t("about")}</NavLink>
            <button className="mobile-dropdown-arrow" onClick={() => handleDropdownToggle("about")} aria-label="Toggle about menu">▾</button>
            <ul className="dropdown-menu">
              <li><NavLink to="/vision" onClick={closeMobileMenu}>{t("vision")}</NavLink></li>
              <li><NavLink to="/mission" onClick={closeMobileMenu}>{t("mission")}</NavLink></li>
              <li><NavLink to="/values" onClick={closeMobileMenu}>{t("values")}</NavLink></li>
              <li><NavLink to="/why-shiksha" onClick={closeMobileMenu}>{t("whyShiksha")}</NavLink></li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <NavLink to="/courses" onClick={closeMobileMenu}>{t("courses")}</NavLink>
          </li>

          <li><NavLink to="/upcoming" onClick={closeMobileMenu}>Placements</NavLink></li>
          <li><NavLink to="/general-studies" onClick={closeMobileMenu}>{t("generalStudies")}</NavLink></li>
          <li><NavLink to="/forum" onClick={closeMobileMenu}>{t("forum")}</NavLink></li>

          <li className={`nav-item dropdown${openDropdown === "counselling" ? " mobile-dropdown-open" : ""}`}>
            <NavLink to="/counselling" onClick={closeMobileMenu}>{t("counselling")}</NavLink>
            <button className="mobile-dropdown-arrow" onClick={() => handleDropdownToggle("counselling")} aria-label="Toggle counselling menu">▾</button>
            <ul className="dropdown-menu">
              <li><NavLink to="/counselling" onClick={closeMobileMenu}>{t("Career")}</NavLink></li>
              <li><NavLink to="/counselling" onClick={closeMobileMenu}>{t("Admission in India")}</NavLink></li>
              <li><NavLink to="/counselling" onClick={closeMobileMenu}>{t("Admission in Abroad")}</NavLink></li>
            </ul>
          </li>

          <li className={`nav-item dropdown${openDropdown === "training" ? " mobile-dropdown-open" : ""}`}>
            <NavLink to="/training" onClick={closeMobileMenu}>{t("training")}</NavLink>
            <button className="mobile-dropdown-arrow" onClick={() => handleDropdownToggle("training")} aria-label="Toggle training menu">▾</button>
            <ul className="dropdown-menu">
              <li><NavLink to="/training" onClick={closeMobileMenu}>{t("industrial")}</NavLink></li>
              <li><NavLink to="/training" onClick={closeMobileMenu}>{t("specialized")}</NavLink></li>
            </ul>
          </li>

          <li><NavLink to="/insight" onClick={closeMobileMenu}>{t("insight")}</NavLink></li>
          <li><NavLink to="/contact" onClick={closeMobileMenu}>{t("contact")}</NavLink></li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
