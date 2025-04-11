import React, { useState } from 'react'
import { FaUser } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import './OwnerBanner.css'
import { MdEmail, MdPhone } from "react-icons/md";
function OwnerBanner() {
    const dummyImages = [
        "/Bikaner.jpg",
        "/Indore.jpg",
        "/Kadapa.jpg",
        "/Rohini.png",
        "/Durgapur.jpg",
        "/Indore.jpg",
        "/Kadapa.jpg",
        "/Rohini.png",
        "/Durgapur.jpg"
    ];
    const [modal, setModal] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const openModal = (index) => {
        setCurrentImageIndex(index);
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => 
            prev === dummyImages.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => 
            prev === 0 ? dummyImages.length - 1 : prev - 1
        );
    };

    // Handle keyboard navigation
    React.useEffect(() => {
        const handleKeyDown = (e) => {
            if (!modal) return;
            
            switch (e.key) {
                case 'ArrowLeft':
                    prevImage();
                    break;
                case 'ArrowRight':
                    nextImage();
                    break;
                case 'Escape':
                    closeModal();
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [modal]);

    return (
        <>
            <div className="ui-body__container">
                <div className="ui-property__header">
                    <div>
                        <p className="ui-property__breadcrumbs">
                            Property in Gurgaon / Property in Sector37C / 4 BHK Flat for Sale in Imperia The Esfera
                        </p>
                        <h1 className="ui-property__title">
                            4 BHK Flat for Sale in Imperia The Esfera
                        </h1>
                        <p className="ui-property__subtitle">Sector37C, Gurgaon</p>
                        <p className="ui-property__building">Building: Imperia The Esfera</p>

                        <div className="ui-property__badges">
                            <span className="ui-property__badge ui-property__badge--green">RERA</span>
                            <span className="ui-property__badge ui-property__badge--blue">0% Brokerage</span>
                        </div>
                    </div>
                    <div className="ui-price-box mobile_view">
                        <h2 className="ui-price-box__price">₹ 2.10 Cr</h2>
                        <p className="ui-price-box__rate">₹ 8077 / Sq.ft</p>
                        <div className="ui-agent__card">
                            <FaUser className="ui-agent__icon" />
                            <div className="ui-agent__info">
                                <p className="ui-agent__name">Suresh Kumar</p>
                                <p className="ui-agent__label">Agent</p>
                            </div>
                        </div>
                        <button className="ui-contact__btn">Connect Now</button>
                    </div>
                </div>
               
                <div className="ui-property__main">
                    <div className="ui-property__image-section">
                        <img
                            src={dummyImages[0]}
                            alt="Property"
                            className="ui-property__main-image"
                            onClick={() => openModal(0)}
                        />
                        <div className="ui-property__thumbnail-list">
                            {dummyImages.slice(1, 4).map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="ui-property_secondaryimage"
                                    onClick={() => openModal(index + 1)}
                                />
                            ))}

                            {dummyImages.length > 4 && (
                                <div 
                                    className="ui-thumbnail__overlay"
                                    onClick={() => openModal(4)}
                                >
                                    <img
                                        src={dummyImages[4]}
                                        alt="More thumbnails"
                                        className="ui-property_secondaryimage"
                                    />
                                    <div className="ui-thumbnail__overlay-text">
                                        +{dummyImages.length - 4}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* <div className="ui-price-box desk_view">
                        <div>
                        <h2 className="ui-price-box__price">₹ 2.10 Cr</h2>
                        <p className="ui-price-box__rate">₹ 8077 / Sq.ft</p>
                        </div>
                        <div>
                        <div className="ui-agent__card">
                            <FaUser className="ui-agent__icon" />
                            <div className="ui-agent__info">
                                <p className="ui-agent__name">Suresh Kumar</p>
                                <p className="ui-agent__label">Agent</p>
                            </div>
                        </div>
                        <button className="ui-contact__btn">Connect Now</button>
                        </div>
                    </div> */}
                    <div className="mpac-container desk_view">
      <div className="mpac-price-section">
        <p className="mpac-price">₹ <span>4.25 Cr</span></p>
        <p className="mpac-rate">₹ 20238 / Sq.ft</p>
      </div>

      <div className="mpac-user-card">
        <div className="mpac-user-avatar">
          <FaUserAlt size={40} color="#ccc" />
        </div>
        <div className="mpac-user-info">
          <p className="mpac-user-name">Ravindra Nath Jha</p>
          <p className="mpac-user-role">Owner</p>
          <a>Connect Now</a>
        </div>
       
      </div>
     
    </div>

                    <div className="ui-property__info-card">


                        <div className="ui-config__details">
                            <ul className="ui-config__list">
                                <li><strong>Configuration:</strong> 4 BHK Flat</li>
                                <li><strong>Area:</strong> 2600 Sq.ft</li>
                                <li><strong>Possession:</strong> Ready To Move</li>
                                <li><strong>Property Age:</strong> February 2025</li>
                                <li><strong>Bedroom:</strong> 4</li>
                                <li><strong>Bathroom:</strong> 4</li>
                                <li><strong>Balcony:</strong> 4</li>
                                <li><strong>Floor Number:</strong> 10 of 34</li>
                                <li><strong>Furnishing:</strong> Semi-Furnished</li>
                                <li><strong>RERA Id:</strong> UPRERAPRJ7353</li>
                                <li><strong>Ownership:</strong> Leasehold</li>
                            </ul>
                        </div>
                        <div className="ui-error-report__box">
                            <p>Is there any error or missing information?</p>
                            <button className="ui-error-report__btn">Report Error / Add Missing Information</button>
                        </div>
                    </div>
                </div>
          

            </div>
            <div className="contact-strip">
      <span className="contact-name">Townmanor Infratech LLP</span>
      <span className="contact-item">
        <MdEmail className="contact-icon" />
        Support@townmanor.ai
      </span>
      <span className="contact-item">
        <MdPhone className="contact-icon" />
        +91 7042888903
      </span>
    </div>
            {/* Image Modal */}
            {modal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>
                            <FaTimes />
                        </button>
                        
                        <div className="modal-main-image">
                            <img 
                                src={dummyImages[currentImageIndex]} 
                                alt={`Image ${currentImageIndex + 1}`} 
                            />
                        </div>

                        <div className="modal-navigation">
                            <button 
                                className="modal-nav-btn prev" 
                                onClick={prevImage}
                                aria-label="Previous image"
                            >
                                <FaChevronLeft />
                            </button>
                            <button 
                                className="modal-nav-btn next" 
                                onClick={nextImage}
                                aria-label="Next image"
                            >
                                <FaChevronRight />
                            </button>
                        </div>

                        <div className="modal-thumbnails">
                            {dummyImages.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Thumbnail ${index + 1}`}
                                    className={`modal-thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                                    onClick={() => setCurrentImageIndex(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default OwnerBanner