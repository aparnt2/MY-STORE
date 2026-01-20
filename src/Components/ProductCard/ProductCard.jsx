import React from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import './ProductCard.css'

function ProductCard({p,handiledelete,navigate}) {
  return (
    <div className='product'>
        <img src={p.image_url} alt={p.product_name} className='image-display'/>
                                  <div className='product-details'>
                                    <h4>{p.product_name}</h4>
                                  <div className='category'>{p.category.category_name }</div>
        
                                  <div className='price-stock'>
                                    <h2>₹{p.price}</h2>
                                    <p>stock :{p.stock}</p>
                                  </div>

        
                                    
        
        </div>
        <div className='edit-delete'>
                            <button className='edit' onClick={()=>navigate('/admin/edit-product', { state: { product: p } })} ><FaEdit size={20}/></button>
                            <button className='delete' onClick={()=>handiledelete(p.product_id)} ><MdDelete size={20} /></button>

                          </div>
    </div>
   
  )
}

export default ProductCard
