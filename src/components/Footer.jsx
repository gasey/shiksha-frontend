import '../css/Footer.css';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../assets/Shiksha.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Branding Section */}
        <div className="footer-branding">
          <div className="footer-brand-top">
            <img src={logo} alt="ShikshaCom Logo" className="footer-logo" />
            <div className="footer-brand-text">
              <h2>ShikshaCom</h2>
              <p className="footer-tagline">Empowerment Through Education</p>
            </div>
          </div>

          <div className="footer-info-block">
            <div className="footer-info-column">
              <h4>Address</h4>
              <p>
                House no - 73A, Maruti Vihar<br />
                Gurgaon, Haryana <br />
                Pin - 122002<br /><br />
                Aizawl, Mizoram <br />
                Pin - 796009
              </p>
            </div>
            <div className="footer-info-column">
              <h4>Contact</h4>
              <p>
                Email<br />
                info@shikshacom.com<br /><br />
                Gurgaon<br />
                +91 3893570403<br /><br />
                Aizawl<br />
                +0389-2300225
              </p>
            </div>
            <div className="footer-info-column">
              <h4>Resources</h4>
              <p>
                <Link to="/forum">Forum</Link><br />
                <Link to="/insight">Explore</Link><br />
                <Link to="/counselling">Counselling</Link><br />
                <Link to="/training">Skill Hub</Link><br />
                <Link to="/upcoming">Placement</Link>
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="footer-footer-nav">
          <div className="footer-nav-group">
            <ul>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/terms">Terms of Policy</Link></li>
              <li><Link to="/feedback">Feedback</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-social-icons">
          <a href="https://www.facebook.com/profile.php?id=61580053190184" className="social-icon" aria-label="Facebook"><FaFacebookF /></a>
          <a href="https://www.instagram.com/shikshacom/" className="social-icon" aria-label="Instagram"><FaInstagram /></a>
          <a href="https://www.youtube.com/@Shikshacom-edu" className="social-icon" aria-label="YouTube"><FaYoutube /></a>
        </div>
        <div className="copyright">
          ©2026 ShikshaCom.com
        </div>
      </div>
    </footer>
  );
};

export default Footer;