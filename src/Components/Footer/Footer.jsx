import React from 'react'
import './Footer.css'
import footer_logo from '../Assests/logo_big.png'
import instagram from '../Assests/instagram_icon.png'
import whatsapp from '../Assests/whatsapp_icon.png'
import pintrest from '../Assests/pintester_icon.png'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src={footer_logo} alt="" />
            <p>SHOPPER</p>
        </div>
        <ul className="footer-links">
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className="footer-social-icons">
            <div className="footer-icons-container">
                <img src={instagram} alt="instagram" />
            </div>
            <div className="footer-icons-container">
                <img src={whatsapp} alt="whatsapp" />
            </div>
            <div className="footer-icons-container">
                <img src={pintrest} alt="pintrest" />
            </div>
        </div>
        <div className="footer-copyright">
            <hr />
            <p>Copyright @ 2024. All rights reserved</p>
        </div>
    </div>
  )
}

export default Footer