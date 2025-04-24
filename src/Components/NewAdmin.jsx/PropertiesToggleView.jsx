import React, { useState, useRef, useEffect } from "react";
import { FaBed, FaRulerCombined, FaBath } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "./PropertiesToggleView.css";

const PropertiesToggleView = ({ propertyName }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('sale');
  const [activeBHK, setActiveBHK] = useState('all');

  useEffect(() => {
    fetchProperties();
  }, [propertyName, activeTab, activeBHK]);

  const fetchProperties = async () => {
    try {
      let url = `https://www.townmanor.ai/api/owner-property/filter/suggestion/name?property_name=${encodeURIComponent(propertyName)}&purpose=${activeTab}`;
      if (activeBHK !== 'all') {
        url += `&configuration=${activeBHK}BHK`;
      }
      
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      console.log('API Response:', data);
      
      const propertyArray = Array.isArray(data) ? data : [];
      setProperties(propertyArray);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setProperties([]);
      setLoading(false);
    }
  };

  const formatPrice = (price, pricerange) => {
    if (pricerange === 'Crore') {
      return `₹${price} Cr`;
    } else if (pricerange === 'Lakh') {
      return `₹${price} L`;
    }
    return `₹${price}`;
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleBHKChange = (bhk) => {
    setActiveBHK(bhk);
  };

  const renderFilters = () => (
    <div className="propertyToggleUnique__filters">
      <div className="propertyToggleUnique__tabs">
        <button 
          className={activeTab === 'sale' ? 'active' : ''} 
          onClick={() => handleTabChange('sale')}
        >
          Sale
        </button>
        <button 
          className={activeTab === 'rent' ? 'active' : ''} 
          onClick={() => handleTabChange('rent')}
        >
          Rent
        </button>
      </div>

      <div className="propertyToggleUnique__bhkFilters">
        <button 
          className={activeBHK === 'all' ? 'active' : ''} 
          onClick={() => handleBHKChange('all')}
        >
          All BHK
        </button>
        {[2, 3, 4].map((bhk) => (
          <button 
            key={bhk}
            className={activeBHK === bhk.toString() ? 'active' : ''} 
            onClick={() => handleBHKChange(bhk.toString())}
          >
            {bhk} BHK
          </button>
        ))}
      </div>
    </div>
  );

  const renderMainContent = () => {
    if (loading) {
      return (
        <div className="propertyToggleUnique__loading">
          <h2>Loading Properties...</h2>
        </div>
      );
    }

    if (!Array.isArray(properties) || properties.length === 0) {
      return (
        <div className="propertyToggleUnique__noData">
          <h2>No {activeTab === 'sale' ? 'Resale' : 'Rental'} Properties Available</h2>
          <p>Connect with us to get more information</p>
        </div>
      );
    }

    // Regular grid view for mobile
    if (window.innerWidth < 768) {
      return (
        <div className="propertyToggleUnique__grid">
          {properties.map((property, idx) => (
            <div key={idx} className="propertyToggleUnique__card">
              <img 
                src={property.image_repository ? 
                  `https://www.townmanor.ai/uploads/${JSON.parse(property.image_repository)[0]}` : 
                  '/commercial.jpg'} 
                alt={property.property_name} 
                onError={(e) => e.target.src = '/commercial.jpg'}
              />
              <h4>{property.configuration} - {property.residential}</h4>
              <div className="propertyToggleUnique__infoRow">
                <span><FaRulerCombined /> {property.area_detail} sq.ft</span>
                <span><FaBed /> {property.configuration?.split('')[0] || 'N/A'} Beds</span>
                <span><FaBath /> {property.bathroom || 'N/A'} Baths</span>
              </div>
              <div className="propertyToggleUnique__location">
                <p>{property.address || 'Address not available'}</p>
              </div>
              <h5>{formatPrice(property.price, property.pricerange)}</h5>
              <p className="propertyToggleUnique__purpose">{(property.purpose || 'N/A').toUpperCase()}</p>
              <button className="propertyToggleUnique__contactBtn">Know More</button>
            </div>
          ))}
        </div>
      );
    }
    const handleNavigate = (url) => {
      window.location.href = url;  // Will navigate directly to the given URL
  };
    // Swiper view for desktop
    return (
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
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
        {properties.map((property, idx) => (
          <SwiperSlide key={idx}>
            <div className="propertyToggleUnique__card">
              <img 
                src={property.image_repository ? 
                  `https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/${JSON.parse(property.image_repository)[0]}` : 
                  '/commercial.jpg'} 
                alt={property.property_name} 
                onError={(e) => e.target.src = '/commercial.jpg'}
              />
              <h4>{property.configuration} - {property.residential}</h4>
              <div className="propertyToggleUnique__infoRow">
                <span><FaRulerCombined /> {property.area_detail} sq.ft</span>
                <span><FaBed /> {property.configuration?.split('')[0] || 'N/A'} Beds</span>
                <span><FaBath /> {property.bathroom || 'N/A'} Baths</span>
              </div>
              <div className="propertyToggleUnique__location">
                <p>{property.address || 'Address not available'}</p>
              </div>
              <h5>{formatPrice(property.price, property.pricerange)}</h5>
              {/* <p className="propertyToggleUnique__purpose">{(property.purpose || 'N/A').toUpperCase()}</p> */}
              <button className="propertyToggleUnique__contactBtn" onClick={()=>{
                handleNavigate(`https://townmanor.ai/newownerpage/${property.id}`);
              }}>Know More</button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    );
  };

  return (
    <div className="propertyToggleUnique__container">
      <h2 className="propertyToggleUnique__title">
        Available Properties {!loading && properties.length > 0 && `(${properties.length})`}
      </h2>
      {renderFilters()}
      <div className="propertyToggleUnique__content">
        <div className="propertyToggleUnique__main">
          {renderMainContent()}
        </div>
        <div className="propertyToggleUnique__imageRight">
          <img src="/rentagreement.png" alt="Property Agreement" onClick={()=>{
            handleNavigate('https://townmanor.ai/rentagreements')
          }}/>
        </div>
      </div>
    </div>
  );
};

export default PropertiesToggleView;
