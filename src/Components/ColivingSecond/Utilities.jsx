import React from 'react';
import './Utilities.css';
import { FaWifi, FaBolt, FaWater, FaUtensils, FaScrewdriverWrench } from 'react-icons/fa6';

const Utilities = () => {    const utilities = [
        {
            id: 1,
            name: 'WiFi',
            icon: <FaWifi />,
            cost: '₹1,000',
            frequency: 'Monthly'
        },
        {
            id: 2,
            name: 'Electricity',
            icon: <FaBolt />,
            cost: 'As per usage',
            frequency: 'Monthly'
        },
        {
            id: 3,
            name: 'Water',
            icon: <FaWater />,
            cost: '₹500',
            frequency: 'Monthly'
        },
        {
            id: 4,
            name: 'Meals (Optional)',
            icon: <FaUtensils />,
            cost: '₹6,000',
            frequency: 'Monthly'
        },
        {
            id: 5,
            name: 'Maintenance',
            icon: <FaScrewdriverWrench />,
            cost: '₹1,500',
            frequency: 'Monthly'
        }
    ];

    return (
        <section className="townmanor_coliving_utilities_section">
            <h2>Utilities & Extra Costs</h2>
            <div className="townmanor_coliving_utilities_table">
                <div className="townmanor_coliving_table_header">
                    <div className="townmanor_coliving_utility_col">UTILITY</div>
                    <div className="townmanor_coliving_cost_col">COST</div>
                    <div className="townmanor_coliving_frequency_col">FREQUENCY</div>
                </div>
                {utilities.map(utility => (
                    <div key={utility.id} className="townmanor_coliving_table_row">
                        <div className="townmanor_coliving_utility_col">
                            <div className="townmanor_coliving_utility_icon_wrapper">
                                {utility.icon}
                            </div>
                            <span>{utility.name}</span>
                        </div>
                        <div className="townmanor_coliving_cost_col">{utility.cost}</div>
                        <div className="townmanor_coliving_frequency_col">{utility.frequency}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Utilities;
