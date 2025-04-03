import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ReraHowItWorks from './ReraHowItWorks';
import ReraFAQ from './ReraFAQ';
import ReraTestimonials from './ReraTestimonials';
import ReraAbout from './ReraAbout';
import ReraBenefits from './ReraBenefits';
import { QRCodeSVG } from "qrcode.react";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import './ReraVerificationForm.css';

// PDF styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center'
  },
  header: {
    fontSize: 18,
    marginBottom: 10
  },
  field: {
    marginBottom: 5,
    fontSize: 12
  },
  label: {
    fontWeight: 'bold'
  }
});

// PDF Document component
const ReraDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>RERA Verification Details</Text>
        <Text style={styles.header}>Project Details</Text>
        {Object.entries(data).map(([key, value]) => {
          if (value && typeof value !== 'object') {
            return (
              <Text style={styles.field} key={key}>
                <Text style={styles.label}>{key.replace(/_/g, ' ').toUpperCase()}: </Text>
                {value}
              </Text>
            );
          }
          return null;
        })}
      </View>
    </Page>
  </Document>
);

const ReraVerificationForm = () => {
  const [formData, setFormData] = useState({
    registration_number: "",
    registration_type: "",
    state_name: ""
  });
  const [verificationResult, setVerificationResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const states = [
    "uttar_pradesh",
    "kerala",
    "assam",
    "west_bengal",
    "madhya_pradesh",
    "bihar",
    "chhattisgarh",
    "delhi",
    "karnataka",
    "uttarakhand"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setVerificationResult(null);
    setLoading(true);

    const payload = {
      registration_number: formData.registration_number,
      registration_type: formData.registration_type,
      state_name: formData.state_name
    };

    console.log("Form data:", formData);
    console.log("Request Body:", JSON.stringify(payload, null, 2));
    try {
      const response = await fetch("https://kyc-api.surepass.io/api/v1/rera/rera-v2", {
        method: "POST",
        headers: {
          "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxMDE0NjA5NiwianRpIjoiNmM0YWMxNTMtNDE2MS00YzliLWI4N2EtZWIxYjhmNDRiOTU5IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnVzZXJuYW1lXzJ5MTV1OWk0MW10bjR3eWpsaTh6b2p6eXZiZEBzdXJlcGFzcy5pbyIsIm5iZiI6MTcxMDE0NjA5NiwiZXhwIjoyMzQwODY2MDk2LCJ1c2VyX2NsYWltcyI6eyJzY29wZXMiOlsidXNlciJdfX0.DfipEQt4RqFBQbOK29jbQju3slpn0wF9aoccdmtIsPg",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      console.log("Verification response:", data);
      
      if (response.status === 422) {
        console.error("Validation error:", data);
        setError("Verification failed: " + (data.message || "Invalid data"));
      } else if (data.success && data.data) {
        setVerificationResult(data);
      } else {
        setError("Verification failed");
      }
    } catch (err) {
      console.error("Error during verification:", err);
      setError("Verification failed");
    } finally {
      setLoading(false);
    }
  };

  // Function to get non-null fields
  const getNonNullFields = (detail) => {
    return Object.entries(detail).reduce((acc, [key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        acc[key] = value;
      }
      return acc;
    }, {});
  };

  // Function to format field name
  const formatFieldName = (fieldName) => {
    return fieldName
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Function to prepare QR code data
  const prepareQRData = (data) => {
    try {
      const sanitizedData = Object.entries(data).reduce((acc, [key, value]) => {
        if (value && typeof value !== 'object' && value !== '') {
          acc[key] = value;
        }
        return acc;
      }, {});
      
      return JSON.stringify(sanitizedData);
    } catch (error) {
      console.error('Error preparing QR data:', error);
      return '';
    }
  };

  return (
    <div className="rera-verification-container">
      <div className="rera-banner-head">
        <h1>RERA Verification</h1>
        <p>Verify your property's RERA registration status</p>
      </div>

      <form onSubmit={handleSubmit} className="rera-search-box">
        <div className="rera-form-group">
          <label>RERA Registration Number *</label>
          <input
            type="text"
            name="registration_number"
            value={formData.registration_number}
            onChange={handleChange}
            placeholder="Enter RERA Registration Number"
            required
          />
        </div>

        <div className="rera-form-group">
          <label>Registration Type *</label>
          <select
            name="registration_type"
            value={formData.registration_type}
            onChange={handleChange}
            required
          >
            <option value="">Select Registration Type</option>
            <option value="project">Project</option>
            <option value="agent">Agent</option>
          </select>
        </div>

        <div className="rera-form-group">
          <label>State Name *</label>
          <select
            name="state_name"
            value={formData.state_name}
            onChange={handleChange}
            required
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state.replace("_", " ").toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="rera-form-group">
        <button type="submit" className="rera-submit-btn" disabled={loading}>
          {loading ? "Verifying..." : "Verify RERA Details"}
        </button>
        </div>
      </form>

      {error && <p className="rera-error">{error}</p>}
      {verificationResult && (
        <div className="rera-result">
          <h3>Verification Result</h3>
          {verificationResult.data && verificationResult.data.details && verificationResult.data.details.map((detail, index) => {
            const nonNullFields = getNonNullFields(detail);
            const allData = {
              ...getNonNullFields(verificationResult.data),
              ...nonNullFields
            };
            
            const qrData = prepareQRData(allData);
            
            return (
              <div key={index} className="rera-detail-card">
                <div className="rera-detail-header">
                  <h4>Project Details</h4>
                  <span className="rera-registration-number">
                    Registration No: {verificationResult.data.registration_number}
                  </span>
                </div>

                <div className="rera-detail-grid">
                  {Object.entries(nonNullFields).map(([key, value]) => {
                    if (!value || typeof value === 'object' || value.toString().trim() === '') {
                      return null;
                    }
                    
                    const displayValue = typeof value === 'boolean' 
                      ? value.toString() 
                      : value;

                    return (
                      <div key={key} className="rera-detail-item">
                        <label>{formatFieldName(key)}</label>
                        <p title={displayValue}>
                          {displayValue.length > 100 
                            ? `${displayValue.substring(0, 100)}...` 
                            : displayValue}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="rera-actions-section">
                  <div className="rera-qr-code">
                    {qrData && (
                      <QRCodeSVG 
                        value={qrData}
                        size={128}
                        level="H"
                        bgColor="#FFFFFF"
                        fgColor="#000000"
                        marginSize={2}
                        title="RERA Verification Details"
                      />
                    )}
                  </div>

                  <div className="rera-buttons">
                    {detail.certificate_url && (
                      <a 
                        href={detail.certificate_url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="rera-action-button"
                      >
                        View Certificate
                      </a>
                    )}
                    
                    <PDFDownloadLink
                      document={<ReraDocument data={allData} />}
                      fileName="rera-verification.pdf"
                      className="rera-action-button"
                    >
                      {({ blob, url, loading, error }) =>
                        loading ? 'Generating PDF...' : 'Download PDF'
                      }
                    </PDFDownloadLink>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ReraHowItWorks />
      <ReraBenefits />
      <ReraAbout />
      <ReraFAQ />
      <ReraTestimonials />
    </div>
  );
};

export default ReraVerificationForm; 