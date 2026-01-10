import React from "react";
import "../css/Feedback.css"; // Import the CSS file

const Feedback = () => {
  return (
    <div className="feedback-container">
      <div className="feedback-content">
        {/* Left Side Text */}
        <div className="feedback-left">
          <h1 className="feedback-title">
            Feed <span>back</span>
          </h1>

          <p className="feedback-description">
            "We’d love to hear from you! Your feedback helps us improve and
            serve you better."
          </p>

          <p className="feedback-email">info@shikshacom.com</p>
        </div>

        {/* Right Side Form */}
        <form
          className="feedback-form"
          action="https://api.web3forms.com/submit"
          method="POST"
        >
          <input
            type="hidden"
            name="access_key"
            value="a0608d50-fde6-4fa4-84ef-088941c2ece7"
          />

          {/* Name */}
          <label className="feedback-form-label">Name (required)</label>
          <div className="feedback-name-row">
            <input
              type="text"
              name="first_name"
              placeholder="Your First Name"
              required
            />
            <input
              type="text"
              name="last_name"
              placeholder="Your Last Name"
              required
            />
          </div>

          {/* Email */}
          <label className="feedback-form-label">Email (required)</label>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="feedback-full-input"
            required
          />

          {/* Message */}
          <label className="feedback-form-label">Message (required)</label>
          <textarea
            name="message"
            placeholder="Your message..."
            required
          ></textarea>

          {/* Honeypot */}
          <input
            type="checkbox"
            name="botcheck"
            style={{ display: "none" }}
          />

          {/* Button */}
          <button type="submit" className="feedback-submit-btn">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;