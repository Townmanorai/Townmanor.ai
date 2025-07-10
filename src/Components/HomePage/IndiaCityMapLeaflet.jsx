import React, { useState } from "react";
import "./IndiaCityMapLeaflet.css";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icon issue in Leaflet + React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const cities = [
  { name: "Noida", lat: 28.5355, lng: 77.3910, img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742293128038-noida.jpg" },
  { name: "Gurgaon", lat: 28.4595, lng: 77.0266, img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742293128019-gurgoan.jpeg" },
  { name: "Delhi", lat: 28.6139, lng: 77.2090, img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742293127990-delhi.jpg" },
  { name: "Faridabad", lat: 28.4089, lng: 77.3178, img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742293128008-faridabad.png" },
  { name: "Dubai", lat: 25.2048, lng: 55.2708, img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742292762457-dubai.jpg" },
  { name: "Greater Noida", lat: 28.4744, lng: 77.5040, img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742293128025-Nizamabad.jpg" },
  { name: "Doha", lat: 25.276987, lng: 51.520008, img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742292762445-doha.jpeg" },
  { name: "Ghaziabad", lat: 28.6692, lng: 77.4538, img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742293128013-ghaziabad.jpeg" },
  { name: "Goa", lat: 15.2993, lng: 74.1240, img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742293128016-goa.jpg" },
  { name: "Bengaluru", lat: 12.9716, lng: 77.5946, img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742291330701-bangulore.jpg" },
  { name: "Ahmedabad", lat: 23.0225, lng: 72.5714, img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742291330688-Ahmedabad.jpg" },
  { name: "Jaipur", lat: 26.9124, lng: 75.7873, img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742292762462-Jaipur.jpg" },
  { name: "Lucknow", lat: 26.8467, lng: 80.9462, img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742292762467-lucknow.jpg" },
  { name: "Chennai", lat: 13.0827, lng: 80.2707, img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742291330755-Chennai.jpg" },
  { name: "Chandigarh", lat: 30.7333, lng: 76.7794, img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742291330751-chandighad2.jpg" },
  { name: "Mumbai", lat: 19.0760, lng: 72.8777, img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742292762469-Mumbai.jpg" },
  { name: "Kolkata", lat: 22.5726, lng: 88.3639, img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742292762465-kalkata.jpg" },
  { name: "Dehradun", lat: 30.3165, lng: 78.0322, img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742292762440-dehradun.jpg" },
  { name: "Hyderabad", lat: 17.3850, lng: 78.4867, img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742292762460-Hyderabad.jpg" },
  { name: "Bhopal", lat: 23.2599, lng: 77.4126, img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742291330743-Bhopal.jpg" },
  { name: "Nagpur", lat: 21.1458, lng: 79.0882, img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742293128022-Nagpur.jpg" },
  { name: "Varanasi", lat: 25.3176, lng: 82.9739, img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742293128046-varanasi.jpg" },
  { name: "Patna", lat: 25.5941, lng: 85.1376, img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742293128041-Patna.jpg" },
  { name: "Sonipat", lat: 28.9958, lng: 77.0114, img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742292762474-sonipat.jpg" },
  { name: "Indore", lat: 22.7196, lng: 75.8577, img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742293463800-Indore.jpg" },
  { name: "Thiruvananthapuram", lat: 8.5241, lng: 76.9366, img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742293463807-thiruvananthapuram.jpg" },
  { name: "Guwahati", lat: 26.1445, lng: 91.7362, img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742293463798-guwahati.jpg" },
  { name: "Pune", lat: 18.5204, lng: 73.8567, img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742293463803-Pune.jpg" },
  { name: "Navi Mumbai", lat: 19.0330, lng: 73.0297, img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742293463801-navi%20mumbai.jpg" },
  { name: "Vijayawada", lat: 16.5062, lng: 80.6480, img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742293606386-Vijayawada.jpg" },
  { name: "Agra", lat: 27.1767, lng: 78.0081, img: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742291330684-agra.jpg" }
];



function FlyToCity({ position, onAnimationEnd }) {
  const map = useMap();

  React.useEffect(() => {
    if (position) {
      const handleMoveEnd = () => {
        if (onAnimationEnd) {
          onAnimationEnd();
        }
        map.off('moveend', handleMoveEnd); // Clean up listener
      };

      map.on('moveend', handleMoveEnd);
      map.flyTo(position, 7, { duration: 1.5 });

      return () => {
        map.off('moveend', handleMoveEnd);
      };
    }
  }, [position, map, onAnimationEnd]);

  return null;
}

export default function IndiaCityMapLeaflet() {
  const [selected, setSelected] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  // Find selected city object
  const selectedCity = cities.find(city => city.name === selected);

  const handleCityClick = (city) => {
    setSelected(city.name);
    setIsAnimating(true);
  };

  const handleAnimationEnd = () => {
    if (selectedCity) {
      navigate(`/adminproperty/${selectedCity.name}`);
    }
    setIsAnimating(false);
  };

  return (
    <div className="icmlf-container">
      {/* Left: Leaflet Map */}
      <div className="icmlf-map-section">
        <MapContainer
          center={[22.9734, 78.6569]} // Center of India
          zoom={5}
          className="icmlf-map"
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {cities.map(city => (
            <Marker
              key={city.name}
              position={[city.lat, city.lng]}
              eventHandlers={{
                click: () => navigate(`/adminproperty/${city.name}`)
              }}
            >
              <Popup>
                <b>{city.name}</b>
              </Popup>
            </Marker>
          ))}
          {selectedCity && (
            <FlyToCity 
              position={[selectedCity.lat, selectedCity.lng]} 
              onAnimationEnd={isAnimating ? handleAnimationEnd : null} 
            />
          )}
        </MapContainer>
      </div>
      {/* Right: City List */}
      <div className="icmlf-city-list">
        <div className="icmlf-city-list-inner">
          {cities.map((city) => (
            <div
              key={city.name}
              onClick={() => handleCityClick(city)}
              className={`icmlf-city-card${selected === city.name ? ' icmlf-city-card-selected' : ''}`}
            >
              <img
                src={city.img}
                alt={city.name}
                className="icmlf-city-img"
              />
              <span className="icmlf-city-name">{city.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}