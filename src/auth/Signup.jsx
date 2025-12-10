/**
 * Signup Component
 *
 * This component renders a signup form with fields for first name, last name,
 * email, password, class selection, and conditional subject stream selection
 * for classes 11 and 12. It uses React state to manage form data.
 */

import React, { useState } from 'react'; // Import React and useState hook
import { Link } from 'react-router-dom'; // Import Link for navigation
import { useLanguage } from '../contexts/LanguageContext'; // Import language context
import './Signup.css'; // Import CSS for styling

const Signup = () => {
  const { t } = useLanguage(); // Get translation function
  // State object to store all form input values
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    Address: '',
    email: '',
    password: '',
    confirmPassword: '',
    class: '', // Class selection (8-12)
    subject: '' // Subject stream (Science, Arts, Commerce) - shown conditionally
  });

  /**
   * Generic change handler for all form inputs
   * @param {Event} e - The input change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from event target
    setFormData(prev => ({
      ...prev, // Spread previous state
      [name]: value // Update the specific field
    }));
  };

  /**
   * Handles form submission
   * @param {Event} e - The form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    // TODO: Implement actual signup logic (e.g., API call to create user account)
    console.log('Signup:', formData); // Log form data for debugging
  };

  // Boolean to determine if subject dropdown should be shown (only for classes 11 and 12)
  const showSubjectDropdown = formData.class === '11' || formData.class === '12';

  // Render the signup form
  return (
    <div className="signup-container"> {/* Main container with beige background */}
      <div className="signup-form"> {/* Form container with white background and shadow */}
        <h2>{t('signupTitle')}</h2> {/* Form title */}
        <form onSubmit={handleSubmit}> {/* Form element with submit handler */}
          {/* First Name Input */}
          <div className="signup-form-group">
            <label htmlFor="firstName">{t('firstName')}</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Last Name Input */}
          <div className="signup-form-group">
            <label htmlFor="lastName">{t('lastName')}</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Address Input */}
          <div className="signup-form-group">
            <label htmlFor="Address">{t('address')}</label>
            <input
              type="text"
              id="Address"
              name="Address"
              value={formData.Address}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email Input */}
          <div className="signup-form-group">
            <label htmlFor="email">{t('email')}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Input */}
          <div className="signup-form-group">
            <label htmlFor="password">{t('password')}</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div className="signup-form-group">
            <label htmlFor="confirmPassword">{t('confirmPassword')}</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* Class Selection Dropdown */}
          <div className="signup-form-group">
            <label htmlFor="class">{t('class')}</label>
            <select
              id="class"
              name="class"
              value={formData.class}
              onChange={handleChange}
              required
            >
              <option value="">{t('selectClass')}</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
          </div>

          {/* Conditional Subject Stream Dropdown - only shown for classes 11 and 12 */}
          {showSubjectDropdown && (
            <div className="signup-form-group">
              <label htmlFor="subject">{t('subjectStream')}</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              >
                <option value="">{t('selectSubject')}</option>
                <option value="Science">{t('science')}</option>
                <option value="Arts">{t('arts')}</option>
                <option value="Commerce">{t('commerce')}</option>
              </select>
            </div>
          )}

          <button type="submit" className="signup-btn">{t('signup')}</button> {/* Submit button */}
        </form>
        <p>{t('alreadyHaveAccount')} <Link to="/login">{t('login')}</Link></p> {/* Link to login page */}
      </div>
    </div>
  );
};

export default Signup;