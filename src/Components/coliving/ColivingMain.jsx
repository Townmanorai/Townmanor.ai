import React from 'react';
import './ColivingMain.css';
import { FaWifi, FaBed, FaUtensils, FaTv, FaMapMarkerAlt, FaCheckCircle, FaUserCircle, FaShieldAlt, FaThumbsUp, FaHome } from 'react-icons/fa';

function ColivingMain() {
  return (
    <div className="colivingMain__container">
      {/* Header */}
      <div className="colivingMain__header">
        <div className="colivingMain__header-title">Hostale Quartz, Residential</div>
        <button className="colivingMain__header-btn">Contact Agent</button>
      </div>

      {/* Gallery */}
      <div className="colivingMain__gallery">
        <div className="colivingMain__gallery-main">
          <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" alt="Main Room" />
        </div>
        <div className="colivingMain__gallery-side">
          <img src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80" alt="Room 1" />
          <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" alt="Room 2" />
        </div>
      </div>

      {/* Overview */}
      <div className="colivingMain__overview">
        <div className="colivingMain__overview-title">Overview</div>
        <div>
          Hostale Quartz is a premium coliving space designed for comfort and convenience, featuring modern interiors, spacious rooms, and a vibrant community. Enjoy hassle-free living with all-inclusive amenities, high-speed Wi-Fi, and 24/7 security. Located close to major hotspots and public transport, it ensures easy connectivity and a lively lifestyle.
        </div>
      </div>

      {/* Room Booking */}
      <div className="colivingMain__room-booking">
        <div className="colivingMain__room-card">
          <div className="colivingMain__room-title">1 BHK</div>
          <div className="colivingMain__room-price">₹15,000</div>
          <div>Per Month</div>
          <div style={{marginTop: 8, fontSize: 13, color: '#666'}}>2 Guests &bull; 1 Bed &bull; 1 Bath</div>
          <button className="colivingMain__room-btn">Book Now</button>
        </div>
        <div className="colivingMain__room-card colivingMain__room-card--highlight">
          <div className="colivingMain__room-title">2 BHK</div>
          <div className="colivingMain__room-price">₹18,500</div>
          <div>Per Month</div>
          <div style={{marginTop: 8, fontSize: 13, color: '#666'}}>4 Guests &bull; 2 Beds &bull; 2 Baths</div>
          <button className="colivingMain__room-btn">Book Now</button>
        </div>
      </div>

      {/* Amenities */}
      <div className="colivingMain__amenities">
        <div className="colivingMain__amenity"><FaWifi className="colivingMain__amenity-icon" /> Wi-Fi</div>
        <div className="colivingMain__amenity"><FaBed className="colivingMain__amenity-icon" /> Fully Furnished</div>
        <div className="colivingMain__amenity"><FaUtensils className="colivingMain__amenity-icon" /> Kitchen</div>
        <div className="colivingMain__amenity"><FaTv className="colivingMain__amenity-icon" /> TV Lounge</div>
        <div className="colivingMain__amenity"><FaShieldAlt className="colivingMain__amenity-icon" /> 24x7 Security</div>
      </div>

      {/* Hotspots */}
      <div className="colivingMain__hotspots">
        <div className="colivingMain__overview-title" style={{marginBottom: 10}}>Nearby Hotspots</div>
        <div className="colivingMain__hotspot-row">
          <span className="colivingMain__hotspot-name">Metro Station</span>
          <span className="colivingMain__hotspot-distance">0.3 km</span>
        </div>
        <div className="colivingMain__hotspot-row">
          <span className="colivingMain__hotspot-name">City Mall</span>
          <span className="colivingMain__hotspot-distance">0.5 km</span>
        </div>
        <div className="colivingMain__hotspot-row">
          <span className="colivingMain__hotspot-name">Supermarket</span>
          <span className="colivingMain__hotspot-distance">0.7 km</span>
        </div>
        <div className="colivingMain__hotspot-row">
          <span className="colivingMain__hotspot-name">Hospital</span>
          <span className="colivingMain__hotspot-distance">1.2 km</span>
        </div>
      </div>

      {/* Map */}
      <div className="colivingMain__map">
        <img className="colivingMain__map-img" src="https://maps.googleapis.com/maps/api/staticmap?center=Sector+62+Noida&zoom=14&size=600x300&key=AIzaSyD..." alt="Map" />
      </div>

      {/* Utilities & Extra Costs */}
      <div className="colivingMain__utilities">
        <div className="colivingMain__overview-title" style={{marginBottom: 10}}>Utilities & Extra Costs</div>
        <table className="colivingMain__utilities-table">
          <thead>
            <tr>
              <th>Utility</th>
              <th>Cost</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Wi-Fi</td><td>Included</td><td><FaCheckCircle color="#4f7cff" /></td></tr>
            <tr><td>Electricity</td><td>Extra</td><td><FaCheckCircle color="#4f7cff" /></td></tr>
            <tr><td>Water</td><td>Included</td><td><FaCheckCircle color="#4f7cff" /></td></tr>
            <tr><td>Housekeeping</td><td>Included</td><td><FaCheckCircle color="#4f7cff" /></td></tr>
            <tr><td>Meals</td><td>Extra</td><td><FaCheckCircle color="#4f7cff" /></td></tr>
          </tbody>
        </table>
      </div>

      {/* Reviews */}
      <div className="colivingMain__reviews">
        <div className="colivingMain__review-card">
          <div className="colivingMain__review-user"><FaUserCircle /> Aditi Verma</div>
          "Great experience! The rooms are clean and the community is friendly. Highly recommended."
        </div>
        <div className="colivingMain__review-card">
          <div className="colivingMain__review-user"><FaUserCircle /> Shubham Saini</div>
          "Loved the amenities and the location. Hassle-free stay and prompt support."
        </div>
      </div>

      {/* Our Promise */}
      <div className="colivingMain__promise">
        <div className="colivingMain__promise-item">
          <FaShieldAlt className="colivingMain__promise-icon" />
          <div>Safe & Secure</div>
        </div>
        <div className="colivingMain__promise-item">
          <FaThumbsUp className="colivingMain__promise-icon" />
          <div>Trusted by 10K+</div>
        </div>
        <div className="colivingMain__promise-item">
          <FaHome className="colivingMain__promise-icon" />
          <div>Premium Properties</div>
        </div>
      </div>

      {/* Similar Listings */}
      <div className="colivingMain__similar-listings">
        <div className="colivingMain__similar-card">
          <img className="colivingMain__similar-img" src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="Similar 1" />
          <div>Vibrant City Apartment</div>
          <div style={{color: '#4f7cff', fontWeight: 600}}>₹14,000</div>
        </div>
        <div className="colivingMain__similar-card">
          <img className="colivingMain__similar-img" src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80" alt="Similar 2" />
          <div>Modern 2BHK in Noida</div>
          <div style={{color: '#4f7cff', fontWeight: 600}}>₹16,500</div>
        </div>
        <div className="colivingMain__similar-card">
          <img className="colivingMain__similar-img" src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" alt="Similar 3" />
          <div>Cozy Urban Homestay</div>
          <div style={{color: '#4f7cff', fontWeight: 600}}>₹13,500</div>
        </div>
        <div className="colivingMain__similar-card">
          <img className="colivingMain__similar-img" src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" alt="Similar 4" />
          <div>Studio Apartment</div>
          <div style={{color: '#4f7cff', fontWeight: 600}}>₹12,000</div>
        </div>
      </div>

      {/* Footer */}
      <div className="colivingMain__footer">
        <div className="colivingMain__footer-title">Interested in this property?</div>
        <div className="colivingMain__footer-desc">Just send your details and our property expert will get back to you. Live smart, live better!</div>
        <button className="colivingMain__footer-btn">Request Callback</button>
      </div>
    </div>
  );
}

export default ColivingMain;