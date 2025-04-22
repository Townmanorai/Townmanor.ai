import React, { useState } from 'react'
import { FaHeart, FaShareAlt, FaMapMarkerAlt, FaRulerCombined, FaBed, FaTimes } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import axios from 'axios';
import './adminbanner.css'

function AdminBanner({ property }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showInterestForm, setShowInterestForm] = useState(false);
  const [showErrorForm, setShowErrorForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone_number: ''
  });
  const [errorFormData, setErrorFormData] = useState({
    name: '',
    phone_number: '',
    errorDetail: ''
  });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  // Convert image string to array
  const images = property.image_repository ? property.image_repository.split(', ') : [];

  // Handle image click to open modal
  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  // Navigate to previous image in modal
  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  
  // Navigate to next image in modal
  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowLeft') {
        goToPreviousImage();
      } else if (e.key === 'ArrowRight') {
        goToNextImage();
      }
    };

    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isModalOpen]);

  // Format price to handle special characters
  const formatPrice = (price) => {
    if (!price) return 'Price on Request';
    // Replace HTML encoded rupee symbol with ₹
    return price.replace('â‚¹', '₹').replace('  ', ' ').trim();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleErrorInputChange = (e) => {
    const { name, value } = e.target;
    setErrorFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleShowInterest = () => {
    setShowInterestForm(true);
  };

  const handleShowErrorForm = () => {
    setShowErrorForm(true);
  };

  const handleCloseForm = () => {
    setShowInterestForm(false);
    setShowErrorForm(false);
    setFormError('');
    setFormSuccess(false);
    setFormData({ name: '', phone_number: '' });
    setErrorFormData({ name: '', phone_number: '', errorDetail: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    // Validate form
    if (!formData.name.trim() || !formData.phone_number.trim()) {
      setFormError('Please fill in all fields');
      return;
    }

    if (!/^\d{10}$/.test(formData.phone_number)) {
      setFormError('Please enter a valid 10-digit phone number');
      return;
    }

    try {
      const response = await axios.post('https://www.townmanor.ai/api/formlead/leads', {
        ...formData,
        purpose: `lead at ${property.property_name} (ID: ${property.id})`,
        source: 'admin property'
      });

      if (response.data) {
        setFormSuccess(true);
        setTimeout(() => {
          handleCloseForm();
        }, 2000);
      }
    } catch (error) {
      setFormError('Something went wrong. Please try again.');
    }
  };

  const handleErrorSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    // Validate form
    if (!errorFormData.name.trim() || !errorFormData.phone_number.trim() || !errorFormData.errorDetail.trim()) {
      setFormError('Please fill in all fields');
      return;
    }

    if (!/^\d{10}$/.test(errorFormData.phone_number)) {
      setFormError('Please enter a valid 10-digit phone number');
      return;
    }

    try {
      const response = await axios.post('https://www.townmanor.ai/api/formlead/leads', {
        name: errorFormData.name,
        phone_number: errorFormData.phone_number,
        purpose: errorFormData.errorDetail,
        source: `error in property ${property.property_name} (ID: ${property.id})`
      });

      if (response.data) {
        setFormSuccess(true);
        setTimeout(() => {
          handleCloseForm();
        }, 2000);
      }
    } catch (error) {
      setFormError('Something went wrong. Please try again.');
    }
  };

  return (
   <>
    <div className="adminBannerUnique__container">
      <div className="adminBannerUnique__breadcrumbs">
        Home / {property.city} / <span>{property.property_name}</span>
      </div>

      <div className="adminBannerUnique__main">
        <div className="adminBannerUnique__images">
          <img
            src={images[0]}
            alt={property.property_name}
            className="adminBannerUnique__mainImg"
            onClick={() => handleImageClick(0)}
            style={{ cursor: 'pointer' }}
          />
          <div className="adminBannerUnique__sideImgs">
            {images.slice(1, 3).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${property.property_name} view ${index + 2}`}
                className="adminBannerUnique__sideImg"
                onClick={() => handleImageClick(index + 1)}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </div>
        </div>

        <div className="adminBannerUnique__details">
          <div className="adminBannerUnique__pricing">
            <p>Quoted Price</p>
            <h3>{formatPrice(property.price)}</h3>
            {property.maintenance_charge && (
              <>
                <p>Maintenance Charge</p>
                <h4>{property.maintenance_charge}</h4>
              </>
            )}
          </div>
          <h2 className="adminBannerUnique__title">{property.property_name}</h2>
          <div className="adminBannerUnique__address">
            <div className="adminBannerUnique__addressMain">
              <FaMapMarkerAlt className="adminBannerUnique__addressIcon" />
              <span>{property.address}</span>
            </div>
            <div className="adminBannerUnique__addressDetails">
              <span><FaBed /> {property.configuration}</span>
              {property.area_detail && (
                <span><FaRulerCombined /> {property.area_detail}</span>
              )}
            </div>
          </div>

          <div className="adminBannerUnique__buttons">
            <button><FaHeart /> Favorite</button>
            <button><FaShareAlt /> Share</button>
            <button>📄 Brochure</button>
          </div>

          <button className="adminBannerUnique__cta" onClick={handleShowInterest}>Show Interest</button>
          <button className="adminBannerUnique__report" onClick={handleShowErrorForm}>Report any error in information</button>
        </div>
      </div>

      <div className="adminBannerUnique__infoCards">
        <div className="adminBannerUnique__infoCard">
          <span className="adminBannerUnique__infoLabel">Project Type</span>
          <strong className="adminBannerUnique__infoValue">{property.category || 'N/A'}</strong>
        </div>
        <div className="adminBannerUnique__infoCard">
          <span className="adminBannerUnique__infoLabel">Project Status</span>
          <strong className="adminBannerUnique__infoValue">{property.construction_status || 'N/A'}</strong>
        </div>
        <div className="adminBannerUnique__infoCard">
          <span className="adminBannerUnique__infoLabel">Configuration</span>
          <strong className="adminBannerUnique__infoValue">{property.configuration || 'N/A'}</strong>
        </div>
        <div className="adminBannerUnique__infoCard">
          <span className="adminBannerUnique__infoLabel">Area</span>
          <strong className="adminBannerUnique__infoValue">{property.area_detail || 'N/A'}</strong>
        </div>
        <div className="adminBannerUnique__infoCard">
          <span className="adminBannerUnique__infoLabel">RERA Number</span>
          <strong className="adminBannerUnique__infoValue">{property.rera_id || 'N/A'}</strong>
        </div>
        {property.Listed_By && (
          <div className="adminBannerUnique__infoCard">
            <span className="adminBannerUnique__infoLabel">Listed By</span>
            <strong className="adminBannerUnique__infoValue">{property.Listed_By}</strong>
          </div>
        )}
      </div>
    </div>

    {/* Image Modal */}
    {isModalOpen && (
      <div className="image-modal-overlay" onClick={closeModal}>
        <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close-btn" onClick={closeModal}>
            <IoClose />
          </button>
          
          <div className="modal-image-container">
            <img 
              src={images[currentImageIndex]} 
              alt={`${property.property_name} view ${currentImageIndex + 1}`} 
            />
          </div>
          
          <div className="modal-navigation">
            <button className="modal-nav-btn prev" onClick={goToPreviousImage}>
              <IoChevronBackOutline />
            </button>
            <div className="modal-dots">
              {images.map((_, index) => (
                <span 
                  key={index} 
                  className={`modal-dot ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                ></span>
              ))}
            </div>
            <button className="modal-nav-btn next" onClick={goToNextImage}>
              <IoChevronForwardOutline />
            </button>
          </div>
          
          <div className="modal-image-counter">
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>
      </div>
    )}

    {showInterestForm && (
      <div className="interest-form-overlay" onClick={handleCloseForm}>
        <div className="interest-form-container" onClick={e => e.stopPropagation()}>
          <button className="interest-form-close" onClick={handleCloseForm}>
            <FaTimes />
          </button>
          <h3>Show Interest in {property.property_name}</h3>
          <form onSubmit={handleSubmit}>
            <div className="interest-form-field">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
              />
            </div>
            <div className="interest-form-field">
              <label htmlFor="phone_number">Phone Number</label>
              <input
                type="tel"
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                maxLength="10"
              />
            </div>
            {formError && <div className="interest-form-error">{formError}</div>}
            {formSuccess && <div className="interest-form-success">Thank you for your interest!</div>}
            <button type="submit" className="interest-form-submit">Submit</button>
          </form>
        </div>
      </div>
    )}

    {showErrorForm && (
      <div className="interest-form-overlay" onClick={handleCloseForm}>
        <div className="interest-form-container" onClick={e => e.stopPropagation()}>
          <button className="interest-form-close" onClick={handleCloseForm}>
            <FaTimes />
          </button>
          <h3>Report Error in {property.property_name}</h3>
          <form onSubmit={handleErrorSubmit}>
            <div className="interest-form-field">
              <label htmlFor="error-name">Name</label>
              <input
                type="text"
                id="error-name"
                name="name"
                value={errorFormData.name}
                onChange={handleErrorInputChange}
                placeholder="Enter your name"
              />
            </div>
            <div className="interest-form-field">
              <label htmlFor="error-phone">Phone Number</label>
              <input
                type="tel"
                id="error-phone"
                name="phone_number"
                value={errorFormData.phone_number}
                onChange={handleErrorInputChange}
                placeholder="Enter your phone number"
                maxLength="10"
              />
            </div>
            <div className="interest-form-field">
              <label htmlFor="error-detail">Error Details</label>
              <textarea
                id="error-detail"
                name="errorDetail"
                value={errorFormData.errorDetail}
                onChange={handleErrorInputChange}
                placeholder="Please describe the error you found"
                rows="4"
              ></textarea>
            </div>
            {formError && <div className="interest-form-error">{formError}</div>}
            {formSuccess && <div className="interest-form-success">Thank you for reporting the error!</div>}
            <button type="submit" className="interest-form-submit">Submit</button>
          </form>
        </div>
      </div>
    )}
   </>
  )
}

export default AdminBanner