import React from 'react'
import './Contact.css'
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Footer from '../../../Components/Footer/Footer';
import { motion } from "framer-motion";
import PubilcHeader from '../../../Components/Header/PublicHeader'


function Contact() {
  return (
    <div className="contact-page">
      <PubilcHeader/>
      

      {/* Animate the container */}
      <motion.div
        className='contact-container'
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          Contact Us
        </motion.h2>

        {/* Animate each contact block with stagger */}
        <motion.div
          className='contact'
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <MdEmail style={{ fontSize: "30px" }} />
          <p>contact@myshop.com</p>
        </motion.div>

        <motion.div
          className='contact'
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <FaPhoneAlt style={{ fontSize: "30px" }} />
          <p>+1 (555) 122-4567</p>
        </motion.div>

        <motion.div
          className='contact'
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <FaLocationDot style={{ fontSize: "30px" }} />
          <p>Street123 Kasaragod, Kerala</p>
        </motion.div>
      </motion.div>

      <Footer />
    </div>
  );
}


export default Contact;
