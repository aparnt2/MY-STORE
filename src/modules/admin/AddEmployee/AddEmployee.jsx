import React, { useEffect, useState } from 'react'
import Header from '../../../Components/Header/Header'
import EmployeeModel from '../../../Components/EmployeeModel/EmployeeModel'
import './AddEmployee.css'

function AddEmployee() {
    
    const BASE_URL=import.meta.env.VITE_BASE_URL
    const[role,SetRole]=useState([])
    const[department,SetDepatment]=useState([])

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
    return(
        <div>
    
        <Header/>
        <div className='add-emplyee' >
            <h2>Add Employee</h2>
            <EmployeeModel role={role} department={department}/>
            <div className='btn-addemployee'>
                <button>Add Employee</button>

            </div>
            
      

        </div>
        
    </div>
  )
}

export default AddEmployee
