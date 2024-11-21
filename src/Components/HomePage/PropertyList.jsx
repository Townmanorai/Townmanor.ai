// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Slider from 'react-slick'; // Assuming you're using slick-slider
// import './PropertyList.css';
//  // Your CSS file for styling

// const PropertyList = () => {
//   const [properties, setProperties] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchProperties();
//   }, []);

//   const fetchProperties = async () => {
//     try {
//       const response = await fetch('http://localhost:3030/api/properties/admin');
//       const data = await response.json();
//       // Sort properties by property_name alphabetically
//       const sortedData = data.sort((a, b) => a.property_name.localeCompare(b.property_name));
//       setProperties(sortedData);
//       console.log("sortedData", sortedData)
//     } catch (error) {
//       console.error('Error fetching properties:', error);
//     }
//   };

//   const handlePropertyClick = (property_name) => {
//     navigate(`/property-details/${property_name}`);
//   };

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     adaptiveHeight: true,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: true
//         }
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           initialSlide: 1
//         }
//       }
//     ]
//   };


//   return (
//     <div className="property-list-container">
//       {properties.length > 0 ? (
//         <Slider {...settings}>
//           {properties.map((property) => (
//             <div className="property-card" key={property.property_name}>
//               <img
//                 src='./851x678godrej_tropical_isle1.jpg'
//                 alt={property.property_name}
//                 onClick={() => handlePropertyClick(property.property_name)}
//                 className="property-image"
//               />
//               <div className="property-details">
//                 <h3 className="property-name">{property.property_name}</h3>
//                 <div className='listed-owner-agent'>
//                   <span>Agents Listed: {property.agentsCount}</span>
//                   <span>Owners Listed: {property.ownersCount}</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </Slider>
//       ) : (
//         <p>No properties found</p>
//       )}
//     </div>
//   );
// };

// export default PropertyList;



// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './PropertyList.css'; // Your CSS file for styling

// const PropertyList = () => {
//   const [properties, setProperties] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchProperties();
//   }, []);

//   const fetchProperties = async () => {
//     try {
//       const response = await fetch('http://localhost:3030/api/properties/admin');
//       const data = await response.json();
//       // Sort properties by property_name alphabetically
//       const sortedData = data.sort((a, b) => a.property_name.localeCompare(b.property_name));
//       setProperties(sortedData);
//       console.log("sortedData", sortedData);
//     } catch (error) {
//       console.error('Error fetching properties:', error);
//     }
//   };

//   const handlePropertyClick = (property_name) => {
//     navigate(`/property-details/${property_name}`);
//   };

//   return (
//     <div className="property-list-container">
//       {properties.length > 0 ? (
//         <div className="property-list">
//           {properties.map((property) => (
//             <div className="property-card" key={property.property_name} onClick={() => handlePropertyClick(property.property_name)}>
//               <img
//                 src='./851x678godrej_tropical_isle1.jpg'
//                 alt={property.property_name}
//                 className="property-image"
//               />
//               <div className="property-details">
//                 <h3 className="property-name">{property.property_name}</h3>
//                 <div className='listed-owner-agent'>
//                   <span>Agents Listed: {property.agentsCount}</span>
//                   <span>Owners Listed: {property.ownersCount}</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No properties found</p>
//       )}
//     </div>
//   );
// };

// export default PropertyList;



import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick'; // Import the slider
import './PropertyList.css'; // Your CSS file for styling

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch('http://localhost:3030/api/properties/admin');
      const data = await response.json();
      const sortedData = data.sort((a, b) => a.property_name.localeCompare(b.property_name));
      setProperties(sortedData);
      console.log("sortedData", sortedData);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const handlePropertyClick = (property_name) => {
    navigate(`/property-details/${property_name}`);
  };

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Change to 1 or 2 if you want fewer visible
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <div className="property-list-container">
      {properties.length > 0 ? (
        <Slider {...sliderSettings}>
          {properties.map((property) => (
            <div className="property-card" key={property.property_name} onClick={() => handlePropertyClick(property.property_name)}>
              <img
                src='./851x678godrej_tropical_isle1.jpg'
                alt={property.property_name}
                className="property-image"
              />
              <div className="property-detail">
                <h3 className="property-name">{property.property_name}</h3>
                <div className='listed-owner-agent'>
                  <span>Agents Listed: {property.agentsCount}</span>
                  <span>Owners Listed: {property.ownersCount}</span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <p>No properties found</p>
      )}
    </div>
  );
};

export default PropertyList;
