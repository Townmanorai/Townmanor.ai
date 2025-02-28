import React from 'react';
import './RentTestimonials.css';

const testimonials = [
  {
    name: 'Rajesh Sharma',
    feedback: 'Yeh service ne mere kirayedari ka kaam bahut asaan kar diya. Bilkul damdaar!',
    image: 'https://randomuser.me/api/portraits/men/10.jpg'
  },
  {
    name: 'Pooja Verma',
    feedback: 'Mujhe yeh platform bahut pasand aaya. Sab kuch ekdum sahi tareeke se manage hota hai.',
    image: 'https://randomuser.me/api/portraits/women/11.jpg'
  },
  {
    name: 'Amit Kumar',
    feedback: 'Rental agreements banana ab bilkul tension-free ho gaya hai. Shukriya is behtareen service ka!',
    image: 'https://randomuser.me/api/portraits/men/12.jpg'
  }
];

const RentTestimonials = () => {
  return (
    <section className="rent-testimonials">
      <h2>What Our Clients Say</h2>
      <div className="rent-testimonials-container">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="rent-testimonial-card">
            <img 
              src={testimonial.image} 
              alt={testimonial.name} 
              className="testimonial-image" 
            />
            <p className="testimonial-feedback">"{testimonial.feedback}"</p>
            <h4 className="testimonial-name">{testimonial.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RentTestimonials;
