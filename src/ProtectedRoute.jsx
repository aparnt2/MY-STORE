import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("access_token");
  const roleid = Number(localStorage.getItem("system_role_id"));
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

 
  if (allowedRoles && !allowedRoles.includes(roleid)) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h2>Access Denied</h2>
        <p>You do not have permission to view this page.</p>

        <button
          style={{
            padding: "10px 20px",
            cursor: "pointer",
            backgroundColor: "var(--primary)",
            borderRadius: "8px",
            color: "white",
            marginTop: "10px",
          }}
          onClick={() => {
            localStorage.clear();
            window.location.replace("/login"); 
          }}
        >
          Back to Login
        </button>
      </div>
    );
  }

  
  return children;
}

export default ProtectedRoute;
