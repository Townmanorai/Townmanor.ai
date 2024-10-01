import React, { useState } from 'react';
import './PayHouseTaxOnline.css';

const PayHouseTaxOnline = () => {
    const [expandedFaq, setExpandedFaq] = useState(null);

    const toggleFaq = (index) => {
        setExpandedFaq(expandedFaq === index ? null : index); // Toggle FAQ
    };

    const faqs = [
        { 
            question: "How do I pay house tax online?", 
            answer: "To pay your house tax online, select your city, enter your property ID, and click the 'Pay Now' button." 
        },
        { 
            question: "What documents are required for house tax payment?", 
            answer: "You will need your property ID and any previous tax payment receipts for verification." 
        },
        { 
            question: "Is there any penalty for late house tax payments?", 
            answer: "Yes, penalties may apply if the house tax is not paid by the due date. Check with your local authorities for specific details." 
        },
        { 
            question: "Can I pay house tax in installments?", 
            answer: "Some cities allow house tax to be paid in installments. Check your city’s house tax portal for more information." 
        }
    ];

    return (
        <>
            <div className="pay-house-tax-page">
                <h2 className="pay-house-tax-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img
                        src="/house-tax.jpeg"
                        alt="Pay House Tax Online"
                        style={{
                            width: '50px',
                            height: '50px',
                            marginRight: '10px',
                            borderRadius: '15px',
                        }}
                    />
                    Pay House Tax Online
                </h2>
                
                <div className="pay-house-tax-content">
                    <p style={{ textAlign: 'center' }}>
                        Quickly pay your house tax online. Please select your city or enter your property ID below.
                    </p>
                    
                    <div className="city-selection-container" style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                        <select style={{ padding: '10px', borderRadius: '5px', marginRight: '10px' }}>
                            <option value="">Select City</option>
                            <option value="city1">Lucknow</option>
                            <option value="city2">Kanpur</option>
                            <option value="city1">Varanasi</option>
                            <option value="city2">Agra</option>
                            <option value="city1">Mathura</option>
                        </select>
                        <input 
                            type="text" 
                            placeholder="Enter Property ID" 
                            style={{ padding: '10px', borderRadius: '5px' }}
                        />
                        <button style={{ padding: '10px 20px', marginLeft: '10px', borderRadius: '5px' }}>Pay Now</button>
                    </div>
                </div>
            </div>

            {/* FAQs Section */}
            <div className="faq-section">
                <h3>Frequently Asked Questions</h3>
                {faqs.map((faq, index) => (
                    <div key={index} className="faq-item">
                        <div 
                            className="faq-question" 
                            onClick={() => toggleFaq(index)}
                            style={{ cursor: 'pointer' }}
                        >
                            {faq.question}
                        </div>
                        {expandedFaq === index && (
                            <div className="faq-answer">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default PayHouseTaxOnline;
