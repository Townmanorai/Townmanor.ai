import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

import "./ClientsSay.css"
import "../common.css";
import "../commonsecond.css";

const ClientSay = () => {
  // Slick settings for the carousel
  const slickSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          rows: 1, // Retain two rows on medium screens
          slidesPerRow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, // For smaller screens show only 1 card per row
          rows: 1,
          slidesPerRow: 1,
        },
      },
    ],
  };

  return (
    <section className="testimonial-sec section-padding testimonail-sect widget_edit_enabled">
      <div className="container text-center">
        <h3 className="testi_title">Testimonials</h3>
      </div>
      <div className="testimonial_gb client-Say">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6">
              <div className="section-heading">
                {/* <span>Clients Say</span> */}
              </div>
            </div>
          </div>
          <div className="testimonail-sect">
            <Slider {...slickSettings}>
              <div className="comment-info">
                <div className="cm-img">
                  <img
                    src="./cm-img1.webp"
                    alt=""
                  />
                </div>
                <p>Finding the right home loan used to be a nightmare! Townmanor made it a breeze. My Relationship Manager was fantastic, explaining everything clearly and helping me secure the best rate possible. Thanks to the team!! </p>
                <div className="cm-info-sec">
                  <div className="cm-info">
                    <h3>Priya Dasn /</h3>
                    <h4>Property Owner</h4>
                  </div>
                </div>
              </div>

              <div className="comment-info">
                <div className="cm-img">
                  <img
                    src="./cm-img2.webp"
                    alt=""
                  />
                </div>
                <p>Finding the perfect property can be a daunting task. Townmanor's extensive listings and personalized recommendations were a game-changer. They helped me find my dream home that ticked all the boxes.</p>
                <div className="cm-info-sec">
                  <div className="cm-info">
                    <h3>Sarah Kapoor /</h3>
                    <h4>Property Owner</h4>
                  </div>
                </div>
              </div>

              <div className="comment-info">
                <div className="cm-img">
                  <img
                    src="./cm-img3.webp"
                    alt=""
                  />
                </div>
                <p>Selling my property quickly and at the right price was my top priority. Townmanor's expert marketing team went above and beyond. They created stunning visuals and targeted listings, resulting in a fast and successful sale!</p>
                <div className="cm-info-sec">
                  <div className="cm-info">
                    <h3>Vikram Singh /</h3>
                    <h4>Property Owner</h4>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientSay;
