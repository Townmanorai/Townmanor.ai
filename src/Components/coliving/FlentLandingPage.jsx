import React, { useState, useRef, useEffect } from 'react';
import './FlentLandingPageUniqueStyle.css';
import { FaShieldAlt, FaMoneyBillWave, FaStar, FaHome, FaChevronDown, FaCheckCircle, FaArrowDown, FaRegBuilding, FaBed, FaComments } from 'react-icons/fa';
import { MdApartment, MdHouse, MdLocationCity, MdOtherHouses } from 'react-icons/md';

const propertyTypes = [
  { label: 'Apartment', icon: <MdApartment /> },
  { label: 'House', icon: <MdHouse /> },
  { label: 'Condo', icon: <MdLocationCity /> },
  { label: 'Studio', icon: <MdOtherHouses /> },
];

const faqs = [
  {
    id: 'faq1',
    question: 'How does the guaranteed rent work?',
    answer: 'We guarantee your monthly rental income regardless of occupancy. Even if the property is vacant, you receive your agreed rental amount every month. This eliminates vacancy risk and provides consistent cash flow.'
  },
  {
    id: 'faq2',
    question: 'What properties do we accept?',
    answer: 'We accept various property types including apartments, houses, condos, and studios. Properties should be in good condition and located in desirable areas. Our team evaluates each property individually to ensure it meets our standards.'
  },
  {
    id: 'faq3',
    question: 'How long is the partnership contract?',
    answer: 'Our standard partnership contracts are typically 3-5 years, providing stability for both parties. This allows us to invest in premium furnishing and marketing while ensuring consistent returns for property owners.'
  },
  {
    id: 'faq4',
    question: 'Do you handle maintenance and repairs?',
    answer: 'Yes, we handle all maintenance and minor repairs as part of our service. For major structural issues, we coordinate with you and trusted contractors. Our goal is to keep your property in excellent condition while minimizing your involvement.'
  },
  {
    id: 'faq5',
    question: 'What makes your tenants "top 1%"?',
    answer: 'Our rigorous screening process includes credit checks, employment verification, previous landlord references, and personal interviews. We only accept tenants with excellent credit scores, stable income, and positive rental history.'
  },
  {
    id: 'faq6',
    question: 'How much can I expect to earn?',
    answer: 'Rental yields vary by location and property type, but our partners typically see 15-40% higher returns compared to traditional letting. We provide a detailed financial projection during the application process.'
  },
  {
    id: 'faq7',
    question: 'Can I visit my property during the partnership?',
    answer: 'Yes, you can schedule property visits with reasonable notice. We coordinate with tenants to ensure convenient access while respecting their privacy and tenancy rights.'
  },
  {
    id: 'faq8',
    question: 'What happens at the end of the contract?',
    answer: 'At contract end, you can choose to renew the partnership, take back the property with all improvements, or sell it. The premium furnishing and upgrades typically increase your property value significantly.'
  },
];

export default function FlentLandingPage() {
  // Dropdown state
  const [propertyType, setPropertyType] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // FAQ state
  const [openFAQ, setOpenFAQ] = useState(null);

  // Dropdown outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flent-unique-root">
      {/* Hero Section */}
      <section className="flent-unique-hero" style={{ backgroundImage: `url('https://readdy.ai/api/search-image?query=modern%20luxury%20apartment%20interior%20with%20warm%20lighting%2C%20contemporary%20furniture%2C%20large%20windows%20with%20city%20view%2C%20elegant%20living%20room%20with%20neutral%20colors%2C%20professional%20real%20estate%20photography%20style%2C%20high-end%20residential%20property%2C%20sophisticated%20home%20design%20with%20clean%20lines%20and%20premium%20finishes&width=1920&height=1080&seq=hero-bg&orientation=landscape')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="flent-unique-hero-overlay"></div>
        <div className="flent-unique-hero-content">
          <div className="flent-unique-hero-text">
            <h1>
              
              <span className="flent-unique-text-primary">Turn Your Property Into a Premium Rental with Townmanor</span>
            </h1>
            <p>
            Co-create beautiful, functional living spaces. We handle transformation, listings, and tenant experience—together
            </p>
            <button className="flent-unique-btn-primary">Apply Now</button>
          </div>
        </div>
      </section>

      {/* Why Choose Flent Section */}
      <section className="flent-unique-whychoose">
        <div className="flent-unique-whychoose-inner">
          <div className="flent-unique-whychoose-features">
            <h2>Why Choose Townmanor?</h2>
            <div className="flent-unique-feature-list">
              <div className="flent-unique-feature-item">
                <div className="flent-unique-feature-icon flent-unique-feature-icon-primary"><FaShieldAlt /></div>
                <div>
                  <h3>Premium Rent</h3>
                  <p>We give your rental income every month, regardless of occupancy. Your property earns consistently with zero vacancy risk.</p>
                </div>
              </div>
              <div className="flent-unique-feature-item">
                <div className="flent-unique-feature-icon flent-unique-feature-icon-secondary"><FaMoneyBillWave /></div>
                <div>
                  <h3>Zero Management Fee</h3>
                  <p>No hidden costs or management fees. We handle everything from tenant screening to maintenance while you keep maximum profits.</p>
                </div>
              </div>
              <div className="flent-unique-feature-item">
                <div className="flent-unique-feature-icon flent-unique-feature-icon-yellow"><FaStar /></div>
                <div>
                  <h3>Top 1% Tenant</h3>
                  <p>Our rigorous screening process ensures only the highest quality tenants. Professional, reliable, and respectful residents guaranteed.</p>
                </div>
              </div>
              <div className="flent-unique-feature-item">
                <div className="flent-unique-feature-icon flent-unique-feature-icon-purple"><FaHome /></div>
                <div>
                  <h3>Premium Furnishing</h3>
                  <p>We provide high-end furnishing and decor that attracts premium tenants and increases your property value significantly.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flent-unique-whychoose-imgwrap">
            <img src="https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/1752834819461-main3.jpeg" alt="Premium Property Interior" />
          </div>
        </div>
      </section>

      {/* Flent's Magic Section */}
      <section className="flent-unique-magic">
        <div className="flent-unique-magic-inner">
          <div className="flent-unique-magic-imgwrap">
            <img src="/afterbefore.png" alt="Property Transformation" />
          </div>
          <div className="flent-unique-magic-text">
            <h2>Townmanor Magic</h2>
            <p>We transform ordinary properties into extraordinary rental experiences. Our expert team handles everything from premium furnishing to tenant management, ensuring your property stands out in the competitive rental market.</p>
            <p>With our proven system, landlords see up to 40% higher rental yields compared to traditional letting.
As a fast-growing startup, property owners are already choosing Townmanor to elevate their rental income and simplify management.

.</p>
          </div>
        </div>
      </section>

      {/* Peek Into Flent World Section */}
      <section className="flent-unique-peek bg-dark">
        <div className="flent-unique-peek-inner">
          <h2>Peek Into TM Luxe World</h2>
          <div className="flent-unique-peek-gallery">
            <div className="flent-unique-peek-imgwrap">
              <img src="https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/1752745345050-main5.jpeg" alt="Kitchen" />
              <div className="flent-unique-peek-imgcaption">
                <h3>Bedroom</h3>
                <p>Premium Bedroom </p>
              </div>
            </div>
            <div className="flent-unique-peek-imgwrap">
              <img src="https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/1752749285674-main9.jpeg" alt="Kitchen" />
              <div className="flent-unique-peek-imgcaption">
                <h3>Washroom</h3>
                <p>Luxury Premium Washroom</p>
              </div>
            </div>
            <div className="flent-unique-peek-imgwrap">
              <img src="https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/1752838065543-image-1.png" alt="Living Area" />
              <div className="flent-unique-peek-imgcaption">
                <h3>Living Area</h3>
                <p>Comfortable & stylish</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="flent-unique-apply">
        <div className="flent-unique-apply-inner">
          <div className="flent-unique-apply-formwrap">
            <h2>Let's get started</h2>
            <p>Ready to maximize your property's potential? Fill out our application form and our team will contact you within 24 hours to discuss your property collaboration.</p>
            <form className="flent-unique-form">
              <div className="flent-unique-form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Enter your full name" />
              </div>
              <div className="flent-unique-form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="Enter your phone number" />
              </div>
              <div className="flent-unique-form-group">
                <label>Email Address</label>
                <input type="email" placeholder="Enter your email address" />
              </div>
              <div className="flent-unique-form-group">
                <label>Property Address</label>
                <input type="text" placeholder="Enter your property address" />
              </div>
              <div className="flent-unique-form-group" ref={dropdownRef}>
                <label>Property Type</label>
                <div className="flent-unique-dropdown-wrapper">
                  <button type="button" className="flent-unique-dropdown-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
                    <span>{propertyType || 'Select property type'}</span>
                    <FaChevronDown className={dropdownOpen ? 'flent-unique-dropdown-open' : ''} />
                  </button>
                  {dropdownOpen && (
                    <div className="flent-unique-dropdown-list">
                      {propertyTypes.map((t) => (
                        <button type="button" key={t.label} className="flent-unique-dropdown-option" onClick={() => { setPropertyType(t.label); setDropdownOpen(false); }}>
                          <span className="flent-unique-dropdown-icon">{t.icon}</span>
                          {t.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flent-unique-form-group">
                <label>Number of Bedrooms</label>
                <input type="number" placeholder="Enter number of bedrooms" min="0" />
              </div>
              <div className="flent-unique-form-group">
                <label>Additional Comments</label>
                <textarea placeholder="Tell us more about your property or any specific requirements"></textarea>
              </div>
              <button type="submit" className="flent-unique-btn-primary">Submit Application</button>
            </form>
          </div>
          <div className="flent-unique-apply-imgwrap">
            <img src="/landlord.png" alt="Property Investment Illustration" />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="flent-unique-faq">
        <div className="flent-unique-faq-inner">
          <h2>Frequently Asked Questions</h2>
          <div className="flent-unique-faq-list">
            {faqs.map(faq => (
              <div className="flent-unique-faq-item" key={faq.id}>
                <button className="flent-unique-faq-question" onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}>
                  <span>{faq.question}</span>
                  <FaChevronDown className={openFAQ === faq.id ? 'flent-unique-faq-open' : ''} />
                </button>
                <div className={openFAQ === faq.id ? 'flent-unique-faq-answer' : 'flent-unique-faq-answer flent-unique-faq-hidden'}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
