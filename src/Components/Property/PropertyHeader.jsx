

import React from "react";

import "../common.css";
import "../commonsecond.css";
import { FaMapMarkerAlt } from 'react-icons/fa';
import { CiLocationOn } from "react-icons/ci";

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

  // Safely handle 'purpose' if it's null or undefined
  const purposeClass = purpose ? purpose.toLowerCase().replace(/\s+/g, "_") : "unknown";

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
              {/* <i className="la la-map-marker"></i> */}
              <CiLocationOn size={20} color="#d81212" style={{ marginRight: "8px", marginBottom:'2px' }} />
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
        <div className="rate-info" style={{display:'block'}}>
          <h5>
            {pricerange && area_detail && (
              <>
                {purpose && purpose.toLowerCase().includes("rent") ? (
                  <>
                    {price && `Rs ${price}`} 
                    {area_detail && "Sq.ft / "}
                    {area_detail}
                  </>
                ) : (
                  <>
                    {area_detail}
                    {pricerange && area_detail && " Sq.ft / "}
                    {pricerange && `Rs ${pricerange}`}
                  </>
                )}
              </>
            )}
          </h5>
          {purpose && (
            <span className={`purpose-${purposeClass}`}>
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
