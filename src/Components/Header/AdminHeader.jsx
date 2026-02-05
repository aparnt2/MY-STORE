import { FaShop } from "react-icons/fa6";
import './AdminHeader.css'
import { useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa6";
import React, { useEffect, useState } from 'react'


function AdminHeader() {
  const navigate=useNavigate()
  const BASE_URL=import.meta.env.VITE_BASE_URL
  
  const [user, setUser] = useState(null)

useEffect(() => {
  const storedUser = localStorage.getItem('username')
  setUser(storedUser)
}, [])

  

   const handleLogout = async () => {
    try {
      const token = localStorage.getItem('access_token')

      if (token) {
        await fetch(`${BASE_URL}/logout`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      }
    } catch (error) {
      console.error('Logout failed', error)
    } finally {
      localStorage.removeItem('access_token')
      localStorage.removeItem('username')
      localStorage.removeItem('system_role_id')

      setUser(null)
      navigate('/login', { replace: true })

    }
  }
  return (
    
          <header className="admin-header">
              <div className='logo'>
              <div className='logo-sec'><FaShop className='logo-icon'/></div>
              <h4>MyStore</h4>
              </div>
              <div className='user-logout'>
                  <div className="user-sec">
                                    <div className="avatar-circle">
                                        <FaUser />
                                    </div>
                                    <span className="hello-text">Hello, {user}</span>
                                    </div>
              <div className='logout-sec' onClick={handleLogout}>
              
              
                <h4>Logout</h4>
                
              </div>

              </div>
             
          </header>
      
    
  )
}

export default  AdminHeader
