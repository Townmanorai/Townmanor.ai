import React from "react";
import "../common.css";
import "../commonsecond.css";

// Dummy JSON for category_options_21 and category_options_52 (Amenities)
// const categoryOptions21 = [
//   {
//     option_name: "Balcony",
//     option_value: true,
//     icon: "🏞️",
//   },
//   {
//     option_name: "Lift",
//     option_value: true,
//     icon: "🏢",
//   },
//   {
//     option_name: "Pool",
//     option_value: true,
//     icon: "🏊",
//   },
//   {
//     option_name: "Parking",
//     option_value: true,
//     icon: "🚗",
//   },
//   {
//     option_name: "Gymnasium",
//     option_value: true,
//     icon: "🏋️",
//   },
//   {
//     option_name: "Intercom Facility",
//     option_value: true,
//     icon: "📞",
//   },
//   {
//     option_name: "Multiple Purpose Hall",
//     option_value: true,
//     icon: "🏛️",
//   },
//   {
//     option_name: "CCTV",
//     option_value: true,
//     icon: "📹",
//   },
//   {
//     option_name: "Power Backup",
//     option_value: true,
//     icon: "🔋",
//   },
//   {
//     option_name: "Park/Garden",
//     option_value: true,
//     icon: "🌳",
//   },
//   {
//     option_name: "Security",
//     option_value: true,
//     icon: "🔒",
//   },
//   {
//     option_name: "Multiple Purpose Court",
//     option_value: true,
//     icon: "🏀",
//   },
//   {
//     option_name: "Play Area",
//     option_value: true,
//     icon: "🏟️",
//   },
//   {
//     option_name: "Parking",
//     option_value: true,
//     icon: "🚗",
//   },
// ];

// const categoryOptions52 = [
  
// ];

// const PropertyAmenities = () => {
//   return (
//     <div className="features-dv">
//       <h3>Amenities</h3>

//       {/* First form (category_options_21) */}
//       <form className="form_field">
//         <ul>
//           {categoryOptions21.map((val, key) => (
//             val.option_value && (
//               <li className="input-field" key={key}>
//                 <span className="float-left" id={`c21${key}`}>
//                   {val.icon}
//                 </span>
//                 <label htmlFor={`c21${key}`}>
//                   <span></span>
//                   <small>{val.option_name} </small>
//                 </label>
//               </li>
//             )
//           ))}
//         </ul>
//       </form>

//       {/* Second form (category_options_52) */}
//       {categoryOptions52.length > 0 && (
//         <form className="form_field mt-3">
//           <ul>
//             {categoryOptions52.map((val, key) => (
//               val.option_value && (
//                 <li className="input-field" key={key}>
//                   <input
//                     type="checkbox"
//                     name="cc"
//                     id={`c52${key}`}
//                     checked={val.option_value}
//                   />
//                   <label htmlFor={`c52${key}`}>
//                     <span></span>
//                     <small>{val.option_name} </small>
//                   </label>
//                 </li>
//               )
//             ))}
//           </ul>
//         </form>
//       )}
//     </div>
//   );
// };

// export default PropertyAmenities;



// Dummy JSON for category_options_21 and category_options_52 (Amenities)
const categoryOptions21 = [
  {
    option_name: "Balcony",
    option_value: true,
    icon: "http://localhost/townmanor.in/files/balcony.png",
  },
  {
    option_name: "Lift",
    option_value: true,
    icon: "http://localhost/townmanor.in/files/elevator_11529195_2.png",
  },
  {
    option_name: "Pool",
    option_value: true,
    icon: "http://localhost/townmanor.in/files/swimming.png",
  },
  {
    option_name: "Parking",
    option_value: true,
    icon: "http://localhost/townmanor.in/templates/selio/assets/img/icons/option_id/32.png",
  },
  {
    option_name: "Gymnasium",
    option_value: true,
    icon: "http://localhost/townmanor.in/files/e4d81f13f9.png",
  },
  {
    option_name: "Intercom Facility",
    option_value: true,
    icon: "http://localhost/townmanor.in/files/telephone_1.png",
  },
  {
    option_name: "Multiple Purpose Hall",
    option_value: true,
    icon: "http://localhost/townmanor.in/files/city_hall.png",
  },
  {
    option_name: "CCTV",
    option_value: true,
    icon: "http://localhost/townmanor.in/files/cctv_camera.png",
  },
  {
    option_name: "Power Backup",
    option_value: true,
    icon: "http://localhost/townmanor.in/files/power_plug.png",
  },
  {
    option_name: "Park/Garden",
    option_value: true,
    icon: "http://localhost/townmanor.in/files/park.png",
  },
  {
    option_name: "Security",
    option_value: true,
    icon: "http://localhost/townmanor.in/files/security_agent.png",
  },
  {
    option_name: "Multiple Purpose Court",
    option_value: true,
    icon: "http://localhost/townmanor.in/files/basketball_player_scoring.png",
  },
  {
    option_name: "Play Area",
    option_value: true,
    icon: "http://localhost/townmanor.in/files/slide.png",
  },
];

const categoryOptions52 = [
  // You can add similar data here if needed
];

const PropertyAmenities = () => {
  return (
    <div className="features-dv">
      <h3>Amenities</h3>

      {/* First form (category_options_21) */}
      <form className="form_field">
        <ul>
          {categoryOptions21.map((val, key) => (
            val.option_value && (
              <li className="input-field" key={key}>
                <span className="float-left" id={`c21${key}`}>
                  <img src={val.icon} alt={val.option_name} />
                </span>
                <label htmlFor={`c21${key}`}>
                  <span></span>
                  <small>{val.option_name} <img src={val.icon} alt={val.option_name} /></small>
                </label>
              </li>
            )
          ))}
        </ul>
      </form>

      {/* Second form (category_options_52) */}
      {categoryOptions52.length > 0 && (
        <form className="form_field mt-3">
          <ul>
            {categoryOptions52.map((val, key) => (
              val.option_value && (
                <li className="input-field" key={key}>
                  <input
                    type="checkbox"
                    name="cc"
                    id={`c52${key}`}
                    checked={val.option_value}
                    readOnly
                  />
                  <label htmlFor={`c52${key}`}>
                    <span></span>
                    <small>{val.option_name} <img src={val.icon} alt={val.option_name} /></small>
                  </label>
                </li>
              )
            ))}
          </ul>
        </form>
      )}
    </div>
  );
};

export default PropertyAmenities;
