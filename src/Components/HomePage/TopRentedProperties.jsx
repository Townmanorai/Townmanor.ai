import React from 'react';
import Slider from 'react-slick';
import './TopRentedProperties.css';  // Separate CSS for rented properties

// Dummy JSON data for rental properties
const propertiesData = [
  {
    id: 1,
    imgSrc: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742283730104-770x483sobha_310_riverside_crescent1.webp",
    type: "3 BHK Flat",
    rent: "₹35,000/month",
    location: "Sector 62, Noida",
    status: "Available for Rent",
    picCount: 12
  },
  {
    id: 2,
    imgSrc: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742283730107-770x483sobha_310_riverside_crescent3.webp",
    type: "2 BHK Apartment",
    rent: "₹25,000/month",
    location: "Sector 18, Noida",
    status: "Available for Rent",
    picCount: 8
  },
  {
    id: 3,
    imgSrc: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742283730119-770x483sobha_310_riverside_crescent6.webp",
    type: "1 BHK Studio",
    rent: "₹15,000/month",
    location: "Sector 128, Noida",
    status: "Available for Rent",
    picCount: 4
  },
  {
    id: 4,
    imgSrc: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742283730111-770x483sobha_310_riverside_crescent5.webp",
    type: "3 BHK Flat",
    rent: "₹35,000/month",
    location: "Sector 62, Noida",
    status: "Available for Rent",
    picCount: 12
  },
  {
    id: 5,
    imgSrc: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742283730104-770x483sobha_310_riverside_crescent1.webp",
    type: "3 BHK Flat",
    rent: "₹35,000/month",
    location: "Sector 62, Noida",
    status: "Available for Rent",
    picCount: 12
  },
  {
    id: 6,
    imgSrc: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742283730107-770x483sobha_310_riverside_crescent3.webp",
    type: "2 BHK Apartment",
    rent: "₹25,000/month",
    location: "Sector 18, Noida",
    status: "Available for Rent",
    picCount: 8
  },
  {
    id: 7,
    imgSrc: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742283730119-770x483sobha_310_riverside_crescent6.webp",
    type: "1 BHK Studio",
    rent: "₹15,000/month",
    location: "Sector 128, Noida",
    status: "Available for Rent",
    picCount: 4
  },
  {
    id: 8,
    imgSrc: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742283730111-770x483sobha_310_riverside_crescent5.webp",
    type: "3 BHK Flat",
    rent: "₹35,000/month",
    location: "Sector 62, Noida",
    status: "Available for Rent",
    picCount: 12
  }
  // Add more rental properties as needed
];

const TopRentedProperties = ({stateName}) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
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
    <div className="top-rented-properties" id="top-rentedProperties">
      <div className="rented-container">
        <section className="rented-section has-slider">
          <div className="rented-section-title">
          <div className="exclusive-title-text strip-orange" 
     dangerouslySetInnerHTML={{
        __html: stateName 
          ? `<h3>Rental <b>properties</b> in <b>${stateName}</b></h3>`
          : '<h3>Rental <b>properties</b> in <b>noida</b><h3>'
     }}>
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
                        <img src={property.imgSrc} alt={property.type} />
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
  );
};

export default TopRentedProperties;
