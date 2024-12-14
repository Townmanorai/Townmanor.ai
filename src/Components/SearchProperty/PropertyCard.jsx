import React from 'react';
import './PropertyCard.css'
import "../../common.css";
import "../../commonsecond.css"

const PropertyCard = ({ item }) => (
  <div className="card search-page">
    <a href={item.url} title={item.url}>
      <div className="img-block">
        <span className="verifiedBadge">Verified</span>
        <div className="overlay"></div>
        {item.option_38 && item.option_38 !== 'empty' && (
          <span className={`listing_badge badge-${item.option_38.toLowerCase().replace(' ', '_')}`}>
            <span className="lab">{item.option_38}</span>
          </span>
        )}
        <img src={item.thumbnail_url} alt={item.option_10} className="img-fluid" />
      </div>
    </a>
    <div className="card-body">
      <a href={item.url} title={item.option_10}>
        <h3>{item.option_10}</h3>
        <div className="rate-info">
          <h5>
            {item.option_36 && item.option_37 && (
              <>
                {item.option_36} / {item.option_37}
              </>
            )}
          </h5>
          {item.option_4 && <span className={`purpose-${item.option_4.toLowerCase().replace(' ', '_')}`}>{item.option_4}</span>}
        </div>
        <p><i className="la la-map-marker"></i>{item.address}</p>
      </a>
      <ul>
        {/* Handle custom elements here */}
      </ul>
    </div>
    <div className="card-footer">
      <div className="crd-links">
        <span className="favorites-actions pull-left">
          <a href="#" className="add-to-favorites" style={{ display: item.is_favorite ? 'none' : 'block' }}>
            <i className="la la-heart-o"></i>
          </a>
          <a href="#" className="remove-from-favorites" style={{ display: !item.is_favorite ? 'none' : 'block' }}>
            <i className="la la-heart-o"></i>
          </a>
        </span>
        <a href="#" className="plf">
          <i className="la la-calendar-check-o"></i>
          {new Date(item.date).toDateString()}
        </a>
      </div>
      <a href={item.url} className="btn-default">View Details</a>
    </div>
  </div>
);

export default PropertyCard;
