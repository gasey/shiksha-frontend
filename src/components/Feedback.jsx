import React from "react";
import "../css/Feedback.css";

const Feedback = () => {
  return (
    <div className="feedback-container">
      <div className="feedback-card">
        {/* Left Side */}
        <div className="feedback-left">
          <h2 className="feedback-title">Feedback</h2>
          <p className="feedback-description">
            "We’d love to hear from you! Your feedback helps us improve and
            serve you better."
          </p>
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

          {/* First Name & Last Name */}
          <div className="feedback-name-row">
            <div className="feedback-field">
              <label className="feedback-label">First Name</label>
              <input type="text" name="first_name" required />
            </div>
            <div className="feedback-field">
              <label className="feedback-label">Last Name</label>
              <input type="text" name="last_name" required />
            </div>
          </div>

          {/* Email */}
          <div className="feedback-field">
            <label className="feedback-label">Email</label>
            <input
              type="email"
              name="email"
              className="feedback-full-input"
              required
            />
          </div>

          {/* Message */}
          <div className="feedback-field">
            <label className="feedback-label">Message</label>
            <textarea name="message" required></textarea>
          </div>

          {/* Honeypot */}
          <input type="checkbox" name="botcheck" style={{ display: "none" }} />

          <button type="submit" className="feedback-submit-btn">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
