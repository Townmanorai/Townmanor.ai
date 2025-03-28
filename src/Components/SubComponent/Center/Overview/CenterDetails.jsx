// import React from 'react';
// import "./CenterDetails.css";

// const CenterDetails = ({ property }) => {
//   console.log(property);
//   // Array of detail items with label and value pairs
//   const details = [
//     { label: 'Project', value: property.property_name },
//     { label: 'Price', value: property.price ? `${property.price} INR` : null },
//     { label: 'Configuration', value: property.configuration },
//     { label: 'Construction Status', value: property.construction_status },
//     { label: 'Rera Id', value: property.rera_id },
//     { label: 'Balcony', value: property.balcony },
//     { label: 'Carpet Area', value: property.area_detail },
//     { label: 'Dimension', value: (property.length && property.width) ? `${property.length}x${property.width} sq/ft` : null },
//     { label: 'Furnishing', value: property.furnish_type },
//     { label: 'Facing', value: property.property_facing },
//     { label: 'Country', value: property.country },
//     { label: 'City', value: property.city },
//     { label: 'Pincode', value: '121221' },  
//   ];

//   return (
//     <>
//       {/* Property Details Box */}
//       <div className='subdetail'>
//         <h3>Details</h3>
//         <div className="details-grid">
//           {details.map((detail, index) => (
//             detail.value && ( // Conditionally render only if value exists
//               <div key={index}>
//                 <span>{detail.label} :</span> {detail.value}
//               </div>
//             )
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default CenterDetails;




// import React from 'react';
// import "./CenterDetails.css";

// const CenterDetails = ({ property }) => {
//   console.log(property);

//   // Array of detail items with label and value pairs
//   const details = [
//     { label: 'Project', value: property.property_name },
//     { label: 'Price', value: property.price ? `${property.price} INR` : null },
//     { label: 'Configuration', value: property.configuration },
//     { label: 'Construction Status', value: property.construction_status },
//     { label: 'Rera Id', value: property.rera_id },
//     { label: 'Balcony', value: property.balcony },
//     { label: 'Carpet Area', value: property.area_detail },
//     { label: 'Dimension', value: (property.length && property.width) ? `${property.length} x ${property.width} sq/ft` : null },
//     { label: 'Furnishing', value: property.furnish_type },
//     { label: 'Facing', value: property.property_facing },
//     { label: 'Country', value: property.country },
//     { label: 'City', value: property.city },
//     { label: 'Pincode', value: property.pincode || 'N/A' },  // Use property.pincode if available
//   ];

//   return (
//     <div className='subdetail'>
//       <h3>Details</h3>
//       <div className="details-grid">
//         {details.map((detail, index) => (
//           detail.value && ( // Conditionally render only if value exists
//             <div key={index}>
//               <span>{detail.label} :</span> {detail.value}
//             </div>
//           )
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CenterDetails;


import React, { useState, useEffect } from 'react';
import "./CenterDetails.css";

const CenterDetails = ({ property }) => {
  const [showAll, setShowAll] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Function to update window width on resize
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  // useEffect to add the resize event listener
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const details = [
    { label: 'Project', value: property.property_name },
    { label: 'Price', value: property.price ? `${property.price} ${property.pricerange}` : null },
    { label: 'Configuration', value: property.configuration },
    { label: 'Construction Status', value: property.construction_status },
    { label: 'Rera Id', value: property.rera_id },
    { label: 'Balcony', value: property.balcony },
    { label: 'Carpet Area', value: property.area_detail },
    { label: 'Dimension', value: (property.length && property.width) ? `${property.length} x ${property.width} sq/ft` : null },
    { label: 'Furnishing', value: property.furnish_type },
    { label: 'Facing', value: property.property_facing },
    { label: 'Country', value: property.country },
    { label: 'City', value: property.city },
    { label: 'Pincode', value: property.pincode  },
  ];

  const toggleDetails = () => {
    setShowAll(!showAll);
  };

  // Adjust number of visible details based on window width and read more state
  const visibleDetails = (windowWidth <= 480 && !showAll) ? 5 : details.length;

  return (
    <div className='subdetail'>
      <h3>Details</h3>
      <div className="details-grids">
        {details.slice(0, visibleDetails).map((detail, index) =>
          detail.value && (
            <div key={index}>
              <span>{detail.label} :</span> {detail.value}
            </div>
          )
        )}
      </div>
      {windowWidth <= 480 && (
        <div className="read-more-container">
          <span onClick={toggleDetails} className="read-more">
            {showAll ? '...Read Less' : 'Read More...'}
          </span>
        </div>
      )}
    </div>
  );
};

export default CenterDetails;
