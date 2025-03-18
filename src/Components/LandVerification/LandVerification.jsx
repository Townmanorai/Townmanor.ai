import React, { useState, useEffect } from 'react';
import { FaSearch, FaMapMarkerAlt, FaFileAlt } from 'react-icons/fa';
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
          'Authorization': `Bearer ${BEARER_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setDistricts(data.districts || []);
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
          'Authorization': `Bearer ${BEARER_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ district })
      });
      const data = await response.json();
      setTalukas(data.taluka_list || []);
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
          'Authorization': `Bearer ${BEARER_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ district, taluka })
      });
      const data = await response.json();
      setVillages(data.village_list || []);
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
          'Authorization': `Bearer ${BEARER_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ district, taluka, village })
      });
      const data = await response.json();
      setBlocks(data.block_list || []);
    } catch (err) {
      setError('Failed to fetch blocks');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Fetch dependent data
    switch (name) {
      case 'district':
        fetchTalukas(value);
        setFormData(prev => ({
          ...prev,
          taluka: '',
          village: '',
          block: ''
        }));
        break;
      case 'taluka':
        fetchVillages(formData.district, value);
        setFormData(prev => ({
          ...prev,
          village: '',
          block: ''
        }));
        break;
      case 'village':
        fetchBlocks(formData.district, formData.taluka, value);
        setFormData(prev => ({
          ...prev,
          block: ''
        }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/${formData.state}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      setVerificationResult(data);
    } catch (err) {
      setError('Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="land-verification-container">
      <div className="land-verification-header">
        <h1>Land Record Verification</h1>
        <p>Verify land records and property ownership details across India</p>
      </div>

      <div className="land-verification-content">
        <form onSubmit={handleSubmit} className="land-verification-form">
          <div className="form-grid">
            <div className="townmanor-form-group">
              <label>State*</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              >
                <option value="gujarat">Gujarat</option>
                <option value="madhya-pradesh">Madhya Pradesh</option>
              </select>
            </div>

            <div className="townmanor-form-group">
              <label>District*</label>
              <select
                name="district"
                value={formData.district}
                onChange={handleChange}
                required
              >
                <option value="">Select District</option>
                {districts.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>

            <div className="townmanor-form-group">
              <label>Taluka*</label>
              <select
                name="taluka"
                value={formData.taluka}
                onChange={handleChange}
                required
              >
                <option value="">Select Taluka</option>
                {talukas.map(taluka => (
                  <option key={taluka} value={taluka}>{taluka}</option>
                ))}
              </select>
            </div>

            <div className="townmanor-form-group">
              <label>Village*</label>
              <select
                name="village"
                value={formData.village}
                onChange={handleChange}
                required
              >
                <option value="">Select Village</option>
                {villages.map(village => (
                  <option key={village} value={village}>{village}</option>
                ))}
              </select>
            </div>

            <div className="townmanor-form-group">
              <label>Block Number*</label>
              <select
                name="block"
                value={formData.block}
                onChange={handleChange}
                required
              >
                <option value="">Select Block</option>
                {blocks.map(block => (
                  <option key={block} value={block}>{block}</option>
                ))}
              </select>
            </div>

            <div className="townmanor-form-group">
              <label>Owner Name*</label>
              <input
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                placeholder="Enter owner name"
                required
              />
            </div>
          </div>

          <button type="submit" className="verify-button" disabled={loading}>
            <FaSearch /> {loading ? 'Verifying...' : 'Verify Land Records'}
          </button>
        </form>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {verificationResult && (
          <div className="verification-result">
            <h2>Verification Results</h2>
            <div className="result-grid">
              <div className="result-card">
                <FaFileAlt className="card-icon" />
                <h3>Land Details</h3>
                <div className="details-grid">
                  <div>
                    <label>Owner Name:</label>
                    <p>{verificationResult.owner_name}</p>
                  </div>
                  <div>
                    <label>Khata Number:</label>
                    <p>{verificationResult.khata_number}</p>
                  </div>
                  <div>
                    <label>Total Area:</label>
                    <p>{verificationResult.total_area}</p>
                  </div>
                  <div>
                    <label>Assessment Amount:</label>
                    <p>{verificationResult.assessment_amount}</p>
                  </div>
                </div>
              </div>

              <div className="result-card">
                <FaMapMarkerAlt className="card-icon" />
                <h3>Location Details</h3>
                <div className="details-grid">
                  <div>
                    <label>District:</label>
                    <p>{verificationResult.district}</p>
                  </div>
                  <div>
                    <label>Taluka:</label>
                    <p>{verificationResult.taluka}</p>
                  </div>
                  <div>
                    <label>Village:</label>
                    <p>{verificationResult.village}</p>
                  </div>
                  <div>
                    <label>Block:</label>
                    <p>{verificationResult.block_code}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandVerification;
