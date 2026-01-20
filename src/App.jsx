import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import Login from "./Login"
import Sign_up from "./SignUp"
import AdminDashboard from "./modules/admin/Dashboard/Dashboard"
import MasterData from "./modules/admin/MasterData/MasterData"
import Home from "./modules/pubic/Home/Home"
import AddProduct from "./modules/admin/AddProduct/AddProduct"
import ViewProduct from "./modules/admin/ViewProduct/ViewProduct"
import EditProduct from "./modules/admin/EditProduct/EditProduct"
import AddEmployee from "./modules/admin/AddEmployee/AddEmployee"
import ViewEmployee from "./modules/admin/ViewEmployee/ViewEmployee"
import EditEmployee from "./modules/admin/EditEmployee/EditEmployee"
import About from "./modules/pubic/About/About"
import Contact from "./modules/pubic/Contact/Contact"
import Products from "./modules/pubic/ProductDisplay/Products"
import ProductDetails from "./modules/pubic/ProductDisplay/ProductDetails"
import ProtectedRoute from "./ProtectedRoute"
import ScrollToTop from "./ScrollToTop"

function App() {
  

  return (
    
     <BrowserRouter>
     <ScrollToTop/>
     <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/sign_up" element={<Sign_up/>}/>

     {/* admin & employee */}
      <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['1','2']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/master-data" element={<ProtectedRoute allowedRoles={['1']}><MasterData /></ProtectedRoute>} />    {/* only admin */}  
      <Route path="/add-product" element={<ProtectedRoute allowedRoles={['1','2']}><AddProduct/></ProtectedRoute>}/>
      <Route path="/view-product" element={<ProtectedRoute allowedRoles={['1','2']}><ViewProduct/></ProtectedRoute>}/>
      <Route path="/edit-product" element={<ProtectedRoute allowedRoles={['1','2']}><EditProduct/></ProtectedRoute>}/>
      <Route path="/admin/view-employee" element={<ProtectedRoute allowedRoles={['1']}><ViewEmployee/></ProtectedRoute>}/>  {/* only admin */}
      <Route path="/admin/add-employee" element={<ProtectedRoute allowedRoles={['1']}><AddEmployee/></ProtectedRoute>}/>    {/* only admin */}
      <Route path='/admin/edit-employee' element={<ProtectedRoute allowedRoles={['1']}><EditEmployee/></ProtectedRoute>}/>  {/* only admin */}

      {/* public pages */}
      <Route path="/home" element={<ProtectedRoute allowedRoles={['3','1','2']}><Home/></ProtectedRoute>}/>
      <Route path='/products' element={<ProtectedRoute allowedRoles={['3','1','2']}><Products/></ProtectedRoute>}/>
      <Route path="/product/:id" element={<ProtectedRoute allowedRoles={['3','1','2']}><ProductDetails/></ProtectedRoute>} />
      <Route path='/about' element={<ProtectedRoute allowedRoles={['3','1','2']}><About/></ProtectedRoute>}/>
      <Route path="/contact" element={<ProtectedRoute allowedRoles={['3','1','2']}><Contact/></ProtectedRoute>}/>
    
     </Routes>
     
     </BrowserRouter>
    
  )
}

export default App
