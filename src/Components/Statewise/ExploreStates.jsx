import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { statesData, unionTerritoriesData } from './statesData';
import './ExploreStates.css';

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
      <nav className="explore-states__nav">
        <div className="explore-states__nav-container">
          <Link to="/" className="explore-states__logo">
            <img src="https://ai-public.creatie.ai/gen_page/logo_placeholder.png" alt="Logo" />
          </Link>
          <div className="explore-states__search">
            <input
              type="text"
              placeholder="Search states or union territories..."
              value={searchQuery}
              onChange={handleSearch}
            />
            <i className="fas fa-search"></i>
          </div>
        </div>
      </nav>

      <main className="explore-states__main">
        <div className="explore-states__header">
          <h1>Explore States & Union Territories</h1>
          <p className="explore-states__subtitle">
            Discover information about all states and union territories of India
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
                <img src={item.image} alt={item.name} />
              </div>
              <div className="explore-states__card-body">
                <h3>{item.name}</h3>
                <div className="explore-states__card-info">
                  <span>
                    <i className="fas fa-building"></i> Capital: {item.capital}
                  </span>
                  <span>
                    <i className="fas fa-users"></i> Population: {item.population}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <div className="explore-states__bottom-bar">
        <button className="explore-states__bottom-btn" onClick={scrollToTop}>
          <i className="fas fa-arrow-up"></i> Back to Top
        </button>
        <div className="explore-states__bottom-actions">
          <button className="explore-states__bottom-btn">
            <i className="fas fa-grid-2"></i> Grid View
          </button>
          <button className="explore-states__bottom-btn">
            <i className="fas fa-filter"></i> Filter
          </button>
        </div>
      </div>

      <footer className="explore-states__footer">
        <p>© 2024 Government of India. All rights reserved.</p>
        <p>This is an official website of the Government of India</p>
      </footer>
    </div>
  );
};

export default ExploreStates; 