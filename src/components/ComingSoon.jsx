import { useState } from 'react';
import '../css/ComingSoon.css';

const ComingSoon = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleNotify = () => {
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section className="coming-soon-section">
      <div className="coming-soon-banner">
        <h2>Coming Soon</h2>
      </div>
      <div className="coming-soon-content">
        <h3>Stay Updated</h3>
        <p>Be the first to know when new features and courses launch!</p>
        {submitted ? (
          <p className="coming-soon-thankyou">Thank you! We'll notify you.</p>
        ) : (
          <div className="coming-soon-form">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="coming-soon-input"
            />
            <button className="coming-soon-btn" onClick={handleNotify}>
              Notify Me
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ComingSoon;
