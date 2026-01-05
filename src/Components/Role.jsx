import React from 'react'
import './Role.css'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function Role({roles,OnEdit,onDelete}) {
  return (
    <div className='role-container'>
        {roles.map(r=>(
            <div key={r.role_id} className='card'>
                <div className='code'>{r.role_code}</div>
                <div className='Name'>{r.role_name}</div>
                <div className='card-btn'> 
                  <button className='edit' onClick={()=>OnEdit(r)}><FaEdit size={20}/> </button>
                  <button className='delete' onClick={()=>onDelete(r.role_id)} ><MdDelete size={20} /></button>
              </div>
            </div>
        ))}
      
    </div>
  )
}

export default Role
