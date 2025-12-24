import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      setError("Email and Password are required");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      if (email === "admin@gmail.com" && password === "123456789") {
        navigate("/admin/dashboard");
      } else {
        setError("Invalid username or password");
      }
    }, 1000);
  };

  return (
    <div className="container">
      <div className="login-card">
        <h2 className="login-heading">Login</h2>

        <div className="input-box">
          {/* Email */}
          <div className="email">
            <label>Email</label>
            <input
              type="text"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="password">
            <label>Password</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiFillEye />:<AiFillEyeInvisible />  }
              </span>
            </div>
          </div>

          {/* Login button */}
          <button className="login-btn" onClick={handleLogin} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        {/* Error */}
        {error && <p className="error-text">{error}</p>}

        {/* Divider */}
       <p>or</p>

        {/* Social login */}
        <div className="social-login">
          <button className="google-btn">
            <FcGoogle /> Google
          </button>
          <button className="facebook-btn">
            <FaFacebookF /> Facebook
          </button>
        </div>

        <p className="signup-text">
          Don’t have an account? <span>Sign up</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
