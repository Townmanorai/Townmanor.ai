import React, { useEffect, useState } from 'react'

import { TbGasStation } from 'react-icons/tb'
import { HiOutlineLockClosed } from 'react-icons/hi2'
import { FaTruckMoving } from 'react-icons/fa'

import './ColivingUtilitiesUnique.css'
import { FiWifi } from "react-icons/fi";
import { TbPlug } from "react-icons/tb";

import { GiForkKnifeSpoon, GiWaterDrop } from "react-icons/gi";
import { FaTshirt } from "react-icons/fa";


const amenityIconMap = {
  'High-speed Wi-Fi': <FiWifi className="colivingUtilitiesUniqueIcon" />,
  'Wi-Fi': <FiWifi className="colivingUtilitiesUniqueIcon" />,
  'Smart TV': <TbPlug className="colivingUtilitiesUniqueIcon" />,
  'google tv': <TbPlug className="colivingUtilitiesUniqueIcon" />,
  'microwave': <GiForkKnifeSpoon className="colivingUtilitiesUniqueIcon" />,
  'washing machine': <FaTshirt className="colivingUtilitiesUniqueIcon" />,
  'Laundry facility': <FaTshirt className="colivingUtilitiesUniqueIcon" />,
  'Ac': <TbPlug className="colivingUtilitiesUniqueIcon" />,
  'AC': <TbPlug className="colivingUtilitiesUniqueIcon" />,
  'Refrigetor': <TbPlug className="colivingUtilitiesUniqueIcon" />,
  'Built-in hob': <TbPlug className="colivingUtilitiesUniqueIcon" />,
  'Electric kettle': <TbPlug className="colivingUtilitiesUniqueIcon" />,
  'kettle': <TbPlug className="colivingUtilitiesUniqueIcon" />,
  'Built-in RO': <GiWaterDrop className="colivingUtilitiesUniqueIcon" />,
  'Water softener': <GiWaterDrop className="colivingUtilitiesUniqueIcon" />,
  'Geyser': <GiWaterDrop className="colivingUtilitiesUniqueIcon" />,
  'geyser': <GiWaterDrop className="colivingUtilitiesUniqueIcon" />,
  'Toaster': <GiForkKnifeSpoon className="colivingUtilitiesUniqueIcon" />,
  'chimney': <GiForkKnifeSpoon className="colivingUtilitiesUniqueIcon" />,
  'rice cooker': <GiForkKnifeSpoon className="colivingUtilitiesUniqueIcon" />,
  'Balcony': <GiForkKnifeSpoon className="colivingUtilitiesUniqueIcon" />,
  'Complimentary breakfast': <GiForkKnifeSpoon className="colivingUtilitiesUniqueIcon" />,
  'parking': <FaTruckMoving className="colivingUtilitiesUniqueIcon" />,
  'coffee maker': <GiForkKnifeSpoon className="colivingUtilitiesUniqueIcon" />,
};



const ColivingUtilities = ({coliving}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    let amenities = coliving.amenities || [];
    if (typeof amenities === 'string') {
      amenities = amenities.split(',').map(a => a.trim()).filter(Boolean);
    }
    setData(Array.isArray(amenities) ? amenities : []);
  }, [coliving]);
  console.log(data);
  // Parse nearby_location
  let nearbyLocations = [];
  try {
    nearbyLocations = JSON.parse(coliving.nearby_location);
  } catch {
    nearbyLocations = [];
  }

  return (
    <div id='colivingutility'>
      <div className="colivingUtilitiesUniqueBox">
        <div className="colivingUtilitiesUniqueTitle">Utilities & Add-Ons</div>
        <div className="colivingUtilitiesUniqueGrid">
          {data.map((amenity, idx) => (
            <div className="colivingUtilitiesUniqueItem" key={idx}>
              {amenityIconMap[amenity] || <TbPlug className="colivingUtilitiesUniqueIcon" />}
              <div className="colivingUtilitiesUniqueLabel">{amenity}</div>
              <div className="colivingUtilitiesUniqueSub">Included</div>
            </div>
          ))}
        </div>
      </div>

      {/* Nearby Location Section */}
      <div className="colivingNearbyLocationBox">
        <div className="colivingNearbyLocationTitle">Near by Location</div>
        <div className="colivingNearbyLocationTabs">
          {nearbyLocations.map((loc, idx) => (
            <div className="colivingNearbyLocationTab" key={idx}>{loc}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ColivingUtilities