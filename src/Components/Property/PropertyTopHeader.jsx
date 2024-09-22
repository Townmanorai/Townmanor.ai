import React from 'react'

import "../common.css";
import "../commonsecond.css";

import PropertyHeader from './PropertyHeader'
import FavListingPreviewActions from './FavListingPreviewActions';


function PropertyTopHeader() {
  return (
    <div class="prop-slider-content">
        <PropertyHeader />
        <FavListingPreviewActions />
    </div>
  )
}

export default PropertyTopHeader
