import React from 'react';
import './Reviews.css';
import { FaStar } from 'react-icons/fa';

const Reviews = () => {
    const reviews = [
        {
            id: 1,
            name: 'Aditya Kumar',
            initials: 'AK',
            rating: 4.5,
            date: 'April 2025',
            text: "I've been living in Hustle Bustle for 6 months now and it's been a great experience. The location is perfect for tech professionals, with easy access to major IT parks. The community is friendly and the amenities are well-maintained. My room is spacious and comfortable. The management is responsive and addresses any issues promptly."
        },
        {
            id: 2,
            name: 'Sneha Reddy',
            initials: 'SR',
            rating: 4,
            date: 'March 2025',
            text: "The apartment is well-designed and the community is fantastic. I especially love the meditation room and gym facilities. The location is convenient with many restaurants and shops nearby. The only minor issue is occasional water pressure problems, but the management team is always quick to resolve them. Overall, I'm very satisfied with my stay here."
        }
    ];

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <FaStar 
                key={index}
                className={`${index < Math.floor(rating) ? 'townmanor_coliving_star_filled' : 
                    index < rating ? 'townmanor_coliving_star_half_filled' : 'townmanor_coliving_star_empty'}`}
            />
        ));
    };

    return (
        <section className="townmanor_coliving_reviews_section">
            <h2>Reviews</h2>
            <div className="townmanor_coliving_reviews_container">
                {reviews.map(review => (
                    <div key={review.id} className="townmanor_coliving_review_card">
                        <div className="townmanor_coliving_review_header">
                            <div className="townmanor_coliving_reviewer_info">
                                <div className={`townmanor_coliving_avatar ${review.initials === 'SR' ? 'townmanor_coliving_green' : 'townmanor_coliving_blue'}`}>
                                    {review.initials}
                                </div>
                                <div className="townmanor_coliving_name_date">
                                    <h3>{review.name}</h3>
                                    <div className="townmanor_coliving_rating_date">
                                        <div className="townmanor_coliving_stars">
                                            {renderStars(review.rating)}
                                        </div>
                                        <span className="townmanor_coliving_date">{review.date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="townmanor_coliving_review_text">{review.text}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Reviews;
