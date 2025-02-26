import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SearchForm.css';


const SearchForm = () => {
  const [projectName, setProjectName] = useState('');
  const [yourCityValue, setYourCityValue] = useState('');
  const [yourConfigurationValue, setYourConfigurationValue] = useState('');
  const [yourFurnishType, setYourFurnishType] = useState('');
  const [yourConstructionStatus, setYourConstructionStatus] = useState('');
  const [yourBudgetStatus, setYourBudgetStatus] = useState('');

  // Dropdown visibility states
  const [cityDropdownVisible, setCityDropdownVisible] = useState(false);
  const [configurationDropdownVisible, setConfigurationDropdownVisible] = useState(false);
  const [furnishDropdownVisible, setFurnishDropdownVisible] = useState(false);
  const [constructionDropdownVisible, setConstructionDropdownVisible] = useState(false);
  const [BudgetDropdownVisible, setBudgetDropdownVisible] = useState(false);

  // Search terms for filtering dropdowns
  const [citySearchTerm, setCitySearchTerm] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  // Data for dropdowns
  const cities = ['Delhi', 'Faridabad', 'Ghaziabad', 'Greater Noida', 'Gurgaon', 'Noida', 'Doha', 'Dubai'];
  const configurations = ['1BHK', '2BHK', '3BHK', '4BHK', '5BHK', '6BHK', '7BHK', '8BHK'];
  const furnishTypes = ['Furnished', 'Unfurnished'];
  const constructionStatuses = ['Ready To Move', 'Under Construction', 'New Launched'];
  const BudgetValue = ['Between 5 - 10 Lakh', 'Between 10 - 20 Lakh', 'Between 20 - 50 Lakh','Between 50 Lakh - 1 Cr','Between 1 - 5 Cr','More Than 5 Cr'];

  // Filter cities based on search input
  const filteredCities = cities.filter(city =>
    city.toLowerCase().includes(citySearchTerm.toLowerCase())
  );

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams({
      city: yourCityValue,
      configuration: yourConfigurationValue,
      furnish_type: yourFurnishType,
      construction_status: yourConstructionStatus,
      page: 1,
    });
    navigate(`/search-property?${queryParams.toString()}`);
  };

  // Fetch data when URL changes
  // useEffect(() => {
  //   const searchParams = new URLSearchParams(location.search);
  //   const city = searchParams.get('city');
  //   const config = searchParams.get('configuration');
  //   const furnish = searchParams.get('furnish_type');
  //   const status = searchParams.get('construction_status');
    
  //   // Fetch or update the data based on the URL params
  //   console.log('Fetching data for:', { city, config, furnish, status });
    
  // }, [location]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const city = searchParams.get('city') || '';
    const config = searchParams.get('configuration') || '';
    const furnish = searchParams.get('furnish_type') || '';
    const status = searchParams.get('construction_status') || '';

    // Fetch data based on query parameters
    const fetchData = async () => {
      // console.log('Fetching data for:', { city, config, furnish, status });

      // Example API call, replace with your actual API URL
      const response = await fetch(`https://www.townmanor.ai/search-property?city=${city}&configuration=${config}&furnish_type=${furnish}&construction_status=${status}`);
      
      
      if (response.ok) {
        const data = await response.json();
        // Handle the fetched data as needed
      } else {
        console.error('Error fetching data:', response.statusText);
      }
    };

    fetchData();
  }, [location.search]);

  return (
    <div className="widget-property-search">
      <form onSubmit={handleSubmit} className="row banner-search search-form">
        
        {/* Project/Property Name Input */}
        {/* <div className="form_field wide sf_input">
          <input
            type="text"
            className="form-control"
            placeholder="Write Project/Property name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div> */}

        {/* City Dropdown */}
        <div className="form_field">
          <div className="form-group">
            <div className={`winter_dropdown_tree color-secondary ${cityDropdownVisible ? 'win_open' : ''}`}>
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-default color-secondary"
                  onClick={() => setCityDropdownVisible(!cityDropdownVisible)}
                >
                  {yourCityValue || 'City'}
                </button>
              </div>
              {cityDropdownVisible && (
                <div className="list_container color-primary win_visible">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control color-secondary search_term"
                      placeholder="Search City"
                      value={citySearchTerm}
                      onChange={(e) => setCitySearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="list_scroll">
                    <ul className="list_items">
                      {filteredCities.map(city => (
                        <li
                          key={city}
                          onClick={() => {
                            setYourCityValue(city);
                            setCityDropdownVisible(false);
                            setCitySearchTerm('');
                          }}
                        >
                          {city}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Configuration Dropdown */}
        <div className="form_field">
          <div className="form-group">
            <div className={`winter_dropdown_tree color-secondary ${configurationDropdownVisible ? 'win_open' : ''}`}>
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-default color-secondary"
                  onClick={() => setConfigurationDropdownVisible(!configurationDropdownVisible)}
                >
                  {yourConfigurationValue || 'Configuration'}
                </button>
              </div>
              {configurationDropdownVisible && (
                <div className="list_container color-primary win_visible">
                  <div className="list_scroll">
                  <ul className="list_items">
                    {configurations.map(config => (
                      <li
                        key={config}
                        onClick={() => {
                          setYourConfigurationValue(config);
                          setConfigurationDropdownVisible(false);
                        }}
                      >
                        {config}
                      </li>
                    ))}
                  </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Furnish Type Dropdown */}
        <div className="form_field">
          <div className="form-group">
            <div className={`winter_dropdown_tree color-secondary ${furnishDropdownVisible ? 'win_open' : ''}`}>
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-default color-secondary"
                  onClick={() => setFurnishDropdownVisible(!furnishDropdownVisible)}
                >
                  {yourFurnishType || 'Furnish Type'}
                </button>
              </div>
              {furnishDropdownVisible && (
                <div className="list_container color-primary win_visible">
                  <div className="list_scroll">
                  <ul className="list_items">
                    {furnishTypes.map(furnish => (
                      <li
                        key={furnish}
                        onClick={() => {
                          setYourFurnishType(furnish);
                          setFurnishDropdownVisible(false);
                        }}
                      >
                        {furnish}
                      </li>
                    ))}
                  </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Construction Status Dropdown */}
        <div className="form_field">
          <div className="form-group">
            <div className={`winter_dropdown_tree color-secondary ${constructionDropdownVisible ? 'win_open' : ''}`}>
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-default color-secondary"
                  onClick={() => setConstructionDropdownVisible(!constructionDropdownVisible)}
                >
                  {yourConstructionStatus || 'Construction Status'}
                </button>
              </div>
              {constructionDropdownVisible && (
                <div className="list_container color-primary win_visible">
                   <div className="list_scroll">
                  <ul className="list_items">
                    {constructionStatuses.map(status => (
                      <li
                        key={status}
                        onClick={() => {
                          setYourConstructionStatus(status);
                          setConstructionDropdownVisible(false);
                        }}
                      >
                        {status}
                      </li>
                    ))}
                  </ul>
                  </div>   
                </div>
              )}
            </div>
          </div>
        </div>
       
       {/* Budget Dropdown */}
       <div className="form_field">
          <div className="form-group">
            <div className={`winter_dropdown_tree color-secondary ${BudgetDropdownVisible ? 'win_open' : ''}`}>
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-default color-secondary"
                  onClick={() => setBudgetDropdownVisible(!BudgetDropdownVisible)}
                >
                  {yourBudgetStatus || 'Budget'}
                </button>
              </div>
              {BudgetDropdownVisible && (
                <div className="list_container color-primary win_visible">
                   <div className="list_scroll">
                  <ul className="list_items">
                    {BudgetValue.map(status => (
                      <li
                        key={status}
                        onClick={() => {
                          setYourBudgetStatus(status);
                          setBudgetDropdownVisible(false);
                        }}
                      >
                        {status}
                      </li>
                    ))}
                  </ul>
                  </div>   
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="form_field form_field_save">
          <button className="btn btn-outline-primary" type="submit" style={{margin:'0px'}}>
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;

