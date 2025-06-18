import React, { useState, useEffect } from "react";
import "./ColivingBannerUnique123.css";

const ColivingBanner = ({ coliving }) => {
  if (!coliving) return null;
  const images = Array.isArray(coliving.image) ? coliving.image : [];
  const [currentSlide, setCurrentSlide] = useState(0);

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
        {['3 RK', '600 sq ft', 'No Parking', '3th Floor'].map((item, idx) => (
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
        {['3 RK', '600 sq ft', 'No Parking', '3th Floor'].map((item, idx) => (
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
    </>
  );
};

export default ColivingBanner;

