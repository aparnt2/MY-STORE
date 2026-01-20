import { NavLink } from "react-router-dom";

import Header from "../../../Components/Header/Header";
import { FaPlus } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa"; 
import './dashboard.css'

function AdminDashboard() {
   const sytem_id=localStorage.getItem('system_role_id')
  return (
    <div className="admin-layout">
      <Header />

      <div className="dashboard-container" >
        <aside className="sidebar">

           {
                sytem_id=="1" &&(
                    <>
                    <NavLink to="/admin/master-data" className="menu-item">
                      <FaPlus /> <span>Manage MasterData</span> <FaArrowRight />
                    </NavLink>
                    <NavLink to="/admin/add-employee" className="menu-item">
                      <FaPlus /> <span>Add Employee</span> <FaArrowRight />
                    </NavLink>

                    <NavLink to="/admin/view-employee" className="menu-item">
                      <FaPlus /> <span>View Employee</span> <FaArrowRight />
                    </NavLink>

                    </>
                )
            }



              {
            (sytem_id=="1" ||sytem_id=="2")&&(
                <>
                  <NavLink to="/add-product" className="menu-item">
                    <FaPlus /> <span>Add Product</span> <FaArrowRight />
                  </NavLink>

                  <NavLink to="/view-product" className="menu-item">
                    <FaPlus /> <span>View Product</span> <FaArrowRight />
                  </NavLink>

                </>
            )
          }
          

        
          









          
        </aside>

        <main className="content">
         
        </main>
      </div>
    </div>
  );
}
export default AdminDashboard
