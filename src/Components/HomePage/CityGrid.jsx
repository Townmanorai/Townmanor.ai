import React, { useEffect, useRef, useState } from "react";
import "./CityGrid.css";
import { useNavigate } from "react-router-dom";

const cities = [
  { name: "Noida", country: "Noida", img: "./dfb6b5128e.jpg", url: "https://townmanor.in/treefield/en/88577/noida" },
  { name: "Gurgoan", country: "China", img: "./gurgoan.jpeg", url: "https://townmanor.in/treefield/en/88580/gurgaon" },
  { name: "Delhi", country: "South Korea", img: "./delhi.jpg", url: "https://townmanor.in/treefield/en/88585/delhi" },
  { name: "Faridabad", country: "Japan", img: "./faridabad.png", url: "https://townmanor.in/treefield/en/88586/faridabad" },
  { name: "Dubai", country: "USA", img: "./dubai.jpg", url: "https://townmanor.in/treefield/en/88589/dubai" },
  { name: "GreaterNoida", country: "France", img: "./faridabad.png", url: "/location/dubai" }
];
const uppercities = [
  { name: "Doha", country: "Qatar", img: "./doha.jpeg", url: "https://townmanor.in/treefield/en/88590/doha" },
  { name: "Ghaziabad", country: "India", img: "./ghaziabad.jpeg", url: "https://townmanor.in/treefield/en/88579/ghaziabad" },
  { name: "Goa", country: "India", img: "./goa.jpg", url: "https://townmanor.in/treefield/en/88616/goa" },
  { name: "Bengaluru", country: "India", img: "./bangulore.jpg", url: "https://townmanor.in/treefield/en/88615/bengaluru" },
  { name: "Ahmedabad", country: "India", img: "./Ahmedabad.jpg", url: "https://townmanor.in/treefield/en/88613/ahmedabad" },
  { name: "Jaipur", country: "India", img: "./Jaipur.jpg", url: "https://townmanor.in/treefield/en/88614/jaipur" },
  { name: "Lucknow", country: "India", img: "./lucknow.jpg", url: "https://townmanor.in/treefield/en/88612/lucknow" },
  { name: "Chennai", country: "India", img: "./Chennai.jpg" }, // No URL found for Chennai
  { name: "Chandigarh", country: "India", img: "./chandighad2.jpg" }, // No URL found for Chandigarh
  { name: "Mumbai", country: "India", img: "./mummbai.jpg" }, // No URL found for Mumbai
  { name: "Kolkata", country: "India", img: "./kalkata.jpg" }, // No URL found for Kolkata
  { name: "Dehradun", country: "India", img: "./dehradun.jpg" }, // No URL found for Dehradun
  { name: "Hyderabad", country: "India", img: "./Hyderabad.jpg" } // No URL found for Hyderabad
];
const lowercities = [
  { name: "Bhopal", country: "India", img: "./Bhopal.jpg", url: "https://townmanor.in/treefield/en/88612/bhopal" },
  { name: "Nagpur", country: "India", img: "./Nagpur.jpg", url: "https://townmanor.in/treefield/en/88612/Nagpur" },
  { name: "Varanasi", country: "India", img: "./varanasi.jpg", url: "https://townmanor.in/treefield/en/88612/varanasi" },
  { name: "Patna", country: "India", img: "./Patna.jpg", url: "https://townmanor.in/treefield/en/88612/patna" },
  { name: "Sonipat", country: "India", img: "./Patna.jpg", url: "https://townmanor.in/treefield/en/88612/sonipat" },
  { name: "Indore", country: "India", img: "./Indore.jpg", url: "https://townmanor.in/treefield/en/88612/indore" },
  { name: "Tiravanathpuram", country: "India", img: "./thiruvananthapuram.jpg", url: "https://townmanor.in/treefield/en/88612/tiravanathpuram" },
  { name: "Guwahati", country: "India", img: "./guwahati.jpg", url: "https://townmanor.in/treefield/en/88612/guwahati" },
  { name: "Pune", country: "India", img: "./Pune.jpg", url: "https://townmanor.in/treefield/en/88612/pune" },
  { name: "Navi Mumbai", country: "India", img: "./navi mumbai.jpg", url: "https://townmanor.in/treefield/en/88612/mumbai" },
  { name: "VijayWada", country: "India", img: "./Vijayawada.jpg", url: "https://townmanor.in/treefield/en/88612/vijaywada" },
  { name: "Agra", country: "India", img: "./agra.jpg", url: "https://townmanor.in/treefield/en/88612/agra" },
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
  const [isHovered, setIsHovered] = useState(false);  // To track mouse hover state

  useEffect(() => {
    const cleanups = [];

    if (!isHovered) {
      if (carouselRefs[0].current) {
        cleanups.push(moveCarouselRight(carouselRefs[0].current));
      }
      if (carouselRefs[2].current) {
        cleanups.push(moveCarouselLeft(carouselRefs[2].current));
      }
    }

    return () => {
      cleanups.forEach(clearInterval);
    };
  }, [isHovered]);  // Add hover dependency to control scrolling

  const handleCityClick = (url) => {
    if (url) {
      window.location.href = url; // Redirect to the city URL
    }
  };

  const renderCarousel = (className, ref, citiesList) => (
    <div
      className={`carousel-container film-border ${className}`}
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}  // Stop scrolling when mouse enters
      onMouseLeave={() => setIsHovered(false)}  // Resume scrolling when mouse leaves
    >
      <div className="carousel-track">
        <ul className="carousel-slides">
          {citiesList.map((city, index) => (
            <li
              className="carousel-slide city-slide"
              key={index}
              onClick={() => handleCityClick(city.url)} // Redirect on city click
            >
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
  );

  return (
    <div className="city-grid-container">
      {renderCarousel("carousel-1", carouselRefs[0], uppercities)}
      <div className="carousel-container film-border carousel-2 static-carousel">
        <div className="carousel-track">
          <ul className="carousel-slides">
            {cities.map((city, index) => (
              <li
                className="carousel-slide city-slide"
                key={index}
                onClick={() => handleCityClick(city.url)}
                style={{
                  cursor:'pointer'
                }} // Redirect on city click
              >
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
      {renderCarousel("carousel-3", carouselRefs[2], lowercities)}
    </div>
  );
};

export default CityGrid;
