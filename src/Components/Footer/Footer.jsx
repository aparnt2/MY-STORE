import React from 'react'
import './Footer.css'
import { FaBagShopping } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className='footer'>
        <div className='footer-container'>
            <div className='footer-col'>
                <h3><FaBagShopping /> MYSTORE</h3>
                <p>MyStore is your go-to destination for quality products and exceptional service.</p>

            </div>
          
            <div className='footer-col'>
                <h4>About Us</h4>
                 <Link to='/'>Home</Link>

                <Link to='/about'>About MYSTORE</Link>
                
                <Link to='/products'>View Products</Link>

            </div>
            <div className='footer-col'>
                <h4>Help</h4>
                <Link to='/contact'>Contact</Link>
                

            </div>
            

        </div>
        <div className="footer-bottom">
                     © 2025 MyStore. All rights reserved.
            </div>

    </footer>
  )
}

export default Footer
