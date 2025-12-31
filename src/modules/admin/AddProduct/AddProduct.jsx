import React from 'react'
import Header from '../../../Components/Header'
import { IoIosArrowBack } from "react-icons/io";
import './AddProduct.css'
import { useState } from 'react';


function AddProduct() {
    const[img,setimg]=useState("")

    const handileimage=(e)=>{
        const file=e.target.files[0]
        const url=URL.createObjectURL(file)
        setimg(url)
    }
  return (
    <div>
        <Header/>
        <div className='content' >

       
        <div className='heading'>
             <IoIosArrowBack className='back-icon' onClick={()=>navigate('/admin/dashboard')}/>
                <h2>Add Product</h2>
                


        </div>
        <div className='body'>
            <div className='img-section'>
                <h4>product image</h4>
               <label >
                    <p>click here to upload image</p>
                    <input type='file' hidden onChange={handileimage}/>
               </label>

            </div>
            <div className='add-product-section'> 


            </div>

        </div>
         </div>
      
    </div>
  )
}

export default AddProduct
