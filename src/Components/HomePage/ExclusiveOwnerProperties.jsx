import React from 'react';
import Slider from 'react-slick';
import './ExclusiveOwnerProperties.css';

// Dummy JSON data for properties
const propertiesData = [
  {
    id: 1,
    imgSrc: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/1739617664620-PrateekGrand2.jpg",
    type: "2 BHK Builder Floor",
    price: "₹52 Lakh",
    location: "Prateek Grand Paeonia, Noida",
    status: "Ready to Move",
    link:'https://townmanor.ai/home/8',
    picCount: 19
  },
  {
    id: 2,
    imgSrc: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/1739621894650-eldecoUtopia1.jpg",
    type: "3 BHK Flat",
    price: "₹18 Crore",
    location: "ATS Knightsbridge, Noida",
    status: "Under-Construction",
    link:'http://localhost:5173/home/54',
    picCount: 5
  },
  {
    id: 4,
    imgSrc: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/1741165402582-max%20estate%201283.jpg",
    type: "3 BHK Flat",
    price: "1.2 Crore",
    location: "Max Estates 128, Noida",
    status: "Ready to Move",
    link:'https://townmanor.ai/home/33',
    picCount: 5
  },
  {
    id: 5,
    imgSrc: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/1741783645276-himalaya2.jpg",
    type: "1 BHK Flat",
    price: "₹10 Lakh",
    location: "HIMALAYA PRIDES, Noida",
    status: "Ready to Move",
    link:'https://townmanor.ai/home/36',
    picCount: 19
  },
  {
    id: 6,
    imgSrc: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/1741783715521-experion1.jpg",
    type: "3 BHK Flat",
    price: "₹5.95 Cr",
    location: "Experion Element, Noida",
    status: "Ready to Move",
    link:'https://townmanor.ai/home/37',
    picCount: 5
  },
  {
    id: 7,
    imgSrc: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/1742214290198-express_Zenith1.jpg",
    type: "4 BHK Flat",
    price: "₹2.65 Cr",
    location: "Express Zenith, Noida",
    status: "Ready to Move",
    link:'https://townmanor.ai/home/40',
    picCount: 19
  },
  {
    id: 8,
    imgSrc: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/1742801095277-Titania_residency.png",
    type: "4 BHK Flat",
    price: "Price On Request",
    location: "Titenia Residency, Greaternoida",
    status: "Ready to Move",
    link:'https://townmanor.ai/home/61',
    picCount: 5
  },
  {
    id: 3,
    imgSrc: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/1737461234604-Ow_arora_img6.jpg",
    type: "3 BHK Flat",
    price: "₹73 Lakh",
    location: "Ajnara Le Garden, Greater Noida",
    status: "Ready to Move",
    link:'',
    picCount: 1
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
        <section className="exclusive-section has-slider" style={{paddingBottom:'10px'}}>
          <div className="exclusive-section-title">
          <div className="exclusive-title-text strip-orange section-heading" style={{marginBottom:'0px'}} dangerouslySetInnerHTML={{__html: stateName 
          ? `<h3>Resale <b>properties</b> in <b>${stateName}</b></h3>`
          : '<h3>Resale <b>properties</b> in <b>noida</b></h3>'
     }}>
      </div>


            {/* <a href="javascript:void(0);" className="exclusive-anchor-see-all push-right">
              See all Properties
            </a> */}
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
                          <a href={property.link}>
                            <span className="btn-red medium">View Details</span>
                          </a>
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
