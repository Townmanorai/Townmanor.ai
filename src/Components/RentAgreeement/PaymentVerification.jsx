import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaCreditCard, FaCcVisa, FaCcMastercard, FaRegFileAlt, FaTimes } from "react-icons/fa";
import axios from "axios";
import "./PaymentVerification.css";
import Agreementgenerate from "./Agreementgenerate";

// Agreement Preview Modal Component
const AgreementPreviewModal = ({ isOpen, onClose, agreementData }) => {
  if (!isOpen) return null;

  return (
    <div className="agreement-preview-modal-overlay">
      <div className="agreement-preview-modal">
        <div className="agreement-preview-modal-header">
          <h2>Rent Agreement Preview</h2>
          <button onClick={onClose} className="agreement-preview-close-btn">
            <FaTimes />
          </button>
        </div>
        <div className="agreement-preview-content">
          <div className="agreement-section">
            <h3>Property Details</h3>
            <div className="agreement-details-grid">
              <div className="detail-item">
                <span>Property Type:</span>
                <span>{agreementData.property_type}</span>
              </div>
              <div className="detail-item">
                <span>Configuration:</span>
                <span>{agreementData.configuration}</span>
              </div>
              <div className="detail-item">
                <span>Area:</span>
                <span>{agreementData.area_sqft} sq.ft</span>
              </div>
              <div className="detail-item">
                <span>Floor Number:</span>
                <span>{agreementData.floor_number}</span>
              </div>
              <div className="detail-item">
                <span>Building Name:</span>
                <span>{agreementData.building_name}</span>
              </div>
              <div className="detail-item">
                <span>Property Number:</span>
                <span>{agreementData.property_number}</span>
              </div>
              <div className="detail-item">
                <span>Locality:</span>
                <span>{agreementData.locality}</span>
              </div>
              <div className="detail-item">
                <span>City:</span>
                <span>{agreementData.city}</span>
              </div>
              <div className="detail-item">
                <span>State:</span>
                <span>{agreementData.state}</span>
              </div>
              <div className="detail-item">
                <span>Pincode:</span>
                <span>{agreementData.pincode}</span>
              </div>
            </div>
          </div>

          <div className="agreement-section">
            <h3>Agreement Terms</h3>
            <div className="agreement-details-grid">
              <div className="detail-item">
                <span>Monthly Rent:</span>
                <span>₹{agreementData.monthly_rent}</span>
              </div>
              <div className="detail-item">
                <span>Security Deposit:</span>
                <span>₹{agreementData.security_amount}</span>
              </div>
              <div className="detail-item">
                <span>Agreement Duration:</span>
                <span>{agreementData.agreement_duration_months} months</span>
              </div>
              <div className="detail-item">
                <span>Start Date:</span>
                <span>{new Date(agreementData.agreement_start_date).toLocaleDateString()}</span>
              </div>
              <div className="detail-item">
                <span>Yearly Increment:</span>
                <span>{agreementData.yearly_increment}</span>
              </div>
              <div className="detail-item">
                <span>Notice Period:</span>
                <span>{agreementData.notice_period_months} months</span>
              </div>
              <div className="detail-item">
                <span>Lock-in Period:</span>
                <span>{agreementData.lock_in_period_months} months</span>
              </div>
              <div className="detail-item">
                <span>Maintenance Included:</span>
                <span>{agreementData.has_maintenance ? 'Yes' : 'No'}</span>
              </div>
              <div className="detail-item">
                <span>Other Charges:</span>
                <span>{agreementData.has_other_charges ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>

          <div className="agreement-section">
            <h3>Landlord Details</h3>
            <div className="agreement-details-grid">
              <div className="detail-item">
                <span>Name:</span>
                <span>{agreementData.landlord_name}</span>
              </div>
              <div className="detail-item">
                <span>Age:</span>
                <span>{agreementData.landlord_age} years</span>
              </div>
              <div className="detail-item">
                <span>Phone:</span>
                <span>{agreementData.landlord_phone}</span>
              </div>
              <div className="detail-item">
                <span>Email:</span>
                <span>{agreementData.landlord_email}</span>
              </div>
              <div className="detail-item">
                <span>Address:</span>
                <span>{agreementData.landlord_address}</span>
              </div>
              <div className="detail-item">
                <span>Identity Type:</span>
                <span>{agreementData.landlord_identity_type}</span>
              </div>
              <div className="detail-item">
                <span>Identity Number:</span>
                <span>{agreementData.landlord_identity_number}</span>
              </div>
            </div>
          </div>

          <div className="agreement-section">
            <h3>Tenant Details</h3>
            <div className="agreement-details-grid">
              <div className="detail-item">
                <span>Name:</span>
                <span>{agreementData.tenant_name}</span>
              </div>
              <div className="detail-item">
                <span>Age:</span>
                <span>{agreementData.tenant_age} years</span>
              </div>
              <div className="detail-item">
                <span>Phone:</span>
                <span>{agreementData.tenant_phone}</span>
              </div>
              <div className="detail-item">
                <span>Email:</span>
                <span>{agreementData.tenant_email}</span>
              </div>
              <div className="detail-item">
                <span>Address:</span>
                <span>{agreementData.tenant_address}</span>
              </div>
              <div className="detail-item">
                <span>Identity Type:</span>
                <span>{agreementData.tenant_identity_type}</span>
              </div>
              <div className="detail-item">
                <span>Identity Number:</span>
                <span>{agreementData.tenant_identity_number}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentVerification = ({ formData, onFormDataChange, onPrev }) => {
  const navigate = useNavigate();
  const { userid } = useParams();
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [agreementData, setAgreementData] = useState(null);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

  useEffect(() => {
    // Check if this is a post-payment success view
    const agreementId = localStorage.getItem('agreementId');
    if (userid && agreementId) {
      setIsPaymentSuccess(true);
    }
  }, [userid]);

  const [formState, setFormState] = useState({
    consent: false,
    needPhysicalCopy: false,
    isSubmitted: false,
    paymentStatus: 'unpaid',
    ...formData
  });

  const [paymentSummary, setPaymentSummary] = useState({
    stampPaperFee: 100,
    convenienceFee: 299,
    deliveryFee: formState.needPhysicalCopy ? 199 : 0,
    total: 0
  });

  // Calculate total whenever fees change
  useEffect(() => {
    setPaymentSummary(prev => ({
      ...prev,
      total: prev.stampPaperFee + prev.convenienceFee + (formState.needPhysicalCopy ? prev.deliveryFee : 0)
    }));
  }, [formState.needPhysicalCopy]);

  // Load saved data if exists
  useEffect(() => {
    const savedData = localStorage.getItem('rentAgreementFormData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormState(prev => ({
        ...prev,
        ...parsedData
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    const newValue = type === 'checkbox' ? checked : value === 'true';

    setFormState(prev => ({
      ...prev,
      [name]: newValue
    }));

    if (onFormDataChange) {
      onFormDataChange({
        [name]: newValue
      });
    }
  };

  const handlePreviewAgreement = async () => {
    const agreementId = localStorage.getItem('rentAgreementId');
    
    if (!agreementId) {
      alert("Please submit the form first to preview the agreement.");
      return;
    }

    try {
      const response = await axios.get(`http://townmanor.ai/api/rentagreement/${agreementId}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setAgreementData(response.data);
      setIsPreviewModalOpen(true);
    } catch (error) {
      console.error('Error fetching agreement details:', error);
      alert("Failed to load agreement details. Please try again.");
    }
  };

  const handleSubmit = async () => {
    if (!formState.consent) {
      alert("Please confirm that all details are correct before proceeding.");
      return;
    }

    try {
      const requestData = {
        city: formData.city,
        security_amount: 66000,
        stamp_paper_value: paymentSummary.stampPaperFee,
        agreement_duration_months: parseInt(formData.durationMonths),
        monthly_rent: parseFloat(formData.monthlyRent),
        has_maintenance: formData.hasMaintenance ? 1 : 0,
        has_other_charges: formData.hasOtherCharges ? 1 : 0,
        agreement_start_date: formData.startDate,
        yearly_increment: formData.yearlyIncrement,
        notice_period_months: parseInt(formData.noticePeriod),
        lock_in_period_months: parseInt(formData.lockInPeriod),
        property_type: formData.propertyType,
        floor_number: parseInt(formData.floorNumber),
        configuration: formData.configuration,
        area_sqft: parseFloat(formData.areaSqft),
        property_number: formData.propertyNumber,
        building_name: formData.buildingName,
        locality: formData.locality,
        pincode: formData.pincode,
        state: formData.state,
        landlord_name: formData.landlordName,
        landlord_age: parseInt(formData.landlordAge),
        landlord_phone: formData.landlordPhone,
        landlord_address: formData.landlordAddress,
        landlord_identity_number: formData.landlordIdentityNumber,
        landlord_identity_type: formData.landlordIdentityType,
        landlord_email: formData.landlordEmail,
        tenant_name: formData.tenantName,
        tenant_age: parseInt(formData.tenantAge),
        tenant_phone: formData.tenantPhone,
        tenant_address: formData.tenantAddress,
        tenant_identity_number: formData.tenantIdentityNumber,
        tenant_identity_type: formData.tenantIdentityType,
        tenant_email: formData.tenantEmail,
        consent_given: formState.consent ? 1 : 0,
        needs_physical_copy: formState.needPhysicalCopy ? 1 : 0,
        transaction_id: `TXN${Date.now()}`,
        total_amount_paid: paymentSummary.total
      };

      const response = await axios.post('https://townmanor.ai/api/rentagreement', requestData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data && response.data.id) {
        localStorage.setItem('rentAgreementId', response.data.id);
        setFormState(prev => ({
          ...prev,
          isSubmitted: true,
          agreementId: response.data.id
        }));
        alert("Form submitted successfully! You can now proceed with payment.");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      if (error.response) {
        alert(`Submission Error: ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        alert("No response received from server. Please try again.");
      } else {
        alert("Error setting up the request. Please try again.");
      }
    }
  };

  const handlePayment = async () => {
    const rentAgreementId = localStorage.getItem('rentAgreementId');
  if (!rentAgreementId) {
      alert("Please submit the form before proceeding to payment.");
      return;
    }

    try {
      // Get JWT token and decode user data
      const token = Cookies.get('jwttoken');
      if (!token) {
        alert('Please login to proceed with payment');
        return;
      }

      const decodedToken = jwtDecode(token);
      const username = decodedToken.username;

      // Fetch user details from API
      const userResponse = await fetch(`https://www.townmanor.ai/api/user/${username}`);
      if (!userResponse.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await userResponse.json();
      
      // Generate a unique transaction ID with RID prefix for rent agreement
      const txnid = 'OID' + Date.now();
      
      // Prepare payment details with PayU structure
      const paymentData = {
        key: 'UvTrjC', // PayU Merchant Key
        txnid: txnid,
        amount: '1.00', // For testing, amount is 1 rupee
        productinfo: 'Rent Agreement Generation',
        firstname: userData.name || username || '',
        email: userData.email || '',
        phone: userData.phone || '',
        surl: `https://townmanor.ai/api/boster/payu/success`,
        furl: `https://townmanor.ai/api/boster/payu/failure`,
        udf1: localStorage.getItem('rentAgreementId'), // Custom field for agreement ID
        service_provider: 'payu_paisa'
      };

      // Validate required fields
      

      
      localStorage.setItem('paymentType', 'rentAgreement');
      localStorage.setItem('agreementId', rentAgreementId);

      // Call backend to get payment hash and URL
      const response = await axios.post('https://townmanor.ai/api/payu/payment', paymentData);

      if (!response.data || !response.data.paymentUrl || !response.data.params) {
        throw new Error('Invalid payment response received');
      }

      // Create and submit payment form
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = response.data.paymentUrl;

      // Add all the PayU parameters received from backend
      Object.entries(response.data.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = value.toString();
          form.appendChild(input);
        }
      });

      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
    } catch (error) {
      console.error('Payment initiation failed:', error);
      alert(error.response?.data?.message || error.message || 
        'Failed to initiate payment. Please ensure all required information is provided and try again.');
    }
  };

  // Handle payment response
 

  return (
    <div className="payment-verification-unique-main-wrapper">
      <div className="payment-verification-unique-container">
        <h2 className="payment-verification-unique-title">Payment & Verification</h2>
        <p className="payment-verification-unique-subtitle">
          Please verify your details and complete the payment to generate your rent agreement
        </p>
        <div className="payment-verification-unique-checkbox-row">
          <input
            type="checkbox"
            id="agreementConfirm"
            name="consent"
            checked={formState.consent}
            onChange={handleChange}
          />
          <label htmlFor="agreementConfirm">
            I confirm that all details provided in the agreement are correct and accurate. I understand that this will be used to generate a legally binding document.
          </label>
        </div>
        <button
          className="payment-verification-unique-preview-btn"
          onClick={handlePreviewAgreement}
        >
          <FaRegFileAlt style={{ marginRight: 8 }} /> Preview Agreement
        </button>
        <div className="payment-verification-unique-section-label">Do you need a physical copy?</div>
        <div className="payment-verification-unique-radio-row">
          <label className="payment-verification-unique-radio-label">
            <input
              type="radio"
              name="needPhysicalCopy"
              value="true"
              checked={formState.needPhysicalCopy === true}
              onChange={handleChange}
            />
            Yes
          </label>
          <label className="payment-verification-unique-radio-label">
            <input
              type="radio"
              name="needPhysicalCopy"
              value="false"
              checked={formState.needPhysicalCopy === false}
              onChange={handleChange}
            />
            No
          </label>
        </div>
        <div className="payment-verification-unique-info-box">
          <span className="payment-verification-unique-info-icon">i</span>
          <span>Verification links will be automatically sent to both parties (landlord and tenant) within 4-5 hours after successful payment confirmation.</span>
        </div>
        <div className="payment-verification-unique-btn-row">
          <button
            type="button"
            className="payment-verification-unique-prev-btn"
            onClick={onPrev}
          >
            <FaArrowLeft style={{ marginRight: 6 }} /> Previous
          </button>
          <button
            type="button"
            className="payment-verification-unique-prev-btn"
            onClick={handleSubmit}
          >
            <FaArrowLeft style={{ marginRight: 6 }} /> Submit
          </button>
        </div>
      </div>
      <div className="payment-verification-unique-summary-card">
        {isPaymentSuccess ? (
          <div className="payment-success-content">
            <div className="payment-verification-unique-summary-title">Payment Successful!</div>
            <div className="payment-success-message">
              Your rent agreement payment has been processed successfully. You can now download your agreement.
            </div>
          </div>
        ) : (
          <>
            <div className="payment-verification-unique-summary-title">Payment Summary</div>
            <div className="payment-verification-unique-summary-item">
              <span>Stamp Paper Fee</span><span>₹{paymentSummary.stampPaperFee}</span>
            </div>
            <div className="payment-verification-unique-summary-item">
              <span>Convenience Fee</span><span>₹{paymentSummary.convenienceFee}</span>
            </div>
            {formState.needPhysicalCopy && (
              <div className="payment-verification-unique-summary-item">
                <span>Delivery Fee</span><span>₹{paymentSummary.deliveryFee}</span>
              </div>
            )}
            <div className="payment-verification-unique-summary-total">
              <span>Total Amount</span><span>₹{paymentSummary.total}</span>
            </div>
            <button
              className="payment-verification-unique-pay-btn"
              onClick={handlePayment}
            >
              Pay Now
            </button>
            <div className="payment-verification-unique-payment-icons">
              <FaCreditCard /> <FaCcVisa /> <FaCcMastercard />
            </div>
          </>
        )}
        {isPaymentSuccess && (
          <div className="download-agreement-container">
            <Agreementgenerate/>
          </div>
        )}
      </div>
      
      <AgreementPreviewModal 
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        agreementData={agreementData}
      />
    </div>
  );
};

export default PaymentVerification;
