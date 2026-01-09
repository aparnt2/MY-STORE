import React from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import './Category.css'

function Category({cat,onEdit,onDelete}) {
  return (
   <div className='category-container'>
              {
                cat.map(c=>(
                  <div className='card' key={c.category_id}>
                    <div className='image-wrapper'>
                      <img src={c.image_url} alt={c.category_name} />

                    </div>
                   
                   <div className='Name'>{c.category_name}</div>
                   <div className='card-btn'> 
                     <button className='edit' onClick={()=>onEdit(c)} ><FaEdit size={20}/> </button>
                     <button className='delete' onClick={()=>onDelete(c.category_id)} ><MdDelete size={20} /></button>
                 </div>
               </div>

                ))
              }
               
    </div>
  )
}

export default Category
