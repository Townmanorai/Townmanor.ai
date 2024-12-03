import React, { useState } from 'react'
import './Phone.css'
import { FaSearchLocation } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
function PhoneSearchbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [activeBtn, setActiveBtn] = useState('Buy');
  const navigate = useNavigate();
  const handleSearch = () => {
    setIsVisible(false);
    navigate(`/search/${activeBtn}`);
  };

  return (
    < >
     <header>
      <nav>
      
      </nav>
    </header>
    <div id='banner' style={{
      display: isVisible ? 'block' : 'none'
    }}>
    <ul className="phone-searchbar">
          <li className={`nav-item ${activeBtn === 'Buy' ? 'activep' : ''}`}
          onClick={()=>{
            setActiveBtn('Buy')
          }}
          >Buy</li>
          <li className={`nav-item ${activeBtn === 'Rent' ? 'activep' : ''}`}
          onClick={()=>{
            setActiveBtn('Rent')
          }}
          >Rent</li>
          <li className={`nav-item ${activeBtn === 'Commercial' ? 'activep' : ''}`}
          onClick={()=>{
            setActiveBtn('Commercial')
          }}
          >Commercial</li>
          <li className={`nav-item ${activeBtn === 'Newproperty' ? 'activep' : ''}`}
          onClick={()=>{
            setActiveBtn('NewProperty')
          }}
          >New Property</li>
          <li className={`nav-item ${activeBtn === 'Plot/land' ? 'activep' : ''}`}
          onClick={()=>{
            setActiveBtn('Plot/land')
          }}
          >Plot/Land</li>
        </ul>
        <div className='searchbox' onClick={handleSearch}>
        <input placeholder='Enter locality/property'  id='searchinput'  ></input>
        <span className='searchbutton '>
          
          <FaSearchLocation  id='search_icon'/></span>
        </div>
        
    </div>
    </>
  )
}

export default PhoneSearchbar