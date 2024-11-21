import React from 'react';
import Slider from 'react-slick';
import './ExclusiveOwnerProperties.css';

// Dummy JSON data for properties
const propertiesData = [
  {
    id: 1,
    imgSrc: "https://img.staticmb.com/mbphoto/property/cropped_images/2024/Jul/10/Photo_h180_w240/73347279_1_PropertyImage1720633861437_180_240.jpg",
    type: "2 BHK Flat",
    price: "₹3.60 Cr",
    location: "Mindspace, Mumbai",
    status: "Ready to Move",
    picCount: 19
  },
  {
    id: 2,
    imgSrc: "https://img.staticmb.com/mbphoto/property/cropped_images/2024/Aug/22/Photo_h180_w240/73121863_3_PropertyImage18-406577106275577_180_240.jpg",
    type: "1 BHK Flat",
    price: "₹30 Lac",
    location: "Virar East, Mumbai",
    status: "Ready to Move",
    picCount: 5
  },
  {
    id: 1,
    imgSrc: "https://img.staticmb.com/mbphoto/property/cropped_images/2024/Jul/10/Photo_h180_w240/73347279_1_PropertyImage1720633861437_180_240.jpg",
    type: "2 BHK Flat",
    price: "₹3.60 Cr",
    location: "Mindspace, Mumbai",
    status: "Ready to Move",
    picCount: 19
  },
  {
    id: 2,
    imgSrc: "https://img.staticmb.com/mbphoto/property/cropped_images/2024/Aug/22/Photo_h180_w240/73121863_3_PropertyImage18-406577106275577_180_240.jpg",
    type: "1 BHK Flat",
    price: "₹30 Lac",
    location: "Virar East, Mumbai",
    status: "Ready to Move",
    picCount: 5
  },
  {
    id: 1,
    imgSrc: "https://img.staticmb.com/mbphoto/property/cropped_images/2024/Jul/10/Photo_h180_w240/73347279_1_PropertyImage1720633861437_180_240.jpg",
    type: "2 BHK Flat",
    price: "₹3.60 Cr",
    location: "Mindspace, Mumbai",
    status: "Ready to Move",
    picCount: 19
  },
  {
    id: 2,
    imgSrc: "https://img.staticmb.com/mbphoto/property/cropped_images/2024/Aug/22/Photo_h180_w240/73121863_3_PropertyImage18-406577106275577_180_240.jpg",
    type: "1 BHK Flat",
    price: "₹30 Lac",
    location: "Virar East, Mumbai",
    status: "Ready to Move",
    picCount: 5
  },
  {
    id: 1,
    imgSrc: "https://img.staticmb.com/mbphoto/property/cropped_images/2024/Jul/10/Photo_h180_w240/73347279_1_PropertyImage1720633861437_180_240.jpg",
    type: "2 BHK Flat",
    price: "₹3.60 Cr",
    location: "Mindspace, Mumbai",
    status: "Ready to Move",
    picCount: 19
  },
  {
    id: 2,
    imgSrc: "https://img.staticmb.com/mbphoto/property/cropped_images/2024/Aug/22/Photo_h180_w240/73121863_3_PropertyImage18-406577106275577_180_240.jpg",
    type: "1 BHK Flat",
    price: "₹30 Lac",
    location: "Virar East, Mumbai",
    status: "Ready to Move",
    picCount: 5
  },
  {
    id: 1,
    imgSrc: "https://img.staticmb.com/mbphoto/property/cropped_images/2024/Jul/10/Photo_h180_w240/73347279_1_PropertyImage1720633861437_180_240.jpg",
    type: "2 BHK Flat",
    price: "₹3.60 Cr",
    location: "Mindspace, Mumbai",
    status: "Ready to Move",
    picCount: 19
  },
  {
    id: 2,
    imgSrc: "https://img.staticmb.com/mbphoto/property/cropped_images/2024/Aug/22/Photo_h180_w240/73121863_3_PropertyImage18-406577106275577_180_240.jpg",
    type: "1 BHK Flat",
    price: "₹30 Lac",
    location: "Virar East, Mumbai",
    status: "Ready to Move",
    picCount: 5
  },
  // Add more properties as needed
];

const ExclusiveOwnerProperties = ({stateName}) => {
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
    <div className="exclusive-owner-properties" id="exclusive-ownerProperties">
      <div className="exclusive-container">
        <section className="exclusive-section has-slider">
          <div className="exclusive-section-title">
            <div className="exclusive-title-text strip-orange">
            {stateName ? `Owner-Exclusive Homes in ${stateName}` : 'Owner-Exclusive Homes in Noida'}
            </div>
            <a href="javascript:void(0);" className="exclusive-anchor-see-all push-right">
              See all Properties
            </a>
          </div>
          <div className="exclusive-property-slider">
            <Slider {...sliderSettings}>
              {propertiesData.map((property) => (
                <div className="swiper-slide" key={property.id}>
                  <div className="exclusive-property-card card-shadow">
                    <a href="javascript:void(0);">
                      <div className="exclusive-card-graphic">
                        <img src={property.imgSrc} alt="" />
                        <span className="pic-count">{property.picCount}</span>
                      </div>
                      <div className="exclusive-card-content">
                        <div className="property-type">{property.type}</div>
                        <div className="property-price">{property.price}</div>
                        <div className="property-location">{property.location}</div>
                        <div className="property-status">{property.status}</div>
                        <div className="action-btn">
                          <span className="btn-red medium">View Details</span>
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

export default ExclusiveOwnerProperties;
