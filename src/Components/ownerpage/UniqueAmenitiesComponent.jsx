import React from 'react'
import { FaBolt, FaBuilding, FaTint, FaDumbbell, FaSwimmer, FaHeart } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { BiDownload } from "react-icons/bi";
import "./Amenties.css";
function UniqueAmenitiesComponent() {
  return (
  <>
     <div className="unique-wrapper-r34g56">
      <div>
      <section className="unique-landmarks-b23f">
        <h3 className="unique-section-heading-p67l">Landmark Nearby Sector37c, Gurgaon</h3>
        <div className="unique-landmark-grid-l87q">
          <div className="unique-card-lmk-g3">
            <h4><MdLocationOn /> Educational Institutes</h4>
            <ul>
              <li>Cambridge International ..</li>
              <li>St. Mary's ..</li>
            </ul>
          </div>
          <div className="unique-card-lmk-g3">
            <h4><MdLocationOn /> Transportation Hubs</h4>
            <ul>
              <li>Central Station ..</li>
              <li>Downtown Bus ..</li>
            </ul>
          </div>
          <div className="unique-card-lmk-g3">
            <h4><MdLocationOn /> Shopping Centers</h4>
            <ul>
              <li>City Mall ..</li>
              <li>Riverside Shopping ..</li>
            </ul>
          </div>
        </div>
      </section>
     
      <section className="unique-amenities-w43v">
        <h3 className="unique-section-heading-p67l">Amenities</h3>
        <div className="unique-amenities-grid-wx2">
          <div><FaBolt /> Power Back Up</div>
          <div><FaBuilding /> Lift</div>
          <div><FaTint /> Rain Water Harvesting</div>
          <div><FaHeart /> Club House</div>
          <div><FaSwimmer /> Swimming Pool</div>
          
        </div>
        <div className="unique-amenities-footer-b8t">
          <button className="unique-amenities-btn-view">View all Amenities(40)</button>
          <button className="unique-amenities-btn-download">
            <BiDownload /> Download Brochure
          </button>
        </div>
      </section>
      </div>
      <section className="unique-loan-calc-p45">
       <img src='/homeload.png' className='home_loan_adv'></img>
      </section>
    </div>
  </>
  )
}

export default UniqueAmenitiesComponent