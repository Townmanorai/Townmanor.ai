import React, { useState } from 'react';
import './SearchBar.css'; // Import CSS file for styling
import MultiRangeSlider from "multi-range-slider-react";
import { useNavigate } from 'react-router-dom';
import PropertyFilters from './PropertyFilter';
import ReraVerificationForm from '../ReraVerification/ReraVerificationForm';

const SearchBar = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState('noida');
  const [locality, setLocality] = useState('');
  const [configuration, setConfiguration] = useState('');
  const [unitType, setUnitType] = useState('');
  const [saleType, setsaleType] = useState('buy');
  const [btntype, setbtntype] = useState('buy');
  const [resitype, setresitype] = useState('');
  const [activeBtn, setActiveBtn] = useState('Buy');
  const [minValue, set_minValue] = useState(5);
  const [maxValue, set_maxValue] = useState(2000);
  const [isVisible, setIsVisible] = useState(true);
  const [plot, setplot] = useState(false);
  const [newproject, setnewproject] = useState(false);
  const [purpose, setpurpose] = useState('Sale');
  const [category, setcategory] = useState('');
  const [residential, setresidential] = useState('apartment');
  const [commercial, setcommercial] = useState('');
  const [construction_status, setconstruction_status] = useState('');
  const [showComingSoon, setShowComingSoon] = useState(false);

  const handleInput = (e) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };

  const handleSearch = () => {
    // Format the configuration value
    let formattedConfig = configuration;
    if (configuration) {
      formattedConfig = configuration.toUpperCase();
    } else {
      formattedConfig = 'all';
    }

    // Determine the buytype based on category and residential/commercial selection
    let buytype = residential || commercial || 'all';

    // Format the purpose (rent/sale)
    let formattedPurpose = purpose ? purpose.toLowerCase() : 'all';

    // Format price range
    let priceRange = maxValue;
    if (purpose === 'rent') {
      priceRange = maxValue * 1000; // Convert to actual value for rent
    } else {
      priceRange = maxValue * 100000; // Convert to actual value for sale (in lakhs)
    }

    // Format city
    let formattedCity = city ? city.toLowerCase() : 'all';

    // Navigate to the search results page with formatted parameters
    navigate(`/search-property/${formattedCity}/${formattedConfig}/${formattedPurpose}/${buytype}/${priceRange}`);
  };

  const handleBtnClick = (type) => {
    setActiveBtn(type);
  };

  return (
    <>
      <div className='container2'>
        <h1 id='bannerhead' style={{fontWeight:'200'}}>Discover <b>best properties </b>in <b>one place</b></h1>
        <div className='buttonbox'>
          <button
            type="button"
            className={`btn btn-outline-danger btnr ${activeBtn === 'Rent' ? 'active' : ''}`}
            onClick={() => {
              handleBtnClick('Rent')
              setbtntype('rent');
              setIsVisible(true);
              setnewproject(false);
              setplot(false);
              setpurpose('rent');
              setcategory('residential')
              setconstruction_status('');
              setresidential('apartment');
              setcommercial('');
            }
            }
          >
            {/* <img src="./rent.png" alt="" className='img' /> */}Rent
          </button>
          <button
            type="button"
            className={`btn btn-outline-danger btnr ${activeBtn === 'Buy' ? 'active' : ''}`}
            onClick={() => {
              handleBtnClick('Buy')
              setbtntype('buy');
              setIsVisible(true);
              setnewproject(false);
              setplot(false);
              setpurpose('Sale');
              setcategory('residential')
              setconstruction_status('');
              setresidential('apartment');
              setcommercial('');
            }
            }
          >
            {/* <img src='./buys.png' className='img' /> */}Buy
          </button>
        
          <button
            type="button"
            className={`btn btn-outline-danger btnr ${activeBtn === 'NewProjects' ? 'active' : ''}`}
            onClick={() => {
           
              navigate('/adminproperty/Noida')
            
            }
            }
          >
            {/* <img src="./new.png" alt="" className='img' /> */}
           New Projects
          </button>
          <button
            type="button"
            className={`btn btn-outline-danger btnr ${activeBtn === 'PlotLand' ? 'active' : ''}`}
            onClick={() => {
              handleBtnClick('PlotLand')
              setbtntype('plotland')
              setnewproject(false);
              setplot(true);
              setpurpose('Sale');
              setcategory('')
              setconstruction_status('');
              setresidential('plot')
              setcommercial('land')
              setConfiguration('');
            }
            }
          >
            
            Plot/Land
          </button>
          <button
            type="button"
            className={`btn btn-outline-danger btnr `}
            onClick={() => setShowComingSoon(true)}
          >
           Coliving Space
          </button>
          <button
            type="button"
            className={`btn btn-warning btnr`}
            onClick={()=>
            {
              navigate('/commercial')
            }
            }
            style={{
              backgroundColor:'#FC9601'
            }}
          >
            {/* <img src="./land.png" alt="" className='img' /> */}
            Commercial Investment
          </button>
        </div>
      
        {/* <div className='homeBlackBox'>
          <div className="search-bar mysearchbar" style={{
            gap:plot ? '56px':'15px'
          }}>
            <div className="search-bar-item">
              <select value={city} onChange={(e) => setCity(e.target.value)}>
                <option value="">Select City</option>
                <option value="noida" id='noida'>Noida</option>
                <option value="greater noida">Greater Noida</option>
                <option value="delhi ">Delhi</option>
                <option value="faridabad">Faridabad</option>
                <option value="ghaziabad">Ghaziabad</option>
                <option value="gurugram">Gurugram</option>
                <option value="doha">Doha</option>
                <option value="dubai">Dubai</option>

            
              </select>
            </div>
            <div className="search-bar-item" style={{
              width:newproject ? '17vw':'150px'
              
            }}
            >
              <input
                type="text"
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                placeholder="Search for locality, project"
              />
            </div>
            <div className="search-bar-item">
              {(btntype==='rent' || btntype==='buy')&& (
                <>
                   <select value={configuration} onChange={(e) => setConfiguration(e.target.value)}>
                <option value="">Select Configuration</option>
                <option value="1bhk">1 BHK</option>
                <option value="2bhk">2 BHK</option>
                <option value="3bhk">3 BHK</option>
                <option value="4bhk">4 BHK</option>
                <option value="56bhk">5-6 BHK</option>
                <option value="6plusbhk">6+ BHK</option>
              </select>
                </>
              )}
            {(btntype==='commercial')&& (
              <>
               <select value={saleType} onChange={(e) => setsaleType(e.target.value)}>
                <option value="">Buy Or Rent</option>
                <option value="buy" onClick={()=>{
                  setpurpose('sale');
                }}>Buy</option>
                <option value="rent" 
                onClick={()=>{
                  setpurpose('residential')
                }}
                >Rent</option>
              </select>
              </>
            )}
            {btntype ==='newproject' &&(
            <>
              <select value={category} onChange={(e) => setcategory(e.target.value)}>
                    <option value="">Select Property type</option>
                    <option value="residential" >Residential</option>
                    <option value="commercial" >Commercial</option>
                  </select>
            </>
           )}
            </div>
            <div className="search-bar-item newprop"
            style={{ display: isVisible ? 'block' : 'none' }}
            >
              {(btntype === 'rent' || btntype === 'buy') && (
                <>
                  <select value={residential} onChange={(e) => setresidential(e.target.value)}>
                    <option value="">Select Unit Type</option>
                    <option value="apartment">Apartment</option>
                    <option value="housevilla">House/Villa</option>
                    <option value="builderfloor">Builder Floor</option>
                    <option value="farmhouse">Farmhouse</option>
                  </select>
                </>
              )}
              {btntype === 'commercial' && (
                <>
                  <select value={commercial} onChange={(e) => setcommercial(e.target.value)}>
                    <option value="">Select Unit Type</option>
                    <option value="officespace">OfficeSpace</option>
                    <option value="shop">Shop</option>
                    <option value="coworkingpspace">Coworking Space</option>
                    <option value="showroom">Showroom</option>
                  </select>
                </>
              )}
             
            </div>
            <div className="search-bar-item budget ">
              {(btntype !== 'rent' && saleType ==='buy') && (

                <>
                  <span id='price_value '>
                    Price: {minValue > 100 ? (minValue / 100).toLocaleString() + ' Cr' : minValue.toLocaleString() + ' L'} -
                    {maxValue > 100 ? (maxValue / 100).toLocaleString() + ' Cr' : maxValue.toLocaleString() + ' L'}
                  </span>

                  <br></br>
                  <MultiRangeSlider
                    
                    className='slider'
                    min={5}
                    max={2000}
                    step={1}
                    minValue={minValue}
                    maxValue={maxValue}
                    onInput={(e) => {
                      handleInput(e);
                    }}
                    barInnerColor='black'
                    thumbLeftColor='black'
                    thumbRightColor='black'
                    ruler={false}
                  />
                </>
              )}
              {(btntype === 'rent' || saleType ==='rent') && (<>
                <span id='price_value'>
                  Price: {minValue > 100 ? (minValue / 100).toLocaleString() + ' L' : minValue.toLocaleString() + 'K'} -
                  {maxValue > 100 ? (maxValue / 100).toLocaleString() + ' L' : maxValue.toLocaleString() + ' k'}
                </span>

                <br></br>
                <MultiRangeSlider
                  className='slider'
                  min={5}
                  max={500}
                  step={1}
                  minValue={minValue}
                  maxValue={maxValue}
                  onInput={(e) => {
                    handleInput(e);
                  }}
                  barInnerColor='black'
                  thumbLeftColor='black'
                  thumbRightColor='black'
                  ruler={false}
                />
              </>)}
            </div>

            <div className="search-bar-item">
              <button onClick={handleSearch} id='search-btn'>Search</button>
            </div>

          </div>
        </div> */}
        <PropertyFilters filter={btntype}/>

        {/* Coming Soon Popup */}
        {showComingSoon && (
          <div className="coming-soon-overlay" onClick={() => setShowComingSoon(false)}>
            <div className="coming-soon-popup" onClick={(e) => e.stopPropagation()}>
              <h3>Coming Soon!</h3>
              <p>This feature will be available shortly.</p>
              <button onClick={() => setShowComingSoon(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
