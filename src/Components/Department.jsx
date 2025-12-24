import React, { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import './Department.css'

function Department({departments}) {
  
  

  return (
    <div className='cards-container'>
      {
        departments.map(departments=>(
              <div className='card' key={departments.id}>
              <div className='code'>{departments.code}</div>
              <div className='Name'>{departments.name}</div>
              <div className='card-btn'> 
                  <button className='edit'><FaEdit /> Edit</button>
                  <button className='delete'><MdDelete size={20} /></button>
              </div>

            </div>

        ))
      }
            
            



          </div>
  )
}

export default Department
