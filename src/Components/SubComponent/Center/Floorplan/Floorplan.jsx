// import React from "react";
// import "./Floorplan.css";

// function Floorplan({property}) {
//   return (
//     <div>
//       <div className="sub-floorplan">
//         <div className="floor-heading">
//           <h3>Floorplan</h3>
//         </div>
//         <div className="floor-content">
//           <div className="floor-image">
//             <img src="fpn.jpeg" alt="Main Floor Plan" />
//           </div>
//           <div className="divider"></div>
//           <div className="thumbnail-section">
//             <div className="thumbnails">
//               <img src="fpn.jpeg" alt="Thumbnail 1" />
//               <img src="fpn.jpeg" alt="Thumbnail 2" />
//               <img src="maap.png" alt="Thumbnail 3" />
//               <img src="fpn.jpeg" alt="Thumbnail 4" />
//               <img src="fpn.jpeg" alt="Thumbnail 5" />
//               {/* Add more images to test scrolling */}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* --------------------related property div--------------- */}

//       <div>
//         <h2>Related Properties in Noida</h2>
//         <div class="property-cards">
//           <div class="property-card">
//             <div class="tag-section">
//               <span class="tag">Ready to Move</span>
//             </div>
//             <div class="image-container">
//               <img src="fpn.jpeg" alt="Property Image" />
//             </div>
//             <div class="property-details">
//               <h3>Gokul Homes Apartment</h3>
//               <p>In Greater Noida</p>
//               <p>3 BHK Flat</p>
//               <p class="property-info">
//                 ₹ 50 L - 60 L &nbsp; | &nbsp; EMI - ₹ 2.53 L/M
//               </p>
//               <p>Agent</p>
//             </div>
//           </div>

//           <div class="property-card">
//             <div class="tag-section">
//               <span class="tag">Ready to Move</span>
//             </div>
//             <div class="image-container">
//               <img src="fpn.jpeg" alt="Property Image" />
//             </div>
//             <div class="property-details">
//               <h3>Gokul Homes Apartment</h3>
//               <p>In Greater Noida</p>
//               <p>3 BHK Flat</p>
//               <p class="property-info">
//                 ₹ 50 L - 60 L &nbsp; | &nbsp; EMI - ₹ 2.53 L/M
//               </p>
//               <p>Agent</p>
//             </div>
//           </div>

//           <div class="property-card">
//             <div class="tag-section">
//               <span class="tag">Ready to Move</span>
//             </div>
//             <div class="image-container">
//               <img src="fpn.jpeg" alt="Property Image" />
//             </div>
//             <div class="property-details">
//               <h3>Gokul Homes Apartment</h3>
//               <p className="prop-add">In Greater Noida</p>
//               <p className="prop-bhk">3 BHK Flat</p>
//               <p class="property-info">
//                 ₹ 50 L - 60 L &nbsp; | &nbsp; EMI - ₹ 2.53 L/M
//               </p>
//               <p>Agent</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Floorplan;


// import React from "react";
// import "./Floorplan.css";

// function Floorplan({ property }) {
//   // Safely split the string and remove unnecessary spaces
//   const floorplans = property.floorplan_repository
//     ? property.floorplan_repository.split(",").map((item) => item.trim())
//     : [];


//     const propertyData = {
//       properties: [
//         {
//           tag: "Ready to Move",
//           image: "fpn.jpeg",
//           title: "Gokul Homes Apartment",
//           location: "In Greater Noida",
//           type: "3 BHK Flat",
//           price: "₹ 50 L - 60 L",
//           emi: "₹ 2.53 L/M",
//           agent: "Agent"
//         },
//         {
//           tag: "Ready to Move",
//           image: "fpn.jpeg",
//           title: "Gokul Homes Apartment",
//           location: "In Greater Noida",
//           type: "3 BHK Flat",
//           price: "₹ 50 L - 60 L",
//           emi: "₹ 2.53 L/M",
//           agent: "Agent"
//         },
//         {
//           tag: "Ready to Move",
//           image: "fpn.jpeg",
//           title: "Gokul Homes Apartment",
//           location: "In Greater Noida",
//           type: "3 BHK Flat",
//           price: "₹ 50 L - 60 L",
//           emi: "₹ 2.53 L/M",
//           agent: "Agent"
//         }
//       ]
//     };

//   return (
//     <>
//       <div className="sub-floorplan">
//         <div className="floor-heading">
//           <h3>Floorplan</h3>
//         </div>
//         <div className="floor-content">
//           <div className="floor-image">
//             {/* Render the first image as the main floor plan */}
//             {floorplans.length > 0 ? (
//               <img src={'/'+floorplans[0]} alt="Main Floor Plan" />
//             ) : (
//               <p>No floor plans available</p>
//             )}
//           </div>
//           {/* <div className="divider"></div> */}
//           <div className="thumbnail-section">
//             <div className="thumbnails">
//               {/* Map over the array of images to create thumbnail elements */}
//               {floorplans.map((floorplan, index) => (
//                 <img key={index} src={ '/'+floorplan} alt={`Thumbnail ${index + 1}`} />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* --------------------related property div--------------- */}

//       <div className="re-prop">
//         <h2>Related Properties in Noida</h2>
//         <div className="property-cards">
//           <div className="property-card">
//             <div className="tag-section">
//               <span className="tag">Ready to Move</span>
//             </div>
//             <div className="image-container">
//               <img src="fpn.jpeg" alt="Property Image" />
//             </div>
//             <div className="property-details">
//               <h3>Gokul Homes Apartment</h3>
//               <p>In Greater Noida</p>
//               <p>3 BHK Flat</p>
//               <p className="property-info">
//                 ₹ 50 L - 60 L &nbsp; | &nbsp; EMI - ₹ 2.53 L/M
//               </p>
//               <p>Agent</p>
//             </div>
//           </div>

//           <div className="property-card">
//             <div className="tag-section">
//               <span className="tag">Ready to Move</span>
//             </div>
//             <div className="image-container">
//               <img src="fpn.jpeg" alt="Property Image" />
//             </div>
//             <div className="property-details">
//               <h3>Gokul Homes Apartment</h3>
//               <p>In Greater Noida</p>
//               <p>3 BHK Flat</p>
//               <p className="property-info">
//                 ₹ 50 L - 60 L &nbsp; | &nbsp; EMI - ₹ 2.53 L/M
//               </p>
//               <p>Agent</p>
//             </div>
//           </div>

//           <div className="property-card">
//             <div className="tag-section">
//               <span className="tag">Ready to Move</span>
//             </div>
//             <div className="image-container">
//               <img src="fpn.jpeg" alt="Property Image" />
//             </div>
//             <div className="property-details">
//               <h3>Gokul Homes Apartment</h3>
//               <p className="prop-add">In Greater Noida</p>
//               <p className="prop-bhk">3 BHK Flat</p>
//               <p className="property-info">
//                 ₹ 50 L - 60 L &nbsp; | &nbsp; EMI - ₹ 2.53 L/M
//               </p>
//               <p>Agent</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Floorplan;



// -------------------------------12/03---------------------------

import React, { useState } from "react";
import "./Floorplan.css";

function Floorplan({ property }) {
  // Safely split the string and remove unnecessary spaces
  const floorplans = property.floorplan
    ? property.floorplan.split(",").map((item) => item.trim())
    : [];
  const [mainimage,setmainimage]=useState(floorplans[0]);
  // The property data
  const propertyData = {
    properties: [
      {
        tag: "Ready to Move",
        image: "fpn.jpg",
        title: "Gokul Homes Apartment",
        location: "In Greater Noida",
        type: "3 BHK Flat",
        price: "₹ 50 L - 60 L",
        emi: "₹ 2.53 L/M",
        agent: "Agent",
      }
    ],
  };
  const cleanImageUrl = (url) => {
    return url
      .trim() // Removes any extra whitespace from the front and back
      .replace(/^[^a-zA-Z0-9]+/, '') // Remove non-alphanumeric characters from the start of the URL
      .replace(/[^a-zA-Z0-9]+$/, ''); // Remove non-alphanumeric characters from the end of the URL
  };
  return (
    <>
      <div className="sub-floorplan" id="secondfloordata">
        <div className="floor-heading">
          <h3>Floorplan</h3>
        </div>
        <div className="floor-content" >
          <div className="floor-image" style={{minHeight:"250px"}}>
            {/* Render the first image as the main floor plan */}
            {floorplans.length > 0 ? (
              <img src={"https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/" + cleanImageUrl(mainimage)} alt="Main Floor Plan" />
            ) : (
              <p>No floor plans available</p>
            )}
          </div>
          <div className="thumbnail-section">
            <div className="thumbnails">
              {/* Map over the array of images to create thumbnail elements */}
              {floorplans.map((floorplan, index) => (
                <img
                  key={index}
                  src={"https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/" + cleanImageUrl(floorplan)}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={()=>{
                    setmainimage(cleanImageUrl(floorplan))
                  }}
                  style={{
                    cursor:'pointer'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --------------------related property div--------------- */}

      {/* <div className="re-prop">
        <h2>Related Properties in Noida</h2>
        <div className="property-cards">
          
          {propertyData.properties.map((property, index) => (
            <div className="property-card" key={index}>
              <div className="tag-section">
                <span className="tag">{property.tag}</span>
              </div>
              <div className="image-container">
                <img src={'/'+property.image} alt="Property Image" />
              </div>
              <div className="property-details">
                <h3>{property.title}</h3>
                <p>{property.location}</p>
                <p>{property.type}</p>
                <p className="property-info">
                  {property.price} &nbsp; | &nbsp; EMI - {property.emi}
                </p>
                <p>{property.agent}</p>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </>
  );
}

export default Floorplan;
