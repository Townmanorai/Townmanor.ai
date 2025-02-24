import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './AgentList.css';
import AgentCard from './AgentCard';
import TopAgents from './TopAgents';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import SearchBarComponent from '../SearchBar/SearchBarComponent';

function AgentList() {
  const [agents, setAgents] = useState([]);
  const [topAgents, setTopAgents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const agentsPerPage = 6; // Number of agents to show per page
  const location = useLocation();

  const getQueryParams = (queryString) => {
    return new URLSearchParams(queryString);
  };

  useEffect(() => {
    const params = getQueryParams(location.search);
    const city = params.get('city');
    const locality = params.get('locality');
    const rent = params.get('rent');
    const newProperty = params.get('newProperty');
    const resale = params.get('resale');
    const encodedLocality = encodeURIComponent(locality);
    fetch(`https://www.townmanor.ai/api/agents?city=${city}&sector=${encodedLocality}&rent=${rent}&newProperty=${newProperty}&resale=${resale}&page=${currentPage}&limit=${agentsPerPage}`)
      .then(response => response.json())
      .then(data => {
        setAgents(data.agents);
        setTotalPages(data.totalPages);
      })
      .catch(error => console.error('Error fetching agents:', error));
  }, [location.search, currentPage]);

  useEffect(() => {
    fetch('https://www.townmanor.ai/api/topagents')
      .then(response => response.json())
      .then(data => setTopAgents(data))
      .catch(error => console.error('Error fetching top agents:', error));
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <SearchBarComponent />
      <div className="app">
        <div className="agent-list">
          <div className='agent-card-list'>
            {agents.map((agent, index) => (
              <AgentCard key={index} agent={agent} />
            ))}
          </div>
          <div>
            <div className="pagination">
              <button
                className="pagination-button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <FaArrowLeft /> Prev
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`page-button ${i + 1 === currentPage ? 'active' : ''}`}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="pagination-button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
        <div className="d-none d-lg-block" style={{ marginLeft: '20px' }}>
          <TopAgents agents={topAgents} />
        </div>
      </div>
    </>
  );
}

export default AgentList;
