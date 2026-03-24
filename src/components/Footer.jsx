import '../css/Footer.css';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
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
                House no - 73A<br />
                Maruti Vihar<br />
                Gurgaon, Haryana - 122002<br /><br />
                Aizawl, Mizoram - 796001
              </p>
            </div>
            <div className="footer-info-column">
              <h4>Contact</h4>
              <p>+91 3893570403</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="footer-footer-nav">
          <div className="footer-nav-group">
            <ul>
              <li><a href="#help">Help Center</a></li>
              <li><a href="/faq">FAQ</a></li>
              <li><a href="/terms">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Policy</a></li>
              <li><a href="/feedback">Feedback</a></li>
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
          ©2025 ShikshaCom.com
        </div>
      </div>
    </footer>
  );
};

export default Footer;
