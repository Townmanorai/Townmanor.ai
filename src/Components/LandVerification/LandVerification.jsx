import React, { useState, useEffect } from 'react';
import { FaSearch, FaMapMarkerAlt, FaFileAlt, FaSpinner, FaCheckCircle, FaExclamationCircle, FaArrowRight, FaInfoCircle } from 'react-icons/fa';
import './landverification.css';

const BEARER_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxMDE0NjA5NiwianRpIjoiNmM0YWMxNTMtNDE2MS00YzliLWI4N2EtZWIxYjhmNDRiOTU5IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnVzZXJuYW1lXzJ5MTV1OWk0MW10bjR3eWpsaTh6b2p6eXZiZEBzdXJlcGFzcy5pbyIsIm5iZiI6MTcxMDE0NjA5NiwiZXhwIjoyMzQwODY2MDk2LCJ1c2VyX2NsYWltcyI6eyJzY29wZXMiOlsidXNlciJdfX0.DfipEQt4RqFBQbOK29jbQju3slpn0wF9aoccdmtIsPg";
const BASE_URL = 'https://kyc-api.surepass.io/api/v1/land-verification';

const LandVerification = () => {
  const [selectedState, setSelectedState] = useState('gujarat');
  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);
  const [villages, setVillages] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formStep, setFormStep] = useState(1);

  const [formData, setFormData] = useState({
    state: 'gujarat',
    district: '',
    taluka: '',
    village: '',
    block: '',
    ownerName: ''
  });

  useEffect(() => {
    fetchDistricts(formData.state);
  }, [formData.state]);

  const fetchDistricts = async (state) => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/${state}/meta/district-list`, {
        headers: {
          "Authorization": `Bearer ${BEARER_TOKEN}`,
          "Content-Type": "application/json"
        },
      });
      const data = await response.json();
      if (data.success && data.data) {
        setDistricts(data.data);
      } else {
        setError('Failed to fetch districts');
      }
    } catch (err) {
      setError('Failed to fetch districts');
    } finally {
      setLoading(false);
    }
  };

  const fetchTalukas = async (district) => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/${formData.state}/meta/taluka-list`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${BEARER_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ district })
      });
      const data = await response.json();
      if (data.success && data.data && data.data.taluka_list) {
        setTalukas(data.data.taluka_list);
      } else {
        setError('Failed to fetch talukas');
      }
    } catch (err) {
      setError('Failed to fetch talukas');
    } finally {
      setLoading(false);
    }
  };

  const fetchVillages = async (district, taluka) => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/${formData.state}/meta/village-list`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${BEARER_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ district, taluka })
      });
      const data = await response.json();
      if (data.success && data.data && data.data.village_list) {
        setVillages(data.data.village_list);
      } else {
        setError('Failed to fetch villages');
      }
    } catch (err) {
      setError('Failed to fetch villages');
    } finally {
      setLoading(false);
    }
  };

  const fetchBlocks = async (district, taluka, village) => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/${formData.state}/meta/block-list`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${BEARER_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ district, taluka, village })
      });
      const data = await response.json();
      if (data.success && data.data && data.data.block_list) {
        setBlocks(data.data.block_list);
      } else {
        setError('Failed to fetch blocks');
      }
    } catch (err) {
      setError('Failed to fetch blocks');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);

    // Fetch dependent data
    switch (name) {
      case 'district':
        fetchTalukas(value);
        setFormData(prev => ({
          ...prev,
          district: value,
          taluka: '',
          village: '',
          block: ''
        }));
        break;
      case 'taluka':
        fetchVillages(formData.district, value);
        setFormData(prev => ({
          ...prev,
          taluka: value,
          village: '',
          block: ''
        }));
        break;
      case 'village':
        fetchBlocks(formData.district, formData.taluka, value);
        setFormData(prev => ({
          ...prev,
          village: value,
          block: ''
        }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setFormSubmitted(true);
    
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/${formData.state}`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${BEARER_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          district: formData.district,
          taluka: formData.taluka,
          village: formData.village,
          block: formData.block,
          owner_name: formData.ownerName
        })
      });
      const data = await response.json();
      if (data.success && data.data) {
        setVerificationResult(data.data);
        setFormStep(2);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setError('Verification failed: ' + (data.message || 'Please check your inputs and try again.'));
      }
    } catch (err) {
      setError('Verification request failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      state: 'gujarat',
      district: '',
      taluka: '',
      village: '',
      block: '',
      ownerName: ''
    });
    setVerificationResult(null);
    setFormSubmitted(false);
    setFormStep(1);
    setError(null);
  };

  return (
    <div className="land-verification-container">
      <div className="land-verification-header">
        <h1>Land Record Verification</h1>
        <p>Verify land records and property ownership details across India with trusted government data</p>
      </div>

      <div className="land-verification-progress">
        <div className={`land-verification-progress-step ${formStep >= 1 ? 'active' : ''}`}>
          <div className="land-verification-step-number">1</div>
          <div className="land-verification-step-text">Enter Details</div>
        </div>
        <div className="land-verification-progress-connector"></div>
        <div className={`land-verification-progress-step ${formStep >= 2 ? 'active' : ''}`}>
          <div className="land-verification-step-number">2</div>
          <div className="land-verification-step-text">View Report</div>
        </div>
      </div>

      {formStep === 1 ? (
        <div className="land-verification-content">
          <div className="land-verification-form-card">
            <div className="land-verification-form-card-header">
              <FaMapMarkerAlt className="land-verification-form-card-icon" />
              <h2>Enter Land Details</h2>
            </div>
            
            {error && (
              <div className="land-verification-error-message">
                <FaExclamationCircle className="land-verification-error-icon" />
                <p>{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="land-verification-form">
              <div className="land-verification-form-grid">
                <div className="land-verification-form-group">
                  <label>State*</label>
                  <div className="land-verification-select-wrapper">
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className={`land-verification-form-control ${formSubmitted && !formData.state ? 'invalid' : ''}`}
                    >
                      <option value="gujarat">Gujarat</option>
                      <option value="madhya-pradesh">Madhya Pradesh</option>
                      {/* <option value="karnataka">Karnataka</option> */}
                    </select>
                  </div>
                </div>

                <div className="land-verification-form-group">
                  <label>District*</label>
                  <div className="land-verification-select-wrapper">
                    <select
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      required
                      className={`land-verification-form-control ${formSubmitted && !formData.district ? 'invalid' : ''}`}
                      disabled={districts.length === 0}
                    >
                      <option value="">Select District</option>
                      {districts.map(district => (
                        <option key={district} value={district}>{district}</option>
                      ))}
                    </select>
                  </div>
                  {districts.length === 0 && !loading && (
                    <small className="land-verification-form-hint">Loading districts...</small>
                  )}
                </div>

                <div className="land-verification-form-group">
                  <label>Taluka*</label>
                  <div className="land-verification-select-wrapper">
                    <select
                      name="taluka"
                      value={formData.taluka}
                      onChange={handleChange}
                      required
                      className={`land-verification-form-control ${formSubmitted && !formData.taluka ? 'invalid' : ''}`}
                      disabled={!formData.district || talukas.length === 0}
                    >
                      <option value="">Select Taluka</option>
                      {talukas.map(taluka => (
                        <option key={taluka} value={taluka}>{taluka}</option>
                      ))}
                    </select>
                  </div>
                  {formData.district && talukas.length === 0 && !loading && (
                    <small className="land-verification-form-hint">Select a district first</small>
                  )}
                </div>

                <div className="land-verification-form-group">
                  <label>Village*</label>
                  <div className="land-verification-select-wrapper">
                    <select
                      name="village"
                      value={formData.village}
                      onChange={handleChange}
                      required
                      className={`land-verification-form-control ${formSubmitted && !formData.village ? 'invalid' : ''}`}
                      disabled={!formData.taluka || villages.length === 0}
                    >
                      <option value="">Select Village</option>
                      {villages.map(village => (
                        <option key={village} value={village}>{village}</option>
                      ))}
                    </select>
                  </div>
                  {formData.taluka && villages.length === 0 && !loading && (
                    <small className="land-verification-form-hint">Select a taluka first</small>
                  )}
                </div>

                <div className="land-verification-form-group">
                  <label>Block Number*</label>
                  <div className="land-verification-select-wrapper">
                    <select
                      name="block"
                      value={formData.block}
                      onChange={handleChange}
                      required
                      className={`land-verification-form-control ${formSubmitted && !formData.block ? 'invalid' : ''}`}
                      disabled={!formData.village || blocks.length === 0}
                    >
                      <option value="">Select Block</option>
                      {blocks.map(block => (
                        <option key={block} value={block}>{block}</option>
                      ))}
                    </select>
                  </div>
                  {formData.village && blocks.length === 0 && !loading && (
                    <small className="land-verification-form-hint">Select a village first</small>
                  )}
                </div>

                <div className="land-verification-form-group">
                  <label>Owner Name*</label>
                  <input
                    type="text"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    placeholder="Enter owner name as in records"
                    required
                    className={`land-verification-form-control ${formSubmitted && !formData.ownerName ? 'invalid' : ''}`}
                  />
                  <small className="land-verification-form-hint">Enter name exactly as in official records</small>
                </div>
              </div>

              <div className="land-verification-form-info-box">
                <FaInfoCircle className="land-verification-info-icon" />
                <p>
                  Enter details exactly as they appear in your land documents for accurate verification. 
                  This service verifies records with official government databases.
                </p>
              </div>

              <button type="submit" className="land-verification-button" disabled={loading}>
                {loading ? (
                  <>
                    <FaSpinner className="land-verification-loading-spinner" /> Verifying...
                  </>
                ) : (
                  <>
                    <FaSearch /> Verify Land Records
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="land-verification-content">
          {verificationResult && (
            <div className="land-verification-result">
              <div className="land-verification-result-header">
                <h2>Verification Results</h2>
                <p>Land records verified successfully</p>
                <div className="land-verification-status">
                  <FaCheckCircle className="land-verification-success-icon" />
                  <span>Verified</span>
                </div>
              </div>
              
              <div className="land-verification-result-grid">
                <div className="land-verification-result-card">
                  <FaFileAlt className="land-verification-card-icon" />
                  <h3>Land Details</h3>
                  <div className="land-verification-details-grid">
                    {verificationResult.land_details && verificationResult.land_details.map((detail, index) => (
                      <div key={index} className="land-verification-detail-item">
                        <h4>Owner {index + 1}</h4>
                        <div className="land-verification-detail-row">
                          <label>Owner Name:</label>
                          <p>{detail.owner_name}</p>
                        </div>
                        <div className="land-verification-detail-row">
                          <label>Khata Number:</label>
                          <p>{detail.khata_number}</p>
                        </div>
                        <div className="land-verification-detail-row">
                          <label>Name Match Score:</label>
                          <p className={detail.name_match_score > 85 ? 'land-verification-match-high' : 'land-verification-match-low'}>
                            {detail.name_match_score}%
                          </p>
                        </div>
                      </div>
                    ))}
                    {verificationResult.total_summary && (
                      <div className="land-verification-summary-section">
                        <h4>Property Summary</h4>
                        <div className="land-verification-detail-row">
                          <label>Total Area:</label>
                          <p>{verificationResult.total_summary.total_area}</p>
                        </div>
                        <div className="land-verification-detail-row">
                          <label>Assessment Amount:</label>
                          <p>₹{verificationResult.total_summary.assessment_amount}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="land-verification-result-card">
                  <FaMapMarkerAlt className="land-verification-card-icon" />
                  <h3>Location Details</h3>
                  <div className="land-verification-details-grid">
                    <div className="land-verification-detail-row">
                      <label>State:</label>
                      <p>{formData.state.charAt(0).toUpperCase() + formData.state.slice(1).replace('-', ' ')}</p>
                    </div>
                    <div className="land-verification-detail-row">
                      <label>District:</label>
                      <p>{verificationResult.district}</p>
                    </div>
                    <div className="land-verification-detail-row">
                      <label>Taluka:</label>
                      <p>{verificationResult.taluka}</p>
                    </div>
                    <div className="land-verification-detail-row">
                      <label>Village:</label>
                      <p>{verificationResult.village}</p>
                    </div>
                    <div className="land-verification-detail-row">
                      <label>Block:</label>
                      <p>{verificationResult.block_code}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="land-verification-actions">
                <button onClick={resetForm} className="land-verification-action-button secondary">
                  Verify Another Property
                </button>
                <button className="land-verification-action-button primary">
                  Download Report <FaArrowRight className="land-verification-button-icon" />
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="land-verification-error-message">
              <FaExclamationCircle className="land-verification-error-icon" />
              <p>{error}</p>
              <button onClick={resetForm} className="land-verification-action-button secondary">
                Try Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LandVerification;
