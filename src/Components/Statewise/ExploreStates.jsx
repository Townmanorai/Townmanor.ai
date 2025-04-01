import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { statesData, unionTerritoriesData } from './statesData';
import './ExploreStates.css';
import { FaSearch, FaBuilding, FaUsers, FaArrowUp, FaThLarge, FaFilter } from 'react-icons/fa';

const fallbackImage = 'https://s7ap1.scene7.com/is/image/incredibleindia/1-chota-imambara-lucknow-uttar-pradesh-attr-hero?qlt=82&ts=1726648528039';

const ExploreStates = () => {
  const [view, setView] = useState('states'); // 'states' or 'ut'
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(statesData);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const data = view === 'states' ? statesData : unionTerritoriesData;
    const filtered = data.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.capital.toLowerCase().includes(query)
    );
    setFilteredData(filtered);
  };

  const handleViewChange = (newView) => {
    setView(newView);
    setSearchQuery('');
    setFilteredData(newView === 'states' ? statesData : unionTerritoriesData);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="explore-states">
      <div className="explore-states__nav">
        <div className="explore-states__nav-container">
          <div className="explore-states__search">
            <input
              type="text"
              placeholder="Search states or union territories..."
              value={searchQuery}
              onChange={handleSearch}
            />
            <FaSearch />
          </div>
        </div>
      </div>

      <main className="explore-states__main">
        <div className="explore-states__header">
          <h1>Indian State Property Tax Rates</h1>
          <p className="explore-states__subtitle">
             Comprehensive guide to residential property taxes across Indian states
          </p>
          <p className="explore-states__subtitle_info">
            Currently, we provide detailed information on property taxes in Uttar Pradesh and NCT Delhi. Data for other states is being curated and will be added soon—stay tuned for updates!
          </p>
          <div className="explore-states__toggle">
            <button
              className={`explore-states__toggle-btn ${view === 'states' ? 'active' : ''}`}
              onClick={() => handleViewChange('states')}
            >
              States
            </button>
            <button
              className={`explore-states__toggle-btn ${view === 'ut' ? 'active' : ''}`}
              onClick={() => handleViewChange('ut')}
            >
              Union Territories
            </button>
          </div>
        </div>

        <div className="explore-states__grid">
          {filteredData.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="explore-states__card"
            >
              <div className="explore-states__card-image">
                <img
                  src={item.image}
                  alt={item.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = fallbackImage;
                  }}
                />
              </div>
              <div className="explore-states__card-body">
                <h3>{item.name}</h3>
                <div className="explore-states__card-info">
                  <span>
                    <FaBuilding /> Capital: {item.capital}
                  </span>
                  <span>
                    <FaUsers /> Population: {item.population}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      
    </div>
  );
};

export default ExploreStates;
