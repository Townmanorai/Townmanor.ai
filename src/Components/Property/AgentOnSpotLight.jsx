import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./AgentOnSpotLight.css";
import FeaturedAgentForm from '../Form/FeaturedAgentForm';

const AgentOnSpotLight = ({ agentIds, title, titleid }) => {
  const navigate = useNavigate(); 
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch('https://www.townmanor.ai/api/adsagents');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAgents(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  const dummyAgent = [
    {
      id: 0,
      imageUrl: 'https://via.placeholder.com/80x80?text=No+Agent',
      nameSurname: 'No Agent Available',
      agentUrl: '#',
      address: 'N/A',
      agentProfile: { registrationDate: null, activated: false },
      totalListingsNum: 0,
    },
  ];

  const numericAgentIds = agentIds.length === 0 ? dummyAgent.map(agent => agent.id) : agentIds.map(id => Number(id));
  const filteredAgents = agentIds.length === 0 ? dummyAgent : agents.filter(agent => numericAgentIds.includes(agent.id));

  const handleListYourselfClick = () => {
    navigate('/featured-agent-form', { state: { title, titleid } });
  };

  const calculateRegistrationText = (agentProfile) => {
    if (!agentProfile || !agentProfile.registrationDate) {
      return 'N/A';
    }
    
    const oldDate = new Date(agentProfile.registrationDate);
    const now = new Date();
    const diffYears = now.getFullYear() - oldDate.getFullYear();
    const diffMonths = now.getMonth() - oldDate.getMonth();
    const diffDays = now.getDate() - oldDate.getDate();
  
    if (diffYears > 0) {
      return `${diffYears}y`;
    } else if (diffMonths > 0) {
      return `${diffMonths}m`;
    } else {
      return `${diffDays > 0 ? diffDays : 1}d`;
    }
  };

  if (loading) {
    return (
      <section className="agent-spotlight-new">
        <h3 className="widget-title-new">Agents on Spotlight</h3>
        <div className="agents-list-new">
          <div className="agent-card-new">
            <div className="agent-image-new">
              <img src="https://via.placeholder.com/80x80?text=Loading..." alt="Loading" />
            </div>
            <div className="agent-info-new">
              <div>Loading agent information...</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="agent-spotlight-new">
        <h3 className="widget-title-new">Agents on Spotlight</h3>
        <div className="error-message">Error loading agents. Please try again later.</div>
      </section>
    );
  }

  return (
    <section className="agent-spotlight-new">
      <h3 className="widget-title-new">Agents on Spotlight</h3>
      <div className="agents-list-new">
        {filteredAgents.map((agent) => (
          <div key={agent.id} className="agent-card-new">
            <div className="agent-image-new">
              <img 
                src={agent.imageUrl || 'https://via.placeholder.com/80x80?text=No+Image'} 
                alt={'Agent'} 
              />
            </div>
            <div className="agent-info-new">
              <div>
                <h4 className="agent-name-new">
                  <a href={agent.agentUrl || '#'} title={agent.nameSurname || ''}>
                    {agent.nameSurname || 'Unknown Agent'}
                  </a>
                </h4>
                <p className="agent-address-new">{agent.address || 'Location not specified'}</p>
              </div>
              <div className="agent-stats">
                <p className="agent-registration-new">
                  <b>{calculateRegistrationText(agent.agentProfile)}</b> registered
                </p>
                <p className="agent-listings-new">
                  <b>{agent.totalListingsNum || 0}</b> listings
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="list-featured-agent">
        <button onClick={handleListYourselfClick} className="btn-featured-agent">
          List yourself as an Agent (5000 points)
        </button>
      </div>
    </section>
  );
};

export default AgentOnSpotLight;
