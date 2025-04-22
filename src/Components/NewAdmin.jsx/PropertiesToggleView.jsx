import React, { useState, useRef } from "react";
import { FaBed, FaRulerCombined } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import "./PropertiesToggleView.css";

const PropertiesToggleView = ({ property }) => {
  const [activeTab, setActiveTab] = useState("sale");
  const swiperRef = useRef(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(0);
    }
  };

  // Parse configuration into separate units
  const configurations = property.configuration?.split(', ') || [];
  const areaRanges = property.area_detail?.match(/\d+(?:,\d+)*/g) || [];
  const priceRanges = property.price?.match(/\d+(?:\.\d+)?/g) || [];

  const propertyUnits = configurations.map((config, index) => ({
    title: config,
    area: areaRanges[index] ? `${areaRanges[index]} sq.ft` : property.area_detail,
    beds: config.split(' ')[0],
    price: priceRanges[index] ? `₹${priceRanges[index]} Cr` : property.price,
    desc: property.description,
    image: property.image_repository?.split(', ')[0] || '/commercial.jpg'
  }));

  return (
    <div className="propertyToggleUnique__container">
      <h2 className="propertyToggleUnique__title">Available Units</h2>
      <div className="propertyToggleUnique__content">
        <div className="propertyToggleUnique__main">
          <Swiper
            ref={swiperRef}
            modules={[Navigation]}
            spaceBetween={20}
            navigation={true}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 10
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20
              }
            }}
            className="propertyToggleUnique__swiper"
          >
            {propertyUnits.map((unit, idx) => (
              <SwiperSlide key={idx}>
                <div className="propertyToggleUnique__card">
                  <img src={unit.image} alt={unit.title} />
                  <h4>{unit.title}</h4>
                  <div className="propertyToggleUnique__infoRow">
                    <span><FaRulerCombined /> {unit.area}</span>
                    <span><FaBed /> {unit.beds} Beds</span>
                  </div>
                  <h5>{unit.price}</h5>
                  <button className="propertyToggleUnique__contactBtn">Know More</button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="propertyToggleUnique__imageRight">
          <img src="/rentagreement.png" alt="Property Agreement" />
        </div>
      </div>
    </div>
  );
};

export default PropertiesToggleView;
