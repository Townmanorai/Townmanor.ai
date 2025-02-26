import React, { useEffect, useRef } from "react";
import "./CityGrid.css";

const cities = [
  { name: "Noida", country: "Noida", img: "./dfb6b5128e.jpg" },
  { name: "Gurgoan", country: "China", img: "./gurgoan.jpeg" },
  { name: "Delhi", country: "South Korea", img: "./delhi.jpg" },
  { name: "Faridabad", country: "Japan", img: "./faridabad.png" },
  { name: "Dubai", country: "USA", img: "./dubai.jpg" },
  { name: "GreaterNoida", country: "France", img: "./faridabad.png" },
];
const uppercities = [
  { name: "Doha", country: "Qatar", img: "./doha.jpeg" },
  { name: "Ghaziabad", country: "India", img: "./ghaziabad.jpeg" },
  { name: "Goa", country: "India", img: "./goa.jpg" },
  { name: "Bengaluru", country: "India", img: "./bangulore.jpg" },
  { name: "Ahmedabad", country: "India", img: "./Ahmedabad.jpg" },
  { name: "Jaipur", country: "India", img: "./Jaipur.jpg" },
  { name: "Lucknow", country: "India", img: "./lucknow.jpg" },
  { name: "Chennai", country: "India", img: "./Chennai.jpg" },
  { name: "Chandigarh", country: "India", img: "./chandighad2.jpg" },
  { name: "Mumbai", country: "India", img: "./mummbai.jpg" },
  { name: "Kolkata", country: "India", img: "./kalkata.jpg" },
  { name: "Dehradun", country: "India", img: "./dehradun.jpg" },
  { name: "Hyderabad", country: "India", img: "./Hyderabad.jpg" },
  
];
const lowercities = [
  { name: "Bhopal", country: "India", img: "./Bhopal.jpg" },
  { name: "Nagpur", country: "India", img: "./Nagpur.jpg" },
  { name: "Varanasi", country: "India", img: "./varanasi.jpg" },
  { name: "Patna", country: "India", img: "./Patna.jpg" },
  { name: "Sonipat", country: "India", img: "./Patna.jpg" },
  { name: "Indore", country: "India", img: "./Indore.jpg" },
  { name: "Tiravanathpuram", country: "India", img: "./thiruvananthapuram.jpg" },
  { name: "Guwahati", country: "India", img: "./guwahati.jpg" },
  { name: "Pune", country: "India", img: "./Pune.jpg" },
  { name: "Navi Mumbai", country: "India", img: "./navi mumbai.jpg" },
  { name: "VijayWada", country: "India", img: "./Vijayawada.jpg" },
  { name: "Agra", country: "India", img: "./agra.jpg" },
];

const scrollSpeed = 2;

const moveCarouselRight = (carousel) => {
  return setInterval(() => {
    if (!carousel) return;
    carousel.scrollLeft += scrollSpeed;
    if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
      carousel.scrollLeft = 0;
    }
  }, 20);
};

const moveCarouselLeft = (carousel) => {
  return setInterval(() => {
    if (!carousel) return;
    carousel.scrollLeft -= scrollSpeed;
    if (carousel.scrollLeft <= 0) {
      carousel.scrollLeft = carousel.scrollWidth / 2;
    }
  }, 20);
};

const CityGrid = () => {
  const carouselRefs = [useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    const cleanups = [];

    if (carouselRefs[0].current) {
      cleanups.push(moveCarouselRight(carouselRefs[0].current));
    }
    if (carouselRefs[2].current) {
      cleanups.push(moveCarouselLeft(carouselRefs[2].current));
    }

    return () => {
      cleanups.forEach(clearInterval);
    };
  }, []);

  const renderCarousel = (className, ref, citiesList) => (
    <div className={`carousel-container film-border ${className}`} ref={ref}>
      <div className="carousel-track">
        <ul className="carousel-slides">
          {citiesList.map((city, index) => (
            <li className="carousel-slide city-slide" key={index}>
              <div className="city-card">
                <img src={city.img} alt={city.name} className="city-image" />
                <div className="city-info">
                  <h3 className="city-name">{city.name}</h3>
                  {/* Uncomment if you want to display the country */}
                  {/* <p className="city-country">{city.country}</p> */}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="city-grid-container">
      {renderCarousel("carousel-1", carouselRefs[0],uppercities)}
      <div className="carousel-container film-border carousel-2 static-carousel">
        <div className="carousel-track">
          <ul className="carousel-slides">
            {cities.map((city, index) => (
              <li className="carousel-slide city-slide" key={index}>
                <div className="city-card">
                  <img src={city.img} alt={city.name} className="city-image" />
                  <div className="city-info">
                    <h3 className="city-name">{city.name}</h3>
                    {/* <p className="city-country">{city.country}</p> */}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {renderCarousel("carousel-3", carouselRefs[2],lowercities)}
    </div>
  );
};

export default CityGrid;
