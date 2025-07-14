import React, { useState, useEffect } from "react";
import "./ColivingBannerUnique123.css";

const ColivingBanner = ({ coliving }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!coliving) return null;
  const images = Array.isArray(coliving.image) ? coliving.image : [];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
    <div className="colivingBannerUnique123 colivingmobile">
      <div className="colivingBannerHeaderUnique123">
        <span className="colivingBannerTitleUnique123">{coliving.property_name || "-"}</span>
        <span className="colivingBannerFemaleOnlyUnique123">{coliving.configuration_type || "-"}</span>
      </div>
      {/* <div className="colivingBannerDetailsUnique123">
        {coliving.configuration || "-"}  {coliving.area || "-"}  {coliving.parking ? "Parking" : "No Parking"}  {coliving.floor ? `${coliving.floor}th Floor` : "-"}
      </div> */}
      <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
        {[`${coliving.configuration_type}`, `${coliving.area} sq.ft`, 'Parking', `${coliving.floor}th floor`].map((item, idx) => (
          <span
            key={idx}
            style={{
              background: '#e3e8f0',
              color: '#1e293b',
              borderRadius: '8px',
              padding: '4px 10px',
              fontSize: '15px',
              fontWeight: 400,
              display: 'inline-block',
            }}
          >
            {item}
          </span>
        ))}
      </div>
      <div className="colivingBannerImagesUnique123">
        {images[0] && (
          <img
            className="colivingBannerMainImgUnique123"
            src={images[0]}
            alt="Main Room"
          />
        )}
        <div className="colivingBannerSideImgsUnique123">
          {images.slice(1, 5).map((img, idx) => (
            <img
              className="colivingBannerSideImgUnique123"
              src={img}
              alt={`Side ${idx + 1}`}
              key={idx}
            />
          ))}
        </div>
        <button className="seeAllPhotosButton" onClick={() => { setModalOpen(true); setSelectedImageIndex(0); }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
          <span>Show all images</span>
        </button>
      </div>
    </div>
    <div className="coliving_mobileview_banner">
    <div className="colivingBannerHeaderUnique123">
        <span className="colivingBannerTitleUnique123">{coliving.property_name || "-"}</span>
        <span className="colivingBannerFemaleOnlyUnique123">{coliving.configuration_type || "-"}</span>
      </div>
      {/* <div className="colivingBannerDetailsUnique123">
        {coliving.configuration || "-"}  {coliving.area || "-"}  {coliving.parking ? "Parking" : "No Parking"}  {coliving.floor ? `${coliving.floor}th Floor` : "-"}
      </div> */}
      <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
        {[`${coliving.configuration_type}`, `${coliving.area} sq.ft`, 'Parking', `${coliving.floor}th floor`].map((item, idx) => (
          <span
            key={idx}
            style={{
              background: '#e3e8f0',
              color: '#1e293b',
              borderRadius: '8px',
              padding: '4px 10px',
              fontSize: '15px',
              fontWeight: 500,
              display: 'inline-block',
            }}
          >
            {item}
          </span>
        ))}
      </div>
    <div className="colivingBannerautoslider">
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`Slide ${idx + 1}`}
          className={idx === currentSlide ? 'active' : ''}
        />
      ))}
    </div>
    </div>
    {modalOpen && (
      <div className="imageModalBackdrop" onClick={() => setModalOpen(false)}>
        <div className="imageModalContent" onClick={(e) => e.stopPropagation()}>
          <button className="closeModalButton" onClick={() => setModalOpen(false)}>✕</button>
          <button className="prevModalButton" onClick={() => setSelectedImageIndex(prev => (prev - 1 + images.length) % images.length)}>‹</button>
          <div className="modalImageContainer">
            <img src={images[selectedImageIndex]} alt={`Image ${selectedImageIndex + 1}`} />
          </div>
          <button className="nextModalButton" onClick={() => setSelectedImageIndex(prev => (prev + 1) % images.length)}>›</button>
        </div>
      </div>
    )}
    </>
  );
};

export default ColivingBanner;

