
import React from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../../Components/Header";
import { FaPlus } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import './dashboard.css'

function AdminDashboard() {
    const navigate = useNavigate();

  return (
    <div className="main">
      <Header/>
      <div className="body">
      <h2>Dashboard</h2>
      <div className="controls">
        <button className="control-btn" onClick={() => navigate("/admin/master-data")}
><FaPlus  className="FaPlus" />Manage MasterData <FaArrowRight  className="FaArrowRight"/></button>
         <button className="control-btn"><FaPlus className="FaPlus"/>Add Product <FaArrowRight className="FaArrowRight"/></button>
          <button className="control-btn"><FaPlus className="FaPlus"/>View Product <FaArrowRight className="FaArrowRight"/></button>
           <button className="control-btn"><FaPlus className="FaPlus"/>Add Employee <FaArrowRight className="FaArrowRight"/></button>
           <button className="control-btn"><FaPlus className="FaPlus"/>View Employee <FaArrowRight className="FaArrowRight"/></button>
      </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
