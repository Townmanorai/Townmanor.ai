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
    documentFile: null
  });
  
  // Component states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clientId, setClientId] = useState(null);
  const [token, setToken] = useState(null);
  const [esignUrl, setEsignUrl] = useState(null);
  const [currentStep, setCurrentStep] = useState(1); // 1: Initial form, 2: Document upload, 3: Aadhaar verification
  
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
    console.log('=== Step 1: Initializing eSign Process ===');
    console.log('Form Data:', formData);
    setLoading(true);
    setError(null);
    
    try {
      console.log('Preparing initialization request...');
      
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
          skip_otp: true,
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

      console.log('=== Request Details ===');
      console.log('URL:', 'https://kyc-api.surepass.io/api/v1/esign/initialize');
      console.log('Headers:', {
        "Authorization": `Bearer ${BEARER_TOKEN}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      });
      console.log('Request Body:', JSON.stringify(requestBody, null, 2));

      console.log('Making API call...');
      const response = await fetch('https://kyc-api.surepass.io/api/v1/esign/initialize', {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${BEARER_TOKEN}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        mode: 'cors',
        body: JSON.stringify(requestBody)
      }).catch(error => {
        console.error('=== Network Error Details ===');
        console.error('Error Name:', error.name);
        console.error('Error Message:', error.message);
        console.error('Error Stack:', error.stack);
        console.error('Error Type:', error.type);
        throw error;
      });

      console.log('=== Response Details ===');
      console.log('Status:', response.status);
      console.log('Status Text:', response.statusText);
      console.log('Headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('=== API Error Response ===');
        console.error('Status:', response.status);
        console.error('Status Text:', response.statusText);
        console.error('Error Text:', errorText);
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('=== API Response Data ===');
      console.log('Full Response:', JSON.stringify(data, null, 2));
      
      if (data.success) {
        console.log('=== Success Response ===');
        console.log('Client ID:', data.data.client_id);
        console.log('Token:', data.data.token);
        console.log('URL:', data.data.url);
        
        setClientId(data.data.client_id);
        setToken(data.data.token);
        setEsignUrl(data.data.url);
        setCurrentStep(2);
        toast.success('Initialization successful');
      } else {
        console.error('=== Error Response ===');
        console.error('Message:', data.message);
        console.error('Message Code:', data.message_code);
        setError(data.message || 'Failed to initialize e-sign process');
        toast.error(data.message || 'Failed to initialize e-sign process');
      }
    } catch (err) {
      console.error('=== Error in Initialization ===');
      console.error('Error Type:', err.name);
      console.error('Error Message:', err.message);
      console.error('Error Stack:', err.stack);
      
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

  // Upload document and redirect to NSDL
  const uploadDocument = async () => {
    console.log('=== Step 2: Document Upload Process ===');
    console.log('Client ID:', clientId);
    console.log('Token:', token);
    setLoading(true);
    setError(null);
    
    try {
      // Step 1: Get upload link
      console.log('=== Getting Upload Link ===');
      const getLinkResponse = await fetch('https://kyc-api.surepass.io/api/v1/esign/get-upload-link', {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${BEARER_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          client_id: clientId
        })
      });

      const linkData = await getLinkResponse.json();
      console.log('Upload Link Response:', JSON.stringify(linkData, null, 2));

      if (!linkData.success) {
        throw new Error(linkData.message || 'Failed to get upload link');
      }

      const { url, fields } = linkData.data;

      // Step 2: Upload to AWS S3
      console.log('=== Uploading to AWS S3 ===');
      const formDataForUpload = new FormData();
      
      // Add all fields from the response
      Object.entries(fields).forEach(([key, value]) => {
        formDataForUpload.append(key, value);
      });
      
      // Add the file last
      formDataForUpload.append('file', formData.documentFile);

      console.log('Uploading to URL:', url);
      console.log('Form Data Fields:');
      for (let [key, value] of formDataForUpload.entries()) {
        console.log(`${key}:`, value instanceof File ? value.name : value);
      }

      const uploadResponse = await fetch(url, {
        method: 'POST',
        body: formDataForUpload
      });

      if (!uploadResponse.ok) {
        throw new Error(`Failed to upload to AWS S3: ${uploadResponse.status} ${uploadResponse.statusText}`);
      }

      console.log('=== Document Upload Successful ===');
      console.log('Redirecting to NSDL URL:', esignUrl);
      toast.success('Document uploaded successfully!');
      window.open(esignUrl, '_blank');
      setCurrentStep(3);

    } catch (err) {
      console.error('=== Error in Document Upload ===');
      console.error('Error Type:', err.name);
      console.error('Error Message:', err.message);
      console.error('Error Stack:', err.stack);
      
      let errorMessage = 'Error uploading document. Please try again.';
      if (err.message.includes('Failed to fetch')) {
        errorMessage = 'Network error: Please check your internet connection and try again.';
      } else if (err.message.includes('Failed to get upload link')) {
        errorMessage = 'Failed to get upload link from server. Please try again.';
      } else if (err.message.includes('Failed to upload to AWS S3')) {
        errorMessage = 'Failed to upload document to server. Please try again.';
      } else {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
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
        
        {/* Step 2: Document Upload */}
        {currentStep === 2 && (
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
        
        {/* Step 3: Aadhaar Verification */}
        {currentStep === 3 && (
          <div className="esign-aadhaar-verification">
            <h3>Aadhaar Verification</h3>
            <p>Please complete the Aadhaar verification process in the new window.</p>
            <p>Once completed, you will be able to download your signed document.</p>
          </div>
        )}
        
        {/* Submit Button */}
        {currentStep < 3 && (
          <button 
            type="submit" 
            className="esign-submit-btn"
            disabled={loading}
          >
            {loading ? 'Processing...' : 
              currentStep === 1 ? 'Continue' :
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