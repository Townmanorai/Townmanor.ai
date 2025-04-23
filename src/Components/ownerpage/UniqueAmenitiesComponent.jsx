import React, { useState, useCallback } from 'react'
import {
  FaBolt,
  FaBuilding,
  FaTint,
  FaDumbbell,
  FaSwimmer,
  FaHeart,
  FaWifi,
  FaHome,
  FaParking,
  FaSwimmingPool,
  FaTree,
  FaShower,
  FaFireExtinguisher,
  FaKey,
  FaUtensils,
  FaCouch,
  FaCar,
  FaUserShield,
  FaGamepad,
  FaVideo,
  FaFan,
  FaBed,
  FaHotTub,
  FaBasketballBall,
  FaTableTennis,
  FaUmbrellaBeach,
  FaGlassCheers,
  FaHospital,
  FaBus,
  FaFilm,
  FaSchool
} from "react-icons/fa";
import { MdLocationOn, MdSecurity, MdElevator, MdLocalLaundryService } from "react-icons/md";
import { BiDownload } from "react-icons/bi";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import "./Amenties.css";
import EmiCalculator from './EmiCalculator';
import Map from '../SearchProperty/Map';
import PropertyPDF from './PropertyPDF';
const amenityIcons = {
  'Air Conditioner': FaFan,
  'Cable TV': FaVideo,
  'Wifi': FaWifi,
  'Kitchen': FaUtensils,
  'Heating': FaHotTub,
  'Lift': MdElevator,
  'Intercom': FaKey,
  'Laundry': MdLocalLaundryService,
  'Park': FaTree,
  'Parking': FaParking,
  'Guest Parking': FaCar,
  'Security': MdSecurity,
  'Play Area': FaGamepad,
  'CCTV': FaVideo,
  'Power Backup': FaBolt,
  'Fire Safety': FaFireExtinguisher,
  'Gym': FaDumbbell,
  'Swimming Pool': FaSwimmingPool,
  'Basketball Court': FaBasketballBall,
  'Table Tennis': FaTableTennis,
  'Party Hall': FaGlassCheers,
  'Living Room': FaCouch,
  'Bedroom': FaBed,
  'Garden': FaTree,
  'Beach Access': FaUmbrellaBeach,
  'Security Guard': FaUserShield,
  'Club House': FaHome
};

function UniqueAmenitiesComponent({ property }) {
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  if (!property) return null;

  // Parse amenities from string to array if needed
  let amenities = [];
  try {
    amenities = property.amenities ? JSON.parse(property.amenities).map(name => ({ name })) : [];
  } catch (e) {
    console.error('Error parsing amenities:', e);
  }

  // Create nearby places array directly from the API data
  const nearbyPlaces = [
    {
      icon: FaSchool,
      title: "School",
      distance: property.school ? `${property.school} km` : null,
      description: "Top rated schools nearby"
    },
    {
      icon: FaHospital,
      title: "Hospital",
      distance: property.hospital ? `${property.hospital} km` : null,
      description: "Major hospitals in vicinity"
    },
    {
      icon: FaBuilding,
      title: "Mall",
      distance: property.mall ? `${property.mall} km` : null,
      description: "Shopping malls & centers"
    },
    {
      icon: FaBus,
      title: "Bus Stop",
      distance: property.bus ? `${property.bus} km` : null,
      description: "Public transport access"
    },
    {
      icon: FaUtensils,
      title: "Restaurant",
      distance: property.restaurant ? `${property.restaurant} km` : null,
      description: "Dining options available"
    },
    {
      icon: FaFilm,
      title: "Cinema",
      distance: property.cinema ? `${property.cinema} km` : null,
      description: "Entertainment nearby"
    }
  ].filter(place => place.distance && place.distance !== "null km");

  const handleToggleAmenities = useCallback(() => {
    setShowAllAmenities(prev => !prev);
  }, []);

  const displayedAmenities = showAllAmenities ? amenities : amenities.slice(0, 4);

  return (
    <>
      <div className="unique-wrapper-r34g56">
        <div className='amenties_distance'>
          {nearbyPlaces.length > 0 && (
            <section className="unique-landmarks-b23f">
              <h3 className="unique-section-heading-p67l">Nearby Distances</h3>
              <div className="distance-swiper-container">
                <Swiper
                  modules={[Navigation]}
                  navigation={true}
                  spaceBetween={20}
                  slidesPerView={3}
                  className="distance-swiper"
                  breakpoints={{
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 10
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 15
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 20
                    },
                    
                  }}
                  style={{
                    "--swiper-navigation-color": "#e23e57",
                    "--swiper-navigation-size": "25px"
                  }}
                >
                  {nearbyPlaces.map((place, index) => (
                    <SwiperSlide key={`distance-${index}`}>
                      <div className="distance-card">
                        <div className="distance-icon-wrapper">
                          <place.icon className="distance-icon" />
                        </div>
                        <h4 className="distance-title">{place.title}</h4>
                        <div className="distance-value">{place.distance}</div>
                        <p className="distance-description">{place.description}</p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </section>
          )}
          
          {amenities.length > 0 && (
            <section className="unique-amenities-w43v">
              <h3 className="unique-section-heading-p67l">Amenities</h3>
              <div className="unique-amenities-grid-wx2">
                {displayedAmenities.map((amenity, index) => {
                  const IconComponent = amenityIcons[amenity.name] || FaHome;
                  return (
                    <div key={`amenity-${index}`}>
                      <span className="amenity-icon">
                        <IconComponent />
                      </span>
                      <span className="amenity-name">{amenity.name}</span>
                    </div>
                  );
                })}
              </div>
              <div className="unique-amenities-footer-b8t">
                <button
                  className="unique-amenities-btn-view"
                  onClick={handleToggleAmenities}
                  type="button"
                >
                  {showAllAmenities ? 'Show Less' : `View all Amenities (${amenities.length})`}
                </button>
                <button className="unique-amenities-btn-download" type="button">
                  <BiDownload /> Download Brochure  
                </button>
              </div>
            </section>
          )}

          <section>
            <div className="unique-map-swiper-container">
              <h2 className="unique-map-title">Location Map</h2>
              <div className="unique-map-wrapper" style={{ height: '400px', width: '100%', borderRadius: '10px', overflow: 'hidden' }}>
                <Map results={[{ 
                  lat: parseFloat(property.lat), 
                  lng: parseFloat(property.lng),
                  property_name: property.name,
                  locality: property.locality,
                  city: property.city
                }]} /> 
              </div>
            </div>
          </section>
        </div>
        <section className="unique-loan-calc-p45">
        {(() => {
          let loanAmount;
          if (property.purpose === 'rent') {
            loanAmount = "10000000"; // 1 crore for rent
          } else {
            // For sale properties
            if (property.pricerange === 'Crore') {
              loanAmount = String(property.price * 10000000); // Convert Cr to actual value
            } else if (property.pricerange === 'Lakh') {
              loanAmount = String(property.price * 100000); // Convert Lakh to actual value
            } else {
              loanAmount = String(property.price); // Use as is
            }
          }
          const downPayment = String(parseFloat(loanAmount) * 0.2); // 20% of the loan amount

          return (
            <EmiCalculator 
              defaultLoanAmount={loanAmount}
              defaultDownPayment={downPayment}
              defaultInterestRate="8.5"
              defaultLoanTenure="20"
              defaultTenureType="Years"
            />
          );
        })()}
        </section>
      </div>
    </>
  );
}

export default UniqueAmenitiesComponent