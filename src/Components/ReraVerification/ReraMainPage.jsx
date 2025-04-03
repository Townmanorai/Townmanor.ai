import React from 'react';
import { motion } from 'framer-motion';
import ReraVerification from './ReraVerification';
import ReraHowItWorks from './ReraHowItWorks';
import ReraFAQ from './ReraFAQ';
import ReraTestimonials from './ReraTestimonials';
import ReraAbout from './ReraAbout';
import ReraBenefits from './ReraBenefits';
import './ReraMainPage.css';

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

function ReraMainPage() {
  return (
    <div className="townmanor-rera-main-container">
      {/* Hero Section */}
      <section className="townmanor-rera-main-hero-section">
        <div className="townmanor-rera-main-hero-content">
          <h1>RERA Verification</h1>
          <p>Verify property registration status under RERA regulations</p>
          <a href="#verify-now" className="townmanor-rera-main-cta-button">Verify Now</a>
        </div>
        <div className="townmanor-rera-main-hero-image">
          <img src="/rera-verification-hero.png" alt="RERA Verification" />
        </div>
      </section>

      {/* Benefits Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-100px" }}
        variants={sectionVariants}
        className="townmanor-rera-main-benefits-section"
        id="benefits"
      >
        <div className="townmanor-rera-main-section-header">
          <h2>Why Verify Your Property Under RERA?</h2>
          <p>Ensure compliance and protect your investment</p>
        </div>
        <div className="townmanor-rera-main-benefits-grid">
          <div className="townmanor-rera-main-benefit-card">
            <div className="townmanor-rera-main-benefit-icon">
              <img src="/icons/security.png" alt="Security" />
            </div>
            <h3>Legal Compliance</h3>
            <p>Verify if your property is registered under RERA regulations</p>
          </div>
          <div className="townmanor-rera-main-benefit-card">
            <div className="townmanor-rera-main-benefit-icon">
              <img src="/icons/document.png" alt="Document" />
            </div>
            <h3>Project Details</h3>
            <p>Access accurate project information and completion status</p>
          </div>
          <div className="townmanor-rera-main-benefit-card">
            <div className="townmanor-rera-main-benefit-icon">
              <img src="/icons/time.png" alt="Time" />
            </div>
            <h3>Quick Verification</h3>
            <p>Get instant verification without visiting RERA offices</p>
          </div>
          <div className="townmanor-rera-main-benefit-card">
            <div className="townmanor-rera-main-benefit-icon">
              <img src="/icons/accuracy.png" alt="Accuracy" />
            </div>
            <h3>100% Accuracy</h3>
            <p>Direct integration with RERA databases for reliable results</p>
          </div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-20%" }}
        variants={sectionVariants}
        id="how-it-works"
      >
        <div className="townmanor-rera-main-section-header">
          <h2>How It Works</h2>
          <p>Simple 3-step process to verify your property under RERA</p>
        </div>
        <div className="townmanor-rera-main-steps-container">
          <div className="townmanor-rera-main-step">
            <div className="townmanor-rera-main-step-number">1</div>
            <h3>Enter Details</h3>
            <p>Provide property and project information</p>
          </div>
          <div className="townmanor-rera-main-step-arrow">→</div>
          <div className="townmanor-rera-main-step">
            <div className="townmanor-rera-main-step-number">2</div>
            <h3>Verify</h3>
            <p>Our system checks RERA records instantly</p>
          </div>
          <div className="townmanor-rera-main-step-arrow">→</div>
          <div className="townmanor-rera-main-step">
            <div className="townmanor-rera-main-step-number">3</div>
            <h3>Get Results</h3>
            <p>Download verification report with official details</p>
          </div>
        </div>
      </motion.section>

      {/* Verification Tool Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-15%" }}
        variants={sectionVariants}
        id="verify-now"
      >
        <ReraVerification />
      </motion.section>

      {/* Testimonials Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-10%" }}
        variants={sectionVariants}
        className="townmanor-rera-main-testimonials-section"
        id="testimonials"
      >
        <div className="townmanor-rera-main-section-header">
          <h2>What Our Users Say</h2>
          <p>Trusted by thousands of property buyers across India</p>
        </div>
        <div className="townmanor-rera-main-testimonials-grid">
          <div className="townmanor-rera-main-testimonial-card">
            <div className="townmanor-rera-main-testimonial-content">
              <p>"The RERA verification service helped me confirm the legal status of my property. Very reliable!"</p>
            </div>
            <div className="townmanor-rera-main-testimonial-author">
              <img src="/testimonials/user1.jpg" alt="Amit Patel" />
              <div>
                <h4>Amit Patel</h4>
                <p>Mumbai</p>
              </div>
            </div>
          </div>
          <div className="townmanor-rera-main-testimonial-card">
            <div className="townmanor-rera-main-testimonial-content">
              <p>"Quick and accurate verification. Saved me from investing in a non-compliant project."</p>
            </div>
            <div className="townmanor-rera-main-testimonial-author">
              <img src="/testimonials/user2.jpg" alt="Priya Sharma" />
              <div>
                <h4>Priya Sharma</h4>
                <p>Delhi</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={sectionVariants}
        className="townmanor-rera-main-faq-section"
        id="faq"
      >
        <div className="townmanor-rera-main-section-header">
          <h2>Frequently Asked Questions</h2>
          <p>Find answers to common questions about RERA verification</p>
        </div>
        <div className="townmanor-rera-main-faq-list">
          <div className="townmanor-rera-main-faq-item">
            <div className="townmanor-rera-main-faq-question">
              <h3>What is RERA verification?</h3>
            </div>
            <div className="townmanor-rera-main-faq-answer">
              <p>RERA verification confirms if a property project is registered under the Real Estate Regulatory Authority (RERA) Act, ensuring legal compliance and buyer protection.</p>
            </div>
          </div>
          <div className="townmanor-rera-main-faq-item">
            <div className="townmanor-rera-main-faq-question">
              <h3>Why is RERA verification important?</h3>
            </div>
            <div className="townmanor-rera-main-faq-answer">
              <p>RERA verification ensures that your property investment is legally compliant and protected under the RERA Act, preventing potential legal issues in the future.</p>
            </div>
          </div>
          <div className="townmanor-rera-main-faq-item">
            <div className="townmanor-rera-main-faq-question">
              <h3>What information do I need for verification?</h3>
            </div>
            <div className="townmanor-rera-main-faq-answer">
              <p>You need basic project details like project name, location, and RERA registration number (if available). Our system will verify these against official RERA records.</p>
            </div>
          </div>
          <div className="townmanor-rera-main-faq-item">
            <div className="townmanor-rera-main-faq-question">
              <h3>How long does the verification process take?</h3>
            </div>
            <div className="townmanor-rera-main-faq-answer">
              <p>Most verifications are completed within 2-3 minutes, depending on the server response time from RERA databases.</p>
            </div>
          </div>
          <div className="townmanor-rera-main-faq-item">
            <div className="townmanor-rera-main-faq-question">
              <h3>Is the verification report legally valid?</h3>
            </div>
            <div className="townmanor-rera-main-faq-answer">
              <p>Yes, our verification reports can be used for preliminary legal purposes. For court proceedings, you may need to obtain certified copies from RERA offices.</p>
            </div>
          </div>
          <div className="townmanor-rera-main-faq-item">
            <div className="townmanor-rera-main-faq-question">
              <h3>Which states are currently supported?</h3>
            </div>
            <div className="townmanor-rera-main-faq-answer">
              <p>We currently support all major states with active RERA authorities. The list is regularly updated as new states implement RERA regulations.</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={sectionVariants}
        className="townmanor-rera-main-about-section"
        id="about"
      >
        <div className="townmanor-rera-main-section-header">
          <h2>About Our RERA Verification Service</h2>
          <p>Trusted partner for property verification across India</p>
        </div>
        <div className="townmanor-rera-main-about-content">
          <div className="townmanor-rera-main-about-text">
            <p>Our RERA verification service provides a comprehensive solution for verifying property registration status under RERA regulations. With direct integration to RERA databases, we ensure that you receive accurate and up-to-date information about any property project.</p>
            <p>We understand the importance of due diligence in property transactions, which is why we've created a simple, efficient platform that anyone can use to verify RERA compliance within minutes.</p>
            <p>Our team of experts in real estate law and technology work together to provide a seamless verification experience. Whether you're a property buyer, seller, or investor, our service helps you make informed decisions with confidence.</p>
          </div>
          <div className="townmanor-rera-main-stats-grid">
            <div className="townmanor-rera-main-stat">
              <h3>50,000+</h3>
              <p>Verifications Completed</p>
            </div>
            <div className="townmanor-rera-main-stat">
              <h3>98%</h3>
              <p>Customer Satisfaction</p>
            </div>
            <div className="townmanor-rera-main-stat">
              <h3>28</h3>
              <p>States Covered</p>
            </div>
            <div className="townmanor-rera-main-stat">
              <h3>24/7</h3>
              <p>Customer Support</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <section className="townmanor-rera-main-cta-section">
        <div className="townmanor-rera-main-cta-content">
          <h2>Ready to Verify Your Property Under RERA?</h2>
          <p>Get started now and receive instant verification results</p>
          <a href="#verify-now" className="townmanor-rera-main-cta-button">Verify Now</a>
        </div>
      </section>
    </div>
  );
}

export default ReraMainPage; 