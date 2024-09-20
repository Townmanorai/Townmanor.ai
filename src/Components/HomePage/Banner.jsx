import React, { useEffect, useState } from 'react';
import "../common.css";
import "../commonsecond.css";

import './Banner.css'

const Banner = () => {
  const [propertyTypes, setPropertyTypes] = useState([
    { value: '', label: 'Property Type' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'builder_floor', label: 'Builder Floor' },
    { value: 'coworking_space', label: 'Coworking Space' },
    { value: 'farm_house', label: 'Farm House' },
    { value: 'house_villa', label: 'House/Villa' },
    { value: 'office_space', label: 'Office Space' },
    { value: 'plot_land', label: 'Plot/Land' },
    { value: 'shop', label: 'Shop' },
    { value: 'showroom', label: 'Showroom' }
  ]);
  
  const [countries, setCountries] = useState([
    { value: '', label: 'Location' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'faridabad', label: 'Faridabad' },
    { value: 'ghaziabad', label: 'Ghaziabad' },
    { value: 'greater_noida', label: 'Greater Noida' },
    { value: 'gurgaon', label: 'Gurgaon' },
    { value: 'noida', label: 'Noida' },
    { value: 'doha', label: 'Doha' },
    { value: 'dubai', label: 'Dubai' }
  ]);
  const [selectedPropertyType, setSelectedPropertyType] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedDistance, setSelectedDistance] = useState('');
  const [error, setError] = useState(null);
  const [isPropertyTypeOpen, setIsPropertyTypeOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);

  // Fetch property types from API
  useEffect(() => {
    // const fetchPropertyTypes = async () => {
    //   try {
    //     const response = await fetch('https://townmanor.in/api/treefieldid', {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({
    //         page: 'frontendajax_treefieldid',
    //         action: 'ci_action',
    //         table: 'treefield_m',
    //         field_id: '79',
    //         empty_value: 'Property Type'
    //       })
    //     });
    //     const data = await response.json();
    //     setPropertyTypes(data || []); // Populate property types
    //   } catch (err) {
    //     setError('Failed to fetch property types');
    //   }
    // };

    // const fetchCountries = async () => {
    //   try {
    //     const response = await fetch('https://townmanor.in/api/treefieldid', {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({
    //         page: 'frontendajax_treefieldid',
    //         action: 'ci_action',
    //         table: 'treefield_m',
    //         field_id: '64',
    //         empty_value: 'Country'
    //       })
    //     });
    //     const data = await response.json();
    //     setCountries(data || []); // Populate countries
    //   } catch (err) {
    //     setError('Failed to fetch countries');
    //   }
    // };

    // fetchPropertyTypes();
    // fetchCountries();
  }, []);

  
  const handlePropertyTypeClick = () => {
    setIsPropertyTypeOpen(!isPropertyTypeOpen);
  };

  const handleCountryClick = () => {
    setIsCountryOpen(!isCountryOpen);
  };

  const handlePropertyTypeChange = (value) => {
    setSelectedPropertyType(value);
    setIsPropertyTypeOpen(false);
  };

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
    setIsCountryOpen(false);
  };

  const handleDistanceChange = (event) => {
    setSelectedDistance(event.target.value);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="banner widget_edit_enabled">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="banner-content">
              <h1><span>Discover</span> best properties <span>in</span> one place</h1>
            </div>
            <form action="#" className="row banner-search search-form top-search banner-search_init">
              <div className="banner-search_box banner-search row">
                <div className="form_field">
                  <div className="form-group field_search_-">
                    <input
                      id="search_option_smart"
                      name="search_option_smart"
                      type="text"
                      className="form-control"
                      placeholder="Search for locality, landmark..."
                    />
                  </div>
                </div>

                <div className="form_field sf_input">
                  <div className="form-group field_search_search_radius">
                    <div className="drop-menu">
                      <div className="select">
                        <span>Distance</span>
                        <i className="fa fa-angle-down"></i>
                      </div>
                      <input type="hidden" id="search_radius" name="search_radius" />
                      <ul className="dropeddown">
                        {/* Render distance options */}
                        {Array.from({ length: 11 }).map((_, i) => (
                          <li key={i} data-value={i * 10}>
                            {i * 10} km
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Property Type Dropdown */}
                <div className="form_field sf_input">
                  <div className="form-group field_search_search_radius">
                    <div className="drop-menu">
                      <div className="select" onClick={handlePropertyTypeClick}>
                        <span>{selectedPropertyType || 'Property Type'}</span>
                        <i className="fa fa-angle-down"></i>
                      </div>
                      <ul className={`dropeddown ${isPropertyTypeOpen ? 'open' : ''}`}>
                        {propertyTypes.map(pt => (
                          <li key={pt.value} onClick={() => handlePropertyTypeChange(pt.value)}>
                            {pt.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="form_field sf_input">
                  <div className="form-group field_search_search_radius">
                    <div className="drop-menu">
                      <div className="select" onClick={handleCountryClick}>
                        <span>{selectedCountry || 'Location'}</span>
                        <i className="fa fa-angle-down"></i>
                      </div>
                      <ul className={`dropeddown ${isCountryOpen ? 'open' : ''}`}>
                        {countries.map(c => (
                          <li key={c.value} onClick={() => handleCountryChange(c.value)}>
                            {c.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>


                <input name="search_option_64" type="text" id="search_option_64_1" className="form-control locationautocomplete" readOnly style={{ display: 'none' }} />

                <ul className="menu-onmap tabbed-selector">
                  <li className="all-button active">
                    <label>
                      Buy Properties
                      <input type="radio" rel="Buy Properties" name="search_option_4" value="" />
                    </label>
                  </li>
                  <li>
                    <label>
                      Rent Properties
                      <input type="radio" rel="Rent Properties" name="search_option_4" value="Rent Properties" />
                    </label>
                  </li>
                  <li>
                    <label>
                      Newly Launched Properties
                      <input type="radio" rel="Newly Launched Properties" name="search_option_4" value="Newly Launched Properties" />
                    </label>
                  </li>
                  <li>
                    <label>
                      Sale Properties
                      <input type="radio" rel="Sale Properties" name="search_option_4" value="Sale Properties" />
                    </label>
                  </li>
                </ul>

                <div className="form_field form_field_sw_range abcd">
                  <div className="form-group">
                    <div className="scale-range sw_scale_range" id="nonlinear-price">
                      <div className="hidden config-range" data-min="0" data-max="1000000000" data-prefix="₹" data-infinity="false" />
                      <div className="scale-range-value">
                        <span className="scale-range-label">Price</span>
                        <span className="nonlinear-min">₹0</span> - <span className="nonlinear-max">₹1,000,000,000</span>
                      </div>
                      <div className="nonlinear noUi-target noUi-ltr noUi-horizontal">
                        <div className="noUi-base">
                          <div className="noUi-origin" />
                          <div className="noUi-origin" />
                        </div>
                      </div>
                    </div>
                    <input type="hidden" id="search_option_36_from" name="search_option_36_from" className="value-input-hidden" />
                    <input type="hidden" id="search_option_36_to" name="search_option_36_to" className="value-input-hidden" />
                  </div>
                </div>
                <div className="form_field srch-btn  form_field_save ">
                  <a href="#" className="btn btn-outline-primary sw-search-start slim">
                    <i className="la la-search"></i>
                    <i className="fa fa-spinner fa-spin fa-ajax-indicator hidden"></i>
                  </a>
                  <button type="button" id="search-save" className="btn btn-custom btn-savesearch btn-custom-secondary btn-icon"><i className="fa fa-save icon-white fa-ajax-hide"></i><i className="fa fa-spinner fa-spin fa-ajax-indicator" style={{ display: "none" }}></i></button>
                </div>
                {/* <div className="form_field">
                  <button type="submit" className="btn banner-search_btn btn-primary">Search</button>
                </div> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
