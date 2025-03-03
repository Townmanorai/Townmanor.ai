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
        
        <div className='searchbox' onClick={handleSearch}>
         <h1 style={{
          color:'white',
          fontSize:'16px',
          padding:'10px 2px'
         }}>Discover best properties in one place</h1>
        <input placeholder='Enter locality/property'  id='searchinput'  ></input>
        <ul className="phone-searchbar">
          <li className={`phonesearchbarbtn ${activeBtn === 'Buy' ? 'activep' : ''}`}
          onClick={()=>{
            setActiveBtn('Buy')
          }}
          >Buy</li>
          <li className={`phonesearchbarbtn ${activeBtn === 'Rent' ? 'activep' : ''}`}
          onClick={()=>{
            setActiveBtn('Rent')
          }}
          >Rent</li>
          
          <li className={`phonesearchbarbtn ${activeBtn === 'Newproperty' ? 'activep' : ''}`}
          onClick={()=>{
            setActiveBtn('NewProperty')
          }}
          >New Property</li>
          <li className={`phonesearchbarbtn ${activeBtn === 'Plot/land' ? 'activep' : ''}`}
          onClick={()=>{
            setActiveBtn('Plot/land')
          }}
          >Plot/Land</li>
          <li className={`phonesearchbarbtn ${activeBtn === 'Commercial' ? 'activep' : ''}`}
          onClick={()=>{
            setActiveBtn('Commercial')
          }}
          >Commercial</li>
           <li className={`phonesearchbarbtn`}
          onClick={()=>{
           navigate('/commercial')
          }}
          style={{
            width:'130px',
            background:'orange',
            color:'black'
          }}
          >Commercial Investment</li>
        </ul>
      
        </div>
        
    </div>
    </>
  )
}

export default PhoneSearchbar