import React from "react";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhoneAlt,
  FaEllipsisV,
  FaPlus,
  FaCalendarAlt,
  FaChevronDown,
  FaSortAmountDown,
  FaDownload,
  FaListUl,
  FaSearch
} from "react-icons/fa";
import "./UserLeadsManagementStyles.css";
import UserDashboardNavbar from "./UserDashboardNavbar";

const leadsData = [
  {
    name: "John Doe",
    avatar: "",
    email: "johndoe@email.com",
    phone: "+1 (555) 123-4567",
    added: "5 days ago",
    property: "Woodland Acres",
    lastContact: "Apr 20, 2025",
  },
  {
    name: "Mary Johnson",
    avatar: "",
    email: "mary.johnson@email.com",
    phone: "+1 (555) 987-6543",
    added: "7 days ago",
    property: "Sunnydale Apartments",
    lastContact: "Apr 18, 2025",
  },
  {
    name: "David Chen",
    avatar: "",
    email: "david.chen@email.com",
    phone: "+1 (555) 234-5678",
    added: "3 days ago",
    property: "Mapleview Estate",
    lastContact: "Apr 22, 2025",
  },
  {
    name: "Sarah Williams",
    avatar: "",
    email: "sarah.w@email.com",
    phone: "+1 (555) 345-6789",
    added: "10 days ago",
    property: "Lakeside Villas",
    lastContact: "Apr 15, 2025",
  },
  {
    name: "Robert Taylor",
    avatar: "",
    email: "robert@email.com",
    phone: "+1 (555) 456-7890",
    added: "9 days ago",
    property: "Woodland Acres",
    lastContact: "Apr 23, 2025",
  },
  {
    name: "Emily Parker",
    avatar: "",
    email: "emily.p@email.com",
    phone: "+1 (555) 567-8901",
    added: "6 days ago",
    property: "Sunnydale Apartments",
    lastContact: "Apr 19, 2025",
  },
  {
    name: "Michael Brown",
    avatar: "",
    email: "michael.b@email.com",
    phone: "+1 (555) 678-9012",
    added: "4 days ago",
    property: "Mapleview Estate",
    lastContact: "Apr 21, 2025",
  },
];

const UserLeadsManagement = () => {
  return (
    <>
    <UserDashboardNavbar/>
    <div className="lmgt_main_wrap">
      <div className="lmgt_header_bar">
        <span className="lmgt_header_title">Leads Management</span>
        <span className="lmgt_header_subtitle">
          Manage and track all your potential clients
        </span>
      </div>
      <div className="lmgt_stats_row">
        <div className="lmgt_stats_card">
          <span className="lmgt_stats_value lmgt_stats_blue">42</span>
          <span className="lmgt_stats_label">Total Leads</span>
        </div>
        <div className="lmgt_stats_card">
          <span className="lmgt_stats_value lmgt_stats_green">12</span>
          <span className="lmgt_stats_label">New Leads (This Week)</span>
        </div>
        <div className="lmgt_stats_card">
          <span className="lmgt_stats_value lmgt_stats_orange">8</span>
          <span className="lmgt_stats_label">Converted Leads</span>
        </div>
        <div className="lmgt_stats_card">
          <span className="lmgt_stats_value lmgt_stats_red">5</span>
          <span className="lmgt_stats_label">Follow-ups Due Today</span>
        </div>
        <button className="lmgt_add_lead_btn">
          <FaPlus style={{ marginRight: 8 }} />
          Add New Lead
        </button>
      </div>
      <div className="lmgt_filter_bar">
        <div className="lmgt_search_box">
          <FaSearch className="lmgt_search_icon" />
          <input
            className="lmgt_search_input"
            placeholder="Search leads by name, email, or property..."
          />
        </div>
        <div className="lmgt_filters_group">
          <button className="lmgt_filter_btn">
            <span>Status</span>
            <FaChevronDown className="lmgt_filter_icon" />
          </button>
          <button className="lmgt_filter_btn">
            <span>Date Range</span>
            <FaCalendarAlt className="lmgt_filter_icon" />
          </button>
          <button className="lmgt_filter_btn">
            <span>Property</span>
            <FaChevronDown className="lmgt_filter_icon" />
          </button>
          <button className="lmgt_filter_btn">
            <span>Sort By</span>
            <FaSortAmountDown className="lmgt_filter_icon" />
          </button>
        </div>
      </div>
      <div className="lmgt_table_actions_row">
        <span className="lmgt_all_leads_label">All Leads</span>
        <div className="lmgt_table_actions_btns">
          <button className="lmgt_export_btn">
            <FaDownload style={{ marginRight: 6 }} />
            Export
          </button>
          <button className="lmgt_bulk_btn">
            <FaListUl style={{ marginRight: 6 }} />
            Bulk Actions
          </button>
        </div>
      </div>
      <div className="lmgt_table_wrap">
        <div className="lmgt_table_header_row">
          <span className="lmgt_table_header_cell lmgt_th_checkbox"></span>
          <span className="lmgt_table_header_cell lmgt_th_lead">Lead</span>
          <span className="lmgt_table_header_cell lmgt_th_contact">Contact Info</span>
          <span className="lmgt_table_header_cell lmgt_th_property">Property Interest</span>
          <span className="lmgt_table_header_cell lmgt_th_lastcontact">Last Contact</span>
          <span className="lmgt_table_header_cell lmgt_th_actions">Actions</span>
        </div>
        {leadsData.map((lead, idx) => (
          <div className="lmgt_table_row" key={idx}>
            <span className="lmgt_table_cell lmgt_td_checkbox">
              <input type="checkbox" />
            </span>
            <span className="lmgt_table_cell lmgt_td_lead">
              {lead.avatar ? (
                <img src={lead.avatar} className="lmgt_lead_avatar" alt="avatar" />
              ) : (
                <FaUserCircle className="lmgt_lead_avatar_icon" />
              )}
              <span className="lmgt_lead_name">{lead.name}</span>
              <span className="lmgt_lead_added">Added {lead.added}</span>
            </span>
            <span className="lmgt_table_cell lmgt_td_contact">
              <span className="lmgt_lead_email">{lead.email}</span>
              <span className="lmgt_lead_phone">{lead.phone}</span>
            </span>
            <span className="lmgt_table_cell lmgt_td_property">
              <span className="lmgt_lead_property">{lead.property}</span>
            </span>
            <span className="lmgt_table_cell lmgt_td_lastcontact">
              <span className="lmgt_lead_lastcontact">{lead.lastContact}</span>
            </span>
            <span className="lmgt_table_cell lmgt_td_actions">
              <FaEnvelope className="lmgt_action_icon" title="Email" />
              <FaPhoneAlt className="lmgt_action_icon" title="Call" />
              <FaEllipsisV className="lmgt_action_icon" title="More" />
            </span>
          </div>
        ))}
      </div>
      <div className="lmgt_table_footer">
        <span className="lmgt_leads_count">Showing 1-7 of 42 leads</span>
        <div className="lmgt_footer_controls">
          <span className="lmgt_footer_show_label">Show:</span>
          <select className="lmgt_footer_select">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <div className="lmgt_footer_pagination">
            <button className="lmgt_footer_page_btn lmgt_footer_page_btn_active">1</button>
            <button className="lmgt_footer_page_btn">2</button>
            <button className="lmgt_footer_page_btn">3</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default UserLeadsManagement;