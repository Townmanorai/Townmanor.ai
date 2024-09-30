import React from 'react';
import Slider from 'react-slick';
import './TopRentedProperties.css';  // Reusing the same CSS

// Dummy JSON data for new launched properties
const newPropertiesData = [
    {
      id: 1,
      imgSrc: "/770x483sobha_310_riverside_crescent1.webp",
      type: "3 BHK Flat",
      rent: "₹35,000/month",
      location: "Sector 62, Noida",
      status: "Available for Rent",
      picCount: 12
    },
    {
      id: 2,
      imgSrc: "/770x483sobha_310_riverside_crescent3.webp",
      type: "2 BHK Apartment",
      rent: "₹25,000/month",
      location: "Sector 18, Noida",
      status: "Available for Rent",
      picCount: 8
    },
    {
      id: 3,
      imgSrc: "/770x483sobha_310_riverside_crescent6.webp",
      type: "1 BHK Studio",
      rent: "₹15,000/month",
      location: "Sector 128, Noida",
      status: "Available for Rent",
      picCount: 4
    },
    {
      id: 4,
      imgSrc: "/770x483sobha_310_riverside_crescent5.webp",
      type: "3 BHK Flat",
      rent: "₹35,000/month",
      location: "Sector 62, Noida",
      status: "Available for Rent",
      picCount: 12
    },
    {
      id: 5,
      imgSrc: "/851x678bhutani_cyberthum101.jpg",
      type: "2 BHK Apartment",
      rent: "₹25,000/month",
      location: "Sector 18, Noida",
      status: "Available for Rent",
      picCount: 8
    },
    {
      id: 6,
      imgSrc: "/851x678bhutani_cyberthum103.jpg",
      type: "1 BHK Studio",
      rent: "₹15,000/month",
      location: "Sector 128, Noida",
      status: "Available for Rent",
      picCount: 4
    },
    {
      id: 7,
      imgSrc: "/851x678bhutani_cyberthum104.jpg",
      type: "3 BHK Flat",
      rent: "₹35,000/month",
      location: "Sector 62, Noida",
      status: "Available for Rent",
      picCount: 12
    },
    {
      id: 8,
      imgSrc: "/851x678bhutani_cyberthum101.jpg",
      type: "2 BHK Apartment",
      rent: "₹25,000/month",
      location: "Sector 18, Noida",
      status: "Available for Rent",
      picCount: 8
    },
    {
      id: 9,
      imgSrc: "/851x678bhutani_cyberthum101.jpg",
      type: "1 BHK Studio",
      rent: "₹15,000/month",
      location: "Sector 128, Noida",
      status: "Available for Rent",
      picCount: 4
    },
    // Add more rental properties as needed
  ];
  

const NewLaunchedProjects = ({ stateName }) => {
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
          rows: 1,
          slidesPerRow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          rows: 1,
          slidesPerRow: 1,
        },
      },
    ],
  };

  return (
    <div className="new-launched-projects" id="new-launchedProjects">
      <div className="rented-container">
        <section className="rented-section has-slider">
          <div className="rented-section-title">
            <div className="rented-title-text strip-blue">
              {stateName ? `New Launched Projects in ${stateName}` : 'New Launched Projects in Noida'}
            </div>
            <a href="javascript:void(0);" className="rented-anchor-see-all push-right">
              See all New Launched Projects
            </a>
          </div>
          <div className="rented-property-slider">
            <Slider {...sliderSettings}>
              {newPropertiesData.map((property) => (
                <div className="swiper-slide" key={property.id}>
                  <div className="rented-property-card card-shadow">
                    <a href="javascript:void(0);">
                      <div className="rented-card-graphic">
                        <img src={property.imgSrc} alt={property.type} />
                        <span className="pic-count">{property.picCount}</span>
                      </div>
                      <div className="rented-card-content">
                        <div className="property-type">{property.type}</div>
                        <div className="property-price">{property.price}</div>
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

export default NewLaunchedProjects;
