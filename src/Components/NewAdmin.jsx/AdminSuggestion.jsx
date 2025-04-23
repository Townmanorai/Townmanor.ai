import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import './AdminSuggestion.css'

function AdminSuggestion({ city }) {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get(
                    `https://www.townmanor.ai/api/property/city/${city}`
                );
                setProperties(response.data);
            } catch (error) {
                console.error("Error fetching properties:", error);
            }
        };

        if (city) {
            fetchProperties();
        }
    }, [city]);

    const handleNavigate = (url) => {
        window.location.href = url;  // Will navigate directly to the given URL
    };

    const formatPrice = (price) => {
        if (!price) return "Price on Request";
        
        // Remove HTML entities and clean the string
        let cleanPrice = price
            .replace(/â‚¹/g, '₹')
            .replace(/\s+/g, ' ')
            .trim();
        
        // If price already starts with ₹, return as is
        if (cleanPrice.startsWith('₹')) {
            return cleanPrice;
        }
        
        // Add ₹ symbol if it's missing
        return `₹ ${cleanPrice}`;
    };

    return (
        <div className="property-suggestion-section-wrapper">
            <h3 className="property-suggestion-heading-text">
                Properties in {city}
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
                    {properties.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="property-card-wrapper-box" onClick={() => {
                                handleNavigate(`https://townmanor.ai/newadminpage/${item.id}`)
                            }}>
                                <div className="property-card-image-frame">
                                    <img
                                        src={item.image_repository ? item.image_repository.split(',')[0].trim() : "/commercial.jpg"}
                                        alt={item.property_name}
                                        className="property-image-thumbnail"
                                    />
                                </div>
                                <div className="property-card-text-detail-box">
                                    <div className="property-flat-detail-row">
                                        <span className="property-flat-bhk-info">{item.configuration}</span>
                                        <span className="property-flat-price-info">
                                            {formatPrice(item.price)}
                                        </span>
                                    </div>
                                    <div className="property-project-subtext-row">
                                        <span className="property-project-name-text">{item.property_name}</span>
                                        <span className="property-size-square-text">{item.area_detail}</span>
                                    </div>
                                    <div className="property-location-row">
                                        <span className="property-address-text">{item.address}</span>
                                    </div>
                                    <div className="property-status-row">
                                        <span className="property-status-text">{item.construction_status}</span>
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
                    slidesPerView={1.2}
                    navigation={true}
                    className="property-swiper"
                    style={{
                        "--swiper-navigation-color": "#e23e57",
                        "--swiper-navigation-size": "25px"
                    }}
                >
                    {properties.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="property-card-wrapper-box" onClick={() => {
                                handleNavigate(`https://townmanor.ai/newownerpage/${item.id}`)
                            }}>
                                <div className="property-card-image-frame">
                                    <img
                                        src={item.image_repository ? item.image_repository.split(',')[0].trim() : "/commercial.jpg"}
                                        alt={item.property_name}
                                        className="property-image-thumbnail"
                                    />
                                </div>
                                <div className="property-card-text-detail-box">
                                    <div className="property-flat-detail-row">
                                        <span className="property-flat-bhk-info">{item.configuration}</span>
                                        <span className="property-flat-price-info">
                                            {formatPrice(item.price)}
                                        </span>
                                    </div>
                                    <div className="property-project-subtext-row">
                                        <span className="property-project-name-text">{item.property_name}</span>
                                        <span className="property-size-square-text">{item.area_detail}</span>
                                    </div>
                                    <div className="property-location-row">
                                        <span className="property-address-text">{item.address}</span>
                                    </div>
                                    <div className="property-status-row">
                                        <span className="property-status-text">{item.construction_status}</span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default AdminSuggestion