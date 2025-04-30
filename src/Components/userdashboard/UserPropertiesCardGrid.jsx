import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaEllipsisV,
  FaEye
} from "react-icons/fa";
import "./UserPropertiesCardGridStyles.css";
import UserDashboardNavbar from "./UserDashboardNavbar";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const UserPropertiesCardGrid = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOrder, setSortOrder] = useState('Newest First');
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 8;

  // Get username from token
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

  // Fetch properties when username is available
  useEffect(() => {
    if (username) {
      fetchProperties();
    }
  }, [username]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://www.townmanor.ai/api/owner-property/username/${username}`);
      if (!response.ok) {
        throw new Error('Failed to fetch properties');
      }
      const data = await response.json();
      setProperties(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setError('Failed to load properties');
      setLoading(false);
    }
  };

  // Filter and sort properties
  const filteredProperties = properties
    .filter(prop => {
      const matchesSearch = prop.property_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          prop.address.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All Statuses' || prop.status === statusFilter;
      const matchesPrice = (!minPrice || prop.price >= parseFloat(minPrice)) &&
                          (!maxPrice || prop.price <= parseFloat(maxPrice));
      return matchesSearch && matchesStatus && matchesPrice;
    })
    .sort((a, b) => {
      if (sortOrder === 'Newest First') {
        return new Date(b.created_at) - new Date(a.created_at);
      } else {
        return new Date(a.created_at) - new Date(b.created_at);
      }
    });

  // Pagination
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleViewProperty = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxButtons = 5; // Maximum number of page buttons to show

    if (totalPages <= maxButtons) {
      // Show all pages if total pages is less than or equal to maxButtons
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            className={`mpc_page_btn ${currentPage === i ? 'mpc_page_btn_active' : ''}`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      // Always show first page
      buttons.push(
        <button
          key={1}
          className={`mpc_page_btn ${currentPage === 1 ? 'mpc_page_btn_active' : ''}`}
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
      );

      // Calculate start and end of middle buttons
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Add ellipsis after first page if needed
      if (startPage > 2) {
        buttons.push(<span key="ellipsis1" className="mpc_page_ellipsis">...</span>);
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        buttons.push(
          <button
            key={i}
            className={`mpc_page_btn ${currentPage === i ? 'mpc_page_btn_active' : ''}`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }

      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        buttons.push(<span key="ellipsis2" className="mpc_page_ellipsis">...</span>);
      }

      // Always show last page
      if (totalPages > 1) {
        buttons.push(
          <button
            key={totalPages}
            className={`mpc_page_btn ${currentPage === totalPages ? 'mpc_page_btn_active' : ''}`}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>
        );
      }
    }

    return buttons;
  };

  if (loading) {
    return <div className="mpc_loading">Loading...</div>;
  }

  if (error) {
    return <div className="mpc_error">{error}</div>;
  }

  return (
    <>
    <UserDashboardNavbar/>
    <div className="mpc_main_wrap">
      <div className="mpc_header_row">
        <span className="mpc_title">My Properties</span>
      </div>
      <div className="mpc_filter_row">
        <div className="mpc_search_box">
          <input 
            className="mpc_search_input" 
            placeholder="Search properties..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="mpc_filter_select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All Statuses</option>
          <option>Active</option>
          <option>Sold</option>
          <option>Pending</option>
        </select>
        <input 
          className="mpc_filter_input" 
          placeholder="Min Price" 
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input 
          className="mpc_filter_input" 
          placeholder="Max Price" 
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <select 
          className="mpc_filter_select"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option>Newest First</option>
          <option>Oldest First</option>
        </select>
      </div>
      <div className="mpc_grid">
        {currentProperties.map((prop) => (
          <div className="mpc_card" key={prop.id}>
            <div className="mpc_img_wrap">
              <img 
                src={prop.image_repository ? 
                  `https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/${JSON.parse(prop.image_repository)[0]}` : 
                  '/default-property.jpg'} 
                alt={prop.property_name} 
                className="mpc_img" 
              />
            </div>
            <div className="mpc_card_body">
              <span className="mpc_prop_name">{prop.property_name}</span>
              <span className="mpc_prop_addr">{prop.address}</span>
              <span className="mpc_prop_price">₹{prop.price} {prop.pricerange}</span>
              <span className="mpc_prop_month">
                {prop.area_detail} {prop.area_type} • {prop.configuration}
              </span>
              <div className="mpc_row_status">
                <span
                  className="mpc_status_badge"
                  style={{
                    background: prop.status === 1 ? "#fff" : "#fff",
                    color: prop.status === 1 ? "#333" : "#D81212",
                  }}
                >
                  {prop.status === 1 ? "Active" : "Inactive"}
                </span>
                <span className="mpc_listed">
                  Listed: {new Date(prop.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="mpc_card_actions">
                <button 
                  className="mpc_view_btn"
                  onClick={() => handleViewProperty(prop.id)}
                >
                  <FaEye style={{ marginRight: '5px' }} color="black"/> View
                </button>
                <button className="mpc_edit_btn">Edit</button>
                <button className="mpc_delete_btn">Delete</button>
                <button className="mpc_menu_btn">
                  <FaEllipsisV />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mpc_pagination">
        <button 
          className="mpc_page_btn" 
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        {renderPaginationButtons()}
        <button 
          className="mpc_page_btn" 
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
      </div>
    </div>
    </>
  );
};

export default UserPropertiesCardGrid;