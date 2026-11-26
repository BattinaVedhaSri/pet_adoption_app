import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      email === "admin@pawhome.com" &&
      password === "admin123"
    ) {
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({
          name: "Admin",
          email,
          role: "admin"
        })
      );

      navigate("/admin");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      navigate("/pets");
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-visual">
        <div className="auth-visual-overlay">
          <span className="auth-brand">🐾 PawHome</span>
          <h1>Every pet deserves a loving home.</h1>
          <p>Come back and continue your journey towards finding your perfect companion.</p>
          <div className="auth-quote">"Love is a four-legged word." ❤️</div>
        </div>
      </div>

      <div className="auth-form-side">
        <form className="auth-card" onSubmit={handleLogin}>
          <div className="auth-icon">🐾</div>

          <span className="auth-small-title">WELCOME BACK</span>
          <h2>Login to PawHome</h2>
          <p className="auth-subtitle">
            We're happy to see you again!
          </p>

          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button type="submit" className="auth-submit">
            Login to Your Account →
          </button>

          <p className="auth-link">
            Don't have an account? <Link to="/signup">Create Account</Link>
          </p>

          <div className="admin-info">
            <strong>🔐 Admin Demo Access</strong>
            <p>Email: admin@pawhome.com</p>
            <p>Password: admin123</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;