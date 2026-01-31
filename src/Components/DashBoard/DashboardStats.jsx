import React, { useEffect, useState } from 'react'
import './DashboardStats.css'


function DashboardStats({show}) {
    const BASE_URL=import.meta.env.VITE_BASE_URL
    const[count,setCount]=useState({departments:0,roles:0,categories:0,products:0})

    useEffect(()=>{
        const fetchdata=async()=>{
            try{
            const [depres,roleres,catres,prodres]=await Promise.all([fetch(`${BASE_URL}/department/`),
                                                                     fetch(`${BASE_URL}/role/`),
                                                                     fetch(`${BASE_URL}/category/`),
                                                                     fetch(`${BASE_URL}/product/`)                   
            ])

            const [depdata,roledata,catdata,proddata]=await Promise.all([depres.json(),roleres.json(),catres.json(),prodres.json()])
            setCount({departments:depdata.departments.length,
                        roles:roledata.roles.length,
                        categories:catdata.categories.length,
                        products:proddata.length
            })
            console.log(count)

        }catch(error){
            console.log(error);
            

        }

        }
    fetchdata()
        
    },[])
    useEffect(() => {
  console.log("Updated counts:", count);
}, [count]);

  return (
   <div className="dashboard-stats">
     {(show === "all" || show === "productsOnly") && (
 <div className="stat-card products">Products <h2>{count.products}</h2></div>
)}

{show === "all" && (
  <>
    
<div className="stat-card departments">Departments <h2>{count.departments}</h2></div>
<div className="stat-card roles">Roles <h2>{count.roles}</h2></div>
<div className="stat-card categories">Categories <h2>{count.categories}</h2></div>

  </>
)}

    </div>
  )
}

export default DashboardStats
