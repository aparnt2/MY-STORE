import React from 'react'
import './Hero.css'
import img from '../../assets/hero.jpg'

function Hero() {
  return (
   <section className='hero'>
    <img src={img} alt="hero section" className='hero-img'/>
    <div className='hero-content'>
        <h2>Discover your Style Effortiessy</h2>
        
        <button>SHOP NOW</button>

    </div>
   </section>
  )
}

export default Hero
