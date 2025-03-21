import React, { useState } from 'react';
import './RentFAQ.css';

const faqs = [
  {
    question: 'Is this agreement official?',
    answer: 'Yes, our agreements meet all required standards and become recognized once signed online.'
  },
  {
    question: 'Can I customize my agreement?',
    answer: 'Absolutely! You can modify details to suit your specific rental needs.'
  },
  {
    question: 'How secure is my data?',
    answer: 'We use industry-standard encryption to ensure your data is protected at all times.'
  },
  {
    question: 'How long does it take to create an agreement?',
    answer: 'Just a few minutes from start to finish.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, debit cards, and digital wallets.'
  }
];

const RentFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="rent-faq">
      <h2>Frequently Asked Questions</h2>
      <div className="rent-faq-container">
        {faqs.map((faq, index) => (
          <div key={index} className="rent-faq-item">
            <div 
              className="rent-faq-question" 
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
            </div>
            {activeIndex === index && (
              <div className="rent-faq-answer">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default RentFAQ;
