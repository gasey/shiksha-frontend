import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import "./Login.css";

const Login = () => {
  const { t } = useLanguage();
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/token/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Invalid credentials");
        return;
      }

      login({
        access: data.access,
        refresh: data.refresh,
      });

      navigate("/", { replace: true });
    } catch {
      setError("Unable to reach server");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>{t("loginTitle")}</h2>

        <form onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label htmlFor="email">{t("email")}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="login-form-group">
            <label htmlFor="password">{t("password")}</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button
            type="submit"
            className="login-btn"
            disabled={submitting}
          >
            {submitting ? "Logging in…" : t("login")}
          </button>
        </form>

        <p>
          {t("dontHaveAccount")}{" "}
          <Link to="/signup">{t("signup")}</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
