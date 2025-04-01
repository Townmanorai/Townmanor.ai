import React from 'react';
import { motion } from 'framer-motion';
import LandVerification from './LandVerification';
import LandHowItWorks from './LandHowItWorks';
import LandFAQ from './LandFAQ';
import LandTestimonials from './LandTestimonials';
import LandAbout from './LandAbout';
import LandBenefits from './LandBenefits';
import './LandMainPage.css';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      staggerChildren: 0.3
    }
  }
};

function LandMainPage() {
  return (
    <div className="townmanor-land-main-container">
      {/* Hero Section */}
      <section className="townmanor-land-main-hero-section">
        <div className="townmanor-land-main-hero-content">
          <h1>Land Record Verification</h1>
          <p>Fast, reliable land verification services for your peace of mind</p>
          <a href="#verify-now" className="townmanor-land-main-cta-button">Verify Now</a>
        </div>
        <div className="townmanor-land-main-hero-image">
          <img src="https://s3.ap-south-1.amazonaws.com/townamnor.ai/extra-images/landverification.jpg" alt="Land Verification" />
        </div>
      </section>

      <LandBenefits />
      <LandHowItWorks />
      {/* Verification Tool Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-15%" }}
        variants={sectionVariants}
        id="verify-now"
      >
        <LandVerification />
      </motion.section>
      <LandTestimonials />

      <LandFAQ />
      <LandAbout />

      {/* CTA Section */}
      <section className="townmanor-land-main-cta-section">
        <div className="townmanor-land-main-cta-content">
          <h2>Ready to Verify Your Land Records?</h2>
          <p>Get started now and receive instant verification results</p>
          <a href="#verify-now" className="townmanor-land-main-cta-button">Verify Now</a>
        </div>
      </section>
    </div>
  );
}

export default LandMainPage; 