import React, { useState } from 'react'
import { FaUser } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import './OwnerBanner.css'

function OwnerBanner({ property }) {
    const [modal, setmodal] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [showConnectForm, setShowConnectForm] = useState(false);
    const [showErrorForm, setShowErrorForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        errorDescription: ''
    });

    const handleConnectSubmit = (e) => {
        e.preventDefault();
        // Handle connect form submission here
        setShowConnectForm(false);
        setFormData({ name: '', phone: '', errorDescription: '' });
    };

    const handleErrorSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://www.townmanor.ai/api/formlead/leads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    phone_number: formData.phone,
                    purpose: 'error message',
                    source: `error reporting in property ${property.property_name} (ID: ${property.id})`,
                    error_description: formData.errorDescription // Adding this as additional data
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit error report');
            }

            // Reset form and close modal on success
            setShowErrorForm(false);
            setFormData({ name: '', phone: '', errorDescription: '' });
            alert('Thank you for reporting the error. We will look into it!');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit error report. Please try again.');
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const openmodal = () => {
        setmodal(true);
    }
    
    const closemodal = () => {
        setmodal(false);
    }

    const openImageModal = (index) => {
        setSelectedImageIndex(index);
        setmodal(true);
    }

    const nextImage = () => {
        setSelectedImageIndex((prev) => (prev + 1) % images.length);
    }

    const prevImage = () => {
        setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }

    if (!property) return null;

    const images = property.image_repository ? JSON.parse(property.image_repository).map(img => `https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/${img}`) : [];
    
    // Format price if available
    const formatPrice = (price) => {
        if (!price) return 'Price on Request';
        
        // If price is already formatted with pricerange
        if (property.pricerange) {
            return `₹ ${price} ${property.pricerange}`;
        }
        
        // Fallback to old formatting logic
        price = parseInt(price);
        if (price >= 10000000) {
            return `₹ ${(price / 10000000).toFixed(2)} Cr`;
        } else if (price >= 100000) {
            return `₹ ${(price / 100000).toFixed(2)} Lac`;
        } else {
            return `₹ ${price.toLocaleString()}`;
        }
    };

    // Calculate price per sq ft
    const pricePerSqFt = (price, area) => {
        if (!price || !area) return 'NA';
        
        // Convert price to actual value based on pricerange
        let actualPrice = price;
        if (property.pricerange) {
            if (property.pricerange.toLowerCase().includes('cr')) {
                actualPrice = price * 10000000; // Convert Crore to actual value
            } else if (property.pricerange.toLowerCase().includes('lac')) {
                actualPrice = price * 100000; // Convert Lac to actual value
            }
        } else {
            actualPrice = parseInt(price);
        }
        
        const perSqFtPrice = Math.round(actualPrice / area);
        return `₹ ${perSqFtPrice.toLocaleString()} / Sq.ft`;
    };

    return (
        <>
            <div className="ui-body__container">
                <div className="ui-property__header">
                    <div>
                        <p className="ui-property__breadcrumbs">
                            Property in {property.city || 'Location'} / Property in {property.locality || 'Area'} / {property.property_name}
                        </p>
                        <h1 className="ui-property__title">
                            {property.configuration ? `${property.configuration} flat for sale in ${property.property_name || property.city}` : property.city}
                        </h1>
                        <p className="ui-property__subtitle" style={{
                            textTransform:'capitalize'
                        }}>{property.city}</p>
                        <p className="ui-property__building">Address: {property.address}</p>

                        <div className="ui-property__badges">
                            {property.rera_id && <span className="ui-property__badge ui-property__badge--green">RERA</span>}
                            <span className="ui-property__badge ui-property__badge--blue">0% Brokerage</span>
                        </div>
                    </div>
                    <div className="ui-price-box">
                        <div className='ul-price-detailsection'>
                            <div id='price-detail-mobile'>
                                <h2 className="ui-price-box__price">{formatPrice(property.price)}</h2>
                                <p className="ui-price-box__rate">{pricePerSqFt(property.price, property.area_detail)}</p>
                            </div>
                            <div className="ui-agent__card">
                                <FaUser className="ui-agent__icon" id='usericonxyz'/>
                                <div className="ui-agent__info">
                                    <p className="ui-agent__name">{property.username || 'TownManor Agent'}</p>
                                    <p className="ui-agent__label">Agent</p>
                                </div>
                            </div>
                        </div>
                        <button className="ui-contact__btn" onClick={() => setShowConnectForm(true)}>Connect Now</button>
                    </div>
                </div>

                <div className="ui-property__main">
                    <div className="ui-property__image-section">
                        {images.length > 0 ? (
                            <>
                                <img
                                    src={images[0]}
                                    alt={property.property_name}
                                    className="ui-property__main-image"
                                    onClick={() => openImageModal(0)}
                                    style={{ cursor: 'pointer' }}
                                />
                                <div className="ui-property__thumbnail-list">
                                    {images.slice(1, 4).map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt={`${property.property_name} - View ${index + 2}`}
                                            className="ui-property_secondaryimage"
                                            onClick={() => openImageModal(index + 1)}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    ))}
                                    {images.length > 4 && (
                                        <div 
                                            className="ui-property_secondaryimage ui-thumbnail__overlay"
                                            onClick={() => openImageModal(4)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <img
                                                src={images[4]}
                                                alt="More thumbnails"
                                                className="ui-property_secondaryimage"
                                            />
                                            <div className="ui-thumbnail__overlay-text">
                                                +{images.length - 4}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="ui-property__no-image">No Images Available</div>
                        )}
                    </div>

                    {/* Image Modal */}
                    {modal && (
                        <div className="image-modal-overlay" onClick={closemodal}>
                            <div className="image-modal-content" onClick={e => e.stopPropagation()}>
                                <button className="modal-close-btn" onClick={closemodal}>
                                    <FaTimes />
                                </button>
                                <button className="modal-nav-btn prev" onClick={prevImage}>❮</button>
                                <img
                                    src={images[selectedImageIndex]}
                                    alt={`${property.property_name} - View ${selectedImageIndex + 1}`}
                                    className="modal-image"
                                />
                                <button className="modal-nav-btn next" onClick={nextImage}>❯</button>
                                <div className="modal-image-counter">
                                    {selectedImageIndex + 1} / {images.length}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="ui-property__info-card">
                        <div className="ui-config__details">
                            <ul className="ui-config__list">
                                {property.residential && (
                                    <li><strong>Type:</strong> {property.residential}</li>
                                )}
                                {property.area_detail && (
                                    <li><strong>Area:</strong> {property.area_detail} Sq.ft</li>
                                )}
                                {property.construction_status && (
                                    <li><strong>Possession:</strong> {property.construction_status}</li>
                                )}
                                {property.configuration && (
                                    <li><strong>Configuration:</strong> {property.configuration}</li>
                                )}
                                {property.bathroom && (
                                    <li><strong>Bathroom:</strong> {property.bathroom}</li>
                                )}
                                {property.balcony && (
                                    <li><strong>Balcony:</strong> {property.balcony}</li>
                                )}
                                {property.floor_no && property.total_floor && (
                                    <li><strong>Floor Number:</strong> {property.floor_no} of {property.total_floor}</li>
                                )}
                                {property.furnish_type && (
                                    <li><strong>Furnishing:</strong> {property.furnish_type}</li>
                                )}
                                {property.rera_id && (
                                    <li><strong>RERA Id:</strong> {property.rera_id}</li>
                                )}
                                {property.current_lease && (
                                    <li><strong>Ownership:</strong> {property.current_lease}</li>
                                )}
                            </ul>
                        </div>
                        <div className="ui-error-report__box">
                            <p>Is there any error or missing information?</p>
                            <button className="ui-error-report__btn" onClick={() => setShowErrorForm(true)}>
                                Report Error / Add Missing Information
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Connect Now Form Modal */}
            {showConnectForm && (
                <div className="tm-property-modal__overlay" onClick={() => setShowConnectForm(false)}>
                    <div className="tm-property-modal__content" onClick={e => e.stopPropagation()}>
                        <button className="tm-property-modal__close-btn" onClick={() => setShowConnectForm(false)}>
                            <FaTimes />
                        </button>
                        <form onSubmit={handleConnectSubmit} className="tm-property-form__container">
                            <h2 className="tm-property-form__heading">Connect with Us</h2>
                            <div className="tm-property-form__group">
                                <label className="tm-property-form__label" htmlFor="name">Name:</label>
                                <input
                                    className="tm-property-form__input"
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="tm-property-form__group">
                                <label className="tm-property-form__label" htmlFor="phone">Phone Number:</label>
                                <input
                                    className="tm-property-form__input"
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="tm-property-form__submit-btn">Submit</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Error Report Form Modal */}
            {showErrorForm && (
                <div className="tm-property-modal__overlay" onClick={() => setShowErrorForm(false)}>
                    <div className="tm-property-modal__content" onClick={e => e.stopPropagation()}>
                        <button className="tm-property-modal__close-btn" onClick={() => setShowErrorForm(false)}>
                            <FaTimes />
                        </button>
                        <form onSubmit={handleErrorSubmit} className="tm-property-form__container">
                            <h2 className="tm-property-form__heading">Report Error / Add Missing Information</h2>
                            <div className="tm-property-form__group">
                                <label className="tm-property-form__label" htmlFor="error-name">Name:</label>
                                <input
                                    className="tm-property-form__input"
                                    type="text"
                                    id="error-name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="tm-property-form__group">
                                <label className="tm-property-form__label" htmlFor="error-phone">Phone Number:</label>
                                <input
                                    className="tm-property-form__input"
                                    type="tel"
                                    id="error-phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="tm-property-form__group">
                                <label className="tm-property-form__label" htmlFor="errorDescription">Describe Error:</label>
                                <textarea
                                    className="tm-property-form__textarea"
                                    id="errorDescription"
                                    name="errorDescription"
                                    value={formData.errorDescription}
                                    onChange={handleInputChange}
                                    required
                                    rows="4"
                                />
                            </div>
                            <button type="submit" className="tm-property-form__submit-btn">Submit</button>
                        </form>
                    </div>
                </div>
            )}
           <div className="contact-wrap-holder">
      <div className="static-contact-info">
        <div className="info-label-head">Townmanor Infratech LLP</div>
        <div className="slide-content-block">
          <MdEmail className="icon-contact-symbol" />
          <span className="info-label-text">Support@townmanor.ai</span>
        </div>
        <div className="slide-content-block">
          <MdPhone className="icon-contact-symbol" />
          <span className="info-label-text">+91 7042888903</span>
        </div>
      </div>
    </div>
        </>
    )
}

export default OwnerBanner