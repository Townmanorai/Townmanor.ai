import React from "react";
import "./Diya.css";  // Create a separate CSS file for diya styles

const Diya = () => {
  return (
    <div className="diya-celebration">
      <div className="diwali-banner">
        <h2>Celebrate Diwali with Huge Discounts!</h2>
        <p>Enjoy up to 80% off on all plans during this festive season!</p>
      </div>
      <div className="diwali-lights">
        <div className="diya-container left">
          <div className="diya-shadow"></div>
          <div className="diya-base">
            <div className="diya-line-1"></div>
            <div className="diya-line-2"></div>
            <div className="diya-dots"></div>
          </div>
          <div className="diya-inner">
            <div className="light"></div>
            <div className="diya-flame"></div>
          </div>
        </div>

        <div className="ad-video-container">
          <video className="ad-video" controls autoPlay muted loop>
            <source src={`${process.env.PUBLIC_URL}/AdsVideo.mp4`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="diya-container right">
          <div className="diya-shadow"></div>
          <div className="diya-base">
            <div className="diya-line-1"></div>
            <div className="diya-line-2"></div>
            <div className="diya-dots"></div>
          </div>
          <div className="diya-inner">
            <div className="light"></div>
            <div className="diya-flame"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diya;
