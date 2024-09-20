// import React from 'react';
// import './your-css-file.css'; // Import your existing CSS file

// // Dummy JSON data for latest listings
// const latestListings = [
//   {
//     id: 1,
//     title: 'Beautiful Apartment in the City',
//     price: '$350,000',
//     location: 'Downtown, New York',
//     imageUrl: 'assets/img/listings/listing1.jpg',
//     listingUrl: '/listing/1',
//   },
//   {
//     id: 2,
//     title: 'Cozy Family House',
//     price: '$450,000',
//     location: 'Suburbs, California',
//     imageUrl: 'assets/img/listings/listing2.jpg',
//     listingUrl: '/listing/2',
//   },
//   {
//     id: 3,
//     title: 'Modern Condo',
//     price: '$250,000',
//     location: 'City Center, Chicago',
//     imageUrl: 'assets/img/listings/listing3.jpg',
//     listingUrl: '/listing/3',
//   },
// ];

// const RightLatestListings = () => {
//   return (
//     <div className="widget widget-latest-listings">
//       <h3 className="widget-title">Latest Listings</h3>
//       <div className="latest-listings">
//         {latestListings.map((listing) => (
//           <div key={listing.id} className="listing-item">
//             <a href={listing.listingUrl}>
//               <img src={listing.imageUrl} alt={listing.title} className="listing-image" />
//               <div className="listing-info">
//                 <h4 className="listing-title">{listing.title}</h4>
//                 <p className="listing-price">{listing.price}</p>
//                 <p className="listing-location">{listing.location}</p>
//               </div>
//             </a>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RightLatestListings;


import React from 'react'
import LatestListings from './PropertyLatestListings'

function RightLatestListings() {
  return (
    <>
    <LatestListings />
    </>
  )
}

export default RightLatestListings
