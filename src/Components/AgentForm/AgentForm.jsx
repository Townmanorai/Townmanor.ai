import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SearchResultsList } from '../SearchBar/SearchResultsList';
import { useNavigate } from 'react-router-dom';
import "./AgentForm.css";

function AgentForm() {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedLocality, setSelectedLocality] = useState('');
  const [showLocality, setShowLocality] = useState(false);
  const [cityResults, setCityResults] = useState([]);
  const [localityResults, setLocalityResults] = useState([]);
  const [formData, setFormData] = useState({
    city: '',
    locality: '',
    propertyType: ''
  });
  const cities = ["Noida", "Delhi", "Gurugram", "Faridabad", "Dubai"];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const fetchCity = (value) => {
    fetch("hthttps://www.townmanor.ai/api/location")
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
    fetch(`https://www.townmanor.ai/api/localities?city=${city}`)
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
    setFormData({ ...formData, locality: localityInput });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams({
      city: formData.city,
      locality: formData.sector,
      rent: formData.propertyType === 'rent' ? 1 : 0,
      newProperty: formData.propertyType === 'newProperty' ? 1 : 0,
      resale: formData.propertyType === 'resale' ? 1 : 0
    }).toString();
    navigate(`/agentlist?${queryParams}`);
  };

  return (
    <>
      <h2 className="text-center mt-4 fw-bold" style={{ fontSize: '1.75rem' }}>
        <i className="fa-solid fa-people-roof" ></i> Find An Agent
      </h2>      <div className="container d-flex justify-content-center flex-wrap align-items-center" style={{ maxWidth: "1200px" }}>
        <div className="col-md-6 p-3">
          <img src="/agent-logo.avif" alt="key" className="img-fluid rounded-2xl" />
        </div>
        <div className="col-md-6 p-3">
          <div className="">
            <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
              {/* <div className="form-group">
                <label htmlFor="city" className='head'>City</label>
                <input type="text" className="form-control" placeholder="Search city" value={selectedCity} onChange={handleCityChange} />
                <SearchResultsList results={cityResults} setSelectedCity={setSelectedCity} setFormData={setFormData} formData={formData} fetchLocalities={fetchLocalities} clearCityResults={() => setCityResults([])} />
              </div> */}
               <div className="form-group">
                <label htmlFor="city" className='head'>City</label>
                <select
                  className="form-control"
                  value={selectedCity}
                  onChange={handleCityChange}
                  name="city"
                >
                  <option value="">Choose City...</option>
                  {cities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              {showLocality && (
                <div className="form-group">
                  <label htmlFor="locality">Locality *</label>
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
              <div className="form-group mb-4">
                <label className="form-label">Property Type:</label>
                <div className="form-check">
                  <input
                    type="radio"
                    style={{ transform: 'scale(1.5)', color:'Red' }} 
                    name="propertyType"
                    value="rent"
                    checked={formData.propertyType === 'rent'}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="rent">Rent</label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    style={{ transform: 'scale(1.5)', color:'Red' }}
                    name="propertyType"
                    value="newProperty"
                    checked={formData.propertyType === 'newProperty'}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="newProperty">New Property</label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    style={{ transform: 'scale(1.5)', color:'Red' }}
                    name="propertyType"
                    value="resale"
                    checked={formData.propertyType === 'resale'}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="resale">Resale</label>
                </div>
              </div>
              <button type="submit" className="btn btn-primary w-100">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AgentForm;
