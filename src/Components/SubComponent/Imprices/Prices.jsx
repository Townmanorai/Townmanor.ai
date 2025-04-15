import React, { useState } from "react";
import "./Prices.css";
import { IoLocationSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

function Prices({ property }) {
  // Convert image_repository string into an array if it's a string
  let imageRepositoryArray = property.image_repository;
  if (typeof imageRepositoryArray === 'string') {
    imageRepositoryArray = imageRepositoryArray.split(',').map(image => image.trim());
  }
  
  // State for main image and modal
  const [mainimage, setmainimage] = useState(imageRepositoryArray[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Clean image URL function
  const cleanImageUrl = (url) => {
    if (typeof url !== 'string') {
      return '';  // Return an empty string if URL is not a valid string
    }
    return url
      .replace(/^[^a-zA-Z0-9]+/, '')  // Remove non-alphanumeric characters from the start
      .replace(/[^a-zA-Z0-9]+$/, '');  // Remove non-alphanumeric characters from the end
  };
  
  // Get the first 3 images for the sidebar
  const getSideImages = () => {
    return imageRepositoryArray.slice(0, 3);
  };
  
  // Get the count of remaining images
  const getRemainingCount = () => {
    return Math.max(0, imageRepositoryArray.length - 3);
  };
  
  // Handle image click to open modal
  const handleImageClick = (image, index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };
  
  // Handle main image click
  const handleMainImageClick = () => {
    const index = imageRepositoryArray.indexOf(mainimage);
    handleImageClick(mainimage, index);
  };
  
  // Navigate to previous image in modal
  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? imageRepositoryArray.length - 1 : prevIndex - 1
    );
  };
  
  // Navigate to next image in modal
  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === imageRepositoryArray.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowLeft') {
      goToPreviousImage();
    } else if (e.key === 'ArrowRight') {
      goToNextImage();
    }
  };
  
  // Add event listener for keyboard navigation
  React.useEffect(() => {
    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isModalOpen, currentImageIndex]);
  
  return (
    <div>
      <div className="im-price">
        <div className="subprice1">
          <p className="price-detail">{property.configuration} Builder Floor For {property.purpose}</p>
          {property.price ? (<div className="price-tag">
            <p className="">
              <span className="price-price">₹ {property.price > 100 ? property.price : `${property.price} ${property.pricerange}`} </span>
            </p>
          </div>):(<span className="price-price">Price On Request</span>)}
        </div>
        <div className="subprice2">
          <p className="price-add"><i><IoLocationSharp /></i>{property.address}</p>

          <div className="fav1">
            <button className="fav1-fav">
              <i>
                <FaHeart style={{
                  width: '14px',
                  height: '26px',
                  marginRight: '4px',
                  position: 'relative',
                  top: '-1px'
                }} />
              </i>
              Add to favorites
            </button>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="imgcontainer">
        {/* Main image */}
        <div className="mainimage" onClick={handleMainImageClick}>
          <img 
            src={'https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/' + cleanImageUrl(mainimage)} 
            alt="Main building view" 
            style={{ cursor: 'pointer' }}
          />
        </div>

        {/* Side images - limited to 3 with count for remaining */}
        <div className="sideimgcontainer">
          <div className="sideimages">
            {getSideImages().map((image, index) => (
              <div key={index} className="side-image-wrapper">
                <img 
                  src={'https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/' + cleanImageUrl(image)} 
                  alt={`Property view ${index + 1}`} 
                  onClick={() => {
                    setmainimage(image);
                  }} 
                  style={{ cursor: 'pointer' }} 
                />
                {/* Show count on the last image if there are more than 3 images */}
                {index === 2 && getRemainingCount() > 0 && (
                  <div className="image-count-overlay" onClick={() => handleImageClick(image, index)}>
                    <span>+{getRemainingCount()}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
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
                src={'https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/' + cleanImageUrl(imageRepositoryArray[currentImageIndex])} 
                alt={`Property view ${currentImageIndex + 1}`} 
              />
            </div>
            
            <div className="modal-navigation">
              <button className="modal-nav-btn prev" onClick={goToPreviousImage}>
                <IoChevronBackOutline />
              </button>
              <div className="modal-dots">
                {imageRepositoryArray.map((_, index) => (
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
              {currentImageIndex + 1} / {imageRepositoryArray.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Prices;
