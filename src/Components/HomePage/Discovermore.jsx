import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Discovermore.css";
import "../common.css";
import "../commonsecond.css";

const Discovermore = () => {
  // Slick slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      }
    ]
  };

  // State to hold slider height
  const [sliderHeight, setSliderHeight] = useState('250px');

  useEffect(() => {
    const updateSliderHeight = () => {
      // Adjust height: 75px for mobile (width < 768px), otherwise 250px
      setSliderHeight(window.innerWidth < 768 ? '75px' : '250px');
    };

    // Update on component mount
    updateSliderHeight();

    // Update on window resize
    window.addEventListener('resize', updateSliderHeight);
    return () => window.removeEventListener('resize', updateSliderHeight);
  }, []);

  return (
    <section className="main-banner-sec widget_edit_enabled mb-0 pb-0 Advertisment" style={{paddingTop:"5px"}}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8">
            <div className="section-heading mb-4 h4">
              <h1>Discover <b>more</b></h1>
            </div>
          </div>
        </div>
        <div className='remove-dots'>
        <Slider {...settings} className="banner-carousel" style={{ height: sliderHeight }}>
          <div className="banner-slide">
            <img src="https://s3.ap-south-1.amazonaws.com/townamnor.ai/ads-image/townmanor_discover_more8.jpg" alt="ad_space_available_4.jpg" />
          </div>
          <div className="banner-slide">
            <img src="https://s3.ap-south-1.amazonaws.com/townamnor.ai/ads-image/townmanor_discover_more4.jpeg" alt="ad_space_available_2.jpg" />
          </div>
          <div className="banner-slide">
            <img src="https://s3.ap-south-1.amazonaws.com/townamnor.ai/ads-image/townmanor_discover_more5.jpg" alt="ad_space_1 (1).jpg" />
          </div>
          <div className="banner-slide">
            <img src="https://s3.ap-south-1.amazonaws.com/townamnor.ai/ads-image/townmanor_discover_more6.jpg" alt="ad_space_2.png" />
          </div>
          <div className="banner-slide">
            <img src="https://s3.ap-south-1.amazonaws.com/townamnor.ai/ads-image/townmanor_discover_more7.jpeg" alt="ad_space_3.jpg" />
          </div>
          <div className="banner-slide">
            <img src="https://s3.ap-south-1.amazonaws.com/townamnor.ai/ads-image/townmanor_discover_more1.png" alt="ad_space.jpg" />
          </div>
          <div className="banner-slide">
            <img src="https://s3.ap-south-1.amazonaws.com/townamnor.ai/ads-image/townmanor_discover_more2.jpg" alt="ad_space_1.jpg" />
          </div>
          <div className="banner-slide">
            <img src="https://s3.ap-south-1.amazonaws.com/townamnor.ai/ads-image/townmanor_discover_more3.jpeg" alt="ad_space_available_3.jpg" />
          </div>
        </Slider>
        </div>
      </div>
    </section>
  );
};

export default Discovermore;
