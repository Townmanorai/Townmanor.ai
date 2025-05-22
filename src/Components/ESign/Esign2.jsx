import React, { useState } from 'react';
import axios from 'axios';

// Custom CSS to avoid conflicts
const esignStyles = {
  container: {
    fontFamily: '"Segoe UI", Arial, sans-serif',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  header: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
    textAlign: 'center',
  },
  section: {
    marginBottom: '30px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '6px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#2c3e50',
  },
  fileUpload: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    border: '2px dashed #3498db',
    borderRadius: '5px',
    backgroundColor: '#f0f8ff',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  fileUploadActive: {
    borderColor: '#2ecc71',
    backgroundColor: '#e8f5e9',
  },
  fileInput: {
    display: 'none',
  },
  uploadIcon: {
    fontSize: '40px',
    color: '#3498db',
    marginBottom: '10px',
  },
  uploadText: {
    fontSize: '16px',
    color: '#555',
    textAlign: 'center',
  },
  fileInfo: {
    marginTop: '15px',
    padding: '10px',
    backgroundColor: '#e8f5e9',
    borderRadius: '4px',
    width: '100%',
  },
  fileName: {
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  filePages: {
    color: '#555',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#555',
  },
  input: {
    padding: '10px 12px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    transition: 'border-color 0.3s',
  },
  button: {
    padding: '12px 20px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginTop: '10px',
  },
  buttonDisabled: {
    backgroundColor: '#95a5a6',
    cursor: 'not-allowed',
  },
  successMessage: {
    padding: '15px',
    backgroundColor: '#d4edda',
    color: '#155724',
    borderRadius: '4px',
    marginBottom: '20px',
  },
  errorMessage: {
    padding: '15px',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    borderRadius: '4px',
    marginBottom: '20px',
  },
  loader: {
    display: 'inline-block',
    width: '20px',
    height: '20px',
    border: '3px solid rgba(255,255,255,.3)',
    borderRadius: '50%',
    borderTopColor: '#fff',
    animation: 'spin 1s ease-in-out infinite',
    marginRight: '10px',
  },
  '@keyframes spin': {
    to: { transform: 'rotate(360deg)' },
  },
  redirectInfo: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#e8f4f8',
    borderRadius: '4px',
    textAlign: 'center',
  },
  redirectLink: {
    color: '#3498db',
    fontWeight: 'bold',
    textDecoration: 'none',
  }
};

const Esign2 = () => {
  // State for file upload
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');
  const [pageCount, setPageCount] = useState(0);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  // State for user form
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
  });
  
  // State for API responses
  const [clientId, setClientId] = useState('');
  const [redirectUrl, setRedirectUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  // File upload handler
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      
      // For PDF page count
      if (selectedFile.type === 'application/pdf') {
        countPdfPages(selectedFile);
      } else {
        setPageCount(1); // Non-PDF files are treated as single page
      }
      
      uploadFile(selectedFile);
    }
  };
  
  // Count PDF pages
  const countPdfPages = async (pdfFile) => {
    try {
      const fileReader = new FileReader();
      
      fileReader.onload = async (event) => {
        const typedArray = new Uint8Array(event.target.result);
        
        // Using PDF.js to count pages
        // Note: In a real implementation, you would need to import PDF.js
        // This is a simplified example
        try {
          // Placeholder for PDF.js implementation
          // const pdf = await pdfjsLib.getDocument({data: typedArray}).promise;
          // setPageCount(pdf.numPages);
          
          // For now, we'll set a placeholder value
          setPageCount(5); // Placeholder
        } catch (err) {
          console.error('Error counting PDF pages:', err);
          setPageCount(1); // Default to 1 if counting fails
        }
      };
      
      fileReader.readAsArrayBuffer(pdfFile);
    } catch (err) {
      console.error('Error reading file:', err);
      setPageCount(1);
    }
  };
  
  // Upload file to server
  const uploadFile = async (selectedFile) => {
    setUploadLoading(true);
    setUploadError('');
    setUploadSuccess(false);
    
    try {
      const formData = new FormData();
      formData.append('images', selectedFile);
      
      const response = await axios.post(
        'https://www.townmanor.ai/api/image/aws-upload-owner-images',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      if (response.data && response.data.fileUrls && response.data.fileUrls.length > 0) {
        setFileUrl(response.data.fileUrls[0]);
        setUploadSuccess(true);
      } else {
        throw new Error('No file URL received from server');
      }
    } catch (err) {
      console.error('Error uploading file:', err);
      setUploadError(err.message || 'Failed to upload file. Please try again.');
    } finally {
      setUploadLoading(false);
    }
  };
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  // Generate positions based on page count
  const generatePositions = () => {
    const positions = {};
    
    // Create a position for each page in the PDF
    for (let i = 1; i <= pageCount; i++) {
      positions[i.toString()] = [
        {
          x: 10,
          y: 20
        }
      ];
    }
    
    // If pageCount is 0 or undefined, add at least one position
    if (Object.keys(positions).length === 0) {
      positions['1'] = [
        {
          x: 10,
          y: 20
        }
      ];
    }
    
    return positions;
  };
  
  // Initialize e-signing process
  const initializeEsign = async (e) => {
    e.preventDefault();
    
    if (!fileUrl) {
      setError('Please upload a file first');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess(false);
    
    try {
      // Generate dynamic positions based on page count
      const dynamicPositions = generatePositions();
      
      // Step 1: Initialize e-signing
      const initResponse = await axios.post(
        'https://kyc-api.surepass.io/api/v1/esign/initialize',
        {
          pdf_pre_uploaded: true,
          callback_url: 'https://www.townmanor.ai',
          config: {
            accept_selfie: true,
            allow_selfie_upload: true,
            accept_virtual_sign: true,
            track_location: true,
            auth_mode: '1',
            reason: 'Contract',
            positions: dynamicPositions
          },
          prefill_options: {
            full_name: formData.fullName,
            mobile_number: formData.mobileNumber,
            user_email: formData.email
          }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxMDE0NjA5NiwianRpIjoiNmM0YWMxNTMtNDE2MS00YzliLWI4N2EtZWIxYjhmNDRiOTU5IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnVzZXJuYW1lXzJ5MTV1OWk0MW10bjR3eWpsaTh6b2p6eXZiZEBzdXJlcGFzcy5pbyIsIm5iZiI6MTcxMDE0NjA5NiwiZXhwIjoyMzQwODY2MDk2LCJ1c2VyX2NsYWltcyI6eyJzY29wZXMiOlsidXNlciJdfX0.DfipEQt4RqFBQbOK29jbQju3slpn0wF9aoccdmtIsPg'
          }
        }
      );
      
      if (initResponse.data && initResponse.data.data) {
        const { client_id, url, token } = initResponse.data.data;
        setClientId(client_id);
        setRedirectUrl(url);
        
        // Step 2: Upload PDF with client_id
        await uploadPdfToEsign(client_id, fileUrl);
        
        setSuccess(true);
      } else {
        throw new Error('Failed to initialize e-signing');
      }
    } catch (err) {
      console.error('Error in e-signing process:', err);
      setError(err.message || 'Failed to process e-signing request. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Upload PDF to e-signing service
  const uploadPdfToEsign = async (clientId, fileLink) => {
    try {
      const response = await axios.post(
        'https://kyc-api.surepass.io/api/v1/esign/upload-pdf',
        {
          client_id: clientId,
          link: fileLink
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxMDE0NjA5NiwianRpIjoiNmM0YWMxNTMtNDE2MS00YzliLWI4N2EtZWIxYjhmNDRiOTU5IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnVzZXJuYW1lXzJ5MTV1OWk0MW10bjR3eWpsaTh6b2p6eXZiZEBzdXJlcGFzcy5pbyIsIm5iZiI6MTcxMDE0NjA5NiwiZXhwIjoyMzQwODY2MDk2LCJ1c2VyX2NsYWltcyI6eyJzY29wZXMiOlsidXNlciJdfX0.DfipEQt4RqFBQbOK29jbQju3slpn0wF9aoccdmtIsPg'
          }
        }
      );
      
      if (!response.data || !response.data.success) {
        throw new Error('Failed to upload PDF to e-signing service');
      }
      
      return response.data;
    } catch (err) {
      console.error('Error uploading PDF to e-signing service:', err);
      throw new Error('Failed to upload PDF to e-signing service. Please try again.');
    }
  };
  
  return (
    <div style={esignStyles.container}>
      <h1 style={esignStyles.header}>Document E-Signing</h1>
      
      {/* Step 1: File Upload Section */}
      <div style={esignStyles.section}>
        <h2 style={esignStyles.sectionTitle}>Step 1: Upload Document for E-Signing</h2>
        
        <label 
          htmlFor="file-upload" 
          style={{
            ...esignStyles.fileUpload,
            ...(file ? esignStyles.fileUploadActive : {})
          }}
        >
          <div style={esignStyles.uploadIcon}>📄</div>
          <p style={esignStyles.uploadText}>
            {uploadLoading ? 'Uploading...' : 'Click or drag to upload a PDF document'}
          </p>
          <input
            id="file-upload"
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            style={esignStyles.fileInput}
            disabled={uploadLoading}
          />
        </label>
        
        {uploadError && (
          <div style={esignStyles.errorMessage}>{uploadError}</div>
        )}
        
        {file && fileUrl && (
          <div style={esignStyles.fileInfo}>
            <p style={esignStyles.fileName}>File: {file.name}</p>
            <p style={esignStyles.filePages}>Pages: {pageCount}</p>
            {uploadSuccess && (
              <p style={esignStyles.successMessage}>File uploaded successfully!</p>
            )}
          </div>
        )}
      </div>
      
      {/* Step 2: User Details Form */}
      <div style={esignStyles.section}>
        <h2 style={esignStyles.sectionTitle}>Step 2: Enter Your Details</h2>
        
        <form style={esignStyles.form} onSubmit={initializeEsign}>
          <div style={esignStyles.formGroup}>
            <label style={esignStyles.label} htmlFor="fullName">Full Name</label>
            <input
              style={esignStyles.input}
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              placeholder="Enter your full name"
            />
          </div>
          
          <div style={esignStyles.formGroup}>
            <label style={esignStyles.label} htmlFor="mobileNumber">Mobile Number</label>
            <input
              style={esignStyles.input}
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              required
              placeholder="Enter your mobile number"
              pattern="[0-9]{10}"
              title="Please enter a valid 10-digit mobile number"
            />
          </div>
          
          <div style={esignStyles.formGroup}>
            <label style={esignStyles.label} htmlFor="email">Email Address</label>
            <input
              style={esignStyles.input}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email address"
            />
          </div>
          
          {error && <div style={esignStyles.errorMessage}>{error}</div>}
          
          <button 
            type="submit" 
            style={{
              ...esignStyles.button,
              ...(loading || !fileUrl ? esignStyles.buttonDisabled : {})
            }}
            disabled={loading || !fileUrl}
          >
            {loading ? (
              <>
                <span style={esignStyles.loader}></span>
                Processing...
              </>
            ) : 'Proceed to E-Signing'}
          </button>
        </form>
      </div>
      
      {/* Step 3: Redirect Information */}
      {success && redirectUrl && (
        <div style={esignStyles.section}>
          <h2 style={esignStyles.sectionTitle}>Step 3: Complete E-Signing</h2>
          
          <div style={esignStyles.redirectInfo}>
            <p>Your document has been uploaded successfully and is ready for e-signing.</p>
            <p>Click the button below to proceed to the e-signing platform:</p>
            
            <a 
              href={redirectUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                ...esignStyles.button,
                display: 'inline-block',
                marginTop: '15px',
                textDecoration: 'none'
              }}
            >
              Go to E-Signing Platform
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Esign2;