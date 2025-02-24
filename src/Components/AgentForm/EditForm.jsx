import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUpForm.css';
import { SearchResultsList } from '../SearchBar/SearchResultsList';

const EditForm = ({ agentId }) => {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedLocality, setSelectedLocality] = useState('');
  const [showLocality, setShowLocality] = useState(false);
  const [file, setFile] = useState();
  const [cityResults, setCityResults] = useState([]);
  const [localityResults, setLocalityResults] = useState([]);
  const [reraRegister, setReraRegister] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    reraRegnNo: '',
    aadhaarNo: '',
    panNo: '',
    city: '',
    sector: '',
    phone: '',
    numberOfEmployees: '',
    about:''
  });

  useEffect(() => {
    // Fetch the agent data based on agentId
    fetch(`http://localhost:3030/agents/32`)
      .then((response) => response.json())
      .then((data) => {
        setFormData(data);
        setSelectedCity(data.city);
        setSelectedLocality(data.sector);
        setReraRegister(data.reraRegister);
        setShowLocality(data.city !== '');
      })
      .catch((error) => console.error('Error fetching agent data:', error));
  }, [agentId]);

  const fetchCity = (value) => {
    fetch("http://localhost:3030/location")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((user) => {
          return (
            value &&
            user &&
            user.city &&
            user.city.toLowerCase().includes(value.toLowerCase())
          );
        });

        setCityResults(results);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const fetchLocalities = (city, localityInput) => {
    fetch(`http://localhost:3030/localities?city=${city}`)
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((locality) => {
          return (
            localityInput &&
            locality &&
            locality.name &&
            locality.name.toLowerCase().includes(localityInput.toLowerCase())
          );
        });

        setLocalityResults(results);
      })
      .catch((error) => {
        console.error('Error fetching localities:', error);
      });
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    fetchCity(city);
    fetchLocalities(city, '');
    setShowLocality(city !== '');
    setFormData({ ...formData, city });
  };

  const handleLocalityChange = (e) => {
    const localityInput = e.target.value;
    setSelectedLocality(localityInput);
    fetchLocalities(selectedCity, localityInput);
    setFormData({ ...formData, sector: localityInput });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleReraChange = (e) => {
    const value = e.target.value;
    setReraRegister(value);
    handleInputChange(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('username', formData.username);
    formDataObj.append('email', formData.email);
    if (formData.password) {
      formDataObj.append('password', formData.password);
    }
    formDataObj.append('reraRegister', formData.reraRegister);
    if (reraRegister === 'yes') {
      formDataObj.append('reraRegnNo', formData.reraRegnNo);
      formDataObj.append('aadhaarNo', formData.aadhaarNo);
      formDataObj.append('panNo', formData.panNo);
    }
    formDataObj.append('city', formData.city);
    formDataObj.append('sector', formData.sector);
    formDataObj.append('phone', formData.phone);
    formDataObj.append('numberOfEmployees', formData.numberOfEmployees);
    formDataObj.append('nativePlace', formData.nativePlace);
    formDataObj.append('nativePlace', formData.about);
    if (file) {
      formDataObj.append('file', file);
    } 

    try {
      const response = await fetch(`http://localhost:3030/updateagent/${agentId}`, {
        method: 'POST',
        body: formDataObj
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      if (data && data.message) {
        alert(data.message);
      } else {
        alert('Agent updated successfully.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header text-center">
          <h2>Edit Agent</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Upload File</label>
              <input className="form-control form-control-lg agent-image" type="file" onChange={(e) => setFile(e.target.files[0])} />
            </div>
            <div className="form-group">
              <input type="text" className="form-control" name="name" placeholder="Name *" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <input type="text" className="form-control" name="username" placeholder="Username *" value={formData.username} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <input type="email" className="form-control" name="email" placeholder="Email *" value={formData.email} onChange={handleInputChange} required />
            </div>
            <div className="form-group position-relative">
              <input type="password" className="form-control" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} autoComplete="new-password" />
            </div>
            <div className="form-group position-relative">
              <input type="password" className="form-control" name="confirmPassword" placeholder="Confirm password" value={formData.confirmPassword} onChange={handleInputChange} autoComplete="new-password" />
            </div>
            <div className="form-group">
              <label>Rera Register</label>
              <div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="reraRegister" id="reraYes" value="yes" checked={reraRegister === 'yes'} onChange={handleReraChange} required />
                  <label className="form-check-label" htmlFor="reraYes">Yes</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="reraRegister" id="reraNo" value="no" checked={reraRegister === 'no'} onChange={handleReraChange} required />
                  <label className="form-check-label" htmlFor="reraNo">No</label>
                </div>
              </div>
            </div>
            {reraRegister === 'yes' && (
              <div>
                <div className="form-group">
                  <input type="text" className="form-control" name="reraRegnNo" placeholder="Rera Regn No *" value={formData.reraRegnNo} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" name="aadhaarNo" placeholder="Aadhaar No *" value={formData.aadhaarNo} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" name="panNo" placeholder="Pan No *" value={formData.panNo} onChange={handleInputChange} required />
                </div>
              </div>
            )}
            <label>Address</label>
            <div className="form-group d-flex">
              <div className="flex-fill">
                <label htmlFor="city">City *</label>
                <input type="text" className="form-control" placeholder="Search city" value={selectedCity} onChange={handleCityChange} />
                <SearchResultsList results={cityResults} setSelectedCity={setSelectedCity} setFormData={setFormData} formData={formData} fetchLocalities={fetchLocalities} clearCityResults={() => setCityResults([])} />
              </div>
              {showLocality && (
                <div className="flex-fill ml-3">
                  <label htmlFor="sector">Locality *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search locality"
                    value={selectedLocality}
                    onChange={handleLocalityChange}
                  />
                  <SearchResultsList results={localityResults} setSelectedLocality={setSelectedLocality} setFormData={setFormData} formData={formData} clearLocalityResults={() => setLocalityResults([])} />
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Phone No.</label>
              <input type="tel" className="form-control" name="phone" placeholder="Phone *" value={formData.phone} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Number of Employees</label>
              <input type="text" className="form-control" name="numberOfEmployees" placeholder="Number of Employees" value={formData.numberOfEmployees} onChange={handleInputChange} required />
            </div>
            {/* <div className="form-group">
              <label>Native Place</label>
              <input type="text" className="form-control" name="nativePlace" placeholder="Native Place" value={formData.nativePlace} onChange={handleInputChange} required />
            </div> */}
            <div className="form-group">
              <label>Team Member Name</label>
              <input type="text" className="form-control" name="Team Member Name" placeholder="About" value={formData.about} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>About Your Self</label>
              <input type="text" className="form-control" name="nativePlace" placeholder="About" value={formData.about} onChange={handleInputChange} required />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Update Agent</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
