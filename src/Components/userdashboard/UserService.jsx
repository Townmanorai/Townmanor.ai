import React, { useEffect, useState } from 'react';
import UserDashboardNavbar from './UserDashboardNavbar';
import './UserService.css'; // For custom styles
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

function getUsernameFromToken() {
  const token = Cookies.get('jwttoken');
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return decoded.username || decoded.user || decoded.sub || null;
  } catch {
    return null;
  }
}

function UserService() {
  const [username, setUsername] = useState(null);
  const [colivingRooms, setColivingRooms] = useState([]);
  const [colivingLoading, setColivingLoading] = useState(true);
  const [colivingError, setColivingError] = useState(null);

  // Rent agreement state
  const [rentAgreements, setRentAgreements] = useState([]);
  const [rentLoading, setRentLoading] = useState(true);
  const [rentError, setRentError] = useState(null);

  useEffect(() => {
    setUsername(getUsernameFromToken());
  }, []);

  useEffect(() => {
    if (!username) return;
    setColivingLoading(true);
    fetch(`https://townmanor.ai/api/coliving-rooms/user/${username}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch bookings');
        return res.json();
      })
      .then(data => {
        setColivingRooms(Array.isArray(data) ? data : []);
        setColivingLoading(false);
      })
      .catch(err => {
        setColivingError(err.message);
        setColivingLoading(false);
      });
  }, [username]);

  useEffect(() => {
    if (!username) return;
    setRentLoading(true);
    fetch(`https://townmanor.ai/api/rentagreement/user/${username}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch rent agreements');
        return res.json();
      })
      .then(data => {
        // API may return single object or array
        if (Array.isArray(data)) {
          setRentAgreements(data);
        } else if (data && Object.keys(data).length > 0) {
          setRentAgreements([data]);
        } else {
          setRentAgreements([]);
        }
        setRentLoading(false);
      })
      .catch(err => {
        setRentError(err.message);
        setRentLoading(false);
      });
  }, [username]);

  return (
    <>
      <UserDashboardNavbar />
      <div className="user-service-container">
        <h2 className="user-service-title">Your Services</h2>
        <div className="user-service-sections">
          {/* Coliving Booked Section */}
          <div className="user-service-card">
            <h3>Coliving Booked by You</h3>
            {colivingLoading ? (
              <div className="user-service-loading">Loading bookings...</div>
            ) : colivingError ? (
              <div className="user-service-error">{colivingError}</div>
            ) : colivingRooms.length === 0 ? (
              <div className="user-service-empty">No coliving rooms booked yet.</div>
            ) : (
              <ul className="user-service-list">
  {colivingRooms.map((room, idx) => {
    // Mask phone and Aadhaar for privacy
    const maskPhone = (num) => num ? num.slice(0, 2) + '******' + num.slice(-2) : 'N/A';
    const maskAadhaar = (num) => num ? num.slice(0, 2) + '********' + num.slice(-2) : 'N/A';
    return (
      <li key={room.id || idx} className="user-service-list-item" style={{display:'flex',gap:'18px',alignItems:'center'}}>
        <img src={room.image} alt={room.property_name} style={{width:'80px',height:'80px',objectFit:'cover',borderRadius:'8px',background:'#eee'}} />
        <div style={{flex:1}}>
          <div style={{fontWeight:700,fontSize:'1.1rem',marginBottom:'4px'}}>{room.property_name}</div>
          <div><strong>Price:</strong> ₹{room.price?.toLocaleString() || 'N/A'} /mo</div>
          <div><strong>Area:</strong> {room.area || 'N/A'} sqft</div>
          <div><strong>Bedroom:</strong> {room.bedroom || 'N/A'}</div>
          <div><strong>Bathroom:</strong> {room.bathroom || 'N/A'}</div>
          <div><strong>Dedicated Workspace:</strong> {room.dedicated_work_space ? 'Yes' : 'No'}</div>
          <div><strong>Phone:</strong> {maskPhone(room.phone_no)}</div>
          <div><strong>Aadhaar:</strong> {maskAadhaar(room.adhar_number)}</div>
        </div>
      </li>
    );
  })}
</ul>
            )}
          </div>

          {/* Rent Agreement Service Section */}
          <div className="user-service-card">
            <h3>Rent Agreement Service Used</h3>
            {rentLoading ? (
  <div className="user-service-loading">Loading rent agreements...</div>
) : rentError ? (
  <div className="user-service-error">{rentError}</div>
) : rentAgreements.length === 0 ? (
  <div className="user-service-empty">No rent agreement services used yet.</div>
) : (
  <ul className="user-service-list">
    {rentAgreements.map((agreement, idx) => {
      const maskPhone = (num) => num ? num.slice(0, 2) + '******' + num.slice(-2) : 'N/A';
      const maskId = (num) => num ? num.slice(0, 2) + '******' + num.slice(-2) : 'N/A';
      return (
        <li key={agreement.id || idx} className="user-service-list-item" style={{display:'flex',gap:'18px',alignItems:'flex-start'}}>
          <div style={{flex:1}}>
            <div style={{fontWeight:700,fontSize:'1.1rem',marginBottom:'4px'}}>
              {agreement.building_name}, {agreement.property_number} - {agreement.locality}, {agreement.city}, {agreement.state}
            </div>
            <div><strong>Tenant:</strong> {agreement.tenant_name} ({maskPhone(agreement.tenant_phone)})</div>
            <div><strong>Landlord:</strong> {agreement.landlord_name} ({maskPhone(agreement.landlord_phone)})</div>
            <div><strong>Monthly Rent:</strong> ₹{agreement.monthly_rent?.toLocaleString() || 'N/A'}</div>
            <div><strong>Deposit:</strong> ₹{agreement.security_amount?.toLocaleString() || 'N/A'}</div>
            <div><strong>Duration:</strong> {agreement.agreement_duration_months} months</div>
            <div><strong>Start Date:</strong> {agreement.agreement_start_date ? new Date(agreement.agreement_start_date).toLocaleDateString() : 'N/A'}</div>
            <div><strong>Increment:</strong> {agreement.yearly_increment || 'N/A'}</div>
            <div><strong>Notice/Lock-in:</strong> {agreement.notice_period_months} / {agreement.lock_in_period_months} months</div>
            <div><strong>Property Type:</strong> {agreement.property_type} ({agreement.configuration}, {agreement.area_sqft} sqft, Floor {agreement.floor_number})</div>
            <div><strong>Landlord ID:</strong> {agreement.landlord_identity_type}: {maskId(agreement.landlord_identity_number)}</div>
            <div><strong>Tenant ID:</strong> {agreement.tenant_identity_type}: {maskId(agreement.tenant_identity_number)}</div>
            <div><strong>Status:</strong> {agreement.landlord_verified ? 'Landlord Verified' : 'Unverified'}, {agreement.tenant_verified ? 'Tenant Verified' : 'Unverified'}, {agreement.consent_given ? 'Consent Given' : 'Consent Pending'}, {agreement.needs_physical_copy ? 'Physical Copy Needed' : 'E-copy'}</div>
            {agreement.document && (
              <div><a href={agreement.document} target="_blank" rel="noopener noreferrer">Download Document</a></div>
            )}
          </div>
        </li>
      );
    })}
  </ul>
) }
          </div>
        </div>
      </div>
    </>
  );
}

export default UserService;