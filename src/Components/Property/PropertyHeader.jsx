// import React from "react";

// import "../common.css";
// import "../commonsecond.css";


// // Dummy JSON data
// const propertyDetails = {
//   option_10: "Beautiful Property Title",
//   address: "123 Main St, Springfield",
//   option_19: "3 Bedrooms",
//   option_20: "2 Bathrooms",
//   option_36: "1500 sqft",
//   option_37: "1500000",
//   option_4: "For Rent",
//   option_56: 4, // star rating
//   permalink: "https://example.com/property",
//   customElements: [
//     { f_id: 19, type: "DROPDOWN", name: "Bedrooms", value: "3", suffix: "" },
//     { f_id: 20, type: "DROPDOWN", name: "Bathrooms", value: "2", suffix: "" },
//     { f_id: 57, type: "DROPDOWN", name: "Size", value: "1500 sqft", suffix: "" },
//   ],
// };

// const PropertyHeader = () => {
//   const {
//     option_10,
//     address,
//     option_19,
//     option_20,
//     option_36,
//     option_37,
//     option_4,
//     option_56,
//     permalink,
//     customElements,
//   } = propertyDetails;

//   const title = option_10;
//   const facebook = `https://www.facebook.com/sharer/sharer.php?u=${permalink}`;
//   const twitter = `https://twitter.com/home?status=${encodeURIComponent(title)}`;
//   const pinterest = `https://pinterest.com/pin/create/button/?url=${permalink}&media=${permalink}&description=${encodeURIComponent(title)}`;

//   return (
//     <div className="property-hd-sec">
//       <div className="card">
//         <div className="card-body">
//           <a href="#">
//             <h3>
//               {title}
//               <ul className="social-links">
//                 <li className="listing_share_tw">
//                   <a target="_blank" href={twitter} data-csshare-type="twitter" rel="noreferrer">
//                     <i className="fa fa-twitter" aria-hidden="true"></i>
//                   </a>
//                 </li>
//                 <li className="listing_share_fb">
//                   <a target="_blank" href={facebook} data-csshare-type="facebook" rel="noreferrer">
//                     <i className="fa fa-facebook" aria-hidden="true"></i>
//                   </a>
//                 </li>
//                 <li className="listing_share_p">
//                   <a target="_blank" href={pinterest} data-csshare-type="pinterest" rel="noreferrer">
//                     <i className="fa fa-pinterest-p" aria-hidden="true"></i>
//                   </a>
//                 </li>
//               </ul>
//             </h3>
//             <p>
//               <i className="la la-map-marker"></i>
//               {address}
//             </p>
//           </a>
//           <ul>
//             {customElements.slice(0, 3).map((elem, index) => (
//               <li key={index}>
//                 {elem.value} {elem.suffix}{" "}
//                 <span>{elem.name}</span>
//               </li>
//             ))}
//             {/* Fallback if no custom elements */}
//             {!customElements.length && (
//               <>
//                 {option_19 && (
//                   <li>
//                     {option_19}
//                   </li>
//                 )}
//                 {option_20 && (
//                   <li>
//                     {option_20}
//                   </li>
//                 )}
//                 {propertyDetails.option_57 && (
//                   <li>
//                     {propertyDetails.option_57}
//                   </li>
//                 )}
//               </>
//             )}
//           </ul>
//         </div>
//         <div className="rate-info">
//           <h5>
//             {option_36 && option_37 && (
//               <>
//                 {option_4.toLowerCase().includes("rent") ? (
//                   <>
//                     {option_37 && `Rs ${option_37}`}
//                     {option_37 && option_36 && " / "}
//                     {option_36}
//                   </>
//                 ) : (
//                   <>
//                     {option_36}
//                     {option_37 && option_36 && " / "}
//                     {option_37 && `$${option_37}`}
//                   </>
//                 )}
//               </>
//             )}
//           </h5>
//           {option_4 && (
//             <span className={`purpose-${option_4.toLowerCase().replace(/\s+/g, "_")}`}>
//               {option_4}
//             </span>
//           )}
//           {option_56 && (
//             <div>
//               <br />
//               <span className={`review_stars_${option_56}`}></span>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertyHeader;



import React from "react";

import "../common.css";
import "../commonsecond.css";

const PropertyHeader = ({
  title,
  address,
  bedrooms,
  bathrooms,
  area_detail,
  price,
  pricerange,
  purpose,
  rating,
  permalink,
  customElements = []
}) => {
  const facebook = `https://www.facebook.com/sharer/sharer.php?u=${permalink}`;
  const twitter = `https://twitter.com/home?status=${encodeURIComponent(title)}`;
  const pinterest = `https://pinterest.com/pin/create/button/?url=${permalink}&media=${permalink}&description=${encodeURIComponent(title)}`;

  return (
    <div className="property-hd-sec">
      <div className="card">
        <div className="card-body">
          <a href="#">
            <h3>
              {title}
              <ul className="social-links">
                <li className="listing_share_tw">
                  <a target="_blank" href={twitter} data-csshare-type="twitter" rel="noreferrer">
                    <i className="fa fa-twitter" aria-hidden="true"></i>
                  </a>
                </li>
                <li className="listing_share_fb">
                  <a target="_blank" href={facebook} data-csshare-type="facebook" rel="noreferrer">
                    <i className="fa fa-facebook" aria-hidden="true"></i>
                  </a>
                </li>
                <li className="listing_share_p">
                  <a target="_blank" href={pinterest} data-csshare-type="pinterest" rel="noreferrer">
                    <i className="fa fa-pinterest-p" aria-hidden="true"></i>
                  </a>
                </li>
              </ul>
            </h3>
            <p>
              <i className="la la-map-marker"></i>
              {address}
            </p>
          </a>
          <ul>
            {customElements.length > 0 ? (
              customElements.slice(0, 3).map((elem, index) => (
                <li key={index}>
                  {elem.value} {elem.suffix} <span>{elem.name}</span>
                </li>
              ))
            ) : (
              <>
                {bedrooms && (
                  <li>
                    {bedrooms} <span>Bedrooms</span>
                  </li>
                )}
                {bathrooms && (
                  <li>
                    {bathrooms} <span>Bathrooms</span>
                  </li>
                )}
                {area_detail && (
                  <li>
                    {area_detail} <span>sqft</span>
                  </li>
                )}
              </>
            )}
          </ul>
        </div>
        <div className="rate-info">
          <h5>
            {pricerange && area_detail && (
              <>
                {purpose.toLowerCase().includes("rent") ? (
                  <>
                    {price && `Rs ${price}`} 
                    {area_detail && " / "}
                    {area_detail}
                  </>
                ) : (
                  <>
                    {area_detail}
                    {pricerange && area_detail && " / "}
                    {pricerange && `$${pricerange}`}
                  </>
                )}
              </>
            )}
          </h5>
          {purpose && (
            <span className={`purpose-${purpose.toLowerCase().replace(/\s+/g, "_")}`}>
              {purpose}
            </span>
          )}
          {rating && (
            <div>
              <br />
              <span className={`review_stars_${rating}`}></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyHeader;
