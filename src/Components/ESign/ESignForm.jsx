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
  
  // Document type options
  const documentTypes = [
    { value: 'property_agreement', label: 'Property Agreement' },
    { value: 'rental_agreement', label: 'Rental Agreement' },
    { value: 'sale_deed', label: 'Sale Deed' },
    { value: 'other', label: 'Other Document' }
  ];

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
      
      // Make API call to initiate e-sign
      const response = await fetch('https://kyc-api.surepass.io/api/v1/esign/init', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxMDE0NjA5NiwianRpIjoiNmM0YWMxNTMtNDE2MS00YzliLWI4N2EtZWIxYjhmNDRiOTU5IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnVzZXJuYW1lXzJ5MTV1OWk0MW10bjR3eWpsaTh6b2p6eXZiZEBzdXJlcGFzcy5pbyIsIm5iZiI6MTcxMDE0NjA5NiwiZXhwIjoyMzQwODY2MDk2LCJ1c2VyX2NsYWltcyI6eyJzY29wZXMiOlsidXNlciJdfX0.DfipEQt4RqFBQbOK29jbQju3slpn0wF9aoccdmtIsPg',
          // No Content-Type header here as FormData sets it with boundary
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
        
        // Open Surepass e-sign portal in a new window if URL is provided
        if (data.data.redirect_url) {
          window.open(data.data.redirect_url, '_blank');
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
      const response = await fetch(`https://kyc-api.surepass.io/api/v1/esign/status/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxMDE0NjA5NiwianRpIjoiNmM0YWMxNTMtNDE2MS00YzliLWI4N2EtZWIxYjhmNDRiOTU5IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnVzZXJuYW1lXzJ5MTV1OWk0MW10bjR3eWpsaTh6b2p6eXZiZEBzdXJlcGFzcy5pbyIsIm5iZiI6MTcxMDE0NjA5NiwiZXhwIjoyMzQwODY2MDk2LCJ1c2VyX2NsYWltcyI6eyJzY29wZXMiOlsidXNlciJdfX0.DfipEQt4RqFBQbOK29jbQju3slpn0wF9aoccdmtIsPg',
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      console.log('E-Sign status check response:', data);
      
      if (data.success) {
        setSignStatus(data.data.status);
        
        // Handle different statuses
        switch (data.data.status) {
          case 'esign_completed':
            toast.success('E-Sign process completed successfully!');
            stopStatusCheck();
            getESignReport(id);
            break;
          case 'esign_failed':
            toast.error('E-Sign process failed. Please try again.');
            stopStatusCheck();
            break;
          case 'otp_verified':
            toast.info('OTP verified. Waiting for e-sign completion...');
            break;
          case 'otp_sent':
            toast.info('OTP sent. Please verify to continue the e-sign process.');
            break;
          default:
            // Keep checking for other statuses
            break;
        }
      } else {
        console.error('Error checking e-sign status:', data.message);
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
      const response = await fetch(`https://kyc-api.surepass.io/api/v1/esign/report/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxMDE0NjA5NiwianRpIjoiNmM0YWMxNTMtNDE2MS00YzliLWI4N2EtZWIxYjhmNDRiOTU5IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnVzZXJuYW1lXzJ5MTV1OWk0MW10bjR3eWpsaTh6b2p6eXZiZEBzdXJlcGFzcy5pbyIsIm5iZiI6MTcxMDE0NjA5NiwiZXhwIjoyMzQwODY2MDk2LCJ1c2VyX2NsYWltcyI6eyJzY29wZXMiOlsidXNlciJdfX0.DfipEQt4RqFBQbOK29jbQju3slpn0wF9aoccdmtIsPg',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          categories: ["name_match"]
        })
      });
      
      const data = await response.json();
      console.log('E-Sign report:', data);
      
      if (data.success) {
        // Process the report data as needed
        // For now, just show a success message
        toast.success('E-Sign document is ready for download!');
        
        // If signed document URL is available, offer download
        if (data.data.reports && data.data.reports.signed_document_url) {
          window.open(data.data.reports.signed_document_url, '_blank');
        }
      } else {
        console.error('Error getting e-sign report:', data.message);
      }
    } catch (err) {
      console.error('Error getting e-sign report:', err);
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
    
    // Validate form
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
    
    if (!formData.aadhaarNumber.trim() || !/^[0-9]{12}$/.test(formData.aadhaarNumber)) {
      setError('Valid 12-digit Aadhaar number is required');
      return;
    }
    
    if (!formData.documentFile) {
      setError('Please upload a document to sign');
      return;
    }
    
    // Initiate e-sign process
    initiateESign();
  };

  return (
    <div className="esign-container">
      <div className="esign-banner-head">
        <h1>E-Sign Documents</h1>
        <p>Digitally sign your documents using Aadhaar</p>
      </div>

      <form onSubmit={handleSubmit} className="esign-form">
        {error && <div className="esign-error">{error}</div>}
        
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
        
        <div className="esign-form-group">
          <label htmlFor="aadhaarNumber">Aadhaar Number *</label>
          <input
            type="text"
            id="aadhaarNumber"
            name="aadhaarNumber"
            value={formData.aadhaarNumber}
            onChange={handleChange}
            placeholder="Enter 12-digit Aadhaar number"
            pattern="[0-9]{12}"
            required
          />
          <small>Your Aadhaar number is required for digital verification</small>
        </div>
        
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
        
        <div className="esign-form-group terms-checkbox">
          <input
            type="checkbox"
            id="termsAgree"
            name="termsAgree"
            required
          />
          <label htmlFor="termsAgree">
            I consent to digitally sign this document using my Aadhaar. I understand this has the same legal validity as a physical signature.
          </label>
        </div>
        
        <button 
          type="submit" 
          className="esign-submit-btn"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'E-Sign Document'}
        </button>
      </form>
      
      {signStatus && (
        <div className="esign-status">
          <h3>E-Sign Status</h3>
          <div className="esign-status-box">
            {signStatus === 'client_intiated' && <p>Initiation in progress...</p>}
            {signStatus === 'otp_sent' && <p>OTP sent to your registered mobile. Please verify.</p>}
            {signStatus === 'otp_verified' && <p>OTP verified. Preparing for e-sign...</p>}
            {signStatus === 'esign_started' && <p>E-Sign process started...</p>}
            {signStatus === 'esign_completed' && <p>E-Sign completed successfully!</p>}
            {signStatus === 'esign_failed' && <p>E-Sign failed. Please try again.</p>}
          </div>
        </div>
      )}
      
      <div className="esign-info-section">
        <h3>About Digital Signature</h3>
        <p>
          A digital signature created through Aadhaar e-Sign is legally valid under the IT Act, 2000.
          The process is secure and ensures that your document is signed with proper verification of your identity.
        </p>
        
        <h3>How It Works</h3>
        <div className="esign-steps">
          <div className="esign-step">
            <div className="esign-step-number">1</div>
            <div className="esign-step-content">
              <h4>Upload Document</h4>
              <p>Upload the document you need to sign</p>
            </div>
          </div>
          
          <div className="esign-step">
            <div className="esign-step-number">2</div>
            <div className="esign-step-content">
              <h4>Verify Identity</h4>
              <p>Verify your identity using Aadhaar OTP</p>
            </div>
          </div>
          
          <div className="esign-step">
            <div className="esign-step-number">3</div>
            <div className="esign-step-content">
              <h4>Sign Document</h4>
              <p>Digitally sign your document</p>
            </div>
          </div>
          
          <div className="esign-step">
            <div className="esign-step-number">4</div>
            <div className="esign-step-content">
              <h4>Download</h4>
              <p>Download your digitally signed document</p>
            </div>
          </div>
        </div>
      </div>
      
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