import React from 'react';
import "./ClientsSay.css";
import "../common.css";
import "../commonsecond.css";

const ClientSay = () => {
  const testimonials = [
    {
      image: "./cm-img1.webp",
      text: "I was nervous about my home loan, but Townmanor made it simple and stress-free.",
      name: "Priya Dasn",
      role: "Property Owner",
    },
    {
      image: "./cm-img2.webp",
      text: "Townmanor helped me find my dream home with clear, honest advice.",
      name: "Sarah Kapoor",
      role: "Property Owner",
    },
    {
      image: "./cm-img3.webp",
      text: "Selling my property was easy and fair—I truly appreciate their support.",
      name: "Vikram Singh",
      role: "Property Owner",
    },
    {
      image: "./cm-img4.webp",
      text: "Their team is genuine and caring. I felt supported every step of the way.",
      name: "John Doe",
      role: "Property Owner",
    },
  ];

  return (
    <section className="cs-testimonial-sec cs-section-padding cs-widget_edit_enabled">
      <div className="cs-container cs-text-center">
        <h3 className="cs-testi_title">Testimonials</h3>
      </div>
      <div className="cs-testimonial-gb cs-client-say">
        <div className="container">
          <div className="cs-container">
          <div className="cs-testimonial-grid">
            {testimonials.map((testimonial, index) => (
              <div className="cs-comment-info" key={index}>
                <p>{testimonial.text}</p>
                <div className="cs-cm-info-sec">
                  <div className="cs-cm-info">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="cs-cm-small-img"
                    />
                    <div className="cs-cm-name-role">
                      <h3>{testimonial.name} /</h3>
                      <h4>{testimonial.role}</h4>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientSay;
