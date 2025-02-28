

// RentItWorks.jsx - Enhanced scroll behavior
import React from 'react';
import { motion } from 'framer-motion';
import './RentItWorks.css';
import { IoDocumentTextOutline, IoCloudUploadOutline, IoCreateOutline, IoDownloadOutline } from "react-icons/io5";

const stepVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 }
};

const RentItWorks = () => {
    const steps = [
        { icon: <IoDocumentTextOutline />, title: 'Fill Details', description: 'Enter property and party information in our simple form' },
        { icon: <IoCloudUploadOutline />, title: 'Upload Documents', description: 'Submit required documents for verification' },
        { icon: <IoCreateOutline />, title: 'Digital Signatures', description: 'Sign agreement electronically using secure digital signatures' },
        { icon: <IoDownloadOutline />, title: 'Download Agreement', description: 'Get your legally valid agreement instantly' },
      ];

  return (
    <section className="rent-how-it-works">
      <h2>Simple 4-Step Process</h2>
      <div className="rent-steps-container">
        {steps.map((step, index) => (
          <motion.div 
            key={index}
            className="rent-step"
            variants={stepVariants}
            viewport={{ once: false }}
          >
            <div key={index} className="rent-step">
            <div className="rent-step-icon">
              {step.icon}
            </div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RentItWorks;