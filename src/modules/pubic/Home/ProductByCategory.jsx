import React, { useEffect, useRef, useState } from "react";
import "./ProductByCategory.css";
import { useNavigate } from "react-router-dom";


function ProductByCategory() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [category, setCategory] = useState([]);
  const scrollItems=[...category,...category]
  const navigate = useNavigate();

  const handleCategoryClick=(id)=>{
     navigate('/products', { state: { categoryId: id } });

  }


  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await fetch(`${BASE_URL}/category/`);
        const data = await res.json();
        setCategory(Array.isArray(data.categories) ? data.categories : []);
      } catch (err) {
        console.log("error while fetching category");
        setCategory([]);
      }
    };
    fetchdata();
    
  }, []);

  

  return (
    <section className="product-by-category">
     

        {/* Header */}
        <div className="header">
          <div className="header-text">
            <h2>Shop By Category</h2>
            <p>Explore our wide range of categories</p>
          </div>

         
        </div>

        {/* Auto Scroll Area */}
        <div className="marquee">
          <div className="marquee-track" >
            {scrollItems.map((item,i) => (
                <div
                  className="category-card"
                  key={i}
                  onClick={() => handleCategoryClick(item.category_id)}
                >
                  <div className="card-inner">
                    <div className="card-image">
                      <img src={item.image_url} alt={item.category_name} />
                    </div>
                  </div>
                  <p className="card-name">{item.category_name}</p>
                </div>
              ))}

          </div>
        </div>

      
    </section>
  );
}

export default ProductByCategory;
