import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Login.css";

const Login = () => {
  const { login, isAuthenticated, user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSubmitting(true);

  try {
    const loggedInUser = await login(email, password);

    const role = (loggedInUser?.role || user?.role || "").toLowerCase();

    console.log("Logged in user:", loggedInUser);
    console.log("Role detected:", role);

    if (role === "teacher") {
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