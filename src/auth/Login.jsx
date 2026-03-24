import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Login.css";

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const Login = () => {
  const { login } = useAuth();
<<<<<<< HEAD
  const navigate = useNavigate();
=======
>>>>>>> 51576514702c97ca64019e4c56fd46a2175318c1

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleSubmit = async (e) => {
<<<<<<< HEAD
  e.preventDefault();
  setError("");
  setSubmitting(true);
=======
    e.preventDefault();
    setError("");
    setStatusMessage("");
    setSubmitting(true);
>>>>>>> 51576514702c97ca64019e4c56fd46a2175318c1

    try {
      setStatusMessage("Checking your account...");
      await login(email, password);

<<<<<<< HEAD
    const roles = loggedInUser?.roles || [];
    const isTeacher = roles.some(
      (r) => r.toLowerCase() === "teacher"
    );

    console.log("Logged in user:", loggedInUser);
    console.log("Roles:", roles);

    if (isTeacher) {
      window.location.href = "https://teacher.shikshacom.com";
    } else {
      window.location.href = "https://app.shikshacom.com";
    }

  } catch (err) {
    const message =
      err?.response?.data?.detail ||
      err?.message ||
      "Login failed";

    setError(message);
  } finally {
    setSubmitting(false);
  }
};

=======
      setIsRedirecting(true);
      setStatusMessage("Login successful. Redirecting to homepage...");

      setTimeout(() => {
        window.location.replace("https://shikshacom.com/");
      }, 500);
    } catch (err) {
      const message =
        err?.response?.data?.detail ||
        err?.message ||
        "Login failed";

      setError(message);
      setStatusMessage("");
      setIsRedirecting(false);
      setSubmitting(false);
    }
  };
>>>>>>> 51576514702c97ca64019e4c56fd46a2175318c1

  return (
    <div className={`login-container ${isRedirecting ? "is-redirecting" : ""}`}>
      {isRedirecting && (
        <div className="login-overlay">
          <div className="login-overlay-card">
            <div className="login-spinner"></div>
            <h3>Please wait</h3>
            <p>{statusMessage}</p>
          </div>
        </div>
      )}

      <div className="login-form">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={submitting}
            />
          </div>

          <div className="login-form-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={submitting}
              />
              <button
                type="button"
                className="toggle-password"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setShowPassword((p) => !p)}
                disabled={submitting}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          {error && <p className="login-error">{String(error)}</p>}
          {statusMessage && !error && !isRedirecting && (
            <p className="login-status">{statusMessage}</p>
          )}

          <button type="submit" className="login-submit-btn" disabled={submitting}>
            {submitting ? "Please wait..." : "Login"}
          </button>
        </form>

        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;