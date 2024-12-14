
// import React from 'react';
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom
// import Carousel from 'react-bootstrap/Carousel'; // Importing Carousel from react-bootstrap

// import "../../common.css";
// import "../../commonsecond.css";
// import "./ResultsItem.css";

// const ResultsItem = ({ item }) => {
//   const slideshowImages = item.image_repository ? item.image_repository.split(',').map(img => img.trim()) : [];

//   return (
//     <div className="col-md-6">
//       <div className="card">
//         {/* Use Link for navigation */}
//         <Link to={`/property/${item.id}`} title={item.option_10}>
//           <div className={`img-block ${item.option_1 ? 'video-block' : ''}`}>
//             <span className="verifiedBadge">Verified</span>
//             <div className="overlay"></div>
//             {item.is_featured && <div className="budget"><i className="fa fa-star"></i></div>}
//             {item.option_38 && item.option_38 !== 'empty' && (
//               <span className={`listing_badge badge-${item.option_38.toLowerCase().replace(' ', '_')}`}>
//                 <span className="lab">{item.option_38}</span>
//               </span>
//             )}
//             {item.option_1 ? (
//               <div dangerouslySetInnerHTML={{ __html: generateIframeMultimedia(item.option_1) }} />
//             ) : slideshowImages.length > 1 ? (
//               <Carousel id={`listing_carousel_${item.id}`} className="carousel-listing" indicators={false}>
//                 {slideshowImages.slice(0, 3).map((img, index) => (
//                   <Carousel.Item key={index}>
//                     <img src={img} alt={item.option_10} className="d-block w-100 img-fluid" />
//                   </Carousel.Item>
//                 ))}
//               </Carousel>
//             ) : (
//               <img src={item.thumbnail_url} alt={item.option_10} className="img-fluid" />
//             )}
//             {slideshowImages.length > 1 && (
//               <>
//                 <span className="carousel-control-prev" href={`#listing_carousel_${item.id}`} role="button" data-slide="prev">
//                   <i className="fa fa-angle-left"></i>
//                 </span>
//                 <span className="carousel-control-next" href={`#listing_carousel_${item.id}`} role="button" data-slide="next">
//                   <i className="fa fa-angle-right"></i>
//                 </span>
//               </>
//             )}
//           </div>
//         </Link>
//         <div className="card-body">
//           {/* Use Link for navigation */}
//           <Link to={`/property/${item.id}`} title={item.option_10}>
//             <h3>{item.option_10 || item.property_name}</h3>
//             <div className="rate-info">
//               <h5 className='blackalpenliebe'>
//                 &#8377; {item.option_37 || item.price}
//               </h5>
//               {item.option_4 && (
//                 <span className={`rate-info purpose-${item.option_4.toLowerCase().replace(/ /g, '_')}`}>
//                   {item.option_4}
//                 </span>
//               )}
//               {item.purpose && (
//                 <span className={`rate-info purpose-${item.purpose.toLowerCase().replace(/ /g, '_')}`}>
//                   {item.purpose}
//                 </span>
//               )}
//             </div>
//             <p>
//               <i className="la la-map-marker"></i>
//               {item.address}
//             </p>
//           </Link>
//           <ul>
//             {item.option_58 && <li>Configuration (BHK) {item.option_58}</li>}
//             {item.option_59 && <li>Carpet Area {item.option_59} sq.ft</li>}
//           </ul>
//           <ul>
//             {item.configuration && <li>Configuration (BHK) {item.configuration}</li>}
//             {item.area_detail && <li>{item.area_type} {item.area_detail} sq.ft</li>}
//           </ul>
//         </div>
//         <div className="card-footer">
//           <span className="favorites-actions pull-left">
//             <a href="#" data-id={item.id} className="add-to-favorites" style={{ display: item.is_favorite ? 'none' : '' }}>
//               <i className="la la-heart-o"></i>
//             </a>
//             <a href="#" data-id={item.id} className="remove-from-favorites" style={{ display: !item.is_favorite ? 'none' : '' }}>
//               <i className="la la-heart-o"></i>
//             </a>
//             <i className="fa fa-spinner fa-spin fa-custom-ajax-indicator"></i>
//           </span>
//           <span className='agent-owner'> {item.Listed_By}</span>
//           <a href="#" title={swInDateFormat(item.property_date)} className="pull-right">
//             <i className="la la-calendar-check-o"></i>
//             {humanTimeDiff(new Date(item.property_date))}
//           </a>
//         </div>
//         <Link to={`/property/${item.id}`} title={item.option_10} className="ext-link"></Link>
//       </div>
//     </div>
//   );
// };

// const swInDateFormat = (date) => {
//   return new Date(date).toLocaleDateString();
// };

// const generateIframeMultimedia = (option) => {
//   return `<iframe src="${option}" frameborder="0"></iframe>`;
// };

// const showPrice = (price) => {
//   return `₹${price}`;
// };

// const humanTimeDiff = (date) => {
//   const now = new Date();
//   const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24));
//   return `${diff} days ago`;
// };

// export default ResultsItem;


import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Carousel from 'react-bootstrap/Carousel'; // Importing Carousel from react-bootstrap

import "../../common.css";
import "../../commonsecond.css";
import "./ResultsItem.css";

const ResultsItem = ({ item }) => {
  // Safely parse the image repository JSON string and prepend base URL
  const slideshowImages = item.image_repository ? 
    JSON.parse(item.image_repository.replace(/&quot;/g, '"')).map(img => `https://townmanor.in/files/${img}`) : [];

  return (
    <div className="col-md-6">
      <div className="card search-page">
        {/* Use Link for navigation */}
        <Link to={`/property/${item.id}`} title={item.option_10}>
          <div className={`img-block ${item.option_1 ? 'video-block' : ''}`}>
            <span className="verifiedBadge">Verified</span>
            <div className="overlay"></div>
            {item.is_featured && <div className="budget"><i className="fa fa-star"></i></div>}
            {item.option_38 && item.option_38 !== 'empty' && (
              <span className={`listing_badge badge-${item.option_38.toLowerCase().replace(' ', '_')}`}>
                <span className="lab">{item.option_38}</span>
              </span>
            )}
            {item.option_1 ? (
              <div dangerouslySetInnerHTML={{ __html: generateIframeMultimedia(item.option_1) }} />
            ) : slideshowImages.length > 1 ? (
              <Carousel id={`listing_carousel_${item.id}`} className="carousel-listing" indicators={false}>
                {slideshowImages.slice(0, 3).map((img, index) => (
                  <Carousel.Item key={index}>
                    <img src={img} alt={`Image ${index + 1} for ${item.option_10 || item.property_name}`} className="d-block w-100 img-fluid" />
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <img src={slideshowImages[0]} alt={item.option_10 || item.property_name} className="img-fluid" />
            )}
            {slideshowImages.length > 1 && (
              <>
                <span className="carousel-control-prev" href={`#listing_carousel_${item.id}`} role="button" data-slide="prev">
                  <i className="fa fa-angle-left"></i>
                </span>
                <span className="carousel-control-next" href={`#listing_carousel_${item.id}`} role="button" data-slide="next">
                  <i className="fa fa-angle-right"></i>
                </span>
              </>
            )}
          </div>
        </Link>
        <div className="card-body">
          {/* Use Link for navigation */}
          <Link to={`/property/${item.id}`} title={item.option_10}>
            <h3>{item.option_10 || item.property_name}</h3>
            <div className="rate-info">
              <h5 className='blackalpenliebe'>
                &#8377; {item.option_37 || item.price}
              </h5>
              {item.option_4 && (
                <span className={`rate-info purpose-${item.option_4.toLowerCase().replace(/ /g, '_')}`}>
                  {item.option_4}
                </span>
              )}
              {item.purpose && (
                <span className={`rate-info purpose-${item.purpose.toLowerCase().replace(/ /g, '_')}`}>
                  {item.purpose}
                </span>
              )}
            </div>
            <p>
              <i className="la la-map-marker"></i>
              {item.address}
            </p>
          </Link>
          <ul>
            {item.option_58 && <li>Configuration (BHK) {item.option_58}</li>}
            {item.option_59 && <li>Carpet Area {item.option_59} sq.ft</li>}
          </ul>
          <ul>
            {item.configuration && <li>Configuration (BHK) {item.configuration}</li>}
            {item.area_detail && <li>{item.area_type} {item.area_detail} sq.ft</li>}
          </ul>
        </div>
        <div className="card-footer">
          <span className="favorites-actions pull-left">
            <a href="#" data-id={item.id} className="add-to-favorites" style={{ display: item.is_favorite ? 'none' : '' }}>
              <i className="la la-heart-o"></i>
            </a>
            <a href="#" data-id={item.id} className="remove-from-favorites" style={{ display: !item.is_favorite ? 'none' : '' }}>
              <i className="la la-heart-o"></i>
            </a>
            <i className="fa fa-spinner fa-spin fa-custom-ajax-indicator"></i>
          </span>
          <span className='agent-owner'> {item.Listed_By}</span>
          <a href="#" title={swInDateFormat(item.property_date)} className="pull-right">
            <i className="la la-calendar-check-o"></i>
            {humanTimeDiff(new Date(item.property_date))}
          </a>
        </div>
        <Link to={`/property/${item.id}`} title={item.option_10} className="ext-link"></Link>
      </div>
    </div>
  );
};

const swInDateFormat = (date) => {
  return new Date(date).toLocaleDateString();
};

const generateIframeMultimedia = (option) => {
  return `<iframe src="${option}" frameborder="0"></iframe>`;
};

const showPrice = (price) => {
  return `₹${price}`;
};

const humanTimeDiff = (date) => {
  const now = new Date();
  const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  return `${diff} days ago`;
};

export default ResultsItem;

