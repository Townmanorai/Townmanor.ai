import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../common.css";
import "../commonsecond.css";

const Discovermore = () => {
  // Slick slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
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
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <section className="main-banner-sec widget_edit_enabled mb-0 pb-0 Advertisment">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8">
            <div className="section-heading mb-4 h4">
              <h1>Discover <b>more</b></h1>
            </div>
          </div>
        </div>

        <Slider {...settings} className="banner-carousel">
          <div className="banner-slide">
            <img src={'/600x600ad_space_available_4.jpg'} alt="ad_space_available_4.jpg" />
          </div>
          <div className="banner-slide">
            <img src={'/600x600ad_space_available_2.jpg'} alt="ad_space_available_2.jpg" />
          </div>
          <div className="banner-slide">
            <img src={'/600x600ad_space_1.jpg'} alt="ad_space_1 (1).jpg" />
          </div>
          <div className="banner-slide">
            <img src={'/600x600ad_space_2.png'} alt="ad_space_2.png" />
          </div>
          <div className="banner-slide">
            <img src={'/600x600ad_space_3.jpg'} alt="ad_space_3.jpg" />
          </div>
          <div className="banner-slide">
            <img src={'/600x600ad_space.jpg'} alt="ad_space.jpg" />
          </div>
          <div className="banner-slide">
            <img src={'/600x600ad_space_1.jpg'} alt="ad_space_1.jpg" />
          </div>
          <div className="banner-slide">
            <img src={'/600x600ad_space_available_3.jpg'} alt="ad_space_available_3.jpg" />
          </div>
        </Slider>
      </div>
    </section>
  );
};

export default Discovermore;
