import React from 'react';
import './ReraTestimonials.css';

const ReraTestimonials = () => {
  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Home Buyer',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      quote: 'The RERA verification process was quick and easy. I was able to verify my property\'s registration status within minutes, giving me peace of mind about my investment.'
    },
    {
      name: 'Priya Sharma',
      role: 'Real Estate Agent',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
      quote: 'As a real estate agent, I use this service regularly to verify properties for my clients. It\'s reliable and helps build trust with potential buyers.'
    },
    {
      name: 'Amit Patel',
      role: 'Property Developer',
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
      quote: 'The verification service has helped us maintain transparency with our customers. It\'s an essential tool for any property developer who values compliance and customer trust.'
    }
  ];

  return (
    <section className="townmanor-rera-testimonials-section">
      <div className="townmanor-rera-testimonials-container">
        <div className="townmanor-rera-testimonials-header">
          <h2>What Our Users Say</h2>
          <p>Real experiences from people who have used our RERA verification service</p>
        </div>

        <div className="townmanor-rera-testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="townmanor-rera-testimonial-card">
              <div className="townmanor-rera-testimonial-content">
                <p className="townmanor-rera-testimonial-quote">"{testimonial.quote}"</p>
              </div>
              <div className="townmanor-rera-testimonial-author">
                {/* <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="townmanor-rera-testimonial-image"
                /> */}
                <div className="townmanor-rera-testimonial-info">
                  <h3>{testimonial.name}</h3>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReraTestimonials; 