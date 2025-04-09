import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "./Property_image_slider.css"
import { IoClose } from "react-icons/io5";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

function Property_image_slider({ images }) {
  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Slick settings for the thumbnail slider
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Number of thumbnails visible at once
    slidesToScroll: 1,
    rows: 2, // Creates 2 rows
    slidesPerRow: 1, 
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3, // For smaller screens
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2, // For even smaller screens
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1, // For mobile screens
        },
      },
    ],
  };

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
  useEffect(() => {
    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isModalOpen, currentImageIndex]);

  return (
    <>
      {images.length > 0 && (
        <div className="property-imgs" style={{
          marginTop:'5rem'
        }}>
          <div className="row">
            <div className="col-lg-6">
              <div className="property-main-img">
                {images.map((file, index) => (
                  <div 
                    className="property-img" 
                    key={index}
                    onClick={() => handleImageClick(index)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img
                      data-fullsrc={file.url}
                      src={file.url}
                      alt={file.alt}
                      style={{
                        maxHeight:'500px'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-6">
              {images.length > 1 && (
                <div className="property-thumb-imgs p-0 border-0">
                  <Slider {...settings}>
                    {images.map((file, index) => (
                      <div 
                        key={index} 
                        className="thumb-img pr-0"
                        onClick={() => handleImageClick(index)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="property-img side-img">
                          <img
                            data-fullsrc={file.url}
                            src={file.url}
                            alt={file.alt}
                            title={file.title}
                          />
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {isModalOpen && (
        <div className="image-modal-overlay" onClick={closeModal}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>
              <IoClose />
            </button>
            
            <div className="modal-image-container">
              <img 
                src={images[currentImageIndex].url} 
                alt={`Property view ${currentImageIndex + 1}`} 
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
    </>
  );
}

export default Property_image_slider;
