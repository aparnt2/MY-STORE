import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import Login from "./Login"
import AdminDashboard from "./modules/admin/Dashboard/AdminDashboard"
import MasterData from "./modules/admin/MasterData/MasterData"
import Home from "./modules/pubic/Home/Home"
import AddProduct from "./modules/admin/AddProduct/AddProduct"
import ViewProduct from "./modules/admin/ViewProduct/ViewProduct"
import EditProduct from "./modules/admin/EditProduct/EditProduct"
function App() {
  

  return (
    
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Login/>}/>
     
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/master-data" element={<MasterData />} />
      <Route path="/home" element={<Home/>}/>
      <Route path="/admin/add-product" element={<AddProduct/>}/>
      <Route path="/admin/view-product" element={<ViewProduct/>}/>
      <Route path="/admin/edit-product" element={<EditProduct/>}/>

     </Routes>
     
     </BrowserRouter>
    
  )
}

export default App
