import "./Amenities.css";
import React from 'react';
import { TbAirConditioning } from "react-icons/tb";
import { FaSatelliteDish } from "react-icons/fa";
import { FaWifi } from "react-icons/fa";
import { LuUtensilsCrossed } from "react-icons/lu";
import { PiThermometerHotBold } from "react-icons/pi";
import { GrElevator } from "react-icons/gr";
import { LiaIntercom } from "react-icons/lia";
import { PiPark } from "react-icons/pi";
import { MdMicrowave } from "react-icons/md";
import { LuParkingCircle } from "react-icons/lu";
import { BiCctv } from "react-icons/bi";
import { MdSecurity } from "react-icons/md";
import { GiWeightLiftingUp } from "react-icons/gi";
import { FaPersonSwimming } from "react-icons/fa6";
import { PiCourtBasketball } from "react-icons/pi";


const Amenities = ({ property }) => {

  let amenitiesArray = property.amenities;

  if (typeof amenitiesArray === 'string') {
    try {
      amenitiesArray = JSON.parse(amenitiesArray);
    } catch (error) {
      console.error("Failed to parse amenities: ", error);
      amenitiesArray = []; // Default to empty array if parsing fails
    }
  }

  // If it's not an array, ensure it is treated as an empty array
  if (!Array.isArray(amenitiesArray)) {
    amenitiesArray = [];
  }

  const amenitiesList = {
    "Air Conditioning": <TbAirConditioning size={20} />,
    "Cable TV": <FaSatelliteDish size={20} />,
    "Internet": <FaWifi size={20} />,
    "Court": <PiCourtBasketball size={20} />,
    "Dishwasher": <LuUtensilsCrossed size={20} />,
    "Heating": <PiThermometerHotBold size={20} />,
    "Gym": <GiWeightLiftingUp size={20} />,
    "Microwave": <MdMicrowave size={20} />,
    "Lift": <GrElevator size={20} />,
    "CCTV": <BiCctv size={20} />,
    "Intercom Facility": <LiaIntercom size={20} />,
    "Security": <MdSecurity size={20} />,
    "Parking": <LuParkingCircle size={20} />,
    "Park/Garden": <PiPark size={20} />,
    "Pool": <FaPersonSwimming size={20} />,
    "Club House": <FaWifi size={20} />, // Ensure to include Club House if needed
  };

  return (

    <div>
      <div className="sub-amenities" id="navamentity">
        <div className="amenities-box">
          <h3>Amenities</h3>
          <div className="amenities-grid">
            {/* Conditional rendering of amenities */}
            {amenitiesArray && amenitiesArray.length > 0 ? (
              amenitiesArray.map((amenity, index) => (
                amenitiesList[amenity] && (
                  <div className="amenity-box" key={index}>
                    <span className="icon-amenities">{amenitiesList[amenity]}</span>
                    <span>{amenity}</span>
                  </div>
                )
              ))
            ) : (
              <p>No amenities available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Amenities;