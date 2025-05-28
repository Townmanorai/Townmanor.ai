import React from 'react';
import './ImageGallery.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ImageGallery = () => {
    const [currentImage, setCurrentImage] = React.useState(0);
    const images = [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
        'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1768&q=80',
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
        'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
        // 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
    ];

    const handleImageClick = (index) => {
        setCurrentImage(index);
    };    return (
        <div className="townmanor_coliving_gallery_wrapper">
            <div className="townmanor_coliving_main_image">
                <img src={images[currentImage]} alt={`Apartment view ${currentImage + 1}`} />
                <span className="townmanor_coliving_image_counter">{currentImage + 1}/{images.length}</span>
                <button className="townmanor_coliving_nav_button townmanor_coliving_prev" onClick={() => setCurrentImage((prev) => (prev > 0 ? prev - 1 : images.length - 1))}>
                    <FaChevronLeft className="townmanor_coliving_nav_icon" />
                </button>
                <button className="townmanor_coliving_nav_button townmanor_coliving_next" onClick={() => setCurrentImage((prev) => (prev < images.length - 1 ? prev + 1 : 0))}>
                    <FaChevronRight className="townmanor_coliving_nav_icon" />
                </button>
            </div>
            <div className="townmanor_coliving_thumbnail_strip">
                {images.map((image, index) => (
                    <div 
                        key={index} 
                        className={`townmanor_coliving_thumbnail ${currentImage === index ? 'townmanor_coliving_active' : ''}`}
                        onClick={() => handleImageClick(index)}
                    >
                        <img src={image} alt={`Apartment view ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;
