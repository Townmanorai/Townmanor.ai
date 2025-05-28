import React from 'react';
import './SimilarListings.css';

const SimilarListings = () => {    const listings = [
        {
            id: 1,
            name: 'Urban Nest, Marathahalli',
            type: '2BHK',
            area: '1100 sq.ft',
            price: '18,000',
            status: 'Available',
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
        },
        {
            id: 2,
            name: 'Serene Heights, Bellandur',
            type: '3BHK',
            area: '1500 sq.ft',
            price: '25,000',
            status: 'Waitlist',            image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3'
        },
        {
            id: 3,
            name: 'Comfort Zone, Whitefield',
            type: '2BHK',
            area: '1150 sq.ft',
            price: '16,500',
            status: 'Available',
            image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3'
        },
        // {
        //     id: 4,
        //     name: 'Sky View, Sarjapur Road',
        //     type: '3BHK',
        //     area: '850 sq.ft',
        //     price: '14,000',
        //     status: 'Booked',
        //     image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3'
        // }
    ];

    return (
        <section className="townmanor_coliving_similar_listings_section">
            <h2>Similar Listings</h2>
            <div className="townmanor_coliving_listings_grid">
                {listings.map(listing => (                    <div key={listing.id} className="townmanor_coliving_listing_card">
                        <div className="townmanor_coliving_listing_image">
                            <img src={listing.image} alt={listing.name} />
                        </div>
                        <div className="townmanor_coliving_listing_info">
                            <div className="townmanor_coliving_listing_header">
                                <h3>{listing.name}</h3>
                                <span className={`townmanor_coliving_status townmanor_coliving_status_${listing.status.toLowerCase()}`}>
                                    {listing.status}
                                </span>
                            </div>
                            <div className="townmanor_coliving_listing_details">
                                <span>{listing.type}</span>
                                <span>{listing.area}</span>
                            </div>
                            <div className="townmanor_coliving_listing_price">
                                <span className="townmanor_coliving_price">₹{listing.price}</span>
                                <span className="townmanor_coliving_period">/mo</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SimilarListings;
