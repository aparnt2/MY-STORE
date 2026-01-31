import React from "react";
import { useNavigate,Navigate  } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const roleid = Number(localStorage.getItem("system_role_id"));

  // Not logged in
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Logged in but not authorized
  if (!allowedRoles.includes(roleid)) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h2>403 - Access Denied</h2>
        <p>You do not have permission to view this page.</p>

        <button
          style={{ padding: "10px 20px", cursor: "pointer", backgroundColor:'var(--primary)',borderRadius:"8px", color:"white", marginTop:'10px' }}
          onClick={() => {
            localStorage.clear();
            navigate('/');
          }}
        >
          Back to Login
        </button>
      </div>
    );
  }

  // Authorized
  return children;
}

export default ProtectedRoute;
