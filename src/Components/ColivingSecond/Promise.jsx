import React from 'react';
import './Promise.css';
import { FaCreditCard, FaKitchenSet, FaScrewdriverWrench, FaHeadset } from 'react-icons/fa6';

const Promise = () => {    const promises = [
        {
            id: 1,
            icon: <FaCreditCard />,
            title: 'No Deposit',
            description: 'Move in without the burden of a large security deposit'
        },
        {
            id: 2,
            icon: <FaKitchenSet />,
            title: 'Kitchenware Included',
            description: 'Fully equipped kitchen with all essential appliances'
        },
        {
            id: 3,
            icon: <FaScrewdriverWrench />,
            title: 'Maintenance',
            description: 'Regular maintenance and cleaning services included'
        },
        {
            id: 4,
            icon: <FaHeadset />,
            title: 'Quick Resolution',
            description: '24/7 support for any issues or emergencies'
        }
    ];

    return (
        <section className="townmanor_coliving_promise_section">
            <h2>Our Promise</h2>
            <div className="townmanor_coliving_promises_grid">
                {promises.map(promise => (
                    <div key={promise.id} className="townmanor_coliving_promise_card">
                        <div className="townmanor_coliving_promise_icon">
                            {promise.icon}
                        </div>
                        <h3>{promise.title}</h3>
                        <p>{promise.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Promise;
