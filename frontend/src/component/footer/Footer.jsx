import React from 'react'
import './footer.css' 
import {assets} from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
       <div className="footer-content">
        <div className="footer-content-left">
          <h1> <a>Bazaar</a>Now</h1>
            {/* <img src={assets.logo} alt="" /> */}
            <p>

            Welcome to BazaarNow, your one-stop destination for seamless online shopping. We offer a wide range of products and services, including food delivery, clothing, and books, all integrated into a single platform for your convenience.

            </p>
            <div className="footer-socail-icons">
              <img src={assets.facebook_icon} alt="" />
              <a href="https://www.linkedin.com/in/priyanshu-kumar-1a5562226?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><img src={assets.linkedin_icon} alt="" /></a>   
            </div>
        </div>
        <div className="footer-content-right">
            <h2>Website</h2>
            <ul>
              <p>Shipping Information
Returns & Exchanges
Privacy Policy
Terms of Service
Stay Connected
Follow us on social media for the latest updates, special offers, and more!</p>
            </ul>
            <li>priyanshuraj7590@gmail.com</li>
        </div>
       </div>
       <hr />
       <p className='footer-copyright'></p>
    </div>
  )
}

export default Footer