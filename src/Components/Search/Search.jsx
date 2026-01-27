import React from 'react'
import { CiSearch } from "react-icons/ci";
import './Search.css'

function Search({searchterm,setSearchterm}) {
  return (
   <div className='search'>
        <CiSearch  className='search-icon'/>
        <input type="text" placeholder='Search' value={searchterm} onChange={(e)=>setSearchterm(e.target.value)}  />

    </div>
             
  )
}

export default Search
