import React from 'react';
import './Amenities.css';
import { FaOm, FaTv, FaDumbbell, FaTableTennis, FaCouch, FaSwimmingPool, FaBuilding } from 'react-icons/fa';

const Amenities = () => {
    const amenities = [
        { id: 1, name: 'Meditation Room', icon: <FaOm /> },
        { id: 2, name: 'Amphitheatre', icon: <FaTv /> },
        { id: 3, name: 'Gym', icon: <FaDumbbell /> },
        { id: 4, name: 'Tennis Court', icon: <FaTableTennis /> },
        { id: 5, name: 'Living Room Balcony', icon: <FaCouch /> },
        { id: 6, name: 'Swimming Pool', icon: <FaSwimmingPool /> }
    ];

    const hotspots = [
        { id: 1, name: 'Embassy Tech Village', distance: '1.2 km', icon: <FaBuilding /> },
        { id: 2, name: 'Prestige Tech Park', distance: '2.5 km', icon: <FaBuilding /> },
        { id: 3, name: 'Cessna Business Park', distance: '3.1 km', icon: <FaBuilding /> }
    ];

    return (
        <>
            <section className="townmanor_coliving_amenities_section">
                <h2>Amenities</h2>
                <div className="townmanor_coliving_amenities_grid_container">
                    {amenities.map(amenity => (
                        <div key={amenity.id} className="townmanor_coliving_amenity_card">
                            <div className="townmanor_coliving_amenity_icon_wrapper">
                                {amenity.icon}
                            </div>
                            <span>{amenity.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="townmanor_coliving_hotspots_section">
                <h2>Nearby Hotspots</h2>
                <div className="townmanor_coliving_hotspots_list">
                    {hotspots.map(hotspot => (
                        <div key={hotspot.id} className="townmanor_coliving_hotspot_item">
                            <div className="townmanor_coliving_hotspot_info">
                                <div className="townmanor_coliving_hotspot_icon_wrapper">
                                    {hotspot.icon}
                                </div>
                                <span>{hotspot.name}</span>
                            </div>
                            <span className="townmanor_coliving_distance">{hotspot.distance}</span>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Amenities;
