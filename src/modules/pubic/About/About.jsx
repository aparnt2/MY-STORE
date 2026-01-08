import React from 'react'
import Header from '../../../Components/Header/Header'
import Footer from '../../../Components/Footer/Footer'
import './About.css'

function About() {
  return (
    <div>
        <Header/>
        <div className='about-container'>
            <div className=''>
                <h2>About MYSTORE</h2>
            <p>At MyStore, we believe in bringing you curated products that blend quality, innovation, and timeless style. Our journey began with a simple idea: to create a shopping experience that feels personal, inspiring, and effortless.</p>


            </div>
            <div className='about-content'>
                <h2>Our Story </h2>
            <p>Founded in 2020, MyStore began with a simple mission: to make quality products accessible to everyone. What started as a small online shop has grown into a trusted destination for thousands of satisfied customers.
We believe that shopping should be easy, enjoyable, and rewarding. That's why we've built a platform that combines an extensive product selection with exceptional customer service and competitive pricing.
Today, we continue to expand our offerings while staying true to our core values of quality, affordability, and customer satisfaction.</p>

            </div>
            <div className='vison-mission'>
                <div className='mission'>
                    <h4>Our Mission</h4>
                    <p>To provide our customers with an exceptional shopping experience by offering high-quality products, competitive prices, and outstanding customer service. We strive to make every interaction with MyStore memorable and satisfying.</p>

                </div>
                <div className='vison'>
                    <h4>Our Vision</h4>
                    <p>To become the most trusted and customer-centric online shopping destination, known for our commitment to quality, innovation, and sustainability. We envision a future where shopping online is seamless, enjoyable, and environmentally responsible.</p>

                </div>

            </div>
        </div>

        <Footer/>
      
    </div>
  )
}

export default About
