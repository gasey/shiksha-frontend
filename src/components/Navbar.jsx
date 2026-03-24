import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../css/Navbar.css";

import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { t, switchLanguage } = useLanguage();
  const { isAuthenticated, user, loading, logout } = useAuth();
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

  if (loading) return null;

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

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const handleDashboard = () => {
    if (!user) return;

    const roles = Array.isArray(user?.roles) ? user.roles : [];
    const normalizedRoles = roles.map((r) => String(r).toLowerCase());
    const singleRole = String(user?.role || "").toLowerCase();

    const isTeacher =
      normalizedRoles.includes("teacher") || singleRole === "teacher";

    const isStudent =
      normalizedRoles.includes("student") || singleRole === "student";

    if (isTeacher) {
      window.location.href = "https://teacher.shikshacom.com/teacher/dashboard";
      return;
    }

    if (isStudent) {
      window.location.href = "https://app.shikshacom.com/";
      return;
    }

    window.location.href = "https://app.shikshacom.com/";
  };

  const displayName =
    user?.name ||
    user?.full_name ||
    user?.username ||
    user?.email?.split("@")[0] ||
    "My Account";

  return (
    <>
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
          <div className="header-auth">
          {isAuthenticated && user ? (
  <div className="header-auth-loggedin">
    <button
      type="button"
      className="header-dashboard-btn"
      onClick={handleDashboard}
    >
      Dashboard
    </button>

    <div className="header-user-row">
      <span className="header-user-name">{displayName}</span>

      <button
        type="button"
        className="header-login-btn"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  </div>
) : (
  <div className="header-auth">
    <Link to="/login" className="header-login-btn">
      Login
    </Link>
    <Link to="/signup" className="header-signup-btn">
      Signup
    </Link>
  </div>
)}
          </div>
        </div>
      </header>

      <nav className="navbar navbar-pc">
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
          <li>
            <NavLink to="/" end onClick={closeMobileMenu}>
              {t("home")}
            </NavLink>
          </li>

          <li
            className={`nav-item dropdown${
              openDropdown === "about" ? " mobile-dropdown-open" : ""
            }`}
          >
            <NavLink to="/about" onClick={closeMobileMenu}>
              {t("about")}
            </NavLink>
            <button
              className="mobile-dropdown-arrow"
              onClick={() => handleDropdownToggle("about")}
              aria-label="Toggle about menu"
            >
              ▾
            </button>
            <ul className="dropdown-menu">
              <li>
                <NavLink to="/vision" onClick={closeMobileMenu}>
                  {t("vision")}
                </NavLink>
              </li>
              <li>
                <NavLink to="/mission" onClick={closeMobileMenu}>
                  {t("mission")}
                </NavLink>
              </li>
              <li>
                <NavLink to="/values" onClick={closeMobileMenu}>
                  {t("values")}
                </NavLink>
              </li>
              <li>
                <NavLink to="/why-shiksha" onClick={closeMobileMenu}>
                  {t("whyShiksha")}
                </NavLink>
              </li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <NavLink to="/courses" onClick={closeMobileMenu}>
              {t("courses")}
            </NavLink>
          </li>

          <li>
            <NavLink to="/upcoming" onClick={closeMobileMenu}>
              Placements
            </NavLink>
          </li>
          <li>
            <NavLink to="/general-studies" onClick={closeMobileMenu}>
              {t("generalStudies")}
            </NavLink>
          </li>
          <li>
            <NavLink to="/forum" onClick={closeMobileMenu}>
              {t("forum")}
            </NavLink>
          </li>

          <li
            className={`nav-item dropdown${
              openDropdown === "counselling" ? " mobile-dropdown-open" : ""
            }`}
          >
            <NavLink to="/counselling" onClick={closeMobileMenu}>
              {t("counselling")}
            </NavLink>
            <button
              className="mobile-dropdown-arrow"
              onClick={() => handleDropdownToggle("counselling")}
              aria-label="Toggle counselling menu"
            >
              ▾
            </button>
            <ul className="dropdown-menu">
              <li>
                <NavLink to="/counselling" onClick={closeMobileMenu}>
                  {t("Career")}
                </NavLink>
              </li>
              <li>
                <NavLink to="/counselling" onClick={closeMobileMenu}>
                  {t("Admission in India")}
                </NavLink>
              </li>
              <li>
                <NavLink to="/counselling" onClick={closeMobileMenu}>
                  {t("Admission in Abroad")}
                </NavLink>
              </li>
            </ul>
          </li>

          <li
            className={`nav-item dropdown${
              openDropdown === "training" ? " mobile-dropdown-open" : ""
            }`}
          >
            <NavLink to="/training" onClick={closeMobileMenu}>
              {t("training")}
            </NavLink>
            <button
              className="mobile-dropdown-arrow"
              onClick={() => handleDropdownToggle("training")}
              aria-label="Toggle training menu"
            >
              ▾
            </button>
            <ul className="dropdown-menu">
              <li>
                <NavLink to="/training" onClick={closeMobileMenu}>
                  {t("industrial")}
                </NavLink>
              </li>
              <li>
                <NavLink to="/training" onClick={closeMobileMenu}>
                  {t("specialized")}
                </NavLink>
              </li>
            </ul>
          </li>

          <li>
            <NavLink to="/insight" onClick={closeMobileMenu}>
              {t("insight")}
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={closeMobileMenu}>
              {t("contact")}
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;