import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUpForm.css';
import { SearchResultsList } from '../SearchBar/SearchResultsList';

const SignUpForm = () => {
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
  });

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
    handleInputChange(e); // Ensure the formData state is updated as well
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('username', formData.username);
    formDataObj.append('email', formData.email);
    formDataObj.append('password', formData.password);
    formDataObj.append('reraRegister', formData.reraRegister);
    if (reraRegister === 'yes') {
      formDataObj.append('reraRegnNo', formData.reraRegnNo);
      formDataObj.append('aadhaarNo', formData.aadhaarNo);
      formDataObj.append('panNo', formData.panNo);
    }
    formDataObj.append('city', formData.city);
    formDataObj.append('sector', formData.sector);
    formDataObj.append('phone', formData.phone);
    formDataObj.append('file', file);

    try {
      const response = await fetch('http://localhost:3030/addagent', {
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
        alert('User added successfully.');
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
          <h2>Townmanor</h2>
          <p>Redefining Home Buying Experience</p>
        </div>
        <div className="card-body">
          <ul className="nav nav-tabs mb-3" role="tablist">
            <li className="nav-item">
              <a className="nav-link " data-toggle="tab" href="#property-owner" role="tab">Property Owner</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" data-toggle="tab" href="#agent" role="tab">Agent</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-toggle="tab" href="#builder-developer" role="tab">Builder/Developer</a>
            </li>
          </ul>

          <div className="tab-content">
            <div className="tab-pane fade show active" id="property-owner" role="tabpanel">
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
                  <input type="password" className="form-control" name="password" placeholder="Password *" value={formData.password} onChange={handleInputChange} required autoComplete="new-password" />
                </div>
                <div className="form-group position-relative">
                  <input type="password" className="form-control" name="confirmPassword" placeholder="Confirm password *" value={formData.confirmPassword} onChange={handleInputChange} required autoComplete="new-password" />
                </div>
                <div className="form-group">
                  <label>Rera Register</label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="reraRegister" id="reraYes" value="yes" onChange={handleReraChange} required />
                      <label className="form-check-label" htmlFor="reraYes">Yes</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="reraRegister" id="reraNo" value="no" onChange={handleReraChange} required />
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
                  <label>Enter code from image</label>
                  <input type="text" className="form-control" placeholder="64fbc" required />
                </div>
                <div className="form-group">
                  <label>Type to search...</label>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Create Account</button>
                <p className="mt-3 text-center">Already have an account? <a href="#login">Login</a></p>
              </form>
            </div>
            {/* Additional tabs content can go here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
