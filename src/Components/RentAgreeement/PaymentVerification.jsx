import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaLink, FaEnvelope, FaArrowLeft, FaCreditCard, FaCcVisa, FaCcMastercard, FaRegFileAlt } from "react-icons/fa";
import axios from "axios";
import "./PaymentVerification.css";

const PaymentVerification = ({ formData, onFormDataChange, onPrev }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [verificationState, setVerificationState] = useState({
    landlordVerified: false,
    tenantVerified: false
  });
  
  const [formState, setFormState] = useState({
    consent: false,
    needPhysicalCopy: false,
    isSubmitted: false,
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
      setVerificationState({
        landlordVerified: parsedData.landlordVerified || false,
        tenantVerified: parsedData.tenantVerified || false
      });
    }
  }, []);

  // Handle URL verification parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const verificationToken = params.get('token');
    const userType = params.get('type');

    if (verificationToken) {
      // Verify the token and update verification status
      handleVerificationCallback(verificationToken, userType);
    }
  }, [location]);

  const handleVerificationCallback = async (token, userType) => {
    try {
      // Here you would verify the token with your backend
      // For now, we'll simulate a successful verification
      setVerificationState(prev => ({
        ...prev,
        [userType === 'landlord' ? 'landlordVerified' : 'tenantVerified']: true
      }));

      // Save verification status
      const savedData = JSON.parse(localStorage.getItem('rentAgreementFormData') || '{}');
      localStorage.setItem('rentAgreementFormData', JSON.stringify({
        ...savedData,
        [userType === 'landlord' ? 'landlordVerified' : 'tenantVerified']: true
      }));

      alert(`${userType} verification successful!`);
    } catch (error) {
      console.error('Verification failed:', error);
      alert('Verification failed. Please try again.');
    }
  };

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

  const generateVerificationLink = (type) => {
    // In production, this would be your actual domain
    const baseUrl = window.location.origin;
    const token = generateToken(type); // You would implement this
    return `${baseUrl}/verify?type=${type}&token=${token}`;
  };

  const handleVerificationLink = async (type) => {
    if (!formState.isSubmitted) {
      alert("Please submit the form first before proceeding with verification.");
      return;
    }

    const link = generateVerificationLink(type);
    try {
      await navigator.clipboard.writeText(link);
      alert(`Verification link copied to clipboard!`);
    } catch (err) {
      console.error('Failed to copy:', err);
      alert('Failed to copy link. Please try again.');
    }
  };

  const handleSendVerification = async (type) => {
    if (!formState.isSubmitted) {
      alert("Please submit the form first before proceeding with verification.");
      return;
    }

    const savedData = JSON.parse(localStorage.getItem('rentAgreementFormData') || '{}');
    const email = type === 'landlord' ? savedData.landlordEmail : savedData.tenantEmail;
    const name = type === 'landlord' ? savedData.landlordName : savedData.tenantName;

    try {
      // Here you would implement the email sending logic
      // For now, we'll simulate it
      console.log(`Sending verification email to ${email}`);
      alert(`Verification link has been sent to ${email}`);
    } catch (error) {
      console.error('Failed to send verification email:', error);
      alert('Failed to send verification email. Please try again.');
    }
  };

  const handlePreviewAgreement = () => {
    // Here you would implement the preview logic
    // For example, open a modal or navigate to a preview page
    if (!formState.isSubmitted) {
      alert("Please submit the form first to preview the agreement.");
      return;
    }
    // Navigate to preview page or open modal
    navigate('/preview-agreement');
  };

  const handleSubmit = async () => {
    if (!formState.consent) {
      alert("Please confirm that all details are correct before proceeding.");
      return;
    }

    try {
      // Log formData to see what we're receiving
      console.log('Form Data received:', formData);

      // Prepare API request data using formData props
      const requestData = {
        city: formData.city,
        security_amount: 66000, // Hardcoded for testing, we'll fix this once we see the formData structure
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
        landlord_verified: verificationState.landlordVerified ? 1 : 0,
        tenant_name: formData.tenantName,
        tenant_age: parseInt(formData.tenantAge),
        tenant_phone: formData.tenantPhone,
        tenant_address: formData.tenantAddress,
        tenant_identity_number: formData.tenantIdentityNumber,
        tenant_identity_type: formData.tenantIdentityType,
        tenant_email: formData.tenantEmail,
        tenant_verified: verificationState.tenantVerified ? 1 : 0,
        consent_given: formState.consent ? 1 : 0,
        needs_physical_copy: formState.needPhysicalCopy ? 1 : 0,
        transaction_id: `TXN${Date.now()}`,
        total_amount_paid: paymentSummary.total
      };

      // Log the request data for debugging
      console.log('Request Data:', requestData);

      // Make API call
      const response = await axios.post('https://townmanor.ai/api/rentagreement', requestData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data && response.data.id) {
        // Store the agreement ID in localStorage
        localStorage.setItem('rentAgreementId', response.data.id);
        
        // Update local state
        setFormState(prev => ({
          ...prev,
          isSubmitted: true,
          agreementId: response.data.id
        }));

        alert("Form submitted successfully! You can now proceed with verification.");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error Response Data:', error.response.data);
        console.error('Error Response Status:', error.response.status);
        console.error('Error Response Headers:', error.response.headers);
        alert(`Submission Error: ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error Request:', error.request);
        alert("No response received from server. Please try again.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error Message:', error.message);
        alert("Error setting up the request. Please try again.");
      }
    }
  };

  const handlePayment = async () => {
    if (!formState.isSubmitted) {
      alert("Please submit the form before proceeding to payment.");
      return;
    }

    if (!verificationState.landlordVerified || !verificationState.tenantVerified) {
      alert("Both landlord and tenant verification must be completed before payment.");
      return;
    }

    try {
      // Here you would integrate with your payment gateway
      // For now, we'll simulate a successful payment
      const paymentResult = await processPayment(paymentSummary.total);
      if (paymentResult.success) {
        alert("Payment successful! Your rent agreement will be generated shortly.");
        navigate('/agreement-success');
      }
    } catch (error) {
      console.error('Payment failed:', error);
      alert("Payment failed. Please try again.");
    }
  };

  // Simulate payment processing
  const processPayment = async (amount) => {
    // This would be replaced with actual payment gateway integration
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, amount });
      }, 1000);
    });
  };

  // Simulate token generation
  const generateToken = (type) => {
    return `verify_${type}_${Date.now()}`;
  };

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
          <FaRegFileAlt style={{marginRight: 8}} /> Preview Agreement
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
        <div className="payment-verification-unique-section-label">Verification</div>
        <div className="payment-verification-unique-verification-box">
          <div className="payment-verification-unique-verification-title">
            Landlord Verification {verificationState.landlordVerified && "✓"}
          </div>
          <div className="payment-verification-unique-verification-desc">Send verification link to the landlord</div>
          <div className="payment-verification-unique-verification-btns">
            <button 
              className="payment-verification-unique-link-btn"
              onClick={() => handleVerificationLink('landlord')}
            >
              <FaLink style={{marginRight: 7}} /> Copy Link
            </button>
            <button 
              className="payment-verification-unique-send-btn"
              onClick={() => handleSendVerification('landlord')}
            >
              <FaEnvelope style={{marginRight: 7}} /> Send Verify
            </button>
          </div>
        </div>
        <div className="payment-verification-unique-verification-box">
          <div className="payment-verification-unique-verification-title">
            Tenant Verification {verificationState.tenantVerified && "✓"}
          </div>
          <div className="payment-verification-unique-verification-desc">Send verification link to the tenant</div>
          <div className="payment-verification-unique-verification-btns">
            <button 
              className="payment-verification-unique-link-btn"
              onClick={() => handleVerificationLink('tenant')}
            >
              <FaLink style={{marginRight: 7}} /> Copy Link
            </button>
            <button 
              className="payment-verification-unique-send-btn"
              onClick={() => handleSendVerification('tenant')}
            >
              <FaEnvelope style={{marginRight: 7}} /> Send Verify
            </button>
          </div>
        </div>
        <div className="payment-verification-unique-info-box">
          <span className="payment-verification-unique-info-icon">i</span>
          <span>You can also complete the verification step after payment. Both parties will receive an email with verification instructions.</span>
        </div>
        <div className="payment-verification-unique-btn-row">
          <button 
            type="button" 
            className="payment-verification-unique-prev-btn"
            onClick={onPrev}
          >
            <FaArrowLeft style={{marginRight: 6}} /> Previous
          </button>
          <button 
            type="button" 
            className="payment-verification-unique-prev-btn"
            onClick={handleSubmit}
          >
            <FaArrowLeft style={{marginRight: 6}} /> Submit
          </button>
        </div>
      </div>
      <div className="payment-verification-unique-summary-card">
        <div className="payment-verification-unique-summary-title">Payment Summary</div>
        <div className="payment-verification-unique-summary-row">
          <span>Stamp Paper Fee</span><span>₹{paymentSummary.stampPaperFee}</span>
        </div>
        <div className="payment-verification-unique-summary-row">
          <span>Convenience Fee</span><span>₹{paymentSummary.convenienceFee}</span>
        </div>
        {formState.needPhysicalCopy && (
          <div className="payment-verification-unique-summary-row">
            <span>Delivery Fee</span><span>₹{paymentSummary.deliveryFee}</span>
          </div>
        )}
        <div className="payment-verification-unique-summary-total">
          <span>Total Amount</span><span>₹{paymentSummary.total}</span>
        </div>
        <button 
          className="payment-verification-unique-pay-btn"
          onClick={handlePayment}
          disabled={!formState.isSubmitted || !verificationState.landlordVerified || !verificationState.tenantVerified}
        >
          Pay Now
        </button>
        <div className="payment-verification-unique-payment-icons">
          <FaCreditCard /> <FaCcVisa /> <FaCcMastercard />
        </div>
      </div>
    </div>
  );
};

export default PaymentVerification;
