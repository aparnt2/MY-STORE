import React, { useState,useEffect } from 'react'


import { IoIosArrowBack } from "react-icons/io";

import Header from '../../../Components/Header';
import Department from '../../../Components/Department';
import './MasterData.css'
import Category from '../../../Components/Category';
import Role from '../../../Components/Role';

function Managmasterdata() {
  const [activeTab, setActiveTab] = useState("department");

    const[departments,setDepartments]=useState([])
    const[roles,setRoles]=useState([])
    const[Categories,setCategories]=useState([])
    const[loading,setLoading]=useState(false)
    const[error,setError]=useState("")
    const [showAddModal, setShowAddModal] = useState(false);

    



    useEffect(()=>{
        const data= async()=>{
          try{
            setLoading(true)
            const [dep,role,category]=await Promise.all([fetch("http://localhost:3001/departments"),fetch("http://localhost:3001/roles"),fetch("http://localhost:3001/categories")])
            const DeptData=await dep.json()
            const RoleData=await role.json()
            const categoryData=await category.json()
            setDepartments(DeptData)
            setRoles(RoleData)
            setCategories(categoryData)
            setLoading(false)
    
          }catch{
            setError("Error while fetching data")
            setLoading(false)
    
          }
        }
        data()
      },[])


  return (
    <div className='main'>
     
       <Header/>
 
   
      <div className='tabs'>
       
          <IoIosArrowBack className='back-icon'/>
        
        <span
    className={activeTab === "department" ? "tab-active" : "tab"}
    onClick={() => setActiveTab("department")}
  >Department</span>
      
        <span className={activeTab==="roles"?"tab-active":"tab"} onClick={()=>setActiveTab("roles")}>Roles</span>
          <span className={activeTab==="category"? "tab-active":"tab" } onClick={()=>setActiveTab("category")}>Category</span>
        </div>

        <div className='main-content'>
          <button className='add-btn'  onClick={() => setShowAddModal(true)}>+ Add</button>
          {
            loading&& <p>data loading......</p>
          }
          {
            error && <p>{error}</p>
          }
          {
            activeTab==="department" &&(<Department departments={departments}/>)
          }
          {
            activeTab ==="category" &&(<Category Category={Categories}/>)
          }
          {
            activeTab ==="roles" &&(<Role roles={roles} />)
          }
          {
            showAddModal && (
                <div className="modal-overlay">
                  <div className="modal">
                    <h3>
                      {activeTab === "department" && "Add Department"}
                      {activeTab === "roles" && "Add Role"}
                      {activeTab === "category" && "Add Product Category"}
                    </h3>

                    <input type="text" placeholder="Enter Code" />
                    <input type="text" placeholder="Enter Name" />

                    <div className="modal-btns">
                      <button onClick={() => setShowAddModal(false)} className='cancel-btn'>Cancel</button>
                      <button onClick={() => setShowAddModal(false)} className='save-btn'>Save</button>
                    </div>
                  </div>
                </div>
              )
          }

         

        </div>

      
    </div>
   
   
  )
}

export default Managmasterdata
