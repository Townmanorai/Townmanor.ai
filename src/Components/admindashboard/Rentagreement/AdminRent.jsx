import React, { useState, useEffect } from 'react';
import AdminAccesor from '../navbar/AdminAccesor';
import axios from 'axios';
import './RentAgreementStyles.css';
import { toast } from 'react-toastify';

function AdminRent() {
  const [agreements, setAgreements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [agreementsPerPage] = useState(5);
  const [expandedAgreement, setExpandedAgreement] = useState(null);

  useEffect(() => {
    const fetchAgreements = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://townmanor.ai/api/rentagreement/recent');
        setAgreements(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch rent agreements');
        setLoading(false);
        console.error('Error fetching rent agreements:', err);
      }
    };

    fetchAgreements();
  }, []);

  // Get current agreements for pagination
  const indexOfLastAgreement = currentPage * agreementsPerPage;
  const indexOfFirstAgreement = indexOfLastAgreement - agreementsPerPage;
  const currentAgreements = agreements.slice(indexOfFirstAgreement, indexOfLastAgreement);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleExpandAgreement = (index) => {
    if (expandedAgreement === index) {
      setExpandedAgreement(null);
    } else {
      setExpandedAgreement(index);
    }
  };

  const getStatusBadge = (agreement) => {
    const isVerified = agreement.landlord_verified === 1 && agreement.tenant_verified === 1;
    return (
      <span className={`rentAgmt__statusBadge ${isVerified ? 'rentAgmt__statusComplete' : 'rentAgmt__statusPending'}`}>
        {isVerified ? 'Complete' : 'Pending'}
      </span>
    );
  };

  const verifyTenant = async (id) => {
    try {
      const response = await axios.patch(`https://townmanor.ai/api/rentagreement/${id}/verify-tenant`, {
        tenant_verified: true
      });
      if (response.status === 200) {
        toast.success('Tenant verified successfully');
        // Refresh the agreements list
        const updatedAgreements = agreements.map(agreement => {
          if (agreement.id === id) {
            return { ...agreement, tenant_verified: 1 };
          }
          return agreement;
        });
        setAgreements(updatedAgreements);
      }
    } catch (error) {
      console.error('Error verifying tenant:', error);
      toast.error('Failed to verify tenant');
    }
  };

  const verifyLandlord = async (id) => {
    try {
      const response = await axios.patch(`https://townmanor.ai/api/rentagreement/${id}/verify-landlord`, {
        landlord_verified: true
      });
      if (response.status === 200) {
        toast.success('Landlord verified successfully');
        // Refresh the agreements list
        const updatedAgreements = agreements.map(agreement => {
          if (agreement.id === id) {
            return { ...agreement, landlord_verified: 1 };
          }
          return agreement;
        });
        setAgreements(updatedAgreements);
      }
    } catch (error) {
      console.error('Error verifying landlord:', error);
      toast.error('Failed to verify landlord');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="rentAgmt__container">
        <div className="rentAgmt__sidebar">
          <AdminAccesor />
        </div>
        <div className="rentAgmt__mainContent">
          <div className="rentAgmt__loadingSpinner">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rentAgmt__container">
        <div className="rentAgmt__sidebar">
          <AdminAccesor />
        </div>
        <div className="rentAgmt__mainContent">
          <div className="rentAgmt__error">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="rentAgmt__container">
      <div className="rentAgmt__sidebar">
        <AdminAccesor />
      </div>
      <div className="rentAgmt__mainContent">
        <h1 className="rentAgmt__title">Rent Agreements</h1>
        <div className="rentAgmt__summary">
          <div className="rentAgmt__summaryItem">
            <span className="rentAgmt__summaryLabel">Total Agreements</span>
            <span className="rentAgmt__summaryValue">{agreements.length}</span>
          </div>
          <div className="rentAgmt__summaryItem">
            <span className="rentAgmt__summaryLabel">Pending</span>
            <span className="rentAgmt__summaryValue">
              {agreements.filter(a => a.landlord_verified !== 1 || a.tenant_verified !== 1).length}
            </span>
          </div>
          <div className="rentAgmt__summaryItem">
            <span className="rentAgmt__summaryLabel">Completed</span>
            <span className="rentAgmt__summaryValue">
              {agreements.filter(a => a.landlord_verified === 1 && a.tenant_verified === 1).length}
            </span>
          </div>
        </div>

        <div className="rentAgmt__agreementsList">
          {currentAgreements.length === 0 ? (
            <div className="rentAgmt__noData">No rent agreements found</div>
          ) : (
            currentAgreements.map((agreement, index) => (
              <div key={agreement.transaction_id} className="rentAgmt__card">
                <div className="rentAgmt__cardHeader">
                  <div className="rentAgmt__cardTitle">
                    <h3>{agreement.building_name || agreement.locality}</h3>
                    <p className="rentAgmt__location">
                      {agreement.city}, {agreement.state}
                    </p>
                  </div>
                  <div className="rentAgmt__cardMeta">
                    {getStatusBadge(agreement)}
                    <p className="rentAgmt__transactionId">TXN ID: {agreement.transaction_id}</p>
                  </div>
                </div>

                <div className="rentAgmt__cardContent">
                  <div className="rentAgmt__cardRow">
                    <div className="rentAgmt__cardColumn">
                      <p className="rentAgmt__label">Property</p>
                      <p className="rentAgmt__value">
                        {agreement.configuration} {agreement.property_type}, {agreement.floor_number}{agreement.floor_number ? 'th Floor' : ''}
                      </p>
                    </div>
                    <div className="rentAgmt__cardColumn">
                      <p className="rentAgmt__label">Monthly Rent</p>
                      <p className="rentAgmt__value">₹{agreement.monthly_rent.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="rentAgmt__cardColumn">
                      <p className="rentAgmt__label">Security Deposit</p>
                      <p className="rentAgmt__value">₹{agreement.security_amount.toLocaleString('en-IN')}</p>
                    </div>
                  </div>

                  <div className="rentAgmt__cardRow">
                    <div className="rentAgmt__cardColumn">
                      <p className="rentAgmt__label">Landlord</p>
                      <p className="rentAgmt__value">{agreement.landlord_name}</p>
                    </div>
                    <div className="rentAgmt__cardColumn">
                      <p className="rentAgmt__label">Tenant</p>
                      <p className="rentAgmt__value">{agreement.tenant_name}</p>
                    </div>
                    <div className="rentAgmt__cardColumn">
                      <p className="rentAgmt__label">Physical Copy</p>
                      <p className="rentAgmt__value">{agreement.needs_physical_copy ? 'Yes' : 'No'}</p>
                    </div>
                  </div>

                  <button 
                    className="rentAgmt__expandButton" 
                    onClick={() => toggleExpandAgreement(index)}
                  >
                    {expandedAgreement === index ? 'Show Less' : 'Show More'}
                  </button>

                  {expandedAgreement === index && (
                    <div className="rentAgmt__expandedContent">
                      <h4 className="rentAgmt__expandedTitle">Property Details</h4>
                      <div className="rentAgmt__expandedGrid">
                        <div className="rentAgmt__expandedItem">
                          <p className="rentAgmt__expandedLabel">Property Number</p>
                          <p className="rentAgmt__expandedValue">{agreement.property_number || 'Not specified'}</p>
                        </div>
                        <div className="rentAgmt__expandedItem">
                          <p className="rentAgmt__expandedLabel">Locality</p>
                          <p className="rentAgmt__expandedValue">{agreement.locality || 'Not specified'}</p>
                        </div>
                        <div className="rentAgmt__expandedItem">
                          <p className="rentAgmt__expandedLabel">Pincode</p>
                          <p className="rentAgmt__expandedValue">{agreement.pincode || 'Not specified'}</p>
                        </div>
                        <div className="rentAgmt__expandedItem">
                          <p className="rentAgmt__expandedLabel">Area (sq.ft)</p>
                          <p className="rentAgmt__expandedValue">{agreement.area_sqft || 'Not specified'}</p>
                        </div>
                      </div>

                      <h4 className="rentAgmt__expandedTitle">Agreement Terms</h4>
                      <div className="rentAgmt__expandedGrid">
                        <div className="rentAgmt__expandedItem">
                          <p className="rentAgmt__expandedLabel">Duration</p>
                          <p className="rentAgmt__expandedValue">{agreement.agreement_duration_months ? `${agreement.agreement_duration_months} months` : 'Not specified'}</p>
                        </div>
                        <div className="rentAgmt__expandedItem">
                          <p className="rentAgmt__expandedLabel">Start Date</p>
                          <p className="rentAgmt__expandedValue">{formatDate(agreement.agreement_start_date)}</p>
                        </div>
                        <div className="rentAgmt__expandedItem">
                          <p className="rentAgmt__expandedLabel">Yearly Increment</p>
                          <p className="rentAgmt__expandedValue">{agreement.yearly_increment ? `${agreement.yearly_increment}%` : 'Not specified'}</p>
                        </div>
                        <div className="rentAgmt__expandedItem">
                          <p className="rentAgmt__expandedLabel">Notice Period</p>
                          <p className="rentAgmt__expandedValue">{agreement.notice_period_months ? `${agreement.notice_period_months} months` : 'Not specified'}</p>
                        </div>
                        <div className="rentAgmt__expandedItem">
                          <p className="rentAgmt__expandedLabel">Lock-in Period</p>
                          <p className="rentAgmt__expandedValue">{agreement.lock_in_period_months ? `${agreement.lock_in_period_months} months` : 'None'}</p>
                        </div>
                        <div className="rentAgmt__expandedItem">
                          <p className="rentAgmt__expandedLabel">Stamp Paper Value</p>
                          <p className="rentAgmt__expandedValue">₹{agreement.stamp_paper_value}</p>
                        </div>
                        <div className="rentAgmt__expandedItem">
                          <p className="rentAgmt__expandedLabel">Maintenance Included</p>
                          <p className="rentAgmt__expandedValue">{agreement.has_maintenance ? 'Yes' : 'No'}</p>
                        </div>
                        <div className="rentAgmt__expandedItem">
                          <p className="rentAgmt__expandedLabel">Other Charges</p>
                          <p className="rentAgmt__expandedValue">{agreement.has_other_charges ? 'Yes' : 'No'}</p>
                        </div>
                      </div>

                      <h4 className="rentAgmt__expandedTitle">Landlord Details</h4>
                      <div className="rentAgmt__expandedGrid">
                        <div className="rentAgmt__expandedItem">
                          <p className="rentAgmt__expandedLabel">Name</p>
                          <p className="rentAgmt__expandedValue">{agreement.landlord_name}</p>
                        </div>
                        <div className="rentAgmt__expandedItem">
                          <p className="rentAgmt__expandedLabel">Age</p>
                          <p className="rentAgmt__expandedValue">{agreement.landlord_age}</p>
                        </div>
                        <div className="rentAgmt__expandedItem">
                          <p className="rentAgmt__expandedLabel">Phone</p>
                          <p className="rentAgmt__expandedValue">{agreement.landlord_phone}</p>
                        </div>
                        <div className="rentAgmt__expandedItem">
                          <p className="rentAgmt__expandedLabel">Email</p>
                          <p className="rentAgmt__expandedValue">{agreement.landlord_email}</p>
                        </div>
                        <div className="rentAgmt__expandedItem">
                          <p className="rentAgmt__expandedLabel">Address</p>
                          <p className="rentAgmt__expandedValue">{agreement.landlord_address || 'Not provided'}</p>
                        </div>
                        <div className="rentAgmt__expandedItem">
                          <p className="rentAgmt__expandedLabel">Verification Status</p>
                          <p className="rentAgmt__expandedValue">
                            <span className={`rentAgmt__verificationBadge ${agreement.landlord_verified === 1 ? 'rentAgmt__verified' : 'rentAgmt__unverified'}`}>
                              {agreement.landlord_verified === 1 ? 'Verified' : 'Unverified'}
                            </span>
                          </p>
                        </div>
                        <div className="rentAgmt__expandedItem rentAgmt__fullWidth">
                          <p className="rentAgmt__expandedLabel">Identity Document</p>
                          <div className="rentAgmt__documentPreview">
                            {agreement.landlord_identity_number && (
                              <a href={agreement.landlord_identity_number} target="_blank" rel="noopener noreferrer">
                                <img 
                                  src={agreement.landlord_identity_number} 
                                  alt="Landlord Identity Document" 
                                  className="rentAgmt__identityImage"
                                />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      <h4 className="rentAgmt__expandedTitle">Tenant Details</h4>
                      <div className="rentAgmt__expandedGrid">
                        <div className="rentAgmt__expandedItem">
                          <p className="rentAgmt__expandedLabel">Name</p>
                          <p className="rentAgmt__expandedValue">{agreement.tenant_name}</p>
                        </div>
                        <div className="rentAgmt__expandedItem">
                          <p className="rentAgmt__expandedLabel">Age</p>
                          <p className="rentAgmt__expandedValue">{agreement.tenant_age}</p>
                        </div>
                        <div className="rentAgmt__expandedItem">
                          <p className="rentAgmt__expandedLabel">Phone</p>
                          <p className="rentAgmt__expandedValue">{agreement.tenant_phone}</p>
                        </div>
                        <div className="rentAgmt__expandedItem">
                          <p className="rentAgmt__expandedLabel">Email</p>
                          <p className="rentAgmt__expandedValue">{agreement.tenant_email}</p>
                        </div>
                        <div className="rentAgmt__expandedItem">
                          <p className="rentAgmt__expandedLabel">Address</p>
                          <p className="rentAgmt__expandedValue">{agreement.tenant_address || 'Not provided'}</p>
                        </div>
                        <div className="rentAgmt__expandedItem">
                          <p className="rentAgmt__expandedLabel">Verification Status</p>
                          <p className="rentAgmt__expandedValue">
                            <span className={`rentAgmt__verificationBadge ${agreement.tenant_verified === 1 ? 'rentAgmt__verified' : 'rentAgmt__unverified'}`}>
                              {agreement.tenant_verified === 1 ? 'Verified' : 'Unverified'}
                            </span>
                          </p>
                        </div>
                        <div className="rentAgmt__expandedItem rentAgmt__fullWidth">
                          <p className="rentAgmt__expandedLabel">Identity Document</p>
                          <div className="rentAgmt__documentPreview">
                            {agreement.tenant_identity_number && (
                              <a href={agreement.tenant_identity_number} target="_blank" rel="noopener noreferrer">
                                <img 
                                  src={agreement.tenant_identity_number} 
                                  alt="Tenant Identity Document" 
                                  className="rentAgmt__identityImage"
                                />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      <h4 className="rentAgmt__expandedTitle">Payment Details</h4>
                      <div className="rentAgmt__expandedGrid">
                        <div className="rentAgmt__expandedItem">
                          <p className="rentAgmt__expandedLabel">Transaction ID</p>
                          <p className="rentAgmt__expandedValue">{agreement.transaction_id}</p>
                        </div>
                        <div className="rentAgmt__expandedItem">
                          <p className="rentAgmt__expandedLabel">Amount Paid</p>
                          <p className="rentAgmt__expandedValue">₹{agreement.total_amount_paid}</p>
                        </div>
                        <div className="rentAgmt__expandedItem">
                          <p className="rentAgmt__expandedLabel">Consent Given</p>
                          <p className="rentAgmt__expandedValue">{agreement.consent_given ? 'Yes' : 'No'}</p>
                        </div>
                      </div>

                      <div className="rentAgmt__actionButtons">
                        <button className="rentAgmt__actionButton rentAgmt__viewButton">View Full Agreement</button>
                        {agreement.landlord_verified !== 1 && (
                          <button 
                            className="rentAgmt__actionButton rentAgmt__verifyButton"
                            onClick={() => verifyLandlord(agreement.id)}
                          >
                            Verify Landlord
                          </button>
                        )}
                        {agreement.tenant_verified !== 1 && (
                          <button 
                            className="rentAgmt__actionButton rentAgmt__verifyButton"
                            onClick={() => verifyTenant(agreement.id)}
                          >
                            Verify Tenant
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {agreements.length > agreementsPerPage && (
          <div className="rentAgmt__pagination">
            {Array.from({ length: Math.ceil(agreements.length / agreementsPerPage) }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`rentAgmt__paginationButton ${currentPage === i + 1 ? 'rentAgmt__activePage' : ''}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminRent;