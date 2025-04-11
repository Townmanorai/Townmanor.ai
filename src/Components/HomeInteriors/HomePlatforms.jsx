import React, { useState } from 'react';
import "./HomePlatforms.css"
import { FaStar, FaCheckCircle, FaPhone, FaEnvelope, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Marketplace = () => {
  const [hoveredId, setHoveredId] = useState(null);

  const sellers = [
    {
      id: 1,
      name: "TechHub Electronics",
      image: "kitchen-design1.jpg",
      sellerImage: "",
      rating: 4.9,
      reviews: 523,
      category: "Living Room",
      verified: true,
      phone: "+1 234-567-8900",
      email: "contact@techhub.com",
      features: ["Modern Designs", "3D Visualization", "Budget Friendly"]
    },
    {
      id: 2,
      name: "Style Studio",
      image: "kitchen-design2.jpg",
      sellerImage: "",
      rating: 4.8,
      reviews: 428,
      category: "Bedroom",
      verified: true,
      phone: "+1 234-567-8901",
      email: "hello@stylestudio.com",
      features: ["Luxury Designs", "Custom Furniture", "Quick Delivery"]
    },
    {
      id: 3,
      name: "Home & Living",
      image: "kitchen-design3.jpg",
      sellerImage: "",
      rating: 4.7,
      reviews: 312,
      category: "Bathroom",
      verified: true,
      phone: "+1 234-567-8902",
      email: "info@homeandliving.com",
      features: ["Eco-Friendly", "Smart Home", "Premium Materials"]
    },
    {
      id: 4,
      name: "Modern Kitchen Solutions",
      image: "kitchen-design2.jpg",
      sellerImage: "",
      rating: 4.8,
      reviews: 245,
      category: "Kitchen",
      verified: true,
      phone: "+1 234-567-8903",
      email: "contact@modernkitchen.com",
      features: ["Modular Designs", "Space Optimization", "Energy Efficient"]
    },
  ];

  // Custom arrow components
  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="slider-arrow prev-arrow" onClick={onClick}>
        <FaChevronLeft />
      </div>
    );
  };

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="slider-arrow next-arrow" onClick={onClick}>
        <FaChevronRight />
      </div>
    );
  };

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="marketplace-container">
      <h2 className="marketplace-title">Top Interior Designers</h2>
      <div className="sellers-slider-container">
        <Slider {...settings} className="sellers-slider">
          {sellers.map((seller) => (
            <div
              key={seller.id}
              className={`seller-card ${hoveredId === seller.id ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredId(seller.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="seller-profile">
                <img src={seller.sellerImage} alt={seller.name} className="seller-avatar" />
                <div className="seller-info">
                  <h3 className="seller-name">{seller.name}</h3>
                  <div className="seller-rating">
                    <FaStar className="star-icon" />
                    <span>{seller.rating}</span>
                    <span className="reviews">({seller.reviews})</span>
                  </div>
                  <div className="seller-category">{seller.category}</div>
                </div>
                {seller.verified && <FaCheckCircle className="verified-badge" />}
              </div>

              <div className="seller-details">
                <div className="features-list">
                  {seller.features.map((feature, index) => (
                    <span key={index} className="feature-tag">{feature}</span>
                  ))}
                </div>
                <div className="contact-info">
                  <a href={`tel:${seller.phone}`} className="contact-item">
                    <FaPhone /> {seller.phone}
                  </a>
                  <a href={`mailto:${seller.email}`} className="contact-item">
                    <FaEnvelope /> {seller.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

function HomePlatforms() {
  const Platforms = [
    {
      img: './logo_image1.png',
      name: 'Homelane',
      data: 'Best Price On Home interior Guranteed',
    },
    {
      img: './logo_image2.png',
      name: 'Pepperfry',
      data: '',
    },
    {
      img: './logo_image3.png',
      name: 'HippoHomes',
      data: 'Nay Ghar ki Suruat Hippo Homes Ke Sath',
    },
    {
      img: './logo_image4.png',
      name: 'Diesigncafe',
      data: 'More Room For Joy',
    },
  ];

  // Duplicate the platforms array to create a seamless loop
  const duplicatedPlatforms = [...Platforms, ...Platforms];

  return (
    <div className='int-platforms'>
      <div className="platforms-scroll-container">
        <div className="hp-heading" style={{marginBottom:'10px'}}>
          <h1>
            Explore Leading <span>Home Interior</span> Platforms
          </h1>
        </div>
        <div className="platforms-scroll">
          {duplicatedPlatforms.map((item, index) => (
            <div className="platform-item" key={index}>
              <div className="platform-image">
                <img src={item.img} alt={item.name} />
              </div>
              <div className="platform-name">{item.name}</div>
              {item.data && <div className="platform-tagline">{item.data}</div>}
            </div>
          ))}
        </div>
      </div>

      <div>
        <Marketplace />
      </div>
    </div>
  );
}

export default HomePlatforms;