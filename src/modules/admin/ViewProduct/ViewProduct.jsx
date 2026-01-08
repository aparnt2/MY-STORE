import React, { useEffect, useState } from 'react'
import.meta.env
import Header from '../../../Components/Header/Header'
import { useNavigate } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import './ViewProduct.css'
import { CiSearch } from "react-icons/ci";

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
        const res=await fetch(`${BASE_URL}/category`)
        const data=await res.json()
        setcategory(data.categories)

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
                         <IoIosArrowBack className='back-icon' onClick={()=>navigate('/admin/dashboard')}/>
                          <h3>Products</h3>              
            </div>
            <div className='search-sort'>
               <div className='cate-sort'>
                <select value={selectedCate}  onChange={(e)=>setSelectedCate(e.target.value)}>
                  <option value=""> All</option>
                  {
                    category.map(c=>(
                      <option key={c.category_id} value={c.category_id}>{c.category_name}</option>
                    ))
                  }
                </select>
                

              </div>
              <div className='search'>
                <CiSearch  className='search-icon'/><input type="text" placeholder='Search' value={searchterm} onChange={(e)=>setSearchterm(e.target.value)}  />

              </div>
             

            </div>
            <div className='productlist'>
                {
                    loading && <h4>Loading........</h4>
                }
                {
                  error && <h4>{error}</h4>
                }
                {
                  products && (
                    <>
                    {
                      products.map(p=>(
                        <div className='product' key={p.product_id}>
                          <img src={p.image_url} alt={p.product_name} className='image-display'/>
                          <h4>{p.product_name}</h4>
                          <div className='category'>{p.category.category_name }</div>

                          <div className='price-stock'>
                            <h2>{p.price}</h2>
                            <p>stock :{p.stock}</p>
                            

                          </div>
                          <div className='edit-delete'>
                            <button className='edit' onClick={()=>navigate('/admin/edit-product', { state: { product: p } })} ><FaEdit size={20}/></button>
                            <button className='delete' onClick={()=>handiledelete(p.product_id)} ><MdDelete size={20} /></button>

                          </div>
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
