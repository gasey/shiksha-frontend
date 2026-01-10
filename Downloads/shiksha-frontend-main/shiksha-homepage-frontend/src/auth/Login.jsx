/**
 * Login Component
 *
 * This component renders a login form with email and password fields.
 * It uses React state to manage form data and handles form submission.
 */

import React, { useState } from 'react'; // Import React and useState hook for state management
import { Link } from 'react-router-dom'; // Import Link for navigation
import { useLanguage } from '../contexts/LanguageContext'; // Import language context
import './Login.css'; // Import the CSS file for styling

const Login = () => {
  const { t } = useLanguage(); // Get translation function
  // State variables to store email and password input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /**
   * Handles form submission
   * @param {Event} e - The form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // TODO: Implement actual login logic (e.g., API call to authenticate user)
    console.log('Login:', { email, password }); // Log the login data for debugging
  };

  // Render the login form
  return (
    <div className="login-container"> {/* Main container with beige background */}
      <div className="login-form"> {/* Form container with white background and shadow */}
        <h2>{t('loginTitle')}</h2> {/* Form title */}
        <form onSubmit={handleSubmit}> {/* Form element with submit handler */}
          <div className="login-form-group"> {/* Container for email input group */}
            <label htmlFor="email">{t('email')}</label> {/* Label for email input */}
            <input
              type="email" // Input type for email validation
              id="email" // Unique ID for accessibility
              value={email} // Controlled input value
              onChange={(e) => setEmail(e.target.value)} // Update state on change
              required // Make field required
            />
          </div>
          <div className="login-form-group"> {/* Container for password input group */}
            <label htmlFor="password">{t('password')}</label> {/* Label for password input */}
            <input
              type="password" // Input type to hide password text
              id="password" // Unique ID for accessibility
              value={password} // Controlled input value
              onChange={(e) => setPassword(e.target.value)} // Update state on change
              required // Make field required
            />
          </div>
          <button type="submit" className="login-btn">{t('login')}</button> {/* Submit button */}
        </form>
        <p>{t('dontHaveAccount')} <Link to="/signup">{t('signup')}</Link></p> {/* Link to signup page */}
      </div>
    </div>
  );
};

export default Login; // Export the component as default