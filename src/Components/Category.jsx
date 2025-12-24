import React, { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import './Department.css'

function Category({Category}) {
  
  

  return (
    <div className='cards-container'>
      {
        Category.map(C=>(
              <div className='card' key={C.id}>
              <div className='code'>{C.code}</div>
              <div className='Name'>{C.name}</div>
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

export default Category


