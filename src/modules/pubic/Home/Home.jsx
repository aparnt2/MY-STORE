import React, { useEffect, useState } from 'react'
import Header from '../../../Components/Header/Header'
import Hero from '../../../Components/Hero/Hero'
import { motion } from 'framer-motion'
import Footer from '../../../Components/Footer/Footer'
import ProductByCategory from './ProductByCategory'

function Home() {
  

 

  return (
    <div className='main' style={{backgroundColor:"#f8fafc"}}>
      <Header/>
      <Hero/>
      <ProductByCategory/>
      <Footer/>


      

     
    </div>
  )
}

export default Home
