
import React from "react";
import "../common.css";
import "../commonsecond.css";

// Dummy JSON for category_options_43 (Distances)
const categoryOptions43 = [
  {
    option_name: "Metro",
    option_value: "2.5 km",
    icon: "http://localhost/townmanor.in/templates/selio/assets/img/icons/option_id/46.png"
  },
  {
    option_name: "Healthcare",
    option_value: "0.6 km",
    icon: "http://localhost/townmanor.in/templates/selio/assets/img/icons/option_id/48.png"
  },
  {
    option_name: "Restaurant",
    option_value: "0.4 km",
    icon: "http://localhost/townmanor.in/files/dinner.png"
  },
  {
    option_name: "School",
    option_value: "0.6 km",
    icon: "http://localhost/townmanor.in/files/school_1.png"
  },
  {
    option_name: "Mall",
    option_value: "1.6 km",
    icon: "http://localhost/townmanor.in/files/shopping_bag.png"
  },
  {
    option_name: "Cinemas",
    option_value: "1.7 km",
    icon: "http://localhost/townmanor.in/files/film.png"
  },
  {
    option_name: "Park",
    option_value: "0.2 km",
    icon: "http://localhost/townmanor.in/files/park (1).png"
  }
];

const PropertyDistanceDetails = () => {
  return (
    <div className="details-info">
      <h3>Distances</h3>
      <ul>
        {categoryOptions43.map((row, key) => (
          <li key={key}>
            <h4>
              <img src={row.icon} alt={row.option_name} />
              {row.option_name}:
            </h4>
            <span>{row.option_value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyDistanceDetails;


// import React from 'react';
// import "../common.css";  // Ensure you have these styles in your CSS files
// import "../commonsecond.css";

// // Dummy JSON for category_options_43
// const categoryOptions43 = [
//   {
//     option_name: "Metro",
//     option_value: "2.5 km",
//     is_text: true,
//     icon: "http://localhost/townmanor.in/templates/selio/assets/img/icons/option_id/46.png",
//     is_dropdown: false,
//     is_checkbox: false,
//     option_prefix: "",
//     option_suffix: "",
//   },
//   {
//     option_name: "Healthcare",
//     option_value: "0.6 km",
//     is_text: true,
//     icon: "http://localhost/townmanor.in/templates/selio/assets/img/icons/option_id/48.png",
//     is_dropdown: false,
//     is_checkbox: false,
//     option_prefix: "",
//     option_suffix: "",
//   },
//   {
//     option_name: "Restaurant",
//     option_value: "0.4 km",
//     is_text: true,
//     icon: "http://localhost/townmanor.in/files/dinner.png",
//     is_dropdown: false,
//     is_checkbox: false,
//     option_prefix: "",
//     option_suffix: "",
//   },
//   {
//     option_name: "School",
//     option_value: "0.6 km",
//     is_text: true,
//     icon: "http://localhost/townmanor.in/files/school_1.png",
//     is_dropdown: false,
//     is_checkbox: false,
//     option_prefix: "",
//     option_suffix: "",
//   },
//   {
//     option_name: "Mall",
//     option_value: "1.6 km",
//     is_text: true,
//     icon: "http://localhost/townmanor.in/files/shopping_bag.png",
//     is_dropdown: false,
//     is_checkbox: false,
//     option_prefix: "",
//     option_suffix: "",
//   },
//   {
//     option_name: "Cinemas",
//     option_value: "1.7 km",
//     is_text: true,
//     icon: "http://localhost/townmanor.in/files/film.png",
//     is_dropdown: false,
//     is_checkbox: false,
//     option_prefix: "",
//     option_suffix: "",
//   },
//   {
//     option_name: "Park",
//     option_value: "0.2 km",
//     is_text: true,
//     icon: "http://localhost/townmanor.in/files/park (1).png",
//     is_dropdown: false,
//     is_checkbox: false,
//     option_prefix: "",
//     option_suffix: "",
//   },
// ];

// const PropertyDistanceDetails = () => {
//   return (
//     <div className="details-info">
//       <h3>Distances</h3>
//       <ul>
//         {categoryOptions43.map((row, key) => (
//           row.is_text && (
//             <li key={key}>
//               {row.icon && <h4><img src={row.icon} alt={row.option_name} /> {row.option_name}:</h4>}
//               <span>{row.option_prefix} {row.option_value} {row.option_suffix}</span>
//             </li>
//           )
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default PropertyDistanceDetails;
