import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../Components/Header/Header";
import Footer from "../../../Components/Footer/Footer";
import { motion } from "framer-motion";
import './ProductDetails.css';

function ProductDetails() {
  const { id } = useParams(); // Get product ID from URL
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${BASE_URL}/product/${id}`);
        const data = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch product details");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, BASE_URL]);

  // Loader
  if (loading) {
    return (
      <div className="loader-wrapper">
        <span className="loader"></span>
      </div>
    );
  }

  if (error) return <h4 className="error-text">{error}</h4>;
  if (!product) return <h4 className="error-text">Product not found</h4>;

  return (
    <div>
      <Header />

      <div className="product-details-page">
        <div className="back-row">
          <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
        </div>

        <motion.div 
          className="details-container"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="image-section">
            <motion.img
              src={product.image_url}
              alt={product.product_name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            />
          </div>

          <div className="info-section">
            <motion.span
              className="category-pill"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              {product.category?.category_name}
            </motion.span>

            <motion.h1
              className="product-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {product.product_name}
            </motion.h1>

            <motion.div
              className="price-row"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <span className="ammount">₹ </span>{product.price.toLocaleString()}
            </motion.div>

            {product.description && (
              <motion.p
                className="description"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
              >
                {product.description}
              </motion.p>
            )}

            <motion.div
              className="action-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
            >
              <button className="add-cart-btn">Add to Cart</button>
              <button className="buy-now-btn">Buy Now</button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

export default ProductDetails;
