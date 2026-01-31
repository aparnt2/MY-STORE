import React from 'react'
import './PublicHeader.css'
import Topnavbar from '../TopSection/Topnavbar'
import { useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa6";
import { FaShop } from "react-icons/fa6";

function PubilcHeader() {
   const navigate=useNavigate()
  const BASE_URL=import.meta.env.VITE_BASE_URL
  const username=localStorage.getItem('username')
  

  const handilelogout=async()=>{
    const token=localStorage.getItem('access_token')
    console.log(token);
    
    const res=await fetch(`${BASE_URL}/logout`,{
      method:'post',
      headers:{
        'Authorization':`Bearer ${token}`
      }
    })
    const data=await res.json()
    console.log(data.message);
    localStorage.removeItem('access_token')
    navigate("/")
    

    

  }
  return (
    <>
          <header className="public-header">
              <div className='logo'>
              <div className='logo-sec'><FaShop className='logo-icon'/></div>
              <h4>MyStore</h4>
              </div>
               <Topnavbar/>
              <div className='user-logout'>
                <div className="user-sec">
                    <div className="avatar-circle">
                        <FaUser />
                    </div>
                    <span className="hello-text">Hello, {username}</span>
                    </div>

              <div className='logout-sec' onClick={handilelogout}>
              
              
                <h4>Logout</h4>
                
              </div>

              </div>
             
          </header>
         
          </>
      
    
  )
}

export default PubilcHeader
