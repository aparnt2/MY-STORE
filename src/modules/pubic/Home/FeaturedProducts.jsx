import React from 'react'
import './FeaturedProducts.css'
import laptop1 from '../../../assets/laptop1.jpg'
import { FaStar } from "react-icons/fa";

function FeaturedProducts() {
  return (

   <section className='featured'>
    <h2>Featured Product</h2>
    

   

    <div className='products'>
        <div className='product-card'>
            <img src={laptop1}/>
            <div className='contant'>
                      <h4>HP OmniBook 5 40.6 cm (16) Laptop 16-ba1789TU, Silver</h4>
            <div className='price-rating'>
                    <p>₹50000</p><div className="stars">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar className="inactive" />
            </div>
            
        
            </div>
            <div className='add-cart'>
                <button>Add to Cart</button>
            </div>
            </div>
          
        </div>

        <div className='product-card'>
            <img src={laptop1}/>
            <div className='contant'>
                      <h4>HP OmniBook 5 40.6 cm (16) Laptop 16-ba1789TU, Silver</h4>
            <div className='price-rating'>
                    <p>₹50000</p><div className="stars">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar className="inactive" />
            </div>
            
        
            </div>
            <div className='add-cart'>
                <button>Add to Cart</button>
            </div>
            </div>
          
        </div>

        <div className='product-card'>
            <img src={laptop1}/>
            <div className='contant'>
                      <h4>HP OmniBook 5 40.6 cm (16) Laptop 16-ba1789TU, Silver</h4>
            <div className='price-rating'>
                    <p>₹50000</p><div className="stars">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar className="inactive" />
            </div>
            
        
            </div>
            <div className='add-cart'>
                <button>Add to Cart</button>
            </div>
            </div>
          
        </div>

    


    

    </div>

   </section>
  )
}

export default FeaturedProducts
