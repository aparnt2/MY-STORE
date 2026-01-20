import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({children,allowedRoles}) {
    const token=localStorage.getItem('access_token')
    const roleid=localStorage.getItem('system_role_id')
    if(!token){
        return <Navigate to='/'/>
    }
    if(!allowedRoles.includes(roleid)){
        return <Navigate to='/unotherized'/>
    }
  return (
    <div>
        {
            children
        }
      
    </div>
  )
}

export default ProtectedRoute
