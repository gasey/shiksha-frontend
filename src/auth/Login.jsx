import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Login.css";

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Already logged in → redirect
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSubmitting(true);

  try {
    await login(email, password);
    navigate("/", { replace: true });
  } catch (err) {
      const message =
        typeof err === "string"
          ? err
          : err?.response?.data?.detail ||
            err?.message ||
            "login Failed";
    setError(message); // ✅ THIS is the fix
  } finally {
    setSubmitting(false);
  }
};


  return (
    <div className="login-container">
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
            />
          </div>

          <div className="login-form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="login-error">{String(error)}</p>}

          <button type="submit" disabled={submitting}>
            {submitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p>
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
