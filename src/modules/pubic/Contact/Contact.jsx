import React from 'react'
import './Contact.css'
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Header from '../../../Components/Header/Header';
import Footer from '../../../Components/Footer/Footer';

function Contact() {
  return (
    <div className="contact-page">
        <Header/>
        

        <div className='contact-container'>
            <h2>Contact Us</h2>
            <div className='contact'>
                <MdEmail style={{fontSize:"30px"}} />
                <p>contact@myshop.com</p>
            </div>

            <div className='contact'>
                <FaPhoneAlt style={{fontSize:"30px"}} />
                <p>+1 (555) 122-4567</p>
            </div>

            <div className='contact'>
                <FaLocationDot style={{fontSize:"30px"}}/>
                <p>Street123 Kasaragod, Kerala</p>
            </div>
        </div>
        <Footer/>
        
    </div>
    
  )
}

export default Contact;
