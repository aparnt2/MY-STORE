import React from 'react';
import './ProductCardPublic.css';

function ProductCardPublic({ p }) {
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
          {/* <button className="add-btn" onClick={(e)=>e.stopPropagation()}>
            Add <span className="plus">+</span>
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default ProductCardPublic;