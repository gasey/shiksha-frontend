import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Login.css";

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const Login = () => {
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);

  // ✅ SHOW MESSAGE FROM SIGNUP
  useEffect(() => {
    if (location.state?.message) {
      setStatusMessage(location.state.message);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setStatusMessage("");
    setSubmitting(true);

    try {
      setStatusMessage("Checking your account...");
      const loggedInUser = await login(email, password);

      const roles = Array.isArray(loggedInUser?.roles) ? loggedInUser.roles : [];
      const isTeacher = roles.some((r) => String(r).toLowerCase() === "teacher");

      setIsRedirecting(true);
      setStatusMessage("Redirecting to homepage...");

      setTimeout(() => {
        navigate("/");
      }, 500);

    } catch (err) {
      const raw = err?.message ?? err;
      const message =
        raw instanceof Error ? raw.message :
        typeof raw === "string" ? raw :
        err?.response?.data?.detail || "Login failed";

      setError(message);
      setSubmitting(false);
    }
  };

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
                onClick={() => setShowPassword((p) => !p)}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          {error && <p className="login-error">{error}</p>}

          {statusMessage && !error && (
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