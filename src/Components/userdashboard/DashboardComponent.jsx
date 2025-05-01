import React, { useState, useEffect } from 'react';
import { FaHome, FaUser, FaStar, FaBell, FaEye, FaEdit } from "react-icons/fa";
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
  const [leads, setLeads] = useState([]);
  const [totalLeads, setTotalLeads] = useState(0);
  const [leadsLoading, setLeadsLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('jwttoken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.username);
        setUserId(decodedToken.id);
      } catch (error) {
        console.error('Error decoding token:', error);
        setError('Failed to authenticate user');
      }
    }
  }, []);

  useEffect(() => {
    if (username) {
      fetchProperties();
      fetchLeads();
    }
  }, [username]);

  const fetchLeads = async () => {
    try {
      setLeadsLoading(true);
      const response = await fetch('https://www.townmanor.ai/api/formlead/leads');
      if (!response.ok) {
        throw new Error('Failed to fetch leads');
      }
      const data = await response.json();
      // Filter leads based on username AND source being "owner page"
      const userLeads = data.filter(lead => 
        lead.username === username && 
        lead.source === "owner page"
      );
      setLeads(userLeads);
      setTotalLeads(userLeads.length);
      setLeadsLoading(false);
    } catch (error) {
      console.error('Error fetching leads:', error);
      setLeadsLoading(false);
    }
  };

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
            <h3>{leadsLoading ? "..." : totalLeads}</h3>
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
            <h3>0</h3>
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
                      <h4 style={{
                        fontWeight:'400'
                      }}>{property.configuration} flat at  {property.property_name}</h4>
                      <p>₹{property.price} {property.pricerange}</p>
                    </div>
                    <div className={`property_status_abxy123 ${property.status === 1 ? 'active' : ''}`}>
                      {property.status === 1 ? 'Active' : 'Inactive'}
                    </div>
                    <div className="property_actions_abxy123">
                      <Link to={`/newownerpage/${property.id}`} className="view_btn_abxy123">
                        <FaEye /> View
                      </Link>
                      <Link to={`/editform/${property.id}`} className="edit_btn_abxy123">
                        <FaEdit /> Edit
                      </Link>
                    </div>
                  </div>
                ))}
                {properties.length >= 5 && (
                  <div className="view_more_container">
                    <Link 
                      to="/userdashboard-property" 
                      className="view_more_properties_abxy123"
                      style={{
                        display: 'inline-block',
                        textAlign: 'center',
                        width: '100%',
                        padding: '10px 20px',
                        marginTop: '15px',
                        backgroundColor: '#f8f9fa',
                        border: '1px solid #e2e6ea',
                        borderRadius: '5px',
                        color: '#333',
                        textDecoration: 'none',
                        fontWeight: '500',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#e2e6ea';
                        e.currentTarget.style.borderColor = '#dae0e5';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = '#f8f9fa';
                        e.currentTarget.style.borderColor = '#e2e6ea';
                      }}
                    >
                      View All Properties ({totalProperties - 5} more)
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="leads_list_abxy123">
            <h2>Leads</h2>
            {leadsLoading ? (
              <div>Loading leads...</div>
            ) : leads.length > 0 ? (
              <>
                {leads.slice(0, 2).map((lead) => (
                  <div key={lead.id} className="lead_item_abxy123">
                    <div className="lead_info_abxy123">
                      <h5>{lead.name}</h5>
                      <p>{lead.phone_number}</p>
                      <span>{lead.property_name || 'N/A'}</span>
                    </div>
                    <div className="lead_date_abxy123">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
                {leads.length > 2 && (
                  <div className="view_more_container">
                    <Link 
                      to="/userdashboard-lead" 
                      className="view_more_properties_abxy123"
                      style={{
                        display: 'inline-block',
                        textAlign: 'center',
                        width: '100%',
                        padding: '10px 20px',
                        marginTop: '15px',
                        backgroundColor: '#f8f9fa',
                        border: '1px solid #e2e6ea',
                        borderRadius: '5px',
                        color: '#333',
                        textDecoration: 'none',
                        fontWeight: '500',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#e2e6ea';
                        e.currentTarget.style.borderColor = '#dae0e5';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = '#f8f9fa';
                        e.currentTarget.style.borderColor = '#e2e6ea';
                      }}
                    >
                      See More Leads ({leads.length - 2} more)
                    </Link>
                  </div>
                )}
              </>
            ) : (
              <div className="no-leads-message">
                Currently there are no leads available. Stay updated with us!
              </div>
            )}
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
