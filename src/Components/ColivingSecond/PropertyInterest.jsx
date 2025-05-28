import React from 'react';
import './PropertyInterest.css';

const PropertyInterest = () => {
    return (
        <section className="townmanor_coliving_property_interest">
            <div className="townmanor_coliving_interest_content">
                <h2>Interested in this property?</h2>
                <p>Join our waitlist to be notified when this or similar properties become available. Our average response time is under 24 hours.</p>
                <div className="townmanor_coliving_interest_buttons">
                    <button className="townmanor_coliving_reserve_button">Reserve Now</button>
                    <button className="townmanor_coliving_contact_button">Contact Us</button>
                </div>
            </div>
        </section>
    );
};

export default PropertyInterest;
