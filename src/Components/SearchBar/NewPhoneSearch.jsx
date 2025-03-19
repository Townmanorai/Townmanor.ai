import { useState } from "react";
import { FaGlobe, FaMapMarkerAlt, FaHome, FaBuilding, FaDollarSign, FaChevronDown } from "react-icons/fa";
import "./NewPhoneSearch.css";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import MultiRangeSlider from "multi-range-slider-react";

const NewPhoneSearch = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Rent");
  
  // States from SearchBar.jsx
  const [city, setCity] = useState('noida');
  const [locality, setLocality] = useState('');
  const [configuration, setConfiguration] = useState('');
  const [unitType, setUnitType] = useState('');
  const [purpose, setPurpose] = useState('rent');
  const [category, setCategory] = useState('residential');
  const [residential, setResidential] = useState('apartment');
  const [commercial, setCommercial] = useState('');
  const [construction_status, setConstructionStatus] = useState('');
  const [minValue, setMinValue] = useState(5);
  const [maxValue, setMaxValue] = useState(2000);
  const [tabSelected, setTabSelected] = useState(false);
  // Handle tab change with appropriate state updates
  const handleTabChange = (tab) => {
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
        navigate('/adminproperty');
        break;
      case "Plot/Land":
        setPurpose('Sale');
        setCategory('');
        setConstructionStatus('');
        setResidential('plot');
        setCommercial('land');
        setConfiguration('');
        break;
      case "Commercial Project":
        setPurpose('Sale');
        setCategory('commercial');
        setConstructionStatus('');
        setResidential('');
        setConfiguration('');
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
  const handleSearch = async () => {
    // Create search data object with selected filters
    const searchData = {};

    // Include only the parameters that are selected
    if (city) searchData.city = city;
    if (locality) searchData.locality = locality;
    if (configuration) searchData.configuration = configuration;
    if (residential) searchData.residential = residential;
    if (commercial) searchData.commercial = commercial;
    if (purpose) searchData.purpose = purpose;
    if (minValue) searchData.minValue = minValue;
    if (maxValue) searchData.maxValue = maxValue;
    if (construction_status) searchData.construction_status = construction_status;
    if (category) searchData.category = category;

    console.log(searchData);

    // API call
    try {
      const response = await fetch(`http://localhost:3030/searchproperties?${new URLSearchParams(searchData).toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      const result = await response.json();
      console.log('Search results:', result);
      // Handle navigation or results display
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="new-phone-search-container">
       <div className="newsearchbanner">
        {/* <div className="new-phone-search-overlay"></div> */}
        <img
          src="/search.jpg"
          alt="Property Banner"
          className="new-phone-search-banner"
        />
        <div className="new-phone-search-title">
          <h1>Discover <b>best properties</b> in one <b>place</b></h1>
        </div>
        <div className="new-phone-search-tabs">
          {["Rent", "Buy", "New Projects", "Plot/Land", "Commercial Project", "Commercial Investment"].map(
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
                  <option value="5-20">5L - 20L</option>
                  <option value="20-50">20L - 50L</option>
                  <option value="50-100">50L - 1Cr</option>
                  <option value="100-2000">1Cr+</option>
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
