import React, { useState, useEffect, useRef } from "react";
import {FaMapMarkerAlt, FaBed, FaMoneyBillWave, FaUserCircle, FaFilter, FaChevronLeft, FaChevronRight, FaSearch, FaTimes, FaChevronDown ,FaRedo } from "react-icons/fa";
import "./NewSearchListingPage.css";
import { MdVerified } from "react-icons/md";
import { IoConstruct } from "react-icons/io5";
import { BiArea } from "react-icons/bi";
import { LuIndianRupee } from "react-icons/lu";
import { PiPaintBrushHousehold } from "react-icons/pi";

import { useNavigate, useParams } from "react-router-dom";

const NewSearchListingPage = () => {
    const { city, configuration, purpose, buytype, price } = useParams();
 
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilter, setShowFilter] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCity, setSelectedCity] = useState(city || '');
    const [showCityDropdown, setShowCityDropdown] = useState(false);
    const propertiesPerPage = 8;
    const navigate = useNavigate();
    const cityDropdownRef = useRef(null);

    // Get unique cities from properties - case insensitive
    const cities = [...new Set(
        properties
            .map(prop => prop.city?.toLowerCase())
            .filter(Boolean)
    )].sort().map(city => city.charAt(0).toUpperCase() + city.slice(1));

    // Filter states with URL parameters
    const [filters, setFilters] = useState({
        purpose: purpose || '',
        uploadDate: '',
        bedrooms: configuration || '',
        residential: buytype || '',
        minBudget: '',
        maxBudget: price || '',
        furnishType: '',
        constructionStatus: '',
        isReraCertified: false
    });

    // Function to apply filters based on URL parameters
    const applyUrlFilters = (data) => {
        let filtered = [...data];

        // City filter
        if (city && city !== 'all') {
            filtered = filtered.filter(prop => 
                prop.city?.toLowerCase() === city.toLowerCase()
            );
        }

        // Configuration/Bedrooms filter
        if (configuration && configuration !== 'all') {
            const configPattern = new RegExp(configuration.replace(/bhk/i, '').trim(), 'i');
            filtered = filtered.filter(prop => {
                const bedrooms = prop.configuration?.replace(/[^0-9]/g, '');
                return configPattern.test(bedrooms);
            });
        }

        // Purpose filter (rent/sale)
        if (purpose && purpose !== 'all') {
            filtered = filtered.filter(prop => 
                prop.purpose?.toLowerCase() === purpose.toLowerCase()
            );
        }

        // Property type filter
        if (buytype && buytype !== 'all') {
            filtered = filtered.filter(prop => 
                prop.residential?.toLowerCase() === buytype.toLowerCase()
            );
        }

        // Price filter
        if (price && price !== 'all') {
            const maxPrice = parseInt(price);
            filtered = filtered.filter(prop => {
                const propertyPrice = convertPriceToNumber(prop.price, prop.pricerange);
                return propertyPrice <= maxPrice;
            });
        }

        return filtered;
    };

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch('https://www.townmanor.ai/api/owner-property');
                if (!response.ok) {
                    throw new Error('Failed to fetch properties');
                }
                const data = await response.json();
                const sortedProperties = data.sort((a, b) => {
                    return new Date(b.created_at) - new Date(a.created_at);
                });
                setProperties(sortedProperties);
                
                // Apply filters from URL parameters
                const filteredResults = applyUrlFilters(sortedProperties);
                setFilteredProperties(filteredResults);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, [city, configuration, purpose, buytype, price]);

    // Update filters when URL parameters change - only on initial load
    useEffect(() => {
        setFilters(prev => ({
            ...prev,
            purpose: purpose || '',
            bedrooms: configuration || '',
            residential: buytype || '',
            maxBudget: price || ''
        }));
        
        if (city) {
            setSelectedCity(city);
        }

        // Apply initial filters from URL parameters
        if (properties.length > 0) {
            const initialFiltered = applyUrlFilters(properties);
            setFilteredProperties(initialFiltered);
        }
    }, [city, configuration, purpose, buytype, price]); // This effect runs only when URL params change

    useEffect(() => {
        // Handle click outside of city dropdown
        const handleClickOutside = (event) => {
            if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target)) {
                setShowCityDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const convertPriceToNumber = (price, pricerange) => {
        if (!price) return 0;
        
        const multiplier = {
            'Lakh': 100000,
            'Crore': 10000000,
            '': 1 // For prices without range
        };

        return price * (multiplier[pricerange] || 1);
    };

    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Handle city selection
    const handleCitySelect = (city) => {
        setSelectedCity(city);
        setShowCityDropdown(false);
        applyAllFilters(properties);
    };

    // Clear city selection
    const clearCity = () => {
        setSelectedCity('');
        applyAllFilters(properties);
    };

    const clearFilters = () => {
        // Clear all filters including URL parameters
        setFilters({
            purpose: '',
            uploadDate: '',
            bedrooms: '',
            residential: '',
            minBudget: '',
            maxBudget: '',
            furnishType: '',
            constructionStatus: '',
            isReraCertified: false
        });
        setSelectedCity('');
        setSearchTerm('');
        
        
        
        // Reset to original properties
        setFilteredProperties(properties);
        setCurrentPage(1);
        
        // Reset URL parameters by navigating to base route
        navigate('/search-property/noida/3BHK/sale/apartment/100000000', { replace: true });
        
        // Force a re-filter of the properties
        setTimeout(() => {
            applyAllFilters(properties);
        }, 0);
    };

    // Modified applyAllFilters function to handle both URL and local filters
    const applyAllFilters = (props = properties) => {
        let filtered = [...props];

        // Apply search term filter
        if (searchTerm) {
            const search = searchTerm.toLowerCase().trim();
            filtered = filtered.filter(prop => 
                (prop.property_name || '').toLowerCase().includes(search) ||
                (prop.address || '').toLowerCase().includes(search) ||
                (prop.locality || '').toLowerCase().includes(search) ||
                (prop.city || '').toLowerCase().includes(search)
            );
        }

        // Apply city filter
        if (selectedCity) {
            filtered = filtered.filter(prop => 
                prop.city?.toLowerCase() === selectedCity.toLowerCase()
            );
        }

        // Apply purpose filter
        if (filters.purpose) {
            filtered = filtered.filter(prop => 
                prop.purpose?.toLowerCase() === filters.purpose.toLowerCase()
            );
        }

        // Apply bedroom/configuration filter
        if (filters.bedrooms) {
            filtered = filtered.filter(prop => {
                const bedrooms = prop.configuration?.replace(/[^0-9]/g, '');
                return bedrooms === filters.bedrooms;
            });
        }

        // Apply residential type filter
        if (filters.residential) {
            filtered = filtered.filter(prop => 
                prop.residential?.toLowerCase() === filters.residential.toLowerCase()
            );
        }

        // Apply budget filters
        if (filters.minBudget) {
            filtered = filtered.filter(prop => {
                const propertyPrice = convertPriceToNumber(prop.price, prop.pricerange);
                return propertyPrice >= parseFloat(filters.minBudget);
            });
        }

        if (filters.maxBudget) {
            filtered = filtered.filter(prop => {
                const propertyPrice = convertPriceToNumber(prop.price, prop.pricerange);
                return propertyPrice <= parseFloat(filters.maxBudget);
            });
        }

        // Apply additional filters
        if (filters.uploadDate) {
            const now = new Date();
            const filterDate = new Date();
            switch (filters.uploadDate) {
                case '1 week ago':
                    filterDate.setDate(filterDate.getDate() - 7);
                    break;
                case '1 month ago':
                    filterDate.setMonth(filterDate.getMonth() - 1);
                    break;
                case '6 Month ago':
                    filterDate.setMonth(filterDate.getMonth() - 6);
                    break;
                case '1 year +':
                    filterDate.setFullYear(filterDate.getFullYear() - 1);
                    break;
            }
            filtered = filtered.filter(prop => new Date(prop.created_at) >= filterDate);
        }

        if (filters.furnishType) {
            filtered = filtered.filter(prop => 
                prop.furnish_type?.toLowerCase() === filters.furnishType.toLowerCase()
            );
        }

        if (filters.constructionStatus) {
            filtered = filtered.filter(prop => 
                prop.construction_status?.toLowerCase() === filters.constructionStatus.toLowerCase()
            );
        }

        if (filters.isReraCertified) {
            filtered = filtered.filter(prop => prop.rera_id !== null && prop.rera_id !== '');
        }

        setFilteredProperties(filtered);
        setCurrentPage(1);
    };

    // Handle search input change
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        applyAllFilters(properties);
    };

    const formatPrice = (price, pricerange, money_type) => {
        if (!price) return 'Price on request';
        
        // If price range is not null and not 'thousane', use Indian Rupee (₹) symbol, else use the provided money_type
        const displayMoneyType = price ? '₹' : money_type;
        
        // If pricerange is 'thousane', return an empty string for the pricerange
        const formattedPriceRange = pricerange === 'Thousand' ? '' : pricerange;
        
        return `${displayMoneyType} ${price} ${formattedPriceRange ? `${formattedPriceRange}` : ''}`;
    };

    // Calculate pagination values
    const indexOfLastProperty = currentPage * propertiesPerPage;
    const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
    const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
    const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

    // Handle page changes
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const renderPropertyCard = (property) => {
        let images = [];
        try {
            // Handle both string and array inputs
            if (typeof property.image_repository === 'string') {
                images = JSON.parse(property.image_repository || '[]');
            } else if (Array.isArray(property.image_repository)) {
                images = property.image_repository;
            }
        } catch (error) {
            console.warn('Error parsing image repository:', error);
            images = [];
        }

        let amenities = [];
        try {
            // Handle both string and array inputs
            if (typeof property.amenities === 'string') {
                amenities = JSON.parse(property.amenities || '[]');
            } else if (Array.isArray(property.amenities)) {
                amenities = property.amenities;
            }
        } catch (error) {
            console.warn('Error parsing amenities:', error);
            amenities = [];
        }
        
        const imageUrl = images && images.length > 0 
            ? `https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/${images[0]}`
            : "/dummyproperty.jpg";
        
        return (
            <>
         
            <div key={property.id} className="card-listing-wrapper">
                <div className="image-box-container">
                    <span className="badge-highlighted">Featured</span>
                    <img
                        src={imageUrl}
                        alt={property.property_name || 'Property Image'}
                        className="image-box-main"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/dummyproperty.jpg";
                        }}
                    />
                </div>
                <div className="content-card-details">
                    <div className="card-price">
                        <h3 className="text-title-card">{property.configuration} Flat for {property.purpose} in {property.property_name || 'Property'}</h3>
                        <div  className="rent-position">
                        <h2 className="text-title-card">{formatPrice(property.price, property.pricerange, property.money_type)} </h2>
                        <span className="rent-specifier">{property.purpose}</span>
                        </div>
                    </div>
                    <p className="text-location">
                        <FaMapMarkerAlt className="icon-map-marker" /> {property.address || 'Address not available'}
                    </p>
                    <div className="content-spec">
                        <p className="text-land-area">
                            <MdVerified className="icon-measurement" /> {property.rera_id || "Rera Id Not Available"}
                        </p>
                        <p className="text-land-area">
                            <IoConstruct className="icon-measurement" /> {property.construction_status || "Status Not Available"}
                        </p>
                        {property.furnish_type && (
                            <p className="text-land-area">
                                <PiPaintBrushHousehold className="icon-measurement" /> {property.furnish_type}
                            </p>
                        )}
                       
                        {property.area_detail && (
                            <p className="text-price">
                                <BiArea className="icon-currency" />Area : {property.area_detail} sq.ft
                            </p>
                        )}
                    </div>
                    <p className="text-short-description">
                        {property.description?.substring(0, 150) || 'No description available'}...
                    </p>
                    <div className="agent-information-section">
                        <img 
                            src="/useragent.png" 
                            alt={property.username || 'Admin'} 
                            className="agent-photo-profile"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/useragent.png";
                            }}
                        />
                        <span className="agent-name-role">{property.username || 'Admin'}</span>
                    </div>
                    <div className="button-actions-container">
                       
                        <button className="btn-view-info" onClick={() => {
                            navigate(`/home/${property.id}`)
                        }}>View Details</button>
                        <button className="btn-contact-agent" onClick={() => setShowModal(true)}>Connect Now</button>
                       
                       
                    </div>
                </div>
            </div>
            </>
        );
    };

    const renderPagination = () => {
        const pageNumbers = [];
        const maxVisiblePages = 3; // Reduced from 5 to 3 for better visibility
        let startPage, endPage;

        if (totalPages <= maxVisiblePages + 2) { // +2 for first and last page
            // If total pages are less than max visible + 2, show all pages
            startPage = 1;
            endPage = totalPages;
        } else {
            // Calculate start and end pages
            if (currentPage <= Math.ceil(maxVisiblePages / 2)) {
                startPage = 1;
                endPage = maxVisiblePages;
            } else if (currentPage + Math.floor(maxVisiblePages / 2) >= totalPages) {
                startPage = totalPages - (maxVisiblePages - 1);
                endPage = totalPages;
            } else {
                startPage = currentPage - Math.floor(maxVisiblePages / 2);
                endPage = currentPage + Math.floor(maxVisiblePages / 2);
            }
        }

        // Generate page numbers
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return (
            <div className="custom-pagination-container">
                <button 
                    className={`custom-pagination-button ${currentPage === 1 ? 'custom-disabled' : ''}`}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <FaChevronLeft /> Previous
                </button>

                {/* First Page */}
                {startPage > 1 && (
                    <button 
                        className="custom-pagination-button"
                        onClick={() => handlePageChange(1)}
                    >
                        1
                    </button>
                )}

                {/* Left Ellipsis */}
                {startPage > 2 && <span className="custom-pagination-ellipsis">...</span>}

                {/* Page Numbers */}
                {pageNumbers.map(number => (
                    <button
                        key={number}
                        className={`custom-pagination-button ${currentPage === number ? 'custom-active' : ''}`}
                        onClick={() => handlePageChange(number)}
                    >
                        {number}
                    </button>
                ))}

                {/* Right Ellipsis */}
                {endPage < totalPages - 1 && <span className="custom-pagination-ellipsis">...</span>}

                {/* Last Page */}
                {endPage < totalPages && (
                    <button 
                        className="custom-pagination-button"
                        onClick={() => handlePageChange(totalPages)}
                    >
                        {totalPages}
                    </button>
                )}

                <button 
                    className={`custom-pagination-button custom-next ${currentPage === totalPages ? 'custom-disabled' : ''}`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next <FaChevronRight />
                </button>
            </div>
        );
    };

    if (loading) {
        return <div className="loading">Loading properties...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }
  
    return (
        <>
      
        <div className="container-main-wrapper">
            {/* Header Section */}
            <div className="header-container">
                {/* City Dropdown */}
                <div className="city-dropdown-container" ref={cityDropdownRef}>
                    <button 
                        className="city-dropdown"
                        onClick={() => setShowCityDropdown(!showCityDropdown)}
                    >
                        {selectedCity || 'Select City'} <span className="dropdown-icon">▼</span>
                    </button>
                    {showCityDropdown && (
                        <div className="city-dropdown-menu">
                            <div 
                                className="city-dropdown-item"
                                onClick={() => {
                                    clearCity();
                                    setShowCityDropdown(false);
                                }}
                            >
                                All Cities
                            </div>
                            {cities.map((city, index) => (
                                <div 
                                    key={index}
                                    className="city-dropdown-item"
                                    onClick={() => handleCitySelect(city)}
                                >
                                    {city}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Search Bar */}
                <div className="search-bar-listing">
                    <FaSearch className="search-icon-listing" />
                    <input 
                        type="text" 
                        className="search-input" 
                        placeholder="Search properties, locations..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    {searchTerm && (
                        <button 
                            className="search-clear-button"
                            onClick={() => {
                                setSearchTerm('');
                                applyAllFilters(properties);
                            }}
                        >
                            <FaTimes />
                        </button>
                    )}
                </div>

                {/* Action Buttons */}
                <button className="post-btn active-btn" onClick={()=>{
                    navigate('/newform')
                }}>Post Property</button>
                <button className="post-btn active-btn" onClick={()=>{
                    navigate('/adminproperty/Noida')
                }}>View Project</button>

                {/* Profile Icon
                <FaUserCircle className="profile-icon" /> */}
            </div>

            {/* Listings Section */}
            <div className="section-listings-content">
                <div>
                    <h2 className="text-heading-listings">Properties For Sale</h2>
                    <p className="text-total-count">
                        Displaying {indexOfFirstProperty + 1} - {Math.min(indexOfLastProperty, filteredProperties.length)} of {filteredProperties.length} properties
                    </p>
                </div>
                <button className="btn-filter" onClick={() => setShowFilter(true)}>
                    <FaFilter className="filter-icon2" /> Filters
                </button>
            </div>
            <div className="property_contentx">
                <div style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    {currentProperties.length === 0 ? (
                        <div className="custom-container">
                            <main className="custom-main">
                                <div className="custom-card">
                                    <div className="custom-icon-container">
                                        <FaSearch className="custom-iconx" />
                                    </div>
                                    <h1 className="custom-title">No Properties Found</h1>
                                    <p className="custom-description">
                                        Sorry, we currently don't have any properties matching your search
                                        criteria.
                                    </p>
                                    <div className="custom-filter-section">
                                        <h2 className="custom-subtitle">
                                            Try adjusting your filters to see more properties:
                                        </h2>
                                        <button 
                                            className="custom-reset-button" 
                                            onClick={() => {
                                                clearFilters();
                                                setShowFilter(false); // Close filter panel if open
                                            }}
                                        >
                                            <FaRedo className="custom-reset-icon" />
                                            Reset All Filters
                                        </button>
                                    </div>
                                    <div className="custom-search-section">
                                        <p className="custom-start-search-text">Or start a new search</p>
                                        <button 
                                            className="custom-view-all-button" 
                                            onClick={() => {
                                                clearFilters();
                                                setShowFilter(false); // Close filter panel if open
                                            }}
                                        >
                                            View All Properties
                                        </button>
                                    </div>
                                </div>
                            </main>
                        </div>
                    ) : (
                        currentProperties.map(renderPropertyCard)
                    )}
                </div>
                <div className="promo-card">
                    <img
                        src="/citymain6.jpg"
                        alt="Premium Plots"
                        className="promo-image"
                    />
                    <div className="promo-content">
                        <h3 className="promo-title">Discover Our Commercial Investment Opportunitie</h3>
                        <p className="promo-description">
                        Gain valuable insights into the world of commercial investments and explore the options that best suit your goals.
                        </p>
                        <button className="btn-learn-more" onClick={()=>{
                            navigate('/commercial')
                        }}>Explore</button>
                    </div>
                </div>
            </div>

            {/* Filter Popup */}
            {showFilter && (
                <div className="filter-overlay">
                    <div className="unique-container">
                        <div className="unique-header">
                            <div className="unique-search-box">
                                <h2>Filters Properties</h2>
                            </div>
                            <button className="unique-clear-button" onClick={() => setShowFilter(false)}>
                                <FaTimes className="unique-clear-icon" />
                            </button>
                        </div>
                        <div className="unique-filter-row">
                            <div className="unique-sale-type-dropdown">
                                <select 
                                    className="unique-dropdown-select"
                                    name="purpose"
                                    value={filters.purpose}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">Sale Type</option>
                                    <option value="rent">Rent</option>
                                    <option value="sale">Sale</option>
                                </select>
                                <FaChevronDown className="unique-dropdown-icon" />
                            </div>
                            <div className="unique-construction-year-dropdown">
                                <select 
                                    className="unique-dropdown-select"
                                    name="uploadDate"
                                    value={filters.uploadDate}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">Upload Date</option>
                                    <option>1 week ago</option>
                                    <option>1 month ago</option>
                                    <option>6 Month ago</option>
                                    <option>1 year +</option>
                                </select>
                                <FaChevronDown className="unique-dropdown-icon" />
                            </div>
                        </div>

                        <div className="unique-filter-row">
                            <div className="unique-bedrooms-dropdown">
                                <select 
                                    className="unique-dropdown-select"
                                    name="bedrooms"
                                    value={filters.bedrooms}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">Bedrooms</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>4+</option>
                                    <option>Studio</option>
                                </select>
                                <FaChevronDown className="unique-dropdown-icon" />
                            </div>
                            <div className="unique-buildings-dropdown">
                                <select 
                                    className="unique-dropdown-select"
                                    name="residential"
                                    value={filters.residential}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">Buildings</option>
                                    <option value="apartment">Apartment</option>
                                    <option value="villa">House/Villa</option>
                                    <option value="plot">Plot</option>
                                    <option value="builderfloor">BuilderFloor</option>
                                    <option value="office">Officespace</option>
                                    <option value="shop">Shop</option>
                                </select>
                                <FaChevronDown className="unique-dropdown-icon" />
                            </div>
                        </div>

                        <div className="unique-filter-row">
                            <div className="unique-min-budget-dropdown">
                                <select 
                                    className="unique-dropdown-select"
                                    name="minBudget"
                                    value={filters.minBudget}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">Min Budget</option>
                                    <option value="100000">1 Lakh</option>
                                    <option value="5000000">50 Lakh</option>
                                    <option value="10000000">1 Crore</option>
                                    <option value="50000000">5 Crore</option>
                                </select>
                                <FaChevronDown className="unique-dropdown-icon" />
                            </div>
                            <div className="unique-max-budget-dropdown">
                                <select 
                                    className="unique-dropdown-select"
                                    name="maxBudget"
                                    value={filters.maxBudget}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">Max Budget</option>
                                    <option>10,000,000</option>
                                    <option>30,000,000</option>
                                    <option>50,000,000</option>
                                    <option>50,000,000+</option>
                                </select>
                                <FaChevronDown className="unique-dropdown-icon" />
                            </div>
                        </div>

                        <div className="unique-filter-row">
                            <div className="unique-furnishing-dropdown">
                                <select 
                                    className="unique-dropdown-select"
                                    name="furnishType"
                                    value={filters.furnishType}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">Furnishing</option>
                                    <option value="fully furnished">Fully Furnished</option>
                                    <option value="semi furnished">Semi Furnished</option>
                                    <option value="unfurnished">Unfurnished</option>
                                </select>
                                <FaChevronDown className="unique-dropdown-icon" />
                            </div>
                            <div className="unique-posted-by-dropdown">
                                <select 
                                    className="unique-dropdown-select"
                                    name="constructionStatus"
                                    value={filters.constructionStatus}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">Construction Status</option>
                                    <option value="ready to move">Ready to Move</option>
                                    <option value="under construction">Under Construction</option>
                                </select>
                                <FaChevronDown className="unique-dropdown-icon" />
                            </div>
                        </div>

                        <div className="unique-checkbox-section">
                            <div className="unique-checkbox-row">
                                <label className="unique-checkbox-label">
                                    <input 
                                        type="checkbox"
                                        className="unique-checkbox-input"
                                        name="isReraCertified"
                                        checked={filters.isReraCertified}
                                        onChange={handleFilterChange}
                                    />
                                    <span className="unique-checkbox-text">RERA Certified</span>
                                </label>
                            </div>
                        </div>

                        <div className="filter-buttons">
                            <button className="unique-clear-filters" onClick={clearFilters}>Clear All</button>
                            <button className="unique-apply-button" onClick={() => {
                                applyAllFilters();
                                setShowFilter(false);
                            }}>Apply Filters</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Pagination */}
            {renderPagination()}
        </div>
        </>
    );
};

export default NewSearchListingPage;
