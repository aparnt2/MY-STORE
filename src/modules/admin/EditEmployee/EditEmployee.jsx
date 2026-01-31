import React, { useEffect, useState } from 'react';
import Header from '../../../Components/Header/AdminHeader';
import EmployeeModel from '../../../Components/EmployeeModel/EmployeeModel';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io"
import './EditEmployee.css';
import Swal from "sweetalert2";


function EditEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [employee, setEmployee] = useState(null);
  const [role, setRole] = useState([]);
  const [department, setDepartment] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('access_token');

      try {
        // Load role + department
        const [depres, roleres] = await Promise.all([
          fetch(`${BASE_URL}/department/`),
          fetch(`${BASE_URL}/role/`)
        ]);

        const depdata = await depres.json();
        const roledata = await roleres.json();

        setDepartment(depdata.departments);
        setRole(roledata.roles);

        // Load employee
        const empres = await fetch(`${BASE_URL}/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const empdata = await empres.json();
        console.log("Selected employee:", empdata);

        
        setEmployee({
          name: empdata.name,
          phone_no: empdata.phone_no,
          username: empdata.user.username,
          department_id: empdata.department.id,
          role_id: empdata.role.role_id
        });

      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [id]);

  const handleUpdate = async (payload) => {
  const token = localStorage.getItem("access_token");

  try {
    
    Swal.fire({
      title: "Updating employee...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const res = await fetch(`${BASE_URL}/employee/${id}/update`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Update failed");

   
    await Swal.fire({
      icon: "success",
      title: "Updated",
      text: "Employee updated successfully.",
      timer: 1500,
      showConfirmButton: false,
    });

    navigate("/admin/view-employee");
    return true;

  } catch (error) {
    console.error(error);

    
    await Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to update employee.",
    });

    return false;
  }
};


  return (
    <div>
      <Header />
      <div className='edit-employee'>
        <div className='edit-heading'>
        
        <div className="back-row">
                  
                  <IoIosArrowBack 
                      className='back-btn' 
                      onClick={() => navigate('/admin/view-employee')} 
                    />

                </div>
          <h3>Edit Employee</h3>
          </div>

        {employee && (
          <EmployeeModel
            initialData={employee}
            role={role}
            department={department}
            isEdit={true}
            onSubmit={handleUpdate}
          />
        )}
      </div>
    </div>
  );
}

export default EditEmployee;
