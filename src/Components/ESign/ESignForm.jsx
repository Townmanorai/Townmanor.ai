import React, { useState } from 'react';
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
  
  // BEARER_TOKEN constant
  const BEARER_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxMDE0NjA5NiwianRpIjoiNmM0YWMxNTMtNDE2MS00YzliLWI4N2EtZWIxYjhmNDRiOTU5IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnVzZXJuYW1lXzJ5MTV1OWk0MW10bjR3eWpsaTh6b2p6eXZiZEBzdXJlcGFzcy5pbyIsIm5iZiI6MTcxMDE0NjA5NiwiZXhwIjoyMzQwODY2MDk2LCJ1c2VyX2NsYWltcyI6eyJzY29wZXMiOlsidXNlciJdfX0.DfipEQt4RqFBQbOK29jbQju3slpn0wF9aoccdmtIsPg";
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    otp: '',
    documentFile: null
  });
  
  // Component states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clientId, setClientId] = useState(null);
  const [token, setToken] = useState(null);
  const [esignUrl, setEsignUrl] = useState(null);
  const [currentStep, setCurrentStep] = useState(1); // 1: Initial form, 2: OTP verification, 3: Document upload, 4: Aadhaar verification
  
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
      if (file.type === 'application/pdf') {
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
        setError('Please upload PDF files only');
      }
    }
  };

  // Initialize eSign process
  const initializeESign = async () => {
    console.log('Step 1: Initializing eSign process with user details:', formData);
    setLoading(true);
    setError(null);
    
    try {
      console.log('Making API call to initialize eSign...');
      
      // Create the request body
      const requestBody = {
        pdf_pre_uploaded: false,
        callback_url: window.location.href,
        config: {
          accept_selfie: true,
          allow_selfie_upload: true,
          accept_virtual_sign: true,
          track_location: true,
          auth_mode: "1",
          reason: "Contract",
          positions: {
            "1": [
              {
                x: 10,
                y: 20
              }
            ]
          }
        },
        prefill_options: {
          full_name: formData.name,
          mobile_number: formData.mobile,
          user_email: formData.email
        }
      };

      console.log('Request URL:', '/api/api/v1/esign/initialize');
      console.log('Request Headers:', {
        "Authorization": `Bearer ${BEARER_TOKEN}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      });
      console.log('Request Body:', requestBody);

      // Make the actual request
      const response = await fetch('/api/api/v1/esign/initialize', {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${BEARER_TOKEN}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(requestBody)
      }).catch(error => {
        console.error('Network error details:', {
          name: error.name,
          message: error.message,
          stack: error.stack,
          type: error.type
        });
        throw error;
      });

      console.log('Response Status:', response.status);
      console.log('Response Headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Initialize API Response:', data);
      
      if (data.success) {
        console.log('Step 1: Successfully initialized. Client ID:', data.data.client_id);
        setClientId(data.data.client_id);
        setToken(data.data.token);
        setEsignUrl(data.data.url);
        setCurrentStep(2); // Move to OTP verification step
        toast.success('OTP sent to your mobile number');
      } else {
        console.error('Step 1: Failed to initialize:', data.message);
        setError(data.message || 'Failed to initialize e-sign process');
        toast.error(data.message || 'Failed to initialize e-sign process');
      }
    } catch (err) {
      console.error('Step 1: Error initializing e-sign:', err);
      console.error('Error details:', {
        name: err.name,
        message: err.message,
        stack: err.stack,
        type: err.type
      });
      
      let errorMessage = 'Error initializing e-sign process. Please try again.';
      if (err.message.includes('Failed to fetch')) {
        errorMessage = 'Network error: Please check your internet connection and try again.';
      } else if (err.message.includes('API Error')) {
        errorMessage = `API Error: ${err.message}`;
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const verifyOTP = async () => {
    console.log('Step 2: Verifying OTP for client ID:', clientId);
    setLoading(true);
    setError(null);
    
    try {
      console.log('Making API call to verify OTP...');
      const response = await fetch('/api/api/v1/esign/verify-otp', {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${BEARER_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          client_id: clientId,
          otp: formData.otp
        })
      });
      
      const data = await response.json();
      console.log('Verify OTP API Response:', data);
      
      if (data.success) {
        console.log('Step 2: OTP verified successfully');
        toast.success('OTP verified successfully!');
        setCurrentStep(3); // Move to document upload step
      } else {
        console.error('Step 2: OTP verification failed:', data.message);
        setError(data.message || 'Invalid OTP');
        toast.error(data.message || 'Invalid OTP');
      }
    } catch (err) {
      console.error('Step 2: Error verifying OTP:', err);
      setError('Error verifying OTP. Please try again.');
      toast.error('Error verifying OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Upload document and redirect to NSDL
  const uploadDocument = async () => {
    console.log('Step 3: Uploading document for client ID:', clientId);
    setLoading(true);
    setError(null);
    
    try {
      console.log('Preparing document upload...');
      const formDataForUpload = new FormData();
      formDataForUpload.append('file', formData.documentFile);
      formDataForUpload.append('client_id', clientId);
      formDataForUpload.append('token', token);
      
      console.log('Making API call to upload document...');
      const response = await fetch('/api/api/v1/esign/upload', {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${BEARER_TOKEN}`,
        },
        body: formDataForUpload
      });
      
      const data = await response.json();
      console.log('Upload Document API Response:', data);
      
      if (data.success) {
        console.log('Step 3: Document uploaded successfully, redirecting to NSDL...');
        toast.success('Document uploaded successfully!');
        // Redirect to NSDL e-sign portal
        window.open(esignUrl, '_blank');
        setCurrentStep(4); // Move to Aadhaar verification step
      } else {
        console.error('Step 3: Document upload failed:', data.message);
        setError(data.message || 'Failed to upload document');
        toast.error(data.message || 'Failed to upload document');
      }
    } catch (err) {
      console.error('Step 3: Error uploading document:', err);
      setError('Error uploading document. Please try again.');
      toast.error('Error uploading document. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted at step:', currentStep);
    
    // Validate form based on current step
    if (currentStep === 1) {
      console.log('Validating user details...');
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
      
      console.log('User details validated, proceeding to initialize eSign...');
      initializeESign();
    } else if (currentStep === 2) {
      console.log('Validating OTP...');
      if (!formData.otp.trim() || !/^[0-9]{6}$/.test(formData.otp)) {
        setError('Valid 6-digit OTP is required');
        return;
      }
      
      console.log('OTP validated, proceeding to verify...');
      verifyOTP();
    } else if (currentStep === 3) {
      console.log('Validating document...');
      if (!formData.documentFile) {
        setError('Please upload a document to sign');
        return;
      }
      
      console.log('Document validated, proceeding to upload...');
      uploadDocument();
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
              <label htmlFor="documentFile">Upload Document (PDF) *</label>
              <input
                type="file"
                id="documentFile"
                name="documentFile"
                onChange={handleFileChange}
                accept=".pdf"
                required
              />
              <small>Max file size: 5MB</small>
            </div>
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
              'Upload Document'
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