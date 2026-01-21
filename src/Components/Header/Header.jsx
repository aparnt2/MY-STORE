import React from 'react'
import { LuLogOut } from "react-icons/lu";
import { FaShop } from "react-icons/fa6";
import './Header.css'

function Header() {
  const handilelogout=()=>{
    

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
