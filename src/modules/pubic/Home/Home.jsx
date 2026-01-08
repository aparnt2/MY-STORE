import React from 'react'
import Header from '../../../Components/Header/Header'
import Hero from '../../../Components/Hero/Hero'
import FeaturedProducts from './FeaturedProducts'
import Footer from '../../../Components/Footer/Footer'

function Home() {
  return (
    <div className='main'>
        <Header/>
       <Hero/>
       <FeaturedProducts/>
       <Footer/>


    
      
    </div>
  )
}

export default Home
