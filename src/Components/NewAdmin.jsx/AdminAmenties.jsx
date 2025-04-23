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
import { MdLocationOn, MdSecurity, MdElevator, MdLocalLaundryService, MdTrain } from "react-icons/md";
import { BiDownload } from "react-icons/bi";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import "./AdminAmenties.css";
import EmiCalculator from '../ownerpage/EmiCalculator';
import Map from '../SearchProperty/Map';
import PropertyPDF from '../ownerpage/PropertyPDF';
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
function AdminAmenties({property}) {
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
          icon: MdTrain,
          title: "Metro",
          distance: property.metro && property.metro !== "nan" ? `${property.metro}` : null,
          description: "Nearest metro station"
        },
        {
          icon: FaSchool,
          title: "School",
          distance: property.school && property.school !== "nan" ? `${property.school}` : null,
          description: "Top rated schools nearby"
        },
        {
          icon: FaHospital,
          title: "Hospital",
          distance: property.hospital && property.hospital !== "nan" ? `${property.hospital}` : null,
          description: "Major hospitals in vicinity"
        },
        {
          icon: FaBuilding,
          title: "Mall",
          distance: property.mall && property.mall !== "nan" ? `${property.mall}` : null,
          description: "Shopping malls & centers"
        },
        {
          icon: FaBus,
          title: "Bus Stop",
          distance: property.bus && property.bus !== "nan" ? `${property.bus}` : null,
          description: "Public transport access"
        },
        {
          icon: FaUtensils,
          title: "Restaurant",
          distance: property.restaurant && property.restaurant !== "nan" ? `${property.restaurant}` : null,
          description: "Dining options available"
        },
        {
          icon: FaFilm,
          title: "Cinema",
          distance: property.cinema && property.cinema !== "nan" ? `${property.cinema}` : null,
          description: "Entertainment nearby"
        }
      ].filter(place => place.distance && place.distance !== "null ");
    
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
          <section className="unique-loan-calc-p45 admin_calculator">
            {/* <EmiCalculator property={property} /> */}
            {/* <img src='/homeload.png' id='adminamenties_adv'></img> */}
            {(() => {
              let loanAmount;
              console.log('Original price:', property.price);
              console.log('Purpose:', property.purpose);

              if (property.purpose === 'rent') {
                loanAmount = "10000000"; // 1 crore for rent
              } else {
                // For sale properties
                if (typeof property.price === 'string') {
                  // Remove currency symbol and clean the string
                  let processedPrice = property.price
                    .replace(/[^\d.\-CrLcrl\s]/g, '') // Remove everything except numbers, dots, Cr, L and spaces
                    .replace(/\s+/g, '')  // Remove all spaces
                    .trim();
                  
                  console.log('Processed price:', processedPrice);

                  if (processedPrice.includes('-')) {
                    const priceRange = processedPrice.split('-');
                    console.log('Price range parts:', priceRange);

                    const values = priceRange.map(price => {
                      price = price.trim();
                      console.log('Processing price part:', price);
                      
                      // Extract number and unit
                      const numMatch = price.match(/(\d+\.?\d*)/);
                      const number = numMatch ? parseFloat(numMatch[0]) : 0;
                      
                      if (price.toLowerCase().includes('cr')) {
                        console.log('Crore value:', number * 10000000);
                        return number * 10000000;
                      } else if (price.toLowerCase().includes('l')) {
                        console.log('Lakh value:', number * 100000);
                        return number * 100000;
                      }
                      return number;
                    }).filter(val => !isNaN(val) && val > 0);

                    console.log('Calculated values:', values);
                    loanAmount = String(Math.max(...values));
                  } else {
                    // Single value handling
                    const numMatch = processedPrice.match(/(\d+\.?\d*)/);
                    const number = numMatch ? parseFloat(numMatch[0]) : 0;
                    
                    if (processedPrice.toLowerCase().includes('cr')) {
                      loanAmount = String(number * 10000000);
                    } else if (processedPrice.toLowerCase().includes('l')) {
                      loanAmount = String(number * 100000);
                    } else {
                      loanAmount = String(number);
                    }
                  }
                } else {
                  // Fallback for non-string price
                  if (property.pricerange === 'Crore') {
                    loanAmount = String(property.price * 10000000);
                  } else if (property.pricerange === 'Lakh') {
                    loanAmount = String(property.price * 100000);
                  } else {
                    loanAmount = String(property.price);
                  }
                }
              }

              // Ensure we have a valid number, otherwise default to a reasonable value
              if (!loanAmount || isNaN(parseFloat(loanAmount))) {
                console.log('Invalid loan amount, defaulting to 10000000');
                loanAmount = "10000000"; // Default to 1 crore if parsing fails
              }

              console.log('Final loan amount:', loanAmount);
              const downPayment = String(parseFloat(loanAmount) * 0.2);
              console.log('Down payment:', downPayment);

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
        </div></>
  )
}

export default AdminAmenties