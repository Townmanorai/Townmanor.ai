import React, { useState } from 'react';
import './ReraFAQ.css';

const ReraFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What is RERA verification?',
      answer: 'RERA verification is the process of checking if a real estate project is registered with the Real Estate Regulatory Authority (RERA). This verification helps ensure that the project is legally compliant and provides protection to homebuyers.'
    },
    {
      question: 'Why is RERA verification important?',
      answer: 'RERA verification is crucial because it ensures that the project is legally registered, the developer is authorized to sell the property, and all necessary approvals are in place. It protects buyers from fraudulent projects and ensures transparency in real estate transactions.'
    },
    {
      question: 'What information do I need for RERA verification?',
      answer: 'You need either the project name or the RERA registration number to verify a property. The RERA registration number is a unique identifier assigned to each registered project.'
    },
    {
      question: 'How long does RERA verification take?',
      answer: 'RERA verification is typically completed within minutes. Our system checks the RERA database in real-time to provide you with instant results about the project\'s registration status.'
    },
    {
      question: 'Is RERA verification mandatory?',
      answer: 'Yes, RERA verification is mandatory for all real estate projects that meet the specified criteria. It ensures compliance with the Real Estate (Regulation and Development) Act, 2016, and protects the interests of homebuyers.'
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="townmanor-rera-faq-section">
      <div className="townmanor-rera-faq-container">
        <div className="townmanor-rera-faq-header">
          <h2>Frequently Asked Questions</h2>
          <p>Find answers to common questions about RERA verification</p>
        </div>

        <div className="townmanor-rera-faq-list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`townmanor-rera-faq-item ${activeIndex === index ? 'active' : ''}`}
            >
              <div
                className="townmanor-rera-faq-question"
                onClick={() => toggleFAQ(index)}
              >
                <h3>{faq.question}</h3>
                <span className="townmanor-rera-faq-icon">
                  {activeIndex === index ? '−' : '+'}
                </span>
              </div>
              {activeIndex === index && (
                <div className="townmanor-rera-faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReraFAQ; 