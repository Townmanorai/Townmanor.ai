import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from 'react-icons/fa';
import './LandFAQ.css';

const LandFAQ = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What documents do I need for land verification?",
      answer: "You need basic information about the land including location details (state, district, taluka, village) and owner name. No physical documents are required for the initial verification."
    },
    {
      question: "How accurate are the verification results?",
      answer: "Our verification results are 100% accurate as they are sourced directly from government databases. We use secure API connections to ensure data reliability."
    },
    {
      question: "How long does the verification process take?",
      answer: "Most verifications are completed within 2-3 minutes. The process is fully automated and provides instant results."
    },
    {
      question: "Which states are supported for land verification?",
      answer: "Currently, we support land verification for Gujarat, Madhya Pradesh, and Karnataka. We are continuously expanding our coverage to include more states."
    },
    {
      question: "Is the verification report legally valid?",
      answer: "Yes, our verification reports are generated using official government data and are legally valid. They can be used for various purposes including property transactions."
    },
    {
      question: "What if I can't find my land details?",
      answer: "If you can't find your land details, please ensure you've entered the correct information. You can also contact our support team for assistance."
    }
  ];

  return (
    <section className="townmanor-land-faq-section">
      <div className="townmanor-land-faq-container">
        <div className="townmanor-land-faq-header">
          <FaQuestionCircle className="townmanor-land-faq-header-icon" />
          <h2>Frequently Asked Questions</h2>
          <p>Find answers to common questions about land verification</p>
        </div>

        <div className="townmanor-land-faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="townmanor-land-faq-item">
              <button
                className={`townmanor-land-faq-question ${expandedFaq === index ? 'expanded' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <span>{faq.question}</span>
                {expandedFaq === index ? (
                  <FaChevronUp className="townmanor-land-faq-icon" />
                ) : (
                  <FaChevronDown className="townmanor-land-faq-icon" />
                )}
              </button>
              <div className={`townmanor-land-faq-answer ${expandedFaq === index ? 'expanded' : ''}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="townmanor-land-faq-support">
          <h3>Still have questions?</h3>
          <p>Our support team is here to help you with any queries about land verification</p>
          <button className="townmanor-land-faq-contact-button">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};

export default LandFAQ; 