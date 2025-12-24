import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import Login from "./Login"
import AdminDashboard from "./modules/admin/Dashboard/AdminDashboard"
import MasterData from "./modules/admin/MasterData/MasterData"

function App() {
  

  return (
    
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Login/>}/>
     
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
<Route path="/admin/master-data" element={<MasterData />} />

     </Routes>
     
     </BrowserRouter>
    
  )
}

export default App
