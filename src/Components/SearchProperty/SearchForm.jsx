import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SearchForm.css';


const SearchForm = () => {
  const [projectName, setProjectName] = useState('');
  const [yourCityValue, setYourCityValue] = useState('');
  const [yourConfigurationValue, setYourConfigurationValue] = useState('');
  const [yourFurnishType, setYourFurnishType] = useState('');
  const [yourConstructionStatus, setYourConstructionStatus] = useState('');

  // Dropdown visibility states
  const [cityDropdownVisible, setCityDropdownVisible] = useState(false);
  const [configurationDropdownVisible, setConfigurationDropdownVisible] = useState(false);
  const [furnishDropdownVisible, setFurnishDropdownVisible] = useState(false);
  const [constructionDropdownVisible, setConstructionDropdownVisible] = useState(false);

  // Search terms for filtering dropdowns
  const [citySearchTerm, setCitySearchTerm] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  // Data for dropdowns
  const cities = ['Delhi', 'Faridabad', 'Ghaziabad', 'Greater Noida', 'Gurgaon', 'Noida', 'Doha', 'Dubai'];
  const configurations = ['1BHK', '2BHK', '3BHK', '4BHK', '5BHK', '6BHK', '7BHK', '8BHK'];
  const furnishTypes = ['Furnished', 'Unfurnished'];
  const constructionStatuses = ['Ready To Move', 'Under Construction', 'New Launched'];

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
      console.log('Fetching data for:', { city, config, furnish, status });

      // Example API call, replace with your actual API URL
      const response = await fetch(`http://ec2-43-205-18-191.ap-south-1.compute.amazonaws.com/search-property?city=${city}&configuration=${config}&furnish_type=${furnish}&construction_status=${status}`);
      
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

        {/* Submit Button */}
        <div className="form_field form_field_save">
          <button className="btn btn-outline-primary" type="submit">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;




// import React, { useState } from 'react';

// import "../../common.css";
// import "../../commonsecond.css"

// const SearchForm = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [location, setLocation] = useState('');
//   const [propertyType, setPropertyType] = useState('');
//   const [minPrice, setMinPrice] = useState('');
//   const [maxPrice, setMaxPrice] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic, like sending the form data to an API
//     console.log({
//       searchQuery,
//       location,
//       propertyType,
//       minPrice,
//       maxPrice,
//     });
//   };

//   return (
//     <div className="widget-property-search widget_edit_enabled property_search_hidekeywords">
//       <form className="row banner-search search-form" onSubmit={handleSubmit}>
//         <div className="form-group col-md-4 col-sm-6">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search Keyword"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>
//         <div className="form-group col-md-4 col-sm-6">
//           <select
//             className="form-control"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//           >
//             <option value="">Select Location</option>
//             <option value="noida">Noida</option>
//             <option value="faridabad">Faridabad</option>
//             {/* Add more options based on locations */}
//           </select>
//         </div>
//         <div className="form-group col-md-4 col-sm-6">
//           <select
//             className="form-control"
//             value={propertyType}
//             onChange={(e) => setPropertyType(e.target.value)}
//           >
//             <option value="">Property Type</option>
//             <option value="apartment">Apartment</option>
//             <option value="house">House</option>
//             {/* Add more options based on property types */}
//           </select>
//         </div>
//         <div className="form-group col-md-4 col-sm-6">
//           <input
//             type="number"
//             className="form-control"
//             placeholder="Min Price"
//             value={minPrice}
//             onChange={(e) => setMinPrice(e.target.value)}
//           />
//         </div>
//         <div className="form-group col-md-4 col-sm-6">
//           <input
//             type="number"
//             className="form-control"
//             placeholder="Max Price"
//             value={maxPrice}
//             onChange={(e) => setMaxPrice(e.target.value)}
//           />
//         </div>
//         <div className="form-group col-md-4 col-sm-6">
//           <button type="submit" className="btn btn-primary btn-block">
//             Search
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SearchForm;



// import React, { useState } from 'react';

// const SearchForm = () => {
//   const [projectName, setProjectName] = useState('');
//   const [propertyType, setPropertyType] = useState('');
//   const [country, setCountry] = useState('');
//   const [maxPrice, setMaxPrice] = useState('');
//   const [bedrooms, setBedrooms] = useState('');
//   const [features, setFeatures] = useState({
//     airConditioning: false,
//     computer: false,
//     heating: false,
//     parking: false,
//     cableTV: false,
//     microwave: false,
//     lift: false,
//     pool: false,
//     dishwasher: false,
//   });

//   // Dummy JSON data
//   const propertyTypes = ['Apartment', 'Builder Floor', 'Coworking Space', 'Farm House', 'House/Villa', 'Office Space', 'Plot/Land', 'Shop', 'Showroom'];
//   const countries = ['India', 'UAE', 'Qatar'];
//   const maxPrices = [3000, 5000, 10000, 20000, 100000];

//   const handleCheckboxChange = (e) => {
//     const { name, checked } = e.target;
//     setFeatures((prevFeatures) => ({
//       ...prevFeatures,
//       [name]: checked,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Perform search logic here with form values
//     console.log({ projectName, propertyType, country, maxPrice, bedrooms, features });
//   };

//   return (
//     <div className="widget-property-search widget_edit_enabled property_search_hidekeywords">
//       <form onSubmit={handleSubmit} className="row banner-search search-form">
        
//         {/* Project/Property Name Field */}
//         <div className="form_field wide sf_input">
//           <div className="form-group field_search_78">
//             <input
//               id="search_option_78"
//               type="text"
//               className="form-control"
//               placeholder="Write Project/Property name for AI Generate Description, Press Generate Button Below"
//               value={projectName}
//               onChange={(e) => setProjectName(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Property Type Field */}
//         <div className="form_field">
//           <div className="form-group">
//             <div className="winter_dropdown_tree color-secondary">
//               <div className="btn-group">
//                 <button type="button" className="btn btn-default color-secondary">
//                   {propertyType || 'Property Type'}
//                 </button>
//                 <button type="button" className="btn btn-default dropdown-toggle color-secondary">
//                   <span className="glyphicon glyphicon-menu-down"></span>
//                 </button>
//               </div>
//               <div className="list_container color-primary">
//                 <ul className="list_items">
//                   {propertyTypes.map((type) => (
//                     <li key={type} onClick={() => setPropertyType(type)}>
//                       {type}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Country Field */}
//         <div className="form_field">
//           <div className="form-group">
//             <div className="winter_dropdown_tree color-secondary">
//               <div className="btn-group">
//                 <button type="button" className="btn btn-default color-secondary">
//                   {country || 'Country'}
//                 </button>
//                 <button type="button" className="btn btn-default dropdown-toggle color-secondary">
//                   <span className="glyphicon glyphicon-menu-down"></span>
//                 </button>
//               </div>
//               <div className="list_container color-primary">
//                 <ul className="list_items">
//                   {countries.map((cty) => (
//                     <li key={cty} onClick={() => setCountry(cty)}>
//                       {cty}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Max Sale Price Field */}
//         <div className="form_field sf_input">
//           <div className="form-group field_search_36">
//             <div className="drop-menu">
//               <div className="select">
//                 <span>{maxPrice || 'Max Sale price'}</span>
//                 <i className="fa fa-angle-down"></i>
//               </div>
//               <input type="hidden" name="search_option_36_to" value={maxPrice} />
//               <ul className="dropeddown">
//                 <li onClick={() => setMaxPrice('')}>Max Sale price</li>
//                 {maxPrices.map((price) => (
//                   <li key={price} data-value={price} onClick={() => setMaxPrice(price)}>
//                     {price}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* Bedroom Field */}
//         <div className="form_field sf_input">
//           <div className="form-group field_search_20">
//             <input
//               id="search_option_20"
//               type="text"
//               className="form-control"
//               placeholder="Bedroom"
//               value={bedrooms}
//               onChange={(e) => setBedrooms(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Features List */}
//         <div className="features_list">
//           <div className="group">
//             <div className="input-field checkbox-field field_search_22">
//               <input
//                 type="checkbox"
//                 name="airConditioning"
//                 id="search_option_22"
//                 checked={features.airConditioning}
//                 onChange={handleCheckboxChange}
//               />
//               <label htmlFor="search_option_22">
//                 <span></span>
//                 <small>Air conditioning</small>
//                 <b className="count">&nbsp;(228)</b>
//               </label>
//             </div>
//             <div className="input-field checkbox-field field_search_24">
//               <input
//                 type="checkbox"
//                 name="computer"
//                 id="search_option_24"
//                 checked={features.computer}
//                 onChange={handleCheckboxChange}
//               />
//               <label htmlFor="search_option_24">
//                 <span></span>
//                 <small>Computer</small>
//                 <b className="count">&nbsp;(13)</b>
//               </label>
//             </div>
//             {/* Add other features similarly */}
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="feat-srch">
//           <div className="more-feat">
//             <h3>
//               <i className="la la-cog"></i> Show More Features
//             </h3>
//           </div>
//           <div className="form_field form_field_save">
//             <div className="form_field_row">
//               <button className="btn btn-outline-primary sw-search-start" type="submit">
//                 <span>
//                   Search<i className="fa fa-spinner fa-spin fa-ajax-indicator hidden"></i>
//                 </span>
//               </button>
//               <button type="button" id="search-save" className="btn btn-custom btn-savesearch btn-custom-secondary btn-icon">
//                 <i className="fa fa-save icon-white fa-ajax-hide"></i>
//                 <i className="fa fa-spinner fa-spin fa-ajax-indicator" style={{ display: 'none' }}></i>
//               </button>
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SearchForm;


// import React, { useState } from 'react';

// const SearchForm = () => {
//   const [projectName, setProjectName] = useState('');
//   const [propertyType, setPropertyType] = useState('');
//   const [country, setCountry] = useState('');
//   const [maxPrice, setMaxPrice] = useState('');
//   const [bedrooms, setBedrooms] = useState('');
//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const [countryDropdownVisible, setCountryDropdownVisible] = useState(false);
//   const [searchTerm, setSearchTerm] = useState(''); // Added search term state for filtering
//   const [countrySearchTerm, setCountrySearchTerm] = useState(''); // Country search term

//   const propertyTypes = ['Apartment', 'Builder Floor', 'Coworking Space', 'Farm House', 'House/Villa', 'Office Space', 'Plot/Land', 'Shop', 'Showroom'];
//   const countries = ['India', 'UAE', 'Qatar'];
//   const maxPrices = [3000, 5000, 10000, 20000, 100000];

//   const filteredPropertyTypes = propertyTypes.filter((type) =>
//     type.toLowerCase().includes(searchTerm.toLowerCase())
//   );
  
//   const filteredCountries = countries.filter((country) =>
//     country.toLowerCase().includes(countrySearchTerm.toLowerCase())
//   );

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const queryParams = new URLSearchParams({
//       city: encodeURIComponent('yourCityValue'),
//       configuration: encodeURIComponent('yourConfigurationValue'),
//       furnish_type: encodeURIComponent('yourFurnishType'),
//       construction_status: encodeURIComponent('yourConstructionStatus'),
//       page: 1,
//     });
    
//     navigate(`/properties?${queryParams.toString()}`);
//   };

//   return (
//     <div className="widget-property-search">
//       <form onSubmit={handleSubmit} className="row banner-search search-form">
//         {/* Project/Property Name Field */}
//         {/* <div className="form_field wide sf_input">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Write Project/Property name"
//             value={projectName}
//             onChange={(e) => setProjectName(e.target.value)}
//           />
//         </div> */}

//         {/* Property Type Dropdown */}
//         {/* <div className="form_field">
//           <div className="form-group">
//             <div className={`winter_dropdown_tree color-secondary ${dropdownVisible ? 'win_open' : ''}`}>
//               <div className="btn-group">
//                 <button
//                   type="button"
//                   className="btn btn-default color-secondary"
//                   onClick={() => setDropdownVisible(!dropdownVisible)}
//                 >
//                   {propertyType || 'Property Type'}
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-default dropdown-toggle color-secondary"
//                   onClick={() => setDropdownVisible(!dropdownVisible)}
//                 >
//                   <span className="glyphicon glyphicon-menu-down"></span>
//                 </button>
//               </div>
//               {dropdownVisible && (
//                 <div className="list_container color-primary win_visible">
//                   <div className="input-group">
//                     <input
//                       type="text"
//                       className="form-control color-secondary search_term"
//                       placeholder="Search term"
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                   </div>
//                   <div className="list_scroll">
//                     <ul className="list_items">
//                       {filteredPropertyTypes.map((type) => (
//                         <li
//                           key={type}
//                           onClick={() => {
//                             setPropertyType(type);
//                             setDropdownVisible(false); // Close dropdown after selection
//                             setSearchTerm(''); // Clear search term after selection
//                           }}
//                         >
//                           {type}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div> */}

//         {/* Country Dropdown */}
//         {/* <div className="form_field">
//           <div className="form-group">
//             <div className={`winter_dropdown_tree color-secondary ${countryDropdownVisible ? 'win_open' : ''}`}>
//               <div className="btn-group">
//                 <button
//                   type="button"
//                   className="btn btn-default color-secondary"
//                   onClick={() => setCountryDropdownVisible(!countryDropdownVisible)}
//                 >
//                   {country || 'Country'}
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-default dropdown-toggle color-secondary"
//                   onClick={() => setCountryDropdownVisible(!countryDropdownVisible)}
//                 >
//                   <span className="glyphicon glyphicon-menu-down"></span>
//                 </button>
//               </div>
//               {countryDropdownVisible && (
//                 <div className="list_container color-primary win_visible">
//                   <div className="input-group">
//                     <input
//                       type="text"
//                       className="form-control color-secondary search_term"
//                       placeholder="Search term"
//                       value={countrySearchTerm}
//                       onChange={(e) => setCountrySearchTerm(e.target.value)}
//                     />
//                   </div>
//                   <div className="list_scroll">
//                     <ul className="list_items">
//                       {filteredCountries.map((cty) => (
//                         <li
//                           key={cty}
//                           onClick={() => {
//                             setCountry(cty);
//                             setCountryDropdownVisible(false);
//                             setCountrySearchTerm(''); // Clear search term after selection
//                           }}
//                         >
//                           {cty}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div> */}

//         {/* Max Sale Price Field */}
//         {/* <div className="form_field sf_input">
//           <div className="form-group">
//             <div className="drop-menu">
//               <div className="select">
//                 <span>{maxPrice || 'Max Sale price'}</span>
//               </div>
//               <ul className="dropeddown">
//                 <li onClick={() => setMaxPrice('')}>Max Sale price</li>
//                 {maxPrices.map((price) => (
//                   <li key={price} onClick={() => setMaxPrice(price)}>
//                     {price}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div> */}

//         {/* Bedroom Field */}
//         {/* <div className="form_field sf_input">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Bedroom"
//             value={bedrooms}
//             onChange={(e) => setBedrooms(e.target.value)}
//           />
//         </div> */}

//         {/* Submit Button */}
//         <div className="form_field form_field_save">
//           <button className="btn btn-outline-primary" type="submit">
//             Search
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SearchForm;
 