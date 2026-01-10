import React, { useEffect, useRef, useState } from "react";
import "./ProductByCategory.css";

function ProductByCategory() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [category, setCategory] = useState([]);
  const scrollRef = useRef(null);

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

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <section className="product-by-category">
     

        {/* Header */}
        <div className="header">
          <div className="header-text">
            <h2>Shop By Category</h2>
            <p>Explore our wide range of categories</p>
          </div>

          <div className="nav-arrows">
            <button className="scroll-btn" onClick={scrollLeft}>
              ◀
            </button>
            <button className="scroll-btn" onClick={scrollRight}>
              ▶
            </button>
          </div>
        </div>

        {/* Scroll Area */}
        <div className="scroll-wrapper">
          <div className="categories-scroll" ref={scrollRef}>
            {category.map((item) => (
              <div className="category-card" key={item.id}>
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
