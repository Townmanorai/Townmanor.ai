import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/RentalListings.css';

const RentalListings = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const propertyListings = [
    {
      id: 1,
      name: "Skyline Apartments",
      image: "https://readdy.ai/api/search-image?query=A%20luxurious%20modern%20apartment%20interior%20with%20open%20floor%20plan%2C%20featuring%20sleek%20kitchen%20with%20marble%20countertops%2C%20elegant%20living%20space%20with%20contemporary%20furniture%2C%20large%20windows%20with%20city%20views%2C%20hardwood%20floors%2C%20and%20stylish%20lighting%20fixtures.%20Clean%2C%20minimalist%20design%20with%20neutral%20color%20palette&width=400&height=300&seq=2&orientation=landscape",
      location: "Downtown, Bangalore",
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      floor: "6th Floor",
      price: 25000,
      available: true,
      type: "co-living",
      featured: true
    },
    {
      id: 2,
      name: "Parkview Residence",
      image: "https://readdy.ai/api/search-image?query=A%20modern%20luxury%20house%20exterior%20with%20clean%20architectural%20lines%2C%20large%20windows%2C%20manicured%20garden%2C%20and%20stylish%20entrance.%20Contemporary%20design%20with%20a%20combination%20of%20materials%20like%20wood%2C%20glass%2C%20and%20stone.%20Beautiful%20landscaping%20with%20ambient%20outdoor%20lighting.%20Elegant%20residential%20property%20in%20an%20upscale%20neighborhood&width=400&height=300&seq=3&orientation=landscape",
      location: "Beverly Hills, Bangalore",
      bedrooms: 4,
      bathrooms: 3,
      area: 2800,
      floor: "11th Floor",
      price: 58000,
      available: true,
      type: "suites"
    },
    {
      id: 3,
      name: "Oceanfront Villa",
      image: "https://readdy.ai/api/search-image?query=A%20luxurious%20villa%20with%20Mediterranean%20architecture%2C%20featuring%20a%20stunning%20infinity%20pool%20overlooking%20scenic%20views%2C%20elegant%20outdoor%20lounging%20areas%2C%20palm%20trees%2C%20and%20lush%20landscaping.%20Terracotta%20roof%20tiles%2C%20white%20stucco%20walls%2C%20and%20large%20arched%20windows.%20Upscale%20vacation%20property%20with%20perfect%20sunset%20ambiance&width=400&height=300&seq=4&orientation=landscape",
      location: "Malibu, Bangalore",
      bedrooms: 5,
      bathrooms: 4,
      area: 4500,
      floor: "1st Floor",
      price: 120000,
      available: true,
      type: "suites",
      new: true
    },
    {
      id: 4,
      name: "Sky Penthouse",
      image: "https://readdy.ai/api/search-image?query=A%20modern%20penthouse%20apartment%20with%20floor-to-ceiling%20windows%2C%20contemporary%20design%2C%20featuring%20an%20open%20concept%20living%20area%2C%20designer%20furniture%2C%20high-end%20finishes%2C%20and%20spectacular%20city%20skyline%20views.%20Luxurious%20urban%20living%20space%20with%20sophisticated%20ambiance&width=400&height=300&seq=8&orientation=landscape",
      location: "Manhattan, Bangalore",
      bedrooms: 3,
      bathrooms: 2.5,
      area: 2000,
      floor: "Penthouse",
      price: 85000,
      available: true,
      type: "suites",
      premium: true
    },
    {
      id: 5,
      name: "Artist Loft",
      image: "https://readdy.ai/api/search-image?query=A%20contemporary%20loft%20apartment%20with%20exposed%20brick%20walls%2C%20industrial%20design%20elements%2C%20high%20ceilings%2C%20modern%20kitchen%2C%20metal%20fixtures%2C%20and%20large%20factory%20windows.%20Urban%20industrial%20chic%20with%20artistic%20flair%20and%20modern%20amenities&width=400&height=300&seq=9&orientation=landscape",
      location: "Brooklyn, Bangalore",
      bedrooms: 1,
      bathrooms: 1,
      area: 1000,
      floor: "3rd Floor",
      price: 32000,
      available: true,
      type: "pg"
    },
    {
      id: 6,
      name: "Historic Townhouse",
      image: "https://readdy.ai/api/search-image?query=A%20modern%20townhouse%20with%20elegant%20brownstone%20facade%2C%20featuring%20classic%20architectural%20details%2C%20renovated%20interiors%2C%20private%20garden%2C%20and%20contemporary%20amenities.%20Urban%20sophistication%20meets%20historic%20charm%20in%20prime%20city%20location&width=400&height=300&seq=10&orientation=landscape",
      location: "Boston, Bangalore",
      bedrooms: 4,
      bathrooms: 3.5,
      area: 3200,
      floor: "Ground Floor",
      price: 78000,
      available: true,
      type: "suites",
      historic: true
    },
    {
      id: 7,
      name: "Oceanview Condo",
      image: "https://readdy.ai/api/search-image?query=A%20luxury%20beachfront%20condo%20with%20panoramic%20ocean%20views%2C%20modern%20coastal%20interior%20design%2C%20spacious%20balcony%2C%20high-end%20appliances%2C%20and%20resort-style%20amenities.%20Contemporary%20beach%20living%20with%20sophisticated%20style&width=400&height=300&seq=11&orientation=landscape",
      location: "Miami Beach, Bangalore",
      bedrooms: 2,
      bathrooms: 2,
      area: 1500,
      floor: "15th Floor",
      price: 49000,
      available: true,
      type: "co-living",
      waterfront: true
    },
    {
      id: 8,
      name: "Mountain Lodge",
      image: "https://readdy.ai/api/search-image?query=A%20modern%20mountain%20retreat%20with%20floor-to-ceiling%20windows%2C%20rustic-modern%20design%2C%20stone%20fireplace%2C%20exposed%20wooden%20beams%2C%20and%20panoramic%20mountain%20views.%20Luxury%20alpine%20living%20with%20contemporary%20comfort&width=400&height=300&seq=12&orientation=landscape",
      location: "Aspen, Bangalore",
      bedrooms: 3,
      bathrooms: 2,
      area: 2200,
      floor: "2nd Floor",
      price: 65000,
      available: true,
      type: "pg",
      mountainView: true
    }
  ];

  const filteredProperties = activeFilter === "all" 
    ? propertyListings 
    : propertyListings.filter(property => property.type === activeFilter);

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "IT Professional, Noida",
      image: "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20an%20Indian%20woman%20in%20business%20attire%20with%20a%20confident%20smile,%20modern%20office%20background,%20professional%20lighting&width=100&height=100&seq=5&orientation=squarish",
      rating: 5,
      quote: "Townmanor has completely transformed my living experience in Noida. The co-living space is impeccably maintained, and the community feel makes it perfect for professionals like me. The location near Sector 62 tech hub saves me hours of commuting every week!"
    },
    {
      id: 2,
      name: "Rahul Mehta",
      role: "Startup Founder, Gurugram",
      image: "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20an%20Indian%20man%20in%20his%2030s%20with%20short%20dark%20hair%20wearing%20a%20business%20casual%20outfit,%20neutral%20background,%20studio%20lighting&width=100&height=100&seq=6&orientation=squarish",
      rating: 4.5,
      quote: "As an entrepreneur who travels frequently between Gurugram and Bangalore, Townmanor's flexible leasing options and premium amenities are exactly what I needed. Their Cyber City location is perfect for meetings, and the high-speed internet makes remote work seamless."
    },
    {
      id: 3,
      name: "Aditya & Neha Patel",
      role: "Young Professionals, Noida",
      image: "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20young%20Indian%20couple%20smiling%20at%20camera,%20both%20wearing%20smart%20casual%20attire,%20clean%20background,%20warm%20lighting&width=100&height=100&seq=7&orientation=squarish",
      rating: 5,
      quote: "When we relocated to Noida for work, finding quality accommodation was our biggest challenge. Townmanor exceeded our expectations with their beautifully designed suites in Sector 18 and responsive management team. Their PG option was perfect for our initial transition to the city."
    }
  ];

  return (
    <div className="rental-page-container">
      {/* Header with Townmanor branding */}
      <header className="rental-header">
        <div className="logo-container">
          <Link to="/">
            <div className="rental-townmanor-logo">
              <h1>Townmanor</h1>
            </div>
          </Link>
        </div>
        <nav className="rental-nav-links">
          <Link to="/homes" className="rental-nav-link">Homes</Link>
          <Link to="/landlords" className="rental-nav-link">For Landlords</Link>
          <Link to="/about" className="rental-nav-link">About Us</Link>
          <Link to="/reserve" className="rental-nav-link">Reserve</Link>
          <Link to="/careers" className="rental-nav-link">Careers</Link>
          <Link to="/contact" className="rental-nav-link">Contact Us</Link>
          <Link to="/signin" className="rental-nav-link">Sign In</Link>
          <Link to="/register" className="rental-nav-button">Register</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="rental-hero-section">
        <div className="rental-hero-content">
          <h1>We Are Coming Soon!</h1>
          <p>Experience a new way of living with our premium co-living spaces, designed for comfort and convenience in prime locations near major hubs. Enjoy fully furnished rooms with modern interiors, high-speed WiFi, and regular housekeeping services.</p>
          <Link to="/reserve" className="rental-hero-button">Reserve Now</Link>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="rental-listings-section">
        <div className="rental-section-header">
          <h2 className="rental-section-title">Featured Properties</h2>
          <p className="rental-section-description">Discover our handpicked selection of premium properties available for rental.</p>
        </div>
        
        <div className="rental-filter-buttons">
          <button 
            onClick={() => handleFilterChange("all")} 
            className={`rental-filter-button ${activeFilter === "all" ? "active" : ""}`}
          >
            All Properties
          </button>
          <button 
            onClick={() => handleFilterChange("co-living")} 
            className={`rental-filter-button ${activeFilter === "co-living" ? "active" : ""}`}
          >
            Town Co-Living
          </button>
          <button 
            onClick={() => handleFilterChange("pg")} 
            className={`rental-filter-button ${activeFilter === "pg" ? "active" : ""}`}
          >
            Town PG
          </button>
          <button 
            onClick={() => handleFilterChange("suites")} 
            className={`rental-filter-button ${activeFilter === "suites" ? "active" : ""}`}
          >
            Town Suites
          </button>
        </div>
        
        <div className="rental-property-grid">
          {filteredProperties.map((property) => (
            <div key={property.id} className="rental-property-card">
              <div className="rental-property-image-container">
                {property.femaleOnly && (
                  <div className="rental-female-only-tag">FEMALE ONLY</div>
                )}
                {property.featured && (
                  <div className="rental-featured-tag">Featured</div>
                )}
                {property.new && (
                  <div className="rental-new-tag">New</div>
                )}
                {property.premium && (
                  <div className="rental-featured-tag" style={{background: 'linear-gradient(to right, #ff4447, #8a2e2e)'}}>Premium</div>
                )}
                {property.historic && (
                  <div className="rental-featured-tag" style={{background: 'linear-gradient(to right, #ff4447, #8a2e2e)'}}>Historic</div>
                )}
                {property.waterfront && (
                  <div className="rental-featured-tag" style={{background: 'linear-gradient(to right, #ff4447, #8a2e2e)'}}>Waterfront</div>
                )}
                {property.mountainView && (
                  <div className="rental-new-tag">Mountain View</div>
                )}
                <Link to={`/rental-property/${property.id}`}>
                  <img 
                    src={property.image} 
                    alt={property.name} 
                    className="rental-property-image" 
                  />
                </Link>
              </div>
              <Link to={`/rental-property/${property.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="rental-property-details">
                  <h2 className="rental-property-name">{property.name}</h2>
                  <div className="rental-property-location">
                    <i className="rental-location-icon"></i>
                    <span>{property.location}</span>
                  </div>
                  <div className="rental-property-specs">
                    <div className="rental-spec-item">
                      <span className="rental-spec-icon">🛏️</span>
                      <span>{property.bedrooms} Beds</span>
                    </div>
                    <div className="rental-spec-item">
                      <span className="rental-spec-icon">🚿</span>
                      <span>{property.bathrooms} Baths</span>
                    </div>
                    <div className="rental-spec-item">
                      <span className="rental-spec-icon">📏</span>
                      <span>{property.area} sqft</span>
                    </div>
                  </div>
                  <div className="rental-property-price-row">
                    <div className="rental-price-amount">₹{property.price}/month</div>
                    <button className="rental-reserve-button">Reserve Now</button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="rental-view-all-container">
          <Link to="/properties" className="rental-view-all-button">View All Properties</Link>
        </div>
      </section>

      {/* USP Section */}
      <section className="rental-usp-section">
        <div className="rental-section-header">
          <h2 className="rental-section-title">What Makes Us Different</h2>
          <p className="rental-section-description">Experience the Townmanor advantage with our innovative approach to modern living.</p>
        </div>
        
        <div className="rental-usp-container">
          <div className="rental-usp-card">
            <div className="rental-usp-icon-container">
              <span className="rental-usp-icon">🏠</span>
            </div>
            <h3>Premium Properties</h3>
            <p>Handpicked, high-quality homes in prime locations that meet our strict standards for comfort and style.</p>
          </div>
          
          <div className="rental-usp-card">
            <div className="rental-usp-icon-container">
              <span className="rental-usp-icon">⚡</span>
            </div>
            <h3>Flexible Terms</h3>
            <p>No long-term commitments. Enjoy the freedom to stay as long as you want with our month-to-month options.</p>
          </div>
          
          <div className="rental-usp-card">
            <div className="rental-usp-icon-container">
              <span className="rental-usp-icon">🛎️</span>
            </div>
            <h3>Concierge Service</h3>
            <p>Our dedicated team is available 24/7 to assist with any requests or issues that may arise during your stay.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="rental-testimonials-section">
        <div className="rental-section-header">
          <h2 className="rental-section-title">What Our Clients Say</h2>
          <p className="rental-section-description">Hear from people who have experienced the Townmanor difference.</p>
        </div>
        
        <div className="rental-testimonials-container">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="rental-testimonial-card">
              <div className="rental-testimonial-header">
                {/* <div className="rental-testimonial-image-container">
                  <img src={testimonial.image} alt={testimonial.name} className="rental-testimonial-image" />
                </div> */}
                <div className="rental-testimonial-person">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>
              <div className="rental-testimonial-rating">
                {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                  <span key={i} className="star-icon">★</span>
                ))}
                {testimonial.rating % 1 === 0.5 && <span className="star-icon">½</span>}
              </div>
              <p className="rental-testimonial-quote">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="rental-cta-section">
        <h2>Ready to Start Living with Townmanor?</h2>
        <p>Reserve now to unlock priority access to our exclusive properties. Pay a fully refundable booking fee to secure your spot.</p>
        <Link to="/reserve" className="rental-cta-button">Reserve to Unlock Priority Access</Link>
      </section>

      {/* Footer */}
      
    </div>
  );
};

export default RentalListings; 