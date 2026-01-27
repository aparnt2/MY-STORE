import React, { useEffect, useState } from 'react'
import Header from '../../../Components/Header/Header'
import EmployeeModel from '../../../Components/EmployeeModel/EmployeeModel'
import './AddEmployee.css'
import { IoIosArrowBack } from "react-icons/io"
import { useNavigate } from 'react-router-dom'



function AddEmployee() {
    
    const BASE_URL=import.meta.env.VITE_BASE_URL
    const[role,SetRole]=useState([])
    const[department,SetDepatment]=useState([])
    
    const navigate=useNavigate()

    useEffect(()=>{
        const fetchdata=async()=>{
            const[roledata,depatdata]=await Promise.all([fetch(`${BASE_URL}/role/`)
                                                        ,fetch(`${BASE_URL}/department/`)])
           const role=await roledata.json()
           const department=await depatdata.json()
           SetRole(role.roles)
           SetDepatment(department.departments)

        }
        fetchdata()
    
    },[])

   const handileAddEmployee = async (payload) => {
  const access_token = localStorage.getItem("access_token");

  try {
    const res = await fetch(`${BASE_URL}/employee/`, {
      method: "post",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${access_token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Employee added successfully");
      navigate("/admin/view-employee");
      return true;   
    } else {
      alert(data.message || "Failed to add employee");
      return false;  
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
    return false;    
  }
};


    return(
         <>
    
        <Header/>
        <div className='employee'>

        
        <div className='add-emplyee' >
            <IoIosArrowBack
                      className='back-icon'
                      onClick={() => navigate('/dashboard')}
                    />
                <h3>Add Employee</h3>
        </div>
        
            <EmployeeModel
                    role={role}
                    department={department}
                    isEdit={false}
                    onSubmit={handileAddEmployee}
                    />
                                    
                    
    </div>
            
      
            </>
        
        
   
  )
}

export default AddEmployee
