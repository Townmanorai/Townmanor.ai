import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import './ExclusiveOwnerProperties.css'; // Separate CSS for rented properties

const TopRentedProperties = () => {
  // Initialize city state with a default value (e.g., "noida")
  const [city, setCity] = useState('noida');
  const [data, setData] = useState([]);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <div className="swiper-button-next"><a href="javascript:void(0)"></a></div>,
    prevArrow: <div className="swiper-button-prev"><a href="javascript:void(0)"></a></div>,
    autoplay: true, 
    autoplaySpeed: 4000, 
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          rows: 1,
          slidesPerRow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.7,
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

  // Function to fetch data filtered by the selected city
  const fetchData = async (selectedCity) => {
    try {
      const response = await axios.get(`https://www.townmanor.ai/api/owner-property/filter/rent?city=${selectedCity}`);
      setData(response.data);
    } catch (error) {
      console.error('Error Fetching Data', error);
    }
  };

  // Fetch data whenever the selected city changes
  useEffect(() => {
    fetchData(city);
  }, [city]);

  return (
    <div className='container'>
      <div className="top-rented-properties" id="top-rentedProperties">
        <div className="rented-container">
          <section className="rented-section has-slider">
            <div className="rented-section-title" style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>  
              <div 
                className="exclusive-title-text strip-orange section-heading" 
                style={{ marginBottom: '0px' }}
                dangerouslySetInnerHTML={{ __html: `<h3>Rental <b>properties</b> in <b>${city}</b></h3>` }}
              />
              <div className="rental-owner-search-box">
                <select 
                  value={city} 
                  onChange={(e) => setCity(e.target.value)} 
                  style={{ 
                    padding: '5px 2px', 
                    borderRadius: '5px', 
                    border: '1px solid #e0e0e0',
                    backgroundColor: '#fff',
                    fontSize: '10px',
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  <option value="noida">Noida</option>
                  <option value="delhi">Delhi</option>
                  <option value="gurgaon">Gurgaon</option>
                </select>
              </div>
            </div>
            <div className="rented-property-slider rps">
              <Slider {...sliderSettings}>
                {data.filter(property => property.image_repository && property.image_repository.length > 0).map((property, index) => (
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
                          })()}
                          <span className="pic-count">{property.picCount}</span>
                        </div>
                        <div className="rented-card-content">
                          <div className="property-type">{property.configuration} {property.residential}</div>
                          <div className="property-rent">{property.price}/month</div>
                          <div className="property-location">{property.address}</div>
                          <div className="property-status" style={{ color: '#333' }}>Available for {property.purpose}</div>
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

export default TopRentedProperties;
