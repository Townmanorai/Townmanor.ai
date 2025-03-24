import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Andromeda.css";

const testimonials = [
  {
    id: 1,
    name: "Rohit Sharma",
    role: "Wealth Advisor",
    text: "I Got My Dream Home Loan At The Lowest Rate! Smooth Process & Great Support!",
    image: "/profile.png",
  },
  {
    id: 2,
    name: "Rohit Sharma",
    role: "Wealth Advisor",
    text: "I Got My Dream Home Loan At The Lowest Rate! Smooth Process & Great Support!",
    image: "/agent-logo.jpg",
  },
];

const Testimonials = () => {
  return (
    <>
    <div className="testimonials-container">
      <h2 className="testimonials-title">Hear From Our Happy Homeowners</h2>

      <div className="testimonials-slider">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card">
            <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
            <div className="testimonial-content">
              <p className="testimonial-text">"{testimonial.text}"</p>
              <p className="testimonial-name">{testimonial.name}</p>
              <p className="testimonial-role">{testimonial.role}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="testimonial-navigation">
        <FaChevronLeft className="testimonial-nav-icon" />
        <FaChevronRight className="testimonial-nav-icon" />
      </div>
    </div>
    </>
  );
};

export default Testimonials;
