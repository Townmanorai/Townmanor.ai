import React, { useState } from 'react'
import './SearchBar.css'
import MultiRangeSlider from "multi-range-slider-react";
import { useLocation,useParams } from 'react-router-dom';
function PhoneSearch({match}) {
    const name = useParams();
    const [city, setCity] = useState('');
    const [locality, setLocality] = useState('');
    const [configuration, setConfiguration] = useState('');
    const [unitType, setUnitType] = useState('');
    const [saleType, setsaleType] = useState('buy');
    const [btntype, setbtntype] = useState('buy');
    const [resitype, setresitype] = useState('');
    const [activeBtn, setActiveBtn] = useState(name);
    const [minValue, set_minValue] = useState(5);
    const [maxValue, set_maxValue] = useState(2000);
    const [isVisible, setIsVisible] = useState(true); 
    const handleInput = (e) => {
        set_minValue(e.minValue);
        set_maxValue(e.maxValue);
    };
    const handleBtnClick = (type) => {
        setActiveBtn(type);
      };
      const handleSearch = () => {
        // Implement search functionality here
        const searchData = {
          city: city || undefined,
          locality: locality || undefined,
          configuration: configuration || undefined,
          unitType: unitType || undefined,
          btntype: btntype || undefined,
          minValue: minValue || undefined,
          maxValue: maxValue || undefined,
          resitype: resitype || undefined,
        };
        console.log(searchData);
      };
    return (
        <>
        <div className='total'>
            <header>
                <nav>
                    <ul className="phonenavbar">
                        <li  className={`nav-item ${activeBtn === 'Buy' ? 'active' : ''}`}
                         onClick={() => {
                            handleBtnClick('Buy')
                            setbtntype('buy');
                            setIsVisible(true);
                          }}
                          >Buy</li>
                        <li className={`nav-item ${activeBtn === 'Rent' ? 'active' : ''}`}
                          onClick={() => {
                            handleBtnClick('Rent')
                            setbtntype('rent');
                            setIsVisible(true);
                          }}>Rent</li>
                        <li className={`nav-item ${activeBtn === 'Commercial' ? 'active' : ''}`}

                          onClick={() => {
                            handleBtnClick('Commercial')
                            setbtntype('commercial');
                            setIsVisible(true);
                          }}>Commercial</li>
                        <li className={`nav-item ${activeBtn === 'Newproperty' ? 'active' : ''}`}
                          onClick={() => {
                            handleBtnClick('Newproperty')
                            setbtntype('newproperty');
                            setIsVisible(true);
                          }}>New Property</li>
                        <li className={`nav-item ${activeBtn === 'Plot/land' ? 'active' : ''}`}
                          onClick={() => {
                            handleBtnClick('Plot/land')
                            setbtntype('plot/land');
                            setIsVisible(true);
                          }}>Plot/Land</li>
                    </ul>
                </nav>
            </header>
            <div className='container'>
                

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
                    <div id='searchrange'>
                        {(btntype!=='rent' && saleType ==='buy') && (
                            <>
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
                        <br></br>
                        <span id='price_value'>
                            <span> Min Value: {minValue > 100 ? (minValue / 100).toLocaleString() + ' Cr' : minValue.toLocaleString() + ' L'}</span> 
                            <span>Max Value :{maxValue > 100 ? (maxValue / 100).toLocaleString() + ' Cr' : maxValue.toLocaleString() + ' L'}</span>
                        </span>
                            </>
                        )}
                        {(btntype==='rent' || saleType==='rent') &&(
                            <>
                            <MultiRangeSlider
                            id='phone_slider'
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
                        <br></br>
                        <span id='price_value'>
                            <span> Min Value: {minValue > 100 ? (minValue / 100).toLocaleString() + ' L' : minValue.toLocaleString() + ' k'}</span> 
                            <span>Max Value :{maxValue > 100 ? (maxValue / 100).toLocaleString() + ' L' : maxValue.toLocaleString() + ' k'}</span>
                        </span>
                            </>
                        )}
                    </div>
                    <div className="search-bar-item locality">
              <input
                type="text"
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                placeholder="Search for locality, project"
              />
            </div>
            <div className="search-bar-item newprop" >
            
            {(btntype === 'rent' || btntype === 'buy') && (
                <>
                  <select value={unitType} onChange={(e) => setUnitType(e.target.value)}>
                    <option value="">Select Property Type</option>
                    <option value="apartment">Apartment</option>
                    <option value="housevilla">House/Villa</option>
                    <option value="builderfloor">Builder Floor</option>
                    <option value="farmhouse">Farmhouse</option>
                  </select>
                </>
              )}
              {btntype === 'commercial' && (
                <>
                  <select value={unitType} onChange={(e) => setUnitType(e.target.value)}>
                    <option value="">Select Property Type</option>
                    <option value="officespace">OfficeSpace</option>
                    <option value="shop">Shop</option>
                    <option value="coworkingpspace">Coworking Space</option>
                    <option value="showroom">Showroom</option>
                  </select>
                </>
              )}
            </div>
            <div className="search-bar-item newprop" >
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
                <option value="buy">Buy</option>
                <option value="rent">Rent</option>
              </select>
              </>
            )}
            {btntype ==='newproperty' &&(
            <>
              <select value={resitype} onChange={(e) => setresitype(e.target.value)}>
                    <option value="">Select Property type</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                  </select>
            </>
           )}
            </div>
            <div className="search-bar-item">
              <button  id='search-btn hello'  onClick={handleSearch}>Search</button>
            </div>
          
            </div>
            </div>
        </>
    )
}

export default PhoneSearch