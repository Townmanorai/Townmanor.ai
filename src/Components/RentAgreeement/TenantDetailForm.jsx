import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight, FaUpload, FaInfoCircle } from "react-icons/fa";
import "./TenantDetailForm.css";

const TenantDetailForm = ({ formData, onFormDataChange, onNext, onPrev }) => {
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
        onFormDataChange({
          tenantIdentityNumber: data.fileUrls[0]
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

  return (
    <div className="tenant-detail-unique-container">
      <form className="tenant-detail-unique-form" onSubmit={handleSubmit}>
        <h2 className="tenant-detail-unique-title">Tenant Detail</h2>
        <label className="tenant-detail-unique-label">Full Name <span>*</span></label>
        <input
          type="text"
          name="tenantName"
          className="tenant-detail-unique-input"
          placeholder="Enter your full name"
          value={formData.tenantName}
          onChange={handleChange}
          required
        />

        <label className="tenant-detail-unique-label">Age <span>*</span></label>
        <input
          type="number"
          name="tenantAge"
          className="tenant-detail-unique-input"
          placeholder="Enter your age (18-100)"
          value={formData.tenantAge}
          onChange={handleChange}
          required
          min="18"
          max="100"
        />

        <label className="tenant-detail-unique-label">Gender <span>*</span></label>
        <div className="tenant-detail-unique-radio-group">
          <label className="tenant-detail-unique-radio-label">
            <input 
              type="radio" 
              name="tenantGender" 
              value="male"
              checked={formData.tenantGender === 'male'}
              onChange={handleChange}
              required
            /> 
            Male
          </label>
          <label className="tenant-detail-unique-radio-label">
            <input 
              type="radio" 
              name="tenantGender" 
              value="female"
              checked={formData.tenantGender === 'female'}
              onChange={handleChange}
            /> 
            Female
          </label>
          <label className="tenant-detail-unique-radio-label">
            <input 
              type="radio" 
              name="tenantGender" 
              value="other"
              checked={formData.tenantGender === 'other'}
              onChange={handleChange}
            /> 
            Other
          </label>
        </div>

        <label className="tenant-detail-unique-label">Phone Number <span>*</span></label>
        <div className="tenant-detail-unique-phone-row">
          <span className="tenant-detail-unique-phone-code">+91</span>
          <input
            type="text"
            name="tenantPhone"
            className="tenant-detail-unique-input tenant-detail-unique-phone-input"
            placeholder="Enter 10-digit phone number"
            maxLength={10}
            value={formData.tenantPhone}
            onChange={handleChange}
            required
          />
        </div>

        <label className="tenant-detail-unique-label">Address </label>
        <textarea
          name="tenantAddress"
          className="tenant-detail-unique-input tenant-detail-unique-textarea"
          placeholder="Enter your complete address"
          rows={3}
          value={formData.tenantAddress}
          onChange={handleChange}
         
        />

        <label className="tenant-detail-unique-label">Identity Proof PAN Card <span>*</span></label>
        <div className="tenant-detail-unique-file-upload">
          <input
            type="file"
            id="tenantIdentityProofFile"
            name="tenantIdentityProofFile"
            accept="image/*"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
            required={!formData.tenantIdentityNumber}
          />
          <label 
            htmlFor="tenantIdentityProofFile" 
            className="tenant-detail-unique-input tenant-detail-unique-file-label"
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
          {uploading && <span className="tenant-detail-unique-id-desc">Uploading...</span>}
          {formData.tenantIdentityNumber && !uploading && (
            <div className="tenant-detail-unique-preview">
              <span className="tenant-detail-unique-id-desc">Image uploaded successfully!</span>
              <a 
                href={formData.tenantIdentityNumber} 
                target="_blank" 
                rel="noopener noreferrer"
                className="tenant-detail-unique-preview-link"
              >
                View uploaded image
              </a>
            </div>
          )}
          <div className="tenant-detail-unique-id-desc-container" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span className="tenant-detail-unique-id-desc">Upload a clear image of your PAN Card</span>
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

        <label className="tenant-detail-unique-label">Email ID <span>*</span></label>
        <input
          type="email"
          name="tenantEmail"
          className="tenant-detail-unique-input"
          placeholder="Enter your email address"
          value={formData.tenantEmail}
          onChange={handleChange}
          required
        />

        <div className="tenant-detail-unique-btn-row">
          <button 
            type="button" 
            className="tenant-detail-unique-prev-btn"
            onClick={onPrev}
          >
            <FaArrowLeft style={{marginRight: 6}} /> Previous
          </button>
          <button type="submit" className="tenant-detail-unique-next-btn">
            Next <FaArrowRight style={{marginLeft: 6}} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default TenantDetailForm;
