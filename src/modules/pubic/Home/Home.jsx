import React from 'react'
import Header from '../../../Components/Header/Header'
import Hero from '../../../Components/Hero/Hero'
import FeaturedProducts from './FeaturedProducts'
import Footer from '../../../Components/Footer/Footer'
import ProductByCategory from './ProductByCategory'

function Home() {
  return (
    <div className='main'>
        <Header/>
       <Hero/>
      
       <ProductByCategory/>
       <Footer/>


    
      
    </div>
  )
}

export default Home
