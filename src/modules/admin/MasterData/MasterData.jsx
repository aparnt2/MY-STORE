import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import Header from '../../../Components/Header/Header'
import './MasterData.css'
import Department from '../../../Components/Department/Department'
import Role from '../../../Components/Role/Role';
import Category from '../../../Components/Category/Category';
import AddButton from '../../../Components/AddButton/AddButton';
import AddEditModal from '../../../Components/AddEditModel/AddEditModal';



function MasterData() {
    const navigate=useNavigate()
    const BASE_URL=import.meta.env.VITE_BASE_URL
    
    
    const[activetab,setactivetab]=useState("department")
    const[showAddModel,setShowAddModel]=useState(false)
    const[loading ,setLoading]=useState(false)
    const[error,setError]=useState("")


    //department
    const[department,setDepartment]=useState([])
    //adding department name and code
    const[name,setName]=useState("")
    const[code,setCode]=useState("")
    //Editing  Department
    const[editdept,setEditdept]=useState(null)


    //role
    const[role,setRole]=useState([])
    //adding Role name and code
    const[rname,setRname]=useState("")
    const[rcode,setRcode]=useState("")
    //Editing Role
    const[editRole,setEditRole]=useState(null)

    //category
    const[category,setCategory]=useState([])
    //add category name and code
    const[ccode,setCcode]=useState("")
    const[cname,setCname]=useState("")
    const [imageFile, setImageFile] = useState(null);

    //Edit-category
    const[editCategory,setEditCategory]=useState(null)

    


   
useEffect(()=>{
      const data=async ()=>{
        try{
          setLoading(true)
          const [deptres,roleres,catres]=await Promise.all([fetch(`${BASE_URL}/department/`),
                                                    fetch(`${BASE_URL}/role/`),
                                                    fetch(`${BASE_URL}/category/`)])

          if(!deptres.ok ||!roleres.ok ||!catres.ok) throw new Error("error while fetching data")

          const departmentdata= await deptres.json()
          const roledata=await roleres.json()
          const categorydata=await catres.json()
          setDepartment(departmentdata.departments)
          setRole(roledata.roles)
          setCategory(categorydata.categories)
          console.log(categorydata)
         
          setLoading(false)

        }catch{
          setError("Error while fetching data")
          setLoading(false)

        }
      }
      data()

},[])

 const handileSave=async ()=>{
     
      try{
        //save and edit depatment data
        if(activetab==='department'){
           if(!name||!code){
        alert(' department name and code are required')
        return
      }
        if(editdept){
          //edit
          const res=await fetch(`${BASE_URL}/department/${editdept.id}/update`,
            {
              method:'post',
              headers:{'Content-Type':'application/json'},
              body:JSON.stringify({name,code})

            }
          )
          if(!res.ok) throw new Error("error while editing")
          const EditDept=await res.json()
          setDepartment(prev=>prev.map(d=>d.id===EditDept.id?EditDept:d))

        }else{
          //new data save
        const res=await fetch(`${BASE_URL}/department/`,
          {
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({name:name,code:code}),
          }
        )
        if(!res.ok) throw new Error("failled to save")
          const newdept=await res.json()
        setDepartment(prev=>[...prev,newdept])
         
       
        }}
        //save and edit  role data
        else if(activetab==='role'){
           if(!rname||!rcode){
        alert(' role name and code are required')

        return
      }if(editRole){
        //edit-role
        const res=await fetch(`${BASE_URL}/role/${editRole.role_id}/update`,
          {
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({role_name:rname,role_code:rcode})
          }
        )
        if(!res.ok) throw new Error('error while editing in backend')
          const editedrole=await res.json()
          setRole(prev=>prev.map(r=>r.role_id=== editedrole.role_id?editedrole:r))



      }else{
        //add new-role
        const res=await fetch(`${BASE_URL}/role/`,
          {method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({role_name:rname,role_code:rcode})
          }
        )
      
      if(!res.ok) throw new Error("error while saving role data")
        const roledata=await res.json()
      setRole(prev=>[...prev,roledata])
      }}
      //save Category data
      if(activetab==='category') {
    if(!cname || !ccode) {
        alert('Category name and code are required');
        return;
    }

    let imageUrl = editCategory?.image_url || ''

if (imageFile) {
    const formData = new FormData();
    formData.append('upload_file', imageFile); 

    const uploadRes = await fetch(`${BASE_URL}/files/uploadfile`, {
        method: 'POST',
        body: formData, 
    });

    if (!uploadRes.ok) throw new Error("Image upload failed");

    const uploadData = await uploadRes.json();
    imageUrl = uploadData.image_url; 
}


    const payload = {
        category_code: ccode,
        category_name: cname,
        image_url: imageUrl
    };

    if(editCategory) {
        const res = await fetch(`${BASE_URL}/category/${editCategory.category_id}/update`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if(!res.ok) throw new Error("Error while editing category");
        const catedata = await res.json();
        setCategory(prev => prev.map(c => (c.category_id === editCategory.category_id ? catedata : c)));
    } else {
        const res = await fetch(`${BASE_URL}/category/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if(!res.ok) throw new Error("Error while saving category");
        const catdata = await res.json();
        setCategory(prev => [...prev, catdata]);
    }

    setImageFile(null); // reset file after saving
}

        setShowAddModel(false);
            setName('');
            setCode('');
            setRcode('');
            setRname('')
            setCcode('')
            setCname('')
            setEditdept(null);
            setEditRole(null);
            setEditCategory(null);
              }catch(error){
                alert('error while fetching')


    }}

//delete edepartment
    const handiledeletedept=async(id)=>{
      const confirmdelete=window.confirm("Are You Sure You Want To Delete ")
      if(!confirmdelete)return
      try{
        const res=await fetch(`${BASE_URL}/department/${id}/delete`)
        if(!res.ok){
          throw new Error("Failled to deleted data")
        }
        setDepartment(prev=>prev.filter(dep=>dep.id!==id))

      }catch(error){
        alert("error while deleting")

      }
    }
//edit department
 const handileEdit=(depat)=>{
      setEditdept(depat)
      setCode(depat.code)
      setName(depat.name)
      setShowAddModel(true)
    }

// role-edit
 const handileRoleEdit=(roledata)=>{
      setEditRole(roledata)
      setRcode(roledata.role_code)
      setRname(roledata.role_name)
      setShowAddModel(true)
    }


//role delete
 const handileDeleteRole=async(id)=>{
      const confirm=window.confirm("Do You want to delete this Role?")
      if(!confirm) return
      try{
        const res=await fetch(`${BASE_URL}/role/${id}/delete`)
        if(!res.ok) throw new Error("Error while deleting Role in backend")
        
        setRole(prev=>prev.filter(r=>r.role_id!==id))

      }catch(error){
        alert("error while deleteing data")

      }
    }

// category-edit
const handileCateEdit=(category)=>{

  setEditCategory(category)
  setCcode(category.category_code)
  setCname(category.category_name)
  setShowAddModel(true)

}

const handilecateDelete=async (id)=>{
  const confirm=window.confirm("Do you want to delete this category")
  if(!confirm) return
  try{
     const res=await fetch(`${BASE_URL}/category/${id}/delete`)
     if(!res.ok) throw new Error("Error while deleting category")
      setCategory(prev=>prev.filter(c=>c.category_id!==id))

  }catch(error){
    alert("error while deleting category")
  }
 

}



  return (
    <div className='main-page'>
        <Header/>
        
        
        <div className='tabs'>
          <IoIosArrowBack className='back-icon' onClick={()=>navigate('/dashboard')}/>
            <span onClick={()=>setactivetab('department')} className={activetab==='department'?"tab-active":"tab"}>Department</span>
            <span onClick={()=>setactivetab('role')} className={activetab==='role'?"tab-active":"tab"}>Role</span>
            <span onClick={()=>setactivetab('category')} className={activetab==='category'?"tab-active":"tab"}>Category</span>
        </div>
        <AddButton onAdd={()=>{ if(activetab==='department'){setEditdept(null);setName('');setCode('')}
                                else if(activetab==='role'){setEditRole(null);setRcode('');setRname('')}
                                else if(activetab==='category'){setEditCategory(null) ;setCcode('');setCname('');setImageFile(null);}
                                setShowAddModel(true);}}/>
        
        
        <div className='main-content'>
          {loading && (
            <div className="loader-wrapper">
              <span className="loader"></span>
            </div>
          )}
          {
            error && <h4>{error}</h4>
          }

          {
           activetab==='department'&&
          (<Department dep={department} onEdit={handileEdit} onDelete={handiledeletedept}/>)
        }
        {
          activetab==='role'&&
          (<Role roles={role} OnEdit={handileRoleEdit} onDelete={handileDeleteRole}/>)
        }
        {
          activetab==='category'&&
          (<Category cat={category} onEdit={handileCateEdit} onDelete={handilecateDelete}/>)
        }

        </div>
        {showAddModel && (
            <AddEditModal
              activetab={activetab}       
              editdept={editdept}
              editRole={editRole}        
              name={name}                 
              setName={setName}
              code={code}                 
              setCode={setCode}
              rname={rname}
              setRname={setRname}
              rcode={rcode}
              setRcode={setRcode}
              cname={cname}
              setCname={setCname}
              ccode={ccode}
              setCcode={setCcode}
               imageFile={imageFile}         
              setImageFile={setImageFile}  
              editCategory={editCategory}
              onClose={() => setShowAddModel(false)} 
              onSave={handileSave}        
            />
          )}
      
    </div>
  )
}

export default MasterData