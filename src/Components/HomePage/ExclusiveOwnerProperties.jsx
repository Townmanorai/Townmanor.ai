import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import './ExclusiveOwnerProperties.css';  // Separate CSS for rented properties

const ExclusiveOwnerProperties = ({stateName}) => {
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <div className="swiper-button-next"><a href="javascript:void(0)"></a></div>,
    prevArrow: <div className="swiper-button-prev"><a href="javascript:void(0)"></a></div>,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, 
    pauseOnHover: true, // Pause autoplay when hovering over the carousel

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
          slidesToShow: 1.7, // For smaller screens show only 1 card per row
          rows: 1,
          slidesPerRow: 1,
        },
      },
      {
        breakpoint: 530,
        settings: {
          slidesToShow: 1.1,
          rows: 1,
          slidesPerRow: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1.05,
          rows: 1,
          slidesPerRow: 1,
        },
      },
    ],
  };

  const [data,usedata]= useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://www.townmanor.ai/api/owner-property/filter/sale`);
        usedata(response.data);
        console.log(data);
      }
      catch (error) {
        console.error('Error Fetching Data', error);
      }
    };
    fetchData();
  },[]);

  
  
  return (
    <div className='container'>
      <div className="top-rented-properties" id="top-rentedProperties">
        <div className="rented-container">
          <section className="rented-section has-slider">
            <div className="rented-section-title" style={{marginTop:'25px'}}>
            <div className="exclusive-title-text strip-orange section-heading" style={{marginBottom:'0px'}} 
      dangerouslySetInnerHTML={{
          __html: stateName 
            ? `<h3>Resale <b>properties</b> in <b>${stateName}</b></h3>`
            : '<h3>Resale <b>properties</b> in <b>noida</b><h3>'
      }}>
        </div>
            </div>
            <div className="rented-property-slider rps">
              <Slider {...sliderSettings}>
                {data.map((property,index) => (
                  <div className="swiper-slide" key={index}>
                    <div className="rented-property-card card-shadow">
                      <a href="javascript:void(0);">
                        <div className="rented-card-graphic">
                          {property.image_repository && (() => {
                              try {
                                const images = JSON.parse(property.image_repository);
                                return images && Array.isArray(images) && images.length > 0
                                  ? <img src={`https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/${images[0]}`} alt="Property" />
                                  : <img src='/dummyproperty.jpg' alt="Property" />;
                              } catch (e) {
                                console.error('Error parsing image repository:', e);
                                return <img src='/dummyproperty.jpg' alt="Property" />;
                              }
                            })()
                          }

                            
                        </div>
                        <div className="rented-card-content">
                          <div className="property-type">{property.configuration} {property.residential}</div>
                          <div className="property-rent">{property.price} {property.pricerange}</div>
                          <div className="property-location">{property.address}</div>
                          <div className="property-status" style={{color:'#333'}}>Available for {property.purpose}</div>
                          <div className="action-btn">
                            <Link to={`https://townmanor.ai/home/${property.id}`}>
                              <span className="btn-blue medium">View Details</span>
                            </Link>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ExclusiveOwnerProperties;
