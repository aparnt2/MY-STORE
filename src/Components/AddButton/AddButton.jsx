import React from 'react'
import './AddButton.css'

function AddButton({onAdd}) {
  return (
    <div className='addbtn-sec'>
          <button className='add-btn' onClick={onAdd}>ADD</button>
    </div>
  )
}

export default AddButton
