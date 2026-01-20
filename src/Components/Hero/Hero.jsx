import React, { useState } from 'react'
import './Hero.css'
import img from '../../assets/hero.jpg'
import { useNavigate } from 'react-router-dom'



function Hero() {
  const navigate = useNavigate()
  

  return (
    
       <section className='hero'>
    <img src={img} alt="hero section" className='hero-img'/>
    <div className='hero-content'>
          <h2>Discover your Style Effortlessly</h2>
          <button onClick={() => navigate('/products')}>SHOP NOW</button>
        </div>
   </section>
    

      

    
  )
}

export default Hero
