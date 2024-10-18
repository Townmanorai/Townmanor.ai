// import React, { useEffect } from 'react';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet.markercluster/dist/MarkerCluster.css';
// import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
// import { getEstateData, generateMarkerHtml, generatePopupContent } from './api'; // Adjust path as necessary

// const SearchMap = () => {
//   useEffect(() => {
//     let map;
//     let markers = [];
//     const mapStyle = [
//       // Map style array goes here...
//     ];

//     if (document.getElementById('main-map')) {
//       map = L.map('main-map', {
//         center: [45.0, -93.0], // Default center
//         zoom: 9,
//         scrollWheelZoom: true
//       });

//       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; OpenStreetMap contributors'
//       }).addTo(map);

//       getEstateData().then((estates) => {
//         estates.forEach((item) => {
//           if (!item.gps) return;

//           const markerHtml = generateMarkerHtml(item);
//           const marker = L.marker([item.gps.lat, item.gps.lng], {
//             icon: L.divIcon({
//               html: markerHtml,
//               className: 'open_street_map_marker google_marker',
//               iconSize: [40, 46],
//               popupAnchor: [1, -35],
//               iconAnchor: [20, 46]
//             })
//           });

//           marker.bindPopup(generatePopupContent(item));
//           markers.push(marker);
//         });

//         const clusterGroup = L.markerClusterGroup();
//         markers.forEach((marker) => clusterGroup.addLayer(marker));
//         map.addLayer(clusterGroup);
//       });
//     }
//   }, []);

//   return <div id="main-map" className="fullwidth-home-map"></div>;
// };

// export default SearchMap;

// import React, { useEffect } from 'react';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet.markercluster/dist/MarkerCluster.css';
// import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
// import 'leaflet.markercluster'; // Import marker cluster JS
// import { getEstateData, generateMarkerHtml, generatePopupContent } from './api'; 
// import "../../common.css";
// import "../../commonsecond.css";

// const Map = () => {
//   useEffect(() => {
//     let map;
//     let markers = [];

//     if (document.getElementById('main-map')) {
//       // Initialize the map
//       map = L.map('main-map', {
//         center: [28.5355, 77.3910], // Default center
//         zoom: 5,              // Default zoom level
//         scrollWheelZoom: true,
//         maxZoom: 18           // Set a maxZoom value for the map
//       });

//       // Add tile layer
//       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; OpenStreetMap contributors',
//         maxZoom: 19          // Set maxZoom for tile layer
//       }).addTo(map);

//       // Fetch and display estate data
//       getEstateData().then((estates) => {
//         // console.log('Estates data:', estates); // Debugging data format

//         if (!Array.isArray(estates)) {
//           console.error('Unexpected data format:', estates);
//           return;
//         }

//         estates.forEach((item) => {
//           if (!item.gps || !item.gps.lat || !item.gps.lng) return; // Ensure GPS data exists

//           const markerHtml = generateMarkerHtml(item);
//           const marker = L.marker([item.gps.lat, item.gps.lng], {
//             icon: L.divIcon({
//               html: markerHtml,
//               className: 'open_street_map_marker google_marker',
//               iconSize: [40, 46],
//               popupAnchor: [1, -35],
//               iconAnchor: [20, 46]
//             })
//           });

//           marker.bindPopup(generatePopupContent(item));
//           markers.push(marker);
//         });

//         // Ensure MarkerCluster is initialized properly
//         const clusterGroup = L.markerClusterGroup();
//         console.log('Marker cluster:', clusterGroup); // Debugging clusterGroup

//         markers.forEach((marker) => clusterGroup.addLayer(marker));
//         map.addLayer(clusterGroup);
//       }).catch(error => {
//         console.error('Error fetching estate data:', error);
//       });
//     }

//     // Cleanup function
//     return () => {
//       if (map) {
//         map.remove();
//       }
//     };
//   }, []);

//   return <div id="main-map" className="fullwidth-home-map"></div>;
// };


// // const generateMarkerHtml = (item) => {
// //   return `<div class="custom-marker">${item.name}</div>`;
// // };

// // const generatePopupContent = (item) => {
// //   return `
// //     <div class="popup-content">
// //       <h3>${item.name}</h3>
// //       <p><strong>Price:</strong> ${item.price}</p>
// //       <p><strong>Description:</strong> ${item.description}</p>
// //     </div>
// //   `;
// // };
// export default Map;


//-----------------------------------------------------------------------------


import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster'; // Import marker cluster JS
import "../../common.css";
import "../../commonsecond.css";

const Map = ({ results }) => {
  useEffect(() => {
    let map;
    let markers = [];

    if (document.getElementById('main-map')) {
      // Initialize the map
      map = L.map('main-map', {
        center: [28.5355, 77.3910], // Default center
        zoom: 5,                    // Default zoom level
        scrollWheelZoom: true,
        maxZoom: 18                 // Set a maxZoom value for the map
      });

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19                  // Set maxZoom for tile layer
      }).addTo(map);

      // Process the results data
      if (results && Array.isArray(results)) {
        const clusterGroup = L.markerClusterGroup();

        results.forEach((item) => {
          if (!item.lat || !item.lng) return; // Ensure lat/lng exists

          const markerHtml = generateMarkerHtml(item);
          const marker = L.marker([item.lat, item.lng], {
            icon: L.divIcon({
              html: markerHtml,
              className: 'open_street_map_marker google_marker',
              iconSize: [40, 46],
              popupAnchor: [1, -35],
              iconAnchor: [20, 46]
            })
          });

          // Bind popup content for each marker
          marker.bindPopup(generatePopupContent(item));
          markers.push(marker);
        });

        // Add markers to cluster
        markers.forEach((marker) => clusterGroup.addLayer(marker));
        map.addLayer(clusterGroup);
      } else {
        console.error('Invalid results format:', results);
      }
    }

    // Cleanup function
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [results]);

  // Function to generate marker HTML content
  const generateMarkerHtml = (item) => {
    let innerMarker = '<div class="marker-container"><div class="marker-card"><div class="front face"><i class="la la-home"></i></div><div class="back face"><i class="la la-home"></i></div><div class="marker-arrow"></div></div></div>';
  
    if (item.icon) {
      innerMarker = `<div class="marker-container marker-container-image"><div class="marker-card"><div class="front face"><img src="${item.icon}" alt="icon"></img></div></div><div class="marker-arrow"></div></div>`;
    } else if (item.fontIconCode) {
    innerMarker = `<div class="marker-container"><div class="marker-card"><div class="front face"><i class="${item.fontIconCode}"></i></div><div class="back face"><i class="${item.fontIconCode}"></i></div><div class="marker-arrow"></div></div></div>`;
    }
    return innerMarker;
  };

  // Function to generate popup content
  const generatePopupContent = (item) => {
    const price = item.price ? `₹${item.price.toLocaleString('en-IN')}` : 'Price not available';
    const configuration = item.configuration || 'Configuration not available';
    const areaDetail = item.area_detail ? `${item.area_detail} (${item.area_type})` : 'Area details not available';
    const furnishType = item.furnish_type || 'Furnish type not available';
    const description = item.description || 'No description available';
    const locality = item.locality || 'Locality not specified';
    const city = item.city || 'City not specified';
    const floorInfo = (item.floor_no && item.total_floor) ? `${item.floor_no} of ${item.total_floor}` : 'Floor information not available';
  
    return `
      <style>
        .popup-content {
          background-color: white;
          padding: 10px;
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          font-family: Arial, sans-serif;
          max-width: 285px;
          margin: 0 auto;
        }
        .popup-content h4 {
          margin-top: -20px;
          color: #a52b2b;
          font-size: 1.5em;
          border-bottom: 2px solid #3498db;
          padding-bottom: 5px;
          font-weight: 600;
        }
        .popup-content p {
          margin: 5px 0;
          color: #34495e;
          line-height: 1;
        }
        .popup-content img {
        width: calc(100% + 20px); /* Adjust to cover padding */
        margin-left: -10px; /* Offset the image to the left */
        margin-right: -10px; /* Offset the image to the right */
        margin-top: -10px;
        height: 200px;
        border-radius: 20px 20px 0 0; /* Keep the top corners rounded */
        margin-bottom: 15px;
        }
        .popup-content strong {
          color: #c31c1c;
        }
        .popup-content .location {
          font-style: italic;
          color: #7f8c8d;
        }
        .popup-content .floor-info {
          background-color: #f9f9f9;
          padding: 5px;
          border-radius: 5px;
          margin-top: 10px;
        }
      </style>
      <div class="popup-content">
        ${item.one_image_location ? `<img src="${item.one_image_location}" alt="${item.property_name || 'Property Image'}" />` : ''}
        <h4>${item.property_name || 'Unnamed Property'}</h4>
        <p><strong>Price:</strong> ${price}</p>
        <p><strong>Configuration:</strong> ${configuration}</p>
        <p><strong>Area:</strong> ${areaDetail}</p>
        <p><strong>Furnish Type:</strong> ${furnishType}</p>
        <p><strong>Description:</strong> ${description}</p>
        <p class="location"><strong>Location:</strong> ${locality}, ${city}</p>
        <div class="floor-info"><strong>Floor:</strong> ${floorInfo}</div>
      </div>
    `;
  };
  
  

  return <div id="main-map" className="fullwidth-home-map"></div>;
};

export default Map;
