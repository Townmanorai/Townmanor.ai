import React from 'react'
import { useNavigate } from 'react-router-dom'
import AdminAccesor from '../navbar/AdminAccesor';
import './Setting.css'
function MainProperty() {
  const navigate = useNavigate();

  return (
    <div className="main-property-wrapper">
      <div className="admin-accessor-container">
        <AdminAccesor />
      </div>
      <div className="main-property-content">
        <h1 className="main-property-title">Property Control Management Section</h1>
        <div className="property-inquiry-buttons">
          <span 
            className="property-button property-button--admin" 
            onClick={() => { navigate('/adminproperty') }}
          >
            Admin Project
          </span>
          <span 
            className="property-button property-button--owner" 
            onClick={() => { navigate('/ownerproperty') }}
          >
            Owner Property
          </span>
        </div>
      </div>
    </div>
  );
}

export default MainProperty;

