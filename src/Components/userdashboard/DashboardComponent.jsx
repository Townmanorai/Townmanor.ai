import React, { useState, useEffect } from 'react';
import { FaHome, FaUser, FaStar, FaBell } from "react-icons/fa";
import "./DashboardComponentStyles.css";
import { SiReacthookform } from "react-icons/si";
import { FaArrowUpFromBracket } from "react-icons/fa6";
import UserDashboardNavbar from "./UserDashboardNavbar";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';

const DashboardComponent = () => {
  const [username, setUsername] = useState('');
  const [properties, setProperties] = useState([]);
  const [totalProperties, setTotalProperties] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = Cookies.get('jwttoken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.username);
        setUserId(decodedToken.id); // Get user ID from token
      } catch (error) {
        console.error('Error decoding token:', error);
        setError('Failed to authenticate user');
      }
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`https://townmanor.ai/api/api/users/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    if (username) {
      fetchProperties();
    }
  }, [username]);

  const fetchProperties = async () => {
    try {
      const response = await fetch(`https://www.townmanor.ai/api/owner-property/username/${username}`);
      if (!response.ok) {
        throw new Error('Failed to fetch properties');
      }
      const data = await response.json();
      setTotalProperties(data.length);
      setProperties(data.slice(0, 5)); // Only take first 5 properties
      setLoading(false);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setError('Failed to load properties');
      setLoading(false);
    }
  };

  return (
    <>
    <UserDashboardNavbar/>
    <div className="dashboard_wrap_abxy123">
      {/* <div className="dashboard_navbar_abxy123">

        <div className="dashboard_menu_abxy123">
          <a href="#">Dashboard</a>
          <a href="#">My Properties</a>
          <a href="#">Leads</a>
          <a href="#">Featured Agent</a>
          <a href="#">My Profile</a>
        </div>
        <div>
          <button className="btn " style={{
            background: 'linear-gradient(to right, #ff4447, #8a2e2e)',
            color: 'white'
          }}><FaArrowUpFromBracket size={20} style={{
            margin: '2px',

          }} />Add Property</button>
        </div>
      </div> */}

      <div className="dashboard_overview_abxy123">
        <div className="overview_card_abxy123">
          <FaHome className="overview_icon_abxy123" />
          <div>
            <h3>{totalProperties}</h3>
            <p>Total Listed Properties</p>
          </div>
        </div>
        <div className="overview_card_abxy123">
          <FaUser className="overview_icon_abxy123" />
          <div>
            <h3>12</h3>
            <p>Total Leads</p>
          </div>
        </div>
        <div className="overview_card_abxy123">
          <FaStar className="overview_icon_abxy123" />
          <div>
            <h3>0</h3>
            <p>Featured Agent</p>
          </div>
        </div>
        <div className="overview_card_abxy123">
          <FaBell className="overview_icon_abxy123" />
          <div>
            <h3>2</h3>
            <p>Active Boosters</p>
          </div>
        </div>
      </div>

      <div className="dashboard_mainsection_abxy123">
        <div className="dashboard_properties_leads_abxy123">
          <div className="properties_list_abxy123">
            <h2>My Properties</h2>
            {loading ? (
              <div>Loading properties...</div>
            ) : error ? (
              <div>Error: {error}</div>
            ) : (
              <>
                {properties.map((property) => (
                  <div key={property.id} className="property_item_abxy123">
                    <img 
                      src={property.image_repository ? 
                        `https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/${JSON.parse(property.image_repository)[0]}` : 
                        '/placeholder.jpg'} 
                      alt={property.property_name} 
                      id="dashboard_img" 
                    />
                    <div className="property_info_abxy123">
                      <h4>{property.property_name}</h4>
                      <p>₹{property.price} {property.pricerange}</p>
                    </div>
                    <div className={`property_status_abxy123 ${property.status === 1 ? 'active' : ''}`}>
                      {property.status === 1 ? 'Active' : 'Inactive'}
                    </div>
                    <Link to={`/edit-property/${property.id}`}>Edit</Link>
                  </div>
                ))}
                {properties.length >= 5 && (
                  <Link to="/userdashboard-property" className="view_more_properties_abxy123">
                    View All Properties
                  </Link>
                )}
              </>
            )}
          </div>

          <div className="leads_list_abxy123">
            <h2>Leads</h2>
            <div className="lead_item_abxy123">
              <div className="lead_info_abxy123">
                <h5>John Doe</h5>
                <p>johndoe@email.com</p>
                <span>I would like to schedule a visit...</span>
              </div>
              <div className="lead_date_abxy123">05/14/24</div>
            </div>
            <div className="lead_item_abxy123">
              <div className="lead_info_abxy123">
                <h5>Mary Johnson</h5>
                <p>mary.johnson@email.com</p>
                <span>Can you provide more information...</span>
              </div>
              <div className="lead_date_abxy123">05/13/24</div>
            </div>
            <a className="leads_morelink_abxy123" href="#">See More Leads</a>
          </div>
        </div>

        <div className="dashboard_sidebar_abxy123">
          <div className="agent_card_abxy123 card_abxy123">
            <img src="/dummyagent.jpg" alt="agent" className="dashboard_img_profile" />
            <h4>{userData?.name_surname || 'Loading...'}</h4>
            <p className="agent_phone">{userData?.phone || 'No phone number'}</p>
            <p className="agent_location">{userData?.address || 'No address'}</p>
            <p className="agent_email">{userData?.email}</p>
            <Link to="/user-profile" className="edit_profile_btn_abxy123">Edit Profile</Link>
          </div>

          <div className="featured_agent_abxy123 card_abxy123">
            <h4>Featured Agent</h4>
            <p className="featured_status">You are not a featured agent yet</p>
            <img src="/feature.jpg" className="dashboard_img_feature" alt="feature" />
            <button className="featured_btn_abxy123">Become Featured Agent</button>
          </div>

          <div className="boosters_section_abxy123 card_abxy123">
            <h4>Show your property on top</h4>
            <p className="booster_info">Buy Property Booster</p>
            <img src="/Work.jpg" className="dashboard_img_boost" alt="boost" />
            <button className="boost_btn_abxy123">Boost your Property</button>
          </div>
        </div>

      </div>
    </div>
    </>
  );
};

export default DashboardComponent;
