import { useState } from "react";
import { FaGlobe, FaMapMarkerAlt, FaHome, FaBuilding, FaDollarSign, FaChevronDown } from "react-icons/fa";
import "./NewPhoneSearch.css";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import MultiRangeSlider from "multi-range-slider-react";

const NewPhoneSearch = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Rent");
  const [showComingSoon, setShowComingSoon] = useState(false);
  
  // States from SearchBar.jsx
  const [city, setCity] = useState('noida');
  const [locality, setLocality] = useState('');
  const [configuration, setConfiguration] = useState('');
  const [unitType, setUnitType] = useState('');
  const [purpose, setPurpose] = useState('sale');
  const [category, setCategory] = useState('residential');
  const [residential, setResidential] = useState('apartment');
  const [commercial, setCommercial] = useState('');
  const [construction_status, setConstructionStatus] = useState('');
  const [minValue, setMinValue] = useState(5);
  const [maxValue, setMaxValue] = useState(2000);
  const [tabSelected, setTabSelected] = useState(false);
  // Handle tab change with appropriate state updates
  const handleTabChange = (tab) => {
    if (tab === "Coliving Space") {
      setShowComingSoon(true);
      return;
    }
    
    setActiveTab(tab);
    setTabSelected(true);
    // Reset and set states based on selected tab
    switch(tab) {
      case "Rent":
        setPurpose('rent');
        setCategory('residential');
        setConstructionStatus('');
        setResidential('apartment');
        setCommercial('');
        break;
      case "Buy":
        setPurpose('Sale');
        setCategory('residential');
        setConstructionStatus('');
        setResidential('apartment');
        setCommercial('');
        break;
      case "New Projects":
        navigate('/adminproperty/Noida');
        break;
    
      case "Commercial Investment":
        navigate('/commercial');
        break;
      default:
        break;
    }
  };

  // Handle the price range slider
  const handleInput = (e) => {
    setMinValue(e.minValue);
    setMaxValue(e.maxValue);
  };

  // Handle search functionality
  const handleSearch = () => {
    // Format city
    let formattedCity = city ? city.toLowerCase() : 'all';
    formattedCity = formattedCity.replace(/\s+/g, '-');

    // Format configuration for residential properties
    let formattedConfig = configuration;
    if (configuration) {
      formattedConfig = configuration.toUpperCase();
    } else {
      formattedConfig = 'all';
    }

    // Format purpose (rent/sale)
    let formattedPurpose = purpose ? purpose.toLowerCase() : 'all';

    // Format price range
    let priceValue;
    if (purpose === 'rent') {
      // Convert rent ranges to actual values
      const priceMap = {
        '5-10': '10000',
        '10-20': '20000',
        '20-30': '30000',
        '30-500': '50000'
      };
      const priceKey = `${minValue}-${maxValue}`;
      priceValue = priceMap[priceKey] || '10000';
    } else {
      // Convert sale ranges to actual values
      const priceMap = {
        '5-100': '10000000',    // 5L - 1Cr (100L)
        '100-500': '50000000',  // 1Cr - 5Cr
        '500-1000': '100000000', // 5Cr - 10Cr
        '1000-20000': '200000000' // 10Cr+
      };
      const priceKey = `${minValue}-${maxValue}`;
      priceValue = priceMap[priceKey] || '10000000';
    }

    // Determine URL format based on active tab
    let searchUrl;
    
    if (activeTab === "Plot/Land") {
      // Format for plot/land: /search-property/city/purpose/plot/price
      searchUrl = `/search-property/${formattedCity}/${formattedPurpose}/plot/${priceValue}`;
    } 
    else if (activeTab === "Commercial Project") {
      // Format for commercial: /search-property/city/purpose/type/price
      const commercialType = commercial.toLowerCase().replace(/\s+/g, '');
      searchUrl = `/search-property/${formattedCity}/${formattedPurpose}/${commercialType}/${priceValue}`;
    } 
    else {
      // Format for residential (rent/buy): /search-property/city/configuration/purpose/type/price
      const propertyType = residential.toLowerCase().replace(/\s+/g, '');
      // Replace 'house/villa' with just 'villa'
      const formattedType = propertyType === 'housevilla' ? 'villa' : propertyType;
      searchUrl = `/search-property/${formattedCity}/${formattedConfig}/${formattedPurpose}/${formattedType}/${priceValue}`;
    }

    // Navigate to search results page
    navigate(searchUrl);
  };

  return (
    <div className="new-phone-search-container">
      {showComingSoon && (
        <div className="coming-soon-overlay" onClick={() => setShowComingSoon(false)}>
          <div className="coming-soon-popup" onClick={(e) => e.stopPropagation()}>
            <h3>Coming Soon!</h3>
            <p>This feature will be available shortly.</p>
            <button onClick={() => setShowComingSoon(false)}>Close</button>
          </div>
        </div>
      )}
      
      <div className="newsearchbanner">
        {/* <div className="new-phone-search-overlay"></div> */}
        <img
          src="/search.jpg"
          srcSet="/search-small.jpg 400w, /search.jpg 800w"
          sizes="(max-width: 768px) 400px, 800px"
          alt="Property Banner"
          className="new-phone-search-banner"
          loading="lazy"
          width="800"
          height="400"
          decoding="async"
        />
        <div className="new-phone-search-title">
          <h1>Discover <b>best properties</b> in one <b>place</b></h1>
        </div>
        <div className="new-phone-search-tabs">
          {["Rent", "Buy", "New Projects","Plot/Land", "Coliving Space","Commercial Investment"].map(
            (tab) => (
              <button
                key={tab}
                className={`new-phone-search-tab ${
                  activeTab === tab ? "active" : ""
                }`}
                onClick={() => handleTabChange(tab)}
              >
                {tab}
              </button>
            )
          )}
        </div>
        </div>
        {tabSelected && (
            <>
             <div className="new-phone-search-content">
        

        <div className="new-phone-search-form">
          <div className="new-phone-search-field" style={{
            width:'100%'
          }}>
            <FaGlobe className="new-phone-search-icon" />
            <select 
              className="new-phone-search-select"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="">Select City</option>
              <option value="noida">Noida</option>
              <option value="delhi">Delhi</option>
              <option value="greater noida">Greater Noida</option>
              <option value="ghaziabad">Ghaziabad</option>
              <option value="gurugram">Gurugram</option>
              <option value="faridabad">Faridabad</option>
              <option value="doha">Doha</option>
              <option value="dubai">Dubai</option>
              <option value="Mukteshwar">Mukteshwar</option>
            </select>
            <FaChevronDown className="new-phone-search-arrow" />
          </div>

       

          {activeTab !== "Plot/Land" && activeTab !== "Commercial Project" && (
            <div className="new-phone-search-field">
              <FaHome className="new-phone-search-icon" />
              <select 
                className="new-phone-search-select"
                value={configuration}
                onChange={(e) => setConfiguration(e.target.value)}
              >
                <option value="">BHK Type</option>
                <option value="1bhk">1 BHK</option>
                <option value="2bhk">2 BHK</option>
                <option value="3bhk">3 BHK</option>
                <option value="4bhk">4 BHK</option>
                <option value="56bhk">5-6 BHK</option>
                <option value="6plusbhk">6+ BHK</option>
              </select>
              <FaChevronDown className="new-phone-search-arrow" />
            </div>
          )}

          {activeTab !== "Plot/Land" && (
            <div className="new-phone-search-field" style={{
                 width: activeTab === "Commercial Project" ? "100%" : "48%"
            }}>
              <FaBuilding className="new-phone-search-icon" />
              {activeTab === "Commercial Project" ? (
                <select 
                  className="new-phone-search-select"
                  value={commercial}
                  onChange={(e) => setCommercial(e.target.value)}
                  
                >
                 
                  <option value="officespace">Office Space</option>
                  <option value="shop">Shop</option>
                  <option value="coworkingpspace">Coworking Space</option>
                  <option value="showroom">Showroom</option>
                </select>
              ) : (
                <select 
                  className="new-phone-search-select"
                  value={residential}
                  onChange={(e) => setResidential(e.target.value)}
                >
                  <option value="">Property Type</option>
                  <option value="apartment">Apartment</option>
                  <option value="housevilla">House/Villa</option>
                  <option value="builderfloor">Builder Floor</option>
                  <option value="farmhouse">Farmhouse</option>
                </select>
              )}
              <FaChevronDown className="new-phone-search-arrow" />
            </div>
          )}

          <div className="new-phone-search-field" style={{
            width:'100%'
          }}>
            <MdOutlineCurrencyRupee className="new-phone-search-icon" />
            <select 
              className="new-phone-search-select"
              onChange={(e) => {
                const range = e.target.value.split('-');
                if (range.length === 2) {
                  setMinValue(parseInt(range[0]));
                  setMaxValue(parseInt(range[1]));
                }
              }}
            >
              {activeTab === "Rent" ? (
                <>
                  <option value="5-10">5k - 10k</option>
                  <option value="10-20">10k - 20k</option>
                  <option value="20-30">20k - 30k</option>
                  <option value="30-500">30k+</option>
                </>
              ) : (
                <>
                  <option value="5-100">5L - 1 Cr</option>
                  <option value="100-500">1 Cr - 5 Cr</option>
                  <option value="500-1000">5 Cr - 10 Cr</option>
                  <option value="1000-20000">10 Cr+</option>
                </>
              )}
            </select>
            <FaChevronDown className="new-phone-search-arrow" />
          </div>

          <button 
            className="new-phone-search-button"
            onClick={handleSearch}
          >
            Search Properties
          </button>
        </div>
      </div>
   
            </>
        )}
  
    </div>
  );
};

export default NewPhoneSearch;
