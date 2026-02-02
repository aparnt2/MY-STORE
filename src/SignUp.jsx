import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import "./login.css";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Swal from "sweetalert2";


function Sign_up() {
const[uname,setUname]=useState('')
const[password,setPassword]=useState('')
const [showPassword, setShowPassword] = useState(false);
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);
const [fieldErrors, setFieldErrors] = useState({});

const BASE_URL=import.meta.env.VITE_BASE_URL
const navigate = useNavigate();

  const validate = () => {
  const errors = {};

  if (!uname.trim()) {
    errors.uname = "Username is required";
  } else if (uname.length < 3) {
    errors.uname = "Username must be at least 3 characters";
  } else if (uname.includes(" ")) {
    errors.uname = "Username cannot contain spaces";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  } else if (!/[0-9]/.test(password)) {
    errors.password = "Password must contain at least one number";
  } else if (!/[a-zA-Z]/.test(password)) {
    errors.password = "Password must contain at least one letter";
  }

  setFieldErrors(errors);
  return Object.keys(errors).length === 0;
};


const handleSignup = async () => {
  if (!validate()) return;

  setLoading(true);
  setError("");

  try {
    const res = await fetch(`${BASE_URL}/customer/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: uname.trim(),
        password: password,
      }),
    });

    const data = await res.json();

          if (!res.ok) {
        throw new Error(data.detail || "Signup failed");
      }

          await Swal.fire({
      icon: "success",
      title: "Account created",
      text: "Your account has been created successfully",
      confirmButtonText: "Login",
      // We remove confirmButtonColor here because we will handle it via CSS for a more modern look
      buttonsStyling: false, 
      customClass: {
        popup: 'modern-swal-popup',
        title: 'modern-swal-title',
        htmlContainer: 'modern-swal-text',
        confirmButton: 'modern-swal-button'
      }
    });

        navigate("/");


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
          {/* username */}
         <div className="field">
            <label>User Name</label>
            <input
              type="text"
              placeholder="User Name"
              value={uname}
              onChange={(e) => setUname(e.target.value)}
            />
            <p className="error-text">{fieldErrors.uname || " "}</p>
          </div>


          {/* Password */}
         <div className="field">
            <label>Password</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
              </span>
            </div>
            <p className="error-text">{fieldErrors.password || " "}</p>
          </div>


        
          <button className="login-btn" onClick={handleSignup} disabled={loading}>
            {loading ? <div className="spinner"></div> : "Sign Up"}

          </button>
           <p className="error-text server-error">{error || " "}</p>
        </div>

          
         

       

        <p className="signup-text">
          already have an account?<Link to='/'>Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default Sign_up;
