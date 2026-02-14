import React from "react";
import { NavLink } from "react-router-dom";
import "./Topnavbar.css";

function Topnavbar() {
  return (
    <div className="header-section-link">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/products">Products</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/contact">Contact</NavLink>
    </div>
  );
}

export default Topnavbar;
