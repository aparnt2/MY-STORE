import React, { useEffect, useState } from 'react'
import Header from '../../../Components/Header/Header'
import Footer from '../../../Components/Footer/Footer'

function ProductDisplay() {
    const BASE_URL=import.meta.env.VITE_BASE_URL
    const[products,setProducts]=useState([])
    useEffect(()=>{
        const fetchData=async()=>{
            try{
                const res=await fetch(`${BASE_URL}`)

            }catch(err){

            }
        }

    },[])
  return (
    <div>
        <Header/>

        <Footer/>
      
    </div>
  )
}

export default ProductDisplay
