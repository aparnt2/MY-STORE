import React from 'react'
import './EmployeeModel.css'

function EmployeeModel({role=[],department=[]}) {
  return (
    <div className='emp-container'>
      <div className='form'>
        <div className='form-group'>
          <label>Full Name</label>
          <input type='text ' placeholder='Full Name'/>

        </div>
        <div className='form-group'>
          <label> Phone No</label>
          <input type="tel" placeholder='Phone Number' />
          </div>

          <div className='form-group'>
            <label>UserName</label>
            <input type="text" placeholder='User Name' />
            

          </div>
          <div className='form-group'>
            <label>Password</label>
            <input type="password" placeholder='Password' />
            

          </div>
          <div className='form-group'>
            <label>Department</label>
           <select >
            <option value="">All</option>
            {
              department.map(d=>(
                <option key={d.id}>{d.name}</option>
              ))
            }
           </select>
            

          </div>

           <div className='form-group'>
            <label>Role</label>
           <select >
            <option value="">All</option>
            {
              role.map(r=>(
                <option key={r.role_id}>{r.role_name}</option>
              ))
            }
           </select>
            

          </div>




      </div>

      
    </div>
  )
}

export default EmployeeModel
