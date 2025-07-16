import React, { useState } from 'react'
import './Banner.css'
function AdvBanner() {
    const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <>
 {/* <div className="tm-luxe-banner">
      <div className="tm-banner-left">
        <span className="tm-new-tag">NEW</span>

        <img
          src="/colive4.png"
          alt="TM Luxe"
          className="tm-banner-image"
        />

        <div className="tm-banner-text">
          <span className="tm-banner-title">Introducing TM Luxe – Private Comfort, Premium Style. </span>
          <span className="tm-banner-subtext">Now Launched!</span>
        </div>
      </div>

      <div className="tm-banner-right">
        <a href="/tm-luxe" className="tm-banner-button">
          Explore TM Luxe
        </a>
        <button className="tm-close-btn" onClick={() => setVisible(false)}>×</button>
      </div>
    </div> */}
      {/* <div className="tm-floating-banner">
      <div className="tm-banner-image-wrapper">
        <span className="tm-new-tag">NEW</span>
        <img
          src="https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/1752041904187-1.jpg"
          alt="TM Luxe"
          className="tm-banner-image"
        />
      </div>

      <div className="tm-banner-content">
        <div className="tm-banner-text">
          <span className="tm-banner-title">Introducing TM Luxe – Private Comfort, Premium Style.</span>
          <span className="tm-banner-subtext">Now Launched!</span>
        </div>
        <a href="/tm-luxe" className="tm-banner-button">Book Now</a>
      </div>

      <button className="tm-close-btn" onClick={() => setVisible(false)}>×</button>
    </div> */}
      <div className="tm-banner-container">
      <div className="tm-nail"></div>

      <svg className="tm-thread-lines" viewBox="0 0 100 50">
        <line x1="45" y1="0" x2="15" y2="45" stroke="black" strokeWidth="2" />
        <line x1="55" y1="0" x2="85" y2="45" stroke="black" strokeWidth="2" />
      </svg>

      <div className="tm-board-horizontal">
        <div className="tm-left-text">
          <span className="tm-title">TM Luxe</span>
        </div>
        <a href="https://townmanor.ai/newcoliving" className="tm-book-btn">Book Now.</a>
      </div>
    </div>
    </>
  )
}

export default AdvBanner