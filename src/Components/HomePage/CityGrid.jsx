import React, { useEffect, useRef, useState } from "react";
import "./CityGrid.css";
import { useNavigate } from "react-router-dom";
import PropertyListings from "../AdminPropertyUI/PropertyListings";

const cities = [
  { name: "Noida", country: "Noida", img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742293128038-noida.jpg", url: "https://townmanor.in/treefield/en/88577/noida" },
  { name: "Gurgoan", country: "China", img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742293128019-gurgoan.jpeg", url: "https://townmanor.in/treefield/en/88580/gurgaon" },
  { name: "Delhi", country: "India", img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742293127990-delhi.jpg", url: "https://townmanor.in/treefield/en/88585/delhi" },
  { name: "Faridabad", country: "Japan", img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742293128008-faridabad.png", url: "https://townmanor.in/treefield/en/88586/faridabad" },
  { name: "Dubai", country: "USA", img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742292762457-dubai.jpg", url: "https://townmanor.in/treefield/en/88589/dubai" },
  { name: "GreaterNoida", country: "France", img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742293128025-Nizamabad.jpg", url: "/location/dubai" }
];
const uppercities = [
  { name: "Doha", country: "Qatar", img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742292762445-doha.jpeg", url: "https://townmanor.in/treefield/en/88590/doha" },
  { name: "Ghaziabad", country: "India", img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742293128013-ghaziabad.jpeg", url: "https://townmanor.in/treefield/en/88579/ghaziabad" },
  { name: "Goa", country: "India", img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742293128016-goa.jpg", url: "https://townmanor.in/treefield/en/88616/goa" },
  { name: "Bengaluru", country: "India", img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742291330701-bangulore.jpg", url: "https://townmanor.in/treefield/en/88615/bengaluru" },
  { name: "Ahmedabad", country: "India", img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742291330688-Ahmedabad.jpg", url: "https://townmanor.in/treefield/en/88613/ahmedabad" },
  { name: "Jaipur", country: "India", img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742292762462-Jaipur.jpg", url: "https://townmanor.in/treefield/en/88614/jaipur" },
  { name: "Lucknow", country: "India", img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742292762467-lucknow.jpg", url: "https://townmanor.in/treefield/en/88612/lucknow" },
  { name: "Chennai", country: "India", img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742291330755-Chennai.jpg" }, // No URL found for Chennai
  { name: "Chandigarh", country: "India", img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742291330751-chandighad2.jpg" }, // No URL found for Chandigarh
  { name: "Mumbai", country: "India", img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742292762469-Mumbai.jpg" }, // No URL found for Mumbai
  { name: "Kolkata", country: "India", img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742292762465-kalkata.jpg" }, // No URL found for Kolkata
  { name: "Dehradun", country: "India", img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742292762440-dehradun.jpg" }, // No URL found for Dehradun
  { name: "Hyderabad", country: "India", img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742292762460-Hyderabad.jpg" } // No URL found for Hyderabad
];
const lowercities = [
  { name: "Bhopal", country: "India", img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742291330743-Bhopal.jpg", url: "https://townmanor.in/treefield/en/88612/bhopal" },
  { name: "Nagpur", country: "India", img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742293128022-Nagpur.jpg", url: "https://townmanor.in/treefield/en/88612/Nagpur" },
  { name: "Varanasi", country: "India", img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742293128046-varanasi.jpg", url: "https://townmanor.in/treefield/en/88612/varanasi" },
  { name: "Patna", country: "India", img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742293128041-Patna.jpg", url: "https://townmanor.in/treefield/en/88612/patna" },
  { name: "Sonipat", country: "India", img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742292762474-sonipat.jpg", url: "https://townmanor.in/treefield/en/88612/sonipat" },
  { name: "Indore", country: "India", img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742293463800-Indore.jpg", url: "https://townmanor.in/treefield/en/88612/indore" },
  { name: "Tiravanathpuram", country: "India", img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742293463807-thiruvananthapuram.jpg", url: "https://townmanor.in/treefield/en/88612/tiravanathpuram" },
  { name: "Guwahati", country: "India", img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742293463798-guwahati.jpg", url: "https://townmanor.in/treefield/en/88612/guwahati" },
  { name: "Pune", country: "India", img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742293463803-Pune.jpg", url: "https://townmanor.in/treefield/en/88612/pune" },
  { name: "Navi Mumbai", country: "India", img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742293463801-navi%20mumbai.jpg", url: "https://townmanor.in/treefield/en/88612/mumbai" },
  { name: "VijayWada", country: "India", img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742293606386-Vijayawada.jpg", url: "https://townmanor.in/treefield/en/88612/vijaywada" },
  { name: "Agra", country: "India", img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742291330684-agra.jpg", url: "https://townmanor.in/treefield/en/88612/agra" },
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
  const navigate = useNavigate();
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
              onClick={() => handlecity(city.name)} // Redirect on city click
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
  const handlecity = (cityname) =>{ 
   navigate(`/adminproperty/${cityname}`)
  }
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
                
                style={{
                  cursor:'pointer'
                }} // Redirect on city click
              >
                <div className="city-card" onClick={()=>{
                  handlecity(city.name);
                }}>
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
