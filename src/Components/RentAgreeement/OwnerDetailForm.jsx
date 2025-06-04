import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight, FaUpload, FaIdCard, FaInfoCircle } from "react-icons/fa";
import "./OwnerDetailForm.css";

const OwnerDetailForm = ({ formData, onFormDataChange, onNext, onPrev }) => {
  // Initialize tooltip functionality
  useEffect(() => {
    const infoIcons = document.querySelectorAll('.info-icon');
    
    infoIcons.forEach(icon => {
      icon.addEventListener('mouseenter', () => {
        const tooltip = icon.nextElementSibling;
        if (tooltip && tooltip.classList.contains('info-tooltip')) {
          tooltip.style.visibility = 'visible';
          tooltip.style.opacity = '1';
        }
      });
      
      icon.addEventListener('mouseleave', () => {
        const tooltip = icon.nextElementSibling;
        if (tooltip && tooltip.classList.contains('info-tooltip')) {
          tooltip.style.visibility = 'hidden';
          tooltip.style.opacity = '0';
        }
      });
    });
    
    return () => {
      infoIcons.forEach(icon => {
        icon.removeEventListener('mouseenter', () => {});
        icon.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [estampUploading, setEstampUploading] = useState(false);
  const [estampUploadedFile, setEstampUploadedFile] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    onFormDataChange({
      [name]: value
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadedFile(file);
    setUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('images', file);
      
      const response = await fetch('https://www.townmanor.ai/api/image/aws-upload-owner-images', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (data.fileUrls && data.fileUrls.length > 0) {
        // Store the image URL in landlordIdentityNumber to match PaymentVerification.jsx
        onFormDataChange({
          landlordIdentityNumber: data.fileUrls[0]
        });
        setUploading(false);
      } else {
        console.error('No file URLs returned from server');
        setUploading(false);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploading(false);
    }
  };

  const handleEstampPanUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setEstampUploadedFile(file);
    setEstampUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('images', file);
      
      const response = await fetch('https://www.townmanor.ai/api/image/aws-upload-estamp-pan', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (data.fileUrls && data.fileUrls.length > 0) {
        // Store the image URL in a new field for e-stamp PAN
        onFormDataChange({
          estampPanImage: data.fileUrls[0]
        });
        setEstampUploading(false);
      } else {
        console.error('No file URLs returned from server');
        setEstampUploading(false);
      }
    } catch (error) {
      console.error('Error uploading e-stamp PAN file:', error);
      setEstampUploading(false);
    }
  };

  return (
    <div className="owner-detail-unique-container">
      <div className="owner-detail-unique-form-wrapper">
        <h2 className="owner-detail-unique-title">Owner Detail</h2>
        <p className="owner-detail-unique-subtitle">
          Please fill in the details about the owner
        </p>
        <form className="owner-detail-unique-form" onSubmit={handleSubmit}>
          <label className="owner-detail-unique-label">Full Name <span>*</span></label>
          <input
            type="text"
            name="landlordName"
            className="owner-detail-unique-input"
            placeholder="Enter full name as per documents"
            value={formData.landlordName}
            onChange={handleChange}
            required
          />

          <label className="owner-detail-unique-label">Age <span>*</span></label>
          <input
            type="number"
            name="landlordAge"
            className="owner-detail-unique-input"
            placeholder="Enter age"
            value={formData.landlordAge}
            onChange={handleChange}
            required
          />

          <label className="owner-detail-unique-label">Gender <span>*</span></label>
          <div className="owner-detail-unique-radio-group">
            <label className="owner-detail-unique-radio-label">
              <input 
                type="radio" 
                name="landlordGender" 
                value="male"
                checked={formData.landlordGender === 'male'}
                onChange={handleChange}
                required
              /> 
              Male
            </label>
            <label className="owner-detail-unique-radio-label">
              <input 
                type="radio" 
                name="landlordGender" 
                value="female"
                checked={formData.landlordGender === 'female'}
                onChange={handleChange}
              /> 
              Female
            </label>
            <label className="owner-detail-unique-radio-label">
              <input 
                type="radio" 
                name="landlordGender" 
                value="other"
                checked={formData.landlordGender === 'other'}
                onChange={handleChange}
              /> 
              Other
            </label>
          </div>

          <label className="owner-detail-unique-label">Phone Number <span>*</span></label>
          <div className="owner-detail-unique-phone-row">
            <span className="owner-detail-unique-phone-code">+91</span>
            <input
              type="text"
              name="landlordPhone"
              className="owner-detail-unique-input owner-detail-unique-phone-input"
              placeholder="Enter mobile number"
              maxLength={10}
              value={formData.landlordPhone}
              onChange={handleChange}
              required
            />
          </div>

          <label className="owner-detail-unique-label">Email ID <span>*</span></label>
          <input
            type="email"
            name="landlordEmail"
            className="owner-detail-unique-input"
            placeholder="Enter email address"
            value={formData.landlordEmail}
            onChange={handleChange}
            required
          />

          <label className="owner-detail-unique-label">Address </label>
          <textarea
            name="landlordAddress"
            className="owner-detail-unique-input owner-detail-unique-textarea"
            placeholder="Enter complete address"
            rows={3}
            value={formData.landlordAddress}
            onChange={handleChange}
           
          />

          <label className="owner-detail-unique-label">Identity Proof (PAN Card) <span>*</span></label>
          <div className="owner-detail-unique-file-upload">
            <input
              type="file"
              id="identityProofFile"
              name="identityProofFile"
              accept="image/*"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              required={!formData.landlordIdentityNumber}
            />
            <label 
              htmlFor="identityProofFile" 
              className="owner-detail-unique-input owner-detail-unique-file-label"
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                cursor: 'pointer',
                justifyContent: 'space-between'
              }}
            >
              <span>{uploadedFile ? uploadedFile.name : 'Upload PAN Card Image'}</span>
              <FaUpload />
            </label>
            {uploading && <span className="owner-detail-unique-id-desc">Uploading...</span>}
            {formData.landlordIdentityNumber && !uploading && (
              <div className="owner-detail-unique-preview">
                <span className="owner-detail-unique-id-desc">Image uploaded successfully!</span>
                <a 
                  href={formData.landlordIdentityNumber} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="owner-detail-unique-preview-link"
                >
                  View uploaded image
                </a>
              </div>
            )}
            <div className="owner-detail-unique-id-desc-container" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span className="owner-detail-unique-id-desc">Upload a clear image of your PAN Card</span>
              <div className="info-tooltip-container" style={{ position: 'relative', display: 'inline-block' }}>
                <FaInfoCircle 
                  className="info-icon" 
                  style={{ color: '#4a90e2', cursor: 'pointer' }}
                  title="PAN Card is required for stamp paper purchase and verification"
                />
                <div className="info-tooltip" style={{ 
                  visibility: 'hidden', 
                  width: '200px',
                  background: '#555',
                  color: '#fff',
                  textAlign: 'center',
                  borderRadius: '6px',
                  padding: '5px',
                  position: 'absolute',
                  zIndex: '1',
                  bottom: '125%',
                  left: '50%',
                  marginLeft: '-100px',
                  opacity: '0',
                  transition: 'opacity 0.3s'
                }}>
                  PAN Card is required for stamp paper purchase and legal verification during the rent agreement process.
                </div>
              </div>
            </div>
          </div>

         

          <div className="owner-detail-unique-btn-row">
            <button 
              type="button" 
              className="owner-detail-unique-prev-btn"
              onClick={onPrev}
            >
              <FaArrowLeft style={{marginRight: 6}} /> Previous
            </button>
            <button type="submit" className="owner-detail-unique-next-btn">
              Next <FaArrowRight style={{marginLeft: 6}} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OwnerDetailForm;
