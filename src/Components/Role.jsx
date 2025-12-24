import React, { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import './Department.css'

function Role({roles}) {
  
  

  return (
    <div className='cards-container'>
      {
        roles.map(R=>(
              <div className='card' key={R.id}>
              <div className='code'>{R.code}</div>
              <div className='Name'>{R.name}</div>
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

export default Role
