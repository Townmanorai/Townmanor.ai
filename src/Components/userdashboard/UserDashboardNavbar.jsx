import React, { useState } from "react";
import { FaBars, FaTimes} from "react-icons/fa";
import "./UserDashboardNavbarStyles.css";
import { FaArrowUpFromBracket } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const UserDashboardNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate  = useNavigate();

  const handleLogout = () => {
    // Remove JWT token from cookies
    Cookies.remove('jwt_token');
    // Navigate to home page
    navigate('/');
  };

  return (
    <nav className="udnav_navbar" style={{
      marginTop:'5rem'
    }}>
      <div className="udnav_logo"> {/* You can put a logo here if needed */} </div>
      <button className="udnav_menu_icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
      </button>
      <div className={`udnav_menu_links ${menuOpen ? "udnav_menu_open" : ""}`}>
        <a className="udnav_link" href="#" onClick={()=>{
          navigate('/userdashboard')
        }}>Dashboard</a>
        <a className="udnav_link" href="#" onClick={()=>{
          navigate('/userdashboard-property')
        }}>My Properties</a>
        <a className="udnav_link" href="#" onClick={()=>{
          navigate('/userdashboard-lead')
        }}>Leads</a>
        <a className="udnav_link" href="#" onClick={()=>{
          navigate('/userdashboard-agent')
        }}>Featured Agent</a>
        <a className="udnav_link" href="#" onClick={()=>{
          navigate('/userdashboard-profile')
        }}>My Profile</a>
        <button className="udnav_add_btn" onClick={()=>{
          navigate('/newform')
        }}>
          <FaArrowUpFromBracket size={18} style={{ marginRight: 6 }} />
          Add Property
        </button>
        <button className="udnav_add_btn" onClick={handleLogout} style={{ border: 'none', background: '#333', cursor: 'pointer', color: '#fff' }}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default UserDashboardNavbar;