import React, { useEffect, useState } from 'react'
import.meta.env
import Header from '../../../Components/Header/Header'
import { useNavigate } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";

import './ViewProduct.css'
import Filter from '../../../Components/Filter/Filter';
import Search from '../../../Components/Search/Search';
import ProductCard from '../../../Components/ProductCard/ProductCard';


function ViewProduct() {
   const BASE_URL = import.meta.env.VITE_BASE_URL
    const navigate=useNavigate()
    const[products,setProducts]=useState([])
    const[loading,setLoading]=useState(false)
    const[error,setError]=useState("")
    const[selectedCate,setSelectedCate]=useState("")
    const[category,setcategory]=useState([])
    const[searchterm,setSearchterm]=useState("")


    //product data

    useEffect(()=>{
     
      fetchdata()
      

    },[searchterm,selectedCate])

     const fetchdata=async()=>{
        
        try{
          setLoading(true)
          let URL=`${BASE_URL}/product/`
          if(searchterm){
            URL= `${BASE_URL}/product/search?keyword=${searchterm}`
          }else if(selectedCate){
            URL=`${BASE_URL}/product/category/${selectedCate}`
          }
          const res=await fetch(URL)
          const productdata=await res.json()
          console.log(productdata);
          setProducts(productdata)
          setLoading(false)
          

        }catch{
          setError("Error while Fetching Data")
          setLoading(false)

        }
      }

    //category data

    useEffect(()=>{
      const fetCategory=async ()=>{
        try{
           const res=await fetch(`${BASE_URL}/category`)
        const data=await res.json()
        setcategory(data.categories)

        }catch(error){
          console.log('error while fetching categories');
          

        }
       
      }
      fetCategory()
    },[])



    const handiledelete=async (id)=>{
      const confirmdelete=window.confirm("do you want to delete?")
      if(!confirmdelete) return
      try{
          const res=await fetch(`${BASE_URL}/product/${id}/delete`)
          if(!res.ok){throw new Error("failed to delete")}
          setProducts(prev=>prev.filter(p=>p.product_id!=id))
      }catch(error){
        alert("error while deleting")

      }

    }

    
  return (
    <div>
        <Header/>
        <div className='viewproduct-body'>
            <div className='tab'>
                         <IoIosArrowBack className='back-icon' onClick={()=>navigate('/dashboard')}/>
                          <h3>Products</h3>              
            </div>
            <div className='search-sort'>
              <Filter selectedCate={selectedCate} setSelectedCate={setSelectedCate} category={category}/>
              <Search searchterm={searchterm} setSearchterm={setSearchterm}/>
              

            </div>
            <div className='productlist'>
                {loading && (
            <div className="loader-wrapper">
              <span className="loader"></span>
            </div>
          )}
                {
                  error && <h4>{error}</h4>
                }
                {
                  products && (
                    <>
                    {
                      products.map(p=>(
                         <div  key={p.product_id}>
                          <ProductCard p={p} handiledelete={handiledelete} navigate={navigate}/>
                          
                        </div>
                      ))
                    }
                    
                    </>
                  )
                }
               

            </div>

        </div>
      
    </div>
  )
}

export default ViewProduct
