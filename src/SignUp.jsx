import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import "./login.css";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function Sign_up() {
const[uname,setUname]=useState('')
const[password,setPassword]=useState('')
const [showPassword, setShowPassword] = useState(false);
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);
const BASE_URL=import.meta.env.VITE_BASE_URL


  const navigate = useNavigate();

 const handleSignup = async () => {
  if (!uname || !password) {
    setError("Username and password required");
    return;
  }

  setLoading(true);
  setError("");

  try {
    const res = await fetch(`${BASE_URL}/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: uname,
        password: password,
      }),
    });

    const signup = await res.json();

    if (!res.ok) {
      throw new Error(data.detail || "Signup failed");
    }

    const roleres=await fetch(`http://127.0.0.1:8000/user-role/`,
            {
                method:'post',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({user_id:signup.user_id,sr_id:3})
            }
        )
        const roleid=await roleres.json()
        console.log(signup);
        console.log(roleid);
        navigate('/')

  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="container">
      <div className="login-card">
        <h2 className="login-heading">Sign Up</h2>

        <div className="input-box">
          {/* Email */}
          <div className="email">
            <label>User Name</label>
            <input
              type="text"
              placeholder="User Name"
              value={uname}
              onChange={(e) => setUname(e.target.value)}
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

        
          <button className="login-btn" onClick={handleSignup} disabled={loading}>
            {loading ? "Signing Up...." : "Sign Up"}
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
          already have an account?<Link to='/'>Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default Sign_up;
