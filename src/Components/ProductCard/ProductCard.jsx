import React from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import './ProductCard.css';

function ProductCard({ p, handiledelete, navigate }) {
  return (
    <div className="product-card">
      <div className="card-top">
        <span className="category-badge">{p.category.category_name}</span>
        <div className="image-container">
          <img src={p.image_url} alt={p.product_name} />
        </div>
      </div>

      <div className="product-body">
        <h2 className="product-name">{p.product_name}</h2>

        <div className="product-footer">
          <div className="price-container">
            <span className="currency">₹</span>
            <span className="amount">{p.price.toLocaleString()}</span>
          </div>
          <div className="edit-delete">
            <button 
              className="edit" 
              onClick={() => navigate('/edit-product', { state: { product: p } })}
            >
              <FaEdit size={16}/>
            </button>
            <button 
              className="delete" 
              onClick={() => handiledelete(p.product_id)}
            >
              <MdDelete size={16}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
