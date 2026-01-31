import React, { useEffect, useState } from 'react'
import ProductCardPublic from '../../../Components/ProductCard/ProductCardPublic'
import { useNavigate, useLocation } from 'react-router-dom'
import Header from '../../../Components/Header/AdminHeader'
import Footer from '../../../Components/Footer/Footer'
import Loader from '../../../Components/Loader/Loader'
import { IoIosArrowBack } from "react-icons/io";
import Search from '../../../Components/Search/Search'
import Filter from '../../../Components/Filter/Filter'
import './Products.css'
import PubilcHeader from '../../../Components/Header/PublicHeader'

function Products() {
  const BASE_URL = import.meta.env.VITE_BASE_URL

  const [products, setProducts] = useState([])
  const [category, setCategory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedCate, setSelectedCate] = useState("")
  const [searchterm, setSearchterm] = useState("")
  const [categoryReady, setCategoryReady] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  // ================= FETCH CATEGORIES =================
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${BASE_URL}/category`)
        const data = await res.json()

        setCategory(data.categories || [])

        // Set category from Home navigation
        if (location.state?.categoryId) {
          setSelectedCate(String(location.state.categoryId))
        }

        setCategoryReady(true)
      } catch (err) {
        setError("Error while fetching categories")
        setCategoryReady(true)
      }
    }

    fetchCategories()
  }, [location.state])

  // ================= FETCH PRODUCTS =================
useEffect(() => {
  if (!categoryReady) return;

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      // Build query params
      const params = new URLSearchParams();
      if (searchterm && searchterm.trim()) {
        params.append("keyword", searchterm.trim());
      }
      if (selectedCate && selectedCate !== "") {
        params.append("category", selectedCate);
      }

      const queryString = params.toString();
      const URL = queryString
        ? `${BASE_URL}/product/product/?${queryString}`
        : `${BASE_URL}/product/product/`;

      const res = await fetch(URL);
      const productdata = await res.json();

      if (Array.isArray(productdata)) {
        setProducts(productdata);
      } else {
        setProducts([]);
      }

      setLoading(false);
    } catch (error) {
      console.log("Fetch error:", error);
      setError("Error while fetching products");
      setProducts([]);
      setLoading(false);
    }
  };

  fetchProducts();
}, [searchterm, selectedCate, categoryReady]);


  // ================= UI =================
  return (
    <div className='product-page' >
      <PubilcHeader/>
      
      <div className='viewproductbody'>
        

        <div className='search-sort'>
          <Filter
            selectedCate={selectedCate}
            setSelectedCate={setSelectedCate}
            category={category}
          />
          <Search
            searchterm={searchterm}
            setSearchterm={setSearchterm}
          />
        </div>

        <div className='productlist'>

        
          {loading && <Loader  fullscreen/>}

         
          {!loading && error && <h4>{error}</h4>}

          
          {!loading && !error && products.length === 0 && (
            <h4>No products found</h4>
          )}

          
          {!loading && products.length > 0 && (
            <>
              {products.map(p => (
                <div
                  key={p.product_id}
                  onClick={() => navigate(`/product/${p.product_id}`)}
                >
                  <ProductCardPublic p={p} />
                </div>
              ))}
            </>
          )}

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Products
