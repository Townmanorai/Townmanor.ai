import React, { useState } from "react";
import "./FaqComponent.css";
import { IoIosArrowDown } from "react-icons/io";
const FaqComponent = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h1 className="faq-title">Frequently Asked Questions</h1>
      <p className="faq-subtitle">
        Find answers to common questions about our products and services
      </p>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div className="faq-item" key={index}>
            <button
              className="faq-question"
              onClick={() => toggleFaq(index)}
            >
              <p id="faq_ques">{faq.question}</p>
              <IoIosArrowDown
              style={{
                color:'black'
              }}
                className={`faq-icon ${openIndex === index ? "faq-rotate" : ""}`}
              />
            </button>
            <div className={`faq-answer ${openIndex === index ? "faq-show" : ""}`}>
              {faq.answer}
              <div className="faq-feedback">
                <p className="faq-feedback-text">Was this helpful?</p>
                <button className="faq-button faq-button-yes">Yes</button>
                <button className="faq-button faq-button-no">No</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqComponent;
