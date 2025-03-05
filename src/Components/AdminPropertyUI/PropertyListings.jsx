import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaMapMarkerAlt, FaHome, FaBed, FaRulerCombined, FaHeart } from "react-icons/fa";
import "./PropertyListings.css";
import { GrStatusGood, GrStatusInfo } from "react-icons/gr";
import { IoBedOutline } from "react-icons/io5";

const PropertyListings = () => {
  const [properties, setProperties] = useState([]); // Store all properties from API
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [propertiesPerPage] = useState(21); // Number of properties per page
  const [loading, setLoading] = useState(true); // Loading state
  const [filters, setFilters] = useState({
    projectname: '',
    city: '',
    category: '',
    propertytype: ''
  });
  const filteredProperties = properties.filter((item) => {
    return (
      (filters.projectname ? item.property_name.toLowerCase().includes(filters.projectname.toLowerCase()) : true) &&
      (filters.city ? item.city.toLowerCase().includes(filters.city.toLowerCase()) : true) &&
      (filters.category ? item.category.toLowerCase().includes(filters.category.toLowerCase()) : true) &&
      (filters.propertytype ? item.area_type.toLowerCase().includes(filters.propertytype.toLowerCase()) : true)
    );
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  // Fetch all properties from API
  const fetchProperties = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://www.townmanor.ai/api/property");
      setProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get current properties to display on the page
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(properties.length / propertiesPerPage);
  const cleanPrice = (price) => {
    // Check if it's a range (e.g., "44.80 Lac - 54.00 Lac")
    if (price.includes(" - ")) {
      const [minPrice, maxPrice] = price.split(" - ");
      return `${minPrice.replace("â‚¹", "₹")} - ${maxPrice.replace("â‚¹", "₹")}`;
    }

    // If it's a single price, just clean it up
    return price.replace("â‚¹", "₹");
  };
  console.log(properties)
  return (
    <div className="realty-container">
      {/* Header Section */}
      <header className="realty-header">
        <div className="realty-banner">
          <img
            src="/propback3.jpg"
            alt="Luxury Home"
            className="realty-banner-img"
          />
          <div className="realty-overlay"></div>
        </div>
        <div className="realty-header-content">
          <h1 className="realty-title">Find Your Perfect Home</h1>
          <p className="realty-subtitle">Discover thousands of properties that match your preferences</p>
          <div className="realty-search-bar">
            <div className="realty-input-group">
              <FaMapMarkerAlt className="realty-icon" />
              <select className="realty-input">
                <option>Noida</option>
                <option>Delhi</option>
                <option>Gurgoan</option>
                <option>Faridabad</option>
              </select>
            </div>
            <div className="realty-input-group">
              <FaHome className="realty-icon" />
              <select className="realty-input">
                <option>Residential</option>
                <option>Commercial</option>
               
              </select>
            </div>
            <div className="realty-search-btn">Search Properties</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="realty-main">
        <aside className="realty-filters">
          <div className="realty-filters-box">
            <h2 className="realty-filters-title">Filters</h2>
            <div className="realty-filter-section">
              <h3>Construction Status</h3>
              <div className="realty-filter-options">
                <span className="realty-filter-btn">Under Construction</span>
                <span className="realty-filter-btn">Ready To Move</span>
                
              </div>
            </div>
            <div className="realty-filter-section">
              <h3>Property Type</h3>
              <div className="realty-filter-options">
                <span className="realty-filter-btn">Residential</span>
                <span className="realty-filter-btn">Commercial</span>
               
              </div>
            </div>
            <div className="realty-filter-section">
              <h3>Configuration</h3>
              <div className="realty-filter-options">
                <span className="realty-filter-btn">1 BHK </span>
                <span className="realty-filter-btn">2 BHK</span>
                <span className="realty-filter-btn">3 BHK </span>
                <span className="realty-filter-btn">4 BHK</span>
              </div>
            </div>
            <div className="realty-filter-section">
              
              <label for="customRange1" class="form-label">Price filter</label>
              <input type="range" class="form-range" id="customRange1" />
            </div>
          </div>
          
        </aside>

        {/* Listings */}
        <section className="realty-listings">
          <h2 className="realty-listings-title">Featured Properties</h2>
          <div className="realty-grid">
            {loading ? (
              <p>Loading properties...</p>
            ) : currentProperties.length > 0 ? (
              currentProperties.map((property) => (
                <div key={property.id} className="realty-card">
                  <div className="realty-img-container">
                    {/* <img
                      src={property.image || "https://via.placeholder.com/400"}
                      alt={property.property_name}
                      className="realty-img"
                    /> */}
                      {property.image_repository && property.image_repository.length > 0 ? (
  <img 
    src={property.image_repository.split(',')[0].trim()}  // Get the first image URL
    className="realty-img"
    alt={property.property_name} 
  />
) : (
  <img 
    src="/default-image.jpg" 
    className="realty-img"
    alt="Default property" 
  />
)}
                    <FaHeart className="realty-favorite-icon" style={{
                        color:'grey',
                        outline:'red'
                    }} />
                  </div>
                  <div className="realty-details">
                    <div style={{
                        display:'flex',
                        justifyContent:'space-between'
                    }}><h3 className="realty-name">{property.property_name}</h3>
                    <p className="realty-price">{cleanPrice(property.price)}</p></div>
                    
                    <p className="realty-location">
                      <FaMapMarkerAlt className="realty-location-icon" color="black"/> {property.city}
                    </p>
                    <div className="realty-features">
                      <span><GrStatusInfo color="grey" /><span style={{
                        color:'black',
                        margin:'2px 4px'
                      }}>Rera Id</span>{property.rera_id} </span>
                      <span><FaRulerCombined color="grey" /><span style={{
                        color:'black',
                        margin:'2px 4px'
                      }}>Area</span>{property.area_detail}</span>
                    </div>
                    <div className="realty-features">
                      <span><GrStatusGood color="grey" /><span style={{
                        color:'black',
                        margin:'2px 4px'
                      }}>Status</span>{property.construction_status} </span>
                      
                      <span><IoBedOutline color="grey" /><span style={{
                        color:'black',
                        margin:'2px 4px'
                      }}>Configuration</span>{property.configuration}</span>
                      
                    </div>
                    <div className="realty-explore-btn">Explore More</div>
                  </div>
                </div>
              ))
            ) : (
              <p className="realty-no-data">No properties found.</p>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="realty-pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="realty-pagination-btn"
            >
              Prev
            </button>
            <span className="realty-page-info">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="realty-pagination-btn"
            >
              Next
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PropertyListings;
