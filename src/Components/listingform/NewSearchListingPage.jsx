import React from "react";
import { FaSearch, FaMapMarkerAlt, FaBed, FaMoneyBillWave, FaUserCircle } from "react-icons/fa";
import "./NewSearchListingPage.css";

const NewSearchListingPage = () => {
    return (
        <div className="container-main-wrapper">
            {/* Header Section */}
            <div className="header-container">
                {/* City Dropdown */}
                <button className="city-dropdown">
                    Select City <span className="dropdown-icon">▼</span>
                </button>

                {/* Search Bar */}
                <div className="search-bar-listing">
                    <FaSearch className="search-icon-listing" />
                    <input type="text" className="search-input" placeholder="Search properties, locations..." />
                </div>

                {/* Action Buttons */}
                <button className="post-btn active-btn">Post Property</button>
                <button className="post-btn active-btn">View Project</button>

                {/* Profile Icon */}
                <FaUserCircle className="profile-icon" />
            </div>

            {/* Breadcrumbs */}
            <div className="breadcrumb-navigation">
                <span className="breadcrumb-text">Home</span> &gt;
                <span className="breadcrumb-text">Listings</span> &gt;
                <span className="breadcrumb-text">For Sale</span>
            </div>

            {/* Listings Section */}
            <div className="section-listings-content">
                <h2 className="text-heading-listings">Properties For Sale</h2>
                <p className="text-total-count">Displaying 1 - 18 of 475 total results</p>


                <div className="property_contentx">
                    <div style={{
                        display:'flex',
                        flexDirection:'column'
                    }}>
                    <div className="card-listing-wrapper">
                        <div className="image-box-container">
                            <span className="badge-highlighted">Featured</span>
                            <img
                                src="/commercial.jpg"
                                alt="Luxury Villa Plot"
                                className="image-box-main"
                            />
                        </div>
                        <div className="content-card-details">
                            <div className="card-price">
                                <h3 className="text-title-card">Luxury Villa Plot</h3>
                                <h2 className="text-title-card">1.3 Crore</h2>
                            </div>
                            <p className="text-location">
                                <FaMapMarkerAlt className="icon-map-marker" /> Palm Beach Road, New Town
                            </p>
                            <div className="content-spec">
                                <p className="text-land-area">
                                    <FaBed className="icon-measurement" /> 1200 sq.ft
                                </p>
                                <p className="text-price">
                                    <FaMoneyBillWave className="icon-currency" /> $450,000
                                </p>
                            </div>
                            <p className="text-short-description">
                                Premium residential plot in an upcoming locality with excellent connectivity and amenities.
                            </p>
                            <div className="agent-information-section">
                                <img src="/user-icon.png" alt="John Smith" className="agent-photo-profile" />
                                <span className="agent-name-role">John Smith - Premium Agent</span>
                            </div>
                            <div className="button-actions-container">
                                <button className="btn-view-info">View Details</button>
                                <button className="btn-contact-agent">Connect Now</button>
                            </div>
                        </div>


                    </div>
                    <div className="card-listing-wrapper">
                        <div className="image-box-container">
                            <span className="badge-highlighted">Featured</span>
                            <img
                                src="/commercial.jpg"
                                alt="Luxury Villa Plot"
                                className="image-box-main"
                            />
                        </div>
                        <div className="content-card-details">
                            <div className="card-price">
                                <h3 className="text-title-card">Luxury Villa Plot</h3>
                                <h2 className="text-title-card">1.3 Crore</h2>
                            </div>
                            <p className="text-location">
                                <FaMapMarkerAlt className="icon-map-marker" /> Palm Beach Road, New Town
                            </p>
                            <div className="content-spec">
                                <p className="text-land-area">
                                    <FaBed className="icon-measurement" /> 1200 sq.ft
                                </p>
                                <p className="text-price">
                                    <FaMoneyBillWave className="icon-currency" /> $450,000
                                </p>
                            </div>
                            <p className="text-short-description">
                                Premium residential plot in an upcoming locality with excellent connectivity and amenities.
                            </p>
                            <div className="agent-information-section">
                                <img src="/user-icon.png" alt="John Smith" className="agent-photo-profile" />
                                <span className="agent-name-role">John Smith - Premium Agent</span>
                            </div>
                            <div className="button-actions-container">
                                <button className="btn-view-info">View Details</button>
                                <button className="btn-contact-agent">Connect Now</button>
                            </div>
                        </div>


                    </div>
                    </div>
                    <div className="promo-card">
                        <img
                            src="/citymain6.jpg"
                            alt="Premium Plots"
                            className="promo-image"
                        />
                        <div className="promo-content">
                            <h3 className="promo-title">Premium Plots Available</h3>
                            <p className="promo-description">
                                Exclusive residential plots in prime location with world-class amenities
                            </p>
                            <button className="btn-learn-more">Learn More</button>
                        </div>
                    </div>
                </div>

                {/* Load More Button */}
                <button className="btn-load-more">Load More</button>
            </div>
        </div>
    );
};

export default NewSearchListingPage;
