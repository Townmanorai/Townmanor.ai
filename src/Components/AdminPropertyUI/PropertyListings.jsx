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
    city: 'Noida',
    category: '',
    construction_status: '',
    configuration: '',
    minPrice: 0, // Add minPrice
    maxPrice: 200, // Add maxPrice
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
  const parsePrice = (price) => {
    if (!price) return 0;

    // Remove currency symbol and commas
    price = price.replace(/[₹,]/g, '').trim();

    // Check if the price is in Crores or Lakhs
    if (price.includes('Cr')) {
      return parseFloat(price.replace('Cr', '')) * 100; // Convert Crores to Lakhs
    } else if (price.includes('Lac')) {
      return parseFloat(price.replace('Lac', '')); // Already in Lakhs
    }

    return 0; // Default value if parsing fails
  };
  const filteredProperties = properties.filter((item) => {
    const priceRange = item.price.split(' - '); // Split the price range
    const minItemPrice = parsePrice(priceRange[0]); // Parse the minimum price
    const maxItemPrice = parsePrice(priceRange[1] || priceRange[0]); // Parse the maximum price (if it exists)

    return (
      (filters.projectname
        ? item.property_name &&
        item.property_name.toLowerCase().includes(filters.projectname.toLowerCase())
        : true) &&
      (filters.city
        ? item.city && item.city.toLowerCase().includes(filters.city.toLowerCase())
        : true) &&
      (filters.category
        ? item.category &&
        item.category.toLowerCase().includes(filters.category.toLowerCase())
        : true) &&
      (filters.construction_status
        ? item.construction_status && item.construction_status.toLowerCase().includes(filters.construction_status.toLowerCase())
        : true) &&
      (filters.configuration
        ? item.configuration && item.configuration.toLowerCase().includes(filters.configuration.toLowerCase())
        : true) &&
      (filters.minPrice
        ? minItemPrice >= filters.minPrice
        : true) &&
      (filters.maxPrice
        ? maxItemPrice <= filters.maxPrice
        : true)
    );
  });


  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };
  // Get current properties to display on the page
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
  console.log(currentProperties)
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
  const cleanPrice = (price) => {
    // Check if it's a range (e.g., "44.80 Lac - 54.00 Lac")
    if (price.includes(" - ")) {
      const [minPrice, maxPrice] = price.split(" - ");
      return `${minPrice.replace("â‚¹", "₹")} - ${maxPrice.replace("â‚¹", "₹")}`;
    }

    // If it's a single price, just clean it up
    return price.replace("â‚¹", "₹");
  };
  const clearFilters = () => {
    setFilters({
      projectname: '',
      city: 'Noida',
      category: '',
      construction_status: '',
      configuration: '',
      minPrice: 0,
      maxPrice: 200,
    });
  };
 
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
          <h1 className="realty-title">Find <b>Your</b> Perfect <b>Home</b></h1>
          <p className="realty-subtitle">Discover thousands of properties that match your preferences</p>
          <div className="realty-search-bar">
            <div className="realty-input-group">
              <FaMapMarkerAlt className="realty-icon" />
              <select
                className="realty-input"
                name="city"
                onChange={handleFilterChange}
                value={filters.city}
              >
                <option value="Noida">Noida</option>
                <option value="Delhi">Delhi</option>
                <option value="Gurgaon">Gurgaon</option>
                <option value="Faridabad">Faridabad</option>
                <option value="chandigarh">Chandigarh</option>
                <option value="Jaipur">Jaipur</option>
                <option value="Lucknow">Lucknow</option>
                <option value="Sonipat">Sonipat</option>
                <option value="Dehradun">Dehradun</option>
                <option value="Patna">Patna</option>
                <option value="Indore">Indore</option>
                <option value="Agra">Agra</option>
                <option value="Varanasi">Varanasi</option>
                <option value="Guwahati">Guwahati</option>
                <option value="Ahmedabad">Ahmedabad</option>
                <option value="Lucknow">Lucknow</option>
                <option value="Goa">Goa</option>
              </select>
            </div>
            <div className="realty-input-group">
              <FaHome className="realty-icon" />
              {/* <select
                className="realty-input"
                name="category"
                onChange={handleFilterChange}
                value={filters.category}
              >
                <option value="">Select Project</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
              </select> */}
              <input
                className="realty-input"
                name="projectname"
                onChange={handleFilterChange}
                value={filters.projectname}
                type="text"
                placeholder="Search Project"
              ></input>

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
                <button
                  className={`realty-filter-btn ${filters.construction_status === "Under Construction" ? "activecategory" : ""}`}
                  onClick={() => handleFilterChange({ target: { name: "construction_status", value: "Under Construction" } })}
                >
                  Under Construction
                </button>
                <button
                  className={`realty-filter-btn ${filters.construction_status === "Ready To Move" ? "activecategory" : ""}`}
                  onClick={() => handleFilterChange({ target: { name: "construction_status", value: "Ready To Move" } })}
                >
                  Ready To Move
                </button>
              </div>
            </div>
            <div className="realty-filter-section">
              <h3>Project Type</h3>
              <div className="realty-filter-options">
                <button
                  className={`realty-filter-btn ${filters.category === "Residential" ? "activecategory" : ""}`}
                  onClick={() => handleFilterChange({ target: { name: "category", value: "Residential" } })}
                >
                  Residential
                </button>
                <button
                  className={`realty-filter-btn ${filters.category === "Commercial" ? "activecategory" : ""}`}
                  onClick={() => handleFilterChange({ target: { name: "category", value: "Commercial" } })}
                >
                  Commercial
                </button>
              </div>
            </div>
            <div className="realty-filter-section">
              <h3>Configuration</h3>
              <div className="realty-filter-options">
                <button
                  className={`realty-filter-btn ${filters.configuration === "1 BHK" ? "activecategory" : ""}`}
                  onClick={() => handleFilterChange({ target: { name: "configuration", value: "1 BHK" } })}
                >
                  1 BHK
                </button>
                <button
                  className={`realty-filter-btn ${filters.configuration === "2 BHK" ? "activecategory" : ""}`}
                  onClick={() => handleFilterChange({ target: { name: "configuration", value: "2 BHK" } })}
                >
                  2 BHK
                </button>
                <button
                  className={`realty-filter-btn ${filters.configuration === "3 BHK" ? "activecategory" : ""}`}
                  onClick={() => handleFilterChange({ target: { name: "configuration", value: "3 BHK" } })}
                >
                  3 BHK
                </button>
                <button
                  className={`realty-filter-btn ${filters.configuration === "4 BHK" ? "activecategory" : ""}`}
                  onClick={() => handleFilterChange({ target: { name: "configuration", value: "4 BHK" } })}
                >
                  4 BHK
                </button>
                <button
                  className="realty-filter-btn"
                  onClick={() => handleFilterChange({ target: { name: "configuration", value: "" } })}
                >
                  Clear
                </button>
              </div>
            </div>
            {/* <div className="realty-filter-section">

              <label for="customRange1" class="form-label">Price filter</label>
              <input type="range" class="form-range" id="customRange1" />
            </div> */}
            <div className="realty-filter-section">
              <h3>Price Range</h3>
              <div className="realty-filter-options">
                <input
                  type="range"
                  min={0}
                  max={1000} // Adjust max value based on your data
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters((prevFilters) => ({
                      ...prevFilters,
                      maxPrice: parseInt(e.target.value),
                    }))
                  }
                  style={{
                    width: '230px'
                  }}
                />
                <span>Up to ₹ {filters.maxPrice} Lakh</span>
              </div>
            </div>
            
            <div className="realty-filter-section">
              <h3>Clear Filter</h3>
              <button className="btn btn-secondary" onClick={clearFilters}>remove filter</button>
            </div>
          </div>

        </aside>

        {/* Listings */}
        <section className="realty-listings">
          {/* <h2 className="realty-listings-title">Featured Properties</h2> */}
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
                        onError={(e) => {
                          e.target.src = "/default.jpg"; // Fallback if the image fails to load
                        }}
                      />
                    ) : (
                      <img
                        src="/ae.jpeg"
                        className="realty-img"
                        alt="Default property"
                      />
                    )}
                    <FaHeart className="realty-favorite-icon" style={{
                      color: 'grey',
                      outline: 'red'
                    }} />
                  </div>
                  <div className="realty-details">
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}><h3 className="realty-name">{property.property_name}</h3>
                      <p className="realty-price">{cleanPrice(property.price)}</p></div>

                    <p className="realty-location">
                      <FaMapMarkerAlt className="realty-location-icon" color="black" size={20} /> {property.city}
                    </p>
                    <div className="realty-features" >
                      <span><GrStatusInfo color="grey" size={10} /><span style={{
                        color: 'black',
                        margin: '2px 4px'
                      }}>Rera Id</span>{property.rera_id} </span>
                      <span><FaRulerCombined color="grey" /><span style={{
                        color: 'black',
                        margin: '2px 4px'
                      }}>Area</span>{property.area_detail}</span>
                    </div>
                    <div className="realty-features">
                      <span><GrStatusGood color="grey" /><span style={{
                        color: 'black',
                        margin: '2px 4px'
                      }}>Status</span>{property.construction_status} </span>

                      <span><IoBedOutline color="grey" /><span style={{
                        color: 'black',
                        margin: '2px 4px'
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
