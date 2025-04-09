import React from 'react';
import Slider from 'react-slick';
import '../HomePage/TopRentedProperties.css';  // Separate CSS for rented properties

// Dummy JSON data for rental properties
const propertiesData = [
  {
    id: 1,
    imgSrc: "No image available",
  },
  {
    id: 2,
    imgSrc: "No image available",
  },
  {
    id: 3,
    imgSrc: "No image available",
  },
  {
    id: 4,
    imgSrc: "No image available",
  },
  {
    id: 5,
    imgSrc: "No image available",
  }
  // Add more rental properties as needed
];

const SellProperties_By_Project = ({project_name}) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <div className="swiper-button-next"><a href="javascript:void(0)"></a></div>,
    prevArrow: <div className="swiper-button-prev"><a href="javascript:void(0)"></a></div>,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          rows: 1, // Retain two rows on medium screens
          slidesPerRow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, // For smaller screens show only 1 card per row
          rows: 1,
          slidesPerRow: 1,
        },
      },
    ],
  };

  return (
    <div class="details-info">
    <div className="top-rented-properties" id="top-rentedProperties">
      <div className="rented-container">
        <section className="rented-section has-slider">
          <div className="rented-section-title">
            <div className="rented-title-text strip-blue"style={{ 
    fontSize: "20px",
    fontWeight: "normal", // Use "normal" instead of "none"
    color: "#000000",
    // textTransform: "uppercase",
    borderBottom: "1px solid #EE0001" // Corrected to camelCase
  }}>
            {project_name ? `Resale Properties in ${project_name}` : 'Resale Properties'}
            </div>
            {/* <a href="javascript:void(0);" className="rented-anchor-see-all push-right">
              See all Rental Properties
            </a> */}
          </div>
          <div className="rented-property-slider">
            <Slider {...sliderSettings}>
              {propertiesData.map((property) => (
                <div className="swiper-slide" key={property.id}>
                  <div className="rented-property-card card-shadow">
                    <a href="javascript:void(0);">
                      <div className="rented-card-graphic">
                        <img src={property.imgSrc} alt={"Currently data is not available"} />
                        <span className="pic-count">{property.picCount}</span>
                      </div>
                      <div className="rented-card-content">
                        <div className="property-type">{property.type}</div>
                        <div className="property-rent">{property.rent}</div>
                        <div className="property-location">{property.location}</div>
                        <div className="property-status">{property.status}</div>
                        <div className="action-btn">
                          <span className="btn-blue medium">View Details</span>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>
      </div>
    </div>
    </div>
  );
};

export default SellProperties_By_Project;
