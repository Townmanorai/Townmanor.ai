import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PropertyList.css'; // Assuming you will style this using existing CSS logic

const PropertyList = () => {
    console.log('PropertyList);');
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch('http://localhost:3030/api/properties/admin');
      const data = await response.json();
      setProperties(data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };
  console.log('properties', properties);

  const handlePropertyClick = (property_name) => {
    navigate(`/property-details/${property_name}`);
  };

  return (
    <div className="property-list-container">
    {/* <h1>Property List</h1> */}
      {properties.length > 0 ? (
        properties.map((property) => (
          <div className="property-card" key={property.id}>
            <img
              src='./851x678godrej_tropical_isle1.jpg' // Assuming a default image
              alt={property.propertyname}
              onClick={() => handlePropertyClick(property.property_name)}
              className="property-image"
            />
            <div className="property-details">
              <h3 className="property-name">{property.property_name}</h3>
              <div className='listed-owner-agent'>
              <span>Agents Listed: {property.agentsCount}</span>
              <span>Owners Listed: {property.ownersCount}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No properties found</p>
      )}
    </div>
  );
};

export default PropertyList;
