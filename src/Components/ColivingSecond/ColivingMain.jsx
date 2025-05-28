import React from 'react'
import Navbar from './Navbar';
import ImageGallery from './ImageGallery';
import Overview from './Overview';
import RoomBooking from './RoomBooking';
import Amenities from './Amenities';
import Location from './Location';
import Utilities from './Utilities';
import Reviews from './Reviews';
import Promise from './Promise';
import SimilarListings from './SimilarListings';
import PropertyInterest from './PropertyInterest';
function ColivingMain() {
  return (
   <>
    <Navbar />
     
        <ImageGallery />
        <Overview />
        <RoomBooking />
        <Amenities />
        <Location />
        <Utilities />
        <Reviews />
        <Promise />
        <SimilarListings />
        <PropertyInterest />
     
   </>
  )
}

export default ColivingMain