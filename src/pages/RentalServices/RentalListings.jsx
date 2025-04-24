import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/RentalListings.css'; // We'll create this CSS file next

const RentalListings = () => {
  const propertyListings = [
    {
      id: 1,
      name: "Opulent Cityscape, Koramangala",
      image: "/assets/properties/property1.jpg",
      bedrooms: 3,
      bathrooms: 3,
      area: 3000,
      floor: "6th Floor",
      price: 37000,
      available: true
    },
    {
      id: 2,
      name: "Rainbow, Mahadevapura",
      image: "/assets/properties/property2.jpg",
      bedrooms: 3,
      bathrooms: 2,
      area: 1250,
      floor: "11th Floor",
      price: 33000,
      available: true
    },
    {
      id: 3,
      name: "Echo, Hebbal",
      image: "/assets/properties/property3.jpg",
      bedrooms: 4,
      bathrooms: 3,
      area: 2500,
      floor: "1st Floor",
      price: 27000,
      available: true
    },
    {
      id: 4,
      name: "East Heights, CV Raman Nagar",
      image: "/assets/properties/property4.jpg",
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      floor: "5th Floor",
      price: 31000,
      available: true,
      femaleOnly: true
    },
    {
      id: 5,
      name: "Lifestyle Hub, Whitefield",
      image: "/assets/properties/property5.jpg",
      bedrooms: 3,
      bathrooms: 2,
      area: 1500,
      floor: "3rd Floor",
      price: 21000,
      available: true
    },
    {
      id: 6,
      name: "Aerohome, Sarjapur Road",
      image: "/assets/properties/property6.jpg",
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      floor: "1st Floor",
      price: 25000,
      available: true
    }
  ];

  return (
    <div className="rental-listings-container">
      {/* <header className="rental-header">
        <div className="logo-container">
          <Link to="/">
            <img src="/logo_final.png" alt="Townmanor Logo" className="logo" />
          </Link>
        </div>
        <nav className="nav-links">
          <Link to="/homes" className="nav-link">Homes</Link>
          <Link to="/landlords" className="nav-link">For Landlords</Link>
          <Link to="/about" className="nav-link">About Us</Link>
          <Link to="/reserve" className="nav-button">Reserve</Link>
        </nav>
      </header> */}

      <section className="listings-section">
        <h1 className="section-title">Luxury Sample Residences</h1>
        
        <div className="property-grid">
          {propertyListings.map((property) => (
            <div key={property.id} className="property-card">
              <div className="property-image-container">
                {property.femaleOnly && (
                  <div className="female-only-tag">FEMALE ONLY</div>
                )}
                <img 
                  src={property.image} 
                  alt={property.name} 
                  className="property-image" 
                />
              </div>
              <div className="property-details">
                <h2 className="property-name">{property.name}</h2>
                <div className="property-specs">
                  <div className="spec-item">
                    <span className="spec-icon">🛏️</span>
                    <span>{property.bedrooms} BHK Apartment</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-icon">📏</span>
                    <span>{property.area} ft²</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-icon">🏢</span>
                    <span>{property.floor}</span>
                  </div>
                </div>
                <div className="property-price">
                  <div className="price-label">Rooms from</div>
                  <div className="price-amount">₹{property.price}/mo</div>
                  <div className="availability-status">
                    {property.available ? "Available" : "Not Available"}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="see-all-container">
          <Link to="/properties" className="see-all-button">See All Homes</Link>
        </div>
      </section>
    </div>
  );
};

export default RentalListings; 