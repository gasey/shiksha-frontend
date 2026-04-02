import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FiArrowUpRight,
  FiUser,
  FiChevronDown,
  FiLogOut,
  FiFileText,
} from "react-icons/fi";
import "../css/Navbar.css";
import { HashLink } from "react-router-hash-link";

import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { t, switchLanguage } = useLanguage();
  const { isAuthenticated, user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const [fontSize, setFontSize] = useState(1);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileMenuRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

    if (isTeacher) {
      window.location.href =
        "https://teacher.shikshacom.com/teacher/dashboard";
    } else {
      window.location.href = "https://app.shikshacom.com/";
    }
  };

  const displayName = user?.email || "My Account";

  return (
    <>
      <div className="site-fixed-header">
        <div className="top-strip">
          <marquee width="90%" direction="left" height="30px" scrollAmount="10">
            <span>Hurry Up!!! Admission is going on.</span>
            <span> | New session starts from 2026 | </span>
            <span className="blink">Register Now!</span>
          </marquee>
          {/*}
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
          */}
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
            {isAuthenticated && user ? (
              <div className="header-profile-wrap" ref={profileMenuRef}>
                <span className="header-user-name">{displayName}</span>

                <button
                  type="button"
                  className="profile-btn"
                  onClick={() => setProfileOpen((prev) => !prev)}
                >
                  <FiUser size={18} />
                </button>

                {profileOpen && (
                  <div className="profile-dropdown">
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        navigate("/form-fillup");
                        setProfileOpen(false);
                      }}
                    >
                      <FiFileText size={16} />
                      Fill Form
                    </button>

                    <button
                      className="dropdown-item logout"
                      onClick={handleLogout}
                    >
                      <FiLogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
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
<li className="nav-item dropdown">
              <NavLink to="/about" onClick={closeMobileMenu}>
                {t("about")}
              </NavLink>

              <ul className="dropdown-menu">
                <li>
                  <HashLink smooth to="/about#vision" onClick={closeMobileMenu}>
                    {t("vision")}
                  </HashLink>
                </li>
                <li>
                  <HashLink smooth to="/about#mission" onClick={closeMobileMenu}>
                    {t("mission")}
                  </HashLink>
                </li>
                <li>
                  <HashLink smooth to="/about#values" onClick={closeMobileMenu}>
                    {t("values")}
                  </HashLink>
                </li>
                <li>
                  <HashLink smooth to="/about#why-shiksha" onClick={closeMobileMenu}>
                    {t("whyShiksha")}
                  </HashLink>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <button
  type="button"
  className={`nav-link nav-link-btn ${
    location.pathname === "/courses" ? "active" : ""
  }`}
  onClick={() => {
    closeMobileMenu();
    navigate("/courses", {
      state: { resetCourses: Date.now() },
    });
  }}
>
  {t("courses")}
</button>
            </li>

   <li className="nav-item dropdown">
  <NavLink to="/general-studies" onClick={closeMobileMenu}>
    General Studies
  </NavLink>

  <ul className="dropdown-menu">
  <li>
    <NavLink to="/blogs" onClick={closeMobileMenu}>
      Blogs
    </NavLink>
  </li>

  <li>
    <NavLink to="/current-affairs" onClick={closeMobileMenu}>
      Current Affairs
    </NavLink>
  </li>
</ul>
            </li>
            
            <li
              className={`nav-item dropdown${
                openDropdown === "others" ? " mobile-dropdown-open" : ""
              }`}
            >
              <span className="nav-label">Resources</span>
              <button
                className="mobile-dropdown-arrow"
                onClick={() => handleDropdownToggle("others")}
              >
                ▾
              </button>
              <ul className="dropdown-menu">
                <li>
                  <NavLink to="/forum" onClick={closeMobileMenu}>
                    {t("forum")}
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/insight" onClick={closeMobileMenu}>
                    Explore
                  </NavLink>
                </li>
                 
                <li className="nav-item dropdown nested-dropdown">
                  <span className="nav-labels">Skill Hub</span>
                  <ul className="dropdown-menu nested-menu">
                    <li>
                      <NavLink to="/training" onClick={closeMobileMenu}>
                        Industrial
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/training" onClick={closeMobileMenu}>
                        Specialized
                      </NavLink>
                    </li>
                  </ul>
                </li>

                <li className="nav-item dropdown nested-dropdown">
  <span className="nav-labels">Counselling</span>
  <ul className="dropdown-menu nested-menu">
    <li>
      <NavLink to="/counselling" onClick={closeMobileMenu}>
        Career
      </NavLink>
    </li>
    <li>
      <NavLink to="/counselling" onClick={closeMobileMenu}>
        Admission in India
      </NavLink>
    </li>
    <li>
      <NavLink to="/counselling" onClick={closeMobileMenu}>
        Admission in Abroad
      </NavLink>
    </li>
  </ul>
</li>

<li>
  <NavLink to="/upcoming" onClick={closeMobileMenu}>
    Placements
  </NavLink>
</li>
              </ul>
            </li>
            <li>
              <NavLink to="/contact" onClick={closeMobileMenu}>
                {t("contact")}
              </NavLink>
            </li>

            {isAuthenticated && user && (
              <li className="nav-dashboard-li">
                <button
                  type="button"
                  className="nav-dashboard-btn"
                  onClick={handleDashboard}
                >
                  go to dashboard
                  <FiArrowUpRight size={15} />
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>

      <div className="site-fixed-header-space"></div>
    </>
  );
};

export default Navbar;