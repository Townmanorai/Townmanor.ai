import React, { useState, useEffect } from "react";
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
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const UserLeadsManagement = () => {
  const [username, setUsername] = useState('');
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLeads, setFilteredLeads] = useState([]);

  // Get username from JWT token
  useEffect(() => {
    const token = Cookies.get('jwttoken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.username);
      } catch (error) {
        console.error('Error decoding token:', error);
        setError('Failed to authenticate user');
      }
    }
  }, []);

  // Fetch leads when username is available
  useEffect(() => {
    if (username) {
      fetchLeads();
    }
  }, [username]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
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
      setFilteredLeads(userLeads);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching leads:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  // Handle search
  useEffect(() => {
    const filtered = leads.filter(lead => 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.property_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.purpose.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLeads(filtered);
  }, [searchTerm, leads]);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate time difference
  const getTimeDifference = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    return `${diffDays} days ago`;
  };

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
          <span className="lmgt_stats_value lmgt_stats_blue">{leads.length}</span>
          <span className="lmgt_stats_label">Total Property Leads</span>
        </div>
        <div className="lmgt_stats_card ">
          <span className="lmgt_stats_value lmgt_stats_green">
            {leads.filter(lead => {
              const leadDate = new Date(lead.created_at);
              const weekAgo = new Date();
              weekAgo.setDate(weekAgo.getDate() - 7);
              return leadDate > weekAgo;
            }).length}
          </span>
          <span className="lmgt_stats_label">New Property Leads (This Week)</span>
        </div>
        <div className="lmgt_stats_card lead_mobile">
          <span className="lmgt_stats_value lmgt_stats_orange">
            {leads.filter(lead => lead.purpose.toLowerCase().includes('converted')).length}
          </span>
          <span className="lmgt_stats_label">Converted Property Leads</span>
        </div>
        <div className="lmgt_stats_card lead_mobile">
          <span className="lmgt_stats_value lmgt_stats_red">
            {leads.filter(lead => {
              const leadDate = new Date(lead.created_at);
              const today = new Date();
              return leadDate.toDateString() === today.toDateString();
            }).length}
          </span>
          <span className="lmgt_stats_label">Today's Property Leads</span>
        </div>
        {/* <button className="lmgt_add_lead_btn">
          <FaPlus style={{ marginRight: 8 }} />
          Add New Lead
        </button> */}
      </div>
      <div className="lmgt_filter_bar">
        <div className="lmgt_search_box">
          <FaSearch className="lmgt_search_icon" />
          <input
            className="lmgt_search_input"
            placeholder="Search leads by name, property, or purpose..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
        <span className="lmgt_all_leads_label">All Property Leads</span>
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
        {loading ? (
          <div className="lmgt_loading">Loading leads...</div>
        ) : error ? (
          <div className="lmgt_error">{error}</div>
        ) : (
          <>
            <div className="lmgt_table_header_row">
              <span className="lmgt_table_header_cell lmgt_th_checkbox"></span>
              <span className="lmgt_table_header_cell lmgt_th_lead">Lead</span>
              <span className="lmgt_table_header_cell lmgt_th_contact">Contact Info</span>
              <span className="lmgt_table_header_cell lmgt_th_property">Property Interest</span>
              <span className="lmgt_table_header_cell lmgt_th_lastcontact">Created At</span>
              <span className="lmgt_table_header_cell lmgt_th_actions">Actions</span>
            </div>
            {filteredLeads.map((lead) => (
              <div className="lmgt_table_row" key={lead.id}>
                <span className="lmgt_table_cell lmgt_td_checkbox lead_mobile">
                  <input type="checkbox" />
                </span>
                <span className="lmgt_table_cell lmgt_td_lead lead_mobile">
                  <FaUserCircle className="lmgt_lead_avatar_icon lead_mobile"/>
                  <span className="lmgt_lead_name">{lead.name}</span>
                  <span className="lmgt_lead_added">Added {getTimeDifference(lead.created_at)}</span>
                </span>
                <span className="lmgt_table_cell lmgt_td_contact">
                  <span className="lmgt_lead_phone">{lead.phone_number}</span>
                  <span className="lmgt_lead_source">{lead.source}</span>
                </span>
                <span className="lmgt_table_cell lmgt_td_property">
                  <span className="lmgt_lead_property">{lead.property_name || 'N/A'}</span>
                  <span className="lmgt_lead_purpose lead_mobile">{lead.purpose}</span>
                </span>
                <span className="lmgt_table_cell lmgt_td_lastcontact">
                  <span className="lmgt_lead_lastcontact">{formatDate(lead.created_at)}</span>
                </span>
                <span className="lmgt_table_cell lmgt_td_actions">
                  <FaEnvelope className="lmgt_action_icon" title="Email" />
                  <FaPhoneAlt className="lmgt_action_icon" title="Call" />
                  {/* <FaEllipsisV className="lmgt_action_icon" title="More" /> */}
                </span>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="lmgt_table_footer">
        <span className="lmgt_leads_count">Showing 1-{filteredLeads.length} of {leads.length} leads</span>
        <div className="lmgt_footer_controls">
          <span className="lmgt_footer_show_label">Show:</span>
          <select className="lmgt_footer_select">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <div className="lmgt_footer_pagination">
            <button className="lmgt_footer_page_btn lmgt_footer_page_btn_active">1</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default UserLeadsManagement;