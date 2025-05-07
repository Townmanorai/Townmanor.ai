import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Coliving_space.css';
import { FaUsers, FaBed, FaHome, FaCheck, FaArrowRight } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

function Coliving_space() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle modal open/close
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  // Handle info modal open/close
  const openInfoModal = () => setIsInfoModalOpen(true);
  const closeInfoModal = () => setIsInfoModalOpen(false);
  
  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Name:', name, 'Email:', email);
    closeModal();
  };

  // Toggle read more
  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const firstParagraph = "Experience a new way of living with our premium co-living spaces, designed for comfort and convenience in prime locations near major hubs. Enjoy fully furnished rooms with modern interiors, high-speed WiFi, and regular housekeeping services.";
  
  const secondParagraph = "Connect with like-minded individuals through vibrant community events and networking opportunities. Live, work, and unwind with access to yoga and studio spaces—all under one roof.";

  return (
    <>
      {/* Hero Section */}
      <div className="coliving-hero-section">
      <div className="container ">
        <div className="coliving-hero-bg" style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20co-living%20space%20interior%20with%20soft%20natural%20light%2C%20minimalist%20design%2C%20large%20windows%2C%20communal%20areas%20with%20comfortable%20furniture%2C%20plants%2C%20and%20a%20warm%20welcoming%20atmosphere%2C%20blending%20into%20a%20light%20blue%20gradient%20on%20the%20left%20side%20for%20text%20overlay&width=1440&height=800&seq=hero-bg-1&orientation=landscape')`
        }}></div>
        <div className="coliving-hero-gradient"></div>
        <div className="container coliving-hero-content">
          <div className="coliving-hero-text">
            <h2 className={`coliving-heading ${isLoaded ? "loaded" : ""}`}>
              We Are Coming Soon!
            </h2>
            <div className={`coliving-paragraph ${isLoaded ? "loaded" : ""}`}>
              {isMobile ? (
                <>
                  <p>
                    {firstParagraph.slice(0, isExpanded ? undefined : 100)}
                    {!isExpanded && firstParagraph.length > 100 && "..."}
                  </p>
                  {isExpanded && (
                    <p className="mt-3">
                      {secondParagraph}
                    </p>
                  )}
                  <button 
                    className="read-more-btn" 
                    onClick={toggleReadMore}
                  >
                    {isExpanded ? "Read Less" : "Read More"}
                  </button>
                </>
              ) : (
                <>
                  <p>{firstParagraph}</p>
                  <p>{secondParagraph}</p>
                </>
              )}
            </div>
            <div className={`coliving-buttons ${isLoaded ? "loaded" : ""}`}>
              <button className="coliving-primary-btn" onClick={openModal}>
                Join the Waitlist
              </button>
              <button className="coliving-secondary-btn" onClick={openInfoModal}>
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
      {/* Features Section */}
      <div className="coliving-features-section">
        <div className="container">
          <div className="coliving-features-heading">
            <h2>Our <b>Living</b> Options</h2>
            <p>
              Choose the perfect living arrangement that suits your lifestyle
              and preferences.
            </p>
            <button 
              className="coliving-primary-btn" 
              onClick={() => navigate('/rental-listings')}
              style={{ marginTop: '20px' }}
            >
              View All Rental Listings
            </button>
          </div>
          <div className="coliving-cards">
            {/* Card 1 */}
            <div className="coliving-card">
              <div className="coliving-card-image">
                <img
                  src="https://readdy.ai/api/search-image?query=Modern%20co-living%20shared%20apartment%20with%20communal%20kitchen%20and%20living%20space%2C%20stylish%20furniture%2C%20plants%2C%20and%20warm%20lighting%2C%20showing%20multiple%20private%20rooms%20connected%20to%20common%20areas%2C%20clean%20and%20contemporary%20design&width=600&height=400&seq=coliving-1&orientation=landscape"
                  alt="Co-Living Spaces"
                />
                <div className="join-waitlist-sticker">
                  <span>Join Waitlist!</span>
                </div>
              </div>
              <div className="coliving-card-content">
                <div className="coliving-card-header">
                  <div className="coliving-card-icon blue">
                    <FaUsers />
                  </div>
                  <h3>Co-Living Spaces</h3>
                </div>
                <p className="coliving-card-description">
                  Shared apartments with premium amenities.
                </p>
                <ul className="coliving-card-list">
                  <li>
                    <FaCheck className="check-icon" />
                    <span>Private bedroom in shared apartment</span>
                  </li>
                  <li>
                    <FaCheck className="check-icon" />
                    <span>Access to common areas and kitchen</span>
                  </li>
                  <li>
                    <FaCheck className="check-icon" />
                    <span>Community events and activities</span>
                  </li>
                </ul>
                <button className="coliving-link-btn blue" onClick={openInfoModal}>
                  Learn more <FaArrowRight className="arrow-icon" />
                </button>
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="coliving-card">
              <div className="coliving-card-image">
                <img
                  src="https://readdy.ai/api/search-image?query=Modern%20PG%20accommodation%20with%20private%20bedroom%2C%20study%20desk%2C%20comfortable%20bed%2C%20and%20basic%20amenities%2C%20showing%20a%20compact%20but%20well-designed%20living%20space%20with%20storage%20solutions%2C%20clean%20and%20functional%20interior%20design&width=600&height=400&seq=pg-2&orientation=landscape"
                  alt="PG Comforts"
                />
                <div className="join-waitlist-sticker">
                  <span>Join Waitlist!</span>
                </div>
              </div>
              <div className="coliving-card-content">
                <div className="coliving-card-header">
                  <div className="coliving-card-icon purple">
                    <FaBed />
                  </div>
                  <h3>PG Comforts</h3>
                </div>
                <p className="coliving-card-description">
                  Affordable, fully managed private rooms.
                </p>
                <ul className="coliving-card-list">
                  <li>
                    <FaCheck className="check-icon" />
                    <span>Fully furnished private room</span>
                  </li>
                  <li>
                    <FaCheck className="check-icon" />
                    <span>Regular housekeeping services</span>
                  </li>
                  <li>
                    <FaCheck className="check-icon" />
                    <span>Meals and laundry options</span>
                  </li>
                </ul>
                <button className="coliving-link-btn purple" onClick={openInfoModal}>
                  Learn more <FaArrowRight className="arrow-icon" />
                </button>
              </div>
            </div>
            
            {/* Card 3 */}
            <div className="coliving-card">
              <div className="coliving-card-image">
                <img
                  src="https://readdy.ai/api/search-image?query=Luxury%20studio%20apartment%20with%20modern%20minimalist%20design%2C%20full%20kitchenette%2C%20sleeping%20area%2C%20and%20living%20space%20in%20one%20open%20concept%20room%2C%20large%20windows%20with%20natural%20light%2C%20high-end%20finishes%2C%20and%20smart%20home%20features%2C%20elegant%20and%20sophisticated&width=600&height=400&seq=suite-3&orientation=landscape"
                  alt="Studio & Suites"
                />
                <div className="coming-soon-sticker">
                  <span>Opening Very Soon!</span>
                </div>
              </div>
              <div className="coliving-card-content">
                <div className="coliving-card-header">
                  <div className="coliving-card-icon teal">
                    <FaHome />
                  </div>
                  <h3>Studio & Suites</h3>
                </div>
                <p className="coliving-card-description">
                  Private studio living with all essentials.
                </p>
                <ul className="coliving-card-list">
                  <li>
                    <FaCheck className="check-icon" />
                    <span>Self-contained private living space</span>
                  </li>
                  <li>
                    <FaCheck className="check-icon" />
                    <span>Kitchenette and private bathroom</span>
                  </li>
                  <li>
                    <FaCheck className="check-icon" />
                    <span>Premium furnishings and amenities</span>
                  </li>
                </ul>
                <button className="coliving-link-btn teal" onClick={openInfoModal}>
                  Learn more <FaArrowRight className="arrow-icon" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="coliving-signup-box">
            <div className="coliving-signup-text">
              <h3>Be the first to know when we launch</h3>
              <p>
                Join our waitlist to receive exclusive early access and special
                offers when we open our doors.
              </p>
            </div>
            <div className="coliving-signup-form">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button onClick={openModal}>Join Waitlist</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for signup */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Sign up</h2>
              <button onClick={closeModal}><RxCross2/></button>
            </div>
            <form className="coliving-model" onSubmit={handleFormSubmit}>
              <div className="modal-form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="modal-input"
                />
              </div>
              <div className="modal-form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="modal-input"
                />
              </div>
              <button type="submit" className="submitbutton_">Submit</button>
            </form>
          </div>
        </div>
      )}
      
      {/* Info Modal for "Coming Soon" */}
      {isInfoModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Coming Soon!</h2>
              <button onClick={closeInfoModal}><RxCross2/></button>
            </div>
            <div className="info-modal-content">
              <p>We're working hard to bring you more information about our living options.</p>
              <p>Please join our waitlist to receive updates when more details become available.</p>
              <button onClick={() => {
                closeInfoModal();
                setTimeout(() => openModal(), 300);
              }} className="submitbutton_">Join Waitlist</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Coliving_space;