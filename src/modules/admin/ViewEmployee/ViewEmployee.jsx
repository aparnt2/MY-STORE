import React from 'react'
import Header from '../../../Components/Header/Header'
import { Navigate, useNavigate } from 'react-router-dom'

function ViewEmployee() {
    const navigate=useNavigate()
  return (
    <div>
        <Header/>
        <h2>Employess</h2>
        <button onClick={()=>navigate('/admin/edit-employee')}>Edit</button>
      
    </div>
  )
}

export default ViewEmployee
