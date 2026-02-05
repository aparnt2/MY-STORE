import React, { useEffect, useState } from 'react'
import './PublicHeader.css'
import Topnavbar from '../TopSection/Topnavbar'
import { useNavigate } from 'react-router-dom'
import { FaUser, FaShop } from "react-icons/fa6"

function PublicHeader() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const BASE_URL = import.meta.env.VITE_BASE_URL

  
  useEffect(() => {
    const syncUser = () => {
      const storedUser = localStorage.getItem('username')
      setUser(storedUser)
    }

    syncUser()
    
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
    <header className="public-header">
      {/* Logo */}
      <div className="logo">
        <div className="logo-sec">
          <FaShop className="logo-icon" />
        </div>
        <h4>MyStore</h4>
      </div>

      {/* Navbar */}
      <Topnavbar />

      {/* User Section */}
      <div className="user-log">
        
        {!user && (
          <>
            <div className="login" onClick={() => navigate('/login')}>
              <h4>Login</h4>
            </div>

            <div className="signup" onClick={() => navigate('/sign_up')}>
              <h4>Signup</h4>
            </div>
          </>
        )}

       
        {user && (
          <>
            <div className="user-sec">
              <div className="avatar-circle">
                <FaUser />
              </div>
              <span className="hello-text">Hello, {user}</span>
            </div>

            <div className="logout-sec" onClick={handleLogout}>
              <h4>Logout</h4>
            </div>
          </>
        )}
      </div>
    </header>
  )
}

export default PublicHeader
