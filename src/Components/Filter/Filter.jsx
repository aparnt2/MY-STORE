import React from 'react'
import './Filter.css'

function Filter({selectedCate,setSelectedCate,category}) {
  return (
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
  )
}

export default Filter
