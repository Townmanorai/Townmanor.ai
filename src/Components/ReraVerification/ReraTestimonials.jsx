import React from 'react';
import './ReraTestimonials.css';

const testimonials = [
  {
    content: "The RERA verification service helped me confirm the legal status of my property. Very reliable!",
    author: "Amit Patel",
    location: "Mumbai",
    image: "/testimonials/user1.jpg"
  },
  {
    content: "Quick and accurate verification. Saved me from investing in a non-compliant project.",
    author: "Priya Sharma",
    location: "Delhi",
    image: "/testimonials/user2.jpg"
  },
  {
    content: "The support team was very helpful in explaining the verification process. Highly recommended!",
    author: "Rajesh Kumar",
    location: "Bangalore",
    image: "/testimonials/user3.jpg"
  }
];

function ReraTestimonials() {
  return (
    <section className="townmanor-rera-testimonials-section">
      <div className="townmanor-rera-testimonials-container">
        <div className="townmanor-rera-testimonials-header">
          <h2>What Our Users Say</h2>
          <p>Trusted by thousands of property buyers across India</p>
        </div>
        <div className="townmanor-rera-testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="townmanor-rera-testimonial-card">
              <div className="townmanor-rera-testimonial-content">
                <p>{testimonial.content}</p>
              </div>
              <div className="townmanor-rera-testimonial-author">
                <img src={testimonial.image} alt={testimonial.author} />
                <div>
                  <h4>{testimonial.author}</h4>
                  <p>{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="townmanor-rera-testimonials-cta">
          <h3>Ready to Verify Your Property?</h3>
          <p>Join thousands of satisfied users who have verified their properties with us</p>
          <button className="townmanor-rera-testimonials-button">
            Start Verification
          </button>
        </div>
      </div>
    </section>
  );
}

export default ReraTestimonials; 