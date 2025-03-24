import React from 'react';
import "../Footer/Footer.css";
import logo from '../images/channels-logo-white._CB554929912_.png';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className='footer'>
      <div className="footer__logo">
        <img src={logo} alt="Amazon Logo" />
      </div>
      <div className="footer__links">
        <a href="/terms">Terms & Privacy Notice</a>
        <a href="/feedback">Send us feedback</a>
        <a href="/help">Help</a>
        <span>1996-{currentYear}, amazon.com, Inc. or its affiliates</span>
      </div>
    </footer>
  );
}

export default Footer;