


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick'; // Import the slider
import './PropertyList.css'; // Your CSS file for styling

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch('https://www.townmanor.ai/api/api/properties/admin');
      const data = await response.json();
      // Check if the data is an array and log it
      if (Array.isArray(data)) {
        console.log("Fetched data:", data);
        const sortedData = data.sort((a, b) => {
          const nameA = a.property_name ? a.property_name : '';
          const nameB = b.property_name ? b.property_name : '';
          return nameA.localeCompare(nameB);
        });
        // Limit to first 10 properties
        const limitedData = sortedData.slice(0, 10);
        
        setProperties(limitedData);
        console.log("Sorted and limited data:", limitedData);
      } else {
        console.error('Fetched data is not an array:', data);
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const handlePropertyClick = (property_name) => {
    navigate(`/propertyOA`);
  };

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Change to 1 or 2 if you want fewer visible
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <div className="property-list-container">
      {properties.length > 0 ? (
        <Slider {...sliderSettings}>
          {properties.map((property) => (
            <div className="property-card"  key={property.property_name} onClick={() => handlePropertyClick(property.property_name)}>
              <img
                src={property.one_image_location ? `https://townmanor.in/files/${property.one_image_location}` : 'https://townmanor.in/files/3cb1_1.jpg'}
                alt={property.property_name}
                className="property-image"
                style={{ height: '100px' }} 
              />
              <div className="property-detail">
                <h3 className="property-name">{property.property_name}</h3>
                <div className='listed-owner-agent'>
                  <span>Agents Listed: {property.agentsCount}</span>
                  <span>Owners Listed: {property.ownersCount}</span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <p>No properties found</p>
      )}
    </div>
  );
};

export default PropertyList;
