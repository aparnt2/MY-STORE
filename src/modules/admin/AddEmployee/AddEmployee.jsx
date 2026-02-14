import React, { useEffect, useState } from "react";
import Header from "../../../Components/Header/AdminHeader";
import EmployeeModel from "../../../Components/EmployeeModel/EmployeeModel";
import "./AddEmployee.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function AddEmployee() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [role, SetRole] = useState([]);
  const [department, SetDepatment] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchdata = async () => {
      const [roledata, depatdata] = await Promise.all([
        fetch(`${BASE_URL}/role/`),
        fetch(`${BASE_URL}/department/`),
      ]);
      const role = await roledata.json();
      const department = await depatdata.json();
      SetRole(role.roles);
      SetDepatment(department.departments);
    };
    fetchdata();
  }, []);

  const handleAddEmployee = async (payload) => {
    const access_token = localStorage.getItem("access_token");

    try {
      const res = await fetch(`${BASE_URL}/employee/`, {
        method: "post",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || "failed to add employee");
      }

      await Swal.fire({
        icon: "success",
        title: "Employee Added",
        text: "Employee has been added successfully.",
        timer: 1500,
        showConfirmButton: false,
        customClass: {
          popup: "modern-popup success-border",
          title: "modern-title",
          htmlContainer: "modern-text",
        },
      });

      navigate("/admin/view-employee");
      return true;
    } catch (err) {
      console.error(err);

      await Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
        customClass: {
          popup: "modern-popup error-border",
          title: "modern-title",
          htmlContainer: "modern-text",
          confirmButton: "modern-btn btn-danger",
        },
      });

      return false;
    }
  };

  return (
    <>
      <Header />
      <div className="employee">
        <div className="add-emplyee">
          <IoIosArrowBack
            className="back-icon"
            onClick={() => navigate("/dashboard")}
          />
          <h3>Add Employee</h3>
        </div>

        <EmployeeModel
          role={role}
          department={department}
          isEdit={false}
          onSubmit={handleAddEmployee}
        />
      </div>
    </>
  );
}

export default AddEmployee;
