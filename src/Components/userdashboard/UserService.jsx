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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Adjust items per page as needed


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
    fetch(`https://townmanor.ai/api/bookings/username/${username}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch bookings');
        return res.json();
      })
      .then(data => {
        const sortedData = Array.isArray(data) ? data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) : [];
        setColivingRooms(sortedData);
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
              <>
              <ul className="user-service-list">
                {colivingRooms
                  .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                  .map((room, idx) => {
                  const maskAadhaar = (num) => num ? num.slice(0, 2) + '********' + num.slice(-2) : 'N/A';
                  return (
                    <li key={room.id || idx} className="user-service-list-item">
                      <div style={{flex:1}}>
                        <div style={{fontWeight:700,fontSize:'1.1rem',marginBottom:'4px'}}>Booking #{room.id}</div>
                        <div><strong>Price:</strong> ₹{room.price?.toLocaleString() || 'N/A'}</div>
                        <div><strong>Dates:</strong> {new Date(room.start_date).toLocaleDateString()} - {new Date(room.end_date).toLocaleDateString()}</div>
                        <div><strong>Status:</strong> {room.status}</div>
                        <div><strong>Aadhaar:</strong> {maskAadhaar(room.adhar_detail)}</div>
                        <div><strong>Aadhaar Verified:</strong> {room.adhar_verification ? 'Yes' : 'No'}</div>
                        <div><strong>Phone Verified:</strong> {room.phone_verification ? 'Yes' : 'No'}</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              {colivingRooms.length > itemsPerPage && (
                <div className="pagination-controls">
                  <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                    Previous
                  </button>
                  <span>Page {currentPage} of {Math.ceil(colivingRooms.length / itemsPerPage)}</span>
                  <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(colivingRooms.length / itemsPerPage)))} disabled={currentPage === Math.ceil(colivingRooms.length / itemsPerPage)}>
                    Next
                  </button>
                </div>
              )}
            </>
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