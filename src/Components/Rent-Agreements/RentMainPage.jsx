// RentMainPage.jsx - Updated with proper scroll behavior
import React from 'react';
import { motion } from 'framer-motion';
import RentSection from './RentSection';
import RentItWorks from './RentItWorks';
import RentPricing from './RentPricing';
import RentFAQ from './RentFAQ';
import RentTestimonials from './RentTestimonials';
import RentAbout from './RentAbout';
import RentFeatures from './RentFeatures';

import './RentMainPage.css';
import RentUserDetailsForm from './RentUserDetailsForm';
import RentAgreementHowTo from './RentAgreementHowTo';

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

function RentMainPage() {
  return (
    <div className="rent-main-container">
      <RentSection />
        <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-20%" }}
        variants={sectionVariants}
      >
        <RentAgreementHowTo/>
      </motion.section>
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-100px" }}
        variants={sectionVariants}
      >
        <RentFeatures />
      </motion.section>
     
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-20%" }}
        variants={sectionVariants}
      >
        <RentItWorks />
      </motion.section>

      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-15%" }}
        variants={sectionVariants}
      >
        <RentPricing />
      </motion.section>

      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-10%" }}
        variants={sectionVariants}
      >
        <RentTestimonials />
      </motion.section>
      
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={sectionVariants}
      >
        <RentUserDetailsForm />
      </motion.section>

      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={sectionVariants}
      >
        <RentFAQ />
      </motion.section>

      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={sectionVariants}
      >
        <RentAbout />
      </motion.section>

      
    </div>
  );
}

export default RentMainPage;