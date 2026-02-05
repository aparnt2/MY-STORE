import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";

import ProtectedRoute from "./ProtectedRoute";
import ScrollToTop from "./ScrollToTop";



const Login = lazy(() => import("./Login"));
const Sign_up = lazy(() => import("./SignUp"));



/* Admin & User */
const AdminDashboard = lazy(() => import("./modules/admin/Dashboard/Dashboard"));
const MasterData = lazy(() => import("./modules/admin/MasterData/MasterData"));
const AddProduct = lazy(() => import("./modules/admin/AddProduct/AddProduct"));
const ViewProduct = lazy(() => import("./modules/admin/ViewProduct/ViewProduct"));
const EditProduct = lazy(() => import("./modules/admin/EditProduct/EditProduct"));
const AddEmployee = lazy(() => import("./modules/admin/AddEmployee/AddEmployee"));
const ViewEmployee = lazy(() => import("./modules/admin/ViewEmployee/ViewEmployee"));
const EditEmployee = lazy(() => import("./modules/admin/EditEmployee/EditEmployee"));

/* Public */
const Home = lazy(() => import("./modules/pubic/Home/Home"));
const About = lazy(() => import("./modules/pubic/About/About"));
const Contact = lazy(() => import("./modules/pubic/Contact/Contact"));
const Products = lazy(() => import("./modules/pubic/ProductDisplay/Products"));
const ProductDetails = lazy(() => import("./modules/pubic/ProductDisplay/ProductDetails"));



function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Suspense fallback={<div style={{ padding: 20 }}>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign_up" element={<Sign_up />} />
          <Route path="/login" element={<Login/>}/>


          {/* admin & employee */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={[1, 2]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/master-data"
            element={
              <ProtectedRoute allowedRoles={[1]}>
                <MasterData />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-product"
            element={
              <ProtectedRoute allowedRoles={[1, 2]}>
                <AddProduct />
              </ProtectedRoute>
            }
          />

          <Route
            path="/view-product"
            element={
              <ProtectedRoute allowedRoles={[1, 2]}>
                <ViewProduct />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-product/:id"
            element={
              <ProtectedRoute allowedRoles={[1, 2]}>
                <EditProduct />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/view-employee"
            element={
              <ProtectedRoute allowedRoles={[1]}>
                <ViewEmployee />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/add-employee/"
            element={
              <ProtectedRoute allowedRoles={[1]}>
                <AddEmployee />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/edit-employee/:id"
            element={
              <ProtectedRoute allowedRoles={[1]}>
                <EditEmployee />
              </ProtectedRoute>
            }
          />

        

          <Route
            path="/products"
            element={
              
                <Products />
             
            }
          />

          <Route
            path="/product/:id"
            element={
              
                <ProductDetails />
             
            }
          />

          <Route
            path="/about"
            element={
              
                <About />
              
            }
          />

          <Route
            path="/contact"
            element={
              
                <Contact />
              
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
