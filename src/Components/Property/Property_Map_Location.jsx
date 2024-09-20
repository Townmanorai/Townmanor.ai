import React, { useState } from 'react';
import "../common.css";  // Ensure you have these styles in your CSS files
import "../commonsecond.css";

// Dummy JSON data
const estateDataGPS = {
  latitude: 40.7128,
  longitude: -74.0060,
};

const places = [
  { type: 'hospital,health', imgSrc: 'assets/img/places_icons/hospital.png', label: 'Health' },
  { type: 'park', imgSrc: 'assets/img/places_icons/park.png', label: 'Park' },
  { type: 'atm,bank', imgSrc: 'assets/img/places_icons/atm.png', label: 'ATM/Bank' },
  { type: 'gas_station', imgSrc: 'assets/img/places_icons/petrol.png', label: 'Petrol Pump' },
  { type: 'food,bar,cafe,restourant', imgSrc: 'assets/img/places_icons/restourant.png', label: 'Restaurant' },
  { type: 'store', imgSrc: 'assets/img/places_icons/store.png', label: 'Store' },
];

const PropertyLocation = () => {
  const [routeFrom, setRouteFrom] = useState("");

  const handleRouteFromChange = (e) => {
    setRouteFrom(e.target.value);
  };

  const handleSuggestRoute = (e) => {
    e.preventDefault();
    // Logic for suggesting route can be added here
    alert('Suggest route button clicked');
  };

  return (
    <div className="map-dv widget-listing-map">
      <h3>Property Location</h3>
      <div id="" className="fullwidth-home-map">
        {estateDataGPS ? (
          <>
            <div className="places_select" style={{ display: 'none' }}>
              {places.map((place, index) => (
                <a key={index} className="btn btn-large" data-rel={place.type}>
                  <img src={place.imgSrc} alt={place.label} /> {place.label}
                </a>
              ))}
            </div>
            <div className="property-map" id="property-map" style={{ height: '385px' }}>
              {/* Map component or logic to render the map will go here */}
            </div>
          </>
        ) : (
          <p className="alert alert-success">Not available</p>
        )}
        <form className="route_suggestion local-form form-inline" onSubmit={handleSuggestRoute}>
          <input
            id="route_from"
            className="inputtext w360 form-spc"
            type="text"
            value={routeFrom}
            onChange={handleRouteFromChange}
            placeholder="Type your address"
            name="route_from"
            required
          />
          <button id="route_from_button" className="btn-default submit btn-spc" type="submit">
            Suggest route
          </button>
        </form>
      </div>
    </div>
  );
};

export default PropertyLocation;
