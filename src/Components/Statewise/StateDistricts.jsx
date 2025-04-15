import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { districtsData, utDistrictsData } from './statesData';
import './ExploreStates.css';
import { FaSearch, FaUsers, FaArrowUp, FaThLarge, FaFilter } from 'react-icons/fa';

const fallbackImage = 'https://s7ap1.scene7.com/is/image/incredibleindia/1-chota-imambara-lucknow-uttar-pradesh-attr-hero?qlt=82&ts=1726648528039';

const StateDistricts = () => {
  const { stateName } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDistricts, setFilteredDistricts] = useState([]);

  // Determine if it's a state or UT – here we use a URL prefix "ut-" for UTs.
  const isUT = stateName.startsWith('ut-');
  // Remove the prefix (if any) to get the key to lookup in our data
  const key = isUT ? stateName.replace('ut-', '') : stateName;
  const districts = isUT ? utDistrictsData[key] : districtsData[key];

  useEffect(() => {
    setFilteredDistricts(districts || []);
  }, [districts]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = (districts || []).filter(district =>
      district.name.toLowerCase().includes(query) ||
      district.famousPlaces.some(place => place.toLowerCase().includes(query))
    );
    setFilteredDistricts(filtered);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDistrictClick = (link) => {
    window.open(link, '_blank');
  };

  if (!districts) {
    return (
      <div className="explore-states">
        <div className="explore-states__error">
          <h2>District data not available</h2>
          <Link to="/explorestate" className="explore-states__back-btn">
            Back to States
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="explore-states">
      <nav className="explore-states__nav">
        <div className="explore-states__nav-container">
          <Link to="/states" className="explore-states__logo">
            <img src="https://ai-public.creatie.ai/gen_page/logo_placeholder.png" alt="Logo" />
          </Link>
          <div className="explore-states__search">
            <input
              type="text"
              placeholder="Search districts or famous places..."
              value={searchQuery}
              onChange={handleSearch}
            />
            <FaSearch />
          </div>
        </div>
      </nav>

      <main className="explore-states__main">
        <div className="explore-states__header">
          <h1>{key.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Districts</h1>
          <p className="explore-states__subtitle">
            Select Your districts 
          </p>
        </div>

        <div className="explore-states__grid">
          {filteredDistricts.map((district, index) => (
            <div
              key={index}
              className="explore-states__card"
              onClick={() => handleDistrictClick(district.link)}
            >
              <div className="explore-states__card-image">
                <img
                  src={district.image}
                  alt={district.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = fallbackImage;
                  }}
                />
              </div>
              <div className="explore-states__card-body">
                <h3>{district.name}</h3>
                <div className="explore-states__card-info">
                  <span>
                    <FaUsers /> Population: {district.population}
                  </span>
                  <div className="explore-states__famous-places">
                    <h4>Famous Places:</h4>
                    <ul>
                      {district.famousPlaces.map((place, idx) => (
                        <li key={idx}>{place}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>



      
    </div>
  );
};

export default StateDistricts;
