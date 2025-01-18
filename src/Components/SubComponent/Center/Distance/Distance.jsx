// import React from 'react';
// import "./Distance.css";
// import { FaTrainSubway } from "react-icons/fa6";
// import { MdLocalHospital } from "react-icons/md";
// import { BiSolidSchool } from "react-icons/bi";
// import { GrCafeteria } from "react-icons/gr";
// import { MdLocalMall } from "react-icons/md";
// import { RiMovie2Line } from "react-icons/ri";
// import { PiParkBold } from "react-icons/pi";
// import { TbBusStop } from "react-icons/tb";

// const Distance = ({ property }) => {
//   // Define an array of distance items with the necessary details
//   const distanceItems = [
//     { label: 'Metro', value: property.metro, icon: <FaTrainSubway size={20} /> },
//     { label: 'Healthcare', value: property.hospital, icon: <MdLocalHospital size={20} /> },
//     { label: 'School', value: property.school, icon: <BiSolidSchool size={20} /> },
//     { label: 'Restaurant', value: property.restaurant, icon: <GrCafeteria size={20} /> },
//     { label: 'Mall', value: property.mall, icon: <MdLocalMall size={20} /> },
//     { label: 'Cinema', value: property.cinema, icon: <RiMovie2Line size={20} /> },
//     { label: 'Park', value: property.park, icon: <PiParkBold size={20} /> },
//     { label: 'Bus Stand', value: property.bus, icon: <TbBusStop size={20} /> },
//   ];

//   return (
//     <div>
//       <div className='distance'>
//         <h3>Distances</h3>
//         <div className="distance-grid">
//           {distanceItems.map((item, index) => (
//             item.value && (  // Check if the distance value exists
//               <div key={index}>
//                 <span className="icon-amenities">{item.icon}</span>
//                 <span>{item.label}:</span> {item.value}
//               </div>
//             )
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Distance;


import React from 'react';
import "./Distance.css";
import { FaTrainSubway } from "react-icons/fa6";
import { MdLocalHospital } from "react-icons/md";
import { BiSolidSchool } from "react-icons/bi";
import { GrCafeteria } from "react-icons/gr";
import { MdLocalMall } from "react-icons/md";
import { RiMovie2Line } from "react-icons/ri";
import { PiParkBold } from "react-icons/pi";
import { TbBusStop } from "react-icons/tb";

const Distance = ({ property }) => {
  // Define an array of distance items with the necessary details
  const distanceItems = [
    { label: 'Metro', value: property.metro, icon: <FaTrainSubway size={20} /> },
    { label: 'Healthcare', value: property.hospital, icon: <MdLocalHospital size={20} /> },
    { label: 'School', value: property.school, icon: <BiSolidSchool size={20} /> },
    { label: 'Restaurant', value: property.restaurant, icon: <GrCafeteria size={20} /> },
    { label: 'Mall', value: property.mall, icon: <MdLocalMall size={20} /> },
    { label: 'Cinema', value: property.cinema, icon: <RiMovie2Line size={20} /> },
    { label: 'Park', value: property.park, icon: <PiParkBold size={20} /> },  // Ensure property.park exists
    { label: 'Bus Stand', value: property.bus, icon: <TbBusStop size={20} /> },
  ];

  return (
    <div>
      <div className='distance' id='distancesecondbox'>
        <h3>Distances</h3>
        <div className="distance-grid">
          {distanceItems.map((item, index) => (
            item.value && (  // Check if the distance value exists
              <div key={index}>
                <span className="icon-amenities">{item.icon}</span>
                <span>{item.label}:</span> {item.value}
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
}

export default Distance;
