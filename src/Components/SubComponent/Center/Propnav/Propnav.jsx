import React from 'react';
import "./Propnav.css";

function Propnav() {
  return (
    <>
      <div className="prop-container" >
        <div className="prop-card">
          <div className="prop-header">
            <ul>
              <li className="active-tab">Property Information</li>
              <li>Overview</li>
              <a href='#navamentity' style={{
                scrollBehavior: 'smooth'
              }}><li >Amenities</li></a>
              <li>Description</li>
             <a href='#distancesecondbox'> <li> Nearby Location</li></a>
              <a href='#secondfloordata'><li>Floor Plan</li></a>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Propnav
