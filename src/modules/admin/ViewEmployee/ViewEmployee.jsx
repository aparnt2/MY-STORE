import React, { useEffect, useState } from 'react'
import Header from '../../../Components/Header/Header'
import { data, Navigate, useNavigate } from 'react-router-dom'
import { FaEdit } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io"
import { MdDelete } from "react-icons/md";
import './ViewEmployee.css'

function ViewEmployee() {
    const navigate=useNavigate()
    const BASE_URL=import.meta.env.VITE_BASE_URL
    const[employees,setEmployees]=useState([])
    useEffect(()=>{

      const fetEmployees=async()=>{
        const token=localStorage.getItem('access_token')
       
        try{
          
            const res=await fetch(`${BASE_URL}/employee/all`,{
              
              headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
              },
              
            })
            
              const data= await res.json()
              console.log(data);
              
            if(res.ok){
                 setEmployees(data)
            }
           
           
            
            

        }catch(err){
          console.log(err);
          

        }
      }
      fetEmployees()

    },[])

    const handiledelete=async (id)=>{
      const confirmdelete=window.confirm('do you want to remove this employee')
      if(!confirmdelete) return;
       const token=localStorage.getItem('access_token')
      try{
        const res=await fetch(`${BASE_URL}/employee/${id}/delete`,{
          method:'post',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if(!res.ok){
          throw new Error("failed to delete")
        }
         setEmployees(prev=>prev.filter(emp=>emp.emp_id!=id))

      }catch(err){
        console.log(err);
        

      }

    }
  return (
    <div>
        <Header/>
        <div className='view-employee'>

        <div className='backarraow-employee'>
          <IoIosArrowBack
                      className='back-icon'
                      onClick={() => navigate('/dashboard')}
                    />
          <h3>Employees List</h3>
        </div>
        <div className='employee-table-wrapper'>
        <table className='employee-table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Role</th>
              
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((e)=>(
              <tr key={e.emp_id}>
                <td>{e.emp_id}</td>
                <td>{e.name}</td>
                 <td>{e.user.username}</td>
                <td>{e.phone_no}</td>
                <td>{e.department.name}</td>
                <td>{e.role.role_name}</td>
               
                <td>
                  <button className="edit-btn" onClick={()=>navigate(`/admin/edit-employee/${e.emp_id}`)}>
                    <FaEdit size={16} />
                  </button>
                  <button className="delete-btn" onClick={()=>handiledelete(e.emp_id)}>
                    <MdDelete size={16}/>

                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
        </div>
      </div>
      
    </div>
  )
}

export default ViewEmployee
