import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './StateDetails.css';
import TopRentedProperties from '../HomePage/TopRentedProperties';
import ExclusiveOwnerProperties from '../HomePage/ExclusiveOwnerProperties';
import dummyCitiesData from '../../JsonData/ecity.json';
import { motion } from 'framer-motion';
import { FaCity, FaHome, FaMoneyBillWave, FaFileAlt, FaBuilding, FaInfoCircle, FaMapMarkedAlt } from 'react-icons/fa';
// import NewLaunchedProjects from '../HomePage/NewLaunchedProjects';
// import UpComingProjects from '../HomePage/UpComingProjects';

const StateDetails = () => {
    const { stateName } = useParams(); // Get the selected state from the URL

    const stateData = dummyCitiesData[stateName]; // Get the state data
    const cities = stateData?.cities || []; // Access cities array safely
    const [hoveredCity, setHoveredCity] = useState(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <div className="state-details-container">
            <motion.div 
                className="state-hero-section"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                    background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${stateData.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="state-header">
                    {stateData && stateData.image && (
                        <motion.img
                            src={stateData.image}
                            alt={stateName}
                            className="state-logo"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                        />
                    )}
                    <h1 className="state-title">{stateName}</h1>
                </div>
            </motion.div>

            <motion.div 
                className="services-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="services-section-title">Quick Services</div>
                <motion.div variants={itemVariants} className="service-card sc-card">
                    <Link to={`/properties-for-sale-rent/${stateName}`}>
                        <FaHome className="service-icon" />
                        <h3>Properties Sale/Rent</h3>
                        <div className="service-description">Find the best properties in your area</div>
                    </Link>
                </motion.div>
                <motion.div variants={itemVariants} className="service-card sc-card">
                    <Link to={`/pay-house-tax-online/${stateName}`}>
                        <FaMoneyBillWave className="service-icon" />
                        <h3>Pay House Tax</h3>
                        <div className="service-description">Easy online tax payments</div>
                    </Link>
                </motion.div>
                <motion.div variants={itemVariants} className="service-card sc-card">
                    <Link to={`/land-record-verification/${stateName}`}>
                        <FaFileAlt className="service-icon" />
                        <h3>Land Records</h3>
                        <div className="service-description">Verify your land documents</div>
                    </Link>
                </motion.div>
                <motion.div variants={itemVariants} className="service-card sc-card">
                    <Link to={stateData?.reraLink} target="_blank" rel="noopener noreferrer">
                        <FaBuilding className="service-icon" />
                        <h3>RERA</h3>
                        <div className="service-description">Regulatory information</div>
                    </Link>
                </motion.div>
            </motion.div>

            <motion.div 
                className="cities-section"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                <h2 className="section-title">Explore Cities in {stateName}</h2>
                <motion.div 
                    className="cities-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {cities.map((city, index) => (
                        <motion.div
                            key={index}
                            className="city-cardxyz"
                            variants={itemVariants}
                            onHoverStart={() => setHoveredCity(index)}
                            onHoverEnd={() => setHoveredCity(null)}
                            whileHover={{ scale: 1.03 }}
                        >
                            <Link to={`/stateName/${stateName}/city/${city.city_name}`}>
                                <div className="city-image-container">
                                    <img
                                        src={city.image}
                                        alt={city.city_name}
                                        className="city-imagexyz"
                                    />
                                </div>
                                <div className="city-infoxyz">
                                    <FaCity className="city-icon" />
                                    <span>{city.city_name}</span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            <div className='mt-4'>
            {/* <NewLaunchedProjects stateName={stateName}/> */}
            <TopRentedProperties stateName={stateName} />
            <ExclusiveOwnerProperties stateName={stateName} />
            {/* <UpComingProjects stateName={stateName}/> */}
            </div>
            
            {/* State Overview section appears at the bottom */}
            <motion.div 
                className="state-stats-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                <h2 className="section-title">State Overview</h2>
                <div className="stats-grid">
                    <div className="stat-card">
                        <FaMapMarkedAlt style={{ fontSize: '2rem', marginBottom: '1rem', color: '#e6181b' }} />
                        <h3>{cities.length}</h3>
                        <p>Major Cities</p>
                    </div>
                    <div className="stat-card">
                        <FaHome style={{ fontSize: '2rem', marginBottom: '1rem', color: '#e6181b' }} />
                        <h3>1000+</h3>
                        <p>Available Properties</p>
                    </div>
                    <div className="stat-card">
                        <FaInfoCircle style={{ fontSize: '2rem', marginBottom: '1rem', color: '#e6181b' }} />
                        <h3>24/7</h3>
                        <p>Customer Service</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default StateDetails;
