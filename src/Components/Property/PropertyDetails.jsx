// import React from "react";


// import "../common.css";
// import "../commonsecond.css";

// const categoryOptions = [
//     {
//       option_name: "Listing Type",
//       option_value: "Newly Launched Properties",
//       option_prefix: "",
//       option_suffix: "",
//       is_text: false,
//       is_tree: false,
//       is_dropdown: true,
//       is_checkbox: false,
//     },
//     {
//       option_name: "Property Type",
//       option_value: "Apartment",
//       option_prefix: "",
//       option_suffix: "",
//       is_text: false,
//       is_tree: false,
//       is_dropdown: true,
//       is_checkbox: false,
//     },
//     {
//       option_name: "Possession Date",
//       option_value: "Dec - 2027",
//       option_prefix: "",
//       option_suffix: "",
//       is_text: true,
//       is_tree: false,
//       is_dropdown: false,
//       is_checkbox: false,
//     },
//     {
//       option_name: "County",
//       option_value: "UAE",
//       option_prefix: "",
//       option_suffix: "",
//       is_text: true,
//       is_tree: false,
//       is_dropdown: false,
//       is_checkbox: false,
//     },
//     {
//       option_name: "City",
//       option_value: "Dubai",
//       option_prefix: "",
//       option_suffix: "",
//       is_text: true,
//       is_tree: false,
//       is_dropdown: false,
//       is_checkbox: false,
//     },
//     {
//       option_name: "Super Built-up Area",
//       option_value: "609 to 1,467 sq.ft",
//       option_prefix: "",
//       option_suffix: "",
//       is_text: true,
//       is_tree: false,
//       is_dropdown: false,
//       is_checkbox: false,
//     },
//     {
//       option_name: "Configuration",
//       option_value: "1, 1.5 , 2.5 BHK",
//       option_prefix: "",
//       option_suffix: "",
//       is_text: true,
//       is_tree: false,
//       is_dropdown: false,
//       is_checkbox: false,
//     },
//     {
//       option_name: "Sale Price",
//       option_value: "₹ 3,39,72,100 Onwards",
//       option_prefix: "",
//       option_suffix: "",
//       is_text: true,
//       is_tree: false,
//       is_dropdown: false,
//       is_checkbox: false,
//     },
//     {
//       option_name: "UAE Sale Prices",
//       option_value: "AED 1.49 M Onwards",
//       option_prefix: "",
//       option_suffix: "",
//       is_text: true,
//       is_tree: false,
//       is_dropdown: false,
//       is_checkbox: false,
//     },
//   ];

// const PropertyDetails = () => {
//     return (
//         <div className="details-info">
//           <h3>Detail</h3>
//           <ul>
//             {categoryOptions.map((row, index) => (
//               <React.Fragment key={index}>
//                 {((row.is_text || row.is_tree) && row.option_value) && (
//                   <li>
//                     <h4>{row.option_name}:</h4>
//                     <span>
//                       {row.option_prefix} {row.option_value} {row.option_suffix}
//                     </span>
//                   </li>
//                 )}
    
//                 {row.is_dropdown && row.option_value && (
//                   <li>
//                     <h4>{row.option_name}:</h4>
//                     <span className="label label-success">
//                       {row.option_prefix}
//                       {row.option_value}
//                       {row.option_suffix}
//                     </span>
//                   </li>
//                 )}
    
//                 {row.is_checkbox && row.option_value && (
//                   <li>
//                     <h4>{row.option_name}:</h4>
//                     <span>
//                       <img
//                         src={`assets/img/checkbox_${row.option_value}.png`}
//                         alt={row.option_value}
//                       />
//                     </span>
//                   </li>
//                 )}
//               </React.Fragment>
//             ))}
//           </ul>
//         </div>
//       );
//     };

// // Helper function to check if a value is a valid URL
// const isValidUrl = (string) => {
//   try {
//     new URL(string);
//     return true;
//   } catch (_) {
//     return false;
//   }
// };

// export default PropertyDetails;


import React from "react";
import "../common.css";
import "../commonsecond.css";

const PropertyDetails = ({ details }) => {
  return (
    <div className="details-info">
      <h3>Property Details</h3>
      <ul>
        {Object.keys(details).map((key, index) => (
          details[key] &&
          (<li key={index}>
            <h4>{key.replace(/_/g, " ")}:</h4>
            <span>{details[key]}</span>
          </li>)
        ))}
      </ul>
    </div>
  );
};

export default PropertyDetails;
