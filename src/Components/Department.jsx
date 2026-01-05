import React from 'react'
import './Department.css'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function Department({dep,onEdit,onDelete}) {
  return (
    <div className='dept-container'>
        {
            dep.map(d=>(
                <div className='card' key={d.id}>
                    <div className='code'>{d.code}</div>
                    <div  className='Name'>{d.name}</div>
                    <div className='card-btn'> 
                    <button className='edit' onClick={()=>onEdit(d)}><FaEdit size={20}/></button>
                    <button className='delete' onClick={()=>onDelete(d.id)} ><MdDelete size={20} /></button>
                    </div>

                </div>
            ))

        }

      
    </div>
  )
}

export default Department
