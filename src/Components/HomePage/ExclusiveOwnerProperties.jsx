import React from 'react';
import Slider from 'react-slick';
import './ExclusiveOwnerProperties.css';

// Dummy JSON data for properties
const propertiesData = [
  {
    id: 1,
    imgSrc: "https://www.asenseinterior.com/assets/uploads//94e315b9c1ef2c76e217253180cb7868.jpg",
    type: "2 BHK Flat",
    price: "₹3.60 Cr",
    location: "Mindspace, Mumbai",
    status: "Ready to Move",
    picCount: 19
  },
  {
    id: 2,
    imgSrc: "https://media.designcafe.com/wp-content/uploads/2022/07/15170350/luxury-home-design-on-budget.jpg",
    type: "1 BHK Flat",
    price: "₹30 Lac",
    location: "Virar East, Mumbai",
    status: "Ready to Move",
    picCount: 5
  },
  {
    id: 1,
    imgSrc: "https://media.designcafe.com/wp-content/uploads/2019/12/23111709/interior-companies-in-bangalore-946x662.jpg",
    type: "2 BHK Flat",
    price: "₹3.60 Cr",
    location: "Mindspace, Mumbai",
    status: "Ready to Move",
    picCount: 19
  },
  {
    id: 2,
    imgSrc: "https://media.designcafe.com/wp-content/uploads/2020/09/26174201/3bhk-house-interior-design.jpg",
    type: "1 BHK Flat",
    price: "₹30 Lac",
    location: "Virar East, Mumbai",
    status: "Ready to Move",
    picCount: 5
  },
  {
    id: 1,
    imgSrc: "https://media.designcafe.com/wp-content/uploads/2021/04/26145859/home-office-design-by-best-interior-designers-in-bengalore-mumbai-hyderabad.jpg",
    type: "2 BHK Flat",
    price: "₹3.60 Cr",
    location: "Mindspace, Mumbai",
    status: "Ready to Move",
    picCount: 19
  },
  {
    id: 2,
    imgSrc: "https://media.designcafe.com/wp-content/uploads/2020/07/23154645/best-interior-designers-living-room-designs.jpg",
    type: "1 BHK Flat",
    price: "₹30 Lac",
    location: "Virar East, Mumbai",
    status: "Ready to Move",
    picCount: 5
  },
  {
    id: 1,
    imgSrc: "https://media.designcafe.com/wp-content/uploads/2020/07/23171403/best-home-interiors-space-saving-designs.jpg",
    type: "2 BHK Flat",
    price: "₹3.60 Cr",
    location: "Mindspace, Mumbai",
    status: "Ready to Move",
    picCount: 19
  },
  {
    id: 2,
    imgSrc: "https://media.designcafe.com/wp-content/uploads/2022/06/29150132/modern-minimalist-living-room-with-bookshelf-and-sofa.jpg",
    type: "1 BHK Flat",
    price: "₹30 Lac",
    location: "Virar East, Mumbai",
    status: "Ready to Move",
    picCount: 5
  },
  {
    id: 1,
    imgSrc: "https://media.designcafe.com/wp-content/uploads/2020/05/15151655/industrial-style-living-room-interior-with-furniture-sofa.jpg",
    type: "2 BHK Flat",
    price: "₹3.60 Cr",
    location: "Mindspace, Mumbai",
    status: "Ready to Move",
    picCount: 19
  },
  {
    id: 2,
    imgSrc: "https://media.designcafe.com/wp-content/uploads/2023/08/25160343/living-room-red-couch-with-recliner-lounge.jpg",
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
    <div className="exclusive-owner-properties" id="exclusive-ownerProperties">
      <div className="exclusive-container">
        <section className="exclusive-section has-slider">
          <div className="exclusive-section-title">
            <div className="exclusive-title-text strip-orange">
            {stateName ? `Resale properties in ${stateName}` : 'Resale properties in Noida'}
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
