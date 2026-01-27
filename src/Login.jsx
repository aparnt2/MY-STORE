import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function Login() {
  const [uname, setUname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const BASE_URL=import.meta.env.VITE_BASE_URL
  const [fieldErrors, setFieldErrors] = useState({});
  

  const navigate = useNavigate();
  const validate = () => {
  const errors = {}

  if (!uname.trim()) {
    errors.uname = "Username is required"
  }

  if (!password) {
    errors.password = "Password is required"
  }

  setFieldErrors(errors)
  return Object.keys(errors).length === 0
}


  const handleLogin = async () => {
  if (!validate()) return;


  setLoading(true);
  setError("");

  try {
    const res = await fetch(`${BASE_URL}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: uname,
        password: password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.detail || "Login failed");
    }

    localStorage.setItem("system_role_id", data.sr_id);

      const role = Number(data.sr_id);

      console.log("LOGIN RESPONSE:", data);
      console.log("ROLE:", role, typeof role);
      localStorage.setItem("access_token", data.access_token);
   
  
    


    switch (role) {
      case 1:
        navigate("/dashboard");
        break;
      case 2:
        navigate("/dashboard");
        break;
      case 3:
        navigate("/home");
        break;
      default:
        navigate("/");
    }
    



  } catch (err) {
    setError(err.message);
  } finally {
    setFieldErrors({})
    setError("")
    setLoading(false);
  }
};


  return (
    <div className="container">
      <div className="login-card">
        <h2 className="login-heading">Login</h2>

         <div className="input-box">
          {/* username */}
         <div className="field">
            <label>User Name</label>
            <input
            placeholder="user name"
                value={uname}
                onChange={(e) => {
                  setUname(e.target.value)
                  setFieldErrors(prev => ({ ...prev, uname: "" }))
                }}
              />

            <p className="error-text">{fieldErrors.uname || " "}</p>
          </div>

          {/* Password */}
         <div className="field">
                     <label>Password</label>
                     <div className="password-container">
                       <input
                       placeholder="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value)
                              setFieldErrors(prev => ({ ...prev, password: "" }))
                            }}
                          />

                       <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                         {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                       </span>
                     </div>
                     <p className="error-text">{fieldErrors.password || " "}</p>
                   </div>

          {/* Login button */}
          <button className="login-btn" onClick={handleLogin} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        

        
        <p className="signup-text">
          Don’t have an account? <Link to="sign_up">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
