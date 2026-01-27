import React from 'react'
import { LuLogOut } from "react-icons/lu";
import { FaShop } from "react-icons/fa6";
import './Header.css'
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate=useNavigate()
  const BASE_URL=import.meta.env.VITE_BASE_URL

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
    
          <header>
              <div className='logo'>
              <div className='logo-sec'><FaShop className='logo-icon'/></div>
              <h4>MyStore</h4>
              </div>
              <div className='logout-sec'>
              
              <div className='logout-icon' onClick={handilelogout}><LuLogOut className='logout' /></div>

                
              </div>
          </header>
      
    
  )
}

export default Header
