import React from 'react';

import "../common.css";
import "../commonsecond.css";

import PropertyHeader from './PropertyHeader';
import FavListingPreviewActions from './FavListingPreviewActions';

function PropertyTopHeader({ title, address ,pricerange,price ,area_detail ,purpose,id }) {
  return (
    <div className="prop-slider-content">
      <PropertyHeader title={title} address={address} price={price} pricerange={pricerange} area_detail={area_detail} purpose={purpose} id={id}
    />
      <FavListingPreviewActions propertyId={id}/>
    </div>
  );
}

export default PropertyTopHeader;
