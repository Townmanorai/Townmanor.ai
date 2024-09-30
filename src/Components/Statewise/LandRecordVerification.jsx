import React, { useState } from 'react';
import './LandRecordVerification.css';

const LandRecordVerification = () => {
    const [expandedFaq, setExpandedFaq] = useState(null);

    const toggleFaq = (index) => {
        setExpandedFaq(expandedFaq === index ? null : index);
    };

    const dummyLandRecordData = [
        { 
            recordId: 'LR1234', 
            owner: 'John Doe', 
            location: '123 Main St, Cityville', 
            status: 'Verified' 
        },
        { 
            recordId: 'LR5678', 
            owner: 'Jane Smith', 
            location: '456 Oak Dr, Townsville', 
            status: 'Pending' 
        }
    ];

    const faqs = [
        { 
            question: "How do I verify land records online?", 
            answer: "To verify land records, enter your land record ID or search by property location." 
        },
        { 
            question: "What information is needed to verify land records?", 
            answer: "You will need the land record ID, property address, or owner's name to verify land records." 
        },
        { 
            question: "Is the online land record verification legally valid?", 
            answer: "Yes, the online verification is valid, but it is recommended to consult with local authorities for official documentation." 
        },
        { 
            question: "Can I update incorrect land record details?", 
            answer: "Yes, if there are discrepancies, you can request an update through your local land records office." 
        }
    ];

    return (
        <>
            <div className="land-record-verification-page">
                <h2 className="land-record-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img
                        src="/lang-veri-images.png"
                        alt="Land Record Verification"
                        style={{
                            width: '50px',
                            height: '50px',
                            marginRight: '10px',
                            borderRadius: '15px',
                        }}
                    />
                    Land Record Verification
                </h2>
                
                <div className="land-record-content">
                    <p style={{ textAlign: 'center' }}>
                        Verify your land records online. Enter the land record ID or property location below.
                    </p>
                    
                    <div className="land-record-input-container" style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                        <input 
                            type="text" 
                            placeholder="Enter Land Record ID" 
                            style={{ padding: '10px', borderRadius: '5px', marginRight: '10px' }}
                        />
                        <button style={{ padding: '10px 20px', borderRadius: '5px' }}>Verify Now</button>
                    </div>

                    {/* Dummy land record details */}
                    {/* <div className="land-record-details">
                        <h3>Recent Land Records</h3>
                        {dummyLandRecordData.map((record, index) => (
                            <div key={index} className="land-record-item">
                                <strong>Record ID:</strong> {record.recordId} <br />
                                <strong>Owner:</strong> {record.owner} <br />
                                <strong>Location:</strong> {record.location} <br />
                                <strong>Status:</strong> {record.status}
                            </div>
                        ))}
                    </div> */}
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

export default LandRecordVerification;
