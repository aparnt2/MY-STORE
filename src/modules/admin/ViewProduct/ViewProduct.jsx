import React, { useEffect, useState } from 'react';
import Header from '../../../Components/Header/Header';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import Filter from '../../../Components/Filter/Filter';
import Search from '../../../Components/Search/Search';
import Loader from '../../../Components/Loader/Loader';

import './ViewProduct.css';

function ViewProduct() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCate, setSelectedCate] = useState("");
  const [searchterm, setSearchterm] = useState("");

  // ===== Fetch Categories =====
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${BASE_URL}/category`);
        const data = await res.json();
        setCategory(data.categories || []);
      } catch (err) {
        console.error("Error fetching categories", err);
      }
    };
    fetchCategories();
  }, []);

  // ===== Fetch Products =====
useEffect(() => {
 

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
}, [searchterm, selectedCate]);


  // ===== Delete Product =====
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Do you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${BASE_URL}/product/${id}/delete`);
      if (!res.ok) throw new Error("Failed to delete");
      setProducts(prev => prev.filter(p => p.product_id !== id));
    } catch (err) {
      alert("Error while deleting product");
    }
  };

  return (
    <div>
      <Header />
      <div className="viewproduct-body">
        <div className="tab">
          <IoIosArrowBack className='back-icon' onClick={() => navigate('/dashboard')} />
          <h3>Products</h3>
        </div>

        <div className='search-sort'>
          <Filter selectedCate={selectedCate} setSelectedCate={setSelectedCate} category={category} />
          <Search searchterm={searchterm} setSearchterm={setSearchterm} />
        </div>

        {loading && <Loader fullscreen />}

        {!loading && error && <h4 className="error-msg">{error}</h4>}

        {!loading && !error && products.length > 0 && (
          <div className="product-table-wrapper">
            <table className="product-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.product_id}>
                    <td>{p.product_id}</td>
                    <td>
                      <img src={p.image_url} alt={p.product_name} className="thumbnail" />
                    </td>
                    <td>{p.product_name}</td>
                    <td>{p.category?.category_name}</td>
                    <td>₹{p.price.toLocaleString()}</td>
                    <td>
                      <button 
                        className="edit-btn"
                        onClick={() => navigate('/edit-product', { state: { product: p } })}
                      >
                        <FaEdit size={16} />
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDelete(p.product_id)}
                      >
                        <MdDelete size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && !error && products.length === 0 && <h4>No products found</h4>}
      </div>
    </div>
  );
}

export default ViewProduct;
