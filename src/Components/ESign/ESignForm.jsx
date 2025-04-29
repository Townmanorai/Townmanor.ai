import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../common.css';
import '../commonsecond.css';
import './ESignForm.css';

/**
 * ESignForm Component
 * This component provides a digital e-Sign functionality using Surepass API
 */
const ESignForm = () => {
  const navigate = useNavigate();
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    otp: '',
    aadhaarNumber: '',
    documentType: 'property_agreement',
    documentFile: null
  });
  
  // Component states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clientId, setClientId] = useState(null);
  const [statusCheckInterval, setStatusCheckInterval] = useState(null);
  const [signStatus, setSignStatus] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [auditTrailUrl, setAuditTrailUrl] = useState(null);
  const [currentStep, setCurrentStep] = useState(1); // 1: Initial form, 2: OTP verification, 3: Document upload, 4: Aadhaar verification
  
  // Document type options
  const documentTypes = [
    { value: 'property_agreement', label: 'Property Agreement' },
    { value: 'rental_agreement', label: 'Rental Agreement' },
    { value: 'sale_deed', label: 'Sale Deed' },
    { value: 'other', label: 'Other Document' }
  ];

  // BEARER_TOKEN and BASE_URL
  const BEARER_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxMDE0NjA5NiwianRpIjoiNmM0YWMxNTMtNDE2MS00YzliLWI4N2EtZWIxYjhmNDRiOTU5IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnVzZXJuYW1lXzJ5MTV1OWk0MW10bjR3eWpsaTh6b2p6eXZiZEBzdXJlcGFzcy5pbyIsIm5iZiI6MTcxMDE0NjA5NiwiZXhwIjoyMzQwODY2MDk2LCJ1c2VyX2NsYWltcyI6eyJzY29wZXMiOlsidXNlciJdfX0.DfipEQt4RqFBQbOK29jbQju3slpn0wF9aoccdmtIsPg";
  const BASE_URL = 'https://kyc-api.surepass.io/api/v1/esign';

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
        if (file.size <= 5 * 1024 * 1024) { // 5MB limit
          setFormData({
            ...formData,
            documentFile: file
          });
          setError(null);
        } else {
          setError('File size should be less than 5MB');
        }
      } else {
        setError('Please upload PDF or image files only');
      }
    }
  };

  // Send OTP
  const sendOTP = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${BASE_URL}/send-otp`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${BEARER_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          mobile: formData.mobile,
          email: formData.email
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('OTP sent successfully!');
        setCurrentStep(2); // Move to OTP verification step
      } else {
        setError(data.message || 'Failed to send OTP');
        toast.error(data.message || 'Failed to send OTP');
      }
    } catch (err) {
      console.error('Error sending OTP:', err);
      setError('Error sending OTP. Please try again.');
      toast.error('Error sending OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const verifyOTP = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${BASE_URL}/verify-otp`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${BEARER_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          mobile: formData.mobile,
          otp: formData.otp
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('OTP verified successfully!');
        setCurrentStep(3); // Move to document upload step
      } else {
        setError(data.message || 'Invalid OTP');
        toast.error(data.message || 'Invalid OTP');
      }
    } catch (err) {
      console.error('Error verifying OTP:', err);
      setError('Error verifying OTP. Please try again.');
      toast.error('Error verifying OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Initiate e-sign process
  const initiateESign = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Create form data for file upload
      const formDataForUpload = new FormData();
      formDataForUpload.append('file', formData.documentFile);
      formDataForUpload.append('name', formData.name);
      formDataForUpload.append('mobile', formData.mobile);
      formDataForUpload.append('email', formData.email);
      formDataForUpload.append('aadhaar_number', formData.aadhaarNumber);
      formDataForUpload.append('document_type', formData.documentType);
      
      // Make API call to Surepass API
      const response = await fetch(`${BASE_URL}/init`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${BEARER_TOKEN}`,
        },
        body: formDataForUpload,
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(progress);
        }
      });
      
      const data = await response.json();
      console.log('E-Sign initiation response:', data);
      
      if (data.success) {
        toast.success('E-Sign process initiated successfully!');
        setClientId(data.data.client_id);
        // Start checking status
        startStatusCheck(data.data.client_id);
        
        // Open NSDL e-sign portal in a new window
        if (data.data.redirect_url) {
          window.open(data.data.redirect_url, '_blank');
          setCurrentStep(4); // Move to Aadhaar verification step
        }
      } else {
        setError(data.message || 'Failed to initiate e-sign process');
        toast.error(data.message || 'Failed to initiate e-sign process');
      }
    } catch (err) {
      console.error('Error initiating e-sign:', err);
      setError('Error initiating e-sign process. Please try again.');
      toast.error('Error initiating e-sign process. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Check e-sign status
  const checkESignStatus = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/status/${id}`, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${BEARER_TOKEN}`,
          "Content-Type": "application/json"
        }
      });
      
      const data = await response.json();
      console.log('E-Sign status check response:', data);
      
      if (data.success) {
        setSignStatus(data.data.status);
        
        if (data.data.status === 'esign_completed') {
          toast.success('E-Sign process completed successfully!');
          stopStatusCheck();
          getESignReport(id);
          getAuditTrail(id);
          setCurrentStep(5); // Move to completion step
        } else if (data.data.status === 'esign_failed') {
          toast.error('E-Sign process failed. Please try again.');
          stopStatusCheck();
        }
      }
    } catch (err) {
      console.error('Error checking e-sign status:', err);
    }
  };

  // Start checking e-sign status at intervals
  const startStatusCheck = (id) => {
    // First immediate check
    checkESignStatus(id);
    
    // Then check every 5 seconds
    const interval = setInterval(() => {
      checkESignStatus(id);
    }, 5000);
    
    setStatusCheckInterval(interval);
  };

  // Stop checking e-sign status
  const stopStatusCheck = () => {
    if (statusCheckInterval) {
      clearInterval(statusCheckInterval);
      setStatusCheckInterval(null);
    }
  };

  // Get e-sign report
  const getESignReport = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/report/${id}`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${BEARER_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          categories: ["name_match"]
        })
      });
      
      const data = await response.json();
      console.log('E-Sign report:', data);
      
      if (data.success && data.data.reports && data.data.reports.signed_document_url) {
        window.open(data.data.reports.signed_document_url, '_blank');
      }
    } catch (err) {
      console.error('Error getting e-sign report:', err);
    }
  };

  // Get audit trail
  const getAuditTrail = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/audit-trail/${id}`, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${BEARER_TOKEN}`,
          "Content-Type": "application/json"
        }
      });
      
      const data = await response.json();
      
      if (data.success && data.data.url) {
        setAuditTrailUrl(data.data.url);
      }
    } catch (err) {
      console.error('Error getting audit trail:', err);
    }
  };

  // Cleanup status check interval on component unmount
  useEffect(() => {
    return () => {
      stopStatusCheck();
    };
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form based on current step
    if (currentStep === 1) {
      if (!formData.name.trim()) {
        setError('Name is required');
        return;
      }
      
      if (!formData.mobile.trim() || !/^[0-9]{10}$/.test(formData.mobile)) {
        setError('Valid 10-digit mobile number is required');
        return;
      }
      
      if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        setError('Valid email is required');
        return;
      }
      
      sendOTP();
    } else if (currentStep === 2) {
      if (!formData.otp.trim() || !/^[0-9]{6}$/.test(formData.otp)) {
        setError('Valid 6-digit OTP is required');
        return;
      }
      
      verifyOTP();
    } else if (currentStep === 3) {
      if (!formData.documentFile) {
        setError('Please upload a document to sign');
        return;
      }
      
      initiateESign();
    }
  };

  return (
    <div className="esign-container">
      <div className="esign-banner-head">
        <h1>E-Sign Documents</h1>
        <p>Digitally sign your documents using Aadhaar</p>
      </div>

      <form onSubmit={handleSubmit} className="esign-form">
        {error && <div className="esign-error">{error}</div>}
        
        {/* Step 1: Initial Form */}
        {currentStep === 1 && (
          <>
            <div className="esign-form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div className="esign-form-group">
              <label htmlFor="mobile">Mobile Number *</label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter 10-digit mobile number"
                pattern="[0-9]{10}"
                required
              />
            </div>
            
            <div className="esign-form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                required
              />
            </div>
          </>
        )}
        
        {/* Step 2: OTP Verification */}
        {currentStep === 2 && (
          <>
            <div className="esign-form-group">
              <label htmlFor="otp">Enter OTP *</label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                placeholder="Enter 6-digit OTP"
                pattern="[0-9]{6}"
                required
              />
              <small>OTP sent to {formData.mobile}</small>
            </div>
          </>
        )}
        
        {/* Step 3: Document Upload */}
        {currentStep === 3 && (
          <>
            <div className="esign-form-group">
              <label htmlFor="documentType">Document Type *</label>
              <select
                id="documentType"
                name="documentType"
                value={formData.documentType}
                onChange={handleChange}
                required
              >
                {documentTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="esign-form-group">
              <label htmlFor="documentFile">Upload Document (PDF or Image) *</label>
              <input
                type="file"
                id="documentFile"
                name="documentFile"
                onChange={handleFileChange}
                accept=".pdf,image/*"
                required
              />
              <small>Max file size: 5MB</small>
            </div>
            
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="esign-progress">
                <div className="esign-progress-bar" style={{ width: `${uploadProgress}%` }}>
                  {uploadProgress}%
                </div>
              </div>
            )}
          </>
        )}
        
        {/* Step 4: Aadhaar Verification */}
        {currentStep === 4 && (
          <div className="esign-aadhaar-verification">
            <h3>Aadhaar Verification</h3>
            <p>Please complete the Aadhaar verification process in the new window.</p>
            <p>Once completed, you will be able to download your signed document.</p>
          </div>
        )}
        
        {/* Step 5: Completion */}
        {currentStep === 5 && (
          <div className="esign-completion">
            <h3>E-Sign Process Completed</h3>
            <p>Your document has been successfully signed.</p>
            {auditTrailUrl && (
              <a 
                href={auditTrailUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="esign-audit-trail-link"
              >
                Download Audit Trail
              </a>
            )}
          </div>
        )}
        
        {/* Submit Button */}
        {currentStep < 4 && (
          <button 
            type="submit" 
            className="esign-submit-btn"
            disabled={loading}
          >
            {loading ? 'Processing...' : 
              currentStep === 1 ? 'Send OTP' :
              currentStep === 2 ? 'Verify OTP' :
              'E-Sign Document'
            }
          </button>
        )}
      </form>
      
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default ESignForm; 