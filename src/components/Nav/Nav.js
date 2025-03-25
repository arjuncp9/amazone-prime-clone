import React, { useEffect, useState } from 'react'
import '../Nav/Nav.css'
import logo from "../../asset/logo-min-remaster.png"
import search from '../../asset/png_yrlry.png'

function Nav() {
  const [show, handleShow] = useState(false);
  
  const transitionNavBar = () => {
    if(window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  }

  useEffect(() => {
    const debouncedTransition = () => {
      let ticking = false;
      return () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            transitionNavBar();
            ticking = false;
          });
          ticking = true;
        }
      };
    };
    
    const debouncedScroll = debouncedTransition();
    window.addEventListener("scroll", debouncedScroll);
    return () => window.removeEventListener("scroll", debouncedScroll);
  }, []);

  return (
    <nav className={`nav ${show && "nav__gray"}`} aria-label="Main navigation">
      <div className="nav__content">
        <div className="nav__left">
          <div className="nav__logo">
            <img src={logo} alt="Company Logo" />
          </div>
        </div>
        <div className="nav__right">
          <button className="nav__searchIcon" aria-label="Search">
            <img src={search} alt="Search icon" />                 
          </button>
          <div className="joinPrime__button">
            <button aria-label="Join Prime">Join Prime</button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav