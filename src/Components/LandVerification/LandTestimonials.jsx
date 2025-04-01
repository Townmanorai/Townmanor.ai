import React from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import './LandTestimonials.css';

const LandTestimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      location: "Gujarat",
      rating: 5,
      testimonial: "The land verification process was incredibly smooth. I got my results within minutes, and the information was accurate. Saved me a lot of time and effort.",
      image: "/testimonials/user1.jpg"
    },
    {
      id: 2,
      name: "Priya Sharma",
      location: "Madhya Pradesh",
      rating: 5,
      testimonial: "As a property dealer, I use this service regularly. It's reliable, fast, and provides comprehensive information. Highly recommended!",
      image: "/testimonials/user2.jpg"
    },
    {
      id: 3,
      name: "Amit Patel",
      location: "Karnataka",
      rating: 5,
      testimonial: "The verification report was detailed and helped me make an informed decision about my property purchase. Great service!",
      image: "/testimonials/user3.jpg"
    }
  ];

  const renderStars = (rating) => {
    return [...Array(rating)].map((_, index) => (
      <FaStar key={index} className="townmanor-land-testimonial-star" />
    ));
  };

  return (
    <section className="townmanor-land-testimonials-section">
      <div className="townmanor-land-testimonials-container">
        <div className="townmanor-land-testimonials-header">
          <h2>What Our Users Say</h2>
          <p>Trusted by thousands of users across India</p>
        </div>

        <div className="townmanor-land-testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="townmanor-land-testimonial-card">
              <div className="townmanor-land-testimonial-content">
                <FaQuoteLeft className="townmanor-land-testimonial-quote-icon" />
                <p className="townmanor-land-testimonial-text">{testimonial.testimonial}</p>
              </div>
              
              <div className="townmanor-land-testimonial-rating">
                {renderStars(testimonial.rating)}
              </div>

              <div className="townmanor-land-testimonial-author">
                {/* <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="townmanor-land-testimonial-image"
                  onError={(e) => {
                    e.target.src = '/testimonials/default-avatar.png';
                  }}
                /> */}
                <div className="townmanor-land-testimonial-author-info">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="townmanor-land-testimonials-cta">
          <h3>Ready to Verify Your Land?</h3>
          <p>Join thousands of satisfied users who trust our verification service</p>
          <button className="townmanor-land-testimonials-button">
            Start Verification Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default LandTestimonials; 