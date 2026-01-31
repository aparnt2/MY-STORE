import React, { useEffect, useState } from 'react'
import Header from '../../../Components/Header/AdminHeader'
import Hero from '../../../Components/Hero/Hero'
import { motion } from 'framer-motion'
import Footer from '../../../Components/Footer/Footer'
import ProductByCategory from './ProductByCategory'

import Topnavbar from '../../../Components/TopSection/Topnavbar'
import PubilcHeader from '../../../Components/Header/PublicHeader'
function Home() {
  

 

  return (
    <div className='main' >
     
     <PubilcHeader/>

     
      
      <Hero/>
      <ProductByCategory/>
      <Footer/>


      

     
    </div>
  )
}

export default Home
