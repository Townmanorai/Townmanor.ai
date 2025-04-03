import React, { useState } from 'react';
import './ReraFAQ.css';

const faqs = [
  {
    question: 'What is RERA verification?',
    answer: 'RERA verification confirms if a property project is registered under the Real Estate Regulatory Authority (RERA) Act, ensuring legal compliance and buyer protection.'
  },
  {
    question: 'Why is RERA verification important?',
    answer: 'RERA verification ensures that your property investment is legally compliant and protected under the RERA Act, preventing potential legal issues in the future.'
  },
  {
    question: 'What information do I need for verification?',
    answer: 'You need basic project details like project name, location, and RERA registration number (if available). Our system will verify these against official RERA records.'
  },
  {
    question: 'How long does the verification process take?',
    answer: 'Most verifications are completed within 2-3 minutes, depending on the server response time from RERA databases.'
  },
  {
    question: 'Is the verification report legally valid?',
    answer: 'Yes, our verification reports can be used for preliminary legal purposes. For court proceedings, you may need to obtain certified copies from RERA offices.'
  },
  {
    question: 'Which states are currently supported?',
    answer: 'We currently support all major states with active RERA authorities. The list is regularly updated as new states implement RERA regulations.'
  }
];

function ReraFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
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
            <div key={index} className="townmanor-rera-faq-item">
              <button
                className={`townmanor-rera-faq-question ${openIndex === index ? 'active' : ''}`}
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <h3>{faq.question}</h3>
                <span className="townmanor-rera-faq-icon">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              <div
                className={`townmanor-rera-faq-answer ${openIndex === index ? 'active' : ''}`}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="townmanor-rera-faq-support">
          <p>Still have questions?</p>
          <button className="townmanor-rera-faq-contact-button">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}

export default ReraFAQ; 