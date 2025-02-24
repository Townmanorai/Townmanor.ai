import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import './SearchBarComponent.css';

function SearchBarComponent() {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedLocality, setSelectedLocality] = useState('');
  const [formData, setFormData] = useState({
    city: '',
    locality: '',
    propertyType: ''
  });
  const [cityResults, setCityResults] = useState([]);
  const [localityResults, setLocalityResults] = useState([]);

  const cities = ["Noida", "Delhi", "Gurugram", "Faridabad", "Dubai"];

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
        console.error('Error fetching cities:', error);
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
    if (city) {
      fetchLocalities(city, selectedLocality);
    }
    setFormData({ ...formData, city });
  };

  const handleLocalityChange = (e) => {
    const localityInput = e.target.value;
    setSelectedLocality(localityInput);
    if (formData.city) {
      fetchLocalities(formData.city, localityInput);
    }
    setFormData({ ...formData, locality: localityInput });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams({
      city: formData.city,
      locality: formData.locality,
      rent: formData.propertyType === 'rent' ? 1 : 0,
      newProperty: formData.propertyType === 'newProperty' ? 1 : 0,
      resale: formData.propertyType === 'resale' ? 1 : 0
    }).toString();
    navigate(`/agentlist?${queryParams}`);
  };

  return (
    <div className='agent-searchbar'>
      <div className="search-bar-container container d-flex justify-content-center align-items-center">
        <img src="./agent-logo1.jpg" alt="sent-logo" className="agent-images"/>
        <form onSubmit={handleSubmit} className="form-inline d-flex w-100">
          <span className='search-bar-style d-flex'>
            {/* <div className="position-relative input-container">
              <input
                type="text"
                className="form-control mx-1"
                placeholder="Search city"
                value={selectedCity}
                onChange={handleCityChange}
                name="city"
                autoComplete="off"
              />
              {cityResults.length > 0 && (
                <div className="suggestions">
                  {cityResults.map((city, index) => (
                    <div
                      key={index}
                      className="suggestion-item"
                      onClick={() => {
                        setSelectedCity(city.city);
                        setFormData({ ...formData, city: city.city });
                        setCityResults([]);
                        fetchLocalities(city.city, selectedLocality);
                      }}
                    >
                      {city.city}
                    </div>
                  ))}
                </div>
              )}
            </div> */}
            <div className="position-relative input-container">
              <select
                className="form-control mx-1"
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
            {selectedCity && (
              <div className="position-relative input-container">
                <input
                  type="text"
                  className="form-control mx-1"
                  placeholder="Search locality"
                  value={selectedLocality}
                  onChange={handleLocalityChange}
                  name="locality"
                  autoComplete="off"
                />
                {localityResults.length > 0 && (
                  <div className="suggestions">
                    {localityResults.map((locality, index) => (
                      <div
                        key={index}
                        className="suggestion-item"
                        onClick={() => {
                          setSelectedLocality(locality.name);
                          setFormData({ ...formData, locality: locality.name });
                          setLocalityResults([]);
                        }}
                      >
                        {locality.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            <div className="select-container">
              <select
                className="form-control mx-1"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
              >
                <option value="">Choose Type...</option>
                <option value="rent">Rent</option>
                <option value="newProperty">New Property</option>
                <option value="resale">Resale</option>
              </select>
            </div>
            <button type="submit" className="btn submit-button mx-2">Search</button>
          </span>
        </form>
      </div>
    </div>
  );
}

export default SearchBarComponent;
