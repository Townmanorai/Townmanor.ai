import React from "react";
import { FaEye } from "react-icons/fa";
import "./PropertySuggestionSectionStyles.css";

const PropertySuggestionSection = ({ property }) => {
  // For now, we'll return null since the API doesn't provide similar properties
  // This can be updated when the API provides similar properties data
  return null;

  /* Keeping the code for reference when API support is added
  if (!property || !property.similar_properties) return null;

  const similarProperties = property.similar_properties;

  return (
    <div className="property-suggestion-section-wrapper">
      <h3 className="property-suggestion-heading-text">
        People who viewed this property also liked
      </h3>
      <div className="property-card-list-container">
        {similarProperties.map((item, index) => (
          <div className="property-card-wrapper-box" key={index}>
            <div className="property-card-image-frame">
              <img
                src={item.image_repository ? `https://www.townmanor.ai/uploads/${JSON.parse(item.image_repository)[0]}` : "/commercial.jpg"}
                alt={item.property_name}
                className="property-image-thumbnail"
              />
              <div className="property-view-badge-overlay">
                <FaEye className="property-icon-eye-shape" />
                <span className="property-percentage-text-info">{item.views || 0}</span>
              </div>
            </div>
            <div className="property-card-text-detail-box">
              <div className="property-flat-detail-row">
                <span className="property-flat-bhk-info">{item.configuration}</span>
                <span className="property-flat-price-info">₹{item.price}</span>
              </div>
              <div className="property-project-subtext-row">
                <span className="property-project-name-text">{item.property_name}</span>
                <span className="property-size-square-text">{item.area_detail} sqft</span>
              </div>
              <div className="property-location-area-name">{item.locality}, {item.city}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  */
};

export default PropertySuggestionSection;
