import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import "./PropertySuggestionSectionStyles.css";
import { useAnimate } from "framer-motion";
import { useNavigate } from "react-router-dom";

const PropertySuggestionSection = ({ property }) => {
  const [similarProperties, setSimilarProperties] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchSimilarProperties = async () => {
      try {
        // Build query parameters dynamically
        const queryParams = new URLSearchParams({
          purpose: 'sale',
          city: 'noida',
          furnish_type: ''
        });

        // Add optional parameters if they exist in the property prop
        if (property?.configuration) {
          queryParams.append('configuration', property.configuration);
        }
        if (property?.construction_status) {
          queryParams.append('construction_status', property.construction_status);
        }

        const response = await axios.get(
          `https://www.townmanor.ai/api/owner-property/filter/suggestion?${queryParams.toString()}`
        );
        setSimilarProperties(response.data);
      } catch (error) {
        console.error("Error fetching similar properties:", error);
      }
    };

    fetchSimilarProperties();
  }, [property]); // Add property as dependency
  const handleNavigate = (url) => {
    window.location.href = url;  // Will navigate directly to the given URL
};
  return (
    <div className="property-suggestion-section-wrapper">
      <h3 className="property-suggestion-heading-text">
        People who viewed this property also liked
      </h3>
      <div className="property-card-list-container deskview">
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={4}
          navigation={true}
          className="property-swiper"
          style={{
            "--swiper-navigation-color": "#e23e57",
            "--swiper-navigation-size": "25px"
          }}
          breakpoints={{
            0: {
              slidesPerView: 1.2,
              spaceBetween: 10
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 20
            }
          }}
        >
          {similarProperties.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="property-card-wrapper-box" onClick={()=>{
                handleNavigate(`https://townmanor.ai/newownerpage/${item.id}`)
              }}>
                <div className="property-card-image-frame" >
                  <img
                    src={item.image_repository ? `https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/${JSON.parse(item.image_repository)[0]}` : "/commercial.jpg"}
                    alt={item.property_name}
                    className="property-image-thumbnail"
                  />
                  {/* <div className="property-view-badge-overlay">
                    <FaEye className="property-icon-eye-shape" />
                    <span className="property-percentage-text-info">{item.views || 0}</span>
                  </div> */}
                </div>
                <div className="property-card-text-detail-box">
                  <div className="property-flat-detail-row">
                    <span className="property-flat-bhk-info">{item.configuration}</span>
                    <span className="property-flat-price-info">
                      ₹{item.price} {item.pricerange}
                    </span>
                  </div>
                  <div className="property-project-subtext-row">
                    <span className="property-project-name-text">{item.property_name}</span>
                    <span className="property-size-square-text">{item.area_detail} sqft</span>
                  </div>
                  
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="property-card-list-container mobile">
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={4}
          navigation={true}
          className="property-swiper"
          style={{
            "--swiper-navigation-color": "#e23e57",
            "--swiper-navigation-size": "25px"
          }}
          breakpoints={{
            0: {
              slidesPerView: 1.2,
              spaceBetween: 10
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 20
            }
          }}
        >
          {similarProperties.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="property-card-wrapper-box">
                <div className="property-card-image-frame">
                  <img
                    src={item.image_repository ? `https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/${JSON.parse(item.image_repository)[0]}` : "/commercial.jpg"}
                    alt={item.property_name}
                    className="property-image-thumbnail"
                  />
                  {/* <div className="property-view-badge-overlay">
                    <FaEye className="property-icon-eye-shape" />
                    <span className="property-percentage-text-info">{item.views || 0}</span>
                  </div> */}
                </div>
                <div className="property-card-text-detail-box">
                  <div className="property-flat-detail-row">
                    <span className="property-flat-bhk-info">{item.configuration}</span>
                    <span className="property-flat-price-info">
                      ₹{item.price} {item.pricerange}
                    </span>
                  </div>
                  <div className="property-project-subtext-row">
                    <span className="property-project-name-text">{item.property_name}</span>
                    <span className="property-size-square-text">{item.area_detail} sqft</span>
                  </div>
                  
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PropertySuggestionSection;
