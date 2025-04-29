import React from "react";
import { FaHome, FaUser, FaStar, FaBell } from "react-icons/fa";
import "./DashboardComponentStyles.css";
import { SiReacthookform } from "react-icons/si";
import { FaArrowUpFromBracket } from "react-icons/fa6";
const DashboardComponent = () => {
  return (
    <div className="dashboard_wrap_abxy123">
      <div className="dashboard_navbar_abxy123">

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
      </div>

      <div className="dashboard_overview_abxy123">
        <div className="overview_card_abxy123">
          <FaHome className="overview_icon_abxy123" />
          <div>
            <h3>5</h3>
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
            <div className="property_item_abxy123">
              <img src="/Bikaner.jpg" alt="property" id="dashboard_img" />
              <div className="property_info_abxy123">
                <h4>Woodland Acres</h4>
                <p>$500,600 • $8,500/m</p>
              </div>
              <div className="property_status_abxy123 active">Active</div>
              <a href="#">Edit</a>
            </div>
            <div className="property_item_abxy123">
              <img src="/Bikaner.jpg" alt="property" id="dashboard_img" />
              <div className="property_info_abxy123">
                <h4>Sunnydale Apartments</h4>
                <p>$1,080,500 • $50/m</p>
              </div>
              <div className="property_status_abxy123 active">Active</div>
              <a href="#">Edit</a>
            </div>
            <div className="property_item_abxy123">
              <img src="/Bikaner.jpg" alt="property" id="dashboard_img" />
              <div className="property_info_abxy123">
                <h4>Mapleview Estate</h4>
                <p>$520,000 • $350/m</p>
              </div>
              <div className="property_status_abxy123 sold">Sold</div>
              <a href="#">Details</a>
            </div>
            <div className="property_item_abxy123">
              <img src="/Bikaner.jpg" alt="property" id="dashboard_img" />
              <div className="property_info_abxy123">
                <h4>Lakeside Villas</h4>
                <p>$456,000 • $450/m</p>
              </div>
              <div className="property_status_abxy123 sold">Sold</div>
              <a href="#">Status</a>
            </div>
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
            <img src="/Agent.png" alt="agent" className="dashboard_img_profile" />
            <h4>Riya Jain</h4>
            <p className="agent_phone">7827743220</p>
            <p className="agent_location">Noida, UP</p>
            <button className="edit_profile_btn_abxy123">Edit Profile</button>
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
  );
};

export default DashboardComponent;
