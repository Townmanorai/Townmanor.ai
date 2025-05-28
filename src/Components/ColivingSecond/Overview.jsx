import React from 'react';
import './Overview.css';
import { FaSwimmingPool, FaDumbbell, FaShieldAlt, FaCouch, FaWifi, FaCar, FaTree, FaCameraRetro, FaBuilding, FaBus, FaShoppingCart, FaHospital } from 'react-icons/fa';

const Overview = () => {
    return (
        <section className="townmanor_coliving_overview_section">
            <h2>Overview</h2>
            <p>
                Hustle Bustle is a premium 2BHK apartment located in the heart of Kadubisanahalli, Bangalore. 
                This well-maintained property is ideal for working professionals looking for a comfortable and 
                convenient living space. The apartment offers excellent connectivity to major tech parks and 
                commercial hubs in the area.
            </p>
            <p>
                Situated in a gated community with 24/7 security, the property features modern amenities including 
                a gym, swimming pool, and community spaces. The apartment is fully furnished with quality furniture 
                and appliances, making it move-in ready. With spacious rooms, ample natural light, and a functional 
                layout, this home provides the perfect balance of comfort and convenience.
            </p>
            
            <div className="townmanor_coliving_amenities_container">
                <h3>Key Amenities</h3>            <div className="townmanor_coliving_amenities_grid">
                <div className="townmanor_coliving_amenity_item">
                    <FaSwimmingPool className="townmanor_coliving_amenity_icon" />
                    <span>Swimming Pool</span>
                </div>
                <div className="townmanor_coliving_amenity_item">
                    <FaDumbbell className="townmanor_coliving_amenity_icon" />
                    <span>Gym</span>
                </div>
                <div className="townmanor_coliving_amenity_item">
                    <FaShieldAlt className="townmanor_coliving_amenity_icon" />
                    <span>24/7 Security</span>
                </div>
                <div className="townmanor_coliving_amenity_item">
                    <FaCouch className="townmanor_coliving_amenity_icon" />
                    <span>Fully Furnished</span>
                </div>
                <div className="townmanor_coliving_amenity_item">
                    <FaWifi className="townmanor_coliving_amenity_icon" />
                    <span>High-Speed Internet</span>
                </div>
                <div className="townmanor_coliving_amenity_item">
                    <FaCar className="townmanor_coliving_amenity_icon" />
                    <span>Covered Parking</span>
                </div>
                <div className="townmanor_coliving_amenity_item">
                    <FaTree className="townmanor_coliving_amenity_icon" />
                    <span>Garden Area</span>
                </div>
                <div className="townmanor_coliving_amenity_item">
                    <FaCameraRetro className="townmanor_coliving_amenity_icon" />
                    <span>CCTV Surveillance</span>
                </div>
            </div>
            
            <div className="townmanor_coliving_location_info">
                <h3>Location Advantages</h3>
                <ul>
                    <li><FaBuilding className="townmanor_coliving_location_icon" /> 5 mins to Nearest Tech Park</li>
                    <li><FaBus className="townmanor_coliving_location_icon" /> Close to Public Transport</li>
                    <li><FaShoppingCart className="townmanor_coliving_location_icon" /> Shopping Centers Nearby</li>
                    <li><FaHospital className="townmanor_coliving_location_icon" /> Medical Facilities in Vicinity</li>
                </ul>
            </div>
            </div>
        </section>
    );
};

export default Overview;
